'use client'

import { ReactNode, useCallback, useRef, useState } from 'react'
import { StyledText } from '../../elements/StyledText'
import { Box, HStack, SpanBox, VStack } from '../../elements/LayoutPrimitives'
import {
  House,
  BookmarkSimple,
  Rss,
  HighlighterCircle,
  Archive,
  Trash,
  DotsThree,
  Plus,
  CaretLeft,
  X,
} from '@phosphor-icons/react'
import { styled, theme } from '../../tokens/stitches.config'
import { usePersistedState } from '../../../lib/hooks/usePersistedState'
import { NavMenuFooter } from './Footer'
import { Dropdown, DropdownOption } from '../../elements/DropdownElements'
import { useRouter } from 'next/navigation'
import { NavigationSection } from '../NavigationLayout'
import { TreeApi } from 'react-arborist'
import React from 'react'
import {
  Shortcut,
  useResetShortcuts,
} from '../../../lib/networking/shortcuts/useShortcuts'
import { ShortcutsTree } from '../ShortcutsTree'
import { LogoBox } from '../../elements/LogoBox'
import { Button } from '../../elements/Button'

export const LIBRARY_LEFT_MENU_WIDTH = '275px'
export const LIBRARY_LEFT_MENU_WIDTH_COLLAPSED = '72px'


// Styled components
const SidebarContainer = styled('aside', {
  left: '0px',
  top: '0px',
  position: 'fixed',
  height: '100%',
  width: LIBRARY_LEFT_MENU_WIDTH,
  bg: '$thLeftMenuBackground',
  overflowY: 'auto',
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 50,

  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    bg: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    bg: '$thBorderColor',
    borderRadius: '3px',
    '&:hover': {
      bg: '$homeTextSubtle',
    },
  },

  // On mobile: hidden by default, slide in when open
  '@mdDown': {
    width: '280px',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
    transform: 'translateX(-100%)',
    transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  variants: {
    isOpen: {
      true: {
        '@mdDown': {
          transform: 'translateX(0)',
        },
      },
      false: {
        '@mdDown': {
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
        },
      },
    },
    isCollapsed: {
      true: {
        width: LIBRARY_LEFT_MENU_WIDTH_COLLAPSED,
        '@mdDown': {
          width: '280px',
        },
      },
    },
  },
})

const Overlay = styled('div', {
  display: 'none',
  position: 'fixed',
  inset: 0,
  bg: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(2px)',
  zIndex: 40,

  '@mdDown': {
    display: 'block',
  },
})

const SidebarHeader = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '64px',
  px: '16px',
  borderBottom: '1px solid $thBorderColor',
  flexShrink: 0,
  position: 'sticky',
  top: 0,
  bg: '$thLeftMenuBackground',
  zIndex: 10,
})

const NavSection = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  px: '12px',
  py: '16px',
})

const NavItemStyled = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  height: '44px',
  px: '12px',
  border: 'none',
  borderRadius: '10px',
  bg: 'transparent',
  cursor: 'pointer',
  fontFamily: '$display',
  fontSize: '15px',
  fontWeight: '500',
  color: '$thLibraryMenuUnselected',
  transition: 'all 150ms ease',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '10px',
    bg: '$thLibrarySelectionColor',
    opacity: 0,
    transition: 'opacity 150ms ease',
  },

  '&:hover': {
    color: '$thLibraryMenuPrimary',
    '&::before': {
      opacity: 0.5,
    },
  },

  '&:active': {
    transform: 'scale(0.98)',
  },

  '&:focus-visible': {
    outline: '2px solid $ctaBlue',
    outlineOffset: '2px',
  },

  variants: {
    isSelected: {
      true: {
        color: '$thLibraryMenuPrimary',
        fontWeight: '600',
        '&::before': {
          opacity: 1,
        },
      },
    },
    isCollapsed: {
      true: {
        justifyContent: 'center',
        px: '0',
        '& > span:last-child': {
          display: 'none',
        },
      },
    },
  },

  compoundVariants: [
    {
      isSelected: true,
      isCollapsed: false,
      css: {
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '3px',
          height: '24px',
          borderRadius: '0 3px 3px 0',
          bg: '$ctaBlue',
        },
      },
    },
  ],
})

const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  flexShrink: 0,
})

const SectionDivider = styled('div', {
  height: '1px',
  bg: '$thBorderColor',
  mx: '12px',
  my: '8px',
})

const SectionTitle = styled('h3', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: '$display',
  fontSize: '12px',
  fontWeight: '600',
  color: '$homeTextSubtle',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  px: '12px',
  py: '8px',
  m: 0,
})

const CloseButton = styled('button', {
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  border: 'none',
  borderRadius: '8px',
  bg: 'transparent',
  cursor: 'pointer',
  color: '$thTextContrast',
  transition: 'background 150ms ease',

  '&:hover': {
    bg: '$thBackground4',
  },

  '@mdDown': {
    display: 'flex',
  },
})

const CollapseButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  border: 'none',
  borderRadius: '8px',
  bg: 'transparent',
  cursor: 'pointer',
  color: '$homeTextSubtle',
  transition: 'all 150ms ease',

  '&:hover': {
    bg: '$thBackground4',
    color: '$thTextContrast',
  },

  '@mdDown': {
    display: 'none',
  },

  variants: {
    isCollapsed: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
})

