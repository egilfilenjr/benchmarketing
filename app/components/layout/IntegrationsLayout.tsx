import { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

interface IntegrationsLayoutProps {
  children: ReactNode;
}

const integrationTabs = [
  { id: 'google-ads', label: 'Google Ads' },
  { id: 'meta-ads', label: 'Meta Ads' },
  { id: 'tiktok-ads', label: 'TikTok Ads' },
  { id: 'ga4', label: 'GA4' },
] as const;

type IntegrationTab = typeof integrationTabs[number]['id'];

export default function IntegrationsLayout({ children }: IntegrationsLayoutProps) {
  const router = useRouter();
  const pathname = usePathname() || '/integrations/google-ads';
  const currentTab = (pathname.split('/').pop() || 'google-ads') as IntegrationTab;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your marketing platforms to get insights and recommendations.
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={(value: IntegrationTab) => router.push(`/integrations/${value}`)}>
        <TabsList className="grid grid-cols-4 w-full">
          {integrationTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {children}
      </div>
    </div>
  );
} 