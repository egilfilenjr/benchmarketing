import { NextRequest } from 'next/server';
import { exchangeCodeForToken } from '@/app/lib/oauth';
import { createClient } from '@/app/lib/supabase/server';
import { Platform } from '@/app/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: Platform } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const platform = params.platform;

    if (error) {
      return new Response(`Authentication failed: ${error}`, { status: 400 });
    }

    if (!code) {
      return new Response('No code provided', { status: 400 });
    }

    // Exchange the code for tokens
    const tokens = await exchangeCodeForToken(platform, code);

    // Get the user's session
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Store the tokens in the database
    const { error: dbError } = await supabase
      .from('oauth_accounts')
      .upsert({
        team_id: session.user.user_metadata.team_id,
        platform,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        status: 'connected',
        last_synced_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Failed to store tokens:', dbError);
      return new Response('Failed to store connection', { status: 500 });
    }

    // Redirect back to the integrations page
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/app/integrations?connected=true',
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return new Response('Internal server error', { status: 500 });
  }
} 