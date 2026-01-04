import { Box } from '../elements/LayoutPrimitives'
import { keyframes } from '../tokens/stitches.config'

const pulse = keyframes({
  '0%, 100%': { opacity: 0.4 },
  '50%': { opacity: 0.7 },
})

interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
}

export function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
}: SkeletonProps) {
  return (
    <Box
      css={{
        width,
        height,
        borderRadius,
        bg: '$thBorderColor',
        animation: `${pulse} 1.5s ease-in-out infinite`,
      }}
    />
  )
}

export function SkeletonCard() {
  return (
    <Box
      css={{
        p: '$3',
        borderRadius: '8px',
        border: '1px solid $thBorderColor',
        bg: '$thBackground2',
      }}
    >
      <Skeleton height="120px" borderRadius="6px" />
      <Box css={{ mt: '$2' }}>
        <Skeleton width="80%" height="16px" />
      </Box>
      <Box css={{ mt: '$2' }}>
        <Skeleton width="60%" height="14px" />
      </Box>
    </Box>
  )
}

export function SkeletonListItem() {
  return (
    <Box
      css={{
        display: 'flex',
        gap: '$3',
        p: '$3',
        borderBottom: '1px solid $thBorderColor',
      }}
    >
      <Skeleton width="80px" height="60px" borderRadius="4px" />
      <Box css={{ flex: 1 }}>
        <Skeleton width="70%" height="16px" />
        <Box css={{ mt: '$2' }}>
          <Skeleton width="40%" height="14px" />
        </Box>
      </Box>
    </Box>
  )
}
