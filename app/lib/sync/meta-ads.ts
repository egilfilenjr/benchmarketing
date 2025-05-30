import { BaseSyncEngine } from './engine';

interface MetaAdsMetrics {
  reach: number;
  impressions: number;
  frequency: number;
  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number;
  costPerConversion: number;
  roas: number;
}

export class MetaAdsSyncEngine extends BaseSyncEngine {
  constructor(teamId: string, accountId: string) {
    super(teamId, 'meta_ads', accountId);
  }

  async fetchData(accessToken: string): Promise<MetaAdsMetrics> {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const fields = [
      'reach',
      'impressions',
      'frequency',
      'spend',
      'clicks',
      'ctr',
      'cpc',
      'actions',
      'cost_per_action_type',
      'conversion_values',
    ].join(',');

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${this.accountId}/insights?` +
      new URLSearchParams({
        access_token: accessToken,
        fields,
        time_range: JSON.stringify({
          since: thirtyDaysAgo.toISOString().split('T')[0],
          until: today.toISOString().split('T')[0],
        }),
        level: 'account',
      })
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Meta Ads API error: ${error.error.message}`);
    }

    const data = await response.json();
    const results = data.data[0] || {};

    // Find purchase conversions
    const purchaseActions = results.actions?.find((a: any) => a.action_type === 'purchase');
    const purchaseCost = results.cost_per_action_type?.find((c: any) => c.action_type === 'purchase');
    const purchaseValue = results.conversion_values?.find((v: any) => v.action_type === 'purchase');

    return {
      reach: parseInt(results.reach || '0'),
      impressions: parseInt(results.impressions || '0'),
      frequency: parseFloat(results.frequency || '0'),
      spend: parseFloat(results.spend || '0'),
      clicks: parseInt(results.clicks || '0'),
      ctr: parseFloat(results.ctr || '0'),
      cpc: parseFloat(results.cpc || '0'),
      conversions: parseInt(purchaseActions?.value || '0'),
      costPerConversion: parseFloat(purchaseCost?.value || '0'),
      roas: purchaseValue ? parseFloat(purchaseValue.value) / parseFloat(results.spend) : 0,
    };
  }
} 