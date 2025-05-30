'use client';

import React, { useState } from 'react';
import { IntegrationModal } from '@/app/components/integrations/IntegrationModal';

// Placeholder icons until we can install @heroicons/react
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const integrations = [
  {
    name: 'Google Ads',
    description: 'Connect your Google Ads account to track campaign performance and ROI.',
    icon: '/icons/google-ads.svg',
    status: 'connected',
    lastSync: '2 hours ago',
    platform: 'google-ads' as const,
  },
  {
    name: 'Meta Ads',
    description: 'Sync your Facebook and Instagram ad campaigns for cross-channel insights.',
    icon: '/icons/meta-ads.svg',
    status: 'disconnected',
    platform: 'meta-ads' as const,
  },
  {
    name: 'TikTok Ads',
    description: 'Monitor TikTok campaign performance and benchmark against industry standards.',
    icon: '/icons/tiktok-ads.svg',
    status: 'error',
    error: 'Token expired',
    platform: 'tiktok-ads' as const,
  },
  {
    name: 'Google Analytics 4',
    description: 'Import GA4 data to enrich your media mix analysis and attribution.',
    icon: '/icons/ga4.svg',
    status: 'disconnected',
    platform: 'ga4' as const,
  },
];

export default function IntegrationsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<typeof integrations[0]['platform'] | null>(null);

  const handleConnect = async () => {
    if (!selectedPlatform) return;
    
    // TODO: Implement OAuth flow
    console.log('Connecting to', selectedPlatform);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-gray-900">Integrations</h1>
            <p className="mt-2 text-sm text-gray-700">
              Connect your marketing platforms to start benchmarking performance and getting AI-powered recommendations.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {integrations.map((integration) => (
            <div key={integration.name} className="card">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="h-12 w-12"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {integration.name}
                    </h3>
                    <StatusBadge status={integration.status} />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {integration.description}
                  </p>
                  <div className="mt-4">
                    {integration.status === 'connected' ? (
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Last sync: {integration.lastSync}
                        </span>
                        <button className="text-sm text-[var(--bm-secondary-a)] hover:text-[var(--bm-secondary-b)]">
                          Sync now
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="btn-primary"
                        onClick={() => setSelectedPlatform(integration.platform)}
                      >
                        {integration.status === 'error' ? 'Reconnect' : 'Connect'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <IntegrationModal
        isOpen={!!selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
        platform={selectedPlatform || 'google-ads'}
        onConnect={handleConnect}
      />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'connected':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon />
          Connected
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircleIcon />
          Error
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Disconnected
        </span>
      );
  }
} 