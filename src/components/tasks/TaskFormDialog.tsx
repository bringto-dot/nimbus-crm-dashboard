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
import { TASK_PRIORITIES, priorityLabelKey } from '@/lib/constants'
import { todayIso } from '@/lib/utils'
import type { Client, Task, TaskPriority } from '@/types'

const NO_CLIENT = '__none__'

type TaskDraft = Omit<Task, 'id' | 'createdAt' | 'done'>

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  clients: Client[]
  onSubmit: (draft: TaskDraft) => void
}

export function TaskFormDialog({
  open,
  onOpenChange,
  clients,
  onSubmit,
}: TaskFormDialogProps) {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [clientId, setClientId] = useState<string>(NO_CLIENT)
  const [dueDate, setDueDate] = useState(todayIso())
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({})

  useEffect(() => {
    if (!open) return
    setTitle('')
    setClientId(NO_CLIENT)
    setDueDate(todayIso())
    setPriority('medium')
    setErrors({})
  }, [open])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: { title?: string; dueDate?: string } = {}
    if (!title.trim()) nextErrors.title = t('tasks.errorTitle')
    if (!dueDate) nextErrors.dueDate = t('tasks.errorDueDate')

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      title: title.trim(),
      clientId: clientId === NO_CLIENT ? null : clientId,
      dueDate,
      priority,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('tasks.new')}</DialogTitle>
          <DialogDescription>{t('tasks.newDescription')}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">{t('tasks.name')}</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t('tasks.namePlaceholder')}
              aria-invalid={Boolean(errors.title)}
              autoFocus
            />
            {errors.title ? (
              <p className="text-xs text-destructive">{errors.title}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-client">{t('tasks.client')}</Label>
            <Select value={clientId} onValueChange={setClientId}>
              <SelectTrigger id="task-client">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_CLIENT}>{t('tasks.noClient')}</SelectItem>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} · {client.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="task-due">{t('tasks.dueDate')}</Label>
              <Input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                aria-invalid={Boolean(errors.dueDate)}
              />
              {errors.dueDate ? (
                <p className="text-xs text-destructive">{errors.dueDate}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">{t('tasks.priority')}</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as TaskPriority)}
              >
                <SelectTrigger id="task-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {t(priorityLabelKey(item))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">{t('common.create')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
