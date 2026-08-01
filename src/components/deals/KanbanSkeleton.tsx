import { Skeleton } from '@/components/ui/skeleton'
import { DEAL_STAGES } from '@/lib/constants'

const CARDS_PER_COLUMN = [3, 3, 2, 2, 1]

export function KanbanSkeleton() {
  return (
    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-5">
      {DEAL_STAGES.map((stage, columnIndex) => (
        <div key={stage} className="flex w-[280px] shrink-0 flex-col gap-3 sm:w-auto">
          <div className="flex items-center gap-2 px-1">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-col gap-2.5 rounded-lg bg-muted/40 p-2.5">
            {Array.from({ length: CARDS_PER_COLUMN[columnIndex] ?? 2 }).map((_, index) => (
              <Skeleton key={index} className="h-[124px] w-full rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
