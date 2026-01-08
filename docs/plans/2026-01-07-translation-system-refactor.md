# Translation System Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor translation system to use smart chunking with context, reduce API calls from ~200 to ~10 per article, add deduplication and proper priority.

**Architecture:** Replace text-node-by-text-node translation with intelligent block-based translation. Group HTML content into semantic blocks (~2000-4000 tokens), translate with sliding context window (2-3 previous blocks), add jobId deduplication, and proper queue priority.

**Tech Stack:** TypeScript, LangChain, linkedom (HTML parsing), tiktoken (token counting), BullMQ (job queue)

**Current Problems:**
1. No jobId deduplication → duplicate translation jobs
2. Each text node translated separately → loss of context
3. ~200 API calls per article → expensive and slow
4. No priority in queue → unpredictable scheduling

**Solution:**
1. Add token counting with tiktoken
2. Smart chunking: group nodes into ~2000-4000 token blocks
3. Context passing: sliding window of 2-3 previous blocks
4. Deduplication: `translate_${libraryItemId}_${targetLanguage}_v001`
5. Priority: 10 (similar to Anki cards, ~10 second jobs)

---

## Task 1: Add tiktoken dependency and token counting utility

**Files:**
- Modify: `packages/api/package.json`
- Create: `packages/api/src/utils/tokens.ts`
- Create: `packages/api/test/utils/tokens.test.ts`

**Step 1: Add tiktoken dependency**

Add to `packages/api/package.json` dependencies:
```json
"tiktoken": "^1.0.16"
```

**Step 2: Install dependency**

Run: `pnpm install --filter @omnivore/api`
Expected: tiktoken installed successfully

**Step 3: Create token counting utility**

Create `packages/api/src/utils/tokens.ts`:
```typescript
import { encoding_for_model } from 'tiktoken'

// Cache the encoder to avoid recreating it on every call
let encoder: ReturnType<typeof encoding_for_model> | null = null

const getEncoder = () => {
  if (!encoder) {
    // Use cl100k_base encoding (gpt-4, gpt-3.5-turbo, text-embedding-ada-002)
    encoder = encoding_for_model('gpt-4')
  }
  return encoder
}

/**
 * Count tokens in text using tiktoken
 * Uses cl100k_base encoding (compatible with gpt-4, gpt-3.5-turbo)
 */
export const countTokens = (text: string): number => {
  const enc = getEncoder()
  const tokens = enc.encode(text)
  return tokens.length
}

/**
 * Estimate if text fits within token limit
 * Adds 10% safety margin
 */
export const fitsInTokenLimit = (text: string, limit: number): boolean => {
  const tokenCount = countTokens(text)
  return tokenCount <= limit * 0.9 // 10% safety margin
}

/**
 * Truncate text to fit within token limit
 * Returns truncated text and whether truncation occurred
 */
export const truncateToTokenLimit = (
  text: string,
  limit: number
): { text: string; truncated: boolean } => {
  const enc = getEncoder()
  const tokens = enc.encode(text)

  if (tokens.length <= limit) {
    return { text, truncated: false }
  }

  // Truncate tokens and decode back to text
  const truncatedTokens = tokens.slice(0, limit)
  const truncatedText = new TextDecoder().decode(enc.decode(truncatedTokens))

  return { text: truncatedText, truncated: true }
}
```

**Step 4: Write tests for token counting**

