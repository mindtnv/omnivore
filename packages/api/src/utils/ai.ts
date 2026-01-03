import { ChatOpenAI } from '@langchain/openai'
import { env } from '../env'

export const getOpenAIConfig = () => env.ai.openai

export const createLLM = () => {
  const config = getOpenAIConfig()
  if (!config.apiKey) {
    return null
  }

  return new ChatOpenAI({
    modelName: config.model,
    configuration: {
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    },
  })
}
