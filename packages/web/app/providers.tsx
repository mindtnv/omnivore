'use client'

import { ReactNode, useState, useEffect } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  Priority,
} from 'kbar'
import { useRouter } from 'next/navigation'
import {
  animatorStyle,
  KBarResultsComponents,
  searchStyle,
} from '../components/elements/KBar'
import { updateTheme, applyStoredTheme } from '../lib/themeUpdater'
import { ThemeId } from '../components/tokens/stitches.config'
import { GoogleReCaptchaProvider } from '@google-recaptcha/react'
import { Toaster } from 'react-hot-toast'
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  barColors: {
    '0': '#FFD234',
    '1.0': '#FFD234',
  },
  shadowBlur: 0,
  barThickness: 2,
})

const generateActions = () => {
  return [
    {
      id: 'lightTheme',
      section: 'Preferences',
      name: 'Change theme (light) ',
      shortcut: ['v', 'l'],
      keywords: 'light theme',
      priority: Priority.LOW,
      perform: () => updateTheme(ThemeId.Light),
    },
    {
      id: 'darkTheme',
      section: 'Preferences',
      name: 'Change theme (dark) ',
      shortcut: ['v', 'd'],
      keywords: 'dark theme',
      priority: Priority.LOW,
      perform: () => updateTheme(ThemeId.Dark),
    },
  ]
}

function ConditionalCaptchaProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  if (process.env.NEXT_PUBLIC_RECAPTCHA_CHALLENGE_SITE_KEY) {
    return (
      <GoogleReCaptchaProvider
        type="v2-checkbox"
        isEnterprise={true}
        host="recaptcha.net"
        siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_CHALLENGE_SITE_KEY ?? ''}
      >
        {children}
      </GoogleReCaptchaProvider>
    )
  }
  return <>{children}</>
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 4, // 4hrs
          },
        },
      })
  )

  const [asyncStoragePersister] = useState(() =>
    createAsyncStoragePersister({
      storage: AsyncStorage,
    })
  )

  // Apply stored theme and hide initial loader once React has mounted
  useEffect(() => {
    // Apply Stitches theme class from localStorage
    // This ensures theme is consistent after page navigation
    applyStoredTheme()

    // Show content now that theme is applied
    document.body.classList.add('app-ready')
    return () => {
      document.body.classList.remove('app-ready')
    }
  }, [])

  return (
    <ConditionalCaptchaProvider>
      <Toaster />
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <KBarProvider actions={generateActions()}>
          <KBarPortal>
            <KBarPositioner style={{ zIndex: 100 }}>
              <KBarAnimator style={animatorStyle}>
                <KBarSearch style={searchStyle} />
                <KBarResultsComponents />
              </KBarAnimator>
            </KBarPositioner>
          </KBarPortal>
          {children}
        </KBarProvider>
      </PersistQueryClientProvider>
    </ConditionalCaptchaProvider>
  )
}
