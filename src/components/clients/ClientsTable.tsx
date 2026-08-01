import { ClientAvatar } from '@/components/common/ClientAvatar'
import { ClientStatusBadge } from '@/components/common/StatusBadge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SortableHead } from './SortableHead'
import { ClientRowActions } from './ClientRowActions'
import { useTranslation } from '@/i18n/useTranslation'
import { formatCurrency } from '@/lib/utils'
import type { Client, ClientSortKey, SortDirection } from '@/types'

interface ClientsTableProps {
  clients: Client[]
  sortKey: ClientSortKey
  sortDirection: SortDirection
  onSort: (key: ClientSortKey) => void
  onEdit: (client: Client) => void
  onDelete: (client: Client) => void
}

export function ClientsTable({
  clients,
  sortKey,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}: ClientsTableProps) {
  const { t, language } = useTranslation()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHead
            sortKey="name"
            activeKey={sortKey}
            direction={sortDirection}
            onSort={onSort}
            label={t('clients.name')}
          />
          <SortableHead
            sortKey="email"
            activeKey={sortKey}
            direction={sortDirection}
            onSort={onSort}
            label={t('clients.email')}
            className="hidden md:table-cell"
          />
          <SortableHead
            sortKey="company"
            activeKey={sortKey}
            direction={sortDirection}
            onSort={onSort}
            label={t('clients.company')}
            className="hidden sm:table-cell"
          />
          <SortableHead
            sortKey="status"
            activeKey={sortKey}
            direction={sortDirection}
            onSort={onSort}
            label={t('clients.status')}
          />
          <SortableHead
            sortKey="totalValue"
            activeKey={sortKey}
            direction={sortDirection}
            onSort={onSort}
            label={t('clients.totalValue')}
            className="text-right"
            align="right"
          />
          <TableHead className="w-12 text-right">
            <span className="sr-only">{t('common.actions')}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="max-w-[150px] sm:max-w-[220px]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <ClientAvatar id={client.id} name={client.name} size="sm" />
                <div className="min-w-0">
                  <span className="block truncate font-medium">{client.name}</span>
                  <span className="block truncate text-xs text-muted-foreground sm:hidden">
                    {client.company}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden max-w-[220px] md:table-cell">
              <a
                href={`mailto:${client.email}`}
                className="block truncate text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {client.email}
              </a>
            </TableCell>
            <TableCell className="hidden max-w-[180px] sm:table-cell">
              <span className="block truncate text-sm">{client.company}</span>
            </TableCell>
            <TableCell>
              <ClientStatusBadge status={client.status} />
            </TableCell>
            <TableCell className="whitespace-nowrap text-right font-medium tabular-nums">
              {formatCurrency(client.totalValue, language)}
            </TableCell>
            <TableCell className="text-right">
              <ClientRowActions
                onEdit={() => onEdit(client)}
                onDelete={() => onDelete(client)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
