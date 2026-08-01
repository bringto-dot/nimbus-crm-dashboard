import { create } from 'zustand'
import clientsSeed from '@/data/clients.json'
import dealsSeed from '@/data/deals.json'
import tasksSeed from '@/data/tasks.json'
import revenueSeed from '@/data/revenue.json'
import type {
  Client,
  ClientDraft,
  Deal,
  DealStage,
  RevenuePoint,
  Task,
} from '@/types'
import { createId, sleep, todayIso } from '@/lib/utils'

interface CrmState {
  clients: Client[]
  deals: Deal[]
  tasks: Task[]
  revenue: RevenuePoint[]
  isLoading: boolean
  hasLoaded: boolean

  loadData: () => Promise<void>

  addClient: (draft: ClientDraft) => void
  updateClient: (id: string, draft: ClientDraft) => void
  /** Removes the client along with every deal and task attached to it. */
  deleteClient: (id: string) => void

  moveDeal: (id: string, stage: DealStage) => void

  addTask: (draft: Omit<Task, 'id' | 'createdAt' | 'done'>) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export const useCrmStore = create<CrmState>()((set) => ({
  clients: [],
  deals: [],
  tasks: [],
  revenue: [],
  isLoading: false,
  hasLoaded: false,

  loadData: async () => {
    set({ isLoading: true })
    // Stand-in for a network round trip so skeletons are actually exercised.
    await sleep(700)
    set({
      clients: clientsSeed as Client[],
      deals: dealsSeed as Deal[],
      tasks: tasksSeed as Task[],
      revenue: revenueSeed as RevenuePoint[],
      isLoading: false,
      hasLoaded: true,
    })
  },

  addClient: (draft) =>
    set((state) => ({
      clients: [
        { ...draft, id: createId('c'), createdAt: todayIso() },
        ...state.clients,
      ],
    })),

  updateClient: (id, draft) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...draft } : client,
      ),
    })),

  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
      deals: state.deals.filter((deal) => deal.clientId !== id),
      tasks: state.tasks.filter((task) => task.clientId !== id),
    })),

  moveDeal: (id, stage) =>
    set((state) => ({
      deals: state.deals.map((deal) => (deal.id === id ? { ...deal, stage } : deal)),
    })),

  addTask: (draft) =>
    set((state) => ({
      tasks: [
        { ...draft, id: createId('t'), done: false, createdAt: todayIso() },
        ...state.tasks,
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}))
