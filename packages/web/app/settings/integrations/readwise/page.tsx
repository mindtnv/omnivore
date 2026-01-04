'use client'

export const dynamic = 'force-dynamic'

import { PageMetaData } from '../../../../components/patterns/PageMetaData'
import { Readwise } from '../../../../components/templates/integrations/Readwise'


export default function ReadwisePage(): JSX.Element {
  return (
    <>
      <PageMetaData title="Readwise - Omnivore" path="/integrations/readwise" />
      <>
        <Readwise />
      </>
      <div data-testid="integrations-readwise-page-tag" />
    </>
  )
}
