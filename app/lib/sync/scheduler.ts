import { createClient } from '@/app/lib/supabase/client';
import { Platform } from '@/app/lib/supabase/schema';
import { GoogleAdsSyncEngine } from './google-ads';
import { MetaAdsSyncEngine } from './meta-ads';
import { TikTokAdsSyncEngine } from './tiktok-ads';
import { GA4SyncEngine } from './ga4';

const SYNC_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

interface SyncJob {
  platform: Platform;
  teamId: string;
  accountId: string;
  lastSync: Date;
}

export class SyncScheduler {
  private jobs: Map<string, SyncJob> = new Map();
  private isRunning: boolean = false;

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.scheduleNextSync();
  }

  stop() {
    this.isRunning = false;
  }

  private async scheduleNextSync() {
    if (!this.isRunning) return;

    try {
      const supabase = createClient();

      // Get all connected platform accounts
      const { data: accounts, error } = await supabase
        .from('oauth_accounts')
        .select('*')
        .eq('status', 'connected');

      if (error) throw error;

      // Schedule sync for each account
      for (const account of accounts || []) {
        const jobKey = `${account.team_id}-${account.platform}`;
        const existingJob = this.jobs.get(jobKey);

        if (!existingJob || Date.now() - existingJob.lastSync.getTime() >= SYNC_INTERVAL) {
          await this.syncPlatform(account.platform as Platform, account.team_id, account.account_id);
          this.jobs.set(jobKey, {
            platform: account.platform as Platform,
            teamId: account.team_id,
            accountId: account.account_id,
            lastSync: new Date(),
          });
        }
      }
    } catch (error) {
      console.error('Error in sync scheduler:', error);
    }

    // Schedule next check
    setTimeout(() => this.scheduleNextSync(), 60000); // Check every minute
  }

  private async syncPlatform(platform: Platform, teamId: string, accountId: string): Promise<void> {
    let syncEngine;

    switch (platform) {
      case 'google_ads':
        syncEngine = new GoogleAdsSyncEngine(teamId, accountId);
        break;
      case 'meta_ads':
        syncEngine = new MetaAdsSyncEngine(teamId, accountId);
        break;
      case 'tiktok_ads':
        syncEngine = new TikTokAdsSyncEngine(teamId, accountId);
        break;
      case 'ga4':
        syncEngine = new GA4SyncEngine(teamId, accountId);
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    try {
      await syncEngine.sync();
    } catch (error) {
      console.error(`Error syncing ${platform}:`, error);
      throw error;
    }
  }
} 