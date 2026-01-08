import { styled, keyframes } from '../tokens/stitches.config'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
})

export const Spinner = styled('div', {
  border: '3px solid $grayBorder',
  borderTop: '3px solid $omnivoreCtaYellow',
  borderRadius: '50%',
  animation: `${spin} 0.8s linear infinite`,

  variants: {
    size: {
      small: {
        width: '16px',
        height: '16px',
        borderWidth: '2px'
      },
      medium: {
        width: '24px',
        height: '24px',
        borderWidth: '3px'
      },
      large: {
        width: '40px',
        height: '40px',
        borderWidth: '4px'
      }
    }
  },

  defaultVariants: {
    size: 'medium'
  }
})
