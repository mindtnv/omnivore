'use client'

import { useState, useCallback } from 'react'
import {
  ModalRoot,
  ModalOverlay,
  ModalContent,
  ModalTitleBar,
  ModalTitle,
  ModalDescription,
  VisuallyHidden,
} from '../../elements/ModalPrimitives'
import { Box, VStack, HStack, SpanBox } from '../../elements/LayoutPrimitives'
import { Button } from '../../elements/Button'
import { StyledText } from '../../elements/StyledText'
import { styled, keyframes } from '../../tokens/stitches.config'
import { useGetAnkiCardsQuery, AnkiCardDetail } from '../../../lib/networking/queries/useGetAnkiCardsQuery'
import { regenerateAnkiCardsMutation } from '../../../lib/networking/mutations/regenerateAnkiCardsMutation'
import { showSuccessToast, showErrorToast } from '../../../lib/toastHelpers'
import { CircleNotch, ArrowsClockwise, Copy, Check, CaretDown, CaretUp } from '@phosphor-icons/react'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const SpinningIcon = styled(CircleNotch, {
  animation: `${spin} 1s linear infinite`,
})

const CardContainer = styled('div', {
  border: '1px solid $grayLine',
  borderRadius: '8px',
  padding: '12px',
  backgroundColor: '$thBackground4',
  marginBottom: '12px',
  '&:last-child': {
    marginBottom: 0,
  },
})

const CardQuestion = styled('div', {
  fontWeight: '600',
  fontSize: '14px',
  color: '$thTextContrast2',
  marginBottom: '8px',
})

const CardAnswer = styled('div', {
  fontSize: '14px',
  color: '$thTextSubtle2',
  marginBottom: '8px',
})

const CardContext = styled('div', {
  fontSize: '12px',
  color: '$thTextSubtle3',
  fontStyle: 'italic',
  paddingTop: '8px',
  borderTop: '1px solid $grayLine',
})

const StatusBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: '500',
  variants: {
    status: {
      COMPLETED: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        color: 'rgb(34, 197, 94)',
      },
      PROCESSING: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: 'rgb(245, 158, 11)',
      },
      PENDING: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: 'rgb(59, 130, 246)',
      },
      FAILED: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: 'rgb(239, 68, 68)',
      },
      WAITING_FOR_TRANSLATION: {
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        color: 'rgb(147, 51, 234)',
      },
    },
  },
})

