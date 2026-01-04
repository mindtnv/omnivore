'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box } from '../../components/elements/LayoutPrimitives'

export default function SettingsIndex(): JSX.Element {
  const router = useRouter()

  // Redirect to account settings (default settings page)
  useEffect(() => {
    router.replace('/settings/account')
  }, [router])

  return <Box css={{ bg: '$grayBase', height: '100vh', width: '100vw' }} />
}
