'use client'

export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { TermsAndConditions } from '../../components/templates/TermsAndConditions'
import { EmptyLayout } from '../../components/templates/EmptyLayout'

function TermsContent(): JSX.Element {
  const searchParams = useSearchParams()
  const appEmbedViewQuery = searchParams.get('isAppEmbedView')
  const isAppEmbedView = (appEmbedViewQuery ?? '').length > 0

  if (isAppEmbedView) {
    return <TermsAndConditions />
  } else {
    return (
      <EmptyLayout title="Terms and Conditions">
        <TermsAndConditions />
      </EmptyLayout>
    )
  }
}

export default function Terms(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsContent />
    </Suspense>
  )
}
