import { DeepPartial } from 'typeorm'
import {
  ImportItemState,
  Integration,
  IntegrationType,
} from '../../entity/integration'
import { env } from '../../env'
import {
  DeleteIntegrationError,
  DeleteIntegrationErrorCode,
  DeleteIntegrationSuccess,
  ExportToIntegrationError,
  ExportToIntegrationErrorCode,
  ExportToIntegrationSuccess,
  ImportFromIntegrationError,
  ImportFromIntegrationErrorCode,
  ImportFromIntegrationSuccess,
  IntegrationError,
  IntegrationErrorCode,
  IntegrationsError,
  IntegrationsSuccess,
  IntegrationSuccess,
  MutationDeleteIntegrationArgs,
  MutationExportToIntegrationArgs,
  MutationImportFromIntegrationArgs,
  MutationSetIntegrationArgs,
  MutationTestAnkiConnectionArgs,
  QueryIntegrationArgs,
  SetIntegrationError,
  SetIntegrationErrorCode,
  SetIntegrationSuccess,
  TaskState,
  TestAnkiConnectionError,
  TestAnkiConnectionErrorCode,
  TestAnkiConnectionSuccess,
} from '../../generated/graphql'
import { createIntegrationToken } from '../../routers/auth/jwt_helpers'
import {
  AnkiConnectClient,
  findIntegration,
  findIntegrationByName,
  findIntegrations,
  getIntegrationClient,
  removeIntegration,
  saveIntegration,
  updateIntegration,
} from '../../services/integrations'
import { NotionClient } from '../../services/integrations/notion'
import { analytics } from '../../utils/analytics'
import {
  deleteTask,
  enqueueExportToIntegration,
  enqueueImportFromIntegration,
} from '../../utils/createTask'
import { authorized } from '../../utils/gql-utils'

export const setIntegrationResolver = authorized<
  SetIntegrationSuccess,
  SetIntegrationError,
  MutationSetIntegrationArgs
>(async (_, { input }, { uid, log }) => {
  // Handle settings - can be JSON string or already parsed object
  let parsedSettings: Record<string, unknown> | undefined
  if (input.settings) {
    if (typeof input.settings === 'string') {
      try {
        parsedSettings = JSON.parse(input.settings)
      } catch (e) {
        log.error('Failed to parse settings JSON', { settings: input.settings, error: e })
        return {
          errorCodes: [SetIntegrationErrorCode.BadRequest],
        }
      }
    } else if (typeof input.settings === 'object') {
      // Already an object (from GraphQL)
      parsedSettings = input.settings as Record<string, unknown>
    }
  }

  const integrationToSave: DeepPartial<Integration> = {
    ...input,
    settings: parsedSettings,
    user: { id: uid },
    id: input.id || undefined,
    type: input.type || undefined,
    syncedAt: input.syncedAt ? new Date(input.syncedAt) : undefined,
    importItemState:
      input.type === IntegrationType.Import
        ? input.importItemState || ImportItemState.Unarchived // default to unarchived
        : undefined,
  }

  if (input.id) {
    // Update
    const existingIntegration = await findIntegration({ id: input.id }, uid)
    if (!existingIntegration) {
      return {
        errorCodes: [SetIntegrationErrorCode.NotFound],
      }
    }

    integrationToSave.id = existingIntegration.id
    integrationToSave.taskName = existingIntegration.taskName
  } else {
    // Create
    if (input.name.toLowerCase() === 'anki') {
      integrationToSave.token = input.token || ''
    } else {
      const integrationService = getIntegrationClient(input.name, input.token)
      // authorize and get access token
      const token = await integrationService.accessToken()
      if (!token) {
        return {
          errorCodes: [SetIntegrationErrorCode.InvalidToken],
        }
      }
      integrationToSave.token = token
    }
  }

  // Validate Anki settings BEFORE saving
  if (input.name.toLowerCase() === 'anki') {
    const settings = parsedSettings as {
      ankiConnectUrl?: string
      targetLanguage?: string
      defaultDeck?: string
      autoCreate?: boolean
    } | undefined

    if (!settings?.ankiConnectUrl) {
      log.error('Anki integration missing ankiConnectUrl')
      return {
        errorCodes: [SetIntegrationErrorCode.BadRequest],
      }
    }

    // Test connection to AnkiConnect before saving
    try {
      const tempIntegration = { settings: parsedSettings } as Integration
      const ankiClient = getIntegrationClient(
        'anki',
        input.token || '',
        tempIntegration
      ) as AnkiConnectClient
      const isAvailable = await ankiClient.ping()

      if (!isAvailable) {
        log.error('Cannot connect to AnkiConnect', { url: settings.ankiConnectUrl })
        return {
          errorCodes: [SetIntegrationErrorCode.BadRequest],
        }
      }

      log.info('Anki connection validated successfully', { userId: uid })
    } catch (error) {
      log.error('Failed to connect to AnkiConnect', { error })
      return {
        errorCodes: [SetIntegrationErrorCode.BadRequest],
      }
    }
  }

  // save integration
  const integration = await saveIntegration(integrationToSave, uid)

  if (integration.name.toLowerCase() === 'readwise') {
    // create a task to export all the items for readwise temporarily
    await enqueueExportToIntegration(integration.id, uid)
  } else if (
    integration.name.toLowerCase() === 'notion' &&
    integration.settings
  ) {
    const settings = integration.settings as { parentDatabaseId?: string }
    if (settings.parentDatabaseId) {
      // update notion database properties
      const notion = new NotionClient(integration.token, integration)

      try {
        const database = await notion.findDatabase(settings.parentDatabaseId)

        try {
          await notion.updateDatabase(database)
        } catch (error) {
          log.error('failed to update notion database', {
            databaseId: settings.parentDatabaseId,
          })

          return {
            errorCodes: [SetIntegrationErrorCode.BadRequest],
          }
        }
      } catch (error) {
        log.error('notion database not found', {
          databaseId: settings.parentDatabaseId,
        })

        return {
          errorCodes: [SetIntegrationErrorCode.NotFound],
        }
      }
    }
  }

  analytics.capture({
    distinctId: uid,
    event: 'integration_set',
    properties: {
      id: integrationToSave.id,
      env: env.server.apiEnv,
    },
  })

  return {
    integration,
  }
})

