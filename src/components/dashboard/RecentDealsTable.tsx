import { Inbox } from 'lucide-react'
import { DealStageBadge } from '@/components/common/StatusBadge'
import { ClientAvatar } from '@/components/common/ClientAvatar'
import { EmptyState } from '@/components/common/EmptyState'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTranslation } from '@/i18n/useTranslation'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Client, Deal } from '@/types'

interface RecentDealsTableProps {
  deals: Deal[]
  clientIndex: Map<string, Client>
}

export function RecentDealsTable({ deals, clientIndex }: RecentDealsTableProps) {
  const { t, language } = useTranslation()

  if (deals.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title={t('deals.emptyTitle')}
        description={t('deals.emptyBody')}
      />
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('deals.deal')}</TableHead>
          <TableHead className="hidden sm:table-cell">{t('deals.client')}</TableHead>
          <TableHead>{t('deals.stage')}</TableHead>
          <TableHead className="hidden md:table-cell">{t('deals.due')}</TableHead>
          <TableHead className="text-right">{t('deals.amount')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deals.map((deal) => {
          const client = clientIndex.get(deal.clientId)
          return (
            <TableRow key={deal.id}>
              <TableCell className="max-w-[220px]">
                <span className="block truncate font-medium">{deal.title}</span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground sm:hidden">
                  {client?.company ?? t('deals.unknownClient')}
                </span>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-2.5">
                  <ClientAvatar
                    id={client?.id ?? deal.id}
                    name={client?.name ?? '?'}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <span className="block truncate text-sm">
                      {client?.name ?? t('deals.unknownClient')}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {client?.company ?? '—'}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <DealStageBadge stage={deal.stage} />
              </TableCell>
              <TableCell className="hidden whitespace-nowrap text-sm text-muted-foreground md:table-cell">
                {formatDate(deal.dueDate, language)}
              </TableCell>
              <TableCell className="whitespace-nowrap text-right font-medium tabular-nums">
                {formatCurrency(deal.amount, language)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
