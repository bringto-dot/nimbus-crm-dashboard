import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartTooltip } from './ChartTooltip'
import { useTranslation } from '@/i18n/useTranslation'
import { STAGE_CHART_COLORS, stageLabelKey } from '@/lib/constants'
import type { StageBucket } from '@/store/selectors'

interface StageChartProps {
  data: StageBucket[]
}

export function StageChart({ data }: StageChartProps) {
  const { t } = useTranslation()

  const chartData = data.map((bucket) => ({
    ...bucket,
    label: t(stageLabelKey(bucket.stage)),
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          interval={0}
          tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          width={44}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))', radius: 8 }}
          content={
            <ChartTooltip
              formatter={(value) =>
                value === 1 ? t('deals.count_one', { count: value }) : t('deals.count_other', { count: value })
              }
            />
          }
        />
        <Bar dataKey="count" radius={[8, 8, 4, 4]} maxBarSize={56}>
          {chartData.map((bucket) => (
            <Cell key={bucket.stage} fill={STAGE_CHART_COLORS[bucket.stage]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
