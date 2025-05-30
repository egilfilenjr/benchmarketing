import { Metadata } from 'next';
import BenchmarkPage from '@/app/components/benchmarks/BenchmarkPage';

export const metadata: Metadata = {
  title: 'Facebook Ads CPC Benchmarks by Industry (2024) | Benchmarketing',
  description: 'Get the latest Facebook Ads cost-per-click (CPC) benchmarks for your industry. Compare costs, optimize spending, and improve your advertising ROI.',
  keywords: 'facebook ads cpc, cost per click benchmarks, facebook advertising costs, industry cpc averages, facebook ads pricing',
};

const industryBenchmarks = [
  {
    industry: 'E-commerce',
    benchmarks: [
      { metric: 'Average CPC', value: '$0.97', percentile: '50th' },
      { metric: 'Best Performance CPC', value: '$0.45', percentile: '90th' },
      { metric: 'High Cost CPC', value: '$1.45', percentile: '25th' },
    ],
  },
  {
    industry: 'B2B',
    benchmarks: [
      { metric: 'Average CPC', value: '$2.52', percentile: '50th' },
      { metric: 'Best Performance CPC', value: '$1.15', percentile: '90th' },
      { metric: 'High Cost CPC', value: '$3.85', percentile: '25th' },
    ],
  },
  {
    industry: 'Finance',
    benchmarks: [
      { metric: 'Average CPC', value: '$3.77', percentile: '50th' },
      { metric: 'Best Performance CPC', value: '$1.95', percentile: '90th' },
      { metric: 'High Cost CPC', value: '$5.25', percentile: '25th' },
    ],
  },
  {
    industry: 'Education',
    benchmarks: [
      { metric: 'Average CPC', value: '$1.72', percentile: '50th' },
      { metric: 'Best Performance CPC', value: '$0.85', percentile: '90th' },
      { metric: 'High Cost CPC', value: '$2.45', percentile: '25th' },
    ],
  },
];

const relatedMetrics = [
  { name: 'Facebook CTR Benchmarks', href: '/benchmarks/facebook-ads/ctr' },
  { name: 'Facebook CPM Benchmarks', href: '/benchmarks/facebook-ads/cpm' },
  { name: 'Facebook CPA Benchmarks', href: '/benchmarks/facebook-ads/cpa' },
  { name: 'Facebook ROAS', href: '/benchmarks/facebook-ads/roas' },
];

const faqs = [
  {
    question: 'What is a good CPC for Facebook Ads?',
    answer: 'A good CPC varies significantly by industry. While e-commerce typically sees CPCs around $0.97, B2B averages $2.52, and finance can reach $3.77. The key is comparing your CPC to your industry benchmark and ensuring your conversion value exceeds your cost per click.',
  },
  {
    question: 'Why are my Facebook Ads CPCs higher than the benchmark?',
    answer: 'Higher CPCs can result from factors like competitive bidding in your industry, broad targeting, poor ad relevance scores, or targeting high-value audiences. Focus on improving ad quality, refining targeting, and testing different bidding strategies to reduce costs.',
  },
  {
    question: 'How can I lower my Facebook Ads CPC?',
    answer: 'To lower your CPC: 1) Improve ad relevance with better targeting, 2) Create more engaging ad content, 3) Test different ad formats and placements, 4) Optimize your bidding strategy, 5) Refine your audience targeting, and 6) Schedule ads during optimal times.',
  },
  {
    question: 'Do Facebook Ads CPCs vary by season?',
    answer: 'Yes, CPCs often increase during peak shopping seasons (like Q4) due to increased competition. Plan your budget accordingly and consider running campaigns during less competitive periods for better rates.',
  },
];

export default function FacebookCPCBenchmarks() {
  return (
    <BenchmarkPage
      title="Facebook Ads CPC Benchmarks by Industry (2024)"
      description="Compare your Facebook Ads cost-per-click against industry averages. Updated monthly with data from thousands of advertisers."
      metric="Cost Per Click (CPC)"
      metricDescription="Cost per click (CPC) represents the average amount you pay for each click on your Facebook ad. It's calculated by dividing your total ad spend by the number of clicks received. Lower CPCs generally indicate more cost-effective advertising, but must be balanced against conversion quality."
      platform="Facebook Ads"
      lastUpdated="March 2024"
      industryBenchmarks={industryBenchmarks}
      calculationMethod="Our CPC benchmarks are derived from analyzing millions of dollars in ad spend across various industries. We calculate monthly averages, removing statistical outliers and accounting for seasonal variations. The data is segmented by industry and normalized to provide reliable benchmarks."
      relatedMetrics={relatedMetrics}
      faqs={faqs}
    />
  );
} 