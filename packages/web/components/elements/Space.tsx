import { styled } from '../tokens/stitches.config'

export const Space = styled('div', {
  display: 'flex',

  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row'
      },
      vertical: {
        flexDirection: 'column'
      }
    },
    size: {
      small: {
        gap: '$1'
      },
      medium: {
        gap: '$2'
      },
      large: {
        gap: '$3'
      }
    },
    align: {
      start: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      end: {
        alignItems: 'flex-end'
      }
    }
  },

  defaultVariants: {
    direction: 'horizontal',
    size: 'medium'
  }
})
