'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { deleteIntegrationMutation } from '../../../lib/networking/mutations/deleteIntegrationMutation'
import { setIntegrationMutation } from '../../../lib/networking/mutations/setIntegrationMutation'
import { testAnkiConnectionMutation } from '../../../lib/networking/mutations/testAnkiConnectionMutation'
import {
  Integration,
  useGetIntegrationsQuery,
} from '../../../lib/networking/queries/useGetIntegrationsQuery'
import { showErrorToast, showSuccessToast } from '../../../lib/toastHelpers'
import { Button } from '../../elements/Button'
import { FormInput } from '../../elements/FormElements'
import { HStack, SpanBox, VStack, Box } from '../../elements/LayoutPrimitives'
import { StyledText } from '../../elements/StyledText'
import { Header } from '../settings/SettingsTable'
import { styled } from '../../tokens/stitches.config'
import { CircleNotch, Check, Warning } from '@phosphor-icons/react'

const SUPPORTED_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'russian', label: 'Russian' },
  { value: 'german', label: 'German' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'dutch', label: 'Dutch' },
  { value: 'polish', label: 'Polish' },
  { value: 'ukrainian', label: 'Ukrainian' },
  { value: 'turkish', label: 'Turkish' },
]

const FormLabel = styled('label', {
  fontSize: '14px',
  fontWeight: '500',
  color: '$utilityTextDefault',
  marginBottom: '5px',
  display: 'block',
})

const FormSelect = styled('select', {
  border: '1px solid $textNonessential',
  borderRadius: '8px',
  width: '100%',
  bg: 'transparent',
  fontSize: '16px',
  textIndent: '8px',
  height: '38px',
  color: '$grayTextContrast',
  '&:focus': {
    outline: 'none',
    boxShadow: '0px 0px 2px 2px rgba(255, 234, 159, 0.56)',
  },
})

const ToggleContainer = styled('label', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '10px',
})

const ToggleSwitch = styled('div', {
  width: '44px',
  height: '24px',
  backgroundColor: '$grayLine',
  borderRadius: '12px',
  position: 'relative',
  transition: 'background-color 0.2s',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    top: '2px',
    left: '2px',
    transition: 'transform 0.2s',
  },
  variants: {
    checked: {
      true: {
        backgroundColor: '$omnivoreCtaYellow',
        '&::after': {
          transform: 'translateX(20px)',
        },
      },
    },
  },
})

const StatusIndicator = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  variants: {
    status: {
      connected: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        color: 'rgb(34, 197, 94)',
      },
      disconnected: {
        backgroundColor: '$thBackground4',
        color: '$thTextSubtle2',
      },
      testing: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: 'rgb(245, 158, 11)',
      },
      error: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: 'rgb(239, 68, 68)',
      },
    },
  },
})

export function Anki(): JSX.Element {
  const { integrations, revalidate } = useGetIntegrationsQuery()
  const ankiIntegration = useMemo(() => {
    return integrations.find((i) => i.name == 'ANKI' && i.type == 'EXPORT')
  }, [integrations])

  return (
    <VStack
      distribution={'start'}
      alignment={'start'}
      css={{
        margin: '0 auto',
        width: '80%',
        minHeight: '500px',
        '@smDown': {
          width: '95%',
        },
      }}
    >
      <HStack
        alignment={'start'}
        distribution={'start'}
        css={{
          width: '100%',
          pb: '$2',
          borderBottom: '1px solid $utilityTextDefault',
          pr: '$1',
        }}
      >
        <Box
          css={{
            width: '75px',
            height: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '$thBackground4',
            borderRadius: '8px',
            fontSize: '36px',
          }}
        >
          📚
        </Box>
        <Header>Anki Integration</Header>
      </HStack>

      {ankiIntegration ? (
        <ManageAnkiForm integration={ankiIntegration} revalidate={revalidate} />
      ) : (
        <AddAnkiForm revalidate={revalidate} />
      )}
    </VStack>
  )
}

type AddAnkiFormProps = {
  revalidate: () => void
}

