import { useEffect } from 'react'
import { useTranslation } from '@/i18n/useTranslation'

export function usePageTitle(title: string): void {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${title} · ${t('app.name')}`
  }, [title, t])
}
