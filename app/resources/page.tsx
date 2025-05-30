import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Resources - Marketing Analytics Guides & Insights',
  description: 'Learn about marketing analytics, benchmarking, and optimization through our comprehensive guides, blog posts, and documentation.',
  keywords: 'marketing resources, analytics guides, marketing blog, benchmarking tutorials, marketing documentation',
};

const featuredPosts = [
  {
    title: 'The Complete Guide to Marketing Analytics',
    description: 'Learn how to measure, analyze, and optimize your marketing campaigns across all channels.',
    image: '/blog/analytics-guide.jpg',
    category: 'Guide',
    author: 'Sarah Johnson',
    date: 'Mar 15, 2024',
    readTime: '15 min read',
    slug: 'complete-guide-marketing-analytics',
  },
  {
    title: 'Understanding ROAS Benchmarks by Industry',
    description: 'Dive deep into return on ad spend benchmarks across different industries and platforms.',
    image: '/blog/roas-benchmarks.jpg',
    category: 'Analysis',
    author: 'Michael Chen',
    date: 'Mar 12, 2024',
    readTime: '10 min read',
    slug: 'roas-benchmarks-by-industry',
  },
  {
    title: 'How to Set Up Marketing Alerts That Matter',
    description: 'Best practices for setting up meaningful alerts that help you catch issues early.',
    image: '/blog/marketing-alerts.jpg',
    category: 'Tutorial',
    author: 'Emma Davis',
    date: 'Mar 8, 2024',
    readTime: '8 min read',
    slug: 'marketing-alerts-setup-guide',
  },
];

const categories = [
  {
    name: 'Blog',
    description: 'Latest insights and analysis on marketing trends',
    icon: '/icons/blog.svg',
    href: '/blog',
  },
  {
    name: 'Guides',
    description: 'In-depth tutorials and best practices',
    icon: '/icons/guides.svg',
    href: '/guides',
  },
  {
    name: 'Documentation',
    description: 'Technical documentation and API reference',
    icon: '/icons/docs.svg',
    href: '/docs',
  },
  {
    name: 'Case Studies',
    description: 'Real success stories from our customers',
    icon: '/icons/case-studies.svg',
    href: '/case-studies',
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Marketing Analytics Resources
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Explore our library of guides, tutorials, and insights to master marketing analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Resource categories */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <Image
                  className="h-10 w-10"
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{category.name}</p>
                <p className="text-sm text-gray-500 truncate">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured posts */}
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Featured Resources
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Latest insights and guides from our marketing experts.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {featuredPosts.map((post) => (
              <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover"
                    src={post.image}
                    alt={post.title}
                    width={384}
                    height={192}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      {post.category}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                      <p className="mt-3 text-base text-gray-500">{post.description}</p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">{post.author}</span>
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={`/authors/${post.author.toLowerCase().replace(' ', '-')}.jpg`}
                        alt={post.author}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="px-6 py-6 bg-indigo-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Want marketing analytics tips?
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
                Sign up for our newsletter to get the latest insights and guides delivered to your inbox.
              </p>
            </div>
            <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-sm text-indigo-200">
                We care about your data. Read our{' '}
                <Link href="/privacy" className="text-white font-medium underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 