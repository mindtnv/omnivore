import { gql } from 'graphql-request'
import useSWR from 'swr'
import { gqlFetcher } from '../networkHelpers'

export type AnkiCardStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'WAITING_FOR_TRANSLATION'

export interface AnkiCardDetail {
  question: string
  answer: string
  context?: string
}

export interface AnkiCardBatch {
  id: string
  libraryItemId: string
  userId: string
  status: AnkiCardStatus
  cardCount: number
  cardDetails?: AnkiCardDetail[]
  deck: string
  language?: string
  ankiNoteIds?: string[]
  createdAt: Date
  updatedAt: Date
}

interface AnkiCardsQueryResponse {
  isValidating: boolean
  isLoading: boolean
  batch: AnkiCardBatch | null
  error: Error | undefined
  revalidate: () => void
}

interface AnkiCardsQueryResponseData {
  ankiCards: AnkiCardsData
}

interface AnkiCardsData {
  batch?: AnkiCardBatch
  errorCodes?: string[]
}

export function useGetAnkiCardsQuery(
  libraryItemId: string | undefined,
  enablePolling = false
): AnkiCardsQueryResponse {
  const query = gql`
    query GetAnkiCards($libraryItemId: ID!) {
      ankiCards(libraryItemId: $libraryItemId) {
        ... on AnkiCardsSuccess {
          batch {
            id
            libraryItemId
            userId
            status
            cardCount
            cardDetails {
              question
              answer
              context
            }
            deck
            language
            ankiNoteIds
            createdAt
            updatedAt
          }
        }
        ... on AnkiCardsError {
          errorCodes
        }
      }
    }
  `

  const { data, mutate, isValidating, isLoading, error } = useSWR(
    libraryItemId ? ['ankiCards', libraryItemId] : null,
    () => gqlFetcher(query, { libraryItemId }),
    {
      refreshInterval: enablePolling ? 3000 : 0,
      revalidateOnFocus: false,
    }
  )

  try {
    if (data) {
      const result = data as AnkiCardsQueryResponseData
      const batch = result.ankiCards.batch || null
      return {
        isValidating,
        isLoading,
        batch,
        error: result.ankiCards.errorCodes
          ? new Error(result.ankiCards.errorCodes[0])
          : undefined,
        revalidate: () => {
          mutate()
        },
      }
    }
  } catch (err) {
    console.log('error fetching anki cards', err)
  }

  return {
    isValidating,
    isLoading: isLoading ?? true,
    batch: null,
    error: error,
    revalidate: () => {
      mutate()
    },
  }
}
