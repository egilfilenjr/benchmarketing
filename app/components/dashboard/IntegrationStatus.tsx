'use client';

import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';

interface Integration {
  platform: string;
  status: 'connected' | 'disconnected' | 'error';
  last_synced_at: string | null;
}

interface IntegrationStatusProps {
  integrations: Integration[];
}

const PLATFORMS = {
  google_ads: {
    name: 'Google Ads',
    icon: '/icons/google-ads.svg'
  },
  meta_ads: {
    name: 'Meta Ads',
    icon: '/icons/meta-ads.svg'
  },
  tiktok_ads: {
    name: 'TikTok Ads',
    icon: '/icons/tiktok-ads.svg'
  },
  ga4: {
    name: 'Google Analytics 4',
    icon: '/icons/ga4.svg'
  }
};

export default function IntegrationStatus({ integrations }: IntegrationStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getLastSyncText = (lastSyncedAt: string | null) => {
    if (!lastSyncedAt) return 'Never synced';
    return `Last synced ${formatDistanceToNow(new Date(lastSyncedAt))} ago`;
  };

  return (
    <>
      {Object.entries(PLATFORMS).map(([platform, info]) => {
        const integration = integrations.find(i => i.platform === platform) || {
          platform,
          status: 'disconnected',
          last_synced_at: null
        };

        return (
          <div key={platform} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={info.icon}
              alt={info.name}
              className="w-8 h-8"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {info.name}
              </p>
              <p className="text-sm text-gray-500">
                {getLastSyncText(integration.last_synced_at)}
              </p>
            </div>
            {getStatusIcon(integration.status)}
          </div>
        );
      })}
    </>
  );
} 