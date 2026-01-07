import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { LibraryItem, LibraryItemState } from '../entity/library_item'
import { authTrx } from '../repository'
import { libraryItemRepository } from '../repository/library_item'
import { createLLM } from '../utils/ai'
import { logger } from '../utils/logger'
import { parseHTML } from 'linkedom'
import { enqueueGenerateAnkiCards } from '../utils/createTask'
import { findIntegrationByName } from '../services/integrations'
import { chunkHTMLContent, createTranslationContext } from '../utils/content-chunker'

export interface TranslateContentJobData {
  userId: string
  libraryItemId: string
  targetLanguage: string
}

export const TRANSLATE_CONTENT_JOB_NAME = 'translate-content-job'

// Prompt for translating HTML content blocks with context
const TRANSLATE_BLOCK_PROMPT = ChatPromptTemplate.fromTemplate(`
You are translating an article to {language}.

{context_section}

CRITICAL RULES:
1. Translate ONLY the human-readable text within HTML tags
2. PRESERVE all HTML structure, tags, and attributes exactly
3. DO NOT translate:
   - Code snippets within <code>, <pre>, <kbd>, <samp> tags
   - Variable names, function names, class names
   - URLs, email addresses, file paths
   - Numbers, dates in standard formats
   - Brand names and product names (keep original)
4. Maintain consistency with terminology from the context above
5. Output ONLY the translated HTML, nothing else (no explanations, no markdown)

HTML content to translate:
{content}
`)

/**
 * Build context section for prompt
 */
const buildContextSection = (context: string): string => {
  if (!context) {
    return 'This is the beginning of the article.'
  }

  return `
CONTEXT FROM PREVIOUS SECTIONS (already translated):
---
${context}
---

Use this context to maintain consistency in terminology and style.
`.trim()
}

/**
 * Translate a single content chunk with context
 */
const translateChunk = async (
  llm: ReturnType<typeof createLLM>,
  content: string,
  context: string,
  targetLanguage: string
): Promise<string> => {
  if (!llm) {
    return content
  }

  const chain = TRANSLATE_BLOCK_PROMPT.pipe(llm).pipe(new StringOutputParser())

  try {
    const contextSection = buildContextSection(context)

    const translated = await chain.invoke({
      language: targetLanguage,
      content: content,
      context_section: contextSection,
    })

    return translated.trim()
  } catch (err) {
    logger.error('Error translating content chunk:', err)
    return content // Return original on error
  }
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
    const { document } = parseHTML(libraryItem.readableContent)
    const root = document.body?.childNodes?.length
      ? document.body
      : document.documentElement

    if (!root) {
      logger.error('No root element found in HTML content')
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

    // Chunk the HTML content
    const chunks = chunkHTMLContent(root, 3000)

    if (chunks.length === 0) {
      logger.info(`No translatable content found for item ${libraryItemId}`)
      await authTrx(
        async (tx) => {
          await tx.getRepository(LibraryItem).update(libraryItemId, {
            translationStatus: 'COMPLETED',
          })
        },
        { uid: userId }
      )
      return
    }

    logger.info(
      `Chunked content into ${chunks.length} blocks for item ${libraryItemId}`
    )

    // Translate chunks with context window
    const translatedChunks: { original: string; translated: string }[] = []

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]

      // Build context from previous translated chunks
      const context = createTranslationContext(translatedChunks, 2, 2000)

      logger.info(
        `Translating chunk ${i + 1}/${chunks.length} (${chunk.tokenCount} tokens)`
      )

      // Translate this chunk
      const translatedHTML = await translateChunk(
        llm,
        chunk.html,
        context,
        targetLanguage
      )

      translatedChunks.push({
        original: chunk.html,
        translated: translatedHTML,
      })
    }

    // Combine translated chunks
    // Each chunk is already a complete HTML block that was translated as a unit.
    // Simply joining them preserves the structure without duplication.
    const translatedHtml = translatedChunks.map(c => c.translated).join('\n')

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

    // Check if auto-create is enabled for Anki integration
    try {
      const ankiIntegration = await findIntegrationByName('ANKI', userId)
      const settings = ankiIntegration?.settings as { autoCreate?: boolean } | undefined
      if (ankiIntegration?.enabled && settings?.autoCreate) {
        logger.info('Auto-creating Anki cards after translation', { libraryItemId })
        await enqueueGenerateAnkiCards({
          userId,
          libraryItemId,
        })
      }
    } catch (ankiError) {
      // Don't fail the translation job if Anki card generation fails to enqueue
      logger.error('Failed to enqueue Anki card generation after translation', {
        error: ankiError,
        libraryItemId,
      })
    }
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
