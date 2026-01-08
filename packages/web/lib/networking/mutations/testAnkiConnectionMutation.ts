import { gql } from 'graphql-request'
import { gqlFetcher } from '../networkHelpers'

type TestAnkiConnectionResult = {
  testAnkiConnection?: TestAnkiConnectionData
}

type TestAnkiConnectionData = {
  success?: boolean
  version?: number
  errorCodes?: string[]
}

export async function testAnkiConnectionMutation(
  ankiConnectUrl: string,
  apiKey?: string
): Promise<{ success: boolean; version?: number }> {
  const mutation = gql`
    mutation TestAnkiConnection($input: TestAnkiConnectionInput!) {
      testAnkiConnection(input: $input) {
        ... on TestAnkiConnectionSuccess {
          success
          version
        }
        ... on TestAnkiConnectionError {
          errorCodes
        }
      }
    }
  `

  const data = (await gqlFetcher(mutation, {
    input: { ankiConnectUrl, apiKey },
  })) as TestAnkiConnectionResult

  const error = data.testAnkiConnection?.errorCodes?.find(() => true)
  if (error) {
    throw new Error(error)
  }

  return {
    success: data.testAnkiConnection?.success ?? false,
    version: data.testAnkiConnection?.version,
  }
}
