// Middleware for NextAuth.js authentication
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Skip auth check for public paths
  if (req.nextUrl.pathname.startsWith('/auth/') ||
    req.nextUrl.pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  const token = req.cookies.get('next-auth.session-token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude public paths from middleware
    '/((?!auth|api|_next/static|_next/image|favicon.ico).*)',
  ],
};