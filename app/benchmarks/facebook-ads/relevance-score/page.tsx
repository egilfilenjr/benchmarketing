import { Metadata } from 'next';
import BenchmarkPage, { type IndustryBenchmark } from '@/app/components/benchmarks/BenchmarkPage';

export const metadata: Metadata = {
  title: 'Facebook Ads Relevance Score Benchmarks by Industry (2024) | Benchmarketing',
  description: 'Learn about Facebook Ads relevance score benchmarks for your industry. Understand how your ad quality compares and improve your ad performance.',
  keywords: 'facebook ads relevance score, ad quality score, facebook ad performance, industry relevance benchmarks, facebook ad optimization',
};

const industryBenchmarks: IndustryBenchmark[] = [
  {
    industry: 'E-commerce',
    benchmarks: [
      { metric: 'Average Relevance Score', value: '7/10', percentile: '50th' },
      { metric: 'Top Performance Score', value: '9/10', percentile: '90th' },
      { metric: 'Low Performance Score', value: '5/10', percentile: '25th' },
    ],
  },
  {
    industry: 'B2B',
    benchmarks: [
      { metric: 'Average Relevance Score', value: '6/10', percentile: '50th' },
      { metric: 'Top Performance Score', value: '8/10', percentile: '90th' },
      { metric: 'Low Performance Score', value: '4/10', percentile: '25th' },
    ],
  },
  {
    industry: 'Finance',
    benchmarks: [
      { metric: 'Average Relevance Score', value: '6/10', percentile: '50th' },
      { metric: 'Top Performance Score', value: '8/10', percentile: '90th' },
      { metric: 'Low Performance Score', value: '4/10', percentile: '25th' },
    ],
  },
  {
    industry: 'Education',
    benchmarks: [
      { metric: 'Average Relevance Score', value: '7/10', percentile: '50th' },
      { metric: 'Top Performance Score', value: '9/10', percentile: '90th' },
      { metric: 'Low Performance Score', value: '5/10', percentile: '25th' },
    ],
  },
];

const relatedMetrics = [
  { name: 'Facebook CTR Benchmarks', href: '/benchmarks/facebook-ads/ctr' },
  { name: 'Facebook Conversion Rate', href: '/benchmarks/facebook-ads/conversion-rate' },
  { name: 'Facebook CPM Benchmarks', href: '/benchmarks/facebook-ads/cpm' },
  { name: 'Facebook Frequency', href: '/benchmarks/facebook-ads/frequency' },
];

const faqs = [
  {
    question: 'What is a good relevance score for Facebook Ads?',
    answer: 'A good relevance score is typically 7 or higher out of 10. E-commerce and education sectors average around 7/10, while B2B and finance average 6/10. Top performers across industries achieve 8-9/10. Higher scores generally lead to better ad delivery and lower costs.',
  },
  {
    question: 'How does relevance score affect ad performance?',
    answer: 'Relevance score impacts: 1) Ad delivery priority, 2) Cost per impression, 3) Audience reach, and 4) Overall campaign efficiency. Higher scores typically result in lower costs and better ad placement, while low scores may limit reach and increase costs.',
  },
  {
    question: 'How can I improve my relevance score?',
    answer: 'To improve relevance score: 1) Target more specific audiences, 2) Create engaging ad content, 3) Ensure message-audience alignment, 4) Optimize for positive engagement metrics, 5) Test different ad formats, and 6) Regularly refresh creative to maintain engagement.',
  },
  {
    question: 'What factors influence relevance score?',
    answer: 'Relevance score is influenced by: 1) Positive feedback (likes, clicks, conversions), 2) Negative feedback (hide ad, mark as spam), 3) Expected feedback based on audience targeting, 4) Ad creative quality, and 5) Landing page experience. It's updated as people interact with your ad.',
  },
];

export default function FacebookRelevanceScoreBenchmarks() {
  return (
    <BenchmarkPage
      title="Facebook Ads Relevance Score Benchmarks by Industry (2024)"
      description="Compare your Facebook Ads relevance scores against industry standards. Updated monthly with data from thousands of advertisers."
      metric="Relevance Score"
      metricDescription="Relevance score is Facebook's rating of your ad's quality and engagement level, scored from 1-10. It reflects how well your ad resonates with your target audience and influences both ad delivery and costs."
      platform="Facebook Ads"
      lastUpdated="March 2024"
      industryBenchmarks={industryBenchmarks}
      calculationMethod="Our relevance score benchmarks are derived from analyzing scores across thousands of Facebook ad campaigns. We segment by industry and ad type, considering various engagement metrics and audience responses to provide accurate benchmarks."
      relatedMetrics={relatedMetrics}
      faqs={faqs}
    />
  );
} 