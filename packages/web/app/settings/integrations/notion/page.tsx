'use client'

export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../../../../components/elements/Button'
import { BorderedFormInput, FormGroupComponent, FormLabel } from '../../../../components/elements/FormElements'
import { HStack, VStack } from '../../../../components/elements/LayoutPrimitives'
import { Space } from '../../../../components/elements/Space'
import { Spinner } from '../../../../components/elements/Spinner'
import { PageMetaData } from '../../../../components/patterns/PageMetaData'
import { Header } from '../../../../components/templates/settings/SettingsTable'
import { useIsMobile } from '../../../../lib/hooks/useMediaQuery'

import { deleteIntegrationMutation } from '../../../../lib/networking/mutations/deleteIntegrationMutation'
import {
  exportToIntegrationMutation,
  Task,
  TaskState,
} from '../../../../lib/networking/mutations/exportToIntegrationMutation'
import {
  SetIntegrationErrorCode,
  setIntegrationMutation,
} from '../../../../lib/networking/mutations/setIntegrationMutation'
import { apiFetcher } from '../../../../lib/networking/networkHelpers'
import { useGetIntegrationQuery } from '../../../../lib/networking/queries/useGetIntegrationQuery'
import { showSuccessToast, showErrorToast, showInfoToast, showLoadingToast } from '../../../../lib/toastHelpers'

type FieldType = {
  parentDatabaseId: string
  properties?: string[]
}

