'use client'

import { useRouter } from 'next/navigation'
import {
  House,
  BookmarkSimple,
  Rss,
  HighlighterCircle,
  List,
} from '@phosphor-icons/react'
import { Box, HStack } from '../../elements/LayoutPrimitives'
import { styled, keyframes, theme } from '../../tokens/stitches.config'
import { NavigationSection } from '../NavigationLayout'

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
})

const BottomNavContainer = styled('nav', {
  display: 'none',
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  height: '64px',
  bg: '$thLeftMenuBackground',
  borderTop: '1px solid $thBorderColor',
  zIndex: 100,
  animation: `${slideUp} 200ms ease-out`,
  backdropFilter: 'blur(10px)',
  '@mdDown': {
    display: 'flex',
  },
  // Safe area for devices with home indicator
  paddingBottom: 'env(safe-area-inset-bottom, 0px)',
})

const NavItem = styled('button', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  flex: 1,
  height: '100%',
  minHeight: '44px',
  minWidth: '44px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: '$homeTextSubtle',
  transition: 'color 150ms ease, transform 150ms ease',
  fontFamily: '$display',
  fontSize: '10px',
  fontWeight: '500',
  padding: '8px 0',
  position: 'relative',

  '&:hover': {
    color: '$thTextContrast',
  },

  '&:active': {
    transform: 'scale(0.95)',
  },

  '&:focus-visible': {
    outline: '2px solid $ctaBlue',
    outlineOffset: '-2px',
    borderRadius: '8px',
  },

  variants: {
    isActive: {
      true: {
        color: '$thTextContrast',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          bg: '$ctaBlue',
        },
      },
    },
  },
})

const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '8px',
  transition: 'background 150ms ease',

  variants: {
    isActive: {
      true: {
        bg: '$thLibrarySelectionColor',
      },
    },
  },
})

type MobileBottomNavProps = {
  section: NavigationSection
  onMenuToggle: () => void
}

type NavItemConfig = {
  id: NavigationSection | 'menu'
  label: string
  icon: typeof House
  path?: string
}

const navItems: NavItemConfig[] = [
  { id: 'home', label: 'Home', icon: House, path: '/home' },
  { id: 'library', label: 'Library', icon: BookmarkSimple, path: '/library' },
  { id: 'subscriptions', label: 'Feeds', icon: Rss, path: '/subscriptions' },
  { id: 'highlights', label: 'Highlights', icon: HighlighterCircle, path: '/highlights' },
  { id: 'menu', label: 'More', icon: List },
]

export function MobileBottomNav(props: MobileBottomNavProps): JSX.Element {
  const router = useRouter()

  const handleNavClick = (item: NavItemConfig) => {
    if (item.id === 'menu') {
      props.onMenuToggle()
    } else if (item.path) {
      router.push(item.path)
    }
  }

  return (
    <BottomNavContainer role="navigation" aria-label="Main navigation">
      <HStack
        css={{
          width: '100%',
          height: '100%',
          maxWidth: '500px',
          mx: 'auto',
        }}
        alignment="center"
        distribution="evenly"
      >
        {navItems.map((item) => {
          const isActive = item.id === props.section
          const Icon = item.icon

          return (
            <NavItem
              key={item.id}
              isActive={isActive}
              onClick={() => handleNavClick(item)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <IconWrapper isActive={isActive}>
                <Icon
                  size={22}
                  weight={isActive ? 'fill' : 'regular'}
                  color={
                    isActive
                      ? theme.colors.thTextContrast.toString()
                      : theme.colors.homeTextSubtle.toString()
                  }
                />
              </IconWrapper>
              {item.label}
            </NavItem>
          )
        })}
      </HStack>
    </BottomNavContainer>
  )
}
