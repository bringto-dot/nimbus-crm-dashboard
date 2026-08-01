import { useState } from 'react'
import { Plus, SearchX, Users } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { TableSkeleton } from '@/components/common/TableSkeleton'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ClientsToolbar } from '@/components/clients/ClientsToolbar'
import { ClientsTable } from '@/components/clients/ClientsTable'
import { ClientFormDialog } from '@/components/clients/ClientFormDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n/useTranslation'
import { useClientFilters } from '@/hooks/useClientFilters'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useCrmStore } from '@/store/useCrmStore'
import type { Client, ClientDraft } from '@/types'

export function ClientsPage() {
  const { t } = useTranslation()
  const clients = useCrmStore((state) => state.clients)
  const isLoading = useCrmStore((state) => state.isLoading)
  const hasLoaded = useCrmStore((state) => state.hasLoaded)
  const addClient = useCrmStore((state) => state.addClient)
  const updateClient = useCrmStore((state) => state.updateClient)
  const deleteClient = useCrmStore((state) => state.deleteClient)

  const filters = useClientFilters(clients)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Client | null>(null)

  usePageTitle(t('clients.title'))

  const showSkeletons = isLoading || !hasLoaded

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (client: Client) => {
    setEditing(client)
    setFormOpen(true)
  }

  const handleSubmit = (draft: ClientDraft) => {
    if (editing) {
      updateClient(editing.id, draft)
    } else {
      addClient(draft)
    }
  }

  const confirmDelete = () => {
    if (!pendingDelete) return
    deleteClient(pendingDelete.id)
    setPendingDelete(null)
  }

  const renderBody = () => {
    if (showSkeletons) return <TableSkeleton columns={6} rows={6} />

    if (clients.length === 0) {
      return (
        <EmptyState
          icon={Users}
          title={t('clients.emptyTitle')}
          description={t('clients.emptyBody')}
          action={
            <Button onClick={openCreate}>
              <Plus />
              {t('clients.add')}
            </Button>
          }
        />
      )
    }

    if (filters.visibleClients.length === 0) {
      return (
        <EmptyState
          icon={SearchX}
          title={t('clients.noResultsTitle')}
          description={t('clients.noResultsBody')}
          action={
            <Button variant="outline" onClick={filters.reset}>
              {t('common.reset')}
            </Button>
          }
        />
      )
    }

    return (
      <ClientsTable
        clients={filters.visibleClients}
        sortKey={filters.sortKey}
        sortDirection={filters.sortDirection}
        onSort={filters.toggleSort}
        onEdit={openEdit}
        onDelete={setPendingDelete}
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('clients.title')}
        description={t('clients.subtitle')}
        action={
          <Button onClick={openCreate}>
            <Plus />
            {t('clients.add')}
          </Button>
        }
      />

      <ClientsToolbar
        search={filters.search}
        onSearchChange={filters.setSearch}
        status={filters.status}
        onStatusChange={filters.setStatus}
      />

      <Card className="overflow-hidden">{renderBody()}</Card>

      {!showSkeletons && filters.visibleClients.length > 0 ? (
        <p className="text-xs text-muted-foreground">
          {t('common.showing')} {filters.visibleClients.length} {t('common.of')}{' '}
          {clients.length} {t('common.results')}
        </p>
      ) : null}

      <ClientFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        client={editing}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null)
        }}
        title={t('clients.deleteTitle')}
        description={t('clients.deleteBody', { name: pendingDelete?.name ?? '' })}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
