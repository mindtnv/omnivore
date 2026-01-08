import { toast, ToastOptions } from 'react-hot-toast'
import { CheckCircle, WarningCircle, X, Info } from '@phosphor-icons/react'
import { Box, HStack } from '../components/elements/LayoutPrimitives'
import { styled } from '@stitches/react'
import { Button } from '../components/elements/Button'

const toastStyles = {
  minWidth: 265,
  height: 56,
  borderRadius: 4,
  boxShadow: '0px 2px 8px rgba(32, 31, 29, 0.33)',
  margin: 0,
  paddingLeft: 6,
  paddingRight: 6,
  paddingTop: 12,
  paddingBottom: 12,
}

const messageStyles = {
  fontSize: 14,
  fontWeight: 'bolder',
  color: 'white',
  flex: 1,
  marginLeft: 16,
}

const MessageContainer = styled(Box, messageStyles)
const FullWidthContainer = styled(HStack, {
  width: '100%',
})

type ToastType = 'success' | 'error' | 'info'

const showToast = (
  message: string,
  background: string,
  type: ToastType,
  options?: ToastOptions
) => {
  return toast(
    ({ id }) => (
      <FullWidthContainer alignment="center">
        {type === 'success' ? (
          <CheckCircle size={24} color="white" />
        ) : type === 'info' ? (
          <Info size={24} color="white" />
        ) : (
          <WarningCircle size={24} color="white" />
        )}
        <MessageContainer>{message}</MessageContainer>
        <HStack distribution="end" css={{ marginLeft: 16 }}>
          <X
            size={18}
            style={{ cursor: 'pointer' }}
            color="#CCEAC4"
            weight="bold"
            onClick={() => toast.dismiss(id)}
          />
        </HStack>
      </FullWidthContainer>
    ),
    {
      style: {
        ...toastStyles,
        background: background,
      },
      duration: 1500,
      ...options,
    }
  )
}

const showToastWithUndo = (
  message: string,
  background: string,
  undoAction: () => Promise<void>,
  options?: ToastOptions
) => {
  return toast(
    ({ id }) => (
      <FullWidthContainer alignment="center">
        <CheckCircle size={24} color="white" />
        <MessageContainer>{message}</MessageContainer>
        <HStack distribution="end" css={{ marginLeft: 16 }}>
          <Button
            style="ctaLightGray"
            onClick={(event) => {
              event.preventDefault()

              toast.dismiss(id)
              ;(async () => {
                await undoAction()
              })()
            }}
          >
            Undo
          </Button>
        </HStack>
      </FullWidthContainer>
    ),
    {
      style: {
        ...toastStyles,
        background: background,
      },
      duration: 3500,
      ...options,
    }
  )
}

const showToastWithAction = (
  message: string,
  background: string,
  actionName: string,
  action: () => Promise<void>,
  options?: ToastOptions
) => {
  return toast(
    ({ id }) => (
      <FullWidthContainer alignment="center">
        <CheckCircle size={24} color="white" />
        <MessageContainer>{message}</MessageContainer>
        <HStack distribution="end" css={{ marginLeft: 16 }}>
          <Button
            style="ctaLightGray"
            onClick={(event) => {
              event.preventDefault()
              toast.dismiss(id)
              ;(async () => {
                await action()
              })()
            }}
          >
            {actionName}
          </Button>
        </HStack>
      </FullWidthContainer>
    ),
    {
      style: {
        ...toastStyles,
        background: background,
      },
      duration: 3500,
      ...options,
    }
  )
}

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  console.trace('showing success toast')
  return showToast(message, '#55B938', 'success', {
    position: 'bottom-right',
    ...options,
  })
}

export const showErrorToast = (message: string, options?: ToastOptions) => {
  return showToast(message, '#cc0000', 'error', {
    position: 'bottom-right',
    ...options,
  })
}

export const showSuccessToastWithUndo = (
  message: string,
  undoAction: () => Promise<void>
) => {
  return showToastWithUndo(message, '#55B938', undoAction, {
    position: 'bottom-right',
  })
}

export const showSuccessToastWithAction = (
  message: string,
  actionName: string,
  action: () => Promise<void>
) => {
  return showToastWithAction(message, '#55B938', actionName, action, {
    position: 'bottom-right',
  })
}

export const showInfoToast = (message: string, options?: ToastOptions) => {
  return showToast(message, '#FFD234', 'info', {
    position: 'bottom-right',
    ...options,
  })
}

export const showLoadingToast = (message: string) => {
  return toast.loading(
    ({ id }) => (
      <FullWidthContainer alignment="center">
        <Box
          css={{
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            animation: 'spin 0.8s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}
        />
        <MessageContainer>{message}</MessageContainer>
      </FullWidthContainer>
    ),
    {
      style: {
        ...toastStyles,
        background: '#6A6968',
      },
      duration: Infinity,
      position: 'bottom-right',
    }
  )
}