export default function Notion(): JSX.Element {
  const router = useRouter()
  const { integration: notion, revalidate } = useGetIntegrationQuery('notion')

  const isMobile = useIsMobile()
  const [databaseId, setDatabaseId] = useState<string>(notion.settings?.parentDatabaseId || '')
  const [databaseIdError, setDatabaseIdError] = useState<string>('')
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null)
  const [exporting, setExporting] = useState(!!notion.taskName)

  useEffect(() => {
    setDatabaseId(notion.settings?.parentDatabaseId || '')
  }, [notion])

  const deleteNotion = useCallback(async () => {
    await deleteIntegrationMutation(notion.id)
    showSuccessToast('Notion integration disconnected successfully.')

    revalidate()
    router.push('/settings/integrations')
  }, [notion.id, router, revalidate])

  const updateNotion = async (values: FieldType) => {
    await setIntegrationMutation({
      id: notion.id,
      name: notion.name,
      type: notion.type,
      token: notion.token,
      enabled: true,
      settings: values,
    })
  }

  const normalizeDatabaseId = useCallback(
    (value: string) => {
      // check if database id is in UUIDv4 format
      const uuidRegex =
        /^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12}$/
      if (uuidRegex.test(value)) {
        return value
      }

      // extract the database id from the URL
      // https://www.notion.so/ec460c235baa4da5bb412971a12e9dbe?v=8f4e324c0b584b67b8b7cfe9a2f996d7 -> ec460c235baa4da5bb412971a12e9dbe
      const urlRegex = /https:\/\/www.notion.so\/([a-f0-9]{32})\?*/
      const match = value.match(urlRegex)
      if (!match || match.length < 2) {
        throw new Error('Invalid Notion Database ID.')
      }
      return match[1]
    },
    []
  )

  const validateDatabaseId = (value: string): string => {
    if (!value) {
      return 'Please input your Notion Database ID!'
    }

    // check if database id is in UUIDv4 format
    const uuidRegex = /^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12}$/
    if (uuidRegex.test(value)) {
      return ''
    }

    // check URL format
    const urlRegex = /https:\/\/www.notion.so\/([a-f0-9]{32})\?*/
    const match = value.match(urlRegex)
    if (match && match.length >= 2) {
      return ''
    }

    return 'Invalid Notion Database ID.'
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateDatabaseId(databaseId)
    if (validationError) {
      setDatabaseIdError(validationError)
      showErrorToast(validationError)
      return
    }

    try {
      const normalizedId = normalizeDatabaseId(databaseId)
      await updateNotion({ parentDatabaseId: normalizedId })

      revalidate()
      showSuccessToast('Notion settings updated successfully.')
      setDatabaseIdError('')
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === SetIntegrationErrorCode.NotFound
      ) {
        showErrorToast('Notion database not found. Please make sure if you are using database ID instead of page ID.')
        return
      }

      showErrorToast('There was an error updating Notion settings.')
    }
  }

  const exportToNotion = useCallback(async () => {
    if (exporting) {
      showInfoToast('Exporting process is already running.')
      return
    }

    try {
      const task = await exportToIntegrationMutation(notion.id)
      const toastId = showLoadingToast('Exporting to Notion...')
      setLoadingToastId(toastId)

      // long polling to check the status of the task in every 10 seconds
      setExporting(true)
      const interval = setInterval(async () => {
        const updatedTask = (await apiFetcher(`/api/tasks/${task.id}`)) as Task
        if (updatedTask.state === TaskState.Succeeded) {
          clearInterval(interval)
          setExporting(false)
          toast.dismiss(toastId)
          setLoadingToastId(null)
          showSuccessToast('Exported to Notion successfully.')
          return
        }
        if (updatedTask.state === TaskState.Failed) {
          clearInterval(interval)
          setExporting(false)
          toast.dismiss(toastId)
          setLoadingToastId(null)
          showErrorToast('There was an error exporting to Notion.')
          return
        }
      }, 10000)
    } catch (error) {
      setExporting(false)
      if (loadingToastId) {
        toast.dismiss(loadingToastId)
      }
      setLoadingToastId(null)
      showErrorToast('There was an error exporting to Notion.')
    }
  }, [exporting, notion, loadingToastId])

  return (
    <>
      <PageMetaData title="Notion" path="/integrations/notion" />
      <>
        <VStack
          distribution="start"
          alignment="start"
          css={{
            margin: '0 auto',
            width: isMobile ? '100%' : '80%',
            padding: isMobile ? '$3' : '0',
            minHeight: '500px',
          }}
        >
          {isMobile ? (
            <VStack
              alignment="center"
              distribution="center"
              css={{
                width: '100%',
                pb: '$2',
                borderBottom: '1px solid $utilityTextDefault',
                pr: '$1',
              }}
            >
              <Image
                src="/static/icons/notion.png"
                alt="Integration Image"
                width={75}
                height={75}
              />
              <Header>Notion integration settings</Header>
            </VStack>
          ) : (
            <HStack
              alignment="start"
              distribution="start"
              css={{
                width: '100%',
                pb: '$2',
                borderBottom: '1px solid $utilityTextDefault',
                pr: '$1',
              }}
            >
              <Image
                src="/static/icons/notion.png"
                alt="Integration Image"
                width={75}
                height={75}
              />
              <Header>Notion integration settings</Header>
            </HStack>
          )}

          <div style={{ width: '100%', marginTop: '40px' }}>
            <form onSubmit={handleSave}>
              <FormGroupComponent
                layout={isMobile ? 'vertical' : 'horizontal'}
                label="Notion Database ID"
                required={true}
                error={databaseIdError}
                help="The ID of the Notion database where the items will be exported to. You can find it in the URL of the database."
              >
                <BorderedFormInput
                  value={databaseId}
                  onChange={(e) => {
                    setDatabaseId(e.target.value)
                    setDatabaseIdError('')
                  }}
                  placeholder="Enter Database ID or URL"
                />
              </FormGroupComponent>

              <Space
                direction={isMobile ? 'vertical' : 'horizontal'}
                size="medium"
                css={{ marginTop: '24px', marginLeft: isMobile ? '0' : '200px' }}
              >
                <Button
                  style="ctaOmnivoreYellow"
                  type="submit"
                  css={isMobile ? { width: '100%' } : {}}
                >
                  Save
                </Button>
                <Button
                  style="ctaDarkYellow"
                  type="button"
                  onClick={deleteNotion}
                  css={isMobile ? { width: '100%', bg: '#fa5e4a', color: 'white' } : { bg: '#fa5e4a', color: 'white' }}
                >
                  Disconnect
                </Button>
              </Space>
            </form>

            <div style={{
              width: '100%',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid $utilityTextDefault'
            }}>
              <Button
                style="ctaBlue"
                onClick={exportToNotion}
                disabled={exporting}
                css={isMobile ? { width: '100%' } : {}}
              >
                {exporting ? (
                  <>
                    <Spinner size="small" /> Exporting
                  </>
                ) : (
                  'Export last 100 items'
                )}
              </Button>
            </div>
          </div>
        </VStack>
      </>
    </>
  )
}
