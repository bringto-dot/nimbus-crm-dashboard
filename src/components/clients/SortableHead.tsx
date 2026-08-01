import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import { TableHead } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { SortDirection } from '@/types'

interface SortableHeadProps<TKey extends string> {
  sortKey: TKey
  activeKey: TKey
  direction: SortDirection
  onSort: (key: TKey) => void
  label: string
  className?: string
  align?: 'left' | 'right'
}

export function SortableHead<TKey extends string>({
  sortKey,
  activeKey,
  direction,
  onSort,
  label,
  className,
  align = 'left',
}: SortableHeadProps<TKey>) {
  const isActive = sortKey === activeKey
  const Icon = !isActive ? ChevronsUpDown : direction === 'asc' ? ArrowUp : ArrowDown

  return (
    <TableHead
      className={className}
      aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isActive && 'text-foreground',
          align === 'right' && 'flex-row-reverse',
        )}
      >
        {label}
        <Icon className={cn('h-3.5 w-3.5', !isActive && 'opacity-50')} />
      </button>
    </TableHead>
  )
}