Create `packages/api/test/utils/tokens.test.ts`:
```typescript
import { expect } from 'chai'
import 'mocha'
import { countTokens, fitsInTokenLimit, truncateToTokenLimit } from '../../src/utils/tokens'

describe('Token utilities', () => {
  describe('countTokens', () => {
    it('counts tokens in simple text', () => {
      const text = 'Hello world'
      const count = countTokens(text)
      expect(count).to.be.greaterThan(0)
      expect(count).to.be.lessThan(10)
    })

    it('counts tokens in longer text', () => {
      const text = 'This is a longer piece of text with multiple sentences. It should have more tokens than the simple hello world example.'
      const count = countTokens(text)
      expect(count).to.be.greaterThan(15)
    })

    it('handles empty string', () => {
      const count = countTokens('')
      expect(count).to.equal(0)
    })

    it('handles unicode characters', () => {
      const text = 'Привет мир 你好世界'
      const count = countTokens(text)
      expect(count).to.be.greaterThan(0)
    })
  })

  describe('fitsInTokenLimit', () => {
    it('returns true for text within limit', () => {
      const text = 'Short text'
      expect(fitsInTokenLimit(text, 100)).to.be.true
    })

    it('returns false for text exceeding limit', () => {
      const text = 'a'.repeat(10000) // Very long text
      expect(fitsInTokenLimit(text, 10)).to.be.false
    })

    it('applies 10% safety margin', () => {
      const text = 'a'.repeat(1000)
      const tokenCount = countTokens(text)
      // Should fit if limit is > tokenCount / 0.9
      expect(fitsInTokenLimit(text, Math.ceil(tokenCount / 0.9))).to.be.true
      expect(fitsInTokenLimit(text, tokenCount)).to.be.false
    })
  })

  describe('truncateToTokenLimit', () => {
    it('does not truncate text within limit', () => {
      const text = 'Short text'
      const result = truncateToTokenLimit(text, 100)
      expect(result.text).to.equal(text)
      expect(result.truncated).to.be.false
    })

    it('truncates text exceeding limit', () => {
      const text = 'This is a longer piece of text that should be truncated'
      const result = truncateToTokenLimit(text, 5)
      expect(result.text.length).to.be.lessThan(text.length)
      expect(result.truncated).to.be.true
    })

    it('handles empty string', () => {
      const result = truncateToTokenLimit('', 100)
      expect(result.text).to.equal('')
      expect(result.truncated).to.be.false
    })
  })
})
```

**Step 5: Run tests**

Run: `pnpm --filter @omnivore/api test test/utils/tokens.test.ts`
Expected: All tests pass

**Step 6: Commit token utilities**

```bash
git add packages/api/package.json packages/api/pnpm-lock.yaml packages/api/src/utils/tokens.ts packages/api/test/utils/tokens.test.ts
git commit -m "feat(api): add token counting utilities with tiktoken"
```

---

## Task 2: Create content chunking utilities

**Files:**
- Create: `packages/api/src/utils/content-chunker.ts`
- Create: `packages/api/test/utils/content-chunker.test.ts`

**Step 1: Write failing test for content chunking**

Create `packages/api/test/utils/content-chunker.test.ts`:
```typescript
import { expect } from 'chai'
import 'mocha'
import { parseHTML } from 'linkedom'
import { chunkHTMLContent, ContentChunk } from '../../src/utils/content-chunker'

describe('Content chunker', () => {
  describe('chunkHTMLContent', () => {
    it('creates single chunk for small content', () => {
      const html = '<p>Short paragraph.</p>'
      const { document } = parseHTML(html)
      const root = document.body || document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      expect(chunks).to.have.lengthOf(1)
      expect(chunks[0].html).to.include('Short paragraph')
      expect(chunks[0].tokenCount).to.be.greaterThan(0)
    })

    it('splits large content into multiple chunks', () => {
      const html = `
        <p>${'A'.repeat(1000)}</p>
        <p>${'B'.repeat(1000)}</p>
        <p>${'C'.repeat(1000)}</p>
      `
      const { document } = parseHTML(html)
      const root = document.body || document.documentElement

      const chunks = chunkHTMLContent(root, 500)

      expect(chunks.length).to.be.greaterThan(1)
      chunks.forEach(chunk => {
        expect(chunk.tokenCount).to.be.lessThanOrEqual(500)
      })
    })

    it('respects block boundaries', () => {
      const html = `
        <p>First paragraph.</p>
        <h2>Section Title</h2>
        <p>Second paragraph.</p>
      `
      const { document } = parseHTML(html)
      const root = document.body || document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      // Should keep semantic blocks together
      expect(chunks).to.have.lengthOf(1)
      expect(chunks[0].html).to.include('Section Title')
    })

    it('skips code blocks and technical elements', () => {
      const html = `
        <p>Regular text.</p>
        <pre><code>function test() { return true; }</code></pre>
        <p>More text.</p>
      `
      const { document } = parseHTML(html)
      const root = document.body || document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      expect(chunks[0].html).to.include('Regular text')
      expect(chunks[0].html).to.include('<code>')
      expect(chunks[0].html).to.include('More text')
    })

    it('handles empty content', () => {
      const html = '<div></div>'
      const { document } = parseHTML(html)
      const root = document.body || document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      expect(chunks).to.have.lengthOf(0)
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @omnivore/api test test/utils/content-chunker.test.ts`
Expected: FAIL with "Cannot find module '../../src/utils/content-chunker'"

