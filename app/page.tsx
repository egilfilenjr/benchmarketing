import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Benchmarketing - Marketing Analytics & Insights Platform',
  description: 'Transform your marketing data into actionable insights. Compare performance across Google Ads, Meta Ads, TikTok Ads, and GA4 with industry benchmarks.',
  keywords: 'marketing analytics, performance benchmarks, digital marketing, marketing insights, marketing data platform',
  openGraph: {
    title: 'Benchmarketing - Marketing Analytics & Insights Platform',
    description: 'Transform your marketing data into actionable insights. Compare performance across Google Ads, Meta Ads, TikTok Ads, and GA4 with industry benchmarks.',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benchmarketing - Marketing Analytics & Insights Platform',
    description: 'Transform your marketing data into actionable insights. Compare performance across Google Ads, Meta Ads, TikTok Ads, and GA4 with industry benchmarks.',
    images: ['/twitter-image.svg'],
  },
};

const stats = [
  { label: 'Marketing campaigns analyzed', value: '1M+' },
  { label: 'Data points processed daily', value: '500M+' },
  { label: 'Active customers', value: '10,000+' },
  { label: 'Average ROAS improvement', value: '47%' },
];

const testimonials = [
  {
    quote: "Benchmarketing has transformed how we approach our marketing campaigns. The insights are invaluable.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechCorp",
  },
  {
    quote: "The platform's recommendations have helped us reduce our CAC by 35% while improving conversion rates.",
    author: "Michael Rodriguez",
    role: "Growth Lead",
    company: "DataFlow",
  },
  {
    quote: "Finally, a marketing analytics platform that delivers actionable insights without the complexity.",
    author: "Emma Thompson",
    role: "CMO",
    company: "MarketPro",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Make data-driven</span>{' '}
                  <span className="block text-indigo-600 xl:inline">marketing decisions</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Compare your marketing performance against industry benchmarks. Get actionable insights and recommendations to optimize your campaigns across all platforms.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to optimize your marketing
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Industry Benchmarks</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Compare your performance against industry standards across all major marketing platforms.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Alerts</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get notified instantly when your metrics deviate from expected performance.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Smart Recommendations</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Receive AI-powered suggestions to improve your marketing performance.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automated Reporting</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Generate comprehensive reports and export data in multiple formats.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by marketers worldwide
            </h2>
            <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
              Our platform processes millions of data points daily to deliver actionable insights
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                  {stat.label}
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </p>
          </div>
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.author} className="lg:col-span-1">
                  <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden p-8">
                    <blockquote className="mt-2">
                      <p className="text-lg font-medium text-gray-900">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>
                    <div className="mt-6">
                      <p className="text-base font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-base text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to boost your marketing?</span>
            <span className="block">Start your free trial today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            14-day free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Sign up for free
          </Link>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Trusted by marketers worldwide</h2>
            <p className="mt-4 text-lg text-gray-500">
              Join thousands of marketing professionals who use Benchmarketing to optimize their campaigns.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image src="/logos/logo-1.svg" alt="TechCorp" width={158} height={48} />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image src="/logos/logo-2.svg" alt="DataFlow" width={158} height={48} />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image src="/logos/logo-3.svg" alt="MarketPro" width={158} height={48} />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image src="/logos/logo-4.svg" alt="AdGenius" width={158} height={48} />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <Image src="/logos/logo-5.svg" alt="BrandWise" width={158} height={48} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 