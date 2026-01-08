import { countTokens, truncateToTokenLimit } from './tokens'

export interface ContentChunk {
  html: string
  tokenCount: number
  nodeIndices: number[] // Track which nodes belong to this chunk
}

interface ChunkOptions {
  blocksPerChunk?: number
  maxTokensPerChunk?: number
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
        // Check if this block has child block elements
        const hasChildBlocks = Array.from(element.childNodes).some(
          child => child.nodeType === 1 && BLOCK_ELEMENTS.has((child as Element).tagName)
        )

        if (hasChildBlocks) {
          // Traverse children to extract child blocks instead
          for (const child of Array.from(element.childNodes)) {
            traverse(child)
          }
        } else {
          // This is a leaf block, use it
          blocks.push(element)
        }
        return
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
 * Chunk HTML content by grouping blocks (segments) together
 * Simple approach: group N blocks together, translate, combine back
 *
 * @param root - Root HTML node to chunk
 * @param options - Chunking options for block and token limits
 * @returns Array of content chunks
 */
export const chunkHTMLContent = (
  root: Node,
  options: ChunkOptions = {}
): ContentChunk[] => {
  const blocksPerChunk = options.blocksPerChunk ?? 30
  const maxTokensPerChunk = options.maxTokensPerChunk
  const blocks = extractBlocks(root)

  if (blocks.length === 0) {
    return []
  }

  const chunks: ContentChunk[] = []
  let currentBlocks: Element[] = []
  let currentTokens = 0
  let currentStartIndex = 0

  const pushChunk = () => {
    if (currentBlocks.length === 0) {
      return
    }

    const chunkHTML = currentBlocks.map(b => b.outerHTML).join('')
    const nodeIndices = Array.from(
      { length: currentBlocks.length },
      (_, idx) => currentStartIndex + idx
    )

    chunks.push({
      html: chunkHTML,
      tokenCount: currentTokens,
      nodeIndices,
    })

    currentBlocks = []
    currentTokens = 0
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const blockHTML = block.outerHTML
    const blockTokens = countTokens(blockHTML)

    const wouldExceedBlocks = currentBlocks.length >= blocksPerChunk
    const wouldExceedTokens =
      maxTokensPerChunk !== undefined &&
      currentBlocks.length > 0 &&
      currentTokens + blockTokens > maxTokensPerChunk

    if (wouldExceedBlocks || wouldExceedTokens) {
      pushChunk()
      currentStartIndex = i
    }

    currentBlocks.push(block)
    currentTokens += blockTokens
  }

  pushChunk()

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
      const { text: truncatedContext } = truncateToTokenLimit(context, maxContextTokens)
      context = truncatedContext
    }
  }

  return context
}