// Types
type NavigationMenuProps = {
  section: NavigationSection
  setShowAddLinkModal: (show: boolean) => void
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

type NavItemConfig = {
  id: NavigationSection
  label: string
  icon: typeof House
  path: string
}

const primaryNavItems: NavItemConfig[] = [
  { id: 'home', label: 'Home', icon: House, path: '/home' },
  { id: 'library', label: 'Library', icon: BookmarkSimple, path: '/library' },
  { id: 'subscriptions', label: 'Subscriptions', icon: Rss, path: '/subscriptions' },
  { id: 'highlights', label: 'Highlights', icon: HighlighterCircle, path: '/highlights' },
]

const secondaryNavItems: NavItemConfig[] = [
  { id: 'archive', label: 'Archive', icon: Archive, path: '/archive' },
  { id: 'trash', label: 'Trash', icon: Trash, path: '/trash' },
]

export function NavigationMenuModern(props: NavigationMenuProps): JSX.Element {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = usePersistedState<boolean>({
    key: 'nav-menu-collapsed',
    isSessionStorage: false,
    initialValue: false,
  })

  const handleNavClick = (item: NavItemConfig) => {
    router.push(item.path)
    // Close menu on mobile after navigation
    if (window.innerWidth <= 768) {
      props.setShowMenu(false)
    }
  }

  const handleClose = useCallback(() => {
    props.setShowMenu(false)
  }, [props])

  return (
    <>
      {/* Overlay for mobile */}
      {props.showMenu && (
        <Overlay onClick={handleClose} aria-hidden="true" />
      )}

      <SidebarContainer
        isOpen={props.showMenu}
        isCollapsed={isCollapsed}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <SidebarHeader css={{ justifyContent: isCollapsed ? 'center' : 'space-between' }}>
          {!isCollapsed && <LogoBox />}
          <HStack css={{ gap: '8px' }}>
            <CollapseButton
              isCollapsed={isCollapsed}
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <CaretLeft size={18} />
            </CollapseButton>
            <CloseButton onClick={handleClose} aria-label="Close navigation">
              <X size={20} />
            </CloseButton>
          </HStack>
        </SidebarHeader>

        {/* Primary Navigation */}
        <NavSection aria-label="Primary navigation">
          {primaryNavItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isSelected={props.section === item.id}
              isCollapsed={isCollapsed}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </NavSection>

        <SectionDivider />

        {/* Secondary Navigation */}
        <NavSection aria-label="Secondary navigation">
          {secondaryNavItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isSelected={props.section === item.id}
              isCollapsed={isCollapsed}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </NavSection>

        <SectionDivider />

        {/* Shortcuts Section */}
        {!isCollapsed && (
          <ShortcutsSection />
        )}

        {/* Spacer to push footer down */}
        <Box css={{ flex: 1, minHeight: '100px' }} />

        {/* Footer */}
        <NavMenuFooter {...props} showFullThemeSection={true} />
      </SidebarContainer>

      {/* Spacer for desktop layout */}
      <SpanBox
        css={{
          width: isCollapsed ? LIBRARY_LEFT_MENU_WIDTH_COLLAPSED : LIBRARY_LEFT_MENU_WIDTH,
          flexShrink: 0,
          transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '@mdDown': {
            display: 'none',
          },
        }}
      />
    </>
  )
}

// NavItem component
type NavItemProps = {
  item: NavItemConfig
  isSelected: boolean
  isCollapsed: boolean
  onClick: () => void
}

function NavItem({ item, isSelected, isCollapsed, onClick }: NavItemProps): JSX.Element {
  const Icon = item.icon

  return (
    <NavItemStyled
      isSelected={isSelected}
      isCollapsed={isCollapsed}
      onClick={onClick}
      aria-current={isSelected ? 'page' : undefined}
      title={isCollapsed ? item.label : undefined}
    >
      <IconWrapper>
        <Icon
          size={22}
          weight={isSelected ? 'fill' : 'regular'}
          color={
            isSelected
              ? theme.colors.thLibraryMenuPrimary.toString()
              : theme.colors.thLibraryMenuUnselected.toString()
          }
        />
      </IconWrapper>
      <span>{item.label}</span>
    </NavItemStyled>
  )
}

// Shortcuts Section component
function ShortcutsSection(): JSX.Element {
  const router = useRouter()
  const treeRef = useRef<TreeApi<Shortcut> | undefined>(undefined)
  const resetShortcuts = useResetShortcuts()

  const createNewFolder = useCallback(async () => {
    if (treeRef.current) {
      await treeRef.current.create({
        type: 'internal',
        index: 0,
      })
    }
  }, [treeRef])

  const resetShortcutsToDefault = useCallback(async () => {
    await resetShortcuts.mutateAsync()
  }, [resetShortcuts])

  return (
    <VStack
      css={{
        m: '0px',
        gap: '8px',
        width: '100%',
        px: '0px',
        pb: '25px',
      }}
      alignment="start"
      distribution="start"
    >
      <SectionTitle>
        Shortcuts
        <SpanBox css={{ display: 'flex' }}>
          <Dropdown
            side="bottom"
            triggerElement={
              <Box
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 150ms ease',
                  '&:hover': {
                    bg: '$thBackground4',
                  },
                }}
              >
                <DotsThree size={18} weight="bold" />
              </Box>
            }
          >
            <DropdownOption
              onSelect={() => router.push('/settings/shortcuts')}
              title="Edit shortcuts"
            />
            <DropdownOption
              onSelect={resetShortcutsToDefault}
              title="Reset to default"
            />
            <DropdownOption
              onSelect={createNewFolder}
              title="Create new folder"
            />
          </Dropdown>
        </SpanBox>
      </SectionTitle>
      <Box
        css={{
          width: '100%',
          height: '100%',
          '[role="treeitem"]': {
            outline: 'none',
          },
          '[role="treeitem"]:focus': {
            outline: 'none',
          },
        }}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
      >
        <ShortcutsTree treeRef={treeRef} />
      </Box>
    </VStack>
  )
}

export default NavigationMenuModern
