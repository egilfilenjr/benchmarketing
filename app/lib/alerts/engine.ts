import { createClient } from '../supabase/client';
import { Platform } from '../supabase/schema';

interface AlertRule {
  id: string;
  teamId: string;
  metric: string;
  condition: 'above' | 'below';
  threshold: number;
  platform: Platform;
  enabled: boolean;
}

export class AlertEngine {
  private teamId: string;

  constructor(teamId: string) {
    this.teamId = teamId;
  }

  async checkAlerts(): Promise<void> {
    const supabase = createClient();

    // Get active alert rules
    const { data: rules } = await supabase
      .from('alert_rules')
      .select('*')
      .eq('team_id', this.teamId)
      .eq('enabled', true);

    if (!rules) return;

    // Check each rule against latest data
    for (const rule of rules) {
      const { data: latestData } = await supabase
        .from('platform_data')
        .select('*')
        .eq('platform', rule.platform)
        .eq('team_id', this.teamId)
        .order('synced_at', { ascending: false })
        .limit(1)
        .single();

      if (!latestData?.data) continue;

      const value = latestData.data[rule.metric];
      const threshold = rule.threshold;
      const isTriggered = rule.condition === 'above' 
        ? value > threshold
        : value < threshold;

      if (isTriggered) {
        // Check if alert already exists
        const { data: existingAlert } = await supabase
          .from('alerts')
          .select('*')
          .eq('rule_id', rule.id)
          .eq('status', 'active')
          .single();

        if (!existingAlert) {
          // Create new alert
          await supabase.from('alerts').insert({
            rule_id: rule.id,
            team_id: this.teamId,
            metric: rule.metric,
            value,
            threshold,
            platform: rule.platform,
            status: 'active',
          });

          // Send notification (implement your notification system here)
          await this.sendNotification({
            title: `Alert: ${rule.metric} ${rule.condition} ${threshold}`,
            message: `Your ${rule.platform} metric ${rule.metric} is ${rule.condition} the threshold of ${threshold} (current value: ${value})`,
            type: 'alert',
          });
        }
      } else {
        // Resolve any active alerts for this rule
        await supabase
          .from('alerts')
          .update({ 
            status: 'resolved',
            resolved_at: new Date().toISOString(),
          })
          .eq('rule_id', rule.id)
          .eq('status', 'active');
      }
    }
  }

  private async sendNotification(notification: {
    title: string;
    message: string;
    type: 'alert' | 'info';
  }): Promise<void> {
    const supabase = createClient();

    // Get team notification settings
    const { data: team } = await supabase
      .from('teams')
      .select('notification_email, notification_webhook')
      .eq('id', this.teamId)
      .single();

    if (!team) return;

    // Send email notification
    if (team.notification_email) {
      // Implement email sending logic
      // You can use services like SendGrid, AWS SES, etc.
    }

    // Send webhook notification
    if (team.notification_webhook) {
      try {
        await fetch(team.notification_webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: notification.title,
            message: notification.message,
            type: notification.type,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Failed to send webhook notification:', error);
      }
    }
  }
} 