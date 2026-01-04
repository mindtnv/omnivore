'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, HStack, SpanBox, VStack } from '../../components/elements/LayoutPrimitives'
import { ConfirmationModal } from '../../components/patterns/ConfirmationModal'
import { KeyboardShortcutListModal } from '../../components/templates/KeyboardShortcutListModal'
import { PageMetaData } from '../../components/patterns/PageMetaData'
import { DEFAULT_HEADER_HEIGHT } from '../../components/templates/homeFeed/HeaderSpacer'
import { useLogout } from '../../lib/logout'
import { SettingsMenu } from '../../components/templates/navMenu/SettingsMenu'
import { SettingsDropdown } from '../../components/templates/navMenu/SettingsDropdown'
import { useVerifyAuth } from '../../lib/hooks/useVerifyAuth'
import { applyStoredTheme } from '../../lib/themeUpdater'
import Link from 'next/link'
import { CaretLeft } from '@phosphor-icons/react'
import { DEFAULT_HOME_PATH } from '../../lib/navigations'

const ReturnButton = (): JSX.Element => {
  return (
    <SpanBox
      css={{
        a: {
          textDecorationColor: '$thLibraryMenuUnselected',
        },
        'a:visited': {
          textDecorationColor: '$thLibraryMenuUnselected',
        },
      }}
    >
      <Link href={DEFAULT_HOME_PATH}>
        <HStack
          css={{
            pl: '20px',
            pb: '6px',
            gap: '2px',
            font: '$inter',
            fontWeight: '500',
            color: '$thLibraryMenuUnselected',
          }}
          alignment="center"
        >
          <CaretLeft />
          Return to library
        </HStack>
      </Link>
    </SpanBox>
  )
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useVerifyAuth()

  const router = useRouter()
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const [showKeyboardCommandsModal, setShowKeyboardCommandsModal] =
    useState(false)

  applyStoredTheme()

  const showLogout = useCallback(() => {
    setShowLogoutConfirmation(true)
  }, [setShowLogoutConfirmation])

  useEffect(() => {
    document.addEventListener('logout', showLogout)

    return () => {
      document.removeEventListener('logout', showLogout)
    }
  }, [showLogout])

  const { logout } = useLogout()

  return (
    <VStack
      alignment="start"
      distribution="start"
      css={{ width: '100%', height: '100%', minHeight: '100vh' }}
    >
      <PageMetaData path="settings" title="Settings" />
      <VStack css={{ width: '100%', height: '100%' }}>
        <Box
          css={{
            height: DEFAULT_HEADER_HEIGHT,
            '@mdDown': {
              display: 'none',
            },
          }}
        ></Box>
        <HStack
          alignment="center"
          distribution="start"
          css={{
            p: '15px',
            display: 'none',
            height: DEFAULT_HEADER_HEIGHT,
            '@mdDown': {
              display: 'flex',
            },
          }}
        >
          <SettingsDropdown />
          <ReturnButton />
        </HStack>

        <HStack css={{ width: '100%', height: '100%' }} distribution="start">
          <SettingsMenu />
          {children}
        </HStack>
        <Box css={{ height: '120px', width: '100%' }} />
      </VStack>
      {showLogoutConfirmation ? (
        <ConfirmationModal
          message={'Are you sure you want to log out?'}
          onAccept={logout}
          onOpenChange={() => setShowLogoutConfirmation(false)}
        />
      ) : null}
      {showKeyboardCommandsModal ? (
        <KeyboardShortcutListModal
          onOpenChange={() => setShowKeyboardCommandsModal(false)}
        />
      ) : null}
    </VStack>
  )
}
