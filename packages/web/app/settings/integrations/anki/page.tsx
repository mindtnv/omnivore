'use client'

export const dynamic = 'force-dynamic'

import { PageMetaData } from '../../../../components/patterns/PageMetaData'
import { Anki } from '../../../../components/templates/integrations/Anki'

export default function AnkiPage(): JSX.Element {
  return (
    <>
      <PageMetaData title="Anki - Omnivore" path="/settings/integrations/anki" />
      <>
        <Anki />
      </>
      <div data-testid="integrations-anki-page-tag" />
    </>
  )
}
