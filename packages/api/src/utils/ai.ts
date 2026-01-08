import { ChatOpenAI } from '@langchain/openai'
import { env } from '../env'
import { countTokens } from './tokens'

export const getOpenAIConfig = () => env.ai.openai

// Custom fetch to avoid stale keep-alive sockets with DeepSeek.
// Node.js undici can reuse connections after the server closes them, causing "terminated".
// Force a new connection per request via Connection: close and keepalive: false.
// See: https://github.com/nodejs/undici/issues/2171
const createCustomFetch = () => {
  return async (url: string | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers ?? {})
    headers.set('Connection', 'close')
    return fetch(url, {
      ...init,
      keepalive: false,
      headers,
    })
  }
}

const extractTextContent = (content: unknown): string => {
  if (typeof content === 'string') {
    return content
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item
        if (
          item &&
          typeof item === 'object' &&
          'type' in item &&
          (item as { type?: string }).type === 'text' &&
          'text' in item
        ) {
          const text = (item as { text?: string }).text
          return typeof text === 'string' ? text : ''
        }
        return ''
      })
      .join('')
  }

  return ''
}

const patchTokenCounter = (llm: ChatOpenAI) => {
  llm.getNumTokens = async (content) => {
    const textContent = extractTextContent(content)
    try {
      return countTokens(textContent)
    } catch (error) {
      // Approximate if tiktoken fails to avoid network tokenizer fetches.
      return Math.ceil(textContent.length / 4)
    }
  }
}

const patchLangChainTiktoken = () => {
  try {
    const langchainTiktoken = require('@langchain/core/utils/tiktoken')
    const { encoding_for_model, get_encoding } = require('tiktoken')

    langchainTiktoken.encodingForModel = async (model: string) => {
      try {
        return encoding_for_model(model)
      } catch {
        return get_encoding('cl100k_base')
      }
    }
    langchainTiktoken.getEncoding = async (encoding: string) => {
      try {
        return get_encoding(encoding)
      } catch {
        return get_encoding('cl100k_base')
      }
    }
  } catch (error) {
    // Ignore if module resolution differs; token counting will fallback.
  }
}

export const createLLM = () => {
  const config = getOpenAIConfig()
  if (!config.apiKey) {
    return null
  }

  patchLangChainTiktoken()

  // Use streaming to avoid undici connection reuse issues
  // Non-streaming requests reuse connections that may be closed by DeepSeek
  // Streaming is more stable according to Microsoft docs
  const llm = new ChatOpenAI({
    modelName: config.model,
    temperature: 0.3,
    timeout: 90000, // 90 seconds timeout for requests
    maxRetries: 0, // Disable retries, we handle them in translateChunk
    streaming: true, // Enable streaming to avoid connection reuse issues
    configuration: {
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
      fetch: createCustomFetch(), // Custom fetch with keepalive: false
    } as any,
  })

  patchTokenCounter(llm)
  return llm
}
