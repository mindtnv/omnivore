import { useGetAISummary } from '../../../lib/networking/queries/useGetAISummary'
import { SpanBox, VStack, HStack } from '../../elements/LayoutPrimitives'
import { keyframes, styled } from '../../tokens/stitches.config'
import { Sparkle } from '@phosphor-icons/react'

type AISummaryProps = {
  idx: string
  libraryItemId: string
  fontFamily: string
  fontSize: number
  lineHeight: number
  readerFontColor: string
}

// Subtle shimmer animation for loading state
const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
})

// Fade in animation for content
const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(8px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const SummaryContainer = styled('div', {
  position: 'relative',
  padding: '20px 24px',
  marginTop: '24px',
  marginBottom: '8px',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $thBorderSubtle',
  borderRadius: '8px',
  background: '$thBackground3',
  animation: `${fadeIn} 0.3s ease-out`,
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    borderColor: '$thBorderColor',
  },
  '@mdDown': {
    padding: '16px 20px',
    marginTop: '20px',
  },
})

const AIBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 10px',
  borderRadius: '100px',
  backgroundColor: 'rgba(208, 163, 255, 0.08)',
  border: '1px solid rgba(208, 163, 255, 0.2)',
  color: '#C490FF',
  fontSize: '11px',
  fontWeight: 600,
  fontFamily: '$inter',
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
})

const SummaryText = styled('p', {
  margin: 0,
  lineHeight: '1.6',
  color: 'inherit',
})

const SkeletonLine = styled('div', {
  height: '14px',
  borderRadius: '4px',
  background: 'linear-gradient(90deg, $thBackground4 25%, $thBackground5 50%, $thBackground4 75%)',
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s ease-in-out infinite`,
  variants: {
    width: {
      full: { width: '100%' },
      medium: { width: '85%' },
      short: { width: '60%' },
    },
  },
})

const LoadingSkeleton = () => (
  <SummaryContainer css={{ animation: 'none' }}>
    <AIBadge css={{ opacity: 0.5 }}>
      <Sparkle size={12} weight="fill" />
      Loading
    </AIBadge>
    <VStack css={{ gap: '10px', width: '100%' }}>
      <SkeletonLine width="full" />
      <SkeletonLine width="medium" />
      <SkeletonLine width="short" />
    </VStack>
  </SummaryContainer>
)

export const AISummary = (props: AISummaryProps): JSX.Element => {
  const aisummary = useGetAISummary({
    idx: props.idx,
    libraryItemId: props.libraryItemId,
  })

  // Show skeleton while loading
  if (aisummary.isLoading) {
    return <LoadingSkeleton />
  }

  if (!aisummary.summary) {
    return <></>
  }

  return (
    <SummaryContainer>
      <HStack alignment="center" distribution="start">
        <AIBadge>
          <Sparkle size={12} weight="fill" />
          AI Summary
        </AIBadge>
      </HStack>
      <SummaryText
        css={{
          fontFamily: props.fontFamily,
          fontSize: `${props.fontSize - 2}px`,
          lineHeight: `${props.lineHeight}%`,
          color: props.readerFontColor,
        }}
      >
        {aisummary.summary}
      </SummaryText>
    </SummaryContainer>
  )
}
