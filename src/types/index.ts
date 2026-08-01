export type ClientStatus = 'lead' | 'active' | 'inactive'

export interface Client {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: ClientStatus
  /** Sum of every deal ever signed with this client, in USD. */
  totalValue: number
  createdAt: string
}

export type DealStage = 'new' | 'in_progress' | 'negotiation' | 'won' | 'lost'

export interface Deal {
  id: string
  title: string
  clientId: string
  amount: number
  stage: DealStage
  /** ISO date (YYYY-MM-DD) the deal is expected to close. */
  dueDate: string
  createdAt: string
  owner: string
}

export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  /** `null` when the task is not tied to a particular client. */
  clientId: string | null
  dueDate: string
  priority: TaskPriority
  done: boolean
  createdAt: string
}

export interface RevenuePoint {
  /** ISO month, e.g. `2026-01`. */
  month: string
  revenue: number
}

/** Shape used by the client create/edit form — the store owns id/createdAt. */
export type ClientDraft = Omit<Client, 'id' | 'createdAt'>

export type SortDirection = 'asc' | 'desc'

export type ClientSortKey = 'name' | 'email' | 'company' | 'status' | 'totalValue'

export interface SortState<TKey extends string> {
  key: TKey
  direction: SortDirection
}
