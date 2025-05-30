import { BaseSyncEngine } from './engine';

interface TikTokAdsMetrics {
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpc: number;
  videoViews: number;
  videoViewRate: number;
  costPerVideoView: number;
}

export class TikTokAdsSyncEngine extends BaseSyncEngine {
  constructor(teamId: string, accountId: string) {
    super(teamId, 'tiktok_ads', accountId);
  }

  async fetchData(accessToken: string): Promise<TikTokAdsMetrics> {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/', {
      method: 'POST',
      headers: {
        'Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        advertiser_id: this.accountId,
        metrics: [
          'impressions',
          'clicks',
          'spend',
          'conversions',
          'ctr',
          'cpc',
          'video_views',
          'video_watched_2s',
          'video_views_p25',
          'cost_per_video_view',
        ],
        data_level: 'ADVERTISER',
        start_date: thirtyDaysAgo.toISOString().split('T')[0],
        end_date: today.toISOString().split('T')[0],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`TikTok Ads API error: ${error.message}`);
    }

    const data = await response.json();
    const results = data.data.list[0] || {};

    const videoViews = parseInt(results.video_views || '0');
    const videoWatched2s = parseInt(results.video_watched_2s || '0');
    const videoViewsP25 = parseInt(results.video_views_p25 || '0');

    return {
      impressions: parseInt(results.impressions || '0'),
      clicks: parseInt(results.clicks || '0'),
      spend: parseFloat(results.spend || '0'),
      conversions: parseInt(results.conversions || '0'),
      ctr: parseFloat(results.ctr || '0'),
      cpc: parseFloat(results.cpc || '0'),
      videoViews,
      videoViewRate: videoViews > 0 ? (videoWatched2s / videoViews) * 100 : 0,
      costPerVideoView: parseFloat(results.cost_per_video_view || '0'),
    };
  }
} 