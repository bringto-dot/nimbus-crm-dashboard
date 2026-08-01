interface ChartTooltipProps {
  active?: boolean
  label?: string
  /** Recharts passes an untyped payload array; we only need name + value. */
  payload?: { value?: number | string }[]
  formatter: (value: number) => string
  labelFormatter?: (label: string) => string
}

export function ChartTooltip({
  active,
  label,
  payload,
  formatter,
  labelFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const raw = payload[0]?.value
  const value = typeof raw === 'number' ? raw : Number(raw ?? 0)

  return (
    <div className="rounded-md border border-border/70 bg-popover px-3 py-2 shadow-lift">
      <p className="text-xs text-muted-foreground">
        {labelFormatter && label ? labelFormatter(label) : label}
      </p>
      <p className="text-sm font-semibold text-foreground">{formatter(value)}</p>
    </div>
  )
}
