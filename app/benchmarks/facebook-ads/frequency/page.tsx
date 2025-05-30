import { Metadata } from 'next';
import BenchmarkPage from '@/app/components/benchmarks/BenchmarkPage';

export const metadata: Metadata = {
  title: 'Facebook Ads Frequency Benchmarks by Industry (2024) | Benchmarketing',
  description: 'Learn optimal Facebook Ads frequency benchmarks for your industry. Understand how often your ads should be shown to maximize engagement while preventing ad fatigue.',
  keywords: 'facebook ads frequency, ad frequency benchmarks, facebook ad fatigue, optimal ad exposure, campaign frequency caps',
};

const industryBenchmarks = [
  {
    industry: 'E-commerce',
    benchmarks: [
      { metric: 'Average Weekly Frequency', value: '2.8', percentile: '50th' },
      { metric: 'Optimal Frequency', value: '1.9', percentile: '90th' },
      { metric: 'High Frequency', value: '4.2', percentile: '25th' },
    ],
  },
  {
    industry: 'B2B',
    benchmarks: [
      { metric: 'Average Weekly Frequency', value: '1.9', percentile: '50th' },
      { metric: 'Optimal Frequency', value: '1.4', percentile: '90th' },
      { metric: 'High Frequency', value: '3.1', percentile: '25th' },
    ],
  },
  {
    industry: 'Finance',
    benchmarks: [
      { metric: 'Average Weekly Frequency', value: '2.2', percentile: '50th' },
      { metric: 'Optimal Frequency', value: '1.6', percentile: '90th' },
      { metric: 'High Frequency', value: '3.5', percentile: '25th' },
    ],
  },
  {
    industry: 'Education',
    benchmarks: [
      { metric: 'Average Weekly Frequency', value: '2.4', percentile: '50th' },
      { metric: 'Optimal Frequency', value: '1.8', percentile: '90th' },
      { metric: 'High Frequency', value: '3.7', percentile: '25th' },
    ],
  },
];

const relatedMetrics = [
  { name: 'Facebook CTR Benchmarks', href: '/benchmarks/facebook-ads/ctr' },
  { name: 'Facebook CPM Benchmarks', href: '/benchmarks/facebook-ads/cpm' },
  { name: 'Facebook Relevance Score', href: '/benchmarks/facebook-ads/relevance-score' },
  { name: 'Facebook Engagement Rate', href: '/benchmarks/facebook-ads/engagement-rate' },
];

const faqs = [
  {
    question: 'What is a good frequency for Facebook Ads?',
    answer: 'Optimal frequency varies by industry and campaign objective. E-commerce typically sees best results around 1.9-2.8 times per week, while B2B performs better at 1.4-1.9 times. The key is finding the sweet spot between brand awareness and ad fatigue.',
  },
  {
    question: 'How does frequency affect ad performance?',
    answer: 'Ad frequency impacts performance in several ways: 1) Too low frequency may not create enough brand recognition, 2) Too high frequency can lead to ad fatigue and increased costs, 3) Optimal frequency typically shows a correlation with higher CTR and conversion rates, 4) Impact varies by campaign objective and audience familiarity.',
  },
  {
    question: 'When should I increase or decrease frequency?',
    answer: 'Consider adjusting frequency when: 1) Launching new products/services (higher frequency), 2) Targeting cold audiences (lower frequency), 3) Running time-sensitive promotions (higher frequency), 4) Seeing declining CTR or rising CPCs (lower frequency), or 5) During seasonal peaks (strategic adjustment).',
  },
  {
    question: 'How do you measure and control ad frequency?',
    answer: 'To manage frequency effectively: 1) Set frequency caps in campaign settings, 2) Monitor frequency metrics in Facebook Ads Manager, 3) Segment analysis by audience type, 4) Use reach and frequency buying for predictable delivery, and 5) Regularly refresh creative to combat ad fatigue.',
  },
];

export default function FacebookFrequencyBenchmarks() {
  return (
    <BenchmarkPage
      title="Facebook Ads Frequency Benchmarks by Industry (2024)"
      description="Compare your Facebook Ads frequency metrics against industry standards. Updated monthly with data from thousands of advertisers."
      metric="Ad Frequency"
      metricDescription="Ad frequency measures how often your ads are shown to the same person within a specific time period. It's calculated by dividing total impressions by reach. Finding the right frequency balance is crucial for maintaining ad effectiveness while preventing audience fatigue."
      platform="Facebook Ads"
      lastUpdated="March 2024"
      industryBenchmarks={industryBenchmarks}
      calculationMethod="Our frequency benchmarks are calculated by analyzing impression and reach data across various industries and campaign types. We consider weekly averages and account for different campaign objectives to provide actionable insights for optimal frequency management."
      relatedMetrics={relatedMetrics}
      faqs={faqs}
    />
  );
} 