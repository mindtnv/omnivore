import { encoding_for_model } from 'tiktoken'

// Singleton encoder instance that persists for the application lifetime.
// tiktoken encoders allocate WebAssembly memory which is expensive to initialize.
// We cache the encoder to avoid recreating it on every call, significantly improving performance.
// The encoder is NOT freed via encoder.free() because:
// 1. It's used throughout the application lifetime (singleton pattern)
// 2. The memory will be released when the Node.js process terminates
// 3. Freeing and recreating would degrade performance for frequently-used functionality
let encoder: ReturnType<typeof encoding_for_model> | undefined = undefined

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
  try {
    const enc = getEncoder()
    const tokens = enc.encode(text)
    return tokens.length
  } catch (error) {
    throw new Error(
      `Failed to count tokens: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
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
  try {
    const enc = getEncoder()
    const tokens = enc.encode(text)

    if (tokens.length <= limit) {
      return { text, truncated: false }
    }

    // Truncate tokens and decode back to text
    const truncatedTokens = tokens.slice(0, limit)
    const truncatedText = new TextDecoder().decode(enc.decode(truncatedTokens))

    return { text: truncatedText, truncated: true }
  } catch (error) {
    throw new Error(
      `Failed to truncate text to token limit: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
