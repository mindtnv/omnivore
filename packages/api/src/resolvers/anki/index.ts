import {
  AnkiCardBatchesError,
  AnkiCardBatchesErrorCode,
  AnkiCardBatchesSuccess,
  AnkiCardsError,
  AnkiCardsErrorCode,
  AnkiCardsSuccess,
  AnkiCardStatus as GqlAnkiCardStatus,
  AnkiIntegrationError,
  AnkiIntegrationErrorCode,
  AnkiIntegrationSuccess,
  GenerateAnkiCardsBatchError,
  GenerateAnkiCardsBatchErrorCode,
  GenerateAnkiCardsBatchSuccess,
  GenerateAnkiCardsError,
  GenerateAnkiCardsErrorCode,
  GenerateAnkiCardsSuccess,
  MutationGenerateAnkiCardsArgs,
  MutationGenerateAnkiCardsBatchArgs,
  MutationRegenerateAnkiCardsArgs,
  QueryAnkiCardBatchesArgs,
  QueryAnkiCardsArgs,
  RegenerateAnkiCardsError,
  RegenerateAnkiCardsErrorCode,
  RegenerateAnkiCardsSuccess,
} from '../../generated/graphql'
import {
  AnkiCardBatch,
  AnkiCardStatus,
} from '../../entity/anki_card_batch'
import { ankiCardBatchRepository } from '../../repository/anki_card_batch'
import { libraryItemRepository } from '../../repository/library_item'
import { findIntegrationByName } from '../../services/integrations'
import { enqueueGenerateAnkiCards } from '../../utils/createTask'
import { authorized } from '../../utils/gql-utils'
import { authTrx } from '../../repository'
import { createAnkiDeckName } from '../../utils/anki'

// Map entity status to GraphQL status
const mapStatusToGql = (status: AnkiCardStatus): GqlAnkiCardStatus => {
  const statusMap: Record<AnkiCardStatus, GqlAnkiCardStatus> = {
    [AnkiCardStatus.Pending]: GqlAnkiCardStatus.Pending,
    [AnkiCardStatus.Processing]: GqlAnkiCardStatus.Processing,
    [AnkiCardStatus.Completed]: GqlAnkiCardStatus.Completed,
    [AnkiCardStatus.Failed]: GqlAnkiCardStatus.Failed,
    [AnkiCardStatus.WaitingForTranslation]: GqlAnkiCardStatus.WaitingForTranslation,
  }
  return statusMap[status]
}

// Map GraphQL status to entity status
const mapGqlToStatus = (status: GqlAnkiCardStatus): AnkiCardStatus => {
  const statusMap: Record<GqlAnkiCardStatus, AnkiCardStatus> = {
    [GqlAnkiCardStatus.Pending]: AnkiCardStatus.Pending,
    [GqlAnkiCardStatus.Processing]: AnkiCardStatus.Processing,
    [GqlAnkiCardStatus.Completed]: AnkiCardStatus.Completed,
    [GqlAnkiCardStatus.Failed]: AnkiCardStatus.Failed,
    [GqlAnkiCardStatus.WaitingForTranslation]: AnkiCardStatus.WaitingForTranslation,
  }
  return statusMap[status]
}

// Transform batch entity to GraphQL type
const transformBatchToGql = (batch: AnkiCardBatch) => ({
  id: batch.id,
  libraryItemId: batch.libraryItemId,
  userId: batch.userId,
  deck: batch.deck,
  cardCount: batch.cardCount,
  status: mapStatusToGql(batch.status),
  language: batch.language,
  ankiNoteIds: batch.ankiNoteIds?.map(id => String(id)) ?? null,
  cardDetails: batch.cardDetails as Array<{
    question: string
    answer: string
    context?: string
  }> | null,
  createdAt: batch.createdAt,
  updatedAt: batch.updatedAt,
})

export const generateAnkiCardsResolver = authorized<
  GenerateAnkiCardsSuccess,
  GenerateAnkiCardsError,
  MutationGenerateAnkiCardsArgs
