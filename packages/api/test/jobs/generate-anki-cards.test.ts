import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { LibraryItem, LibraryItemState } from '../../src/entity/library_item'
import { AnkiCardBatch, AnkiCardStatus } from '../../src/entity/anki_card_batch'
import { Integration } from '../../src/entity/integration'
import * as repository from '../../src/repository'
import * as libraryItemRepo from '../../src/repository/library_item'
import * as ankiCardBatchRepo from '../../src/repository/anki_card_batch'
import * as integrationService from '../../src/services/integrations'
import * as ankiCardGenerator from '../../src/services/anki_card_generator'
import { generateAnkiCards, GenerateAnkiCardsJobData } from '../../src/jobs/generate-anki-cards'

describe('generateAnkiCards job', () => {
  let authTrxStub: sinon.SinonStub
  let findIntegrationByNameStub: sinon.SinonStub
  let getIntegrationClientStub: sinon.SinonStub
  let ankiCardBatchFindByLibraryItemIdStub: sinon.SinonStub
  let ankiCardBatchCreateBatchStub: sinon.SinonStub
  let ankiCardBatchUpdateBatchStub: sinon.SinonStub
  let ankiCardGeneratorStub: sinon.SinonStub

  const testUserId = 'test-user-id'
  const testLibraryItemId = 'test-library-item-id'
  const testBatchId = 'test-batch-id'

  const mockLibraryItem: Partial<LibraryItem> = {
    id: testLibraryItemId,
    state: LibraryItemState.Succeeded,
    title: 'Test Article',
    originalUrl: 'https://example.com/article',
    siteName: 'Example',
    author: 'Test Author',
    readableContent: '<p>This is test content for the article.</p>',
    itemLanguage: 'en',
    labels: [],
  }

  const mockIntegration: Partial<Integration> = {
    id: 'test-integration-id',
    name: 'ANKI',
    enabled: true,
    token: 'test-token',
    settings: {
      targetLanguage: 'en',
      defaultDeck: 'Omnivore',
      ankiConnectUrl: 'http://localhost:8765',
      autoCreate: true,
    },
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

  const mockAnkiClient = {
    ping: sinon.stub().resolves(true),
    createDeck: sinon.stub().resolves(1),
    addNotes: sinon.stub().resolves([12345, 12346]),
    updateNoteFields: sinon.stub().resolves(true),
    deleteNotes: sinon.stub().resolves(true),
  }

  beforeEach(() => {
    authTrxStub = sinon.stub(repository, 'authTrx')
    findIntegrationByNameStub = sinon.stub(integrationService, 'findIntegrationByName')
    getIntegrationClientStub = sinon.stub(integrationService, 'getIntegrationClient')
    ankiCardBatchFindByLibraryItemIdStub = sinon.stub(ankiCardBatchRepo.ankiCardBatchRepository, 'findByLibraryItemId')
    ankiCardBatchCreateBatchStub = sinon.stub(ankiCardBatchRepo.ankiCardBatchRepository, 'createBatch')
    ankiCardBatchUpdateBatchStub = sinon.stub(ankiCardBatchRepo.ankiCardBatchRepository, 'updateBatch')
    ankiCardGeneratorStub = sinon.stub(ankiCardGenerator.AnkiCardGenerator, 'generateCards')
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('successful card generation', () => {
    it('generates and sends cards to Anki successfully', async () => {
      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes)

      // Execute
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify
      expect(findIntegrationByNameStub.calledWith('ANKI', testUserId)).to.be.true
      expect(ankiCardBatchCreateBatchStub.calledOnce).to.be.true
      expect(ankiCardGeneratorStub.calledOnce).to.be.true
      expect(mockAnkiClient.ping.calledOnce).to.be.true
      expect(mockAnkiClient.createDeck.calledWith('Omnivore')).to.be.true
      expect(mockAnkiClient.addNotes.calledOnce).to.be.true
      expect(ankiCardBatchUpdateBatchStub.calledWith(testBatchId, sinon.match({
        status: AnkiCardStatus.Completed,
      }))).to.be.true
    })
  })

  describe('duplicate detection', () => {
    it('throws error when cards already exist for the item', async () => {
      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      ankiCardBatchFindByLibraryItemIdStub.resolves([
        { id: 'existing-batch', status: AnkiCardStatus.Completed } as AnkiCardBatch,
      ])

      // Execute and verify
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('Cards already exist for this item')
      }
    })

    it('throws error when card generation is already in progress', async () => {
      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      ankiCardBatchFindByLibraryItemIdStub.resolves([
        { id: 'existing-batch', status: AnkiCardStatus.Processing } as AnkiCardBatch,
      ])

      // Execute and verify
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('Card generation already in progress')
      }
    })
  })

  describe('regenerate logic', () => {
    it('updates existing notes when count matches', async () => {
      const existingBatch: Partial<AnkiCardBatch> = {
        id: 'existing-batch',
        status: AnkiCardStatus.Completed,
        ankiNoteIds: [111, 222],
        cardCount: 2,
      }

      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([existingBatch])
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes) // 2 notes

      // Execute
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        regenerate: true,
      }

      await generateAnkiCards(jobData)

      // Verify update was called instead of delete+create
      expect(mockAnkiClient.updateNoteFields.calledOnce).to.be.true
      expect(mockAnkiClient.deleteNotes.called).to.be.false
      expect(mockAnkiClient.addNotes.called).to.be.false
    })

    it('deletes old and creates new notes when count differs', async () => {
      const existingBatch: Partial<AnkiCardBatch> = {
        id: 'existing-batch',
        status: AnkiCardStatus.Completed,
        ankiNoteIds: [111],
        cardCount: 1,
      }

      const threeNotes = [...mockAnkiNotes, {
        deckName: 'Omnivore',
        modelName: 'Basic',
        fields: {
          Front: 'Third question?',
          Back: 'Third answer.',
          Source: '[Test Article](https://example.com/article)',
          Context: 'More context',
        },
        tags: ['omnivore'],
      }]

      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([existingBatch])
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(threeNotes) // 3 notes vs 1 existing
      mockAnkiClient.addNotes.resolves([12345, 12346, 12347])

      // Execute
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        regenerate: true,
      }

      await generateAnkiCards(jobData)

      // Verify delete was called before add
      expect(mockAnkiClient.deleteNotes.calledOnce).to.be.true
      expect(mockAnkiClient.deleteNotes.calledWith([111])).to.be.true
      expect(mockAnkiClient.addNotes.calledOnce).to.be.true
    })
  })

  describe('content selection', () => {
    it('uses translated content when available and matches target language', async () => {
      const itemWithTranslation: Partial<LibraryItem> = {
        ...mockLibraryItem,
        translatedContent: '<p>Translated content here.</p>',
        translatedLanguage: 'en',
        itemLanguage: 'de',
      }

      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(itemWithTranslation),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes)

      // Execute
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify generateCards was called with translated content
      expect(ankiCardGeneratorStub.calledOnce).to.be.true
      const callArgs = ankiCardGeneratorStub.firstCall.args
      expect(callArgs[0]).to.equal('<p>Translated content here.</p>')
    })

    it('uses original content when no translation available', async () => {
      // Setup mocks
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes)

      // Execute
      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify generateCards was called with original content
      expect(ankiCardGeneratorStub.calledOnce).to.be.true
      const callArgs = ankiCardGeneratorStub.firstCall.args
      expect(callArgs[0]).to.equal('<p>This is test content for the article.</p>')
    })
  })

  describe('error handling', () => {
    it('throws error when library item not found', async () => {
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(null),
          }),
        }
        return fn(mockTx)
      })

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('Library item not found')
      }
    })

    it('throws error when Anki integration not found', async () => {
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(null)

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('Anki integration not configured')
      }
    })

    it('throws error when Anki integration is disabled', async () => {
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves({ ...mockIntegration, enabled: false })

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('Anki integration is disabled')
      }
    })

    it('throws error when Anki is not running', async () => {
      const notRunningAnkiClient = {
        ...mockAnkiClient,
        ping: sinon.stub().resolves(false),
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(notRunningAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes)

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('Anki is not running')
        // Verify batch was marked as failed
        expect(ankiCardBatchUpdateBatchStub.calledWith(testBatchId, sinon.match({
          status: AnkiCardStatus.Failed,
        }))).to.be.true
      }
    })

    it('throws error when no cards generated', async () => {
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves([]) // No cards generated

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('No cards generated')
      }
    })

    it('updates batch status to FAILED on error', async () => {
      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(mockAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.rejects(new Error('LLM error'))

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('LLM error')
        // Verify batch was marked as failed
        expect(ankiCardBatchUpdateBatchStub.calledWith(testBatchId, sinon.match({
          status: AnkiCardStatus.Failed,
        }))).to.be.true
      }
    })
  })

  describe('WAITING_FOR_TRANSLATION status', () => {
    it('creates batch with WAITING_FOR_TRANSLATION when translation needed', async () => {
      const itemInGerman: Partial<LibraryItem> = {
        ...mockLibraryItem,
        itemLanguage: 'de',
        translatedContent: undefined,
        translatedLanguage: undefined,
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(itemInGerman),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration) // targetLanguage: 'en'
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify batch was created with WAITING_FOR_TRANSLATION status
      expect(ankiCardBatchCreateBatchStub.calledOnce).to.be.true
      const createArgs = ankiCardBatchCreateBatchStub.firstCall.args[0]
      expect(createArgs.status).to.equal(AnkiCardStatus.WaitingForTranslation)

      // Verify LLM was NOT called
      expect(ankiCardGeneratorStub.called).to.be.false
    })
  })

  describe('partial success handling', () => {
    it('handles partial success when some notes fail to add', async () => {
      // Setup mocks - addNotes returns fewer ids than notes sent
      const partialSuccessAnkiClient = {
        ...mockAnkiClient,
        addNotes: sinon.stub().resolves([12345]), // Only 1 of 2 succeeded
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(partialSuccessAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes) // 2 notes

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify batch was updated with actual count
      expect(ankiCardBatchUpdateBatchStub.calledWith(testBatchId, sinon.match({
        status: AnkiCardStatus.Completed,
        cardCount: 1, // Only 1 succeeded
        ankiNoteIds: [12345],
      }))).to.be.true
    })

    it('filters out null noteIds from addNotes response', async () => {
      // Setup mocks - addNotes returns array with null values
      const partialSuccessAnkiClient = {
        ...mockAnkiClient,
        addNotes: sinon.stub().resolves([12345, null, 12347]), // 2nd note failed
      }

      const threeNotes = [...mockAnkiNotes, {
        deckName: 'Omnivore',
        modelName: 'Basic',
        fields: {
          Front: 'Third question?',
          Back: 'Third answer.',
          Source: '[Test Article](https://example.com/article)',
          Context: 'Third context',
        },
        tags: ['omnivore'],
      }]

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(partialSuccessAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(threeNotes)

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify batch was updated with only successful notes (first and third)
      expect(ankiCardBatchUpdateBatchStub.calledWith(testBatchId, sinon.match({
        status: AnkiCardStatus.Completed,
        cardCount: 2,
        ankiNoteIds: [12345, 12347],
      }))).to.be.true
    })

    it('marks batch as Failed when all notes fail (all null)', async () => {
      // Setup mocks - addNotes returns all null values
      const allFailedAnkiClient = {
        ...mockAnkiClient,
        addNotes: sinon.stub().resolves([null, null]),
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(mockLibraryItem),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      getIntegrationClientStub.returns(allFailedAnkiClient)
      ankiCardBatchFindByLibraryItemIdStub.resolves([])
      ankiCardBatchCreateBatchStub.resolves({ id: testBatchId } as AnkiCardBatch)
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })
      ankiCardGeneratorStub.resolves(mockAnkiNotes)

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      try {
        await generateAnkiCards(jobData)
        expect.fail('Should have thrown an error')
      } catch (error: any) {
        expect(error.message).to.equal('No notes were successfully created in Anki')
        // Verify batch was marked as failed with cardCount 0
        expect(ankiCardBatchUpdateBatchStub.calledWith(testBatchId, sinon.match({
          status: AnkiCardStatus.Failed,
          cardCount: 0,
        }))).to.be.true
      }
    })
  })

  describe('WAITING_FOR_TRANSLATION batch reuse', () => {
    it('reuses existing WAITING_FOR_TRANSLATION batch instead of creating new one', async () => {
      const existingWaitingBatch: Partial<AnkiCardBatch> = {
        id: 'existing-waiting-batch',
        status: AnkiCardStatus.WaitingForTranslation,
        language: 'en',
        deck: 'Omnivore',
      }

      const itemInGerman: Partial<LibraryItem> = {
        ...mockLibraryItem,
        itemLanguage: 'de',
        translatedContent: undefined,
        translatedLanguage: undefined,
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(itemInGerman),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      ankiCardBatchFindByLibraryItemIdStub.resolves([existingWaitingBatch])
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify no new batch was created
      expect(ankiCardBatchCreateBatchStub.called).to.be.false
      // Verify LLM was NOT called
      expect(ankiCardGeneratorStub.called).to.be.false
    })

    it('updates existing WAITING_FOR_TRANSLATION batch if language/deck changed', async () => {
      const existingWaitingBatch: Partial<AnkiCardBatch> = {
        id: 'existing-waiting-batch',
        status: AnkiCardStatus.WaitingForTranslation,
        language: 'fr', // Different from target 'en'
        deck: 'OldDeck', // Different from 'Omnivore'
      }

      const itemInGerman: Partial<LibraryItem> = {
        ...mockLibraryItem,
        itemLanguage: 'de',
        translatedContent: undefined,
        translatedLanguage: undefined,
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          withRepository: () => ({
            findById: sinon.stub().resolves(itemInGerman),
          }),
        }
        return fn(mockTx)
      })

      findIntegrationByNameStub.resolves(mockIntegration)
      ankiCardBatchFindByLibraryItemIdStub.resolves([existingWaitingBatch])
      ankiCardBatchUpdateBatchStub.resolves({ affected: 1 })

      const jobData: GenerateAnkiCardsJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
      }

      await generateAnkiCards(jobData)

      // Verify no new batch was created
      expect(ankiCardBatchCreateBatchStub.called).to.be.false
      // Verify existing batch was updated with new language and deck
      expect(ankiCardBatchUpdateBatchStub.calledWith('existing-waiting-batch', sinon.match({
        itemLanguage: 'en',
        deck: 'Omnivore',
      }))).to.be.true
    })
  })
})
