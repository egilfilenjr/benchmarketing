import { Metadata } from 'next';
import BenchmarkPage from '@/app/components/benchmarks/BenchmarkPage';

export const metadata: Metadata = {
  title: 'Facebook Ads CPM Benchmarks by Industry (2024) | Benchmarketing',
  description: 'Access current Facebook Ads cost-per-mille (CPM) benchmarks for your industry. Compare your ad costs and maximize your advertising budget efficiency.',
  keywords: 'facebook ads cpm, cost per thousand impressions, facebook advertising costs, industry cpm benchmarks, facebook ads pricing, ad impression costs',
};

const industryBenchmarks = [
  {
    industry: 'E-commerce',
    benchmarks: [
      { metric: 'Average CPM', value: '$12.45', percentile: '50th' },
      { metric: 'Best Performance CPM', value: '$7.85', percentile: '90th' },
      { metric: 'High Cost CPM', value: '$18.75', percentile: '25th' },
    ],
  },
  {
    industry: 'B2B',
    benchmarks: [
      { metric: 'Average CPM', value: '$15.85', percentile: '50th' },
      { metric: 'Best Performance CPM', value: '$9.95', percentile: '90th' },
      { metric: 'High Cost CPM', value: '$22.65', percentile: '25th' },
    ],
  },
  {
    industry: 'Finance',
    benchmarks: [
      { metric: 'Average CPM', value: '$22.35', percentile: '50th' },
      { metric: 'Best Performance CPM', value: '$14.75', percentile: '90th' },
      { metric: 'High Cost CPM', value: '$31.45', percentile: '25th' },
    ],
  },
  {
    industry: 'Education',
    benchmarks: [
      { metric: 'Average CPM', value: '$10.25', percentile: '50th' },
      { metric: 'Best Performance CPM', value: '$6.45', percentile: '90th' },
      { metric: 'High Cost CPM', value: '$15.85', percentile: '25th' },
    ],
  },
];

const relatedMetrics = [
  { name: 'Facebook CTR Benchmarks', href: '/benchmarks/facebook-ads/ctr' },
  { name: 'Facebook CPC Benchmarks', href: '/benchmarks/facebook-ads/cpc' },
  { name: 'Facebook CPA Benchmarks', href: '/benchmarks/facebook-ads/cpa' },
  { name: 'Facebook Frequency', href: '/benchmarks/facebook-ads/frequency' },
];

const faqs = [
  {
    question: 'What is a good CPM for Facebook Ads?',
    answer: 'A good CPM on Facebook varies by industry, with e-commerce averaging around $12.45, B2B at $15.85, and finance at $22.35. Lower CPMs are generally better, but should be balanced against audience quality and campaign objectives. Focus on your industry benchmark rather than overall averages.',
  },
  {
    question: 'Why is my Facebook Ads CPM increasing?',
    answer: 'CPM increases can be caused by: 1) Increased competition in your target market, 2) Seasonal advertising trends (e.g., holiday season), 3) Changes in audience targeting, 4) Ad fatigue, or 5) Platform algorithm updates. Regular optimization and audience refreshes can help manage costs.',
  },
  {
    question: 'How can I reduce my Facebook Ads CPM?',
    answer: 'To reduce CPM: 1) Improve ad relevance score through better targeting and creative, 2) Test different audience segments, 3) Optimize ad scheduling for off-peak hours, 4) Refresh ad creative regularly, 5) Expand placements strategically, and 6) Consider targeting less competitive audiences.',
  },
  {
    question: 'How do Facebook CPMs compare to other platforms?',
    answer: 'Facebook CPMs typically fall in the middle range compared to other platforms. While they're generally higher than display advertising, they're often lower than LinkedIn and some B2B platforms. The key advantage is Facebook's precise targeting capabilities and large user base.',
  },
];

export default function FacebookCPMBenchmarks() {
  return (
    <BenchmarkPage
      title="Facebook Ads CPM Benchmarks by Industry (2024)"
      description="Compare your Facebook Ads cost-per-mille against industry standards. Updated monthly with data from thousands of advertisers."
      metric="Cost Per Mille (CPM)"
      metricDescription="Cost per mille (CPM) represents the cost you pay for 1,000 impressions of your Facebook ad. It's a key metric for measuring advertising costs and reach efficiency. While lower CPMs can indicate cost-effective reach, they should be evaluated alongside engagement and conversion metrics to ensure you're reaching the right audience."
      platform="Facebook Ads"
      lastUpdated="March 2024"
      industryBenchmarks={industryBenchmarks}
      calculationMethod="Our CPM benchmarks are calculated by analyzing billions of ad impressions across diverse industries. We process monthly data, remove outliers, and normalize for seasonal variations to provide accurate, actionable benchmarks. The data is segmented by industry and updated regularly to reflect current market conditions."
      relatedMetrics={relatedMetrics}
      faqs={faqs}
    />
  );
} 