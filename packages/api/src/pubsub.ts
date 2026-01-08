import { PubSub } from '@google-cloud/pubsub'
import express from 'express'
import { RuleEventType } from './entity/rule'
import { env } from './env'
import { ReportType } from './generated/graphql'
import {
  enqueueAISummarizeJob,
  enqueueProcessYouTubeVideo,
  enqueueThumbnailJob,
  enqueueTriggerRuleJob,
  enqueueTranslateContentJob,
} from './utils/createTask'
import { findUserPersonalization } from './services/user_personalization'
import { logger } from './utils/logger'
import { isYouTubeVideoURL } from './utils/youtube'

// Normalize language to lowercase ISO code for comparison
const normalizeLanguage = (lang: string | null | undefined): string | null => {
  if (!lang) return null

  const langLower = lang.toLowerCase().trim()

  // Map common language names to ISO codes
  const languageMap: Record<string, string> = {
    english: 'en',
    russian: 'ru',
    german: 'de',
    french: 'fr',
    spanish: 'es',
    italian: 'it',
    portuguese: 'pt',
    chinese: 'zh',
    japanese: 'ja',
    korean: 'ko',
    arabic: 'ar',
    dutch: 'nl',
    polish: 'pl',
    ukrainian: 'uk',
    turkish: 'tr',
    swedish: 'sv',
    norwegian: 'no',
    danish: 'da',
    finnish: 'fi',
    czech: 'cs',
    hungarian: 'hu',
    romanian: 'ro',
    bulgarian: 'bg',
    greek: 'el',
    hebrew: 'he',
    thai: 'th',
    vietnamese: 'vi',
    indonesian: 'id',
    malay: 'ms',
    hindi: 'hi',
  }

  // Return mapped code or lowercase original
  return languageMap[langLower] || langLower
}

export type EntityEvent = { id: string }

const client = new PubSub()

export const createPubSubClient = (): PubsubClient => {
  const publish = (topicName: string, msg: Buffer): Promise<void> => {
    if (env.dev.isLocal) {
      logger.info(`Publishing ${topicName}: ${msg.toString()}`)
      return Promise.resolve()
    }

    return client
      .topic(topicName)
      .publishMessage({ data: msg })
      .catch((err) => {
        logger.error(`[PubSub] error: ${topicName}`, err)
      })
      .then(() => {
        return Promise.resolve()
      })
  }

  return {
    userCreated: (
      userId: string,
      email: string,
      name: string,
      username: string
    ): Promise<void> => {
      return publish(
        'userCreated',
        Buffer.from(JSON.stringify({ userId, email, name, username }))
      )
    },
    entityCreated: async <T extends EntityEvent>(
      type: EntityType,
      data: T,
      userId: string
    ): Promise<void> => {
      // queue trigger rule job
      await enqueueTriggerRuleJob({
        ruleEventType: `${type.toUpperCase()}_CREATED` as RuleEventType,
        data,
        userId,
      })

      if (type === EntityType.ITEM) {
        // Get user personalization for language preference
        let userPreferredLanguage: string | undefined
        let userPersonalization: Awaited<ReturnType<typeof findUserPersonalization>> | null = null
        try {
          userPersonalization = await findUserPersonalization(userId)
          userPreferredLanguage = userPersonalization?.preferredLanguage || undefined
        } catch (err) {
          logger.error('Error getting user personalization for summary:', err)
        }

        // Trigger AI summarization for new items
        await enqueueAISummarizeJob({
          userId,
          libraryItemId: data.id,
          language: userPreferredLanguage,
          // Pass item language for downstream decisions
          itemLanguage: 'itemLanguage' in data ? (data as any).itemLanguage : undefined,
        })

        // Trigger auto-translation independent of summary status.
        if (userPersonalization?.autoTranslate && userPreferredLanguage) {
          if (!env.ai.translationEnabled) {
            logger.info('[Auto Translate] Skipping translation: feature disabled')
          } else {
          const itemLanguage = 'itemLanguage' in data ? (data as any).itemLanguage : undefined
          const normalizedItemLang = normalizeLanguage(itemLanguage)
          const normalizedUserLang = normalizeLanguage(userPreferredLanguage)

          if (
            normalizedItemLang &&
            normalizedUserLang &&
            normalizedItemLang !== normalizedUserLang
          ) {
            await enqueueTranslateContentJob({
              userId,
              libraryItemId: data.id,
              targetLanguage: userPreferredLanguage,
            })
            logger.info(
              `[Auto Translate] Queued translation for item ${data.id} from ${normalizedItemLang} to ${normalizedUserLang}`
            )
          } else if (normalizedItemLang && normalizedUserLang) {
            logger.info(
              `[Auto Translate] Skipping translation: article language (${normalizedItemLang}) matches user preference (${normalizedUserLang})`
            )
          }
          }
        }

        const isItemWithURL = (data: any): data is { originalUrl: string } => {
          return 'originalUrl' in data
        }

        if (isItemWithURL(data) && isYouTubeVideoURL(data['originalUrl'])) {
          await enqueueProcessYouTubeVideo({
            userId,
            libraryItemId: data.id,
          })
        }

        const hasThumbnail = (
          data: any
        ): data is { thumbnail: string | null } => {
          return 'thumbnail' in data
        }

        // we don't want to create thumbnail for imported pages and pages that already have thumbnail
        if (!hasThumbnail(data) || !data.thumbnail) {
          try {
            // create a task to update thumbnail and pre-cache all images
            const job = await enqueueThumbnailJob(userId, data.id)
            logger.info('Thumbnail job created', { id: job?.id })
          } catch (e) {
            logger.error('Failed to enqueue thumbnail job', e)
          }
        }
      }
    },
    entityUpdated: async <T extends EntityEvent>(
      type: EntityType,
      data: T,
      userId: string
    ): Promise<void> => {
      // queue trigger rule job
      await enqueueTriggerRuleJob({
        userId,
        ruleEventType: `${type.toUpperCase()}_UPDATED` as RuleEventType,
        data,
      })
    },
    entityDeleted: async (
      type: EntityType,
      id: string,
      userId: string
    ): Promise<void> => {
      logger.info(`entityDeleted: ${type} ${id} ${userId}`)
      await Promise.resolve()
    },
    reportSubmitted: (
      submitterId: string,
      itemUrl: string,
      reportType: ReportType[],
      reportComment: string
    ): Promise<void> => {
      return publish(
        'reportSubmitted',
        Buffer.from(
          JSON.stringify({ submitterId, itemUrl, reportType, reportComment })
        )
      )
    },
  }
}