export const integrationsResolver = authorized<
  IntegrationsSuccess,
  IntegrationsError
>(async (_, __, { uid }) => {
  const integrations = await findIntegrations(uid)

  return {
    integrations,
  }
})

export const integrationResolver = authorized<
  IntegrationSuccess,
  IntegrationError,
  QueryIntegrationArgs
>(async (_, { name }, { uid, log }) => {
  const integration = await findIntegrationByName(name, uid)

  if (!integration) {
    log.error('integration not found', name)

    return {
      errorCodes: [IntegrationErrorCode.NotFound],
    }
  }

  return {
    integration,
  }
})

export const deleteIntegrationResolver = authorized<
  DeleteIntegrationSuccess,
  DeleteIntegrationError,
  MutationDeleteIntegrationArgs
>(async (_, { id }, { claims: { uid }, log }) => {
  log.info('deleteIntegrationResolver')

  const integration = await findIntegration({ id }, uid)

  if (!integration) {
    return {
      errorCodes: [DeleteIntegrationErrorCode.NotFound],
    }
  }

  if (integration.taskName) {
    // delete the task if task exists
    await deleteTask(integration.taskName)
    log.info('task deleted', integration.taskName)
  }

  const deletedIntegration = await removeIntegration(integration, uid)
  deletedIntegration.id = id

  analytics.capture({
    distinctId: uid,
    event: 'integration_delete',
    properties: {
      integrationId: deletedIntegration.id,
      env: env.server.apiEnv,
    },
  })

  return {
    integration,
  }
})

export const importFromIntegrationResolver = authorized<
  ImportFromIntegrationSuccess,
  ImportFromIntegrationError,
  MutationImportFromIntegrationArgs
>((_, { integrationId }, { claims: { uid }, log }) => {
  // const integration = await findIntegration({ id: integrationId }, uid)

  // if (!integration) {
  return {
    errorCodes: [ImportFromIntegrationErrorCode.Unauthorized],
  }
  // }

  // const authToken = await createIntegrationToken({
  //   uid: integration.user.id,
  //   token: integration.token,
  // })
  // if (!authToken) {
  //   return {
  //     errorCodes: [ImportFromIntegrationErrorCode.BadRequest],
  //   }
  // }

  // // create a task to import all the pages
  // const taskName = await enqueueImportFromIntegration(
  //   integration.id,
  //   integration.name,
  //   integration.syncedAt?.getTime() || 0,
  //   authToken,
  //   integration.importItemState || ImportItemState.Unarchived
  // )
  // log.info('task created', taskName)
  // // // update task name in integration
  // // await updateIntegration(integration.id, { taskName }, uid)

  // analytics.capture({
  //   distinctId: uid,
  //   event: 'integration_import',
  //   properties: {
  //     integrationId,
  //   },
  // })

  // return {
  //   success: true,
  // }
})

export const exportToIntegrationResolver = authorized<
  ExportToIntegrationSuccess,
  ExportToIntegrationError,
  MutationExportToIntegrationArgs
>(async (_, { integrationId }, { uid, log }) => {
  const integration = await findIntegration({ id: integrationId }, uid)

  if (!integration) {
    log.error('integration not found', integrationId)

    return {
      errorCodes: [ExportToIntegrationErrorCode.Unauthorized],
    }
  }

  // create a job to export all the items
  const job = await enqueueExportToIntegration(integration.id, uid)
  if (!job || !job.id) {
    log.error('failed to create task', integrationId)

    return {
      errorCodes: [ExportToIntegrationErrorCode.FailedToCreateTask],
    }
  }

  // update task name in integration
  await updateIntegration(integration.id, { taskName: job.id }, uid)

  analytics.capture({
    distinctId: uid,
    event: 'integration_export',
    properties: {
      integrationId,
    },
  })

  return {
    task: {
      id: job.id,
      name: job.name,
      state: TaskState.Pending,
      createdAt: new Date(job.timestamp),
      progress: 0,
      runningTime: 0,
      cancellable: true,
    },
  }
})

export const testAnkiConnectionResolver = authorized<
  TestAnkiConnectionSuccess,
  TestAnkiConnectionError,
  MutationTestAnkiConnectionArgs
>(async (_, { input }, { log }) => {
  const { ankiConnectUrl, apiKey } = input

  if (!ankiConnectUrl) {
    return {
      errorCodes: [TestAnkiConnectionErrorCode.BadRequest],
    }
  }

  try {
    const ankiClient = new AnkiConnectClient(
      apiKey && apiKey !== 'no-token' ? apiKey : '',
      ankiConnectUrl
    )

    const isAvailable = await ankiClient.ping()

    if (!isAvailable) {
      log.error('AnkiConnect test connection failed', { url: ankiConnectUrl })
      return {
        errorCodes: [TestAnkiConnectionErrorCode.ConnectionFailed],
      }
    }

    // Get version for success response
    const version = await ankiClient.getVersion()

    return {
      success: true,
      version,
    }
  } catch (error) {
    log.error('AnkiConnect test connection error', { error, url: ankiConnectUrl })
    return {
      errorCodes: [TestAnkiConnectionErrorCode.ConnectionFailed],
    }
  }
})