**Step 3: Implement content chunker**

Create `packages/api/src/utils/content-chunker.ts`:
```typescript
import { countTokens } from './tokens'

export interface ContentChunk {
  html: string
  tokenCount: number
  nodeIndices: number[] // Track which nodes belong to this chunk
}

// Block-level elements that should be kept together when possible
const BLOCK_ELEMENTS = new Set([
  'P',
  'DIV',
  'SECTION',
  'ARTICLE',
  'HEADER',
  'FOOTER',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  'PRE',
  'TABLE',
  'FIGURE',
])

// Elements to skip (don't translate content inside)
const SKIP_ELEMENTS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'TEMPLATE',
])

/**
 * Check if a node has translatable text content
 */
const hasTranslatableContent = (node: Node): boolean => {
  if (node.nodeType === 3) {
    // Text node
    const text = node.textContent?.trim() || ''
    return text.length > 0
  }

  if (node.nodeType === 1) {
    // Element node
    const element = node as Element
    if (SKIP_ELEMENTS.has(element.tagName)) {
      return false
    }

    // Check if any child has translatable content
    for (const child of Array.from(node.childNodes)) {
      if (hasTranslatableContent(child)) {
        return true
      }
    }
  }

  return false
}

/**
 * Extract block-level elements from root
 */
const extractBlocks = (root: Node): Element[] => {
  const blocks: Element[] = []

  const traverse = (node: Node) => {
    if (node.nodeType === 1) {
      const element = node as Element

      if (SKIP_ELEMENTS.has(element.tagName)) {
        return
      }

      if (BLOCK_ELEMENTS.has(element.tagName) && hasTranslatableContent(element)) {
        blocks.push(element)
        return // Don't traverse children, we got the whole block
      }

      // Not a block element or empty, traverse children
      for (const child of Array.from(node.childNodes)) {
        traverse(child)
      }
    }
  }

  traverse(root)
  return blocks
}

/**
 * Chunk HTML content into blocks suitable for translation
 *
 * @param root - Root HTML node to chunk
 * @param maxTokensPerChunk - Maximum tokens per chunk (default: 3000)
 * @returns Array of content chunks
 */
export const chunkHTMLContent = (
  root: Node,
  maxTokensPerChunk: number = 3000
): ContentChunk[] => {
  const blocks = extractBlocks(root)

  if (blocks.length === 0) {
    return []
  }

  const chunks: ContentChunk[] = []
  let currentChunkBlocks: Element[] = []
  let currentTokenCount = 0

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const blockHTML = (block as Element).outerHTML
    const blockTokens = countTokens(blockHTML)

    // If single block exceeds limit, it becomes its own chunk
    if (blockTokens > maxTokensPerChunk) {
      // Flush current chunk if any
      if (currentChunkBlocks.length > 0) {
        const chunkHTML = currentChunkBlocks.map(b => (b as Element).outerHTML).join('\n')
        chunks.push({
          html: chunkHTML,
          tokenCount: currentTokenCount,
          nodeIndices: Array.from({ length: currentChunkBlocks.length }, (_, idx) =>
            i - currentChunkBlocks.length + idx
          ),
        })
        currentChunkBlocks = []
        currentTokenCount = 0
      }

      // Add large block as single chunk
      chunks.push({
        html: blockHTML,
        tokenCount: blockTokens,
        nodeIndices: [i],
      })
      continue
    }

    // Check if adding this block would exceed limit
    if (currentTokenCount + blockTokens > maxTokensPerChunk && currentChunkBlocks.length > 0) {
      // Flush current chunk
      const chunkHTML = currentChunkBlocks.map(b => (b as Element).outerHTML).join('\n')
      chunks.push({
        html: chunkHTML,
        tokenCount: currentTokenCount,
        nodeIndices: Array.from({ length: currentChunkBlocks.length }, (_, idx) =>
          i - currentChunkBlocks.length + idx
        ),
      })
      currentChunkBlocks = []
      currentTokenCount = 0
    }

    // Add block to current chunk
    currentChunkBlocks.push(block)
    currentTokenCount += blockTokens
  }

  // Flush remaining blocks
  if (currentChunkBlocks.length > 0) {
    const chunkHTML = currentChunkBlocks.map(b => (b as Element).outerHTML).join('\n')
    chunks.push({
      html: chunkHTML,
      tokenCount: currentTokenCount,
      nodeIndices: Array.from({ length: currentChunkBlocks.length }, (_, idx) =>
        blocks.length - currentChunkBlocks.length + idx
      ),
    })
  }

  return chunks
}

/**
 * Create context from previous chunks for translation
 * Uses sliding window of last N chunks
 *
 * @param previousChunks - Previously translated chunks
 * @param windowSize - Number of previous chunks to include (default: 2)
 * @param maxContextTokens - Maximum tokens for context (default: 2000)
 * @returns Context string for translation
 */
export const createTranslationContext = (
  previousChunks: { original: string; translated: string }[],
  windowSize: number = 2,
  maxContextTokens: number = 2000
): string => {
  if (previousChunks.length === 0) {
    return ''
  }

  // Take last N chunks
  const recentChunks = previousChunks.slice(-windowSize)

  // Build context from translated chunks
  let context = recentChunks.map(chunk => chunk.translated).join('\n\n')

  // Truncate if needed
  const contextTokens = countTokens(context)
  if (contextTokens > maxContextTokens) {
    // Take only the last chunk if two chunks are too large
    if (recentChunks.length > 1) {
      context = recentChunks[recentChunks.length - 1].translated
    }

    // If still too large, truncate
    const tokens = countTokens(context)
    if (tokens > maxContextTokens) {
      // Simple truncation - take last maxContextTokens worth of text
      const ratio = maxContextTokens / tokens
      const truncateAt = Math.floor(context.length * ratio)
      context = '...' + context.slice(context.length - truncateAt)
    }
  }

  return context
}
```

