import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { UserMenu } from './UserMenu'
import { useTranslation } from '@/i18n/useTranslation'

interface HeaderProps {
  onOpenMenu: () => void
}

export function Header({ onOpenMenu }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/70 glass px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMenu}
        aria-label={t('nav.menu')}
      >
        <Menu />
      </Button>

      <span className="text-sm font-semibold tracking-tight lg:hidden">
        {t('app.name')}
      </span>

      <div className="ml-auto flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
