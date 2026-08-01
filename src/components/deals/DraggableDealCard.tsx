import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { DealCard } from './DealCard'
import type { Client, Deal } from '@/types'

interface DraggableDealCardProps {
  deal: Deal
  client?: Client
}

export function DraggableDealCard({ deal, client }: DraggableDealCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
    data: { stage: deal.stage },
  })

  return (
    <DealCard
      ref={setNodeRef}
      deal={deal}
      client={client}
      dragging={isDragging}
      style={{ transform: CSS.Translate.toString(transform) }}
      className="cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    />
  )
}