function AddAnkiForm(props: AddAnkiFormProps): JSX.Element {
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [ankiConnectUrl, setAnkiConnectUrl] = useState('http://localhost:8765')
  const [apiKey, setApiKey] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('english')
  const [defaultDeck, setDefaultDeck] = useState('Omnivore')
  const [autoCreate, setAutoCreate] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const testConnection = useCallback(async () => {
    setIsTesting(true)
    setTestStatus('idle')
    setErrorMessage(undefined)

    try {
      // Test connection through backend API to avoid CORS issues
      const result = await testAnkiConnectionMutation(ankiConnectUrl, apiKey || undefined)

      if (result.success) {
        setTestStatus('success')
        showSuccessToast(`Connection test successful! AnkiConnect version: ${result.version}`)
      } else {
        setTestStatus('error')
        setErrorMessage('Failed to connect to AnkiConnect')
      }
    } catch (err) {
      setTestStatus('error')
      setErrorMessage(
        'Failed to connect to AnkiConnect. Make sure Anki is running and AnkiConnect is installed.'
      )
    } finally {
      setIsTesting(false)
    }
  }, [ankiConnectUrl, apiKey])

  const saveSettings = useCallback(async () => {
    if (!ankiConnectUrl) {
      setErrorMessage('AnkiConnect URL is required')
      return
    }

    try {
      const settings = {
        ankiConnectUrl,
        apiKey: apiKey || undefined,
        targetLanguage,
        defaultDeck,
        autoCreate,
      }

      await setIntegrationMutation({
        token: apiKey || 'no-token',
        name: 'ANKI',
        type: 'EXPORT',
        enabled: true,
        settings,
      })

      props.revalidate()
      showSuccessToast('Anki integration connected successfully!')
      router.push('/settings/integrations')
    } catch (err) {
      setErrorMessage('Error: ' + err)
      showErrorToast('Failed to save Anki settings')
    }
  }, [ankiConnectUrl, apiKey, targetLanguage, defaultDeck, autoCreate, router, props])

  return (
    <VStack css={{ width: '100%', gap: '20px', mt: '20px' }}>
      <HStack
        css={{
          fontSize: '16px',
          color: '$utilityTextDefault',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6',
        }}
      >
        <SpanBox>
          Anki is a powerful spaced repetition flashcard app. Use our Anki integration
          to automatically generate flashcards from your articles and sync them to Anki.
          <br /><br />
          Make sure you have{' '}
          <a
            href="https://ankiweb.net/shared/info/2055492159"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#F5A623' }}
          >
            AnkiConnect
          </a>{' '}
          installed and Anki running before connecting.
        </SpanBox>
      </HStack>

      <VStack css={{ width: '100%', gap: '15px' }}>
        <Box css={{ width: '100%' }}>
          <FormLabel htmlFor="ankiConnectUrl">AnkiConnect URL</FormLabel>
          <FormInput
            type="url"
            id="ankiConnectUrl"
            value={ankiConnectUrl}
            placeholder="http://localhost:8765"
            onChange={(e) => {
              e.preventDefault()
              setAnkiConnectUrl(e.target.value)
            }}
            css={{
              border: '1px solid $textNonessential',
              borderRadius: '8px',
              width: '100%',
              bg: 'transparent',
              fontSize: '16px',
              textIndent: '8px',
              height: '38px',
              color: '$grayTextContrast',
              '&:focus': {
                outline: 'none',
                boxShadow: '0px 0px 2px 2px rgba(255, 234, 159, 0.56)',
              },
            }}
          />
        </Box>

        <Box css={{ width: '100%' }}>
          <FormLabel htmlFor="apiKey">API Key (Optional)</FormLabel>
          <FormInput
            type="password"
            id="apiKey"
            value={apiKey}
            placeholder="Enter API key if configured"
            onChange={(e) => {
              e.preventDefault()
              setApiKey(e.target.value)
            }}
            css={{
              border: '1px solid $textNonessential',
              borderRadius: '8px',
              width: '100%',
              bg: 'transparent',
              fontSize: '16px',
              textIndent: '8px',
              height: '38px',
              color: '$grayTextContrast',
              '&:focus': {
                outline: 'none',
                boxShadow: '0px 0px 2px 2px rgba(255, 234, 159, 0.56)',
              },
            }}
          />
        </Box>

        <Box css={{ width: '100%' }}>
          <FormLabel htmlFor="targetLanguage">Target Language</FormLabel>
          <FormSelect
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </FormSelect>
        </Box>

        <Box css={{ width: '100%' }}>
          <FormLabel htmlFor="defaultDeck">Default Deck Name</FormLabel>
          <FormInput
            type="text"
            id="defaultDeck"
            value={defaultDeck}
            placeholder="Omnivore"
            onChange={(e) => {
              e.preventDefault()
              setDefaultDeck(e.target.value)
            }}
            css={{
              border: '1px solid $textNonessential',
              borderRadius: '8px',
              width: '100%',
              bg: 'transparent',
              fontSize: '16px',
              textIndent: '8px',
              height: '38px',
              color: '$grayTextContrast',
              '&:focus': {
                outline: 'none',
                boxShadow: '0px 0px 2px 2px rgba(255, 234, 159, 0.56)',
              },
            }}
          />
        </Box>

        <Box css={{ width: '100%' }}>
          <ToggleContainer>
            <input
              type="checkbox"
              checked={autoCreate}
              onChange={(e) => setAutoCreate(e.target.checked)}
              style={{ display: 'none' }}
            />
            <ToggleSwitch checked={autoCreate} />
            <SpanBox css={{ fontSize: '14px', color: '$utilityTextDefault' }}>
              Auto-create cards for new articles
            </SpanBox>
          </ToggleContainer>
        </Box>

        <HStack css={{ gap: '10px', alignItems: 'center' }}>
          <Button
            style="ctaWhite"
            onClick={testConnection}
            disabled={isTesting}
            css={{ minWidth: '120px' }}
          >
            {isTesting ? (
              <HStack css={{ gap: '5px', alignItems: 'center' }}>
                <CircleNotch size={16} className="spin" />
                Testing...
              </HStack>
            ) : (
              'Test Connection'
            )}
          </Button>

          {testStatus === 'success' && (
            <StatusIndicator status="connected">
              <Check size={16} weight="bold" />
              Connected
            </StatusIndicator>
          )}
          {testStatus === 'error' && (
            <StatusIndicator status="error">
              <Warning size={16} weight="bold" />
              Failed
            </StatusIndicator>
          )}
        </HStack>
      </VStack>

      {errorMessage && (
        <StyledText style="error" css={{ mt: '10px' }}>
          {errorMessage}
        </StyledText>
      )}

      <Button
        style="ctaDarkYellow"
        css={{ mt: '10px', width: 'fit-content' }}
        onClick={saveSettings}
      >
        Save Settings
      </Button>
    </VStack>
  )
}

