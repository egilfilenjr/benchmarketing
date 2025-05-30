import { createClient } from '@/app/lib/supabase/client';
import { Platform, SyncStatus } from '@/app/lib/supabase/schema';
import { getValidAccessToken } from '@/app/lib/oauth/handler';

export interface SyncResult {
  success: boolean;
  error?: string;
  data?: any;
}

export abstract class BaseSyncEngine {
  protected teamId: string;
  protected platform: Platform;
  protected accountId: string;

  constructor(teamId: string, platform: Platform, accountId: string) {
    this.teamId = teamId;
    this.platform = platform;
    this.accountId = accountId;
  }

  abstract fetchData(accessToken: string): Promise<any>;

  async sync(): Promise<void> {
    const startTime = Date.now();
    const supabase = createClient();

    try {
      const accessToken = await getValidAccessToken(this.teamId, this.platform);
      const data = await this.fetchData(accessToken);

      await supabase.from('platform_data').upsert({
        team_id: this.teamId,
        platform: this.platform,
        account_id: this.accountId,
        synced_at: new Date().toISOString(),
        data,
      });

      await this.logSync('success', startTime);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(`Sync error for ${this.platform}:`, errorMessage);

      await supabase.from('platform_data').upsert({
        team_id: this.teamId,
        platform: this.platform,
        account_id: this.accountId,
        synced_at: new Date().toISOString(),
        error_message: errorMessage,
      });

      await this.logSync('error', startTime, errorMessage);
      throw error;
    }
  }

  private async logSync(status: SyncStatus, startTime: number, errorMessage?: string): Promise<void> {
    const supabase = createClient();
    const duration = Date.now() - startTime;

    await supabase.from('sync_logs').insert({
      team_id: this.teamId,
      platform: this.platform,
      account_id: this.accountId,
      status,
      error_message: errorMessage,
      duration_ms: duration,
    });
  }
} 