import { useEffect } from 'react'
import { usePreferencesStore } from '@/store/usePreferencesStore'

/** Keeps `<html class="dark">` and `<html lang>` in sync with the store. */
export function useThemeEffect(): void {
  const theme = usePreferencesStore((state) => state.theme)
  const language = usePreferencesStore((state) => state.language)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
}