type ManageAnkiFormProps = {
  integration: Integration
  revalidate: () => void
}

function ManageAnkiForm(props: ManageAnkiFormProps): JSX.Element {
  const settings = props.integration.settings || {}

  const deleteIntegration = useCallback(async () => {
    try {
      if (props.integration.id) {
        const result = await deleteIntegrationMutation(props.integration.id)
        if (result) {
          props.revalidate()
          showSuccessToast('Anki integration removed')
        } else {
          showErrorToast('Error removing Anki integration')
        }
      }
    } catch (err) {
      showErrorToast('Error: ' + err)
    }
  }, [props])

  return (
    <VStack css={{ width: '100%', gap: '20px', mt: '20px' }}>
      <StatusIndicator status="connected">
        <Check size={16} weight="bold" />
        Connected to Anki
      </StatusIndicator>

      <HStack
        css={{
          fontSize: '16px',
          color: '$utilityTextDefault',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6',
        }}
      >
        <SpanBox>
          Your Omnivore account is connected to Anki. You can now generate flashcards
          from your articles by clicking the Anki button in the reader view or using
          the card menu in your library.
        </SpanBox>
      </HStack>

      <VStack
        css={{
          width: '100%',
          gap: '10px',
          p: '15px',
          bg: '$thBackground4',
          borderRadius: '8px',
        }}
      >
        <HStack css={{ justifyContent: 'space-between', width: '100%' }}>
          <SpanBox css={{ fontWeight: '500', color: '$utilityTextDefault' }}>
            AnkiConnect URL:
          </SpanBox>
          <SpanBox css={{ color: '$thTextSubtle2' }}>
            {settings.ankiConnectUrl || 'http://localhost:8765'}
          </SpanBox>
        </HStack>
        <HStack css={{ justifyContent: 'space-between', width: '100%' }}>
          <SpanBox css={{ fontWeight: '500', color: '$utilityTextDefault' }}>
            Target Language:
          </SpanBox>
          <SpanBox css={{ color: '$thTextSubtle2' }}>
            {settings.targetLanguage || 'English'}
          </SpanBox>
        </HStack>
        <HStack css={{ justifyContent: 'space-between', width: '100%' }}>
          <SpanBox css={{ fontWeight: '500', color: '$utilityTextDefault' }}>
            Default Deck:
          </SpanBox>
          <SpanBox css={{ color: '$thTextSubtle2' }}>
            {settings.defaultDeck || 'Omnivore'}
          </SpanBox>
        </HStack>
        <HStack css={{ justifyContent: 'space-between', width: '100%' }}>
          <SpanBox css={{ fontWeight: '500', color: '$utilityTextDefault' }}>
            Auto-create:
          </SpanBox>
          <SpanBox css={{ color: '$thTextSubtle2' }}>
            {settings.autoCreate ? 'Enabled' : 'Disabled'}
          </SpanBox>
        </HStack>
      </VStack>

      <Button style="ctaDarkYellow" onClick={deleteIntegration}>
        Remove Anki Integration
      </Button>
    </VStack>
  )
}
