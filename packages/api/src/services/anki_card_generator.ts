import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { AnkiNote } from './integrations/anki'
import { createLLM } from '../utils/ai'
import { wordsCount } from '../utils/helpers'
import { htmlToMarkdown, markdownToHtml } from '../utils/parser'
import { logger } from '../utils/logger'
import { OMNIVORE_MODEL_NAME } from './anki_model'

export const CHUNK_SIZE = 3000

export interface CardMetadata {
  articleTitle: string
  articleUrl: string
  siteName: string
  author?: string
  labels: string[]
}

export interface GeneratedCard {
  question: string
  answer: string
  context?: string
}

const GENERATE_CARDS_PROMPT = ChatPromptTemplate.fromTemplate(`
You are an expert at creating high-quality Anki flashcards that maximize learning efficiency and long-term retention.

Generate flashcards from the following article content in {language}.

QUALITY PRINCIPLES (следуй строго!):
1. **Atomic Cards** - Each card covers ONE concept/fact only
2. **Active Recall** - Questions should require mental effort to answer
3. **Clear & Specific** - Avoid ambiguous questions
4. **Concise Answers** - Direct answers without unnecessary details
5. **No Yes/No** - Transform yes/no questions into "What/Why/How"
6. **Context Matters** - Include brief context to aid memory
7. **Technical Precision** - Preserve code, terms, formulas exactly as written
8. **Optimal Density** - Create 4-8 cards per 1000 words (focus on quality over quantity)

FORMATTING:
- Use **Markdown** for formatting (bold, italic, lists, code blocks)
- Code: use \`inline code\` or \`\`\`language blocks for snippets
- Lists: use bullet points for multiple items
- Emphasis: use **bold** for key terms, *italic* for concepts

AVOID:
- Cards that are too easy or trivial
- Cards that are too complex (split into multiple cards)
- Duplicate information across cards
- Questions with multiple correct answers
- Vague or subjective questions

ARTICLE METADATA:
- Title: {title}
- Author: {author}
- Source: {siteName}

CONTENT:
{content}

OUTPUT FORMAT (JSON array):
[
  {{
    "question": "Clear, specific question requiring active recall",
    "answer": "Concise answer with Markdown formatting if needed",
    "context": "Brief contextual hint (1-2 sentences) to aid memory"
  }}
]

EXAMPLES:

BAD:
{{"question": "Is React a library?", "answer": "Yes"}}
{{"question": "What is functional programming?", "answer": "A programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data."}}

GOOD:
{{"question": "What problem does React's Virtual DOM solve?", "answer": "It minimizes expensive DOM manipulations by batching updates and only applying the minimal set of changes needed.", "context": "React's core performance optimization"}}
{{"question": "What are the three core principles of functional programming?", "answer": "1. **Pure functions** (no side effects)\\n2. **Immutability** (data cannot change)\\n3. **First-class functions** (functions as values)", "context": "Fundamental concepts in FP paradigm"}}

Return ONLY valid JSON array, no additional text.
`)

/**
 * Generates a URL-safe slug from a title
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

/**
 * Splits markdown content into chunks by paragraphs, ensuring each chunk
 * is at most chunkSize words
 */
const splitIntoChunks = (markdown: string, chunkSize: number): string[] => {
  const paragraphs = markdown.split(/\n\n+/)
  const chunks: string[] = []
  let currentChunk: string[] = []
  let currentWordCount = 0

  for (const paragraph of paragraphs) {
    const paragraphWordCount = paragraph.split(/\s+/).filter(Boolean).length

    if (currentWordCount + paragraphWordCount > chunkSize && currentChunk.length > 0) {
      // Start new chunk
      chunks.push(currentChunk.join('\n\n'))
      currentChunk = [paragraph]
      currentWordCount = paragraphWordCount
    } else {
      currentChunk.push(paragraph)
      currentWordCount += paragraphWordCount
    }
  }

  // Don't forget the last chunk
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join('\n\n'))
  }

  return chunks
}

/**
 * Extracts JSON array from LLM response, handling markdown code blocks
 */
const extractJsonFromResponse = (response: string): string => {
  const trimmed = response.trim()

  // Try to extract from markdown code blocks
  const jsonBlockMatch = trimmed.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonBlockMatch) {
    return jsonBlockMatch[1].trim()
  }

  // Try generic code blocks
  const genericBlockMatch = trimmed.match(/```\s*([\s\S]*?)\s*```/)
  if (genericBlockMatch) {
    return genericBlockMatch[1].trim()
  }

  return trimmed
}

/**
 * Validates and parses the generated cards from LLM response
 */
