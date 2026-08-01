import { forwardRef, type HTMLAttributes } from 'react'
import { CalendarDays, GripVertical } from 'lucide-react'
import { ClientAvatar } from '@/components/common/ClientAvatar'
import { useTranslation } from '@/i18n/useTranslation'
import { cn, formatCurrency, formatDate, isOverdue } from '@/lib/utils'
import type { Client, Deal } from '@/types'

interface DealCardProps extends HTMLAttributes<HTMLDivElement> {
  deal: Deal
  client?: Client
  dragging?: boolean
  overlay?: boolean
}

/** Presentational card — drag wiring lives in `DraggableDealCard`. */
export const DealCard = forwardRef<HTMLDivElement, DealCardProps>(
  ({ deal, client, dragging, overlay, className, ...props }, ref) => {
    const { t, language } = useTranslation()
    const overdue = isOverdue(deal.dueDate) && deal.stage !== 'won' && deal.stage !== 'lost'

    return (
      <div
        ref={ref}
        className={cn(
          'group touch-none rounded-md border border-border/70 bg-card p-3.5 shadow-soft transition-shadow duration-200',
          'hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          dragging && 'opacity-40',
          overlay && 'rotate-[1.5deg] shadow-lift',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-2">
          <p className="flex-1 text-sm font-medium leading-snug">{deal.title}</p>
          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <ClientAvatar
            id={client?.id ?? deal.clientId}
            name={client?.name ?? '?'}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <span className="block truncate text-xs font-medium">
              {client?.name ?? t('deals.unknownClient')}
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              {client?.company ?? '—'}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-3">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-[11px]',
              overdue ? 'font-medium text-destructive' : 'text-muted-foreground',
            )}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(deal.dueDate, language)}
          </span>
          <span className="text-sm font-semibold tabular-nums">
            {formatCurrency(deal.amount, language)}
          </span>
        </div>
      </div>
    )
  },
)
DealCard.displayName = 'DealCard'
