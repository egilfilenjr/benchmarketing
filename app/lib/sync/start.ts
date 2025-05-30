import { SyncScheduler } from './scheduler';

let scheduler: SyncScheduler | null = null;

export function startSyncScheduler() {
  if (scheduler) return;
  
  scheduler = new SyncScheduler();
  scheduler.start();

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Stopping sync scheduler...');
    scheduler?.stop();
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT. Stopping sync scheduler...');
    scheduler?.stop();
    process.exit(0);
  });
}

export function stopSyncScheduler() {
  if (!scheduler) return;
  
  scheduler.stop();
  scheduler = null;
} 