const parseAndValidateCards = (jsonString: string): GeneratedCard[] => {
  const parsed = JSON.parse(jsonString)

  if (!Array.isArray(parsed)) {
    logger.warn('LLM response is not an array')
    return []
  }

  const validCards: GeneratedCard[] = []

  for (const card of parsed) {
    if (
      typeof card.question === 'string' &&
      card.question.trim().length > 0 &&
      typeof card.answer === 'string' &&
      card.answer.trim().length > 0
    ) {
      validCards.push({
        question: card.question.trim(),
        answer: card.answer.trim(),
        context: typeof card.context === 'string' ? card.context.trim() : undefined,
      })
    } else {
      logger.warn('Invalid card structure, skipping', { card })
    }
  }

  return validCards
}

/**
 * Formats generated cards as AnkiNote objects with HTML-formatted content
 */
const formatAsAnkiNotes = (
  cards: GeneratedCard[],
  metadata: CardMetadata
): AnkiNote[] => {
  const articleSlug = generateSlug(metadata.articleTitle)
  const siteSlug = generateSlug(metadata.siteName || 'unknown')

  return cards.map((card) => {
    const tags = [
      'omnivore',
      `omnivore::${articleSlug}`,
      `source::${siteSlug}`,
      ...metadata.labels.map((label) =>
        label.toLowerCase().replace(/\s+/g, '-')
      ),
    ]

    // Convert Markdown to HTML for proper Anki rendering
    const questionHtml = markdownToHtml(card.question)
    const answerHtml = markdownToHtml(card.answer)
    const contextHtml = card.context ? markdownToHtml(card.context) : ''

    return {
      deckName: 'Omnivore', // Will be overridden in job
      modelName: OMNIVORE_MODEL_NAME,
      fields: {
        Question: questionHtml,
        Answer: answerHtml,
        Context: contextHtml,
        Source: `<a href="${metadata.articleUrl}" target="_blank">${metadata.articleTitle}</a>`,
      },
      tags,
      options: {
        allowDuplicate: false,
        duplicateScope: 'deck',
      },
    }
  })
}

/**
 * Generates cards for a single chunk of content
 */
const generateCardsForChunk = async (
  llm: NonNullable<ReturnType<typeof createLLM>>,
  chunk: string,
  language: string,
  metadata: CardMetadata,
  chunkIndex: number,
  totalChunks: number
): Promise<AnkiNote[]> => {
  const chain = GENERATE_CARDS_PROMPT.pipe(llm).pipe(new StringOutputParser())

  logger.info(`Processing chunk ${chunkIndex + 1}/${totalChunks}`, {
    chunkLength: chunk.length,
    articleTitle: metadata.articleTitle,
  })

  const response = await chain.invoke({
    language,
    title: metadata.articleTitle,
    author: metadata.author || 'Unknown',
    siteName: metadata.siteName || 'Unknown',
    content: chunk,
  })

  const jsonString = extractJsonFromResponse(response)
  const cards = parseAndValidateCards(jsonString)

  logger.info(`Generated ${cards.length} cards from chunk ${chunkIndex + 1}/${totalChunks}`)

  return formatAsAnkiNotes(cards, metadata)
}

export class AnkiCardGenerator {
  /**
   * Generates Anki flashcards from article content using LLM
   *
   * @param content - HTML content of the article
   * @param language - Target language for card generation
   * @param metadata - Article metadata including title, URL, site name, author, and labels
   * @returns Array of AnkiNote objects ready to be sent to Anki
   * @throws Error if AI is not configured
   */
  static async generateCards(
    content: string,
    language: string,
    metadata: CardMetadata
  ): Promise<AnkiNote[]> {
    // 1. Check LLM availability
    const llm = createLLM()
    if (!llm) {
      logger.error('LLM not configured for Anki card generation')
      throw new Error('AI not configured')
    }

    // 2. Handle empty content
    if (!content || content.trim().length === 0) {
      logger.info('Empty content provided for Anki card generation')
      return []
    }

    // 3. Convert HTML to markdown
    const markdown = htmlToMarkdown(content)

    // 4. Count words and determine chunking
    const wordCount = wordsCount(markdown, false)

    logger.info(`Starting Anki card generation`, {
      articleTitle: metadata.articleTitle,
      wordCount,
      language,
    })

    // 5. Split into chunks if needed
    const chunks =
      wordCount > CHUNK_SIZE ? splitIntoChunks(markdown, CHUNK_SIZE) : [markdown]

    logger.info(`Content split into ${chunks.length} chunk(s)`)

    // 6. Process each chunk
    const allCards: AnkiNote[] = []
    for (let i = 0; i < chunks.length; i++) {
      try {
        const cards = await generateCardsForChunk(
          llm,
          chunks[i],
          language,
          metadata,
          i,
          chunks.length
        )
        allCards.push(...cards)
      } catch (error) {
        logger.error(`Failed to generate cards for chunk ${i + 1}/${chunks.length}`, {
          error,
          chunkPreview: chunks[i].substring(0, 100),
        })
        // Continue processing other chunks even if one fails
      }
    }

    // 7. Return all generated cards
    logger.info(`Generated ${allCards.length} Anki cards from ${chunks.length} chunks`, {
      articleTitle: metadata.articleTitle,
    })

    return allCards
  }
}
