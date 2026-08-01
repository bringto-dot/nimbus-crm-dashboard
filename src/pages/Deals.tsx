import { KanbanSquare } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { KanbanBoard } from '@/components/deals/KanbanBoard'
import { KanbanSkeleton } from '@/components/deals/KanbanSkeleton'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n/useTranslation'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useCrmStore } from '@/store/useCrmStore'
import { useClientIndex } from '@/store/selectors'

export function DealsPage() {
  const { t } = useTranslation()
  const deals = useCrmStore((state) => state.deals)
  const isLoading = useCrmStore((state) => state.isLoading)
  const hasLoaded = useCrmStore((state) => state.hasLoaded)
  const moveDeal = useCrmStore((state) => state.moveDeal)
  const clientIndex = useClientIndex()

  usePageTitle(t('deals.title'))

  const showSkeletons = isLoading || !hasLoaded

  return (
    <div className="space-y-6">
      <PageHeader title={t('deals.title')} description={t('deals.subtitle')} />

      {showSkeletons ? (
        <KanbanSkeleton />
      ) : deals.length === 0 ? (
        <Card>
          <EmptyState
            icon={KanbanSquare}
            title={t('deals.emptyTitle')}
            description={t('deals.emptyBody')}
          />
        </Card>
      ) : (
        <KanbanBoard deals={deals} clientIndex={clientIndex} onMove={moveDeal} />
      )}
    </div>
  )
}
