import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { LibraryItem } from './library_item'
import { User } from './user'

export enum AnkiCardStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  WaitingForTranslation = 'WAITING_FOR_TRANSLATION',
}

@Entity({ name: 'anki_card_batch' })
export class AnkiCardBatch {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => LibraryItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'library_item_id' })
  libraryItem!: LibraryItem

  @Column('uuid')
  libraryItemId!: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column('uuid')
  userId!: string

  @Column('jsonb', { nullable: true })
  ankiNoteIds?: number[] | null

  @Column('text')
  deck!: string

  @Column('integer', { default: 0 })
  cardCount!: number

  @Column('enum', {
    enum: AnkiCardStatus,
    default: AnkiCardStatus.Pending,
  })
  status!: AnkiCardStatus

  @Column('text', { nullable: true })
  language?: string | null

  @Column('jsonb', { nullable: true })
  cardDetails?: Record<string, unknown>[] | null

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
