import { gql } from 'graphql-request'
import { gqlFetcher } from '../networkHelpers'
import { AnkiCardBatch, AnkiCardStatus } from '../queries/useGetAnkiCardsQuery'

export enum GenerateAnkiCardsErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

type GenerateAnkiCardsResult = {
  generateAnkiCards: GenerateAnkiCardsData
}

type GenerateAnkiCardsData = {
  batch?: AnkiCardBatch
  errorCodes?: GenerateAnkiCardsErrorCode[]
}

export async function generateAnkiCardsMutation(
  libraryItemId: string
): Promise<AnkiCardBatch> {
  const mutation = gql`
    mutation GenerateAnkiCards($libraryItemId: ID!) {
      generateAnkiCards(libraryItemId: $libraryItemId) {
        ... on GenerateAnkiCardsSuccess {
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
        ... on GenerateAnkiCardsError {
          errorCodes
        }
      }
    }
  `

  const data = (await gqlFetcher(mutation, {
    libraryItemId,
  })) as GenerateAnkiCardsResult
  const error = data.generateAnkiCards.errorCodes?.find(() => true)
  if (error) {
    throw new Error(error)
  }

  return data.generateAnkiCards.batch!
}
