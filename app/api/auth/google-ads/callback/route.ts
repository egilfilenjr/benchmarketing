import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, saveOAuthToken } from '@/app/lib/oauth/handler';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/integrations/google-ads?error=auth_failed', request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL('/integrations/google-ads?error=invalid_request', request.url));
  }

  try {
    const { userId, teamId } = JSON.parse(Buffer.from(state, 'base64').toString());
    const tokenResponse = await exchangeCodeForToken('google_ads', code);
    await saveOAuthToken(userId, teamId, 'google_ads', tokenResponse);

    return NextResponse.redirect(new URL('/integrations/google-ads?success=true', request.url));
  } catch (error) {
    console.error('Error handling callback:', error);
    return NextResponse.redirect(new URL('/integrations/google-ads?error=auth_failed', request.url));
  }
} 