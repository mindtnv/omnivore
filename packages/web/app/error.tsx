'use client'

import { useEffect } from 'react'
import { ErrorLayout } from '../components/templates/ErrorLayout'
import { EmptyLayout } from '../components/templates/EmptyLayout'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): JSX.Element {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <EmptyLayout title="An unknown error occurred">
      <ErrorLayout statusCode={500} message="An unknown error occurred." />
    </EmptyLayout>
  )
}
