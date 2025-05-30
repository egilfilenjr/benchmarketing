import { Platform } from '@/app/types';

const OAUTH_CONFIG = {
  'google-ads': {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/adwords'],
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  'meta-ads': {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    scopes: ['ads_read', 'ads_management'],
    clientId: process.env.NEXT_PUBLIC_META_CLIENT_ID,
    clientSecret: process.env.META_CLIENT_SECRET,
  },
  'tiktok-ads': {
    authUrl: 'https://ads.tiktok.com/marketing_api/auth',
    tokenUrl: 'https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/',
    scopes: ['analytics.read', 'campaigns.read'],
    clientId: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
  },
  'ga4': {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
} as const;

export function getOAuthUrl(platform: Platform) {
  const config = OAUTH_CONFIG[platform];
  const redirectUri = `${window.location.origin}/api/oauth/callback/${platform}`;
  
  const params = new URLSearchParams({
    client_id: config.clientId || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: config.scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });

  return `${config.authUrl}?${params.toString()}`;
}

export async function exchangeCodeForToken(platform: Platform, code: string) {
  const config = OAUTH_CONFIG[platform];
  const redirectUri = `${window.location.origin}/api/oauth/callback/${platform}`;

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.clientId || '',
      client_secret: config.clientSecret || '',
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
}

export async function refreshAccessToken(platform: Platform, refreshToken: string) {
  const config = OAUTH_CONFIG[platform];

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.clientId || '',
      client_secret: config.clientSecret || '',
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  return response.json();
} 