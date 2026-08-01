import { CheckSquare, KanbanSquare, LayoutDashboard, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TranslationKey } from '@/i18n/translations'

export interface NavItem {
  to: string
  labelKey: TranslationKey
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/clients', labelKey: 'nav.clients', icon: Users },
  { to: '/deals', labelKey: 'nav.deals', icon: KanbanSquare },
  { to: '/tasks', labelKey: 'nav.tasks', icon: CheckSquare },
]