**Step 4: Run tests to verify they pass**

Run: `pnpm --filter @omnivore/api test test/utils/content-chunker.test.ts`
Expected: All tests pass

**Step 5: Commit content chunker**

```bash
git add packages/api/src/utils/content-chunker.ts packages/api/test/utils/content-chunker.test.ts
git commit -m "feat(api): add content chunking utilities for translation"
```

---

## Task 3: Refactor translate-content job to use chunking

**Files:**
- Modify: `packages/api/src/jobs/translate-content.ts`

**Step 1: Update translate-content.ts imports**

At the top of `packages/api/src/jobs/translate-content.ts`, update imports:
```typescript
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
```

**Step 2: Update translation prompt**

Replace the `TRANSLATE_TEXT_PROMPT` constant:
```typescript
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
```

**Step 3: Create context section helper**

Add helper function before `translateContent`:
```typescript
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
```

**Step 4: Replace translateBatch with translateChunk**

Remove the old `translateBatch` function and replace with:
```typescript
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
```

**Step 5: Refactor main translateContent function**

Replace everything from line 122 onwards (the main `translateContent` function) with:
```typescript
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

    // Chunk content into translatable blocks
    const chunks = chunkHTMLContent(root, 3000) // ~3000 tokens per chunk

    if (chunks.length === 0) {
      logger.info(`No translatable content found in item ${libraryItemId}`)
      await authTrx(
        async (tx) => {
          await tx
            .getRepository(LibraryItem)
            .update(libraryItemId, { translationStatus: 'COMPLETED' })
        },
        { uid: userId }
      )
      return
    }

    logger.info(
      `Translating ${chunks.length} content chunks for item ${libraryItemId} (avg ${Math.round(chunks.reduce((sum, c) => sum + c.tokenCount, 0) / chunks.length)} tokens/chunk)`
    )

    // Translate chunks with sliding context window
    const translatedChunks: { original: string; translated: string }[] = []

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]

      // Create context from previous chunks (sliding window of 2)
      const context = createTranslationContext(translatedChunks, 2, 2000)

      // Translate chunk
      const translated = await translateChunk(
        llm,
        chunk.html,
        context,
        targetLanguage
      )

      translatedChunks.push({
        original: chunk.html,
        translated: translated,
      })

      logger.info(
        `Translated chunk ${i + 1}/${chunks.length} (${chunk.tokenCount} tokens)`
      )
    }

    // Combine translated chunks
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

    logger.info(
      `Translation completed for item ${libraryItemId}: ${chunks.length} chunks, ${translatedChunks.reduce((sum, c) => sum + c.translated.length, 0)} characters`
    )

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
```

