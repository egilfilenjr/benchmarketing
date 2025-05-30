import { Team } from '@/app/types';
import { createClient } from '@/app/lib/supabase/server';
import { hasFeature, getFeatureLimit } from './plans';
import { supabase } from '@/app/lib/supabase/client';

interface AlertRule {
  id: string;
  teamId: string;
  metric: string;
  condition: 'above' | 'below';
  threshold: number;
  platform: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Alert {
  id: string;
  ruleId: string;
  teamId: string;
  metric: string;
  value: number;
  threshold: number;
  platform: string;
  status: 'active' | 'resolved';
  createdAt: string;
  resolvedAt?: string;
}

export class AlertManager {
  async createRule(rule: Omit<AlertRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<AlertRule> {
    try {
      const { data, error } = await supabase
        .from('alert_rules')
        .insert({
          team_id: rule.teamId,
          metric: rule.metric,
          condition: rule.condition,
          threshold: rule.threshold,
          platform: rule.platform,
          enabled: rule.enabled,
        })
        .select()
        .single();

      if (error) throw error;
      return this.formatRule(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error creating alert rule:', error.message);
      throw error;
    }
  }

  async updateRule(id: string, updates: Partial<AlertRule>): Promise<AlertRule> {
    try {
      const { data, error } = await supabase
        .from('alert_rules')
        .update({
          metric: updates.metric,
          condition: updates.condition,
          threshold: updates.threshold,
          platform: updates.platform,
          enabled: updates.enabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return this.formatRule(data);
    } catch (err) {
      const error = err as Error;
      console.error('Error updating alert rule:', error.message);
      throw error;
    }
  }

  async deleteRule(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('alert_rules')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      const error = err as Error;
      console.error('Error deleting alert rule:', error.message);
      throw error;
    }
  }

  async getRules(teamId: string): Promise<AlertRule[]> {
    try {
      const { data, error } = await supabase
        .from('alert_rules')
        .select('*')
        .eq('team_id', teamId);

      if (error) throw error;
      return (data || []).map(this.formatRule);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching alert rules:', error.message);
      return [];
    }
  }

  async getAlerts(teamId: string, status?: 'active' | 'resolved'): Promise<Alert[]> {
    try {
      let query = supabase
        .from('alerts')
        .select('*')
        .eq('team_id', teamId);

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data || []).map(this.formatAlert);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching alerts:', error.message);
      return [];
    }
  }

  async checkMetrics(teamId: string): Promise<void> {
    try {
      // Get active rules
      const { data: rules, error: rulesError } = await supabase
        .from('alert_rules')
        .select('*')
        .eq('team_id', teamId)
        .eq('enabled', true);

      if (rulesError) throw rulesError;

      // Get latest platform data
      const { data: platformData, error: dataError } = await supabase
        .from('platform_data')
        .select('*')
        .eq('team_id', teamId)
        .order('synced_at', { ascending: false });

      if (dataError) throw dataError;

      // Check each rule against the data
      for (const rule of rules || []) {
        const relevantData = platformData?.find(d => d.platform === rule.platform);
        if (!relevantData) continue;

        const currentValue = relevantData.data.metrics?.[rule.metric] || 0;
        const threshold = rule.threshold;
        const condition = rule.condition;

        const isTriggered = condition === 'above' 
          ? currentValue > threshold
          : currentValue < threshold;

        if (isTriggered) {
          // Create or update alert
          await supabase
            .from('alerts')
            .upsert({
              rule_id: rule.id,
              team_id: teamId,
              metric: rule.metric,
              value: currentValue,
              threshold,
              platform: rule.platform,
              status: 'active',
            });
        } else {
          // Resolve any existing alerts for this rule
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
    } catch (err) {
      const error = err as Error;
      console.error('Error checking metrics:', error.message);
    }
  }

  async resolveAlert(teamId: string, alertId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
        })
        .eq('team_id', teamId)
        .eq('id', alertId);

      if (error) throw error;
    } catch (err) {
      const error = err as Error;
      console.error('Error resolving alert:', error.message);
      throw error;
    }
  }

  private formatRule(data: any): AlertRule {
    return {
      id: data.id,
      teamId: data.team_id,
      metric: data.metric,
      condition: data.condition,
      threshold: data.threshold,
      platform: data.platform,
      enabled: data.enabled,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }

  private formatAlert(data: any): Alert {
    return {
      id: data.id,
      ruleId: data.rule_id,
      teamId: data.team_id,
      metric: data.metric,
      value: data.value,
      threshold: data.threshold,
      platform: data.platform,
      status: data.status,
      createdAt: data.created_at,
      resolvedAt: data.resolved_at,
    };
  }
}

export async function createAlertRule(
  team: Team,
  rule: Omit<AlertRule, 'id' | 'teamId' | 'createdAt' | 'updatedAt'>
): Promise<AlertRule> {
  if (!hasFeature(team, 'alerts')) {
    throw new Error('Alerts feature not available on current plan');
  }

  const supabase = createClient();

  // Check alert rule limit
  const { data: existingRules } = await supabase
    .from('alert_rules')
    .select('id')
    .eq('team_id', team.id)
    .eq('enabled', true);

  const alertLimit = getFeatureLimit(team, 'alerts') || 0;
  if (existingRules && existingRules.length >= alertLimit) {
    throw new Error(`Alert rule limit (${alertLimit}) reached for current plan`);
  }

  // Create new alert rule
  const { data: newRule, error } = await supabase
    .from('alert_rules')
    .insert({
      team_id: team.id,
      metric: rule.metric,
      condition: rule.condition,
      threshold: rule.threshold,
      platform: rule.platform,
      enabled: rule.enabled,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return newRule;
}

export async function checkAlerts(team: Team): Promise<Alert[]> {
  if (!hasFeature(team, 'alerts')) {
    return [];
  }

  const supabase = createClient();

  // Get active alert rules
  const { data: rules } = await supabase
    .from('alert_rules')
    .select('*')
    .eq('team_id', team.id)
    .eq('enabled', true);

  if (!rules?.length) {
    return [];
  }

  // Get latest performance data
  const { data: performanceData } = await supabase
    .from('platform_data')
    .select('*')
    .eq('team_id', team.id)
    .order('synced_at', { ascending: false })
    .limit(1);

  if (!performanceData?.length) {
    return [];
  }

  const newAlerts: Alert[] = [];

  // Check each rule against current metrics
  for (const rule of rules) {
    const currentValue = performanceData[0].data.metrics[rule.metric];
    const thresholdBreached = rule.condition === 'above'
      ? currentValue > rule.threshold
      : currentValue < rule.threshold;

    if (thresholdBreached) {
      // Create new alert
      const { data: alert } = await supabase
        .from('alerts')
        .insert({
          rule_id: rule.id,
          team_id: team.id,
          metric: rule.metric,
          value: currentValue,
          threshold: rule.threshold,
          platform: rule.platform,
          status: 'active',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (alert) {
        newAlerts.push(alert);
      }
    }
  }

  return newAlerts;
}

export async function resolveAlert(team: Team, alertId: string): Promise<void> {
  if (!hasFeature(team, 'alerts')) {
    return;
  }

  const supabase = createClient();
  await supabase
    .from('alerts')
    .update({
      status: 'resolved',
      resolved_at: new Date().toISOString(),
    })
    .eq('team_id', team.id)
    .eq('id', alertId);
}

export async function getActiveAlerts(team: Team): Promise<Alert[]> {
  if (!hasFeature(team, 'alerts')) {
    return [];
  }

  const supabase = createClient();
  const { data: alerts } = await supabase
    .from('alerts')
    .select('*')
    .eq('team_id', team.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return alerts || [];
} 