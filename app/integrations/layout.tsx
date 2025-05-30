'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

const INTEGRATION_TABS = [
  { id: 'google-ads', name: 'Google Ads', path: '/integrations/google-ads' },
  { id: 'meta-ads', name: 'Meta Ads', path: '/integrations/meta-ads' },
  { id: 'tiktok-ads', name: 'TikTok Ads', path: '/integrations/tiktok-ads' },
  { id: 'ga4', name: 'Google Analytics 4', path: '/integrations/ga4' },
];

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = INTEGRATION_TABS.find(tab => pathname?.startsWith(tab.path))?.id || 'google-ads';

  const handleTabChange = (value: string) => {
    const tab = INTEGRATION_TABS.find(t => t.id === value);
    if (tab) {
      router.push(tab.path);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Platform Integrations</h1>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 gap-4">
          {INTEGRATION_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center space-x-2 px-4 py-2"
            >
              <img
                src={`/icons/${tab.id}.svg`}
                alt={tab.name}
                className="w-5 h-5"
              />
              <span>{tab.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
} 