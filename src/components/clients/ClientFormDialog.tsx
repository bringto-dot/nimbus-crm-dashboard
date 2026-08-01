import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n/useTranslation'
import { CLIENT_STATUSES, statusLabelKey } from '@/lib/constants'
import type { Client, ClientDraft, ClientStatus } from '@/types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_DRAFT: ClientDraft = {
  name: '',
  email: '',
  company: '',
  phone: '',
  status: 'lead',
  totalValue: 0,
}

type Errors = Partial<Record<'name' | 'email' | 'company' | 'totalValue', string>>

interface ClientFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** `null` puts the dialog in "create" mode. */
  client: Client | null
  onSubmit: (draft: ClientDraft) => void
}

export function ClientFormDialog({
  open,
  onOpenChange,
  client,
  onSubmit,
}: ClientFormDialogProps) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState<ClientDraft>(EMPTY_DRAFT)
  const [errors, setErrors] = useState<Errors>({})

  // Re-seed the form each time the dialog opens for a different record.
  useEffect(() => {
    if (!open) return
    setErrors({})
    setDraft(
      client
        ? {
            name: client.name,
            email: client.email,
            company: client.company,
            phone: client.phone,
            status: client.status,
            totalValue: client.totalValue,
          }
        : EMPTY_DRAFT,
    )
  }, [open, client])

  const update = <TKey extends keyof ClientDraft>(key: TKey, value: ClientDraft[TKey]) =>
    setDraft((previous) => ({ ...previous, [key]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Errors = {}
    if (!draft.name.trim()) nextErrors.name = t('clients.errorName')
    if (!EMAIL_PATTERN.test(draft.email)) nextErrors.email = t('clients.errorEmail')
    if (!draft.company.trim()) nextErrors.company = t('clients.errorCompany')
    if (draft.totalValue < 0) nextErrors.totalValue = t('clients.errorValue')

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      ...draft,
      name: draft.name.trim(),
      email: draft.email.trim(),
      company: draft.company.trim(),
      phone: draft.phone.trim(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {client ? t('clients.editTitle') : t('clients.new')}
          </DialogTitle>
          <DialogDescription>
            {client ? t('clients.editDescription') : t('clients.newDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client-name">{t('clients.name')}</Label>
            <Input
              id="client-name"
              value={draft.name}
              onChange={(event) => update('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              autoFocus
            />
            {errors.name ? (
              <p className="text-xs text-destructive">{errors.name}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client-email">{t('clients.email')}</Label>
              <Input
                id="client-email"
                type="email"
                value={draft.email}
                onChange={(event) => update('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="text-xs text-destructive">{errors.email}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-phone">
                {t('clients.phone')}{' '}
                <span className="font-normal text-muted-foreground">
                  ({t('common.optional')})
                </span>
              </Label>
              <Input
                id="client-phone"
                type="tel"
                value={draft.phone}
                onChange={(event) => update('phone', event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-company">{t('clients.company')}</Label>
            <Input
              id="client-company"
              value={draft.company}
              onChange={(event) => update('company', event.target.value)}
              aria-invalid={Boolean(errors.company)}
            />
            {errors.company ? (
              <p className="text-xs text-destructive">{errors.company}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client-status">{t('clients.status')}</Label>
              <Select
                value={draft.status}
                onValueChange={(value) => update('status', value as ClientStatus)}
              >
                <SelectTrigger id="client-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLIENT_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t(statusLabelKey(status))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-value">{t('clients.totalValue')}</Label>
              <Input
                id="client-value"
                type="number"
                min={0}
                step={100}
                value={draft.totalValue}
                onChange={(event) => update('totalValue', Number(event.target.value))}
                aria-invalid={Boolean(errors.totalValue)}
              />
              {errors.totalValue ? (
                <p className="text-xs text-destructive">{errors.totalValue}</p>
              ) : null}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {client ? t('common.save') : t('common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
