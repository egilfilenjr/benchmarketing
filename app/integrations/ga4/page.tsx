'use client';

import { MetricCard } from '@/app/components/ui/metric-card';
import { usePlatformData } from '@/app/hooks/use-platform-data';
import { Button } from '@/app/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { formatNumber, formatCurrency, formatPercentage, formatDuration } from '@/app/lib/format';

export default function GA4Page() {
  const { isConnected, isLoading, error, data, lastSynced } = usePlatformData('ga4');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-xl font-semibold">Connect Google Analytics 4</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Connect your GA4 account to get insights and recommendations for your website traffic.
        </p>
        <Button asChild>
          <a href="/api/auth/ga4">Connect GA4</a>
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <h2 className="text-xl font-semibold">Error Loading Data</h2>
        <p className="text-muted-foreground text-center max-w-md">{error}</p>
        <Button variant="outline" asChild>
          <a href="/api/auth/ga4">Reconnect GA4</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={formatNumber(data.totalUsers)}
        />
        <MetricCard
          title="New Users"
          value={formatNumber(data.newUsers)}
        />
        <MetricCard
          title="Sessions"
          value={formatNumber(data.sessions)}
        />
        <MetricCard
          title="Average Session Duration"
          value={formatDuration(data.averageSessionDuration)}
        />
        <MetricCard
          title="Page Views"
          value={formatNumber(data.screenPageViews)}
        />
        <MetricCard
          title="Bounce Rate"
          value={formatPercentage(data.bounceRate)}
        />
        <MetricCard
          title="Conversions"
          value={formatNumber(data.conversions)}
        />
        <MetricCard
          title="Conversion Rate"
          value={formatPercentage(data.conversionRate)}
        />
        <MetricCard
          title="Transactions"
          value={formatNumber(data.ecommerce.transactions)}
        />
        <MetricCard
          title="Revenue"
          value={formatCurrency(data.ecommerce.revenue)}
        />
        <MetricCard
          title="Average Order Value"
          value={formatCurrency(data.ecommerce.averageOrderValue)}
        />
      </div>

      {lastSynced && (
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date(lastSynced).toLocaleString()}
        </p>
      )}
    </div>
  );
} 