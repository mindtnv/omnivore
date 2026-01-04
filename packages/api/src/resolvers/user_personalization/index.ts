import { UserPersonalization } from '../../entity/user_personalization'
import {
  GetUserPersonalizationError,
  GetUserPersonalizationResult,
  MutationSetUserPersonalizationArgs,
  SetUserPersonalizationError,
  SetUserPersonalizationErrorCode,
  SetUserPersonalizationInput,
  SetUserPersonalizationSuccess,
  SortOrder,
} from '../../generated/graphql'
import { authorized } from '../../utils/gql-utils'

export const setUserPersonalizationResolver = authorized<
  SetUserPersonalizationSuccess,
  SetUserPersonalizationError,
  MutationSetUserPersonalizationArgs
>(async (_, { input }, { authTrx, uid }) => {
  // Filter out null values and digestConfig for the update
  const updateData: Partial<UserPersonalization> = {
    user: { id: uid } as any,
  }

  // Copy non-null values from input
  if (input.theme !== undefined && input.theme !== null) updateData.theme = input.theme
  if (input.fontSize !== undefined && input.fontSize !== null) updateData.fontSize = input.fontSize
  if (input.fontFamily !== undefined && input.fontFamily !== null) updateData.fontFamily = input.fontFamily
  if (input.margin !== undefined && input.margin !== null) updateData.margin = input.margin
  if (input.libraryLayoutType !== undefined && input.libraryLayoutType !== null) updateData.libraryLayoutType = input.libraryLayoutType
  if (input.librarySortOrder !== undefined && input.librarySortOrder !== null) updateData.librarySortOrder = input.librarySortOrder
  if (input.speechVoice !== undefined && input.speechVoice !== null) updateData.speechVoice = input.speechVoice
  if (input.speechSecondaryVoice !== undefined && input.speechSecondaryVoice !== null) updateData.speechSecondaryVoice = input.speechSecondaryVoice
  if (input.speechRate !== undefined && input.speechRate !== null) updateData.speechRate = input.speechRate
  if (input.speechVolume !== undefined && input.speechVolume !== null) updateData.speechVolume = input.speechVolume
  if (input.fields !== undefined && input.fields !== null) updateData.fields = input.fields
  if (input.digestConfig !== undefined && input.digestConfig !== null) updateData.digestConfig = input.digestConfig as any
  if (input.preferredLanguage !== undefined && input.preferredLanguage !== null) updateData.preferredLanguage = input.preferredLanguage
  if (input.autoTranslate !== undefined && input.autoTranslate !== null) updateData.autoTranslate = input.autoTranslate

  const result = await authTrx(async (t) => {
    return t.getRepository(UserPersonalization).upsert(updateData, ['user'])
  })

  if (result.identifiers.length === 0) {
    return {
      errorCodes: [SetUserPersonalizationErrorCode.NotFound],
    }
  }

  const updatedUserPersonalization = await authTrx((t) =>
    t
      .getRepository(UserPersonalization)
      .findOneBy({ id: result.identifiers[0].id as string })
  )

  // Cast SortOrder from string to enum
  const librarySortOrder =
    updatedUserPersonalization?.librarySortOrder as SortOrder

  return {
    updatedUserPersonalization: {
      ...updatedUserPersonalization,
      librarySortOrder,
    },
  }
})

export const getUserPersonalizationResolver = authorized<
  GetUserPersonalizationResult,
  GetUserPersonalizationError
>(async (_parent, _args, { authTrx, uid }) => {
  const userPersonalization = await authTrx((t) =>
    t.getRepository(UserPersonalization).findOneBy({
      user: { id: uid },
    })
  )

  // Cast SortOrder from string to enum
  const librarySortOrder = userPersonalization?.librarySortOrder as SortOrder

  return { userPersonalization: { ...userPersonalization, librarySortOrder } }
})
