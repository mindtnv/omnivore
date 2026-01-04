import { Box, HStack, VStack } from '../../components/elements/LayoutPrimitives'
import { Skeleton } from '../../components/patterns/Skeleton'

export default function SettingsLoading() {
  return (
    <HStack
      css={{
        height: '100vh',
        width: '100%',
        bg: '$thBackground',
      }}
    >
      {/* Sidebar skeleton */}
      <VStack
        css={{
          width: '280px',
          p: '$4',
          gap: '$2',
          borderRight: '1px solid $thBorderColor',
          '@mdDown': { display: 'none' },
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} height="40px" borderRadius="6px" />
        ))}
      </VStack>

      {/* Content skeleton */}
      <VStack
        css={{
          flex: 1,
          p: '$5',
          gap: '$4',
        }}
      >
        <Skeleton width="200px" height="32px" />
        <Skeleton width="100%" height="120px" borderRadius="8px" />
        <Skeleton width="100%" height="80px" borderRadius="8px" />
        <Skeleton width="60%" height="40px" borderRadius="6px" />
      </VStack>
    </HStack>
  )
}
