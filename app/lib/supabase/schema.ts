export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Platform = 'google_ads' | 'meta_ads' | 'tiktok_ads' | 'ga4'
export type AccountStatus = 'active' | 'paused' | 'removed'
export type OAuthStatus = 'connected' | 'disconnected' | 'error'
export type SyncStatus = 'success' | 'error'

export interface Database {
  public: {
    Tables: {
      oauth_accounts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          team_id: string
          platform: Platform
          status: OAuthStatus
          access_token: string
          refresh_token: string
          expires_at: string
          error_message?: string
        }
        Insert: {
          user_id: string
          team_id: string
          platform: Platform
          status: OAuthStatus
          access_token: string
          refresh_token: string
          expires_at: string
          error_message?: string
        }
        Update: Partial<{
          status: OAuthStatus
          access_token: string
          refresh_token: string
          expires_at: string
          error_message?: string
        }>
      }
      google_ads_accounts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          team_id: string
          name: string
          customer_id: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }
        Insert: {
          team_id: string
          name: string
          customer_id: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }
        Update: Partial<{
          name: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }>
      }
      meta_ads_accounts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          team_id: string
          name: string
          account_id: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }
        Insert: {
          team_id: string
          name: string
          account_id: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }
        Update: Partial<{
          name: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }>
      }
      tiktok_ads_accounts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          team_id: string
          name: string
          advertiser_id: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }
        Insert: {
          team_id: string
          name: string
          advertiser_id: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }
        Update: Partial<{
          name: string
          status: AccountStatus
          currency_code: string
          time_zone: string
        }>
      }
      ga4_accounts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          team_id: string
          name: string
          property_id: string
          status: AccountStatus
          time_zone: string
        }
        Insert: {
          team_id: string
          name: string
          property_id: string
          status: AccountStatus
          time_zone: string
        }
        Update: Partial<{
          name: string
          status: AccountStatus
          time_zone: string
        }>
      }
      platform_data: {
        Row: {
          id: string
          created_at: string
          team_id: string
          platform: Platform
          account_id: string
          synced_at: string
          data: Json
          error_message?: string
        }
        Insert: {
          team_id: string
          platform: Platform
          account_id: string
          synced_at: string
          data: Json
          error_message?: string
        }
        Update: Partial<{
          synced_at: string
          data: Json
          error_message?: string
        }>
      }
      sync_logs: {
        Row: {
          id: string
          created_at: string
          team_id: string
          platform: Platform
          account_id: string
          status: SyncStatus
          error_message?: string
          duration_ms: number
        }
        Insert: {
          team_id: string
          platform: Platform
          account_id: string
          status: SyncStatus
          error_message?: string
          duration_ms: number
        }
        Update: Partial<{
          status: SyncStatus
          error_message?: string
          duration_ms: number
        }>
      }
      team_branding: {
        Row: {
          id: string
          team_id: string
          primary_color: string | null
          secondary_color: string | null
          accent_color: string | null
          logo_url: string | null
          favicon_url: string | null
          company_name: string | null
          support_email: string | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          primary_color?: string | null
          secondary_color?: string | null
          accent_color?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          company_name?: string | null
          support_email?: string | null
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          primary_color?: string | null
          secondary_color?: string | null
          accent_color?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          company_name?: string | null
          support_email?: string | null
          updated_at?: string
          created_at?: string
        }
      }
      recommendations: {
        Row: {
          id: string
          team_id: string
          type: string
          platform: string
          priority: string
          title: string
          description: string
          potential_impact: string
          suggested_actions: string[]
          created_at: string
          dismissed_at: string | null
        }
        Insert: {
          id?: string
          team_id: string
          type: string
          platform: string
          priority: string
          title: string
          description: string
          potential_impact: string
          suggested_actions: string[]
          created_at?: string
          dismissed_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          type?: string
          platform?: string
          priority?: string
          title?: string
          description?: string
          potential_impact?: string
          suggested_actions?: string[]
          created_at?: string
          dismissed_at?: string | null
        }
      }
      export_history: {
        Row: {
          id: string
          team_id: string
          format: string
          date_range: Json
          platforms: string[]
          metrics: string[]
          file_url: string
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          format: string
          date_range: Json
          platforms: string[]
          metrics: string[]
          file_url: string
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          format?: string
          date_range?: Json
          platforms?: string[]
          metrics?: string[]
          file_url?: string
          created_at?: string
        }
      }
      alert_rules: {
        Row: {
          id: string
          team_id: string
          metric: string
          condition: 'above' | 'below'
          threshold: number
          platform: string
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          team_id: string
          metric: string
          condition: 'above' | 'below'
          threshold: number
          platform: string
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          metric?: string
          condition?: 'above' | 'below'
          threshold?: number
          platform?: string
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          rule_id: string
          team_id: string
          metric: string
          value: number
          threshold: number
          platform: string
          status: 'active' | 'resolved'
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          rule_id: string
          team_id: string
          metric: string
          value: number
          threshold: number
          platform: string
          status?: 'active' | 'resolved'
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          rule_id?: string
          team_id?: string
          metric?: string
          value?: number
          threshold?: number
          platform?: string
          status?: 'active' | 'resolved'
          created_at?: string
          resolved_at?: string | null
        }
      }
      industry_benchmarks: {
        Row: {
          id: string
          industry: string
          metrics: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          industry: string
          metrics: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          industry?: string
          metrics?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 