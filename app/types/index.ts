export type Platform = 'google-ads' | 'meta-ads' | 'tiktok-ads' | 'ga4';

export interface OAuthToken {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export interface Integration {
  id: string;
  platform: Platform;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  error?: string;
  accountId: string;
  accountName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'pro_plus' | 'agency';
  industry: string;
  demoMode: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  teamId: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
} 