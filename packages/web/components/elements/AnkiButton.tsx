import { styled, keyframes, theme } from '../tokens/stitches.config'
import { CircleNotch, WarningCircle, Cards } from '@phosphor-icons/react'
import { Button } from './Button'
import { useState, useEffect } from 'react'
import { AnkiCardStatus } from '../../lib/networking/queries/useGetAnkiCardsQuery'

type AnkiButtonProps = {
  status?: AnkiCardStatus | null
  cardCount?: number
  onClick: () => void
  disabled?: boolean
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

const AnkiBadge = styled('span', {
  position: 'absolute',
  bottom: '-4px',
  right: '-8px',
  fontSize: '9px',
  fontWeight: 600,
  fontFamily: '$inter',
  lineHeight: 1,
  padding: '2px 4px',
  borderRadius: '4px',
  backgroundColor: 'rgba(34, 197, 94, 0.9)',
  color: 'white',
  minWidth: '14px',
  textAlign: 'center',
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
      WAITING_FOR_TRANSLATION: {
        color: '$thTextSubtle3',
        '& svg': {
          animation: `${spin} 2s linear infinite`,
        },
      },
    },
  },
})

const getStatusTitle = (
  status?: AnkiCardStatus | null,
  cardCount?: number
): string => {
  switch (status) {
    case 'PROCESSING':
      return 'Generating Anki cards...'
    case 'PENDING':
      return 'Anki cards queued...'
    case 'FAILED':
      return 'Failed to generate cards'
    case 'WAITING_FOR_TRANSLATION':
      return 'Waiting for translation to complete'
    case 'COMPLETED':
      return cardCount
        ? `View ${cardCount} Anki card${cardCount > 1 ? 's' : ''}`
        : 'View Anki cards'
    default:
      return 'Generate Anki cards'
  }
}

export const AnkiButton = ({
  status,
  cardCount,
  onClick,
  disabled,
}: AnkiButtonProps): JSX.Element | null => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isProcessing =
    status === 'PROCESSING' ||
    status === 'PENDING' ||
    status === 'WAITING_FOR_TRANSLATION'
  const isDisabled = disabled || status === 'WAITING_FOR_TRANSLATION'
  const hasCards = status === 'COMPLETED' && (cardCount ?? 0) > 0

  return (
    <Button
      title={getStatusTitle(status, cardCount)}
      style="articleActionIcon"
      onClick={onClick}
      disabled={isDisabled}
      css={{
        display: 'flex',
        alignItems: 'center',
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
    >
      <IconWrapper>
        <Cards
          size={24}
          weight={hasCards ? 'fill' : 'regular'}
          color={theme.colors.thHighContrast.toString()}
        />
        {hasCards && cardCount && <AnkiBadge>{cardCount}</AnkiBadge>}
        {isProcessing && (
          <StatusIndicator status={status}>
            <CircleNotch size={10} weight="bold" />
          </StatusIndicator>
        )}
        {status === 'FAILED' && (
          <StatusIndicator status="FAILED">
            <WarningCircle size={10} weight="fill" />
          </StatusIndicator>
        )}
      </IconWrapper>
    </Button>
  )
}
