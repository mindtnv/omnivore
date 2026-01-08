import React, { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { styled, keyframes } from '../tokens/stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

const slideUp = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' }
})

const BottomSheetOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  inset: 0,
  zIndex: 9,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
})

const BottomSheetContent = styled(Dialog.Content, {
  backgroundColor: '$grayBg',
  borderRadius: '16px 16px 0 0',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  maxHeight: '90vh',
  zIndex: 10,
  padding: '$4',
  paddingBottom: 'max($4, env(safe-area-inset-bottom))',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  animation: `${slideUp} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
  overflowY: 'auto',

  '&:focus': {
    outline: 'none'
  }
})

const DragHandle = styled('div', {
  width: '40px',
  height: '4px',
  backgroundColor: '$grayBorder',
  borderRadius: '2px',
  margin: '0 auto $3',
  flexShrink: 0
})

const BottomSheetTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: '600',
  fontSize: '18px',
  color: '$grayTextContrast',
  marginBottom: '$3'
})

const BottomSheetDescription = styled(Dialog.Description, {
  margin: 0,
  fontSize: '15px',
  color: '$grayText',
  marginBottom: '$3'
})

const CloseButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: '32px',
  width: '32px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$grayText',
  position: 'absolute',
  top: '$3',
  right: '$3',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$grayBgHover'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$omnivoreCtaYellow'
  }
})

interface BottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  showCloseButton?: boolean
}

export const BottomSheet = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  showCloseButton = true
}: BottomSheetProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <BottomSheetOverlay />
        <BottomSheetContent>
          <DragHandle />
          {showCloseButton && (
            <Dialog.Close asChild>
              <CloseButton aria-label="Close">
                <X size={20} />
              </CloseButton>
            </Dialog.Close>
          )}
          {title && <BottomSheetTitle>{title}</BottomSheetTitle>}
          {description && <BottomSheetDescription>{description}</BottomSheetDescription>}
          {children}
        </BottomSheetContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
