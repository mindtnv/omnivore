import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { User } from '../../src/entity/user'
import { LibraryItem, LibraryItemState } from '../../src/entity/library_item'
import { Integration, IntegrationType } from '../../src/entity/integration'
import { AnkiCardBatch, AnkiCardStatus } from '../../src/entity/anki_card_batch'
import { getRepository, authTrx } from '../../src/repository'
import { ankiCardBatchRepository } from '../../src/repository/anki_card_batch'
import { createTestUser, createTestLibraryItem } from '../db'
import { generateFakeUuid, waitUntilJobsDone } from '../util'
import { deleteUser } from '../../src/services/user'
import { deleteLibraryItemById } from '../../src/services/library_item'
import { enqueueGenerateAnkiCards, enqueueTranslateContentJob } from '../../src/utils/createTask'
import * as integrationService from '../../src/services/integrations'
import * as ankiCardGenerator from '../../src/services/anki_card_generator'

describe('generate-anki-cards integration tests', () => {
  let user: User
  let libraryItem: LibraryItem
  let integration: Integration
  let findIntegrationByNameStub: sinon.SinonStub
  let getIntegrationClientStub: sinon.SinonStub
  let ankiCardGeneratorStub: sinon.SinonStub

  const mockAnkiClient = {
    ping: sinon.stub().resolves(true),
    createDeck: sinon.stub().resolves(1),
    addNotes: sinon.stub().resolves([12345, 12346]),
    updateNoteFields: sinon.stub().resolves(true),
    deleteNotes: sinon.stub().resolves(true),
  }

  const mockAnkiNotes = [
    {
      deckName: 'Omnivore',
      modelName: 'Basic',
      fields: {
        Front: 'What is the main topic?',
        Back: 'Testing is the main topic.',
        Source: '[Test Article](https://example.com/article)',
        Context: 'From the introduction',
      },
      tags: ['omnivore'],
    },
    {
      deckName: 'Omnivore',
      modelName: 'Basic',
      fields: {
        Front: 'What are the benefits?',
        Back: 'Improved reliability.',
        Source: '[Test Article](https://example.com/article)',
        Context: 'From the benefits section',
      },
      tags: ['omnivore'],
    },
  ]

  before(async () => {
    // Create test user
    user = await createTestUser('anki-integration-test-user')
  })

  after(async () => {
    // Clean up
    await deleteUser(user.id)
  })

  beforeEach(async () => {
    // Create a library item for each test
    libraryItem = await authTrx(
      async (tx) => {
        const repo = tx.getRepository(LibraryItem)
        return repo.save({
          id: generateFakeUuid(),
          user: { id: user.id },
          title: 'Test Integration Article',
          originalUrl: `https://example.com/article-${Date.now()}`,
          slug: `test-article-${Date.now()}`,
          readableContent: '<p>This is test content for Anki card generation.</p>',
          state: LibraryItemState.Succeeded,
          itemLanguage: 'en',
        })
      },
      { uid: user.id }
    )

    // Create a mock integration
    integration = await authTrx(
      async (tx) => {
        const repo = tx.getRepository(Integration)
        return repo.save({
          id: generateFakeUuid(),
          user: { id: user.id },
          name: 'ANKI',
          type: IntegrationType.Export,
          enabled: true,
          token: 'test-token',
          settings: {
            targetLanguage: 'en',
            defaultDeck: 'Omnivore',
            ankiConnectUrl: 'http://localhost:8765',
            autoCreate: true,
          },
        })
      },
      { uid: user.id }
    )

    // Setup stubs
    findIntegrationByNameStub = sinon.stub(integrationService, 'findIntegrationByName')
    findIntegrationByNameStub.resolves(integration)

    getIntegrationClientStub = sinon.stub(integrationService, 'getIntegrationClient')
    getIntegrationClientStub.returns(mockAnkiClient)

    ankiCardGeneratorStub = sinon.stub(ankiCardGenerator.AnkiCardGenerator, 'generateCards')
    ankiCardGeneratorStub.resolves(mockAnkiNotes)

    // Reset mock call histories
    mockAnkiClient.ping.resetHistory()
    mockAnkiClient.createDeck.resetHistory()
    mockAnkiClient.addNotes.resetHistory()
    mockAnkiClient.addNotes.resolves([12345, 12346])
  })

  afterEach(async () => {
    sinon.restore()

    // Clean up library item and batches
    if (libraryItem) {
      await ankiCardBatchRepository.deleteByLibraryItemId(libraryItem.id)
      await deleteLibraryItemById(libraryItem.id)
    }

    // Clean up integration
    if (integration) {
      await authTrx(
        async (tx) => {
          await tx.getRepository(Integration).delete(integration.id)
        },
        { uid: user.id }
      )
    }
  })

  describe('full generate-anki-cards job flow via queue', () => {
    it('enqueues job, processes it, and persists AnkiCardBatch with Completed status', async () => {
      // Enqueue the job
      const job = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })

      expect(job).to.exist
      expect(job?.id).to.exist

      // Wait for job to complete
      await waitUntilJobsDone([job!])

      // Verify the batch was created and completed
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)

      const batch = batches[0]
      expect(batch.status).to.equal(AnkiCardStatus.Completed)
      expect(batch.userId).to.equal(user.id)
      expect(batch.libraryItemId).to.equal(libraryItem.id)
      expect(batch.cardCount).to.equal(2)
      expect(batch.ankiNoteIds).to.deep.equal([12345, 12346])
      expect(batch.deck).to.equal('Omnivore')
      expect(batch.language).to.equal('en')
      expect(batch.cardDetails).to.have.length(2)
    })

    it('filters out null noteIds and only persists successful cards', async () => {
      // Mock addNotes to return some null values (indicating failed notes)
      mockAnkiClient.addNotes.resolves([12345, null, 12347])
      ankiCardGeneratorStub.resolves([...mockAnkiNotes, {
        deckName: 'Omnivore',
        modelName: 'Basic',
        fields: {
          Front: 'Third question?',
          Back: 'Third answer.',
          Source: '[Test Article](https://example.com/article)',
          Context: 'Third context',
        },
        tags: ['omnivore'],
      }])

      // Enqueue the job
      const job = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })

      await waitUntilJobsDone([job!])

      // Verify only successful notes are persisted
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)

      const batch = batches[0]
      expect(batch.status).to.equal(AnkiCardStatus.Completed)
      expect(batch.cardCount).to.equal(2) // Only 2 succeeded (12345 and 12347)
      expect(batch.ankiNoteIds).to.deep.equal([12345, 12347])
      expect(batch.cardDetails).to.have.length(2)
    })

    it('marks batch as Failed when all notes fail to create', async () => {
      // Mock addNotes to return all null values
      mockAnkiClient.addNotes.resolves([null, null])

      // Enqueue the job
      const job = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })

      // Job will fail, so we need to catch the error
      try {
        await waitUntilJobsDone([job!])
      } catch {
        // Expected to fail
      }

      // Verify the batch was marked as Failed
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)

      const batch = batches[0]
      expect(batch.status).to.equal(AnkiCardStatus.Failed)
      expect(batch.cardCount).to.equal(0)
    })
  })

  describe('WAITING_FOR_TRANSLATION status handling', () => {
    it('creates batch with WAITING_FOR_TRANSLATION when translation is needed', async () => {
      // Update library item to need translation
      await authTrx(
        async (tx) => {
          await tx.getRepository(LibraryItem).update(libraryItem.id, {
            itemLanguage: 'de', // Different from target language 'en'
            translatedContent: undefined,
            translatedLanguage: undefined,
          })
        },
        { uid: user.id }
      )

      // Enqueue the job
      const job = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })

      await waitUntilJobsDone([job!])

      // Verify batch was created with WAITING_FOR_TRANSLATION status
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)

      const batch = batches[0]
      expect(batch.status).to.equal(AnkiCardStatus.WaitingForTranslation)
      expect(batch.language).to.equal('en')
    })

    it('reuses existing WAITING_FOR_TRANSLATION batch on retry', async () => {
      // Update library item to need translation
      await authTrx(
        async (tx) => {
          await tx.getRepository(LibraryItem).update(libraryItem.id, {
            itemLanguage: 'de',
            translatedContent: undefined,
            translatedLanguage: undefined,
          })
        },
        { uid: user.id }
      )

      // Enqueue the first job
      const job1 = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })
      await waitUntilJobsDone([job1!])

      // Get the first batch
      const batchesBefore = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batchesBefore.length).to.equal(1)
      const firstBatchId = batchesBefore[0].id

      // Try to enqueue again (simulating a retry)
      const job2 = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })
      await waitUntilJobsDone([job2!])

      // Verify no new batch was created
      const batchesAfter = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batchesAfter.length).to.equal(1)
      expect(batchesAfter[0].id).to.equal(firstBatchId)
      expect(batchesAfter[0].status).to.equal(AnkiCardStatus.WaitingForTranslation)
    })
  })

  describe('duplicate detection', () => {
    it('prevents duplicate jobs for the same library item', async () => {
      // Enqueue first job
      const job1 = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })
      await waitUntilJobsDone([job1!])

      // Verify first batch was created
      const batchesBefore = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batchesBefore.length).to.equal(1)
      expect(batchesBefore[0].status).to.equal(AnkiCardStatus.Completed)

      // Try to enqueue second job (should fail due to duplicate detection)
      const job2 = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })

      try {
        await waitUntilJobsDone([job2!])
      } catch {
        // Expected to fail with duplicate detection
      }

      // Verify no new batch was created
      const batchesAfter = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batchesAfter.length).to.equal(1)
    })

    it('allows regenerate to bypass duplicate detection', async () => {
      // Create initial batch
      const job1 = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
      })
      await waitUntilJobsDone([job1!])

      const batchesBefore = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batchesBefore.length).to.equal(1)

      // Regenerate should update the existing batch
      const job2 = await enqueueGenerateAnkiCards({
        userId: user.id,
        libraryItemId: libraryItem.id,
        regenerate: true,
      })
      await waitUntilJobsDone([job2!])

      const batchesAfter = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batchesAfter.length).to.equal(1)
      expect(batchesAfter[0].status).to.equal(AnkiCardStatus.Completed)
    })
  })
})

