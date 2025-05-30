import { NextRequest, NextResponse } from 'next/server';
import { generateAuthUrl } from '@/app/lib/oauth/handler';
import { getAuthenticatedUser } from '../middleware';

export async function GET(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const state = Buffer.from(JSON.stringify({
      userId: auth.user.id,
      teamId: auth.teamId,
      platform: 'tiktok_ads',
    })).toString('base64');

    const authUrl = await generateAuthUrl('tiktok_ads', state);
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.redirect(new URL('/integrations/tiktok-ads?error=auth_failed', request.url));
  }
} 