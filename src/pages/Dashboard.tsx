import { Link } from 'react-router-dom'
import { ArrowUpRight, BarChart3, Target, TrendingUp, Users } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { TableSkeleton } from '@/components/common/TableSkeleton'
import { StatCard, StatCardSkeleton } from '@/components/dashboard/StatCard'
import { ChartCard, ChartCardSkeleton } from '@/components/dashboard/ChartCard'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { StageChart } from '@/components/dashboard/StageChart'
import { RecentDealsTable } from '@/components/dashboard/RecentDealsTable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/useTranslation'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { useCrmStore } from '@/store/useCrmStore'
import {
  useClientIndex,
  useDashboardMetrics,
  useRecentDeals,
  useStageBuckets,
} from '@/store/selectors'
import { usePageTitle } from '@/hooks/usePageTitle'

export function DashboardPage() {
  const { t, language } = useTranslation()
  const isLoading = useCrmStore((state) => state.isLoading)
  const hasLoaded = useCrmStore((state) => state.hasLoaded)
  const revenueSeries = useCrmStore((state) => state.revenue)

  const metrics = useDashboardMetrics()
  const stageBuckets = useStageBuckets()
  const recentDeals = useRecentDeals(5)
  const clientIndex = useClientIndex()

  usePageTitle(t('dashboard.title'))

  const showSkeletons = isLoading || !hasLoaded

  return (
    <div className="space-y-6">
      <PageHeader title={t('dashboard.title')} description={t('dashboard.subtitle')} />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {showSkeletons ? (
          Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)
        ) : (
          <>
            <StatCard
              label={t('dashboard.totalClients')}
              value={String(metrics.totalClients)}
              hint={`${metrics.activeClients} ${t('dashboard.totalClientsHint')}`}
              icon={Users}
              tone="blue"
            />
            <StatCard
              label={t('dashboard.activeDeals')}
              value={String(metrics.activeDeals)}
              hint={t('dashboard.activeDealsHint')}
              icon={BarChart3}
              tone="violet"
            />
            <StatCard
              label={t('dashboard.revenue')}
              value={formatCurrency(metrics.revenue, language)}
              hint={t('dashboard.revenueHint')}
              icon={TrendingUp}
              tone="emerald"
            />
            <StatCard
              label={t('dashboard.conversionRate')}
              value={formatPercent(metrics.conversionRate, language)}
              hint={t('dashboard.conversionHint')}
              icon={Target}
              tone="amber"
            />
          </>
        )}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {showSkeletons ? (
          <>
            <ChartCardSkeleton />
            <ChartCardSkeleton />
          </>
        ) : (
          <>
            <ChartCard
              title={t('dashboard.revenueChart')}
              description={t('dashboard.revenueChartHint')}
            >
              <RevenueChart data={revenueSeries} />
            </ChartCard>
            <ChartCard
              title={t('dashboard.stageChart')}
              description={t('dashboard.stageChartHint')}
            >
              <StageChart data={stageBuckets} />
            </ChartCard>
          </>
        )}
      </section>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <div className="space-y-1">
            <CardTitle>{t('dashboard.recentDeals')}</CardTitle>
            <CardDescription>{t('dashboard.recentDealsHint')}</CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm" className="shrink-0">
            <Link to="/deals">
              {t('dashboard.viewAll')}
              <ArrowUpRight />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-0 sm:px-0">
          {showSkeletons ? (
            <TableSkeleton columns={5} />
          ) : (
            <RecentDealsTable deals={recentDeals} clientIndex={clientIndex} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
