import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  hint: string
  icon: LucideIcon
  tone?: 'blue' | 'violet' | 'emerald' | 'amber'
}

const TONES: Record<NonNullable<StatCardProps['tone']>, string> = {
  blue: 'bg-blue-500/12 text-blue-600 dark:text-blue-400',
  violet: 'bg-violet-500/12 text-violet-600 dark:text-violet-400',
  emerald: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-500/14 text-amber-600 dark:text-amber-400',
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'blue' }: StatCardProps) {
  return (
    <Card className="p-5 transition-shadow duration-200 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            TONES[tone],
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-3 text-[26px] font-semibold leading-tight tracking-tight">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </Card>
  )
}

export function StatCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-7 w-28" />
      <Skeleton className="mt-2 h-3 w-20" />
    </Card>
  )
}
