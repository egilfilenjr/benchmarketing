import { Metadata } from 'next';
import BenchmarkPage from '@/app/components/benchmarks/BenchmarkPage';

export const metadata: Metadata = {
  title: 'Facebook Ads ROAS Benchmarks by Industry (2024) | Benchmarketing',
  description: 'Discover current Facebook Ads return on ad spend (ROAS) benchmarks for your industry. Compare performance and optimize your advertising ROI.',
  keywords: 'facebook ads roas, return on ad spend benchmarks, facebook advertising roi, industry roas averages, facebook ads performance',
};

const industryBenchmarks = [
  {
    industry: 'E-commerce',
    benchmarks: [
      { metric: 'Average ROAS', value: '3.2x', percentile: '50th' },
      { metric: 'Top Performance ROAS', value: '5.8x', percentile: '90th' },
      { metric: 'Minimum Viable ROAS', value: '2.1x', percentile: '25th' },
    ],
  },
  {
    industry: 'B2B',
    benchmarks: [
      { metric: 'Average ROAS', value: '4.5x', percentile: '50th' },
      { metric: 'Top Performance ROAS', value: '7.2x', percentile: '90th' },
      { metric: 'Minimum Viable ROAS', value: '3.1x', percentile: '25th' },
    ],
  },
  {
    industry: 'Finance',
    benchmarks: [
      { metric: 'Average ROAS', value: '5.8x', percentile: '50th' },
      { metric: 'Top Performance ROAS', value: '8.5x', percentile: '90th' },
      { metric: 'Minimum Viable ROAS', value: '3.9x', percentile: '25th' },
    ],
  },
  {
    industry: 'Education',
    benchmarks: [
      { metric: 'Average ROAS', value: '3.8x', percentile: '50th' },
      { metric: 'Top Performance ROAS', value: '6.2x', percentile: '90th' },
      { metric: 'Minimum Viable ROAS', value: '2.5x', percentile: '25th' },
    ],
  },
];

const relatedMetrics = [
  { name: 'Facebook CPA Benchmarks', href: '/benchmarks/facebook-ads/cpa' },
  { name: 'Facebook Conversion Rate', href: '/benchmarks/facebook-ads/conversion-rate' },
  { name: 'Facebook CTR Benchmarks', href: '/benchmarks/facebook-ads/ctr' },
  { name: 'Facebook CPC Benchmarks', href: '/benchmarks/facebook-ads/cpc' },
];

const faqs = [
  {
    question: 'What is a good ROAS for Facebook Ads?',
    answer: 'A good ROAS varies by industry, with e-commerce typically aiming for 3.2x or higher, B2B averaging 4.5x, and finance seeing 5.8x. Your target ROAS should account for your profit margins, overhead costs, and business model. Generally, a ROAS of 2x is considered the minimum viable return.',
  },
  {
    question: 'How can I improve my Facebook Ads ROAS?',
    answer: 'To improve ROAS: 1) Optimize targeting to reach high-value customers, 2) Improve ad creative and messaging, 3) Enhance your landing page conversion rate, 4) Test different bidding strategies, 5) Focus on products with higher margins, and 6) Use retargeting to capture abandoned carts and high-intent users.',
  },
  {
    question: 'Why is my ROAS lower than the benchmark?',
    answer: 'Lower ROAS can be caused by: 1) Ineffective targeting, 2) High CPCs in competitive markets, 3) Poor conversion optimization, 4) Weak product-market fit, 5) Inefficient campaign structure, or 6) Tracking issues. Review each element and optimize based on data-driven insights.',
  },
  {
    question: 'How do you calculate ROAS accurately?',
    answer: 'To calculate ROAS accurately: 1) Set up proper conversion tracking, 2) Account for the full conversion window, 3) Consider post-purchase value (repeat purchases, referrals), 4) Include all ad costs (including fees), and 5) Use consistent attribution models. Ensure your tracking captures both direct and indirect revenue impact.',
  },
];

export default function FacebookROASBenchmarks() {
  return (
    <BenchmarkPage
      title="Facebook Ads ROAS Benchmarks by Industry (2024)"
      description="Compare your Facebook Ads return on ad spend against industry standards. Updated monthly with data from thousands of advertisers."
      metric="Return on Ad Spend (ROAS)"
      metricDescription="Return on Ad Spend (ROAS) measures the revenue generated for every dollar spent on Facebook ads. It's calculated by dividing total revenue by total ad spend. ROAS is a crucial metric for evaluating advertising effectiveness and profitability."
      platform="Facebook Ads"
      lastUpdated="March 2024"
      industryBenchmarks={industryBenchmarks}
      calculationMethod="Our ROAS benchmarks are calculated using verified revenue and ad spend data from thousands of Facebook advertisers. We analyze performance across different industries, removing outliers and accounting for seasonal variations to provide reliable benchmarks."
      relatedMetrics={relatedMetrics}
      faqs={faqs}
    />
  );
} 