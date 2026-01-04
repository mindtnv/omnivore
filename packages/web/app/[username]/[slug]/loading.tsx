import { SkeletonArticleContainer } from '../../../components/templates/article/SkeletonArticleContainer'
import { VStack } from '../../../components/elements/LayoutPrimitives'

export default function Loading(): JSX.Element {
  return (
    <VStack
      alignment="center"
      distribution="start"
      css={{
        width: '100%',
        height: '100%',
        background: '$readerBg',
        overflow: 'scroll',
        paddingTop: '80px',
      }}
    >
      <SkeletonArticleContainer margin={200} lineHeight={150} fontSize={20} />
    </VStack>
  )
}
