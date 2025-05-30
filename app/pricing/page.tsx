'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RiCheckLine } from 'react-icons/ri';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out Benchmarketing',
    features: [
      'Basic analytics',
      'Single user',
      'Limited alerts (3)',
      'CSV export',
    ],
    cta: 'Start Free',
    href: '/signup',
  },
  {
    name: 'Pro',
    price: 49,
    description: 'Everything you need for serious marketing',
    features: [
      'Advanced analytics',
      '3 team members',
      'AI recommendations',
      'Multiple export formats',
      'API access',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Pro+',
    price: 99,
    description: 'For growing marketing teams',
    features: [
      'Everything in Pro',
      'White-label options',
      'Custom branding',
      '10 team members',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Start Pro+ Trial',
    href: '/signup?plan=pro_plus',
  },
  {
    name: 'Agency',
    price: 299,
    description: 'For marketing agencies and enterprises',
    features: [
      'Everything in Pro+',
      'Unlimited team members',
      'Agency dashboard',
      'Client management',
      'Priority support',
      'Custom onboarding',
    ],
    cta: 'Contact Sales',
    href: '/contact',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start free, upgrade when you need to
          </p>
        </div>

        <div className="mt-12 sm:mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? 'border-blue-600 shadow-xl'
                  : 'border-gray-200'
              } p-8 shadow-sm flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    ${annual ? plan.price * 0.8 : plan.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">
                    {plan.price > 0 ? '/month' : ''}
                  </span>
                </p>
                <p className="mt-6 text-gray-500">{plan.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <RiCheckLine
                        className="flex-shrink-0 w-6 h-6 text-blue-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.href}
                className={`
                  mt-8 block w-full rounded-md border border-transparent px-6 py-3 text-center font-medium
                  ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }
                `}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative">
            <div className="flex items-center">
              <span className={`text-sm ${annual ? 'text-gray-500' : 'text-gray-900 font-semibold'}`}>
                Monthly billing
              </span>
              <button
                type="button"
                className={`
                  relative mx-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                  ${annual ? 'bg-blue-600' : 'bg-gray-200'}
                `}
                onClick={() => setAnnual(!annual)}
              >
                <span className="sr-only">Toggle annual billing</span>
                <span
                  className={`
                    pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                    transition duration-200 ease-in-out
                    ${annual ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
              <span className={`text-sm ${annual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                Annual billing (20% off)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 