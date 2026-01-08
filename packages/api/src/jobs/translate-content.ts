import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { LibraryItem, LibraryItemState } from '../entity/library_item'
import { authTrx } from '../repository'
import { libraryItemRepository } from '../repository/library_item'
import { env } from '../env'
import { createLLM } from '../utils/ai'
import { logger } from '../utils/logger'
import { parseHTML } from 'linkedom'
import { enqueueGenerateAnkiCards } from '../utils/createTask'
import { findIntegrationByName } from '../services/integrations'
import { chunkHTMLContent } from '../utils/content-chunker'
import { stripAttributesForTranslation } from '../utils/html-cleaner'
import { countTokens } from '../utils/tokens'
import fs from 'fs'
import path from 'path'

export interface TranslateContentJobData {
  userId: string
  libraryItemId: string
  targetLanguage: string
}

export const TRANSLATE_CONTENT_JOB_NAME = 'translate-content-job'

const parsePositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const parseNonNegativeInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

const TRANSLATION_BLOCKS_PER_CHUNK = parsePositiveInt(
  process.env.TRANSLATION_BLOCKS_PER_CHUNK,
  20
)
const MAX_CONTENT_TOKENS = parsePositiveInt(
  process.env.TRANSLATION_MAX_TOKENS,
  9000
)
const ESTIMATED_PROMPT_TOKENS = 80
const TRANSLATION_DELAY_MS = parseNonNegativeInt(
  process.env.TRANSLATION_DELAY_MS,
  1000
)
const TRANSLATION_DEBUG_LOG = process.env.TRANSLATION_DEBUG_LOG === 'true'
const TRANSLATION_MAX_RETRIES = parsePositiveInt(
  process.env.TRANSLATION_MAX_RETRIES,
  2
)

// Debug logging function - saves requests to file for debugging
const logTranslationRequest = (
  libraryItemId: string,
  chunkIndex: number,
  attempt: number,
  content: string,
  targetLanguage: string,
  tokenCount: number
) => {
  try {
    if (!TRANSLATION_DEBUG_LOG) {
      return
    }

    const logDir = path.join(process.cwd(), 'logs', 'translation-debug')
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `${timestamp}_item-${libraryItemId}_chunk-${chunkIndex}_attempt-${attempt}.json`
    const logPath = path.join(logDir, filename)

    const logData = {
      timestamp: new Date().toISOString(),
      libraryItemId,
      chunkIndex,
      attempt,
      targetLanguage,
      tokenCount,
      contentLength: content.length,
      content: content,
      promptTemplate: TRANSLATE_PROMPT_TEMPLATE,
    }

    fs.writeFileSync(logPath, JSON.stringify(logData, null, 2))
    logger.info(`[Debug] Saved translation request to: ${logPath}`)
  } catch (err) {
    logger.error('Failed to write translation debug log:', err)
  }
}

// Prompt template string for HTML translation
const TRANSLATE_PROMPT_TEMPLATE = `
Translate to {language}. Output ONLY the translated HTML.
Keep tags/attributes and structure identical.
Translate only human-readable text between tags.
Do not translate code, URLs, or numbers.

{content}
`

// Prompt for HTML translation - emphasizes preserving exact HTML structure
const TRANSLATE_PROMPT = ChatPromptTemplate.fromTemplate(TRANSLATE_PROMPT_TEMPLATE)

/**
 * Translate a single content chunk with retry logic using LangChain
 */
const translateChunk = async (
  llm: ReturnType<typeof createLLM>,
  content: string,
  targetLanguage: string,
  chunkIndex: number,
  libraryItemId: string,
  maxRetries: number = TRANSLATION_MAX_RETRIES
): Promise<string> => {
  if (!llm) {
    return content
  }

  const chain = TRANSLATE_PROMPT.pipe(llm).pipe(new StringOutputParser())

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    let startTime = Date.now()
    try {
      // Log request to file for debugging
      const tokenCount = countTokens(content)
      logTranslationRequest(
        libraryItemId,
        chunkIndex,
        attempt,
        content,
        targetLanguage,
        tokenCount
      )

      logger.info(`[Chunk ${chunkIndex}] Sending translation request (attempt ${attempt}/${maxRetries})...`)
      startTime = Date.now()

      const translated = await chain.invoke({
        language: targetLanguage,
        content: content,
      })

      const elapsed = Date.now() - startTime
      logger.info(`[Chunk ${chunkIndex}] Translation successful in ${elapsed}ms, response length: ${translated.length} chars`)

      return translated.trim()
    } catch (err) {
      const isLastAttempt = attempt === maxRetries
      const elapsed = Date.now() - startTime
      logger.error(`[Chunk ${chunkIndex}] Error after ${elapsed}ms (attempt ${attempt}/${maxRetries}):`, err)

      if (isLastAttempt) {
        // On final failure, throw error to mark translation as FAILED
        logger.error(`[Chunk ${chunkIndex}] All retries failed, translation cannot continue`)
        throw new Error(`Translation failed for chunk ${chunkIndex} after ${maxRetries} attempts: ${err instanceof Error ? err.message : String(err)}`)
      }

      // Wait before retry (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
      logger.info(`[Chunk ${chunkIndex}] Retrying translation in ${waitTime}ms...`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }
  }

  // Should never reach here (all paths return or throw)
  throw new Error(`Translation failed for chunk ${chunkIndex}: unexpected fallthrough`)
}

