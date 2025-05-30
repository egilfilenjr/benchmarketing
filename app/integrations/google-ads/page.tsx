'use client';

import { MetricCard } from '@/app/components/ui/metric-card';
import { usePlatformData } from '@/app/hooks/use-platform-data';
import { Button } from '@/app/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { formatNumber, formatCurrency, formatPercentage } from '@/app/lib/format';

export default function GoogleAdsPage() {
  const { isConnected, isLoading, error, data, lastSynced } = usePlatformData('google_ads');

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
        <h2 className="text-xl font-semibold">Connect Google Ads</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Connect your Google Ads account to get insights and recommendations for your campaigns.
        </p>
        <Button asChild>
          <a href="/api/auth/google-ads">Connect Google Ads</a>
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
          <a href="/api/auth/google-ads">Reconnect Google Ads</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Impressions"
          value={formatNumber(data.impressions)}
        />
        <MetricCard
          title="Clicks"
          value={formatNumber(data.clicks)}
        />
        <MetricCard
          title="Cost"
          value={formatCurrency(data.cost)}
        />
        <MetricCard
          title="CTR"
          value={formatPercentage(data.ctr)}
        />
        <MetricCard
          title="CPC"
          value={formatCurrency(data.cpc)}
        />
        <MetricCard
          title="Conversions"
          value={formatNumber(data.conversions)}
        />
        <MetricCard
          title="ROAS"
          value={formatNumber(data.roas)}
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