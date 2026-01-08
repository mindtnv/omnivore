import { gql } from 'graphql-request'
import { gqlFetcher } from '../networkHelpers'
import { AnkiCardBatch } from '../queries/useGetAnkiCardsQuery'

export enum RegenerateAnkiCardsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

type RegenerateAnkiCardsResult = {
  regenerateAnkiCards: RegenerateAnkiCardsData
}

type RegenerateAnkiCardsData = {
  batch?: AnkiCardBatch
  errorCodes?: RegenerateAnkiCardsErrorCode[]
}

export async function regenerateAnkiCardsMutation(
  libraryItemId: string
): Promise<AnkiCardBatch> {
  const mutation = gql`
    mutation RegenerateAnkiCards($libraryItemId: ID!) {
      regenerateAnkiCards(libraryItemId: $libraryItemId) {
        ... on RegenerateAnkiCardsSuccess {
          batch {
            id
            libraryItemId
            userId
            status
            cardCount
            deck
            language
            createdAt
            updatedAt
          }
        }
        ... on RegenerateAnkiCardsError {
          errorCodes
        }
      }
    }
  `

  const data = (await gqlFetcher(mutation, {
    libraryItemId,
  })) as RegenerateAnkiCardsResult
  const error = data.regenerateAnkiCards.errorCodes?.find(() => true)
  if (error) {
    throw new Error(error)
  }

  return data.regenerateAnkiCards.batch!
}
