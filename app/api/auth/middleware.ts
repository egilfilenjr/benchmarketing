import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function getAuthenticatedUser(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data: team } = await supabase
    .from('teams')
    .select('id')
    .eq('user_id', session.user.id)
    .single();

  if (!team) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return {
    user: session.user,
    teamId: team.id,
  };
} 