import { LibraryItemState } from '../entity/library_item'
import { AnkiCardBatch, AnkiCardStatus } from '../entity/anki_card_batch'
import { authTrx } from '../repository'
import { libraryItemRepository } from '../repository/library_item'
import { ankiCardBatchRepository } from '../repository/anki_card_batch'
import {
  findIntegrationByName,
  getIntegrationClient,
} from '../services/integrations'
import { AnkiConnectClient, AnkiNote } from '../services/integrations/anki'
import { AnkiCardGenerator, CardMetadata } from '../services/anki_card_generator'
import { logger } from '../utils/logger'
import { createAnkiDeckName } from '../utils/anki'
import { ensureOmnivoreModel } from '../services/anki_model'

export interface GenerateAnkiCardsJobData {
  userId: string
  libraryItemId: string
  regenerate?: boolean
}

export const GENERATE_ANKI_CARDS_JOB_NAME = 'generate-anki-cards-job'

interface AnkiIntegrationSettings {
  targetLanguage?: string
  defaultDeck?: string
  ankiConnectUrl?: string
  autoCreate?: boolean
}

export const generateAnkiCards = async (
  jobData: GenerateAnkiCardsJobData
): Promise<void> => {
  const { userId, libraryItemId, regenerate } = jobData
  let batchId: string | undefined

  try {
    logger.info('Starting Anki card generation job', {
      userId,
      libraryItemId,
      regenerate,
    })

    // Load library item
    const libraryItem = await authTrx(
      async (tx) =>
        tx.withRepository(libraryItemRepository).findById(libraryItemId),
      {
        uid: userId,
        replicationMode: 'replica',
      }
    )

    if (!libraryItem) {
      logger.error('Library item not found', { libraryItemId })
      throw new Error('Library item not found')
    }

    if (libraryItem.state !== LibraryItemState.Succeeded) {
      logger.info('Library item not ready for card generation', {
        libraryItemId,
        state: libraryItem.state,
      })
      throw new Error(`Library item not ready, state: ${libraryItem.state}`)
    }

    // Load Anki integration
    const integration = await findIntegrationByName('ANKI', userId)
    if (!integration) {
      logger.error('Anki integration not found', { userId })
      throw new Error('Anki integration not configured')
    }

    if (!integration.enabled) {
      logger.info('Anki integration is disabled', { userId })
      throw new Error('Anki integration is disabled')
    }

    const settings = (integration.settings as AnkiIntegrationSettings) || {}
    const targetLanguage = settings.targetLanguage || 'en'
    const parentDeck = settings.defaultDeck || 'Omnivore'
    const ankiConnectUrl = settings.ankiConnectUrl || 'http://localhost:8765'

    // Create deck name with subdeck based on source
    const deckName = createAnkiDeckName(parentDeck, libraryItem)

    // Check for existing batches
    const existingBatches = await authTrx(
      async (tx) =>
        tx.withRepository(ankiCardBatchRepository).findByLibraryItemId(libraryItemId),
      { uid: userId, replicationMode: 'replica' }
    )

    if (!regenerate) {
      // Check for duplicates
      const completedBatch = existingBatches.find(
        (b) => b.status === AnkiCardStatus.Completed
      )
      if (completedBatch) {
        logger.info('Cards already exist for this item', {
          libraryItemId,
          batchId: completedBatch.id,
        })
        throw new Error('Cards already exist for this item')
      }

      const processingBatch = existingBatches.find(
        (b) => b.status === AnkiCardStatus.Processing
      )
      if (processingBatch) {
        logger.info('Card generation already in progress', {
          libraryItemId,
          batchId: processingBatch.id,
        })
        throw new Error('Card generation already in progress')
      }
    }

    // Determine content source
    let content: string
    const useTranslatedContent =
      libraryItem.translatedLanguage === targetLanguage &&
      libraryItem.translatedContent

    if (useTranslatedContent) {
      content = libraryItem.translatedContent!
      logger.info('Using translated content', {
        libraryItemId,
        language: targetLanguage,
      })
    } else if (
      targetLanguage !== (libraryItem.itemLanguage || 'en') &&
      !libraryItem.translatedContent
    ) {
      // Translation needed but not available yet
      logger.info('Waiting for translation', {
        libraryItemId,
        targetLanguage,
        itemLanguage: libraryItem.itemLanguage,
      })

      // Check for existing WAITING_FOR_TRANSLATION batch
      const existingWaitingBatch = existingBatches.find(
        (b) => b.status === AnkiCardStatus.WaitingForTranslation
      )

      if (existingWaitingBatch) {
        // Reuse existing waiting batch, optionally update language/deck if changed
        batchId = existingWaitingBatch.id
        if (
          existingWaitingBatch.language !== targetLanguage ||
          existingWaitingBatch.deck !== deckName
        ) {
          await authTrx(
            async (tx) =>
              tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
                language: targetLanguage!,
                deck: deckName!,
              }),
            { uid: userId }
          )
          logger.info('Updated existing WAITING_FOR_TRANSLATION batch', {
            batchId,
            language: targetLanguage,
            deck: deckName,
          })
        } else {
          logger.info('Reusing existing WAITING_FOR_TRANSLATION batch', {
            batchId,
          })
        }
      } else {
        // Create batch with WAITING_FOR_TRANSLATION status
        const batch = await authTrx(
          async (tx) =>
            tx.withRepository(ankiCardBatchRepository).createBatch({
              libraryItemId,
              userId,
              deck: deckName!,
              status: AnkiCardStatus.WaitingForTranslation,
              language: targetLanguage!,
            }),
          { uid: userId }
        )
        batchId = batch.id
        logger.info('Batch created with WAITING_FOR_TRANSLATION status', {
          batchId,
        })
      }
      return
    } else {
      content = libraryItem.readableContent
      logger.info('Using original content', { libraryItemId })
    }

    if (!content || content.trim().length === 0) {
      logger.error('Content is empty', { libraryItemId })
      throw new Error('Content is empty')
    }

    // Find existing batch (pending from resolver, or completed for regenerate)
    let existingBatch: AnkiCardBatch | undefined
    if (regenerate) {
      // For regenerate, find the completed or processing batch
      existingBatch = existingBatches.find(
        (b) => b.status === AnkiCardStatus.Completed || b.status === AnkiCardStatus.Processing
      )
    } else {
      // For new generation, find the pending batch created by the resolver
      existingBatch = existingBatches.find(
        (b) => b.status === AnkiCardStatus.Pending
      )
    }

    // Update batch to PROCESSING status or create fallback batch
    if (existingBatch) {
      batchId = existingBatch.id
      await authTrx(
        async (tx) =>
          tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
            status: AnkiCardStatus.Processing,
            language: targetLanguage!,
          }),
        { uid: userId }
      )
      logger.info('Updated existing batch to PROCESSING', { batchId, regenerate })
    } else {
      // Fallback: create batch if resolver didn't create one (shouldn't happen in normal flow)
      const batch = await authTrx(
        async (tx) =>
          tx.withRepository(ankiCardBatchRepository).createBatch({
            libraryItemId,
            userId,
            deck: deckName!,
            status: AnkiCardStatus.Processing,
            language: targetLanguage!,
          }),
        { uid: userId }
      )
      batchId = batch.id
      logger.info('Created fallback batch with PROCESSING status', { batchId })
    }

    // Prepare metadata for card generation
    const metadata: CardMetadata = {
      articleTitle: libraryItem.title,
      articleUrl: libraryItem.originalUrl,
      siteName: libraryItem.siteName || '',
      author: libraryItem.author || undefined,
      labels: libraryItem.labels?.map((l) => l.name) || [],
    }

    // Generate cards using LLM
    logger.info('Generating cards with LLM', {
      libraryItemId,
      targetLanguage,
      title: metadata.articleTitle,
    })

    const ankiNotes = await AnkiCardGenerator.generateCards(
      content,
      targetLanguage,
      metadata
    )

    if (ankiNotes.length === 0) {
      logger.warn('No cards generated from content', { libraryItemId })
      await authTrx(
        async (tx) =>
          tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
            status: AnkiCardStatus.Failed,
            cardCount: 0,
          }),
        { uid: userId }
      )
      throw new Error('No cards generated')
    }

    // Set deck name for all notes
    const notesWithDeck: AnkiNote[] = ankiNotes.map((note) => ({
      ...note,
      deckName: deckName,
    }))

    // Create AnkiConnect client and verify connection
    const ankiClient = getIntegrationClient(
      'anki',
      integration.token,
      integration
    ) as AnkiConnectClient

    const isAvailable = await ankiClient.ping()
    if (!isAvailable) {
      logger.error('Anki is not running', { ankiConnectUrl })
      await authTrx(
        async (tx) =>
          tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
            status: AnkiCardStatus.Failed,
          }),
        { uid: userId }
      )
      throw new Error('Anki is not running')
    }

    // Ensure Omnivore Enhanced model exists
    await ensureOmnivoreModel(ankiClient)

    // Create deck if needed
    await ankiClient.createDeck(deckName)
    logger.info('Deck ready', { deck: deckName })

    // Handle regenerate logic
    if (regenerate && existingBatch) {
      const existingNoteIds = existingBatch.ankiNoteIds || []
      const existingCount = existingNoteIds.length

      if (existingCount === notesWithDeck.length && existingCount > 0) {
        // Same count - update existing notes
        logger.info('Updating existing notes', {
          count: existingCount,
        })

        const updates = existingNoteIds.map((noteId: number, index: number) => ({
          id: noteId,
          fields: notesWithDeck[index].fields,
        }))

        await ankiClient.updateNoteFields(updates)

        // Update batch with card details
        const cardDetails = notesWithDeck.map((note) => ({
          question: note.fields.Front,
          answer: note.fields.Back,
          context: note.fields.Context,
        }))

        await authTrx(
          async (tx) =>
            tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
              status: AnkiCardStatus.Completed,
              cardCount: existingCount,
              cardDetails,
            }),
          { uid: userId }
        )

        logger.info('Cards updated successfully', {
          batchId,
          count: existingCount,
        })
        return
      } else {
        // Different count - delete old and create new
        logger.info('Deleting old notes and creating new ones', {
          oldCount: existingCount,
          newCount: notesWithDeck.length,
        })

        if (existingNoteIds.length > 0) {
          await ankiClient.deleteNotes(existingNoteIds)
        }
      }
    }

    // Add notes to Anki
    logger.info('Adding notes to Anki', { count: notesWithDeck.length })
    const rawNoteIds = await ankiClient.addNotes(notesWithDeck)

    // Filter out null/falsy noteIds and rebuild cardDetails for successful notes only
    const successfulNotes: { noteId: number; note: AnkiNote }[] = []
    for (let i = 0; i < rawNoteIds.length; i++) {
      const noteId = rawNoteIds[i]
      if (noteId != null && noteId !== 0) {
        successfulNotes.push({ noteId, note: notesWithDeck[i] })
      }
    }

    // Handle case where no notes were created
    if (successfulNotes.length === 0) {
      logger.error('No notes were successfully created in Anki', {
        libraryItemId,
        requestedCount: notesWithDeck.length,
      })
      await authTrx(
        async (tx) =>
          tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
            status: AnkiCardStatus.Failed,
            cardCount: 0,
          }),
        { uid: userId }
      )
      throw new Error('No notes were successfully created in Anki')
    }

    // Handle partial success
    if (successfulNotes.length < notesWithDeck.length) {
      logger.warn('Some notes were not created (likely duplicates)', {
        requested: notesWithDeck.length,
        created: successfulNotes.length,
      })
    }

    // Prepare card details for storage - only for successfully created notes
    const validNoteIds = successfulNotes.map((s) => s.noteId)
    const cardDetails = successfulNotes.map((s) => ({
      question: s.note.fields.Front,
      answer: s.note.fields.Back,
      context: s.note.fields.Context,
    }))

    // Update batch with success status
    await authTrx(
      async (tx) =>
        tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
          status: AnkiCardStatus.Completed,
          ankiNoteIds: validNoteIds,
          cardCount: validNoteIds.length,
          cardDetails,
          language: targetLanguage!,
          deck: deckName!,
        }),
      { uid: userId }
    )

    logger.info('Anki card generation completed successfully', {
      batchId,
      libraryItemId,
      cardCount: validNoteIds.length,
    })
  } catch (error) {
    logger.error('Error in Anki card generation job', {
      error,
      userId,
      libraryItemId,
      batchId,
    })

    // Update batch status to FAILED if we have a batchId
    if (batchId) {
      try {
        await authTrx(
          async (tx) =>
            tx.withRepository(ankiCardBatchRepository).updateBatch(batchId!, {
              status: AnkiCardStatus.Failed,
            }),
          { uid: userId }
        )
      } catch (updateError) {
        logger.error('Failed to update batch status to FAILED', {
          updateError,
          batchId,
        })
      }
    }

    throw error
  }
}
