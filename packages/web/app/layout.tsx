import '../styles/globals.css'
import '../styles/articleInnerStyling.css'
import { Providers } from './providers'
import { getCssText, globalStyles } from '../components/tokens/stitches.config'
import Script from 'next/script'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Omnivore',
    template: '%s | Omnivore',
  },
  description: 'Omnivore - Read-it-later app for serious readers',
  manifest: '/manifest.webmanifest',
  keywords: ['read-it-later', 'reading', 'bookmarks', 'articles', 'highlights'],
  authors: [{ name: 'Omnivore' }],
  openGraph: {
    title: 'Omnivore',
    description: 'Omnivore - Read-it-later app for serious readers',
    url: 'https://omnivore.app',
    siteName: 'Omnivore',
    images: [
      {
        url: '/static/images/og-homepage-03.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omnivore',
    description: 'Omnivore - Read-it-later app for serious readers',
    images: ['/static/images/og-homepage-03.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <script async src="/static/scripts/intercom.js" />
        <script async src="/static/scripts/inject-sw.js" />
        <Script strategy="beforeInteractive" src="/env.js" />

        {/* prefetch (not preload) fonts that will be used by the reader */}
        <link rel="prefetch" href="/static/fonts/Lora/Lora-Regular.ttf" />
        <link rel="prefetch" href="/static/fonts/Lora/Lora-Bold.ttf" />
        <link rel="prefetch" href="/static/fonts/Lora/Lora-Italic.ttf" />
        <link
          rel="prefetch"
          href="/static/fonts/Merriweather/Merriweather-Regular.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Merriweather/Merriweather-Bold.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Merriweather/Merriweather-Italic.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Open_Sans/OpenSans-Regular.ttf"
        />
        <link rel="prefetch" href="/static/fonts/Open_Sans/OpenSans-Bold.ttf" />
        <link
          rel="prefetch"
          href="/static/fonts/Open_Sans/OpenSans-Italic.ttf"
        />
        <link rel="prefetch" href="/static/fonts/Roboto/Roboto-Regular.ttf" />
        <link rel="prefetch" href="/static/fonts/Roboto/Roboto-Bold.ttf" />
        <link rel="prefetch" href="/static/fonts/Roboto/Roboto-Italic.ttf" />
        <link
          rel="prefetch"
          href="/static/fonts/Crimson_Text/CrimsonText-Regular.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Crimson_Text/CrimsonText-Bold.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Crimson_Text/CrimsonText-Italic.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Source_Serif_Pro/SourceSerifPro-Regular.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Source_Serif_Pro/SourceSerifPro-Bold.ttf"
        />
        <link
          rel="prefetch"
          href="/static/fonts/Source_Serif_Pro/SourceSerifPro-Italic.ttf"
        />
        <link rel="prefetch" href="/static/fonts/SFMono/SFMonoRegular.otf" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
