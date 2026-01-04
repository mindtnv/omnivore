'use client'

import { Box, VStack } from '../elements/LayoutPrimitives'
import { Button } from '../elements/Button'
import { StyledText } from '../elements/StyledText'

interface ErrorFallbackProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  showDetails?: boolean
}

export function ErrorFallback({
  error,
  reset,
  title = 'Something went wrong',
  showDetails = process.env.NODE_ENV === 'development',
}: ErrorFallbackProps) {
  return (
    <Box
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        width: '100%',
        p: '$4',
      }}
    >
      <VStack
        alignment="center"
        distribution="center"
        css={{ gap: '$3', maxWidth: '400px', textAlign: 'center' }}
      >
        <StyledText
          style="headline"
          css={{ color: '$textDefault', fontSize: '20px' }}
        >
          {title}
        </StyledText>

        {showDetails && error.message && (
          <Box
            css={{
              p: '$2',
              bg: '$error',
              borderRadius: '$1',
              width: '100%',
              overflow: 'auto',
            }}
          >
            <StyledText
              style="caption"
              css={{
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {error.message}
            </StyledText>
          </Box>
        )}

        <Button style="ctaDarkYellow" onClick={reset}>
          Try again
        </Button>
      </VStack>
    </Box>
  )
}
