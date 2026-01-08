import axios, { AxiosInstance } from 'axios'
import { Integration } from '../../entity/integration'
import { logger } from '../../utils/logger'
import { IntegrationClient } from './integration'
import { ItemEvent } from '../library_item'

interface AnkiConnectRequest {
  action: string
  version: number
  params?: Record<string, unknown>
  key?: string
}

interface AnkiConnectResponse<T = unknown> {
  result: T | null
  error: string | null
}

export interface AnkiNote {
  deckName: string
  modelName: string
  fields: {
    Question?: string
    Answer?: string
    Front?: string
    Back?: string
    Source?: string
    Context?: string
  }
  tags?: string[]
  options?: {
    allowDuplicate?: boolean
    duplicateScope?: string
  }
}

export interface AnkiNoteUpdate {
  id: number
  fields: Record<string, string>
}

export class AnkiConnectClient implements IntegrationClient {
  name = 'ANKI'
  token: string
  ankiConnectUrl: string

  _axios: AxiosInstance
  private integrationData?: Integration

  constructor(token: string, ankiConnectUrl: string, integration?: Integration) {
    this.token = token
    this.ankiConnectUrl = ankiConnectUrl
    this.integrationData = integration

    this._axios = axios.create({
      baseURL: ankiConnectUrl || 'http://localhost:8765',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      // Disable proxy for AnkiConnect - it should connect directly
      proxy: false,
    })
  }

  private async _request<T>(
    action: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    const request: AnkiConnectRequest = {
      action,
      version: 6,
      params,
    }

    // Only send API key if it's a real key (not empty or placeholder)
    if (this.token && this.token !== 'no-token' && this.token.trim() !== '') {
      request.key = this.token
    }

    logger.info('AnkiConnect request', { action, url: this.ankiConnectUrl, request })

    try {
      const response = await this._axios.post<AnkiConnectResponse<T>>('/', request)

      logger.info('AnkiConnect response', { action, status: response.status, data: response.data })

      if (response.data.error !== null) {
        throw new Error(response.data.error)
      }

      return response.data.result as T
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          logger.error('AnkiConnect request timed out', { error })
          throw new Error('AnkiConnect request timed out')
        }
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          logger.error('Failed to connect to AnkiConnect', { error })
          throw new Error(
            'Failed to connect to AnkiConnect. Make sure Anki is running and AnkiConnect plugin is installed.'
          )
        }
        logger.error('AnkiConnect request failed', { error: error.response })
        throw new Error(
          error.response?.data?.error ||
            'Failed to connect to AnkiConnect. Make sure Anki is running and AnkiConnect plugin is installed.'
        )
      }
      throw error
    }
  }

  async ping(): Promise<boolean> {
    try {
      logger.info('AnkiConnect ping starting', { url: this.ankiConnectUrl })
      const version = await this._request<number>('version', {})
      logger.info('AnkiConnect ping success', { version, url: this.ankiConnectUrl })
      return version >= 6
    } catch (error) {
      logger.error('AnkiConnect ping failed', {
        error,
        url: this.ankiConnectUrl,
        errorMessage: error instanceof Error ? error.message : 'unknown',
        errorStack: error instanceof Error ? error.stack : undefined
      })
      return false
    }
  }

  async getVersion(): Promise<number> {
    return await this._request<number>('version', {})
  }

  async addNotes(notes: AnkiNote[]): Promise<number[]> {
    const result = await this._request<(number | null)[]>('addNotes', { notes })

    const noteIds = result.filter((id): id is number => id !== null)

    if (noteIds.length < notes.length) {
      logger.warn(
        `Some notes were not created: ${notes.length - noteIds.length} failed out of ${notes.length}`
      )
    }

    return noteIds
  }

  async updateNoteFields(updates: AnkiNoteUpdate[]): Promise<boolean> {
    for (const update of updates) {
      await this._request<null>('updateNoteFields', { note: update })
    }
    return true
  }

  async deleteNotes(noteIds: number[]): Promise<boolean> {
    await this._request<null>('deleteNotes', { notes: noteIds })
    return true
  }

  async createDeck(deckName: string): Promise<number> {
    return await this._request<number>('createDeck', { deck: deckName })
  }

  async deckNames(): Promise<string[]> {
    return await this._request<string[]>('deckNames', {})
  }

  async modelNames(): Promise<string[]> {
    return await this._request<string[]>('modelNames', {})
  }

  async modelFieldNames(modelName: string): Promise<string[]> {
    return await this._request<string[]>('modelFieldNames', {
      modelName,
    })
  }

  async createModel(
    modelName: string,
    inOrderFields: string[],
    css: string,
    cardTemplates: Array<{ Name: string; Front: string; Back: string }>
  ): Promise<{ sortf: number; did: number; latexPre: string; latexPost: string; mod: number; usn: number; vers: number[]; type: number; css: string; name: string; flds: Array<unknown>; tmpls: Array<unknown>; tags: string[]; id: string; req: Array<unknown> }> {
    return await this._request('createModel', {
      modelName,
      inOrderFields,
      css,
      cardTemplates,
    })
  }

  accessToken = async (): Promise<string | null> => {
    const isAvailable = await this.ping()
    return isAvailable ? this.token : null
  }

  auth = (): Promise<string> => {
    throw new Error('Method not implemented.')
  }

  export = async (_items: ItemEvent[]): Promise<boolean> => {
    throw new Error('Method not implemented.')
  }
}
