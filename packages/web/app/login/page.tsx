'use client'

export const dynamic = 'force-dynamic'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { LoginLayout } from '../../components/templates/LoginLayout'
import { PageMetaData } from '../../components/patterns/PageMetaData'
import { formatMessage } from '../../locales/en/messages'

function parseErrorCodeFromSearchParams(searchParams: URLSearchParams): string | undefined {
  const errorCode = searchParams.get('errorCode')
  return errorCode || undefined
}

function LoginContent(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    const errorCode = parseErrorCodeFromSearchParams(searchParams)
    const message = errorCode
      ? formatMessage({ id: `error.${errorCode}` })
      : undefined
    setErrorMessage(message)
    console.log('error message', message)
  }, [searchParams])

  const loginFormProps = {
    waitlistButtonClickHander: () => {
      router.push('/')
    },
    errorMessage,
  }

  return (
    <>
      <PageMetaData
        title="Welcome to Omnivore"
        path="/login"
        ogImage="/static/images/og-homepage-03.png"
      />
      <LoginLayout {...loginFormProps} />
      <div data-testid="login-page-tag" />
    </>
  )
}

export default function Login(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
