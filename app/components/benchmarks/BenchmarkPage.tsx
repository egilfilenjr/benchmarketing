import { ReactNode } from 'react';

export type BenchmarkData = {
  metric: string;
  value: string;
  percentile: string;
};

export type IndustryBenchmark = {
  industry: string;
  benchmarks: BenchmarkData[];
};

export type BenchmarkPageProps = {
  title: string;
  description: string;
  metric: string;
  metricDescription: string;
  platform: string;
  lastUpdated: string;
  industryBenchmarks: IndustryBenchmark[];
  calculationMethod: string;
  relatedMetrics: Array<{
    name: string;
    href: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  children?: ReactNode;
};

const BenchmarkPage = ({
  title,
  description,
  metric,
  metricDescription,
  platform,
  lastUpdated,
  industryBenchmarks,
  calculationMethod,
  relatedMetrics,
  faqs,
  children,
}: BenchmarkPageProps) => {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      {/* Header */}
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
        <p className="mt-1 text-lg text-gray-500">{description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>Last updated: {lastUpdated}</span>
          <span className="mx-2">•</span>
          <span>Platform: {platform}</span>
        </div>
      </div>

      {/* Metric Overview */}
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">About {metric}</h2>
        <p className="mt-2 text-gray-600">{metricDescription}</p>
      </div>

      {/* Industry Benchmarks */}
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Industry Benchmarks</h2>
        <div className="mt-4">
          {industryBenchmarks.map((industry) => (
            <div key={industry.industry} className="mt-6 first:mt-0">
              <h3 className="text-lg font-medium text-gray-900">{industry.industry}</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentile
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {industry.benchmarks.map((benchmark) => (
                      <tr key={benchmark.metric}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {benchmark.metric}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {benchmark.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {benchmark.percentile}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Content */}
      {children}

      {/* Calculation Method */}
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">How We Calculate This</h2>
        <p className="mt-2 text-gray-600">{calculationMethod}</p>
      </div>

      {/* Related Metrics */}
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Related Metrics</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {relatedMetrics.map((metric) => (
            <a
              key={metric.href}
              href={metric.href}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              {metric.name}
            </a>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        <dl className="mt-4 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-medium text-gray-900">{faq.question}</dt>
              <dd className="mt-2 text-gray-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default BenchmarkPage; 