>(async (_, { libraryItemId }, { uid, log }) => {
  // 1. Check Anki integration exists and is enabled
  const integration = await findIntegrationByName('ANKI', uid)
  if (!integration || !integration.enabled) {
    return {
      errorCodes: [GenerateAnkiCardsErrorCode.IntegrationNotConfigured],
    }
  }

  // 2. Verify library item exists
  const libraryItem = await authTrx(
    async (tx) =>
      tx.withRepository(libraryItemRepository).findById(libraryItemId),
    { uid, replicationMode: 'replica' }
  )

  if (!libraryItem) {
    return {
      errorCodes: [GenerateAnkiCardsErrorCode.NotFound],
    }
  }

  // 3. Verify user owns the library item
  if (libraryItem.userId !== uid) {
    return {
      errorCodes: [GenerateAnkiCardsErrorCode.Unauthorized],
    }
  }

  // 4. Check for existing completed batch (duplicate detection)
  const existingBatches = await authTrx(
    async (tx) =>
      tx.withRepository(ankiCardBatchRepository).findByLibraryItemId(libraryItemId),
    { uid, replicationMode: 'replica' }
  )
  const completedBatch = existingBatches.find(
    (b) => b.status === AnkiCardStatus.Completed
  )

  if (completedBatch) {
    return {
      errorCodes: [GenerateAnkiCardsErrorCode.AlreadyExists],
    }
  }

  // 5. Get deck name from integration settings
  const settings = (integration.settings as { defaultDeck?: string }) || {}
  const parentDeck = settings.defaultDeck || 'Omnivore'

  // Create deck name with subdeck based on source
  const deckName = createAnkiDeckName(parentDeck, libraryItem)

  // 6. Create pending batch record
  const batch = await authTrx(
    async (tx) =>
      tx.withRepository(ankiCardBatchRepository).createBatch({
        libraryItemId,
        userId: uid,
        deck: deckName,
        status: AnkiCardStatus.Pending,
      }),
    { uid }
  )

  // 7. Enqueue job
  const job = await enqueueGenerateAnkiCards({
    userId: uid,
    libraryItemId,
  })

  if (!job) {
    log.error('Failed to enqueue Anki card generation', { libraryItemId })
    // Delete the batch we just created since the job failed to enqueue
    await authTrx(
      async (tx) => tx.withRepository(ankiCardBatchRepository).deleteBatch(batch.id),
      { uid }
    )
    return {
      errorCodes: [GenerateAnkiCardsErrorCode.FailedToEnqueue],
    }
  }

  log.info('Anki card generation enqueued', { libraryItemId, jobId: job.id })

  return {
    batch: transformBatchToGql(batch),
  }
})

export const generateAnkiCardsBatchResolver = authorized<
  GenerateAnkiCardsBatchSuccess,
  GenerateAnkiCardsBatchError,
  MutationGenerateAnkiCardsBatchArgs
>(async (_, { input }, { uid, log }) => {
  const { libraryItemIds } = input

  // 1. Validate input
  if (!libraryItemIds || libraryItemIds.length === 0) {
    return {
      errorCodes: [GenerateAnkiCardsBatchErrorCode.BadRequest],
    }
  }

  // 2. Check integration
  const integration = await findIntegrationByName('ANKI', uid)
  if (!integration || !integration.enabled) {
    return {
      errorCodes: [GenerateAnkiCardsBatchErrorCode.IntegrationNotConfigured],
    }
  }

  // 3. Validate all library items exist and are owned by user
  const invalidIds: string[] = []
  const unauthorizedIds: string[] = []
  const validIds: string[] = []

  for (const libraryItemId of libraryItemIds) {
    const libraryItem = await authTrx(
      async (tx) =>
        tx.withRepository(libraryItemRepository).findById(libraryItemId),
      { uid, replicationMode: 'replica' }
    )

    if (!libraryItem) {
      invalidIds.push(libraryItemId)
    } else if (libraryItem.userId !== uid) {
      unauthorizedIds.push(libraryItemId)
    } else {
      validIds.push(libraryItemId)
    }
  }

  // Return error if any unauthorized items
  if (unauthorizedIds.length > 0) {
    log.warn('Batch contains unauthorized items', { unauthorizedIds })
    return {
      errorCodes: [GenerateAnkiCardsBatchErrorCode.Unauthorized],
    }
  }

  // Return error if any invalid items
  if (invalidIds.length > 0) {
    log.warn('Batch contains invalid items', { invalidIds })
    return {
      errorCodes: [GenerateAnkiCardsBatchErrorCode.BadRequest],
    }
  }

  // 4. Enqueue jobs for valid items only
  let enqueuedCount = 0
  for (const libraryItemId of validIds) {
    try {
      const job = await enqueueGenerateAnkiCards({
        userId: uid,
        libraryItemId,
      })
      if (job) {
        enqueuedCount++
      }
    } catch (error) {
      log.error('Failed to enqueue job for item', { libraryItemId, error })
    }
  }

  log.info('Batch Anki card generation enqueued', {
    total: libraryItemIds.length,
    enqueued: enqueuedCount,
  })

  return {
    jobsEnqueued: enqueuedCount,
  }
})

export const regenerateAnkiCardsResolver = authorized<
  RegenerateAnkiCardsSuccess,
  RegenerateAnkiCardsError,
  MutationRegenerateAnkiCardsArgs
