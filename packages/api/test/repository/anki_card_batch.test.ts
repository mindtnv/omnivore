import { expect } from 'chai'
import 'mocha'
import { AnkiCardBatch, AnkiCardStatus } from '../../src/entity/anki_card_batch'
import { LibraryItem } from '../../src/entity/library_item'
import { User } from '../../src/entity/user'
import { authTrx } from '../../src/repository'
import {
  ankiCardBatchRepository,
  filterCardDetails,
  mergeAnkiNoteIds,
  mergeCardDetails,
  removeAnkiNoteIds,
  updateCardDetailAtIndex,
} from '../../src/repository/anki_card_batch'
import { deleteUser } from '../../src/services/user'
import { createTestLibraryItem, createTestUser } from '../db'

describe('AnkiCardBatch Repository', () => {
  let user: User
  let libraryItem: LibraryItem

  before(async () => {
    user = await createTestUser('ankiTestUser')
    libraryItem = await createTestLibraryItem(user.id)
  })

  after(async () => {
    await deleteUser(user.id)
  })

  describe('JSONB helper functions', () => {
    describe('mergeAnkiNoteIds', () => {
      it('should merge new IDs with existing array', () => {
        const existing = [1, 2, 3]
        const newIds = [4, 5]
        const result = mergeAnkiNoteIds(existing, newIds)
        expect(result).to.have.members([1, 2, 3, 4, 5])
      })

      it('should handle null existing array', () => {
        const result = mergeAnkiNoteIds(null, [1, 2])
        expect(result).to.have.members([1, 2])
      })

      it('should handle undefined existing array', () => {
        const result = mergeAnkiNoteIds(undefined, [1, 2])
        expect(result).to.have.members([1, 2])
      })

      it('should deduplicate IDs', () => {
        const existing = [1, 2, 3]
        const newIds = [2, 3, 4]
        const result = mergeAnkiNoteIds(existing, newIds)
        expect(result).to.have.members([1, 2, 3, 4])
        expect(result).to.have.lengthOf(4)
      })
    })

    describe('removeAnkiNoteIds', () => {
      it('should remove specified IDs from array', () => {
        const existing = [1, 2, 3, 4, 5]
        const toRemove = [2, 4]
        const result = removeAnkiNoteIds(existing, toRemove)
        expect(result).to.have.members([1, 3, 5])
      })

      it('should handle null existing array', () => {
        const result = removeAnkiNoteIds(null, [1, 2])
        expect(result).to.be.empty
      })

      it('should handle removing non-existent IDs', () => {
        const existing = [1, 2, 3]
        const toRemove = [4, 5]
        const result = removeAnkiNoteIds(existing, toRemove)
        expect(result).to.have.members([1, 2, 3])
      })
    })

    describe('mergeCardDetails', () => {
      it('should merge new details with existing array', () => {
        const existing = [{ front: 'Q1', back: 'A1' }]
        const newDetails = [{ front: 'Q2', back: 'A2' }]
        const result = mergeCardDetails(existing, newDetails)
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.deep.equal({ front: 'Q1', back: 'A1' })
        expect(result[1]).to.deep.equal({ front: 'Q2', back: 'A2' })
      })

      it('should handle null existing array', () => {
        const newDetails = [{ front: 'Q1', back: 'A1' }]
        const result = mergeCardDetails(null, newDetails)
        expect(result).to.have.lengthOf(1)
      })
    })

    describe('updateCardDetailAtIndex', () => {
      it('should update detail at specified index', () => {
        const existing = [
          { front: 'Q1', back: 'A1' },
          { front: 'Q2', back: 'A2' },
        ]
        const result = updateCardDetailAtIndex(existing, 1, { back: 'A2-updated' })
        expect(result[1]).to.deep.equal({ front: 'Q2', back: 'A2-updated' })
      })

      it('should not modify array for invalid index', () => {
        const existing = [{ front: 'Q1', back: 'A1' }]
        const result = updateCardDetailAtIndex(existing, 5, { back: 'updated' })
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.deep.equal({ front: 'Q1', back: 'A1' })
      })

      it('should handle null existing array', () => {
        const result = updateCardDetailAtIndex(null, 0, { back: 'updated' })
        expect(result).to.be.empty
      })
    })

    describe('filterCardDetails', () => {
      it('should filter details by predicate', () => {
        const existing = [
          { front: 'Q1', back: 'A1', type: 'basic' },
          { front: 'Q2', back: 'A2', type: 'cloze' },
          { front: 'Q3', back: 'A3', type: 'basic' },
        ]
        const result = filterCardDetails(
          existing,
          (d) => d.type === 'basic'
        )
        expect(result).to.have.lengthOf(2)
      })

      it('should handle null existing array', () => {
        const result = filterCardDetails(null, () => true)
        expect(result).to.be.empty
      })
    })
  })

  describe('Repository methods', () => {
    let batch: AnkiCardBatch

    beforeEach(async () => {
      batch = await authTrx(
        async (tx) => {
          const repo = tx.withRepository(ankiCardBatchRepository)
          return repo.createBatch({
            userId: user.id,
            libraryItemId: libraryItem.id,
            deck: 'Test Deck',
            cardCount: 5,
            status: AnkiCardStatus.Pending,
            ankiNoteIds: [1, 2, 3],
            cardDetails: [{ front: 'Q1', back: 'A1' }],
          })
        },
        { uid: user.id }
      )
    })

    afterEach(async () => {
      await authTrx(
        async (tx) => {
          const repo = tx.withRepository(ankiCardBatchRepository)
          await repo.deleteBatch(batch.id)
        },
        { uid: user.id }
      )
    })

    describe('findById', () => {
      it('should find batch by id', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findById(batch.id)
          },
          { uid: user.id }
        )

        expect(found).to.not.be.null
        expect(found?.id).to.equal(batch.id)
        expect(found?.deck).to.equal('Test Deck')
      })

      it('should return null for non-existent id', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findById('00000000-0000-0000-0000-000000000000')
          },
          { uid: user.id }
        )

        expect(found).to.be.null
      })
    })

    describe('findByIdWithRelations', () => {
      it('should find batch with relations', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByIdWithRelations(batch.id)
          },
          { uid: user.id }
        )

        expect(found).to.not.be.null
        expect(found?.libraryItem).to.not.be.undefined
        expect(found?.user).to.not.be.undefined
      })
    })

    describe('findByLibraryItemId', () => {
      it('should find batches by library item id', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByLibraryItemId(libraryItem.id)
          },
          { uid: user.id }
        )

        expect(found).to.have.lengthOf(1)
        expect(found[0].libraryItemId).to.equal(libraryItem.id)
      })
    })

    describe('findByUserId', () => {
      it('should find batches by user id', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByUserId(user.id)
          },
          { uid: user.id }
        )

        expect(found).to.have.length.greaterThanOrEqual(1)
        found.forEach((b) => expect(b.userId).to.equal(user.id))
      })
    })

    describe('findByUserIdAndStatus', () => {
      it('should find batches by user id and status', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByUserIdAndStatus(user.id, AnkiCardStatus.Pending)
          },
          { uid: user.id }
        )

        expect(found).to.have.length.greaterThanOrEqual(1)
        found.forEach((b) => {
          expect(b.userId).to.equal(user.id)
          expect(b.status).to.equal(AnkiCardStatus.Pending)
        })
      })

      it('should return empty array for non-matching status', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByUserIdAndStatus(user.id, AnkiCardStatus.Completed)
          },
          { uid: user.id }
        )

        expect(found).to.be.empty
      })
    })

    describe('findByUserIdWithPagination', () => {
      it('should return paginated results', async () => {
        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByUserIdWithPagination(user.id, 10, 0)
          },
          { uid: user.id }
        )

        expect(found).to.have.length.greaterThanOrEqual(1)
      })
    })

    describe('updateBatch', () => {
      it('should update batch fields', async () => {
        await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            await repo.updateBatch(batch.id, {
              deck: 'Updated Deck',
              cardCount: 10,
            })
          },
          { uid: user.id }
        )

        const updated = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findById(batch.id)
          },
          { uid: user.id }
        )

        expect(updated?.deck).to.equal('Updated Deck')
        expect(updated?.cardCount).to.equal(10)
      })
    })

    describe('updateStatus', () => {
      it('should update batch status', async () => {
        await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            await repo.updateStatus(batch.id, AnkiCardStatus.Processing)
          },
          { uid: user.id }
        )

        const updated = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findById(batch.id)
          },
          { uid: user.id }
        )

        expect(updated?.status).to.equal(AnkiCardStatus.Processing)
      })
    })

    describe('addAnkiNoteIds', () => {
      it('should add note IDs to batch', async () => {
        const result = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.addAnkiNoteIds(batch.id, [4, 5])
          },
          { uid: user.id }
        )

        expect(result).to.have.members([1, 2, 3, 4, 5])
      })

      it('should return null for non-existent batch', async () => {
        const result = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.addAnkiNoteIds(
              '00000000-0000-0000-0000-000000000000',
              [4, 5]
            )
          },
          { uid: user.id }
        )

        expect(result).to.be.null
      })
    })

    describe('removeAnkiNoteIds', () => {
      it('should remove note IDs from batch', async () => {
        const result = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.removeAnkiNoteIds(batch.id, [2])
          },
          { uid: user.id }
        )

        expect(result).to.have.members([1, 3])
      })
    })

    describe('addCardDetails', () => {
      it('should add card details to batch', async () => {
        const newDetails = [{ front: 'Q2', back: 'A2' }]
        const result = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.addCardDetails(batch.id, newDetails)
          },
          { uid: user.id }
        )

        expect(result).to.have.lengthOf(2)
      })
    })

    describe('updateCardDetailAtIndex', () => {
      it('should update card detail at index', async () => {
        const result = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.updateCardDetailAtIndex(batch.id, 0, {
              back: 'A1-updated',
            })
          },
          { uid: user.id }
        )

        expect(result?.[0]).to.deep.include({ back: 'A1-updated' })
      })
    })

    describe('incrementCardCount', () => {
      it('should increment card count', async () => {
        await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            await repo.incrementCardCount(batch.id, 3)
          },
          { uid: user.id }
        )

        const updated = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findById(batch.id)
          },
          { uid: user.id }
        )

        expect(updated?.cardCount).to.equal(8)
      })
    })

    describe('countByUserId', () => {
      it('should count batches by user id', async () => {
        const count = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.countByUserId(user.id)
          },
          { uid: user.id }
        )

        expect(count).to.be.greaterThanOrEqual(1)
      })
    })

    describe('countByUserIdAndStatus', () => {
      it('should count batches by user id and status', async () => {
        const count = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.countByUserIdAndStatus(user.id, AnkiCardStatus.Pending)
          },
          { uid: user.id }
        )

        expect(count).to.be.greaterThanOrEqual(1)
      })
    })

    describe('deleteBatch', () => {
      it('should delete batch by id', async () => {
        const newBatch = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.createBatch({
              userId: user.id,
              libraryItemId: libraryItem.id,
              deck: 'To Delete',
              status: AnkiCardStatus.Pending,
            })
          },
          { uid: user.id }
        )

        await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            await repo.deleteBatch(newBatch.id)
          },
          { uid: user.id }
        )

        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findById(newBatch.id)
          },
          { uid: user.id }
        )

        expect(found).to.be.null
      })
    })

    describe('deleteByLibraryItemId', () => {
      it('should delete all batches for library item', async () => {
        const testLibraryItem = await createTestLibraryItem(user.id)

        await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            await repo.createBatch({
              userId: user.id,
              libraryItemId: testLibraryItem.id,
              deck: 'Batch 1',
              status: AnkiCardStatus.Pending,
            })
            await repo.createBatch({
              userId: user.id,
              libraryItemId: testLibraryItem.id,
              deck: 'Batch 2',
              status: AnkiCardStatus.Pending,
            })
          },
          { uid: user.id }
        )

        await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            await repo.deleteByLibraryItemId(testLibraryItem.id)
          },
          { uid: user.id }
        )

        const found = await authTrx(
          async (tx) => {
            const repo = tx.withRepository(ankiCardBatchRepository)
            return repo.findByLibraryItemId(testLibraryItem.id)
          },
          { uid: user.id }
        )

        expect(found).to.be.empty
      })
    })
  })
})
