import { Metadata } from 'next';
import BenchmarkPage from '@/app/components/benchmarks/BenchmarkPage';

export const metadata: Metadata = {
  title: 'Facebook Ads CPA Benchmarks by Industry (2024) | Benchmarketing',
  description: 'Get detailed Facebook Ads cost-per-acquisition (CPA) benchmarks for your industry. Compare acquisition costs and optimize your conversion campaigns.',
  keywords: 'facebook ads cpa, cost per acquisition benchmarks, facebook conversion costs, industry cpa averages, facebook ads roi',
};

const industryBenchmarks = [
  {
    industry: 'E-commerce',
    benchmarks: [
      { metric: 'Average CPA', value: '$18.75', percentile: '50th' },
      { metric: 'Best Performance CPA', value: '$12.45', percentile: '90th' },
      { metric: 'High Cost CPA', value: '$25.85', percentile: '25th' },
    ],
  },
  {
    industry: 'B2B',
    benchmarks: [
      { metric: 'Average CPA', value: '$125.45', percentile: '50th' },
      { metric: 'Best Performance CPA', value: '$85.65', percentile: '90th' },
      { metric: 'High Cost CPA', value: '$175.25', percentile: '25th' },
    ],
  },
  {
    industry: 'Finance',
    benchmarks: [
      { metric: 'Average CPA', value: '$85.35', percentile: '50th' },
      { metric: 'Best Performance CPA', value: '$55.95', percentile: '90th' },
      { metric: 'High Cost CPA', value: '$125.75', percentile: '25th' },
    ],
  },
  {
    industry: 'Education',
    benchmarks: [
      { metric: 'Average CPA', value: '$45.25', percentile: '50th' },
      { metric: 'Best Performance CPA', value: '$32.85', percentile: '90th' },
      { metric: 'High Cost CPA', value: '$65.45', percentile: '25th' },
    ],
  },
];

const relatedMetrics = [
  { name: 'Facebook CTR Benchmarks', href: '/benchmarks/facebook-ads/ctr' },
  { name: 'Facebook CPC Benchmarks', href: '/benchmarks/facebook-ads/cpc' },
  { name: 'Facebook CPM Benchmarks', href: '/benchmarks/facebook-ads/cpm' },
  { name: 'Facebook Conversion Rate', href: '/benchmarks/facebook-ads/conversion-rate' },
];

const faqs = [
  {
    question: 'What is a good CPA for Facebook Ads?',
    answer: 'A good CPA varies significantly by industry and acquisition type. E-commerce typically sees CPAs around $18.75, while B2B can reach $125.45 due to higher value conversions. The key is ensuring your CPA is well below your customer lifetime value (CLV) to maintain profitability.',
  },
  {
    question: 'How can I lower my Facebook Ads CPA?',
    answer: 'To reduce CPA: 1) Improve targeting precision, 2) Optimize your conversion funnel, 3) Test different ad formats and creatives, 4) Use retargeting strategically, 5) Implement proper tracking and attribution, and 6) Focus on high-intent audiences.',
  },
  {
    question: 'Why does CPA vary so much between industries?',
    answer: 'CPA variations reflect differences in: 1) Customer lifetime value, 2) Sales cycle length, 3) Competition levels, 4) Purchase decision complexity, and 5) Target audience characteristics. Higher-value products/services typically accept higher CPAs due to greater revenue per customer.',
  },
  {
    question: 'How do seasonal changes affect CPA?',
    answer: 'CPAs often increase during peak seasons (like holidays for e-commerce) due to higher competition. However, conversion rates may also improve during these periods. Plan campaigns strategically around seasonal trends and adjust budgets accordingly.',
  },
];

export default function FacebookCPABenchmarks() {
  return (
    <BenchmarkPage
      title="Facebook Ads CPA Benchmarks by Industry (2024)"
      description="Compare your Facebook Ads cost-per-acquisition against industry standards. Updated monthly with data from thousands of advertisers."
      metric="Cost Per Acquisition (CPA)"
      metricDescription="Cost per acquisition (CPA) measures how much you spend to acquire a customer or conversion through Facebook ads. It's calculated by dividing total ad spend by the number of acquisitions. This metric is crucial for determining ROI and campaign efficiency."
      platform="Facebook Ads"
      lastUpdated="March 2024"
      industryBenchmarks={industryBenchmarks}
      calculationMethod="Our CPA benchmarks are derived from analyzing conversion data across thousands of Facebook ad accounts. We segment data by industry and conversion type, removing outliers and accounting for seasonal variations to provide accurate, actionable benchmarks."
      relatedMetrics={relatedMetrics}
      faqs={faqs}
    />
  );
} 