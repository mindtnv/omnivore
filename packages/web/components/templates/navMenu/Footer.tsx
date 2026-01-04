'use client'

import { Plus } from '@phosphor-icons/react'
import { HStack, SpanBox, Box } from '../../elements/LayoutPrimitives'
import { SplitButton } from '../../elements/SplitButton'
import { PrimaryDropdown } from '../PrimaryDropdown'
import { styled, theme } from '../../tokens/stitches.config'
import { LIBRARY_LEFT_MENU_WIDTH, LIBRARY_LEFT_MENU_WIDTH_COLLAPSED } from './NavigationMenuModern'
import { usePersistedState } from '../../../lib/hooks/usePersistedState'

const FooterContainer = styled('footer', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  height: '72px',
  position: 'sticky',
  bottom: 0,
  left: 0,
  bg: '$thNavMenuFooter',
  borderTop: '1px solid $thBorderColor',
  px: '12px',
  flexShrink: 0,
  transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1), padding 250ms cubic-bezier(0.4, 0, 0.2, 1)',

  '@mdDown': {
    display: 'none',
  },

  variants: {
    isCollapsed: {
      true: {
        justifyContent: 'center',
        px: '8px',
      },
    },
  },
})

const AddButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  height: '40px',
  px: '16px',
  border: 'none',
  borderRadius: '10px',
  bg: '$ctaBlue',
  color: 'white',
  cursor: 'pointer',
  fontFamily: '$display',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 150ms ease',
  whiteSpace: 'nowrap',

  '&:hover': {
    bg: '#0056D2',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  '&:focus-visible': {
    outline: '2px solid $ctaBlue',
    outlineOffset: '2px',
  },

  variants: {
    isCollapsed: {
      true: {
        width: '40px',
        px: '0',
        borderRadius: '10px',
        '& span': {
          display: 'none',
        },
      },
    },
  },
})

type NavMenuFooterProps = {
  showFullThemeSection?: boolean
  setShowAddLinkModal?: (show: true) => void
}

export const NavMenuFooter = (props: NavMenuFooterProps): JSX.Element => {
  const [isCollapsed] = usePersistedState<boolean>({
    key: 'nav-menu-collapsed',
    isSessionStorage: false,
    initialValue: false,
  })

  return (
    <FooterContainer isCollapsed={isCollapsed}>
      {!isCollapsed && (
        <Box css={{ flex: 1, minWidth: 0 }}>
          <PrimaryDropdown />
        </Box>
      )}

      {props.setShowAddLinkModal && (
        <AddButton
          isCollapsed={isCollapsed}
          onClick={() => props.setShowAddLinkModal && props.setShowAddLinkModal(true)}
          aria-label="Add new item"
          title={isCollapsed ? 'Add new item' : undefined}
        >
          <Plus size={18} weight="bold" />
          <span>Add</span>
        </AddButton>
      )}

      {isCollapsed && (
        <Box>
          <PrimaryDropdown />
        </Box>
      )}
    </FooterContainer>
  )
}
