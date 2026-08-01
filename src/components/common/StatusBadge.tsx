import { Badge, type BadgeProps } from '@/components/ui/badge'
import { useTranslation } from '@/i18n/useTranslation'
import { priorityLabelKey, stageLabelKey, statusLabelKey } from '@/lib/constants'
import type { ClientStatus, DealStage, TaskPriority } from '@/types'

type Variant = NonNullable<BadgeProps['variant']>

const STATUS_VARIANT: Record<ClientStatus, Variant> = {
  lead: 'info',
  active: 'success',
  inactive: 'muted',
}

const STAGE_VARIANT: Record<DealStage, Variant> = {
  new: 'info',
  in_progress: 'violet',
  negotiation: 'warning',
  won: 'success',
  lost: 'danger',
}

const PRIORITY_VARIANT: Record<TaskPriority, Variant> = {
  low: 'muted',
  medium: 'warning',
  high: 'danger',
}

const PRIORITY_DOT: Record<TaskPriority, string> = {
  low: 'bg-muted-foreground/50',
  medium: 'bg-amber-500',
  high: 'bg-rose-500',
}

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const { t } = useTranslation()
  return <Badge variant={STATUS_VARIANT[status]}>{t(statusLabelKey(status))}</Badge>
}

export function DealStageBadge({ stage }: { stage: DealStage }) {
  const { t } = useTranslation()
  return <Badge variant={STAGE_VARIANT[stage]}>{t(stageLabelKey(stage))}</Badge>
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const { t } = useTranslation()
  return (
    <Badge variant={PRIORITY_VARIANT[priority]}>
      <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[priority]}`} />
      {t(priorityLabelKey(priority))}
    </Badge>
  )
}