**Step 6: Remove unused code**

Remove these old functions and constants that are no longer needed:
- `SKIP_ELEMENTS` constant (line 41-51)
- `isCodeLikeText` function (line 54-70)
- `collectTextSegments` function (line 73-92)
- Old `TRANSLATE_TEXT_PROMPT` constant

**Step 7: Commit refactored translation job**

```bash
git add packages/api/src/jobs/translate-content.ts
git commit -m "refactor(api): use chunk-based translation with context window"
```

---

## Task 4: Add deduplication and priority to translation job

**Files:**
- Modify: `packages/api/src/utils/createTask.ts`

**Step 1: Add TRANSLATE_CONTENT_JOB_NAME to priority mapping**

In `packages/api/src/utils/createTask.ts`, find the `getJobPriority` function (line 101) and add the translation job to the priority 10 section:

```typescript
export const getJobPriority = (jobName: string): number => {
  switch (jobName) {
    case UPDATE_LABELS_JOB:
    case UPDATE_HIGHLIGHT_JOB:
    case SYNC_READ_POSITIONS_JOB_NAME:
    case SEND_EMAIL_JOB:
    case UPDATE_HOME_JOB:
    case `${FETCH_CONTENT_JOB}_high`:
      return 1
    case AI_SUMMARIZE_JOB_NAME:
    case PROCESS_YOUTUBE_VIDEO_JOB_NAME:
    case `${FETCH_CONTENT_JOB}_low`:
    case `${FETCH_CONTENT_JOB}_rss_high`:
      return 5
    case BULK_ACTION_JOB_NAME:
    case `${REFRESH_FEED_JOB_NAME}_high`:
    case PROCESS_YOUTUBE_TRANSCRIPT_JOB_NAME:
    case UPLOAD_CONTENT_JOB:
    case SCORE_LIBRARY_ITEM_JOB:
    case `${FETCH_CONTENT_JOB}_rss_low`:
    case TRIGGER_RULE_JOB_NAME:
    case THUMBNAIL_JOB:
    case GENERATE_ANKI_CARDS_JOB_NAME:
    case TRANSLATE_CONTENT_JOB_NAME:  // ADD THIS LINE
      return 10
    case `${REFRESH_FEED_JOB_NAME}_low`:
    case CREATE_DIGEST_JOB:
      return 50
    case REFRESH_ALL_FEEDS_JOB_NAME:
    case GENERATE_PREVIEW_CONTENT_JOB:
    case PRUNE_TRASH_JOB:
    case EXPIRE_FOLDERS_JOB_NAME:
    case EXPORT_JOB_NAME:
      return 100

    default:
      logger.error(`unknown job name: ${jobName}`)
      return 1
  }
}
```

**Step 2: Add jobId deduplication to enqueueTranslateContentJob**

Find the `enqueueTranslateContentJob` function (line 741) and add jobId with deduplication:

```typescript
export const enqueueTranslateContentJob = async (
  data: TranslateContentJobData
) => {
  const queue = await getQueue()
  if (!queue) {
    return undefined
  }

  // Create unique jobId for deduplication
  const jobId = `${TRANSLATE_CONTENT_JOB_NAME}_${data.libraryItemId}_${data.targetLanguage}_${JOB_VERSION}`

  return queue.add(TRANSLATE_CONTENT_JOB_NAME, data, {
    jobId, // deduplication by libraryItemId + targetLanguage
    priority: getJobPriority(TRANSLATE_CONTENT_JOB_NAME),
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  })
}
```

**Step 3: Commit deduplication and priority**

```bash
git add packages/api/src/utils/createTask.ts
git commit -m "feat(api): add deduplication and priority for translation jobs"
```

---

## Task 5: Write integration test for new translation system

**Files:**
- Create: `packages/api/test/jobs/translate-content.test.ts`

**Step 1: Write integration test**

