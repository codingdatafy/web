/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * CODINGDATAFY PROXY
 * This handles network boundaries, security, and IP synchronization.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || 'www.codingdatafy.com';

  // 1. DIRECTORY & CONTENT PRIVACY SHIELD
  if (
    pathname.endsWith('.md') || 
    pathname.startsWith('/content/') || 
    pathname.includes('/_sidebar')
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // 2. VERCEL ANALYTICS PROXY SYNC
  if (pathname.startsWith('/va/')) {
    const response = NextResponse.next();
    response.headers.set('x-forwarded-host', hostname);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  // 3. CLOUDFLARE VISITOR IP SYNCHRONIZATION
  const response = NextResponse.next();
  const cfIp = request.headers.get('cf-connecting-ip');
  
  if (cfIp) {
    response.headers.set('x-real-ip', cfIp);
    response.headers.set('x-forwarded-for', cfIp);
  }

  // 4. GLOBAL SECURITY & SEO HEADERS
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Robots-Tag', 'index, follow');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

/**
 * ROUTE MATCHER CONFIGURATION
 */
export const config = {
  matcher: [
    /*
     * Optimized Matcher for Next.js 16:
     * - Matches all page routes and the analytics proxy.
     * - Skips internal paths, static files, and API routes.
     */
    '/((?!api|_next|_vercel|[\\w-]+\\.\\w+).*)',
    '/va/:path*',
  ],
};