type AnkiCardsModalProps = {
  libraryItemId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AnkiCardsModal(props: AnkiCardsModalProps): JSX.Element {
  const { libraryItemId, open, onOpenChange } = props
  const { batch, isLoading, error, revalidate } = useGetAnkiCardsQuery(
    open ? libraryItemId : undefined,
    false
  )
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleRegenerate = useCallback(async () => {
    setIsRegenerating(true)
    try {
      await regenerateAnkiCardsMutation(libraryItemId)
      showSuccessToast('Regenerating Anki cards...')
      revalidate()
    } catch (err) {
      showErrorToast('Failed to regenerate cards: ' + err)
    } finally {
      setIsRegenerating(false)
    }
  }, [libraryItemId, revalidate])

  const toggleCardExpand = useCallback((index: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  const copyCardToClipboard = useCallback(async (card: AnkiCardDetail, index: number) => {
    const text = `Q: ${card.question}\nA: ${card.answer}${card.context ? `\n\nContext: ${card.context}` : ''}`
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      showErrorToast('Failed to copy to clipboard')
    }
  }, [])

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'COMPLETED':
        return 'Completed'
      case 'PROCESSING':
        return 'Processing'
      case 'PENDING':
        return 'Pending'
      case 'FAILED':
        return 'Failed'
      case 'WAITING_FOR_TRANSLATION':
        return 'Waiting for Translation'
      default:
        return status
    }
  }

  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalOverlay />
      <ModalContent
        css={{
          maxWidth: '600px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault()
          onOpenChange(false)
        }}
      >
        <VisuallyHidden>
          <ModalTitle>Anki Cards</ModalTitle>
          <ModalDescription>View and manage generated Anki flashcards</ModalDescription>
        </VisuallyHidden>

        <Box css={{ p: '20px', borderBottom: '1px solid $grayLine' }}>
          <ModalTitleBar title="Anki Cards" onOpenChange={onOpenChange} />
        </Box>

        <Box
          css={{
            flex: 1,
            overflow: 'auto',
            p: '20px',
          }}
        >
          {isLoading ? (
            <VStack css={{ alignItems: 'center', justifyContent: 'center', py: '40px' }}>
              <SpinningIcon size={32} />
              <SpanBox css={{ mt: '10px', color: '$thTextSubtle2' }}>
                Loading cards...
              </SpanBox>
            </VStack>
          ) : error ? (
            <VStack css={{ alignItems: 'center', justifyContent: 'center', py: '40px' }}>
              <StyledText style="error">Failed to load cards</StyledText>
            </VStack>
          ) : !batch ? (
            <VStack css={{ alignItems: 'center', justifyContent: 'center', py: '40px' }}>
              <SpanBox css={{ color: '$thTextSubtle2', textAlign: 'center' }}>
                No cards generated yet.
                <br />
                Click &quot;Generate Cards&quot; in the reader to create flashcards.
              </SpanBox>
            </VStack>
          ) : (
            <VStack css={{ gap: '15px' }}>
              <HStack css={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <HStack css={{ gap: '10px', alignItems: 'center' }}>
                  <StatusBadge status={batch.status as any}>
                    {batch.status === 'PROCESSING' && <SpinningIcon size={12} />}
                    {getStatusLabel(batch.status)}
                  </StatusBadge>
                  <SpanBox css={{ fontSize: '14px', color: '$thTextSubtle2' }}>
                    {batch.cardCount} card{batch.cardCount !== 1 ? 's' : ''}
                  </SpanBox>
                </HStack>
                <SpanBox css={{ fontSize: '12px', color: '$thTextSubtle3' }}>
                  Deck: {batch.deck}
                </SpanBox>
              </HStack>

              {batch.cardDetails && batch.cardDetails.length > 0 ? (
                <VStack css={{ gap: '0' }}>
                  {batch.cardDetails.map((card, index) => (
                    <CardContainer key={index}>
                      <HStack
                        css={{
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleCardExpand(index)}
                      >
                        <CardQuestion>Q: {card.question}</CardQuestion>
                        <HStack css={{ gap: '8px', flexShrink: 0 }}>
                          <Button
                            style="plainIcon"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyCardToClipboard(card, index)
                            }}
                            title="Copy to clipboard"
                            css={{ p: '4px' }}
                          >
                            {copiedIndex === index ? (
                              <Check size={16} color="rgb(34, 197, 94)" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                          {expandedCards.has(index) ? (
                            <CaretUp size={16} />
                          ) : (
                            <CaretDown size={16} />
                          )}
                        </HStack>
                      </HStack>
                      {expandedCards.has(index) && (
                        <>
                          <CardAnswer>A: {card.answer}</CardAnswer>
                          {card.context && <CardContext>{card.context}</CardContext>}
                        </>
                      )}
                    </CardContainer>
                  ))}
                </VStack>
              ) : batch.status === 'PROCESSING' || batch.status === 'PENDING' ? (
                <SpanBox css={{ color: '$thTextSubtle2', textAlign: 'center', py: '20px' }}>
                  Cards are being generated...
                </SpanBox>
              ) : null}
            </VStack>
          )}
        </Box>

        <HStack
          css={{
            p: '20px',
            borderTop: '1px solid $grayLine',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            style="ctaWhite"
            onClick={handleRegenerate}
            disabled={isRegenerating || isLoading}
          >
            <HStack css={{ gap: '6px', alignItems: 'center' }}>
              {isRegenerating ? (
                <SpinningIcon size={16} />
              ) : (
                <ArrowsClockwise size={16} />
              )}
              Regenerate
            </HStack>
          </Button>
          <Button style="ctaDarkYellow" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </HStack>
      </ModalContent>
    </ModalRoot>
  )
}
