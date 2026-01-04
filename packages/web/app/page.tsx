'use client'

export const dynamic = 'force-dynamic'

import { useRouter } from 'next/navigation'
import { PageMetaData } from '../components/patterns/PageMetaData'
import { LoadingView } from '../components/patterns/LoadingView'
import { About } from '../components/templates/About'
import { DEFAULT_HOME_PATH } from '../lib/navigations'
import { useGetViewer } from '../lib/networking/viewer/useGetViewer'
import { useEffect, useState } from 'react'

export default function LandingPage(): JSX.Element {
  const router = useRouter()
  const { data: viewerData, isLoading } = useGetViewer()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isLoading && isReady && viewerData) {
      const navReturn = window.localStorage.getItem('nav-return')
      if (navReturn) {
        router.push(navReturn)
      } else {
        router.push(DEFAULT_HOME_PATH)
      }
    }
  }, [isLoading, isReady, viewerData, router])

  if (!isReady || isLoading) {
    return (
      <>
        <PageMetaData
          title="Omnivore"
          path="/"
          ogImage="/static/images/og-homepage-03.png"
          description="Omnivore is the free, open source, read-it-later app for serious readers."
        />
        <LoadingView bgColor="#FEFCF5" />
      </>
    )
  }

  if (viewerData) {
    return <></>
  }

  return (
    <>
      <PageMetaData
        title="Omnivore"
        path="/"
        ogImage="/static/images/og-homepage-03.png"
        description="Omnivore is the free, open source, read-it-later app for serious readers."
      />

      <About lang="en" />
    </>
  )
}