Create `packages/api/test/jobs/translate-content.test.ts`:
```typescript
import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { LibraryItem, LibraryItemState } from '../../src/entity/library_item'
import * as repository from '../../src/repository'
import * as libraryItemRepo from '../../src/repository/library_item'
import * as aiUtils from '../../src/utils/ai'
import * as integrationService from '../../src/services/integrations'
import { translateContent, TranslateContentJobData } from '../../src/jobs/translate-content'

describe('translateContent job', () => {
  let authTrxStub: sinon.SinonStub
  let createLLMStub: sinon.SinonStub
  let findIntegrationByNameStub: sinon.SinonStub

  const testUserId = 'test-user-id'
  const testLibraryItemId = 'test-library-item-id'

  const mockLibraryItem: Partial<LibraryItem> = {
    id: testLibraryItemId,
    state: LibraryItemState.Succeeded,
    title: 'Test Article',
    readableContent: `
      <article>
        <h1>Introduction to Testing</h1>
        <p>This is the first paragraph about testing. It explains the basics of how testing works in software development.</p>
        <h2>Unit Testing</h2>
        <p>Unit testing is a crucial part of development. It helps ensure code quality.</p>
        <p>We should write tests for all critical functionality.</p>
        <pre><code>function test() { return true; }</code></pre>
        <h2>Integration Testing</h2>
        <p>Integration tests verify that different parts work together correctly.</p>
      </article>
    `,
    translatedLanguage: null,
    translatedContent: null,
  }

  beforeEach(() => {
    authTrxStub = sinon.stub(repository, 'authTrx')
    createLLMStub = sinon.stub(aiUtils, 'createLLM')
    findIntegrationByNameStub = sinon.stub(integrationService, 'findIntegrationByName')
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('successful translation with chunking', () => {
    it('translates content in chunks with context', async () => {
      // Mock authTrx to return library item
      authTrxStub.callsFake(async (callback: any) => {
        const mockTx = {
          getRepository: () => ({
            update: sinon.stub().resolves(),
          }),
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return callback(mockTx)
      })

      // Mock LLM to return translated content
      const mockLLM = {
        invoke: sinon.stub(),
      }
      const mockChain = {
        pipe: sinon.stub().returnsThis(),
        invoke: sinon.stub(),
      }

      // Simulate translation: append "[RU]" to indicate translation
      mockChain.invoke.callsFake(async (input: any) => {
        return input.content.replace(/>(.*?)</g, (match: string, text: string) => {
          return `>${text}[RU]<`
        })
      })

      createLLMStub.returns(mockLLM)

      // Mock ChatPromptTemplate to return our chain
      const ChatPromptTemplate = require('@langchain/core/prompts')
      const chatPromptStub = sinon.stub(ChatPromptTemplate, 'fromTemplate')
      chatPromptStub.returns({
        pipe: () => ({
          pipe: () => mockChain,
        }),
      })

      findIntegrationByNameStub.resolves(null)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage: 'Russian',
      }

      await translateContent(jobData)

      // Verify update was called with PROCESSING status
      expect(authTrxStub.callCount).to.be.greaterThan(1)

      // Verify final update with COMPLETED status and translated content
      const lastCall = authTrxStub.lastCall
      await lastCall.args[0]({
        getRepository: () => ({
          update: (id: string, data: any) => {
            expect(id).to.equal(testLibraryItemId)
            expect(data.translationStatus).to.equal('COMPLETED')
            expect(data.translatedContent).to.exist
            expect(data.translatedContent).to.include('[RU]')
            expect(data.translatedLanguage).to.equal('Russian')
          },
        }),
      })

      chatPromptStub.restore()
    })

    it('skips translation if already translated to target language', async () => {
      const alreadyTranslated = {
        ...mockLibraryItem,
        translatedLanguage: 'Russian',
      }

      authTrxStub.callsFake(async (callback: any) => {
        const mockTx = {
          getRepository: () => ({
            update: sinon.stub().resolves(),
          }),
          withRepository: () => ({
            findById: sinon.stub().resolves(alreadyTranslated),
          }),
        }
        return callback(mockTx)
      })

      createLLMStub.returns({})

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage: 'Russian',
      }

      await translateContent(jobData)

      // Should not call LLM
      expect(createLLMStub.callCount).to.equal(0)
    })

    it('handles translation failure gracefully', async () => {
      authTrxStub.callsFake(async (callback: any) => {
        const mockTx = {
          getRepository: () => ({
            update: sinon.stub().resolves(),
          }),
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return callback(mockTx)
      })

      // Mock LLM to throw error
      const mockLLM = {}
      const mockChain = {
        pipe: sinon.stub().returnsThis(),
        invoke: sinon.stub().rejects(new Error('Translation API error')),
      }

      createLLMStub.returns(mockLLM)

      const ChatPromptTemplate = require('@langchain/core/prompts')
      const chatPromptStub = sinon.stub(ChatPromptTemplate, 'fromTemplate')
      chatPromptStub.returns({
        pipe: () => ({
          pipe: () => mockChain,
        }),
      })

      findIntegrationByNameStub.resolves(null)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage: 'Russian',
      }

      await translateContent(jobData)

      // Verify status was set to FAILED
      const lastCall = authTrxStub.lastCall
      await lastCall.args[0]({
        getRepository: () => ({
          update: (id: string, data: any) => {
            expect(data.translationStatus).to.equal('FAILED')
          },
        }),
      })

      chatPromptStub.restore()
    })
  })

  describe('edge cases', () => {
    it('handles empty content', async () => {
      const emptyItem = {
        ...mockLibraryItem,
        readableContent: '<div></div>',
      }

      authTrxStub.callsFake(async (callback: any) => {
        const mockTx = {
          getRepository: () => ({
            update: sinon.stub().resolves(),
          }),
          withRepository: () => ({
            findById: sinon.stub().resolves(emptyItem),
          }),
        }
        return callback(mockTx)
      })

      createLLMStub.returns({})
      findIntegrationByNameStub.resolves(null)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage: 'Russian',
      }

      await translateContent(jobData)

      // Should complete without error
      const lastCall = authTrxStub.lastCall
      await lastCall.args[0]({
        getRepository: () => ({
          update: (id: string, data: any) => {
            expect(data.translationStatus).to.equal('COMPLETED')
          },
        }),
      })
    })

    it('fails when no LLM configured', async () => {
      authTrxStub.callsFake(async (callback: any) => {
        const mockTx = {
          getRepository: () => ({
            update: sinon.stub().resolves(),
          }),
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return callback(mockTx)
      })

      createLLMStub.returns(null)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage: 'Russian',
      }

      await translateContent(jobData)

      // Should set status to FAILED
      const lastCall = authTrxStub.lastCall
      await lastCall.args[0]({
        getRepository: () => ({
          update: (id: string, data: any) => {
            expect(data.translationStatus).to.equal('FAILED')
          },
        }),
      })
    })
  })
})
```

