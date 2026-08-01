import { useMemo } from 'react'
import { useCrmStore } from './useCrmStore'
import { DEAL_STAGES, OPEN_STAGES } from '@/lib/constants'
import type { Client, Deal, DealStage } from '@/types'

export interface DashboardMetrics {
  totalClients: number
  activeClients: number
  activeDeals: number
  revenue: number
  conversionRate: number
}

export interface StageBucket {
  stage: DealStage
  count: number
  amount: number
}

/** Pure helpers, kept outside hooks so they stay easy to test. */
export function calcMetrics(clients: Client[], deals: Deal[]): DashboardMetrics {
  const won = deals.filter((deal) => deal.stage === 'won')
  const lost = deals.filter((deal) => deal.stage === 'lost')
  const closed = won.length + lost.length

  return {
    totalClients: clients.length,
    activeClients: clients.filter((client) => client.status === 'active').length,
    activeDeals: deals.filter((deal) => OPEN_STAGES.includes(deal.stage)).length,
    revenue: won.reduce((sum, deal) => sum + deal.amount, 0),
    conversionRate: closed === 0 ? 0 : (won.length / closed) * 100,
  }
}

export function groupByStage(deals: Deal[]): StageBucket[] {
  return DEAL_STAGES.map((stage) => {
    const inStage = deals.filter((deal) => deal.stage === stage)
    return {
      stage,
      count: inStage.length,
      amount: inStage.reduce((sum, deal) => sum + deal.amount, 0),
    }
  })
}

export function sortByNewest(deals: Deal[], limit?: number): Deal[] {
  const sorted = [...deals].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted
}

export function buildClientIndex(clients: Client[]): Map<string, Client> {
  return new Map(clients.map((client) => [client.id, client]))
}

/* ---------- hooks ---------- */

export function useDashboardMetrics(): DashboardMetrics {
  const clients = useCrmStore((state) => state.clients)
  const deals = useCrmStore((state) => state.deals)
  return useMemo(() => calcMetrics(clients, deals), [clients, deals])
}

export function useStageBuckets(): StageBucket[] {
  const deals = useCrmStore((state) => state.deals)
  return useMemo(() => groupByStage(deals), [deals])
}

export function useRecentDeals(limit = 5): Deal[] {
  const deals = useCrmStore((state) => state.deals)
  return useMemo(() => sortByNewest(deals, limit), [deals, limit])
}

export function useClientIndex(): Map<string, Client> {
  const clients = useCrmStore((state) => state.clients)
  return useMemo(() => buildClientIndex(clients), [clients])
}
