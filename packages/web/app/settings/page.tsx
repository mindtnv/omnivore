'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box } from '../../components/elements/LayoutPrimitives'

export default function Extensions(): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      router.push('/settings/account')
    } else {
      router.push('/settings/account')
    }
  }, [router])

  return <Box css={{ bg: '$grayBase', height: '100vh', width: '100vw' }} />
}
