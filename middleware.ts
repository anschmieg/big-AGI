import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Skip auth check for public paths
  if (
    req.nextUrl.pathname.startsWith('/auth/') ||
    req.nextUrl.pathname.startsWith('/api/auth/')
  ) {
    return NextResponse.next();
  }

  // Use getToken to retrieve the session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!auth|api|_next/static|_next/image|favicon.ico).*)',
  ],
};