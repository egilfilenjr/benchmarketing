import { Platform } from '@/app/lib/supabase/schema';

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
  redirectUri: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const oauthConfigs: Record<Platform, OAuthConfig> = {
  google_ads: {
    clientId: process.env.GOOGLE_ADS_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/adwords',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    redirectUri: `${baseUrl}/api/auth/google-ads/callback`,
  },
  meta_ads: {
    clientId: process.env.META_ADS_CLIENT_ID!,
    clientSecret: process.env.META_ADS_CLIENT_SECRET!,
    authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    scopes: [
      'ads_read',
      'ads_management',
      'business_management',
      'email',
    ],
    redirectUri: `${baseUrl}/api/auth/meta-ads/callback`,
  },
  tiktok_ads: {
    clientId: process.env.TIKTOK_ADS_CLIENT_ID!,
    clientSecret: process.env.TIKTOK_ADS_CLIENT_SECRET!,
    authorizationUrl: 'https://ads.tiktok.com/marketing_api/auth',
    tokenUrl: 'https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/',
    scopes: [
      'user.info.basic',
      'user.info.email',
      'advertiser.info.basic',
      'advertiser.info.stats',
    ],
    redirectUri: `${baseUrl}/api/auth/tiktok-ads/callback`,
  },
  ga4: {
    clientId: process.env.GA4_CLIENT_ID!,
    clientSecret: process.env.GA4_CLIENT_SECRET!,
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    redirectUri: `${baseUrl}/api/auth/ga4/callback`,
  },
}; 