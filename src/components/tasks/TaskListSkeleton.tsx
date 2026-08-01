import { Skeleton } from '@/components/ui/skeleton'

export function TaskListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <ul className="divide-y divide-border/70">
      {Array.from({ length: rows }).map((_, index) => (
        <li key={index} className="flex items-center gap-3 px-4 py-4 sm:px-5">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3 max-w-[280px]" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </li>
      ))}
    </ul>
  )
}
