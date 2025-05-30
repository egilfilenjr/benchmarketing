import { Suspense } from 'react';
import { createClient } from '@/app/lib/supabase/server';
import KPICard from '@/app/components/dashboard/KPICard';
import IntegrationStatus from '@/app/components/dashboard/IntegrationStatus';
import RecommendationsList from '@/app/components/dashboard/RecommendationsList';
import AlertsList from '@/app/components/dashboard/AlertsList';
import { RecommendationsEngine } from '@/app/lib/ai/recommendations';
import { AlertManager } from '@/app/lib/alerts';

export const revalidate = 300; // Revalidate every 5 minutes

async function getKPIs() {
  const supabase = createClient();
  const { data: metrics } = await supabase
    .from('platform_data')
    .select('*')
    .order('synced_at', { ascending: false })
    .limit(1);

  return metrics?.[0]?.data?.metrics || {
    aecr_score: 0,
    cpa: 0,
    roas: 0,
    ctr: 0
  };
}

async function getIntegrationStatus() {
  const supabase = createClient();
  const { data: integrations } = await supabase
    .from('oauth_accounts')
    .select('platform, status, last_synced_at');

  return integrations || [];
}

export default async function DashboardPage() {
  const kpis = await getKPIs();
  const integrations = await getIntegrationStatus();
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="AECR Score"
          value={kpis.aecr_score}
          change={5.2}
          trend="up"
        />
        <KPICard
          title="Cost Per Acquisition"
          value={kpis.cpa}
          change={-2.1}
          trend="down"
          format="currency"
        />
        <KPICard
          title="Return on Ad Spend"
          value={kpis.roas}
          change={1.8}
          trend="up"
          format="multiplier"
        />
        <KPICard
          title="Click-Through Rate"
          value={kpis.ctr}
          change={0.5}
          trend="up"
          format="percentage"
        />
      </div>

      {/* Integration Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Integration Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <IntegrationStatus integrations={integrations} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
          <Suspense fallback={<div>Loading recommendations...</div>}>
            <RecommendationsList />
          </Suspense>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
          <Suspense fallback={<div>Loading alerts...</div>}>
            <AlertsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 