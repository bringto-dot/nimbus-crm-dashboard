import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { DealCard } from './DealCard'
import { StageColumn } from './StageColumn'
import { DEAL_STAGES } from '@/lib/constants'
import type { Client, Deal, DealStage } from '@/types'

interface KanbanBoardProps {
  deals: Deal[]
  clientIndex: Map<string, Client>
  onMove: (dealId: string, stage: DealStage) => void
}

/**
 * Hoisted so the sensor descriptors keep a stable identity across renders —
 * inline option objects make dnd-kit rebuild its sensors mid-drag and abort it.
 */
const POINTER_OPTIONS = { activationConstraint: { distance: 6 } }
// Touch needs a short press before dragging, otherwise the board cannot scroll.
const TOUCH_OPTIONS = { activationConstraint: { delay: 180, tolerance: 8 } }
const DROP_ANIMATION = { duration: 180, easing: 'cubic-bezier(0.2, 0, 0, 1)' }

export function KanbanBoard({ deals, clientIndex, onMove }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, POINTER_OPTIONS),
    useSensor(TouchSensor, TOUCH_OPTIONS),
    useSensor(KeyboardSensor),
  )

  const dealsByStage = useMemo(() => {
    const map = new Map<DealStage, Deal[]>(DEAL_STAGES.map((stage) => [stage, []]))
    for (const deal of deals) {
      map.get(deal.stage)?.push(deal)
    }
    return map
  }, [deals])

  const activeDeal = activeId ? deals.find((deal) => deal.id === activeId) : undefined

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over) return

    const targetStage = over.id as DealStage
    if (!DEAL_STAGES.includes(targetStage)) return

    const dealId = String(active.id)
    const current = deals.find((deal) => deal.id === dealId)
    if (!current || current.stage === targetStage) return

    onMove(dealId, targetStage)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-5">
        {DEAL_STAGES.map((stage) => (
          <StageColumn
            key={stage}
            stage={stage}
            deals={dealsByStage.get(stage) ?? []}
            clientIndex={clientIndex}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={DROP_ANIMATION}>
        {activeDeal ? (
          <DealCard
            deal={activeDeal}
            client={clientIndex.get(activeDeal.clientId)}
            overlay
            className="w-[260px]"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
