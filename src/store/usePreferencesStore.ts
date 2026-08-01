import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language } from '@/i18n/translations'

export type Theme = 'light' | 'dark'

interface PreferencesState {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setLanguage: (language: Language) => void
}

function systemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      theme: systemTheme(),
      language: 'en',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'crm-preferences' },
  ),
)
