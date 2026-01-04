'use client'

import { ErrorFallback } from '../../components/errors/ErrorFallback'

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorFallback error={error} reset={reset} title="Tools error" />
}
