import { styled } from '../tokens/stitches.config'

export const Tag = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '4px',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  gap: '$1',

  variants: {
    variant: {
      default: {
        backgroundColor: '$thLabelChipBackground',
        color: '$thLabelChipForeground',
        border: '1px solid $thLabelChipUnselectedBorder'
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$grayTextContrast',
        border: '1px solid $thLabelOutlineChipBorder'
      }
    },
    size: {
      small: {
        fontSize: '11px',
        px: '$1',
        py: '2px',
        height: '20px'
      },
      medium: {
        fontSize: '13px',
        px: '$2',
        py: '4px',
        height: '24px'
      }
    }
  },

  defaultVariants: {
    variant: 'default',
    size: 'medium'
  }
})
