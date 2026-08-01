import { NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { NAV_ITEMS } from './navigation'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  onNavigate?: () => void
}

/** Shared by the desktop rail and the mobile drawer. */
export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center gap-2.5 px-2 pt-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground shadow-soft">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="text-[15px] font-semibold tracking-tight">{t('app.name')}</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, labelKey, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      <p className="px-3 pb-1 text-xs text-muted-foreground">{t('app.tagline')}</p>
    </div>
  )
}
