import { Database as DatabaseGenerated } from './types.generated';

export type Database = DatabaseGenerated;

export interface Tables {
  oauth_accounts: {
    team_id: string;
    platform: string;
    access_token: string;
    refresh_token?: string;
    status: 'connected' | 'disconnected' | 'error';
    last_synced_at?: string;
    error_message?: string;
  };
  platform_data: {
    team_id: string;
    platform: string;
    data: Record<string, any>;
    synced_at: string;
  };
  team_branding: {
    team_id: string;
    primary_color?: string;
    secondary_color?: string;
    accent_color?: string;
    logo_url?: string;
    favicon_url?: string;
    company_name?: string;
    support_email?: string;
    updated_at: string;
  };
  recommendations: {
    team_id: string;
    type: string;
    platform: string;
    priority: string;
    title: string;
    description: string;
    potential_impact: string;
    suggested_actions: string[];
    created_at: string;
    dismissed_at?: string;
  };
  export_history: {
    team_id: string;
    format: string;
    date_range: {
      start: string;
      end: string;
    };
    platforms: string[];
    metrics: string[];
    file_url: string;
    created_at: string;
  };
  alert_rules: {
    team_id: string;
    metric: string;
    condition: 'above' | 'below';
    threshold: number;
    platform: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
  };
  alerts: {
    rule_id: string;
    team_id: string;
    metric: string;
    value: number;
    threshold: number;
    platform: string;
    status: 'active' | 'resolved';
    created_at: string;
    resolved_at?: string;
  };
  industry_benchmarks: {
    industry: string;
    metrics: {
      ctr: number;
      cpc: number;
      conversion_rate: number;
      roas: number;
    };
  };
} 