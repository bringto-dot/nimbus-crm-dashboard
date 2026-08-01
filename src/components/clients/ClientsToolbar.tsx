import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n/useTranslation'
import { CLIENT_STATUSES, statusLabelKey } from '@/lib/constants'
import type { ClientStatus } from '@/types'

export type StatusFilter = ClientStatus | 'all'

interface ClientsToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
}

export function ClientsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: ClientsToolbarProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={t('clients.searchPlaceholder')}
          aria-label={t('common.search')}
          className="pl-9 pr-9"
        />
        {search ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => onSearchChange('')}
            aria-label={t('common.close')}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        ) : null}
      </div>

      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as StatusFilter)}
      >
        <SelectTrigger className="sm:w-48" aria-label={t('clients.filterStatus')}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('clients.allStatuses')}</SelectItem>
          {CLIENT_STATUSES.map((item) => (
            <SelectItem key={item} value={item}>
              {t(statusLabelKey(item))}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
