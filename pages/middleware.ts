// Middleware for NextAuth.js authentication

export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    // Protected routes
    '/',
    '/api/:path*',
  ],
}