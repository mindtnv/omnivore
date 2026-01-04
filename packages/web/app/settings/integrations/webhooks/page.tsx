'use client'

export const dynamic = 'force-dynamic'

import { PageMetaData } from '../../../../components/patterns/PageMetaData'
import { Webhooks } from '../../../../components/templates/integrations/Webhooks'


export default function WebhooksPage(): JSX.Element {
  return (
    <>
      <PageMetaData title="Readwise - Omnivore" path="/integrations/webhooks" />
      <>
        <Webhooks />
      </>
      <div data-testid="integrations-readwise-page-tag" />
    </>
  )
}
