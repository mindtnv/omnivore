import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { LibraryItem, LibraryItemState } from '../entity/library_item'
import { authTrx } from '../repository'
import { libraryItemRepository } from '../repository/library_item'
import { createLLM } from '../utils/ai'
import { logger } from '../utils/logger'
import { parseHTML } from 'linkedom'

export interface TranslateContentJobData {
  userId: string
  libraryItemId: string
  targetLanguage: string
}

export const TRANSLATE_CONTENT_JOB_NAME = 'translate-content-job'

// Prompt for translating text while preserving technical terms
const TRANSLATE_TEXT_PROMPT = ChatPromptTemplate.fromTemplate(`
Translate the following text to {language}.

CRITICAL RULES:
1. Translate ONLY the human-readable text
2. DO NOT translate:
   - Code snippets or technical commands
   - Variable names, function names, class names
   - URLs, email addresses, file paths
   - Numbers, dates in standard formats
   - Brand names and product names (keep original)
3. Preserve any special characters or punctuation
4. Do not add any explanations or notes
5. Output ONLY the translated text, nothing else

Text to translate:
{text}
`)

// Elements that should not have their text translated
const SKIP_ELEMENTS = new Set([
  'SCRIPT',
  'STYLE',
  'CODE',
  'PRE',
  'KBD',
  'SAMP',
  'VAR',
  'NOSCRIPT',
  'TEMPLATE',
])

// Check if text is mostly code/technical content
const isCodeLikeText = (text: string): boolean => {
  // Skip if text is very short
  if (text.trim().length < 3) return false

  // Check for common code patterns
  const codePatterns = [
    /^[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(/, // function call
    /^[a-zA-Z_$][a-zA-Z0-9_$]*\s*=/, // assignment
    /^\s*\/\//, // comment
    /^\s*[{}[\]();,]/, // brackets/punctuation only
    /^https?:\/\//, // URL
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // email
    /^\d+$/, // numbers only
  ]

  return codePatterns.some((pattern) => pattern.test(text.trim()))
}

// Collect translatable text segments from HTML
const collectTextSegments = (
  node: Node,
  segments: { node: Node; text: string }[]
): void => {
  if (node.nodeType === 3) {
    // Text node
    const text = node.textContent || ''
    if (text.trim().length > 0 && !isCodeLikeText(text)) {
      segments.push({ node, text })
    }
  } else if (node.nodeType === 1) {
    // Element node
    const element = node as Element
    if (!SKIP_ELEMENTS.has(element.tagName)) {
      for (const child of Array.from(node.childNodes)) {
        collectTextSegments(child, segments)
      }
    }
  }
}

// Batch translate multiple text segments
const translateBatch = async (
  llm: ReturnType<typeof createLLM>,
  texts: string[],
  targetLanguage: string
): Promise<string[]> => {
  if (!llm || texts.length === 0) return texts

  const chain = TRANSLATE_TEXT_PROMPT.pipe(llm).pipe(new StringOutputParser())

  // Translate each text segment
  const results: string[] = []
  for (const text of texts) {
    try {
      const translated = await chain.invoke({
        language: targetLanguage,
        text: text,
      })
      results.push(translated.trim())
    } catch (err) {
      logger.error('Error translating text segment:', err)
      results.push(text) // Keep original on error
    }
  }

  return results
}

export const translateContent = async (
  jobData: TranslateContentJobData
): Promise<void> => {
  const { userId, libraryItemId, targetLanguage } = jobData

  try {
    // Update status to processing
    await authTrx(
      async (tx) => {
        await tx
          .getRepository(LibraryItem)
          .update(libraryItemId, { translationStatus: 'PROCESSING' })
      },
      { uid: userId }
    )

    const libraryItem = await authTrx(
      async (tx) =>
        tx.withRepository(libraryItemRepository).findById(libraryItemId),
      {
        uid: userId,
        replicationMode: 'replica',
      }
    )

    if (!libraryItem || libraryItem.state !== LibraryItemState.Succeeded) {
      logger.info(
        `Not ready to translate library item, state: ${libraryItem?.state ?? 'null'}`
      )
      return
    }

    // Skip if already translated to this language
    if (libraryItem.translatedLanguage === targetLanguage) {
      logger.info(
        `Library item already translated to ${targetLanguage}: ${libraryItemId}`
      )
      return
    }

    const llm = createLLM()
    if (!llm) {
      logger.info('Translation skipped: no API key configured')
      await authTrx(
        async (tx) => {
          await tx
            .getRepository(LibraryItem)
            .update(libraryItemId, { translationStatus: 'FAILED' })
        },
        { uid: userId }
      )
      return
    }

    // Parse the original HTML content
    // linkedom uses documentElement for fragments without html/body tags
    const { document } = parseHTML(libraryItem.readableContent)
    const root = document.body?.childNodes?.length
      ? document.body
      : document.documentElement

    if (!root) {
      logger.error('No root element found in HTML content')
      return
    }

    // Collect all translatable text segments
    const segments: { node: Node; text: string }[] = []
    collectTextSegments(root, segments)

    logger.info(
      `Found ${segments.length} text segments to translate for item ${libraryItemId}`
    )

    // Translate in batches to avoid overwhelming the API
    const BATCH_SIZE = 20
    for (let i = 0; i < segments.length; i += BATCH_SIZE) {
      const batch = segments.slice(i, i + BATCH_SIZE)
      const texts = batch.map((s) => s.text)
      const translated = await translateBatch(llm, texts, targetLanguage)

      // Update the DOM nodes with translated text
      for (let j = 0; j < batch.length; j++) {
        batch[j].node.textContent = translated[j]
      }

      logger.info(
        `Translated batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(segments.length / BATCH_SIZE)}`
      )
    }

    // Get the translated HTML (preserves all original structure)
    // Use outerHTML for documentElement (fragment), innerHTML for body
    let translatedHtml =
      root === document.documentElement
        ? (root as Element).outerHTML
        : (root as Element).innerHTML

    // linkedom may insert spurious <head></head><body></body> - remove them
    translatedHtml = translatedHtml
      .replace(/<head><\/head>/g, '')
      .replace(/<body><\/body>/g, '')

    // Save translated content
    await authTrx(
      async (tx) => {
        await tx.getRepository(LibraryItem).update(libraryItemId, {
          translatedContent: translatedHtml,
          translatedLanguage: targetLanguage,
          translationStatus: 'COMPLETED',
        })
      },
      { uid: userId }
    )

    logger.info(`Translation completed for item ${libraryItemId}`)
  } catch (err) {
    logger.error('Error translating content:', err)

    // Update status to failed
    await authTrx(
      async (tx) => {
        await tx
          .getRepository(LibraryItem)
          .update(libraryItemId, { translationStatus: 'FAILED' })
      },
      { uid: userId }
    )
  }
}
