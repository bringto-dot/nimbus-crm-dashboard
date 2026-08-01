import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

export type TaskFilter = 'all' | 'open' | 'done'

const FILTERS: { value: TaskFilter; labelKey: 'tasks.filterAll' | 'tasks.filterOpen' | 'tasks.filterDone' }[] = [
  { value: 'all', labelKey: 'tasks.filterAll' },
  { value: 'open', labelKey: 'tasks.filterOpen' },
  { value: 'done', labelKey: 'tasks.filterDone' },
]

interface TaskFilterTabsProps {
  value: TaskFilter
  onChange: (value: TaskFilter) => void
}

export function TaskFilterTabs({ value, onChange }: TaskFilterTabsProps) {
  const { t } = useTranslation()

  return (
    <div
      role="tablist"
      aria-label={t('tasks.title')}
      className="inline-flex rounded-full bg-muted p-1"
    >
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          role="tab"
          type="button"
          aria-selected={value === filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            value === filter.value
              ? 'bg-card text-foreground shadow-soft'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t(filter.labelKey)}
        </button>
      ))}
    </div>
  )
}
