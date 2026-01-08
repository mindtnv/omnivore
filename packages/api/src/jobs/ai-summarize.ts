import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { AISummary } from '../entity/AISummary'
import { LibraryItemState } from '../entity/library_item'
import { authTrx } from '../repository'
import { libraryItemRepository } from '../repository/library_item'
import { getAISummary } from '../services/ai-summaries'
import { createLLM } from '../utils/ai'
import { logger } from '../utils/logger'
import { htmlToMarkdown } from '../utils/parser'

export interface AISummarizeJobData {
  userId: string
  promptId?: string
  libraryItemId: string
  language?: string // User's preferred language for summary
  itemLanguage?: string | null // Original item language for translation decision
}

export const AI_SUMMARIZE_JOB_NAME = 'ai-summary-job'

// Prompt template for summarization with language support
const createSummaryPrompt = (language?: string) => {
  const languageInstruction = language
    ? `Write the summary in ${language} language.`
    : 'Write the summary in the same language as the content.'

  return ChatPromptTemplate.fromTemplate(`
You are a helpful assistant that creates concise summaries of articles.

${languageInstruction}

Create a clear, informative summary of the following article content in 2-4 sentences.
Focus on the main points and key takeaways.
Do not include any preamble like "Here is a summary" or "This article discusses".
Just provide the summary directly.

Article content:
{content}

Summary:`)
}

export const aiSummarize = async (jobData: AISummarizeJobData) => {
  try {
    const libraryItem = await authTrx(
      async (tx) =>
        tx
          .withRepository(libraryItemRepository)
          .findById(jobData.libraryItemId),
      {
        uid: jobData.userId,
        replicationMode: 'replica',
      }
    )
    if (!libraryItem || libraryItem.state !== LibraryItemState.Succeeded) {
      logger.info(
        `Not ready to summarize library item job state: ${
          libraryItem?.state ?? 'null'
        }`
      )
      return
    }

    const existingSummary = await getAISummary({
      userId: jobData.userId,
      idx: 'latest',
      libraryItemId: jobData.libraryItemId,
    })

    if (existingSummary) {
      logger.info(
        `Library item already has a summary: ${jobData.libraryItemId}`
      )
      return
    }

    const llm = createLLM()
    if (!llm) {
      logger.info('AI summarization skipped: no API key configured')
      return
    }

    const document = htmlToMarkdown(libraryItem.readableContent)

    // Skip summarization for short documents (less than 500 characters)
    // Short content doesn't need a summary - it can be read quickly as-is
    const MIN_CONTENT_LENGTH = 500
    if (document.length < MIN_CONTENT_LENGTH) {
      logger.info(
        `Skipping AI summary for short document (${document.length} chars < ${MIN_CONTENT_LENGTH}): ${jobData.libraryItemId}`
      )
      return
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 8000,
      chunkOverlap: 200,
    })

    const docs = await textSplitter.splitText(document)

    // If content is short enough, summarize directly
    // If long, summarize first chunk (most important content is usually at the beginning)
    const contentToSummarize = docs.length > 0 ? docs[0] : document

    const prompt = createSummaryPrompt(jobData.language)
    const chain = prompt.pipe(llm).pipe(new StringOutputParser())

    const summary = await chain.invoke({
      content: contentToSummarize,
    })

    if (!summary || typeof summary !== 'string') {
      logger.error(`AI summary did not return text`)
      return
    }

    logger.info(
      `Generated summary for item ${jobData.libraryItemId} in language: ${jobData.language || 'auto'}`
    )

    const _ = await authTrx(
      async (t) => {
        return t.getRepository(AISummary).save({
          user: { id: jobData.userId },
          libraryItem: { id: jobData.libraryItemId },
          title: libraryItem.title,
          slug: libraryItem.slug,
          summary: summary.trim(),
        })
      },
      {
        uid: jobData.userId,
      }
    )

  } catch (err) {
    console.log('error creating summary: ', err)
  }
}
