import { avatarTone, cn, initials } from '@/lib/utils'

interface ClientAvatarProps {
  id: string
  name: string
  size?: 'sm' | 'md'
  className?: string
}

export function ClientAvatar({ id, name, size = 'md', className }: ClientAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        size === 'sm' ? 'h-7 w-7 text-[11px]' : 'h-9 w-9 text-xs',
        avatarTone(id),
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
