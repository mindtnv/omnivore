import { styled } from '../tokens/stitches.config'

export const Table = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid $thBorderColor',

  '@mdDown': {
    display: 'block',
    '& thead': {
      display: 'none'
    },
    '& tbody, & tr, & td': {
      display: 'block'
    },
    '& tr': {
      marginBottom: '$3',
      borderBottom: '2px solid $thBorderColor'
    }
  }
})

export const TableHeader = styled('thead', {
  bg: '$thBackground2'
})

export const TableBody = styled('tbody')

export const TableRow = styled('tr', {
  borderBottom: '1px solid $thBorderColor',

  '&:hover': {
    bg: '$grayBgHover'
  }
})

export const TableHead = styled('th', {
  padding: '$2',
  fontWeight: '600',
  textAlign: 'left',
  borderRight: '1px solid $thBorderColor',

  '&:last-child': {
    borderRight: 'none'
  }
})

export const TableCell = styled('td', {
  padding: '$2',
  color: '$grayTextContrast',
  borderRight: '1px solid $thBorderColor',

  '&:last-child': {
    borderRight: 'none'
  },

  '@mdDown': {
    '&::before': {
      content: 'attr(data-label)',
      fontWeight: '600',
      display: 'inline-block',
      marginRight: '$2'
    }
  }
})
