import React, { ReactNode } from 'react'
import { Info, Warning, XCircle, CheckCircle } from '@phosphor-icons/react'
import { styled } from '../tokens/stitches.config'

const AlertRoot = styled('div', {
  display: 'flex',
  gap: '$2',
  padding: '$3',
  borderRadius: '6px',
  alignItems: 'flex-start',

  variants: {
    type: {
      info: {
        backgroundColor: '$grayBgSubtle',
        border: '1px solid $ctaBlue',
        color: '$ctaBlue'
      },
      warning: {
        backgroundColor: '$grayBgSubtle',
        border: '1px solid $omnivoreCtaYellow',
        color: '$grayTextContrast'
      },
      error: {
        backgroundColor: '$grayBgSubtle',
        border: '1px solid $error',
        color: '$error'
      },
      success: {
        backgroundColor: '$grayBgSubtle',
        border: '1px solid $success',
        color: '$success'
      }
    }
  },

  defaultVariants: {
    type: 'info'
  }
})

const AlertIcon = styled('div', {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px'
})

const AlertContent = styled('div', {
  flex: 1,
  fontSize: '14px',
  lineHeight: '1.5'
})

interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  showIcon?: boolean
  children: ReactNode
}

const iconMap = {
  info: Info,
  warning: Warning,
  error: XCircle,
  success: CheckCircle
}

export const Alert = ({ type = 'info', showIcon = true, children }: AlertProps) => {
  const IconComponent = iconMap[type]

  return (
    <AlertRoot type={type}>
      {showIcon && (
        <AlertIcon>
          <IconComponent size={20} weight="fill" />
        </AlertIcon>
      )}
      <AlertContent>{children}</AlertContent>
    </AlertRoot>
  )
}
