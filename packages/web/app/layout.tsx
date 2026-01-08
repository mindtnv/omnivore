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
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Critical inline CSS for immediate theme background + loader - prevents white flash */}
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                margin: 0;
                padding: 0;
                background-color: #F8F8F8;
              }
              html.theme-dark, html.theme-dark body { background-color: #252525; }
              html.theme-sepia, html.theme-sepia body { background-color: #F9F5E9; }
              html.theme-apollo, html.theme-apollo body { background-color: #1F2428; }
              html.theme-black, html.theme-black body { background-color: #000000; }
              @media (prefers-color-scheme: dark) {
                html:not([class*="theme-"]), html:not([class*="theme-"]) body { background-color: #252525; }
              }
              /* Hide ALL content until app is ready - prevents unstyled flash */
              body > *:not(.initial-loader) {
                opacity: 0 !important;
                visibility: hidden !important;
              }
              body.app-ready > *:not(.initial-loader) {
                opacity: 1 !important;
                visibility: visible !important;
              }
              @keyframes initial-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              .initial-loader {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              /* Theme backgrounds for loader */
              .initial-loader { background-color: #F8F8F8; }
              html.theme-dark .initial-loader { background-color: #252525; }
              html.theme-sepia .initial-loader { background-color: #F9F5E9; }
              html.theme-apollo .initial-loader { background-color: #1F2428; }
              html.theme-black .initial-loader { background-color: #000000; }
              @media (prefers-color-scheme: dark) {
                html:not([class*="theme-"]) .initial-loader { background-color: #252525; }
              }
              .initial-loader-spinner {
                width: 32px;
                height: 32px;
                border: 3px solid #E1E1E1;
                border-top-color: #FFD234;
                border-radius: 50%;
                animation: initial-spin 0.8s linear infinite;
              }
              html.theme-dark .initial-loader-spinner,
              html.theme-apollo .initial-loader-spinner,
              html.theme-black .initial-loader-spinner {
                border-color: #3D3D3D;
                border-top-color: #FFD234;
              }
              /* Hide loader when app is ready */
              body.app-ready .initial-loader {
                display: none;
              }
            `,
          }}
        />
        {/* Blocking script to apply theme BEFORE render to prevent white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var themeClass = 'theme-light';

                  // Handle JSON-encoded values from usePersistedState
                  if (theme) {
                    try {
                      var parsed = JSON.parse(theme);
                      if (typeof parsed === 'string') theme = parsed;
                    } catch(e) { /* not JSON, use as-is */ }
                  }

                  if (theme === 'Dark') themeClass = 'theme-dark';
                  else if (theme === 'Sepia') themeClass = 'theme-sepia';
                  else if (theme === 'Apollo') themeClass = 'theme-apollo';
                  else if (theme === 'Black') themeClass = 'theme-black';
                  else if (theme === 'System' || !theme) {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      var preferredDark = localStorage.getItem('preferredDarkThemeKey');
                      if (preferredDark) {
                        try {
                          var pd = JSON.parse(preferredDark);
                          if (pd === 'Apollo') themeClass = 'theme-apollo';
                          else if (pd === 'Black') themeClass = 'theme-black';
                          else themeClass = 'theme-dark';
                        } catch(e) { themeClass = 'theme-dark'; }
                      } else {
                        themeClass = 'theme-dark';
                      }
                    }
                  }

                  document.documentElement.classList.add(themeClass);
                  window.themeKey = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
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
        {/* Initial loader shown before React hydrates - hidden by CSS once React mounts */}
        <div className="initial-loader" aria-hidden="true">
          <div className="initial-loader-spinner" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
