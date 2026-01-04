import { VStack, SpanBox } from '../../components/elements/LayoutPrimitives'
import { applyStoredTheme } from '../../lib/themeUpdater'
import { keyframes } from '../tokens/stitches.config'

type LoadingViewProps = {
  bgColor?: string
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const pulse = keyframes({
  '0%, 100%': { opacity: 0.4 },
  '50%': { opacity: 1 },
})

export function LoadingView(props: LoadingViewProps): JSX.Element {
  applyStoredTheme()

  return (
    <VStack
      alignment="center"
      distribution="center"
      css={{
        bg: props.bgColor ?? '$grayBase',
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Spinner */}
      <SpanBox
        css={{
          width: '32px',
          height: '32px',
          border: '3px solid $thBorderColor',
          borderTopColor: '$ctaBlue',
          borderRadius: '50%',
          animation: `${spin} 0.8s linear infinite`,
        }}
      />
      {/* Loading text */}
      <SpanBox
        css={{
          marginTop: '16px',
          color: '$thTextSubtle2',
          fontSize: '14px',
          fontWeight: 500,
          animation: `${pulse} 1.5s ease-in-out infinite`,
        }}
      >
        Loading...
      </SpanBox>
    </VStack>
  )
}
