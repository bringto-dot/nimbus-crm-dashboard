import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartTooltip } from './ChartTooltip'
import { useTranslation } from '@/i18n/useTranslation'
import { formatCompactCurrency, formatCurrency, formatMonth } from '@/lib/utils'
import type { RevenuePoint } from '@/types'

interface RevenueChartProps {
  data: RevenuePoint[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const { language } = useTranslation()

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(value: string) => formatMonth(value, language)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={62}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(value: number) => formatCompactCurrency(value, language)}
        />
        <Tooltip
          cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
          content={
            <ChartTooltip
              formatter={(value) => formatCurrency(value, language)}
              labelFormatter={(label) => formatMonth(label, language)}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
