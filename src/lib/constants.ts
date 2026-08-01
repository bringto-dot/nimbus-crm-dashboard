import type { ClientStatus, DealStage, TaskPriority } from '@/types'
import type { TranslationKey } from '@/i18n/translations'

export const DEAL_STAGES: DealStage[] = [
  'new',
  'in_progress',
  'negotiation',
  'won',
  'lost',
]

/** Stages that still count as "in the pipeline". */
export const OPEN_STAGES: DealStage[] = ['new', 'in_progress', 'negotiation']

export const CLIENT_STATUSES: ClientStatus[] = ['lead', 'active', 'inactive']

export const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high']

export const stageLabelKey = (stage: DealStage): TranslationKey =>
  `stage.${stage}` as TranslationKey

export const statusLabelKey = (status: ClientStatus): TranslationKey =>
  `status.${status}` as TranslationKey

export const priorityLabelKey = (priority: TaskPriority): TranslationKey =>
  `priority.${priority}` as TranslationKey

/** Chart colours, resolved from CSS variables so both themes stay in sync. */
export const STAGE_CHART_COLORS: Record<DealStage, string> = {
  new: 'hsl(211 100% 60%)',
  in_progress: 'hsl(262 83% 65%)',
  negotiation: 'hsl(38 92% 55%)',
  won: 'hsl(142 71% 45%)',
  lost: 'hsl(0 72% 58%)',
}

export const STAGE_ACCENT: Record<DealStage, string> = {
  new: 'bg-blue-500',
  in_progress: 'bg-violet-500',
  negotiation: 'bg-amber-500',
  won: 'bg-emerald-500',
  lost: 'bg-rose-500',
}
