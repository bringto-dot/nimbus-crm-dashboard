import { useCallback } from 'react'
import { usePreferencesStore } from '@/store/usePreferencesStore'
import { dictionaries, type Language, type TranslationKey } from './translations'

type Params = Record<string, string | number>

export interface Translator {
  t: (key: TranslationKey, params?: Params) => string
  language: Language
  setLanguage: (language: Language) => void
}

/** Tiny i18n layer — dictionary lookup plus `{placeholder}` interpolation. */
export function useTranslation(): Translator {
  const language = usePreferencesStore((state) => state.language)
  const setLanguage = usePreferencesStore((state) => state.setLanguage)

  const t = useCallback(
    (key: TranslationKey, params?: Params) => {
      const template = dictionaries[language][key] ?? key
      if (!params) return template
      return Object.entries(params).reduce(
        (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
        template,
      )
    },
    [language],
  )

  return { t, language, setLanguage }
}