**Step 2: Run tests**

Run: `pnpm --filter @omnivore/api test test/jobs/translate-content.test.ts`
Expected: All tests pass

**Step 3: Commit tests**

```bash
git add packages/api/test/jobs/translate-content.test.ts
git commit -m "test(api): add comprehensive tests for translation system"
```

---

## Task 6: Test manually and verify improvements

**Files:**
- N/A (manual testing)

**Step 1: Start local development environment**

Run the queue processor:
```bash
cd packages/api
pnpm dev_qp
```

**Step 2: Trigger a translation**

Use the GraphQL API or trigger via pubsub to translate an article.

**Step 3: Monitor logs**

Expected log output should show:
```
Translating N content chunks for item <id> (avg ~2000-3000 tokens/chunk)
Translated chunk 1/N (2847 tokens)
Translated chunk 2/N (3102 tokens)
...
Translation completed for item <id>: N chunks, X characters
```

**Step 4: Verify improvements**

Compare with old system:
- **Old:** ~200 text nodes → 200 API calls
- **New:** ~5-10 chunks → 5-10 API calls
- **Speedup:** ~20x fewer API calls
- **Cost savings:** ~20x reduction in API costs

**Step 5: Check deduplication**

Try triggering translation for same item twice quickly:
- First job should process
- Second job should be deduplicated (same jobId)

**Step 6: Verify translation quality**

Check translated content maintains:
- HTML structure intact
- Context between paragraphs
- Technical terms preserved
- Code blocks untranslated

---

## Task 7: Update documentation

**Files:**
- Create: `docs/translation-system.md`
- Modify: `packages/api/CLAUDE.md`

**Step 1: Create translation system documentation**

