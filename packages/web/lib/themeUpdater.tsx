import {
  ThemeId,
  darkTheme,
  sepiaTheme,
  apolloTheme,
  blackTheme,
  theme,
} from '../components/tokens/stitches.config'

const themeKey = 'theme'
const preferredDarkThemeKey = 'preferredDarkThemeKey'
const preferredLightThemeKey = 'preferredLightThemeKey'

// Map legacy theme names to their new equivelents
const LEGACY_THEMES: { [string: string]: string } = {
  White: ThemeId.Light,
  LightGray: ThemeId.Light,
  Gray: ThemeId.Dark,
  Darker: ThemeId.Dark,
}

export function updateTheme(themeId: string): void {
  if (typeof window === 'undefined') {
    return
  }

  updateThemeLocally(themeId)
}

const visibleThemeId = (themeId: string) => {
  if (themeId == ThemeId.System) {
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        try {
          const preferred = window.localStorage.getItem(preferredDarkThemeKey)
          if (preferred) {
            return JSON.parse(preferred)
          }
        } catch {}
        return ThemeId.Dark
      } else {
        try {
          const preferred = window.localStorage.getItem(preferredLightThemeKey)
          if (preferred) {
            return JSON.parse(preferred)
          }
        } catch {}
        return ThemeId.Light
      }
    }
    return ThemeId.Light
  } else {
    return themeId
  }
}

export function getTheme(themeId: string) {
  const themeToUse = visibleThemeId(themeId)
  switch (themeToUse) {
    case ThemeId.Dark:
      return darkTheme
    case ThemeId.Sepia:
      return sepiaTheme
    case ThemeId.Apollo:
      return apolloTheme
    case ThemeId.Black:
      return blackTheme
  }
  return theme
}

export function updateThemeLocally(themeId: string): void {
  // Note: localStorage is now managed by usePersistedState in useCurrentTheme.tsx
  // This function only updates DOM classes

  // Remove stitches theme classes
  document.documentElement.classList.remove(
    ...Object.keys(LEGACY_THEMES),
    sepiaTheme,
    darkTheme,
    apolloTheme,
    blackTheme,
    ...Object.keys(ThemeId)
  )

  // Remove CSS theme classes used by layout.tsx
  document.documentElement.classList.remove(
    'theme-light',
    'theme-dark',
    'theme-sepia',
    'theme-apollo',
    'theme-black'
  )

  // Add stitches theme class
  document.documentElement.classList.add(getTheme(themeId))

  // Add CSS theme class for layout.tsx styles
  const visibleTheme = visibleThemeId(themeId)
  const cssThemeClass = `theme-${visibleTheme.toLowerCase()}`
  document.documentElement.classList.add(cssThemeClass)
}

export function currentThemeName(): string {
  switch (getCurrentLocalTheme()) {
    case ThemeId.Light:
      return 'Light'
    case ThemeId.Dark:
      return 'Dark'
    case ThemeId.Sepia:
      return 'Sepia'
    case ThemeId.Apollo:
      return 'Apollo'
    case ThemeId.Black:
      return 'Black'
  }
  return 'Light'
}

export function getCurrentLocalTheme(): ThemeId | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  let str = window.localStorage.getItem(themeKey)

  // Handle JSON-encoded values from usePersistedState
  if (str) {
    try {
      const parsed = JSON.parse(str)
      if (typeof parsed === 'string') {
        str = parsed
      }
    } catch {
      // Value is not JSON-encoded, use as-is
    }
  }

  if (str && Object.values(ThemeId).includes(str as ThemeId)) {
    return str as ThemeId
  }

  if (str && Object.keys(LEGACY_THEMES).includes(str)) {
    return LEGACY_THEMES[str] as ThemeId
  }

  return ThemeId.Light
}

export function applyStoredTheme(): ThemeId | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  // Always read from localStorage as source of truth
  // Note: window.themeKey is only set on initial page load and never updated
  let theme = window.localStorage.getItem(themeKey) as string | undefined

  // Handle JSON-encoded values from usePersistedState
  if (theme) {
    try {
      const parsed = JSON.parse(theme)
      if (typeof parsed === 'string') {
        theme = parsed
      }
    } catch {
      // Value is not JSON-encoded, use as-is
    }
  }

  if (theme && Object.values(ThemeId).includes(theme as ThemeId)) {
    updateThemeLocally(theme)
    return theme as ThemeId
  }
  return undefined
}

export function isDarkTheme(): boolean {
  const currentTheme = currentThemeName()
  return (
    currentTheme === 'Dark' ||
    currentTheme === 'Darker' ||
    currentTheme === 'Apollo' ||
    currentTheme == 'Black'
  )
}

export const highlightColors = ['yellow', 'red', 'green', 'blue']

export const highlightColor = (name: string | undefined) => {
  switch (name) {
    case 'green':
      return '#55C689'
    case 'blue':
      return '#6AB1FF'
    case 'yellow':
      return '#FFD234'
    case 'orange':
      return '#FEB56D'
    case 'red':
      return '#FB9A9A'
  }
  return '#FFD234'
}

export const highlightColorVar = (name: string | undefined) => {
  switch (name) {
    case 'green':
      return 'var(--colors-highlight_background_green)'
    case 'blue':
      return 'var(--colors-highlight_background_blue)'
    case 'yellow':
      return 'var(--colors-highlight_background_yellow)'
    case 'orange':
      return 'var(--colors-highlight_background_orange)'
    case 'red':
      return 'var(--colors-highlight_background_red)'
  }
  return 'var(--colors-highlightBackground)'
}