>(async (_, { libraryItemId }, { uid, log }) => {
  // 1. Check integration
  const integration = await findIntegrationByName('ANKI', uid)
  if (!integration || !integration.enabled) {
    return {
      errorCodes: [RegenerateAnkiCardsErrorCode.IntegrationNotConfigured],
    }
  }

  // 2. Verify library item exists
  const libraryItem = await authTrx(
    async (tx) =>
      tx.withRepository(libraryItemRepository).findById(libraryItemId),
    { uid, replicationMode: 'replica' }
  )

  if (!libraryItem) {
    return {
      errorCodes: [RegenerateAnkiCardsErrorCode.NotFound],
    }
  }

  // 3. Verify user owns the library item
  if (libraryItem.userId !== uid) {
    return {
      errorCodes: [RegenerateAnkiCardsErrorCode.Unauthorized],
    }
  }

  // 4. Check for existing batch
  const existingBatches = await authTrx(
    async (tx) =>
      tx.withRepository(ankiCardBatchRepository).findByLibraryItemId(libraryItemId),
    { uid, replicationMode: 'replica' }
  )
  if (existingBatches.length === 0) {
    return {
      errorCodes: [RegenerateAnkiCardsErrorCode.NotFound],
    }
  }

  // 5. Find existing completed batch or use the most recent one
  let batch = existingBatches.find((b) => b.status === AnkiCardStatus.Completed)
  if (!batch) {
    batch = existingBatches[0] // Most recent batch
  }

  // 6. Update batch to Processing status
  await authTrx(
    async (tx) => tx.withRepository(ankiCardBatchRepository).updateStatus(batch.id, AnkiCardStatus.Processing),
    { uid }
  )
  batch.status = AnkiCardStatus.Processing

  // 7. Enqueue with regenerate flag
  const job = await enqueueGenerateAnkiCards({
    userId: uid,
    libraryItemId,
    regenerate: true,
  })

  if (!job) {
    log.error('Failed to enqueue Anki card regeneration', { libraryItemId })
    return {
      errorCodes: [RegenerateAnkiCardsErrorCode.FailedToEnqueue],
    }
  }

  log.info('Anki card regeneration enqueued', { libraryItemId, jobId: job.id })

  return {
    batch: transformBatchToGql(batch),
  }
})

export const ankiCardsResolver = authorized<
  AnkiCardsSuccess,
  AnkiCardsError,
  QueryAnkiCardsArgs
>(async (_, { libraryItemId }, { uid }) => {
  // 1. Verify library item exists
  const libraryItem = await authTrx(
    async (tx) =>
      tx.withRepository(libraryItemRepository).findById(libraryItemId),
    { uid, replicationMode: 'replica' }
  )

  if (!libraryItem) {
    return {
      errorCodes: [AnkiCardsErrorCode.NotFound],
    }
  }

  // 2. Verify user owns the library item
  if (libraryItem.userId !== uid) {
    return {
      errorCodes: [AnkiCardsErrorCode.Unauthorized],
    }
  }

  // 3. Get most recent batch for this item
  const batches = await authTrx(
    async (tx) =>
      tx.withRepository(ankiCardBatchRepository).findByLibraryItemId(libraryItemId),
    { uid, replicationMode: 'replica' }
  )
  const batch = batches.length > 0 ? batches[0] : null

  return {
    batch: batch ? transformBatchToGql(batch) : null,
  }
})

export const ankiCardBatchesResolver = authorized<
  AnkiCardBatchesSuccess,
  AnkiCardBatchesError,
  QueryAnkiCardBatchesArgs
>(async (_, { input }, { uid }) => {
  const status = input?.status
  const first = input?.first || 10
  const after = input?.after

  // 1. Parse cursor for pagination
  const offset = after
    ? parseInt(Buffer.from(after, 'base64').toString('utf-8'), 10)
    : 0

  // 2. Query batches with optional status filter
  let batches: AnkiCardBatch[]
  if (status) {
    batches = await authTrx(
      async (tx) =>
        tx.withRepository(ankiCardBatchRepository).findByUserIdAndStatus(
          uid,
          mapGqlToStatus(status)
        ),
      { uid, replicationMode: 'replica' }
    )
  } else {
    batches = await authTrx(
      async (tx) =>
        tx.withRepository(ankiCardBatchRepository).findByUserIdWithPagination(
          uid,
          first + 1, // fetch one extra to check for next page
          offset
        ),
      { uid, replicationMode: 'replica' }
    )
  }

  // 3. Check if there's a next page
  const hasNextPage = batches.length > first
  if (hasNextPage) {
    batches = batches.slice(0, first)
  }

  // 4. Build page info
  const endCursor = hasNextPage
    ? Buffer.from((offset + first).toString()).toString('base64')
    : null

  return {
    batches: batches.map(transformBatchToGql),
    pageInfo: {
      hasNextPage,
      hasPreviousPage: offset > 0,
      startCursor:
        offset > 0 ? Buffer.from(offset.toString()).toString('base64') : null,
      endCursor,
    },
  }
})

export const ankiIntegrationResolver = authorized<
  AnkiIntegrationSuccess,
  AnkiIntegrationError
>(async (_, __, { uid }) => {
  const integration = await findIntegrationByName('ANKI', uid)

  if (!integration) {
    return {
      errorCodes: [AnkiIntegrationErrorCode.NotFound],
    }
  }

  return {
    integration,
  }
})
