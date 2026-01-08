import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { appDataSource } from '../data_source'
import { AnkiCardBatch, AnkiCardStatus } from '../entity/anki_card_batch'

// Helper function to add note IDs to existing array
export const mergeAnkiNoteIds = (
  existing: number[] | null | undefined,
  newIds: number[]
): number[] => {
  const existingIds = existing ?? []
  const uniqueIds = new Set([...existingIds, ...newIds])
  return Array.from(uniqueIds)
}

// Helper function to remove note IDs from array
export const removeAnkiNoteIds = (
  existing: number[] | null | undefined,
  idsToRemove: number[]
): number[] => {
  const existingIds = existing ?? []
  const removeSet = new Set(idsToRemove)
  return existingIds.filter((id) => !removeSet.has(id))
}

// Helper function to add card details to existing array
export const mergeCardDetails = (
  existing: Record<string, unknown>[] | null | undefined,
  newDetails: Record<string, unknown>[]
): Record<string, unknown>[] => {
  const existingDetails = existing ?? []
  return [...existingDetails, ...newDetails]
}

// Helper function to update card detail by index
export const updateCardDetailAtIndex = (
  existing: Record<string, unknown>[] | null | undefined,
  index: number,
  update: Record<string, unknown>
): Record<string, unknown>[] => {
  const existingDetails = [...(existing ?? [])]
  if (index >= 0 && index < existingDetails.length) {
    existingDetails[index] = { ...existingDetails[index], ...update }
  }
  return existingDetails
}

// Helper function to remove card details by predicate
export const filterCardDetails = (
  existing: Record<string, unknown>[] | null | undefined,
  predicate: (detail: Record<string, unknown>) => boolean
): Record<string, unknown>[] => {
  const existingDetails = existing ?? []
  return existingDetails.filter(predicate)
}

export const ankiCardBatchRepository = appDataSource
  .getRepository(AnkiCardBatch)
  .extend({
    findById(id: string) {
      return this.findOneBy({ id })
    },

    findByIdWithRelations(id: string) {
      return this.findOne({
        where: { id },
        relations: {
          libraryItem: true,
          user: true,
        },
      })
    },

    findByLibraryItemId(libraryItemId: string) {
      return this.find({
        where: { libraryItemId },
        order: { createdAt: 'DESC' },
      })
    },

    findByUserId(userId: string) {
      return this.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      })
    },

    findByUserIdAndStatus(userId: string, status: AnkiCardStatus) {
      return this.find({
        where: { userId, status },
        order: { createdAt: 'DESC' },
      })
    },

    findByUserIdWithPagination(
      userId: string,
      limit: number,
      offset: number
    ) {
      return this.find({
        where: { userId },
        order: { createdAt: 'DESC' },
        take: limit,
        skip: offset,
      })
    },

    createBatch(batch: DeepPartial<AnkiCardBatch>) {
      return this.save(batch)
    },

    updateBatch(id: string, batch: QueryDeepPartialEntity<AnkiCardBatch>) {
      return this.update(id, batch)
    },

    deleteBatch(id: string) {
      return this.delete(id)
    },

    deleteByLibraryItemId(libraryItemId: string) {
      return this.delete({ libraryItemId })
    },

    deleteByUserId(userId: string) {
      return this.delete({ userId })
    },

    // JSONB field update helpers
    async addAnkiNoteIds(id: string, noteIds: number[]) {
      const batch = await this.findById(id)
      if (!batch) return null

      const updatedNoteIds = mergeAnkiNoteIds(batch.ankiNoteIds, noteIds)
      await this.update(id, { ankiNoteIds: updatedNoteIds })
      return updatedNoteIds
    },

    async removeAnkiNoteIds(id: string, noteIds: number[]) {
      const batch = await this.findById(id)
      if (!batch) return null

      const updatedNoteIds = removeAnkiNoteIds(batch.ankiNoteIds, noteIds)
      await this.update(id, { ankiNoteIds: updatedNoteIds })
      return updatedNoteIds
    },

    async addCardDetails(id: string, details: Record<string, unknown>[]) {
      const batch = await this.findById(id)
      if (!batch) return null

      const updatedDetails = mergeCardDetails(batch.cardDetails, details)
      batch.cardDetails = updatedDetails
      await this.save(batch)
      return updatedDetails
    },

    async updateCardDetailAtIndex(
      id: string,
      index: number,
      update: Record<string, unknown>
    ) {
      const batch = await this.findById(id)
      if (!batch) return null

      const updatedDetails = updateCardDetailAtIndex(
        batch.cardDetails,
        index,
        update
      )
      batch.cardDetails = updatedDetails
      await this.save(batch)
      return updatedDetails
    },

    async updateStatus(id: string, status: AnkiCardStatus) {
      return this.update(id, { status })
    },

    async incrementCardCount(id: string, increment = 1) {
      return this.createQueryBuilder()
        .update(AnkiCardBatch)
        .set({ cardCount: () => `card_count + ${increment}` })
        .where('id = :id', { id })
        .execute()
    },

    countByUserId(userId: string) {
      return this.countBy({ userId })
    },

    countByUserIdAndStatus(userId: string, status: AnkiCardStatus) {
      return this.countBy({ userId, status })
    },
  })
