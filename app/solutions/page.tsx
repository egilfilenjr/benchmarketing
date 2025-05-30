import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solutions - Benchmarketing for Your Industry',
  description: 'Industry-specific marketing analytics solutions for e-commerce, SaaS, agencies, and more. Get tailored insights for your business vertical.',
  keywords: 'marketing solutions, industry benchmarks, e-commerce marketing, SaaS marketing, agency analytics, B2B marketing',
};

const industries = [
  {
    name: 'E-commerce',
    description: 'Optimize your online store\'s marketing performance',
    icon: '/icons/ecommerce.svg',
    metrics: ['ROAS', 'CPA', 'AOV', 'CLV'],
    features: [
      'Product-level performance tracking',
      'Shopping campaign optimization',
      'Seasonal trend analysis',
      'Customer journey mapping',
    ],
    caseStudy: {
      company: 'Fashion Retailer',
      result: '156% ROAS improvement',
    },
  },
  {
    name: 'SaaS',
    description: 'Drive user acquisition and reduce CAC',
    icon: '/icons/saas.svg',
    metrics: ['CAC', 'LTV', 'Trial Conversion', 'Churn'],
    features: [
      'Funnel optimization',
      'Lead quality scoring',
      'Cohort analysis',
      'Feature adoption tracking',
    ],
    caseStudy: {
      company: 'B2B Software',
      result: '43% lower CAC',
    },
  },
  {
    name: 'Agencies',
    description: 'Manage multiple client accounts efficiently',
    icon: '/icons/agency.svg',
    metrics: ['Client ROI', 'Budget Utilization', 'Growth Rate'],
    features: [
      'Multi-account management',
      'White-label reporting',
      'Client benchmarking',
      'Performance forecasting',
    ],
    caseStudy: {
      company: 'Digital Agency',
      result: '4x client portfolio growth',
    },
  },
  {
    name: 'B2B',
    description: 'Generate and nurture high-quality leads',
    icon: '/icons/b2b.svg',
    metrics: ['Lead Quality', 'Sales Cycle', 'Deal Size'],
    features: [
      'Account-based marketing',
      'Lead scoring integration',
      'Pipeline attribution',
      'Industry targeting',
    ],
    caseStudy: {
      company: 'Enterprise Tech',
      result: '67% more qualified leads',
    },
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Solutions for Every Industry
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Get industry-specific insights and benchmarks tailored to your business vertical.
            </p>
          </div>
        </div>
      </div>

      {/* Industries grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {industries.map((industry) => (
            <div key={industry.name} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12"
                      src={industry.icon}
                      alt={industry.name}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900">{industry.name}</h2>
                    <p className="mt-1 text-gray-500">{industry.description}</p>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Key Metrics We Track</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {industry.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Industry-Specific Features</h3>
                  <ul className="mt-2 space-y-2">
                    {industry.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-500">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Case study */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Case Study: </span>
                  <span className="text-gray-600">
                    {industry.caseStudy.company} achieved {industry.caseStudy.result}
                  </span>
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
            Ready to optimize your marketing?
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Get started with industry-specific insights tailored to your business.
          </p>
          <Link
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </div>
  );
} 