import { useMemo, useState } from 'react'
import type { StatusFilter } from '@/components/clients/ClientsToolbar'
import type { Client, ClientSortKey, SortDirection } from '@/types'

interface UseClientFilters {
  search: string
  setSearch: (value: string) => void
  status: StatusFilter
  setStatus: (value: StatusFilter) => void
  sortKey: ClientSortKey
  sortDirection: SortDirection
  toggleSort: (key: ClientSortKey) => void
  visibleClients: Client[]
  isFiltered: boolean
  reset: () => void
}

const STATUS_ORDER: Record<Client['status'], number> = {
  lead: 0,
  active: 1,
  inactive: 2,
}

function compare(a: Client, b: Client, key: ClientSortKey): number {
  if (key === 'totalValue') return a.totalValue - b.totalValue
  if (key === 'status') return STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
  return a[key].localeCompare(b[key])
}

/** Search + status filter + column sorting for the clients table. */
export function useClientFilters(clients: Client[]): UseClientFilters {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [sortKey, setSortKey] = useState<ClientSortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const toggleSort = (key: ClientSortKey) => {
    if (key === sortKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection(key === 'totalValue' ? 'desc' : 'asc')
  }

  const visibleClients = useMemo(() => {
    const query = search.trim().toLowerCase()

    return clients
      .filter((client) => (status === 'all' ? true : client.status === status))
      .filter((client) => (query ? client.name.toLowerCase().includes(query) : true))
      .sort((a, b) => {
        const result = compare(a, b, sortKey)
        return sortDirection === 'asc' ? result : -result
      })
  }, [clients, search, status, sortKey, sortDirection])

  const reset = () => {
    setSearch('')
    setStatus('all')
  }

  return {
    search,
    setSearch,
    status,
    setStatus,
    sortKey,
    sortDirection,
    toggleSort,
    visibleClients,
    isFiltered: search.trim().length > 0 || status !== 'all',
    reset,
  }
}
