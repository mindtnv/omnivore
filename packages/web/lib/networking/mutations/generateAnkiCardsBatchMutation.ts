import { gql } from 'graphql-request'
import { gqlFetcher } from '../networkHelpers'
import { AnkiCardBatch } from '../queries/useGetAnkiCardsQuery'

export enum GenerateAnkiCardsBatchErrorCode {
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
}

type GenerateAnkiCardsBatchResult = {
  generateAnkiCardsBatch: GenerateAnkiCardsBatchData
}

type GenerateAnkiCardsBatchData = {
  batches?: AnkiCardBatch[]
  errorCodes?: GenerateAnkiCardsBatchErrorCode[]
}

export async function generateAnkiCardsBatchMutation(
  libraryItemIds: string[]
): Promise<AnkiCardBatch[]> {
  const mutation = gql`
    mutation GenerateAnkiCardsBatch($libraryItemIds: [ID!]!) {
      generateAnkiCardsBatch(libraryItemIds: $libraryItemIds) {
        ... on GenerateAnkiCardsBatchSuccess {
          batches {
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
        ... on GenerateAnkiCardsBatchError {
          errorCodes
        }
      }
    }
  `

  const data = (await gqlFetcher(mutation, {
    libraryItemIds,
  })) as GenerateAnkiCardsBatchResult
  const error = data.generateAnkiCardsBatch.errorCodes?.find(() => true)
  if (error) {
    throw new Error(error)
  }

  return data.generateAnkiCardsBatch.batches || []
}
