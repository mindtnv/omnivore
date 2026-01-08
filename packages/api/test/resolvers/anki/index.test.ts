import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { User } from '../../../src/entity/user'
import { LibraryItem } from '../../../src/entity/library_item'
import { Integration, IntegrationType } from '../../../src/entity/integration'
import { AnkiCardBatch, AnkiCardStatus } from '../../../src/entity/anki_card_batch'
import { deleteUser } from '../../../src/services/user'
import { deleteLibraryItemById } from '../../../src/services/library_item'
import { ankiCardBatchRepository } from '../../../src/repository/anki_card_batch'
import { createTestLibraryItem, createTestUser } from '../../db'
import { generateFakeUuid, graphqlRequest, request } from '../../util'
import * as createTaskModule from '../../../src/utils/createTask'
import * as integrationsModule from '../../../src/services/integrations'
import { authTrx } from '../../../src/repository'

describe('Anki API', () => {
  let user: User
  let authToken: string
  let integration: Integration
  let enqueueStub: sinon.SinonStub
  let findIntegrationStub: sinon.SinonStub

  before(async () => {
    // create test user and login
    user = await createTestUser('ankiTestUser')
    const res = await request
      .post('/local/debug/fake-user-login')
      .send({ fakeEmail: user.email })
    authToken = res.body.authToken as string
  })

  after(async () => {
    // clean up
    await deleteUser(user.id)
  })

  beforeEach(async () => {
    // Create a mock integration
    integration = await authTrx(
      async (tx) =>
        tx.getRepository(Integration).save({
          user: { id: user.id },
          name: 'ANKI',
          type: IntegrationType.Export,
          token: 'test-token',
          enabled: true,
          settings: {
            ankiConnectUrl: 'http://localhost:8765',
            defaultDeck: 'Default',
            autoCreate: true,
          },
        }),
      { uid: user.id }
    )

    // Stub the enqueue function
    enqueueStub = sinon
      .stub(createTaskModule, 'enqueueGenerateAnkiCards')
      .resolves({ id: 'test-job-id' } as any)

    // Stub findIntegrationByName to return our mock integration
    findIntegrationStub = sinon
      .stub(integrationsModule, 'findIntegrationByName')
      .resolves(integration)
  })

  afterEach(async () => {
    sinon.restore()
    // Clean up integration
    await authTrx(
      async (tx) => tx.getRepository(Integration).delete({ user: { id: user.id } }),
      { uid: user.id }
    )
    // Clean up batches
    await ankiCardBatchRepository.deleteByUserId(user.id)
  })

  describe('generateAnkiCards mutation', () => {
    const query = `
      mutation GenerateAnkiCards($libraryItemId: ID!) {
        generateAnkiCards(libraryItemId: $libraryItemId) {
          ... on GenerateAnkiCardsSuccess {
            status
            message
          }
          ... on GenerateAnkiCardsError {
            errorCodes
          }
        }
      }
    `

    context('when integration is configured and item exists', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should enqueue job and return PENDING status', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.generateAnkiCards.status).to.equal('PENDING')
        expect(res.body.data.generateAnkiCards.message).to.equal('Card generation started')
        expect(enqueueStub.calledOnce).to.be.true
        expect(enqueueStub.firstCall.args[0]).to.deep.include({
          userId: user.id,
          libraryItemId: item.id,
        })
      })
    })

    context('when integration is not configured', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should return INTEGRATION_NOT_CONFIGURED error', async () => {
        findIntegrationStub.resolves(null)

        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.generateAnkiCards.errorCodes).to.include(
          'INTEGRATION_NOT_CONFIGURED'
        )
      })
    })

    context('when library item does not exist', () => {
      it('should return NOT_FOUND error', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: generateFakeUuid(),
        }).expect(200)

        expect(res.body.data.generateAnkiCards.errorCodes).to.include('NOT_FOUND')
      })
    })

    context('when completed batch already exists', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should return ALREADY_EXISTS error', async () => {
        // Create a completed batch
        await ankiCardBatchRepository.createBatch({
          userId: user.id,
          libraryItemId: item.id,
          deck: 'Default',
          status: AnkiCardStatus.Completed,
          cardCount: 5,
        })

        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.generateAnkiCards.errorCodes).to.include(
          'ALREADY_EXISTS'
        )
      })
    })

    context('when enqueue fails', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should return FAILED_TO_ENQUEUE error', async () => {
        enqueueStub.resolves(null)

        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.generateAnkiCards.errorCodes).to.include(
          'FAILED_TO_ENQUEUE'
        )
      })
    })
  })

  describe('generateAnkiCardsBatch mutation', () => {
    const query = `
      mutation GenerateAnkiCardsBatch($input: GenerateAnkiCardsBatchInput!) {
        generateAnkiCardsBatch(input: $input) {
          ... on GenerateAnkiCardsBatchSuccess {
            jobsEnqueued
          }
          ... on GenerateAnkiCardsBatchError {
            errorCodes
          }
        }
      }
    `

    context('when integration is configured', () => {
      let items: LibraryItem[]

      before(async () => {
        items = [
          await createTestLibraryItem(user.id),
          await createTestLibraryItem(user.id),
          await createTestLibraryItem(user.id),
        ]
      })

      after(async () => {
        for (const item of items) {
          await deleteLibraryItemById(item.id)
        }
      })

      it('should enqueue jobs for all items', async () => {
        const res = await graphqlRequest(query, authToken, {
          input: { libraryItemIds: items.map((i) => i.id) },
        }).expect(200)

        expect(res.body.data.generateAnkiCardsBatch.jobsEnqueued).to.equal(3)
        expect(enqueueStub.callCount).to.equal(3)
      })
    })

    context('when integration is not configured', () => {
      it('should return INTEGRATION_NOT_CONFIGURED error', async () => {
        findIntegrationStub.resolves(null)

        const res = await graphqlRequest(query, authToken, {
          input: { libraryItemIds: [generateFakeUuid()] },
        }).expect(200)

        expect(res.body.data.generateAnkiCardsBatch.errorCodes).to.include(
          'INTEGRATION_NOT_CONFIGURED'
        )
      })
    })

    context('when input is empty', () => {
      it('should return BAD_REQUEST error', async () => {
        const res = await graphqlRequest(query, authToken, {
          input: { libraryItemIds: [] },
        }).expect(200)

        expect(res.body.data.generateAnkiCardsBatch.errorCodes).to.include(
          'BAD_REQUEST'
        )
      })
    })
  })

  describe('regenerateAnkiCards mutation', () => {
    const query = `
      mutation RegenerateAnkiCards($libraryItemId: ID!) {
        regenerateAnkiCards(libraryItemId: $libraryItemId) {
          ... on RegenerateAnkiCardsSuccess {
            status
            message
          }
          ... on RegenerateAnkiCardsError {
            errorCodes
          }
        }
      }
    `

    context('when batch exists', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should enqueue with regenerate flag', async () => {
        // Create an existing batch
        await ankiCardBatchRepository.createBatch({
          userId: user.id,
          libraryItemId: item.id,
          deck: 'Default',
          status: AnkiCardStatus.Completed,
          cardCount: 5,
        })

        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.regenerateAnkiCards.status).to.equal('PROCESSING')
        expect(res.body.data.regenerateAnkiCards.message).to.equal(
          'Card regeneration started'
        )
        expect(enqueueStub.calledOnce).to.be.true
        expect(enqueueStub.firstCall.args[0]).to.deep.include({
          userId: user.id,
          libraryItemId: item.id,
          regenerate: true,
        })
      })
    })

    context('when no batch exists', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should return NOT_FOUND error', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.regenerateAnkiCards.errorCodes).to.include(
          'NOT_FOUND'
        )
      })
    })

    context('when library item does not exist', () => {
      it('should return NOT_FOUND error', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: generateFakeUuid(),
        }).expect(200)

        expect(res.body.data.regenerateAnkiCards.errorCodes).to.include(
          'NOT_FOUND'
        )
      })
    })
  })

  describe('ankiCards query', () => {
    const query = `
      query AnkiCards($libraryItemId: ID!) {
        ankiCards(libraryItemId: $libraryItemId) {
          ... on AnkiCardsSuccess {
            batch {
              id
              libraryItemId
              userId
              deck
              cardCount
              status
              language
              ankiNoteIds
              cardDetails {
                question
                answer
                context
              }
              createdAt
              updatedAt
            }
          }
          ... on AnkiCardsError {
            errorCodes
          }
        }
      }
    `

    context('when batch exists', () => {
      let item: LibraryItem
      let batch: AnkiCardBatch

      before(async () => {
        item = await createTestLibraryItem(user.id)
        batch = await ankiCardBatchRepository.createBatch({
          userId: user.id,
          libraryItemId: item.id,
          deck: 'Test Deck',
          status: AnkiCardStatus.Completed,
          cardCount: 3,
          language: 'en',
          ankiNoteIds: [1, 2, 3],
          cardDetails: [
            { question: 'Q1', answer: 'A1', context: 'C1' },
            { question: 'Q2', answer: 'A2', context: 'C2' },
            { question: 'Q3', answer: 'A3' },
          ],
        })
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should return the batch', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        const returnedBatch = res.body.data.ankiCards.batch
        expect(returnedBatch.id).to.equal(batch.id)
        expect(returnedBatch.libraryItemId).to.equal(item.id)
        expect(returnedBatch.deck).to.equal('Test Deck')
        expect(returnedBatch.cardCount).to.equal(3)
        expect(returnedBatch.status).to.equal('COMPLETED')
        expect(returnedBatch.ankiNoteIds).to.deep.equal([1, 2, 3])
        expect(returnedBatch.cardDetails).to.have.length(3)
      })
    })

    context('when no batch exists', () => {
      let item: LibraryItem

      before(async () => {
        item = await createTestLibraryItem(user.id)
      })

      after(async () => {
        await deleteLibraryItemById(item.id)
      })

      it('should return null batch', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: item.id,
        }).expect(200)

        expect(res.body.data.ankiCards.batch).to.be.null
      })
    })

    context('when library item does not exist', () => {
      it('should return NOT_FOUND error', async () => {
        const res = await graphqlRequest(query, authToken, {
          libraryItemId: generateFakeUuid(),
        }).expect(200)

        expect(res.body.data.ankiCards.errorCodes).to.include('NOT_FOUND')
      })
    })
  })

  describe('ankiCardBatches query', () => {
    const query = `
      query AnkiCardBatches($input: AnkiCardBatchesInput) {
        ankiCardBatches(input: $input) {
          ... on AnkiCardBatchesSuccess {
            batches {
              id
              status
              cardCount
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
          ... on AnkiCardBatchesError {
            errorCodes
          }
        }
      }
    `

    context('when user has batches', () => {
      let items: LibraryItem[]

      before(async () => {
        items = []
        for (let i = 0; i < 5; i++) {
          const item = await createTestLibraryItem(user.id)
          items.push(item)
          await ankiCardBatchRepository.createBatch({
            userId: user.id,
            libraryItemId: item.id,
            deck: `Deck ${i}`,
            status: i < 3 ? AnkiCardStatus.Completed : AnkiCardStatus.Pending,
            cardCount: i + 1,
          })
        }
      })

      after(async () => {
        for (const item of items) {
          await deleteLibraryItemById(item.id)
        }
      })

      it('should return all batches with pagination', async () => {
        const res = await graphqlRequest(query, authToken, {
          input: { first: 3 },
        }).expect(200)

        const { batches, pageInfo } = res.body.data.ankiCardBatches
        expect(batches).to.have.length(3)
        expect(pageInfo.hasNextPage).to.be.true
        expect(pageInfo.hasPreviousPage).to.be.false
      })

      it('should filter by status', async () => {
        const res = await graphqlRequest(query, authToken, {
          input: { status: 'COMPLETED' },
        }).expect(200)

        const { batches } = res.body.data.ankiCardBatches
        expect(batches.every((b: any) => b.status === 'COMPLETED')).to.be.true
      })

      it('should handle pagination cursors', async () => {
        // Get first page
        const firstRes = await graphqlRequest(query, authToken, {
          input: { first: 2 },
        }).expect(200)

        const { endCursor } = firstRes.body.data.ankiCardBatches.pageInfo

        // Get second page
        const secondRes = await graphqlRequest(query, authToken, {
          input: { first: 2, after: endCursor },
        }).expect(200)

        expect(secondRes.body.data.ankiCardBatches.pageInfo.hasPreviousPage).to.be
          .true
      })
    })

    context('when user has no batches', () => {
      it('should return empty array', async () => {
        const res = await graphqlRequest(query, authToken, {
          input: {},
        }).expect(200)

        expect(res.body.data.ankiCardBatches.batches).to.be.empty
      })
    })
  })

  describe('ankiIntegration query', () => {
    const query = `
      query {
        ankiIntegration {
          ... on AnkiIntegrationSuccess {
            integration {
              id
              name
              enabled
              settings
            }
          }
          ... on AnkiIntegrationError {
            errorCodes
          }
        }
      }
    `

    context('when integration exists', () => {
      it('should return the integration', async () => {
        const res = await graphqlRequest(query, authToken).expect(200)

        const { integration: returnedIntegration } =
          res.body.data.ankiIntegration
        expect(returnedIntegration.name).to.equal('ANKI')
        expect(returnedIntegration.enabled).to.be.true
        expect(returnedIntegration.settings).to.deep.include({
          ankiConnectUrl: 'http://localhost:8765',
          defaultDeck: 'Default',
        })
      })
    })

    context('when integration does not exist', () => {
      it('should return NOT_FOUND error', async () => {
        findIntegrationStub.resolves(null)

        const res = await graphqlRequest(query, authToken).expect(200)

        expect(res.body.data.ankiIntegration.errorCodes).to.include('NOT_FOUND')
      })
    })
  })

  describe('unauthorized access', () => {
    const queries = [
      {
        name: 'generateAnkiCards',
        query: `mutation { generateAnkiCards(libraryItemId: "test") { ... on GenerateAnkiCardsError { errorCodes } } }`,
      },
      {
        name: 'ankiCards',
        query: `query { ankiCards(libraryItemId: "test") { ... on AnkiCardsError { errorCodes } } }`,
      },
      {
        name: 'ankiCardBatches',
        query: `query { ankiCardBatches { ... on AnkiCardBatchesError { errorCodes } } }`,
      },
      {
        name: 'ankiIntegration',
        query: `query { ankiIntegration { ... on AnkiIntegrationError { errorCodes } } }`,
      },
    ]

    for (const { name, query } of queries) {
      it(`${name} should return 500 for invalid token`, async () => {
        return graphqlRequest(query, 'invalid-token').expect(500)
      })
    }
  })

  describe('cross-user authorization', () => {
    let otherUser: User
    let otherUserItem: LibraryItem

    before(async () => {
      // Create another user and a library item owned by them
      otherUser = await createTestUser('ankiOtherUser')
      otherUserItem = await createTestLibraryItem(otherUser.id)
    })

    after(async () => {
      await deleteLibraryItemById(otherUserItem.id)
      await deleteUser(otherUser.id)
    })

    it('generateAnkiCards should return UNAUTHORIZED for other user\'s library item', async () => {
      const query = `
        mutation GenerateAnkiCards($libraryItemId: ID!) {
          generateAnkiCards(libraryItemId: $libraryItemId) {
            ... on GenerateAnkiCardsSuccess {
              status
            }
            ... on GenerateAnkiCardsError {
              errorCodes
            }
          }
        }
      `

      const res = await graphqlRequest(query, authToken, {
        libraryItemId: otherUserItem.id,
      }).expect(200)

      expect(res.body.data.generateAnkiCards.errorCodes).to.include('UNAUTHORIZED')
    })

    it('regenerateAnkiCards should return UNAUTHORIZED for other user\'s library item', async () => {
      // Create a batch for the other user's item first
      await ankiCardBatchRepository.createBatch({
        userId: otherUser.id,
        libraryItemId: otherUserItem.id,
        deck: 'Default',
        status: AnkiCardStatus.Completed,
        cardCount: 5,
      })

      const query = `
        mutation RegenerateAnkiCards($libraryItemId: ID!) {
          regenerateAnkiCards(libraryItemId: $libraryItemId) {
            ... on RegenerateAnkiCardsSuccess {
              status
            }
            ... on RegenerateAnkiCardsError {
              errorCodes
            }
          }
        }
      `

      const res = await graphqlRequest(query, authToken, {
        libraryItemId: otherUserItem.id,
      }).expect(200)

      expect(res.body.data.regenerateAnkiCards.errorCodes).to.include('UNAUTHORIZED')

      // Clean up
      await ankiCardBatchRepository.deleteByUserId(otherUser.id)
    })

    it('ankiCards should return UNAUTHORIZED for other user\'s library item', async () => {
      const query = `
        query AnkiCards($libraryItemId: ID!) {
          ankiCards(libraryItemId: $libraryItemId) {
            ... on AnkiCardsSuccess {
              batch {
                id
              }
            }
            ... on AnkiCardsError {
              errorCodes
            }
          }
        }
      `

      const res = await graphqlRequest(query, authToken, {
        libraryItemId: otherUserItem.id,
      }).expect(200)

      expect(res.body.data.ankiCards.errorCodes).to.include('UNAUTHORIZED')
    })

    it('generateAnkiCardsBatch should return UNAUTHORIZED when batch contains other user\'s items', async () => {
      const ownItem = await createTestLibraryItem(user.id)

      const query = `
        mutation GenerateAnkiCardsBatch($input: GenerateAnkiCardsBatchInput!) {
          generateAnkiCardsBatch(input: $input) {
            ... on GenerateAnkiCardsBatchSuccess {
              jobsEnqueued
            }
            ... on GenerateAnkiCardsBatchError {
              errorCodes
            }
          }
        }
      `

      const res = await graphqlRequest(query, authToken, {
        input: { libraryItemIds: [ownItem.id, otherUserItem.id] },
      }).expect(200)

      expect(res.body.data.generateAnkiCardsBatch.errorCodes).to.include('UNAUTHORIZED')

      // Clean up
      await deleteLibraryItemById(ownItem.id)
    })

    it('generateAnkiCardsBatch should return BAD_REQUEST when batch contains non-existent items', async () => {
      const query = `
        mutation GenerateAnkiCardsBatch($input: GenerateAnkiCardsBatchInput!) {
          generateAnkiCardsBatch(input: $input) {
            ... on GenerateAnkiCardsBatchSuccess {
              jobsEnqueued
            }
            ... on GenerateAnkiCardsBatchError {
              errorCodes
            }
          }
        }
      `

      const res = await graphqlRequest(query, authToken, {
        input: { libraryItemIds: [generateFakeUuid()] },
      }).expect(200)

      expect(res.body.data.generateAnkiCardsBatch.errorCodes).to.include('BAD_REQUEST')
    })
  })
})
