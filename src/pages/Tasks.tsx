import { useMemo, useState } from 'react'
import { CheckCircle2, ListTodo, Plus } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { TaskItem } from '@/components/tasks/TaskItem'
import { TaskFilterTabs, type TaskFilter } from '@/components/tasks/TaskFilterTabs'
import { TaskFormDialog } from '@/components/tasks/TaskFormDialog'
import { TaskListSkeleton } from '@/components/tasks/TaskListSkeleton'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslation } from '@/i18n/useTranslation'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useCrmStore } from '@/store/useCrmStore'
import { useClientIndex } from '@/store/selectors'
import type { Task } from '@/types'

const PRIORITY_WEIGHT: Record<Task['priority'], number> = { high: 0, medium: 1, low: 2 }

export function TasksPage() {
  const { t } = useTranslation()
  const tasks = useCrmStore((state) => state.tasks)
  const clients = useCrmStore((state) => state.clients)
  const isLoading = useCrmStore((state) => state.isLoading)
  const hasLoaded = useCrmStore((state) => state.hasLoaded)
  const addTask = useCrmStore((state) => state.addTask)
  const toggleTask = useCrmStore((state) => state.toggleTask)
  const deleteTask = useCrmStore((state) => state.deleteTask)
  const clientIndex = useClientIndex()

  const [filter, setFilter] = useState<TaskFilter>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null)

  usePageTitle(t('tasks.title'))

  const showSkeletons = isLoading || !hasLoaded
  const doneCount = tasks.filter((task) => task.done).length

  // Open tasks first, then by priority, then by due date.
  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === 'open') return !task.done
        if (filter === 'done') return task.done
        return true
      })
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1
        const byPriority = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
        if (byPriority !== 0) return byPriority
        return a.dueDate.localeCompare(b.dueDate)
      })
  }, [tasks, filter])

  const confirmDelete = () => {
    if (!pendingDelete) return
    deleteTask(pendingDelete.id)
    setPendingDelete(null)
  }

  const renderEmpty = () => {
    if (tasks.length === 0) {
      return (
        <EmptyState
          icon={ListTodo}
          title={t('tasks.emptyTitle')}
          description={t('tasks.emptyBody')}
          action={
            <Button onClick={() => setFormOpen(true)}>
              <Plus />
              {t('tasks.add')}
            </Button>
          }
        />
      )
    }

    if (filter === 'done') {
      return (
        <EmptyState
          icon={ListTodo}
          title={t('tasks.emptyDoneTitle')}
          description={t('tasks.emptyDoneBody')}
        />
      )
    }

    return (
      <EmptyState
        icon={CheckCircle2}
        title={t('tasks.emptyOpenTitle')}
        description={t('tasks.emptyOpenBody')}
      />
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tasks.title')}
        description={t('tasks.subtitle')}
        action={
          <Button onClick={() => setFormOpen(true)}>
            <Plus />
            {t('tasks.add')}
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <TaskFilterTabs value={filter} onChange={setFilter} />
        {!showSkeletons && tasks.length > 0 ? (
          <p className="text-xs text-muted-foreground">
            {t('tasks.progress', { done: doneCount, total: tasks.length })}
          </p>
        ) : null}
      </div>

      <Card className="overflow-hidden">
        {showSkeletons ? (
          <TaskListSkeleton />
        ) : visibleTasks.length === 0 ? (
          renderEmpty()
        ) : (
          <ul className="divide-y divide-border/70">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                client={task.clientId ? clientIndex.get(task.clientId) : undefined}
                onToggle={toggleTask}
                onDelete={setPendingDelete}
              />
            ))}
          </ul>
        )}
      </Card>

      <TaskFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        clients={clients}
        onSubmit={addTask}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null)
        }}
        title={t('tasks.deleteTitle')}
        description={t('tasks.deleteBody', { name: pendingDelete?.title ?? '' })}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
