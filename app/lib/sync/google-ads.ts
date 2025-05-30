import { BaseSyncEngine } from './engine';

interface GoogleAdsMetrics {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
}

export class GoogleAdsSyncEngine extends BaseSyncEngine {
  constructor(teamId: string, accountId: string) {
    super(teamId, 'google_ads', accountId);
  }

  async fetchData(accessToken: string): Promise<GoogleAdsMetrics> {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const query = `
      SELECT
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.ctr,
        metrics.average_cpc,
        metrics.roas
      FROM campaign
      WHERE segments.date BETWEEN '${thirtyDaysAgo.toISOString().split('T')[0]}' AND '${today.toISOString().split('T')[0]}'
    `;

    const response = await fetch(`https://googleads.googleapis.com/v14/customers/${this.accountId}/googleAds:search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google Ads API error: ${error.error.message}`);
    }

    const data = await response.json();
    const results = data.results[0] || {};

    return {
      impressions: parseInt(results.metrics.impressions || '0'),
      clicks: parseInt(results.metrics.clicks || '0'),
      cost: parseInt(results.metrics.cost_micros || '0') / 1_000_000,
      conversions: parseFloat(results.metrics.conversions || '0'),
      ctr: parseFloat(results.metrics.ctr || '0'),
      cpc: parseFloat(results.metrics.average_cpc || '0'),
      roas: parseFloat(results.metrics.roas || '0'),
    };
  }
} 