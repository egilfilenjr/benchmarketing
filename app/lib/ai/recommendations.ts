import { createClient } from '@/app/lib/supabase/server';
import { Team } from '@/app/types';
import { hasFeature } from '../plans';
import { supabase } from '@/app/lib/supabase/client';

interface Recommendation {
  id: string;
  teamId: string;
  type: string;
  platform: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  potentialImpact: string;
  suggestedActions: string[];
  createdAt: string;
  dismissedAt?: string;
}

interface Metric {
  name: string;
  value: number;
  benchmark: number;
  platform: string;
}

export class RecommendationsEngine {
  async generateRecommendations(teamId: string): Promise<Recommendation[]> {
    try {
      // Get team's platform data
      const { data: platformData, error: dataError } = await supabase
        .from('platform_data')
        .select('*')
        .eq('team_id', teamId)
        .order('synced_at', { ascending: false });

      if (dataError) throw dataError;

      // Get industry benchmarks
      const { data: benchmarks, error: benchmarkError } = await supabase
        .from('industry_benchmarks')
        .select('*')
        .single();

      if (benchmarkError) throw benchmarkError;

      const recommendations: Recommendation[] = [];

      // Analyze each platform's data
      for (const data of platformData || []) {
        const metrics = this.extractMetrics(data.data, data.platform);
        const platformRecs = this.analyzeMetrics(metrics, benchmarks, data.platform);
        recommendations.push(...platformRecs);
      }

      // Store recommendations
      if (recommendations.length > 0) {
        await supabase
          .from('recommendations')
          .insert(recommendations.map(rec => ({
            team_id: teamId,
            type: rec.type,
            platform: rec.platform,
            priority: rec.priority,
            title: rec.title,
            description: rec.description,
            potential_impact: rec.potentialImpact,
            suggested_actions: rec.suggestedActions
          })));
      }

      return recommendations;
    } catch (err) {
      const error = err as Error;
      console.error('Error generating recommendations:', error.message);
      return [];
    }
  }

  private extractMetrics(data: any, platform: string): Metric[] {
    const metrics: Metric[] = [];

    switch (platform) {
      case 'google_ads':
        metrics.push(
          {
            name: 'ctr',
            value: data.metrics?.ctr || 0,
            benchmark: 0.02,
            platform
          },
          {
            name: 'conversion_rate',
            value: data.metrics?.conversion_rate || 0,
            benchmark: 0.03,
            platform
          },
          {
            name: 'roas',
            value: data.metrics?.roas || 0,
            benchmark: 4,
            platform
          }
        );
        break;

      case 'meta_ads':
        metrics.push(
          {
            name: 'ctr',
            value: data.metrics?.ctr || 0,
            benchmark: 0.01,
            platform
          },
          {
            name: 'cpc',
            value: data.metrics?.cpc || 0,
            benchmark: 0.5,
            platform
          },
          {
            name: 'roas',
            value: data.metrics?.roas || 0,
            benchmark: 3,
            platform
          }
        );
        break;

      // Add other platforms...
    }

    return metrics;
  }

  private analyzeMetrics(metrics: Metric[], benchmarks: any, platform: string): Recommendation[] {
    const recommendations: Recommendation[] = [];

    for (const metric of metrics) {
      const variance = (metric.value - metric.benchmark) / metric.benchmark;

      if (variance < -0.2) { // Underperforming by 20% or more
        recommendations.push(this.createRecommendation(metric, variance, platform));
      }
    }

    return recommendations;
  }

  private createRecommendation(metric: Metric, variance: number, platform: string): Recommendation {
    const priority = variance < -0.5 ? 'high' : variance < -0.3 ? 'medium' : 'low';
    const improvement = Math.abs(variance * 100).toFixed(1);

    const recommendations: Record<string, {
      title: string;
      description: string;
      actions: string[];
    }> = {
      ctr: {
        title: 'Improve Click-Through Rate',
        description: `Your CTR is ${improvement}% below industry average.`,
        actions: [
          'Review and optimize ad copy',
          'Test different ad formats',
          'Improve ad relevance to target audience'
        ]
      },
      conversion_rate: {
        title: 'Boost Conversion Rate',
        description: `Your conversion rate is ${improvement}% below industry average.`,
        actions: [
          'Optimize landing pages',
          'Improve targeting',
          'Test different calls-to-action'
        ]
      },
      roas: {
        title: 'Increase Return on Ad Spend',
        description: `Your ROAS is ${improvement}% below industry average.`,
        actions: [
          'Review campaign budgets',
          'Optimize bidding strategy',
          'Focus on high-performing audiences'
        ]
      }
    };

    const rec = recommendations[metric.name];
    
    return {
      id: crypto.randomUUID(),
      teamId: '',  // Will be set when storing
      type: metric.name,
      platform,
      priority,
      title: rec.title,
      description: rec.description,
      potentialImpact: `Potential ${improvement}% improvement in ${metric.name.toUpperCase()}`,
      suggestedActions: rec.actions,
      createdAt: new Date().toISOString()
    };
  }
}

export async function getRecommendations(team: Team): Promise<Recommendation[]> {
  if (!hasFeature(team, 'ai-recommendations')) {
    return [];
  }

  const supabase = createClient();
  const { data: recommendations } = await supabase
    .from('recommendations')
    .select('*')
    .eq('team_id', team.id)
    .order('created_at', { ascending: false })
    .limit(10);

  return recommendations || [];
}

export async function dismissRecommendation(team: Team, recommendationId: string): Promise<void> {
  if (!hasFeature(team, 'ai-recommendations')) {
    return;
  }

  const supabase = createClient();
  await supabase
    .from('recommendations')
    .update({ dismissed_at: new Date().toISOString() })
    .eq('team_id', team.id)
    .eq('id', recommendationId);
} 