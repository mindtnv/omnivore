'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import { SettingsLayout } from '../../../../components/templates/SettingsLayout'
import IOSInstallHelp from '../../../../components/elements/IOSInstallHelp'

export default function Mobile(): JSX.Element {
  return (
    <SettingsLayout title="Mobile Installation">
      <IOSInstallHelp />
    </SettingsLayout>
  )
}