export const translateContent = async (
  jobData: TranslateContentJobData
): Promise<void> => {
  const { userId, libraryItemId, targetLanguage } = jobData

  logger.info(`Starting translation job for item ${libraryItemId} to language: ${targetLanguage}`)

  if (!env.ai.translationEnabled) {
    logger.info(`Translation disabled; skipping item ${libraryItemId}`)
    return
  }

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
    const cleanedContent = stripAttributesForTranslation(libraryItem.readableContent)
    const { document } = parseHTML(cleanedContent)
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

    // Chunk the HTML content by grouping blocks (segments)
    // Keep chunks within a conservative token budget for stability.
    const chunks = chunkHTMLContent(root, {
      blocksPerChunk: TRANSLATION_BLOCKS_PER_CHUNK,
      maxTokensPerChunk: MAX_CONTENT_TOKENS,
    })

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

    logger.info(`Chunked content into ${chunks.length} chunks for item ${libraryItemId}`)

    // Translate chunks with context window
    const translatedChunks: { original: string; translated: string }[] = []

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]

      // TODO: Re-enable attribute stripping after fixing content loss issue
      // const cleanedHTML = stripNonEssentialAttributes(chunk.html)
      const cleanedHTML = chunk.html

      // Calculate actual token count
      const cleanedTokenCount = countTokens(cleanedHTML)
      const estimatedInputTokens = cleanedTokenCount + ESTIMATED_PROMPT_TOKENS

      logger.info(
        `Translating chunk ${i + 1}/${chunks.length}: ${chunk.nodeIndices.length} blocks, ${cleanedTokenCount} tokens, ~${estimatedInputTokens} total input tokens`
      )

      // Translate the chunk
      const translatedHTML = await translateChunk(
        llm,
        cleanedHTML,
        targetLanguage,
        i + 1,
        libraryItemId
      )

      translatedChunks.push({
        original: cleanedHTML,
        translated: translatedHTML,
      })

      // Add delay between chunks to avoid overwhelming DeepSeek API
      if (i < chunks.length - 1 && TRANSLATION_DELAY_MS > 0) {
        await new Promise(resolve => setTimeout(resolve, TRANSLATION_DELAY_MS))
      }
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

    logger.info(`Translation completed successfully for item ${libraryItemId}`, {
      targetLanguage,
      chunkCount: chunks.length,
      contentLength: translatedHtml.length,
    })

    // Auto-create Anki cards ONLY if translation completed successfully
    try {
      const ankiIntegration = await findIntegrationByName('ANKI', userId)
      const settings = ankiIntegration?.settings as { autoCreate?: boolean } | undefined

      if (ankiIntegration?.enabled && settings?.autoCreate) {
        logger.info('Auto-creating Anki cards after successful translation', {
          libraryItemId,
          targetLanguage,
        })
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
    // Log detailed error information
    const errorMessage = err instanceof Error ? err.message : String(err)
    const errorStack = err instanceof Error ? err.stack : undefined

    logger.error('Translation failed', {
      libraryItemId,
      userId,
      targetLanguage,
      error: errorMessage,
      stack: errorStack,
    })

    // Update status to failed
    await authTrx(
      async (tx) => {
        await tx
          .getRepository(LibraryItem)
          .update(libraryItemId, { translationStatus: 'FAILED' })
      },
      { uid: userId }
    )

    // Don't throw - let the job complete gracefully
    // The FAILED status will prevent Anki card generation
  }
}
