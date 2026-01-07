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
