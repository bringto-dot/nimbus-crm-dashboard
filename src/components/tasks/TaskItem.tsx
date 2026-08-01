import { CalendarDays, Trash2, User2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { PriorityBadge } from '@/components/common/StatusBadge'
import { useTranslation } from '@/i18n/useTranslation'
import { cn, formatDate, isOverdue } from '@/lib/utils'
import type { Client, Task } from '@/types'

interface TaskItemProps {
  task: Task
  client?: Client
  onToggle: (id: string) => void
  onDelete: (task: Task) => void
}

export function TaskItem({ task, client, onToggle, onDelete }: TaskItemProps) {
  const { t, language } = useTranslation()
  const overdue = !task.done && isOverdue(task.dueDate)

  return (
    <li className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:px-5">
      <Checkbox
        id={task.id}
        checked={task.done}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-0.5"
      />

      <div className="min-w-0 flex-1">
        <label
          htmlFor={task.id}
          className={cn(
            'block cursor-pointer text-sm font-medium transition-colors',
            task.done && 'text-muted-foreground line-through',
          )}
        >
          {task.title}
        </label>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-xs',
              overdue ? 'font-medium text-destructive' : 'text-muted-foreground',
            )}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(task.dueDate, language)}
          </span>

          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <User2 className="h-3.5 w-3.5" />
            <span className="truncate">{client?.name ?? t('tasks.noClient')}</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <PriorityBadge priority={task.priority} />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(task)}
          aria-label={t('common.delete')}
        >
          <Trash2 />
        </Button>
      </div>
    </li>
  )
}
