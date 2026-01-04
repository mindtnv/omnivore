'use client'

export const dynamic = 'force-dynamic'

import { Button } from '../../../components/elements/Button'

export default function DebugShareTarget(): JSX.Element {
  return (
    <Button
      type="submit"
      style="ctaDarkYellow"
      css={{ my: '$2' }}
      onClick={(event) => {
        throw new Error('test error for sentry')
      }}
    >
      Submit
    </Button>
  )
}
