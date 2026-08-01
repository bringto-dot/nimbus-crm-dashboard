import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/common/EmptyState'
import { useTranslation } from '@/i18n/useTranslation'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <EmptyState
        icon={Compass}
        title={t('notFound.title')}
        description={t('notFound.body')}
        action={
          <Button asChild>
            <Link to="/dashboard">{t('notFound.action')}</Link>
          </Button>
        }
      />
    </div>
  )
}