export enum EntityType {
  ITEM = 'PAGE',
  HIGHLIGHT = 'HIGHLIGHT',
  LABEL = 'LABEL',
  RSS_FEED = 'FEED',
}

export interface PubsubClient {
  userCreated: (
    userId: string,
    email: string,
    name: string,
    username: string
  ) => Promise<void>
  entityCreated: <T extends EntityEvent>(
    type: EntityType,
    data: T,
    userId: string
  ) => Promise<void>
  entityUpdated: <T extends EntityEvent>(
    type: EntityType,
    data: T,
    userId: string
  ) => Promise<void>
  entityDeleted: (type: EntityType, id: string, userId: string) => Promise<void>
  reportSubmitted(
    submitterId: string | undefined,
    itemUrl: string,
    reportType: ReportType[],
    reportComment: string
  ): Promise<void>
}

interface PubSubRequestMessage {
  data: string
  publishTime: string
}

export interface PubSubRequestBody {
  message: PubSubRequestMessage
}

const expired = (body: PubSubRequestBody): boolean => {
  const now = new Date()
  const expiredTime = new Date(body.message.publishTime)
  expiredTime.setHours(expiredTime.getHours() + 1)

  return now > expiredTime
}

export const readPushSubscription = (
  req: express.Request
): { message: string | undefined; expired: boolean } => {
  if (req.query.token !== process.env.PUBSUB_VERIFICATION_TOKEN) {
    logger.info('query does not include valid pubsub token')
    return { message: undefined, expired: false }
  }

  // GCP PubSub sends the request as a base64 encoded string
  if (!('message' in req.body)) {
    logger.info('Invalid pubsub message: message not in body')
    return { message: undefined, expired: false }
  }

  const body = req.body as PubSubRequestBody
  const message = Buffer.from(body.message.data, 'base64').toString('utf-8')

  return { message: message, expired: expired(body) }
}
