import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border text-muted-foreground',
        success: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
        warning: 'bg-amber-500/14 text-amber-700 dark:text-amber-400',
        danger: 'bg-rose-500/12 text-rose-600 dark:text-rose-400',
        info: 'bg-blue-500/12 text-blue-600 dark:text-blue-400',
        violet: 'bg-violet-500/12 text-violet-600 dark:text-violet-400',
        muted: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