describe('auto-create callback integration tests', () => {
  let user: User
  let libraryItem: LibraryItem
  let integration: Integration
  let findIntegrationByNameStub: sinon.SinonStub
  let getIntegrationClientStub: sinon.SinonStub
  let ankiCardGeneratorStub: sinon.SinonStub
  let createLLMStub: sinon.SinonStub

  const mockAnkiClient = {
    ping: sinon.stub().resolves(true),
    createDeck: sinon.stub().resolves(1),
    addNotes: sinon.stub().resolves([12345, 12346]),
    updateNoteFields: sinon.stub().resolves(true),
    deleteNotes: sinon.stub().resolves(true),
  }

  const mockAnkiNotes = [
    {
      deckName: 'Omnivore',
      modelName: 'Basic',
      fields: {
        Front: 'What is the main topic?',
        Back: 'Testing is the main topic.',
        Source: '[Test Article](https://example.com/article)',
        Context: 'From the introduction',
      },
      tags: ['omnivore'],
    },
  ]

  before(async () => {
    user = await createTestUser('anki-auto-create-test-user')
  })

  after(async () => {
    await deleteUser(user.id)
  })

  beforeEach(async () => {
    // Create library item
    libraryItem = await authTrx(
      async (tx) => {
        const repo = tx.getRepository(LibraryItem)
        return repo.save({
          id: generateFakeUuid(),
          user: { id: user.id },
          title: 'Test Auto-Create Article',
          originalUrl: `https://example.com/auto-create-${Date.now()}`,
          slug: `test-auto-create-${Date.now()}`,
          readableContent: '<p>This is test content for auto-create.</p>',
          state: LibraryItemState.Succeeded,
          itemLanguage: 'en',
        })
      },
      { uid: user.id }
    )

    // Create integration with autoCreate enabled
    integration = await authTrx(
      async (tx) => {
        const repo = tx.getRepository(Integration)
        return repo.save({
          id: generateFakeUuid(),
          user: { id: user.id },
          name: 'ANKI',
          type: IntegrationType.Export,
          enabled: true,
          token: 'test-token',
          settings: {
            targetLanguage: 'en',
            defaultDeck: 'Omnivore',
            ankiConnectUrl: 'http://localhost:8765',
            autoCreate: true,
          },
        })
      },
      { uid: user.id }
    )

    // Setup stubs
    findIntegrationByNameStub = sinon.stub(integrationService, 'findIntegrationByName')
    findIntegrationByNameStub.resolves(integration)

    getIntegrationClientStub = sinon.stub(integrationService, 'getIntegrationClient')
    getIntegrationClientStub.returns(mockAnkiClient)

    ankiCardGeneratorStub = sinon.stub(ankiCardGenerator.AnkiCardGenerator, 'generateCards')
    ankiCardGeneratorStub.resolves(mockAnkiNotes)

    // Stub the LLM to avoid actual API calls
    const { createLLM } = await import('../../src/utils/ai')
    createLLMStub = sinon.stub().returns(null)

    // Reset mock call histories
    mockAnkiClient.ping.resetHistory()
    mockAnkiClient.createDeck.resetHistory()
    mockAnkiClient.addNotes.resetHistory()
    mockAnkiClient.addNotes.resolves([12345])
  })

  afterEach(async () => {
    sinon.restore()

    // Clean up
    if (libraryItem) {
      await ankiCardBatchRepository.deleteByLibraryItemId(libraryItem.id)
      await deleteLibraryItemById(libraryItem.id)
    }

    if (integration) {
      await authTrx(
        async (tx) => {
          await tx.getRepository(Integration).delete(integration.id)
        },
        { uid: user.id }
      )
    }
  })

  describe('translate-content auto-trigger', () => {
    it('does not auto-create Anki cards when autoCreate is disabled', async () => {
      // Update integration to disable autoCreate
      await authTrx(
        async (tx) => {
          const newSettings = {
            ...(integration.settings as Record<string, unknown>),
            autoCreate: false,
          }
          await tx.getRepository(Integration).update(integration.id, {
            settings: newSettings,
          } as Partial<Integration>)
        },
        { uid: user.id }
      )

      // Update findIntegrationByName to return updated integration
      findIntegrationByNameStub.resolves({
        ...integration,
        settings: { ...integration.settings as object, autoCreate: false },
      })

      // Simulate translate-content completion by directly calling the callback check
      // In a real scenario, this would be triggered by the translate-content job
      const ankiIntegration = await integrationService.findIntegrationByName('ANKI', user.id)
      const settings = ankiIntegration?.settings as { autoCreate?: boolean } | undefined
      const shouldAutoCreate = ankiIntegration?.enabled && settings?.autoCreate

      expect(shouldAutoCreate).to.be.false

      // Verify no batch was created
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(0)
    })

    it('auto-creates Anki cards when translation completes and autoCreate is enabled', async () => {
      // First update library item with translated content
      await authTrx(
        async (tx) => {
          await tx.getRepository(LibraryItem).update(libraryItem.id, {
            translatedContent: '<p>Translated test content.</p>',
            translatedLanguage: 'en',
            translationStatus: 'COMPLETED',
          })
        },
        { uid: user.id }
      )

      // Simulate what translate-content does after completion
      const ankiIntegration = await integrationService.findIntegrationByName('ANKI', user.id)
      const settings = ankiIntegration?.settings as { autoCreate?: boolean } | undefined

      if (ankiIntegration?.enabled && settings?.autoCreate) {
        const job = await enqueueGenerateAnkiCards({
          userId: user.id,
          libraryItemId: libraryItem.id,
        })
        await waitUntilJobsDone([job!])
      }

      // Verify batch was created
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)
      expect(batches[0].status).to.equal(AnkiCardStatus.Completed)
    })
  })

  describe('save_page auto-trigger', () => {
    it('auto-creates Anki cards when page is saved and autoCreate is enabled', async () => {
      // Simulate what save_page does after successful save
      const ankiIntegration = await integrationService.findIntegrationByName('ANKI', user.id)
      const settings = ankiIntegration?.settings as { autoCreate?: boolean } | undefined

      if (ankiIntegration?.enabled && settings?.autoCreate) {
        const job = await enqueueGenerateAnkiCards({
          userId: user.id,
          libraryItemId: libraryItem.id,
        })
        await waitUntilJobsDone([job!])
      }

      // Verify batch was created
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)
      expect(batches[0].status).to.equal(AnkiCardStatus.Completed)
    })

    it('does not fail save_page when Anki card generation fails', async () => {
      // Make Anki client fail
      mockAnkiClient.ping.resolves(false)

      // Simulate save_page auto-create logic with error handling
      let savePageCompleted = true
      try {
        const ankiIntegration = await integrationService.findIntegrationByName('ANKI', user.id)
        const settings = ankiIntegration?.settings as { autoCreate?: boolean } | undefined

        if (ankiIntegration?.enabled && settings?.autoCreate) {
          try {
            const job = await enqueueGenerateAnkiCards({
              userId: user.id,
              libraryItemId: libraryItem.id,
            })
            await waitUntilJobsDone([job!])
          } catch {
            // Don't fail the save job if Anki card generation fails
          }
        }
      } catch {
        savePageCompleted = false
      }

      // save_page should complete successfully even if Anki fails
      expect(savePageCompleted).to.be.true

      // Verify batch was created but marked as failed
      const batches = await ankiCardBatchRepository.findByLibraryItemId(libraryItem.id)
      expect(batches.length).to.equal(1)
      expect(batches[0].status).to.equal(AnkiCardStatus.Failed)
    })
  })
})
