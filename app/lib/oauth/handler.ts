import { createClient } from '@/app/lib/supabase/client';
import { Platform, OAuthStatus } from '@/app/lib/supabase/schema';
import { oauthConfigs } from './config';

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function generateAuthUrl(platform: Platform, state: string): Promise<string> {
  const config = oauthConfigs[platform];
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scopes.join(' '),
    state,
  });

  return `${config.authorizationUrl}?${params.toString()}`;
}

export async function exchangeCodeForToken(
  platform: Platform,
  code: string
): Promise<OAuthTokenResponse> {
  const config = oauthConfigs[platform];
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUri,
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to exchange code for token: ${error.error_description || error.message}`);
  }

  return response.json();
}

export async function refreshAccessToken(
  platform: Platform,
  refreshToken: string
): Promise<OAuthTokenResponse> {
  const config = oauthConfigs[platform];
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to refresh token: ${error.error_description || error.message}`);
  }

  return response.json();
}

export async function saveOAuthToken(
  userId: string,
  teamId: string,
  platform: Platform,
  tokenResponse: OAuthTokenResponse
): Promise<void> {
  const supabase = createClient();
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + tokenResponse.expires_in);

  const { error } = await supabase
    .from('oauth_accounts')
    .upsert({
      user_id: userId,
      team_id: teamId,
      platform,
      status: 'connected' as OAuthStatus,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      expires_at: expiresAt.toISOString(),
    }, {
      onConflict: 'team_id,platform',
    });

  if (error) {
    throw new Error(`Failed to save OAuth token: ${error.message}`);
  }
}

export async function getValidAccessToken(
  teamId: string,
  platform: Platform
): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('oauth_accounts')
    .select('*')
    .eq('team_id', teamId)
    .eq('platform', platform)
    .single();

  if (error || !data) {
    throw new Error('No OAuth token found');
  }

  const expiresAt = new Date(data.expires_at);
  const now = new Date();

  // Refresh token if it expires in less than 5 minutes
  if (expiresAt.getTime() - now.getTime() < 5 * 60 * 1000) {
    try {
      const tokenResponse = await refreshAccessToken(platform, data.refresh_token);
      await saveOAuthToken(data.user_id, teamId, platform, tokenResponse);
      return tokenResponse.access_token;
    } catch (err) {
      // Update status to error if refresh fails
      await supabase
        .from('oauth_accounts')
        .update({
          status: 'error' as OAuthStatus,
          error_message: `Failed to refresh token: ${(err as Error).message}`,
        })
        .eq('team_id', teamId)
        .eq('platform', platform);
      throw err;
    }
  }

  return data.access_token;
} 