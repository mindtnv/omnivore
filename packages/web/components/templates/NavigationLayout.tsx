'use client'

import { PageMetaData, PageMetaDataProps } from '../patterns/PageMetaData'
import { Box, HStack, SpanBox, VStack } from '../elements/LayoutPrimitives'
import { ReactNode, useEffect, useState, useCallback } from 'react'
import { navigationCommands } from '../../lib/keyboardShortcuts/navigationShortcuts'
import { useKeyboardShortcuts } from '../../lib/keyboardShortcuts/useKeyboardShortcuts'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../patterns/ConfirmationModal'
import { KeyboardShortcutListModal } from './KeyboardShortcutListModal'
import { setupAnalytics } from '../../lib/analytics'
import { primaryCommands } from '../../lib/keyboardShortcuts/navigationShortcuts'
import { useLogout } from '../../lib/logout'
import { useApplyLocalTheme } from '../../lib/hooks/useApplyLocalTheme'
import { useRegisterActions } from 'kbar'
import { styled, keyframes, theme } from '../tokens/stitches.config'
import { NavigationMenuModern } from './navMenu/NavigationMenuModern'
import { MobileBottomNav } from './navMenu/MobileBottomNav'
import { Button } from '../elements/Button'
import { List } from '@phosphor-icons/react'
import { AddLinkModal } from './AddLinkModal'
import useWindowDimensions from '../../lib/hooks/useGetWindowDimensions'
import { useHandleAddUrl } from '../../lib/hooks/useHandleAddUrl'
import { useGetViewer } from '../../lib/networking/viewer/useGetViewer'
import { useQueryClient } from '@tanstack/react-query'

// Animation keyframes
const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

// Styled components for the mobile header
const MobileHeader = styled('header', {
  display: 'none',
  position: 'fixed',
  left: '0px',
  top: '0px',
  right: '0px',
  alignItems: 'center',
  height: '56px',
  px: '16px',
  gap: '12px',
  bg: '$thLeftMenuBackground',
  borderBottom: '1px solid $thBorderColor',
  zIndex: 30,

  '@mdDown': {
    display: 'flex',
  },
})

const MenuToggleButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  border: 'none',
  borderRadius: '10px',
  bg: 'transparent',
  cursor: 'pointer',
  color: '$thTextContrast',
  transition: 'all 150ms ease',

  '&:hover': {
    bg: '$thBackground4',
  },

  '&:active': {
    transform: 'scale(0.95)',
  },

  '&:focus-visible': {
    outline: '2px solid $ctaBlue',
    outlineOffset: '2px',
  },
})

const MainContent = styled('main', {
  flex: 1,
  minWidth: 0,
  height: '100vh',
  overflow: 'auto',
  transition: 'padding-left 250ms cubic-bezier(0.4, 0, 0.2, 1)',

  '@mdDown': {
    paddingBottom: '64px', // Space for mobile bottom nav
    paddingTop: '56px', // Space for mobile header
  },
})

export type NavigationSection =
  | 'home'
  | 'library'
  | 'subscriptions'
  | 'highlights'
  | 'archive'
  | 'trash'

type NavigationLayoutProps = {
  children: ReactNode
  rightPane?: ReactNode
  title: string
  section: NavigationSection
  pageMetaDataProps?: PageMetaDataProps

  showNavigationMenu: boolean
  setShowNavigationMenu: (show: boolean) => void
}

export function NavigationLayout(props: NavigationLayoutProps): JSX.Element {
  useApplyLocalTheme()

  const router = useRouter()
  const queryClient = useQueryClient()
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const [showKeyboardCommandsModal, setShowKeyboardCommandsModal] =
    useState(false)
  const {
    data: viewerData,
    isFetching,
    isPending,
    isError,
    status,
  } = useGetViewer()


  useRegisterActions(navigationCommands(router))

  useKeyboardShortcuts(
    primaryCommands((action) => {
      switch (action) {
        case 'toggleShortcutHelpModalDisplay':
          setShowKeyboardCommandsModal(true)
          break
      }
    })
  )

  // Attempt to identify the user if they are logged in.
  useEffect(() => {
    if (viewerData) {
      setupAnalytics(viewerData)
    }
    if (!viewerData && !isPending) {
      console.log('viewerData: ', viewerData, isFetching, isPending, status)
      // there was an error loading, so lets log out
      queryClient.clear()
      router.push(`/login`)
    }
  }, [viewerData])

  const showLogout = useCallback(() => {
    setShowLogoutConfirmation(true)
  }, [setShowLogoutConfirmation])

  const { width, previous } = useWindowDimensions()

  useEffect(() => {
    if (width < previous.width && width <= 768) {
      props.setShowNavigationMenu(false)
    }
  }, [width, previous])

  const [showAddLinkModal, setShowAddLinkModal] = useState(false)

  const handleLinkAdded = useHandleAddUrl()

  useEffect(() => {
    document.addEventListener('logout', showLogout)

    return () => {
      document.removeEventListener('logout', showLogout)
    }
  }, [showLogout])

  const { logout } = useLogout()

  // Handle keyboard shortcut to toggle menu
  useKeyboardShortcuts([
    {
      shortcutKeys: ['['],
      callback: () => props.setShowNavigationMenu(!props.showNavigationMenu),
      actionDescription: 'Toggle sidebar',
      shortcutKeyDescription: '[',
    },
  ])

  return (
    <HStack
      css={{
        width: '100vw',
        height: '100vh',
        bg: '$thBackground',
      }}
      distribution="start"
      alignment="start"
    >
      <PageMetaData path={props.section} title={props.title} />

      {/* Mobile header with menu toggle - only visible on mobile */}
      <MobileHeader>
        <MenuToggleButton
          onClick={() => props.setShowNavigationMenu(true)}
          aria-label="Open navigation menu"
        >
          <List size={22} weight="bold" />
        </MenuToggleButton>
      </MobileHeader>

      {/* Sidebar Navigation */}
      <NavigationMenuModern
        section={props.section}
        setShowAddLinkModal={setShowAddLinkModal}
        showMenu={props.showNavigationMenu}
        setShowMenu={props.setShowNavigationMenu}
      />

      {/* Main Content Area */}
      <MainContent>
        {props.children}
      </MainContent>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        section={props.section}
        onMenuToggle={() => props.setShowNavigationMenu(!props.showNavigationMenu)}
      />

      {/* Modals */}
      {showLogoutConfirmation && (
        <ConfirmationModal
          message={'Are you sure you want to log out?'}
          onAccept={logout}
          onOpenChange={() => setShowLogoutConfirmation(false)}
        />
      )}
      {showKeyboardCommandsModal && (
        <KeyboardShortcutListModal
          onOpenChange={() => setShowKeyboardCommandsModal(false)}
        />
      )}
      {showAddLinkModal && (
        <AddLinkModal
          onOpenChange={setShowAddLinkModal}
          handleLinkSubmission={handleLinkAdded}
        />
      )}
    </HStack>
  )
}

