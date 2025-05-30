'use client';

import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { getOAuthUrl } from '@/app/lib/oauth';
import { Platform } from '@/app/types';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: Platform;
  onConnect: () => Promise<void>;
}

const PLATFORM_CONFIG = {
  'google-ads': {
    title: 'Connect Google Ads',
    description: 'Connect your Google Ads account to track campaign performance and ROI.',
    scopes: ['https://www.googleapis.com/auth/adwords'],
    steps: [
      'Select your Google Ads account',
      'Grant read access to campaign data',
      'Allow performance metrics sync'
    ]
  },
  'meta-ads': {
    title: 'Connect Meta Ads',
    description: 'Sync your Facebook and Instagram ad campaigns for cross-channel insights.',
    scopes: ['ads_read', 'ads_management'],
    steps: [
      'Choose your Meta Business account',
      'Select ad accounts to connect',
      'Enable campaign data access'
    ]
  },
  'tiktok-ads': {
    title: 'Connect TikTok Ads',
    description: 'Monitor TikTok campaign performance and benchmark against industry standards.',
    scopes: ['analytics.read', 'campaigns.read'],
    steps: [
      'Sign in to TikTok Ads Manager',
      'Select advertising accounts',
      'Authorize data access'
    ]
  },
  'ga4': {
    title: 'Connect Google Analytics 4',
    description: 'Import GA4 data to enrich your media mix analysis and attribution.',
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    steps: [
      'Choose your GA4 property',
      'Grant read access to analytics',
      'Select data streams'
    ]
  }
} as const;

export function IntegrationModal({ isOpen, onClose, platform, onConnect }: IntegrationModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const config = PLATFORM_CONFIG[platform];

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Get the OAuth URL and redirect to it
      const oauthUrl = getOAuthUrl(platform);
      window.location.href = oauthUrl;
    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnecting(false);
      // TODO: Show error toast
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={config.title}>
      <div className="space-y-6">
        <p className="text-sm text-gray-500">{config.description}</p>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Required Access</h4>
          <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
            {config.scopes.map((scope) => (
              <li key={scope}>{scope}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Connection Steps</h4>
          <ol className="text-sm text-gray-500 list-decimal pl-5 space-y-2">
            {config.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex justify-end gap-x-3">
          <button
            type="button"
            className="text-sm font-semibold text-gray-900 hover:text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary inline-flex items-center"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Connect Platform
          </button>
        </div>
      </div>
    </Modal>
  );
} 