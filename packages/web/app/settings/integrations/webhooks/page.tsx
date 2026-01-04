'use client'

export const dynamic = 'force-dynamic'

import { PageMetaData } from '../../../../components/patterns/PageMetaData'
import { Webhooks } from '../../../../components/templates/integrations/Webhooks'
import { SettingsLayout } from '../../../../components/templates/SettingsLayout'

export default function WebhooksPage(): JSX.Element {
  return (
    <>
      <PageMetaData title="Readwise - Omnivore" path="/integrations/webhooks" />
      <SettingsLayout>
        <Webhooks />
      </SettingsLayout>
      <div data-testid="integrations-readwise-page-tag" />
    </>
  )
}
