import { useDroppable } from '@dnd-kit/core'
import { DraggableDealCard } from './DraggableDealCard'
import { useTranslation } from '@/i18n/useTranslation'
import { STAGE_ACCENT, stageLabelKey } from '@/lib/constants'
import { cn, formatCompactCurrency } from '@/lib/utils'
import type { Client, Deal, DealStage } from '@/types'

interface StageColumnProps {
  stage: DealStage
  deals: Deal[]
  clientIndex: Map<string, Client>
}

export function StageColumn({ stage, deals, clientIndex }: StageColumnProps) {
  const { t, language } = useTranslation()
  const { setNodeRef, isOver } = useDroppable({ id: stage })

  const total = deals.reduce((sum, deal) => sum + deal.amount, 0)

  return (
    <section className="flex w-[280px] shrink-0 flex-col gap-3 sm:w-auto sm:shrink">
      <header className="flex items-center gap-2 px-1">
        <span className={cn('h-2 w-2 rounded-full', STAGE_ACCENT[stage])} />
        <h2 className="text-sm font-semibold">{t(stageLabelKey(stage))}</h2>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {deals.length}
        </span>
        <span className="ml-auto text-[11px] tabular-nums text-muted-foreground">
          {formatCompactCurrency(total, language)}
        </span>
      </header>

      <div
        ref={setNodeRef}
        className={cn(
          'flex min-h-[180px] flex-1 flex-col gap-2.5 rounded-lg border border-dashed border-transparent bg-muted/40 p-2.5 transition-colors duration-200',
          isOver && 'border-primary/50 bg-primary/5',
        )}
      >
        {deals.map((deal) => (
          <DraggableDealCard
            key={deal.id}
            deal={deal}
            client={clientIndex.get(deal.clientId)}
          />
        ))}

        {deals.length === 0 ? (
          <p className="flex flex-1 items-center justify-center px-2 py-6 text-center text-xs text-muted-foreground">
            {t('deals.emptyStage')}
          </p>
        ) : null}
      </div>
    </section>
  )
}
