'use client'

import { ErrorLayout } from '../components/templates/ErrorLayout'
import { EmptyLayout } from '../components/templates/EmptyLayout'

export default function NotFound(): JSX.Element {
  return (
    <EmptyLayout title="Page could not be found">
      <ErrorLayout statusCode={404} message="This page could not be found." />
    </EmptyLayout>
  )
}
