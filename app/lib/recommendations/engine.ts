import { createClient } from '../supabase/client';
import { Platform } from '../supabase/schema';

interface Recommendation {
  type: 'performance' | 'budget' | 'targeting' | 'creative';
  platform: Platform;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  potentialImpact: string;
  suggestedActions: string[];
}

export class RecommendationsEngine {
  private teamId: string;

  constructor(teamId: string) {
    this.teamId = teamId;
  }

  async generateRecommendations(): Promise<void> {
    const supabase = createClient();
    const platforms: Platform[] = ['google_ads', 'meta_ads', 'tiktok_ads', 'ga4'];

    for (const platform of platforms) {
      const { data: platformData } = await supabase
        .from('platform_data')
        .select('data')
        .eq('platform', platform)
        .eq('team_id', this.teamId)
        .order('synced_at', { ascending: false })
        .limit(1)
        .single();

      if (!platformData?.data) continue;

      const recommendations = await this.analyzeData(platform, platformData.data);

      // Save recommendations
      for (const rec of recommendations) {
        await supabase.from('recommendations').insert({
          team_id: this.teamId,
          type: rec.type,
          platform: rec.platform,
          priority: rec.priority,
          title: rec.title,
          description: rec.description,
          potential_impact: rec.potentialImpact,
          suggested_actions: rec.suggestedActions,
        });
      }
    }
  }

  private async analyzeData(platform: Platform, data: any): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    switch (platform) {
      case 'google_ads':
        if (data.ctr < 0.02) {
          recommendations.push({
            type: 'performance',
            platform,
            priority: 'high',
            title: 'Low Click-Through Rate',
            description: 'Your Google Ads CTR is below industry average.',
            potentialImpact: 'Improving CTR could lower costs and increase conversions.',
            suggestedActions: [
              'Review ad copy and ensure it matches search intent',
              'Test different ad headlines and descriptions',
              'Improve keyword relevance',
              'Add negative keywords to reduce irrelevant impressions',
            ],
          });
        }
        if (data.roas < 2) {
          recommendations.push({
            type: 'budget',
            platform,
            priority: 'high',
            title: 'Low Return on Ad Spend',
            description: 'Your ROAS is below target threshold.',
            potentialImpact: 'Optimizing for ROAS could improve campaign profitability.',
            suggestedActions: [
              'Review campaign bidding strategy',
              'Focus budget on best-performing campaigns',
              'Optimize landing pages for conversion',
              'Adjust targeting to high-value audiences',
            ],
          });
        }
        break;

      case 'meta_ads':
        if (data.frequency > 5) {
          recommendations.push({
            type: 'targeting',
            platform,
            priority: 'medium',
            title: 'High Ad Frequency',
            description: 'Your ads are being shown too frequently to the same audience.',
            potentialImpact: 'Reducing frequency could improve ad efficiency and reduce ad fatigue.',
            suggestedActions: [
              'Expand your target audience',
              'Implement frequency caps',
              'Refresh creative assets',
              'Review audience overlap',
            ],
          });
        }
        break;

      case 'tiktok_ads':
        if (data.videoViewRate < 0.25) {
          recommendations.push({
            type: 'creative',
            platform,
            priority: 'high',
            title: 'Low Video View Rate',
            description: 'Your videos are not engaging viewers effectively.',
            potentialImpact: 'Improving view rate could increase engagement and reduce costs.',
            suggestedActions: [
              'Create shorter, more engaging videos',
              'Test different video styles and formats',
              'Add captions to improve accessibility',
              'Use trending sounds and music',
            ],
          });
        }
        break;

      case 'ga4':
        if (data.bounceRate > 0.7) {
          recommendations.push({
            type: 'performance',
            platform,
            priority: 'high',
            title: 'High Bounce Rate',
            description: 'Your website has a high bounce rate.',
            potentialImpact: 'Reducing bounce rate could improve conversion rates and user engagement.',
            suggestedActions: [
              'Improve page load speed',
              'Review landing page content relevance',
              'Optimize for mobile devices',
              'Add clear calls-to-action',
            ],
          });
        }
        break;
    }

    return recommendations;
  }
} 