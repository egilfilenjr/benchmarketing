import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Features - Benchmarketing Analytics Platform',
  description: 'Explore the powerful features of Benchmarketing: industry benchmarks, real-time alerts, smart recommendations, and automated reporting.',
  keywords: 'marketing analytics features, benchmarking tools, marketing alerts, AI recommendations, marketing reports',
};

const features = [
  {
    name: 'Industry Benchmarks',
    description: 'Compare your performance against industry standards',
    icon: '/icons/benchmark.svg',
    details: [
      'Real-time comparison with industry averages',
      'Percentile rankings for key metrics',
      'Customizable benchmark groups',
      'Historical trend analysis',
      'Industry-specific insights',
    ],
  },
  {
    name: 'Real-time Alerts',
    description: 'Stay informed about important changes in your campaigns',
    icon: '/icons/alert.svg',
    details: [
      'Customizable alert thresholds',
      'Multi-channel notifications',
      'Anomaly detection',
      'Performance deviation alerts',
      'Budget monitoring',
    ],
  },
  {
    name: 'Smart Recommendations',
    description: 'Get AI-powered suggestions to improve your campaigns',
    icon: '/icons/recommendation.svg',
    details: [
      'Performance optimization tips',
      'Budget allocation suggestions',
      'Targeting improvements',
      'Creative recommendations',
      'A/B testing ideas',
    ],
  },
  {
    name: 'Automated Reporting',
    description: 'Generate comprehensive reports with ease',
    icon: '/icons/report.svg',
    details: [
      'Customizable report templates',
      'Multiple export formats',
      'Scheduled report delivery',
      'White-label options',
      'Interactive dashboards',
    ],
  },
  {
    name: 'Platform Integration',
    description: 'Connect all your marketing platforms in one place',
    icon: '/icons/integration.svg',
    details: [
      'Google Ads integration',
      'Meta Ads connection',
      'TikTok Ads sync',
      'GA4 data import',
      'Custom API support',
    ],
  },
  {
    name: 'Data Security',
    description: 'Enterprise-grade security for your marketing data',
    icon: '/icons/security.svg',
    details: [
      'SOC 2 compliance',
      'End-to-end encryption',
      'Role-based access control',
      'Regular security audits',
      'Data backup and recovery',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Modern Marketers
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Everything you need to analyze, optimize, and scale your marketing campaigns across all platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12"
                      src={feature.icon}
                      alt={feature.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900">{feature.name}</h2>
                    <p className="mt-1 text-gray-500">{feature.description}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <ul className="space-y-3">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2 text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to try these features?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Experience the full power of Benchmarketing with our 14-day free trial.
          </p>
          <a
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
} 