'use client'

export const dynamic = 'force-dynamic'

import { VStack } from '../../../../components/elements/LayoutPrimitives'

import { applyStoredTheme } from '../../../../lib/themeUpdater'

export default function BetaFeatures(): JSX.Element {
  applyStoredTheme()

  return (
    <>
      <VStack
        css={{ width: '100%', height: '100%', mt: '80px' }}
        distribution="start"
        alignment="center"
      >
        All beta features are enabled.
      </VStack>
    </>
  )
}
