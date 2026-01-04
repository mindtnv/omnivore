import { useEffect } from 'react'
import { applyStoredTheme } from '../themeUpdater'
import { useDarkModeListener } from './useDarkModeListener'

export function useApplyLocalTheme() {
  const isDark = useDarkModeListener()

  // Apply theme on mount and when dark mode preference changes
  // This ensures Stitches theme class is applied when navigating between pages
  useEffect(() => {
    applyStoredTheme()
  }, []) // Empty dependency - apply on every mount

  // Re-apply theme when system dark mode preference changes
  useEffect(() => {
    applyStoredTheme()
  }, [isDark])
}
