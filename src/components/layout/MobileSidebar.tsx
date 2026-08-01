import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import { useTranslation } from '@/i18n/useTranslation'

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Burger drawer for viewports below `lg`. */
export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const { t } = useTranslation()

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:hidden" />
        <DialogPrimitive.Content
          className="fixed inset-y-0 left-0 z-50 w-[17rem] max-w-[85vw] border-r border-border/70 bg-card shadow-lift duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left lg:hidden"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            {t('nav.menu')}
          </DialogPrimitive.Title>
          <DialogPrimitive.Close className="absolute right-3 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent">
            <X className="h-4 w-4" />
            <span className="sr-only">{t('common.close')}</span>
          </DialogPrimitive.Close>
          <SidebarNav onNavigate={() => onOpenChange(false)} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
