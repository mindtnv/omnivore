import { gql } from 'graphql-request'
import { gqlFetcher } from '../networkHelpers'

type TranslationSettings = {
  preferredLanguage?: string
  autoTranslate?: boolean
}

type SetUserPersonalizationResult = {
  updatedUserPersonalization?: TranslationSettings
  errorCodes?: string[]
}

type SetUserPersonalizationResponse = {
  setUserPersonalization: SetUserPersonalizationResult
}

export async function updateTranslationSettingsMutation(
  settings: TranslationSettings
): Promise<TranslationSettings | undefined> {
  const mutation = gql`
    mutation SetUserPersonalization($input: SetUserPersonalizationInput!) {
      setUserPersonalization(input: $input) {
        ... on SetUserPersonalizationError {
          errorCodes
        }
        ... on SetUserPersonalizationSuccess {
          updatedUserPersonalization {
            preferredLanguage
            autoTranslate
          }
        }
      }
    }
  `

  try {
    const data = (await gqlFetcher(mutation, {
      input: settings,
    })) as SetUserPersonalizationResponse

    return data.setUserPersonalization.updatedUserPersonalization
  } catch (err) {
    console.log('error updating translation settings', err)
    return undefined
  }
}
