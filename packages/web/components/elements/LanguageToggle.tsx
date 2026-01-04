import { styled, keyframes, theme } from '../tokens/stitches.config'
import { CircleNotch, WarningCircle, Translate } from '@phosphor-icons/react'
import { Button } from './Button'
import { useState, useEffect } from 'react'

type LanguageToggleProps = {
  originalLanguage?: string | null
  translatedLanguage?: string | null
  targetLanguage?: string | null
  hasTranslation: boolean
  translationStatus?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | null
  showTranslation: boolean
  onToggle: () => void
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
})

const LanguageBadge = styled('span', {
  position: 'absolute',
  bottom: '-4px',
  right: '-6px',
  fontSize: '8px',
  fontWeight: 600,
  fontFamily: '$inter',
  lineHeight: 1,
  padding: '1px 2px',
  borderRadius: '2px',
  backgroundColor: '$thBackground',
  color: '$thTextContrast',
  border: '1px solid $thBorderSubtle',
  minWidth: '14px',
  textAlign: 'center',
  variants: {
    active: {
      true: {
        backgroundColor: '$omnivoreCtaYellow',
        color: '$thBackground',
        borderColor: '$omnivoreCtaYellow',
      },
    },
  },
})

const StatusIndicator = styled('span', {
  position: 'absolute',
  top: '-2px',
  right: '-2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    display: 'block',
  },
  variants: {
    status: {
      PENDING: {
        color: '$thTextSubtle3',
        '& svg': {
          animation: `${spin} 1.5s linear infinite`,
        },
      },
      PROCESSING: {
        color: '$omnivoreCtaYellow',
        '& svg': {
          animation: `${spin} 1s linear infinite`,
        },
      },
      FAILED: {
        color: '$error',
      },
    },
  },
})

// Get 2-letter language code from full language name
const getLanguageCode = (language?: string | null): string => {
  if (!language) return '??'

  const languageMap: Record<string, string> = {
    english: 'EN',
    russian: 'RU',
    german: 'DE',
    french: 'FR',
    spanish: 'ES',
    italian: 'IT',
    portuguese: 'PT',
    chinese: 'ZH',
    japanese: 'JA',
    korean: 'KO',
    arabic: 'AR',
    dutch: 'NL',
    polish: 'PL',
    ukrainian: 'UK',
    turkish: 'TR',
    swedish: 'SV',
    norwegian: 'NO',
    danish: 'DA',
    finnish: 'FI',
    czech: 'CS',
    hungarian: 'HU',
    romanian: 'RO',
    bulgarian: 'BG',
    greek: 'EL',
    hebrew: 'HE',
    thai: 'TH',
    vietnamese: 'VI',
    indonesian: 'ID',
    malay: 'MS',
    hindi: 'HI',
  }

  const lowerLang = language.toLowerCase()
  if (languageMap[lowerLang]) {
    return languageMap[lowerLang]
  }

  if (language.length === 2) {
    return language.toUpperCase()
  }

  return language.slice(0, 2).toUpperCase()
}

export const LanguageToggle = ({
  originalLanguage,
  translatedLanguage,
  targetLanguage,
  hasTranslation,
  translationStatus,
  showTranslation,
  onToggle,
}: LanguageToggleProps): JSX.Element | null => {
  // Use mounted state to prevent hydration mismatch
  // Server and client may have different initial values for props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  // Don't show if no translation available and not processing
  if (!hasTranslation && translationStatus !== 'PROCESSING' && translationStatus !== 'PENDING') {
    return null
  }

  const translatedCode = getLanguageCode(translatedLanguage || targetLanguage)
  // Only show processing if we don't have content yet
  const isProcessing = !hasTranslation && (translationStatus === 'PROCESSING' || translationStatus === 'PENDING')
  const isDisabled = isProcessing

  const getStatusTitle = () => {
    if (translationStatus === 'PROCESSING') return 'Translation in progress...'
    if (translationStatus === 'PENDING') return 'Translation queued...'
    if (translationStatus === 'FAILED') return 'Translation failed'
    return showTranslation ? `Show original` : `Show translation (${translatedCode})`
  }

  return (
    <Button
      title={getStatusTitle()}
      style="articleActionIcon"
      onClick={onToggle}
      disabled={isDisabled}
      css={{
        display: 'flex',
        alignItems: 'center',
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      <IconWrapper>
        <Translate
          size={24}
          weight={showTranslation ? 'fill' : 'regular'}
          color={theme.colors.thHighContrast.toString()}
        />
        <LanguageBadge active={showTranslation}>
          {translatedCode}
        </LanguageBadge>
        {isProcessing && (
          <StatusIndicator status={translationStatus}>
            <CircleNotch size={10} weight="bold" />
          </StatusIndicator>
        )}
        {translationStatus === 'FAILED' && (
          <StatusIndicator status="FAILED">
            <WarningCircle size={10} weight="fill" />
          </StatusIndicator>
        )}
      </IconWrapper>
    </Button>
  )
}
