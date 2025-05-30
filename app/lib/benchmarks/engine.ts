import { createClient } from '../supabase/client';
import { Platform } from '../supabase/schema';

interface BenchmarkData {
  platform: Platform;
  industry: string;
  metric: string;
  value: number;
  percentile: number;
  updated_at: string;
}

export class BenchmarkEngine {
  private teamId: string;
  private industry: string;

  constructor(teamId: string, industry: string) {
    this.teamId = teamId;
    this.industry = industry;
  }

  async getBenchmarks(): Promise<Record<Platform, Record<string, BenchmarkData>>> {
    const supabase = createClient();
    const platforms: Platform[] = ['google_ads', 'meta_ads', 'tiktok_ads', 'ga4'];
    const benchmarks: Record<Platform, Record<string, BenchmarkData>> = {
      google_ads: {},
      meta_ads: {},
      tiktok_ads: {},
      ga4: {},
    };

    // Get industry benchmarks
    const { data: industryBenchmarks } = await supabase
      .from('industry_benchmarks')
      .select('*')
      .eq('industry', this.industry);

    if (!industryBenchmarks) return benchmarks;

    // Get team's current metrics
    for (const platform of platforms) {
      const { data: platformData } = await supabase
        .from('platform_data')
        .select('*')
        .eq('platform', platform)
        .eq('team_id', this.teamId)
        .order('synced_at', { ascending: false })
        .limit(1)
        .single();

      if (!platformData?.data) continue;

      // Calculate percentiles and compile benchmark data
      const metrics = this.getMetricsForPlatform(platform);
      for (const metric of metrics) {
        const benchmark = industryBenchmarks.find(
          b => b.platform === platform && b.metric === metric
        );

        if (benchmark && platformData.data[metric] !== undefined) {
          const percentile = this.calculatePercentile(
            platformData.data[metric],
            benchmark.distribution
          );

          benchmarks[platform][metric] = {
            platform,
            industry: this.industry,
            metric,
            value: benchmark.median,
            percentile,
            updated_at: benchmark.updated_at,
          };
        }
      }
    }

    return benchmarks;
  }

  private getMetricsForPlatform(platform: Platform): string[] {
    switch (platform) {
      case 'google_ads':
        return ['ctr', 'cpc', 'conversionRate', 'roas'];
      case 'meta_ads':
        return ['ctr', 'cpc', 'frequency', 'roas'];
      case 'tiktok_ads':
        return ['videoViewRate', 'costPerVideoView', 'conversionRate'];
      case 'ga4':
        return ['bounceRate', 'averageSessionDuration', 'conversionRate'];
      default:
        return [];
    }
  }

  private calculatePercentile(value: number, distribution: number[]): number {
    const sortedDist = [...distribution].sort((a, b) => a - b);
    const index = sortedDist.findIndex(v => v >= value);
    return (index / sortedDist.length) * 100;
  }

  async updateIndustryBenchmarks(): Promise<void> {
    const supabase = createClient();
    const platforms: Platform[] = ['google_ads', 'meta_ads', 'tiktok_ads', 'ga4'];

    for (const platform of platforms) {
      // Get all data points for this platform and industry
      const { data: allData } = await supabase
        .from('platform_data')
        .select('data')
        .eq('platform', platform)
        .eq('industry', this.industry)
        .order('synced_at', { ascending: false });

      if (!allData?.length) continue;

      const metrics = this.getMetricsForPlatform(platform);
      for (const metric of metrics) {
        const values = allData
          .map(d => d.data[metric])
          .filter(v => v !== undefined && v !== null);

        if (values.length === 0) continue;

        // Calculate statistics
        const distribution = values.sort((a, b) => a - b);
        const median = distribution[Math.floor(distribution.length / 2)];

        // Update benchmark
        await supabase.from('industry_benchmarks').upsert({
          platform,
          industry: this.industry,
          metric,
          median,
          distribution,
          updated_at: new Date().toISOString(),
        });
      }
    }
  }
} 