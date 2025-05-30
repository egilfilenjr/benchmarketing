import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { Platform } from '../lib/supabase/schema';

interface PlatformData {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  data: any;
  lastSynced: string | null;
}

interface PlatformDataPayload {
  data: any;
  synced_at: string;
}

export function usePlatformData(platform: Platform): PlatformData {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        // Check if platform is connected
        const { data: account, error: accountError } = await supabase
          .from('oauth_accounts')
          .select('status')
          .eq('platform', platform)
          .single();

        if (accountError) throw accountError;
        setIsConnected(account?.status === 'connected');

        if (account?.status === 'connected') {
          // Fetch latest platform data
          const { data: platformData, error: dataError } = await supabase
            .from('platform_data')
            .select('*')
            .eq('platform', platform)
            .order('synced_at', { ascending: false })
            .limit(1)
            .single();

          if (dataError) throw dataError;

          setData(platformData?.data || null);
          setLastSynced(platformData?.synced_at || null);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    // Subscribe to platform data changes
    const subscription = supabase
      .channel('platform_data_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'platform_data',
          filter: `platform=eq.${platform}`,
        },
        (payload: { new: PlatformDataPayload }) => {
          if (payload.new) {
            setData(payload.new.data);
            setLastSynced(payload.new.synced_at);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [platform]);

  return {
    isConnected,
    isLoading,
    error,
    data,
    lastSynced,
  };
} 