import { BaseSyncEngine } from './engine';

interface GA4Metrics {
  totalUsers: number;
  newUsers: number;
  sessions: number;
  averageSessionDuration: number;
  screenPageViews: number;
  bounceRate: number;
  conversions: number;
  conversionRate: number;
  ecommerce: {
    transactions: number;
    revenue: number;
    averageOrderValue: number;
  };
}

export class GA4SyncEngine extends BaseSyncEngine {
  constructor(teamId: string, accountId: string) {
    super(teamId, 'ga4', accountId);
  }

  async fetchData(accessToken: string): Promise<GA4Metrics> {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${this.accountId}:runReport`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{
          startDate: thirtyDaysAgo.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0],
        }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'newUsers' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'conversions' },
          { name: 'conversionRate' },
          { name: 'transactions' },
          { name: 'totalRevenue' },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GA4 API error: ${error.error.message}`);
    }

    const data = await response.json();
    const metrics = data.rows[0].metricValues;

    const transactions = parseFloat(metrics[8].value || '0');
    const revenue = parseFloat(metrics[9].value || '0');

    return {
      totalUsers: parseInt(metrics[0].value || '0'),
      newUsers: parseInt(metrics[1].value || '0'),
      sessions: parseInt(metrics[2].value || '0'),
      averageSessionDuration: parseFloat(metrics[3].value || '0'),
      screenPageViews: parseInt(metrics[4].value || '0'),
      bounceRate: parseFloat(metrics[5].value || '0'),
      conversions: parseInt(metrics[6].value || '0'),
      conversionRate: parseFloat(metrics[7].value || '0'),
      ecommerce: {
        transactions,
        revenue,
        averageOrderValue: transactions > 0 ? revenue / transactions : 0,
      },
    };
  }
} 