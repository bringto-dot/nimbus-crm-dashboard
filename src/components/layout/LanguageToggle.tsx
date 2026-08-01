import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/i18n/translations'
import { cn } from '@/lib/utils'

const LANGUAGES: { value: Language; label: string; short: string }[] = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ru', label: 'Русский', short: 'RU' },
]

export function LanguageToggle() {
  const { t, language, setLanguage } = useTranslation()
  const current = LANGUAGES.find((item) => item.value === language) ?? LANGUAGES[0]!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 px-2.5"
          aria-label={t('language.toggle')}
          title={t('language.toggle')}
        >
          <Languages />
          <span className="text-xs font-semibold">{current.short}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onSelect={() => setLanguage(item.value)}
            className={cn(item.value === language && 'text-primary')}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