Create `docs/translation-system.md`:
```markdown
# Translation System

## Overview

The translation system automatically translates article content to the user's preferred language using AI. It uses smart chunking to maintain context while minimizing API costs.

## Architecture

### Smart Chunking

Content is split into semantic blocks (~2000-4000 tokens each) rather than translating word-by-word:

- Groups block-level HTML elements (paragraphs, sections, headers)
- Preserves HTML structure completely
- Skips code blocks and technical elements

### Context Window

Each chunk is translated with context from previous chunks:

- Sliding window of 2-3 previous chunks
- Maintains consistency in terminology
- Better translation quality than isolated segments

### Deduplication

Jobs are deduplicated using `jobId`:
```
translate_${libraryItemId}_${targetLanguage}_${version}
```

This prevents multiple translation jobs for the same article + language combination.

### Priority

Translation jobs have priority 10 (same as Anki card generation):
- Expected runtime: ~10 seconds per article
- Balances urgency with resource usage

## Performance

### Before Refactor
- ~200 API calls per article
- Each text node translated independently
- No context between segments
- Slow and expensive

### After Refactor
- ~5-10 API calls per article
- **20x reduction in API calls**
- Context maintained between chunks
- Much faster and cheaper

### Example
Article with 5000 tokens:
- Old: 200 calls × 50 tokens = very expensive
- New: 8 calls × ~600 tokens = much cheaper

## Configuration

Translation is triggered automatically when:
1. User has `autoTranslate` enabled in personalization
2. Article language differs from user's preferred language
3. Article processing completes (state = `Succeeded`)

AI model configuration in `.env`:
```bash
OPENAI_API_KEY=your-key
OPENAI_BASE_URL=https://api.openai.com
OPENAI_MODEL=gpt-4
```

Compatible with OpenAI-compatible APIs (DeepSeek, etc.)

## Job Processing

Job name: `translate-content-job`

Job data:
```typescript
{
  userId: string
  libraryItemId: string
  targetLanguage: string
}
```

Status tracking in `library_item` table:
- `translationStatus`: `PROCESSING` | `COMPLETED` | `FAILED`
- `translatedContent`: Translated HTML
- `translatedLanguage`: Target language code

## Testing

Run tests:
```bash
pnpm --filter @omnivore/api test test/jobs/translate-content.test.ts
pnpm --filter @omnivore/api test test/utils/content-chunker.test.ts
pnpm --filter @omnivore/api test test/utils/tokens.test.ts
```

## Future Improvements

- [ ] Parallel chunk translation for even faster processing
- [ ] Caching frequently used translations
- [ ] User-configurable chunk size
- [ ] Support for custom translation glossaries
```

**Step 2: Update API CLAUDE.md**

Add to `packages/api/CLAUDE.md`:
```markdown
## Translation System

The API includes an automatic translation system that translates articles to the user's preferred language.

**Key Features:**
- Smart chunking: Groups content into ~3000 token blocks
- Context window: Maintains terminology consistency across chunks
- Deduplication: Prevents duplicate translation jobs
- Efficient: ~20x fewer API calls than previous implementation

**Job:** `translate-content-job`
- Priority: 10 (~10 second jobs)
- Retries: 3 attempts with exponential backoff
- Deduplication: By libraryItemId + targetLanguage

**See:** `docs/translation-system.md` for detailed documentation
```

**Step 3: Commit documentation**

```bash
git add docs/translation-system.md packages/api/CLAUDE.md
git commit -m "docs: add translation system documentation"
```

---

## Summary

This plan refactors the translation system to:

1. ✅ **Smart chunking** - Groups content into ~3000 token blocks instead of individual text nodes
2. ✅ **Context preservation** - Sliding window of 2-3 previous chunks maintains consistency
3. ✅ **API efficiency** - Reduces from ~200 to ~10 API calls per article (20x improvement)
4. ✅ **Deduplication** - Prevents duplicate jobs with `jobId`
5. ✅ **Proper priority** - Sets priority 10 for predictable scheduling
6. ✅ **Quality improvement** - Better translations due to context
7. ✅ **Cost reduction** - 20x fewer API calls = 20x lower costs
8. ✅ **Comprehensive tests** - Unit and integration tests for all components

**Total commits:** 7
**Estimated time:** 2-3 hours for implementation + testing
**Impact:** Major performance and quality improvement for translation feature
