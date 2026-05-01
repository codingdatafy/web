/**
 * @project CodingDatafy
 * @license MIT
 * @copyright 2026 CodingDatafy Organization
 * @author CodingDatafy Team
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. CORE & PERFORMANCE
  reactStrictMode: true,
  poweredByHeader: false,
  reactCompiler: false,
  cacheComponents: true,

  // 2. TURBOPACK CONFIGURATION
  turbopack: {
    resolveAlias: {
    },
  },

  // 3. ASSET TRACING
  outputFileTracingIncludes: {
    '/[[...slug]]': ['./content/**/*'],
  },

  // 4. IMAGE OPTIMIZATION
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 14400,
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },

  // 5. PROXY REWRITES & ANALYTICS
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/va/lib.js',
          destination: 'https://va.vercel-scripts.com/v1/script.js',
        },
        {
          source: '/va/:path*',
          destination: 'https://va.vercel-scripts.com/v1/:path*',
        },
      ],
    };
  },

  // 6. SECURITY HEADERS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=59' },
        ],
      },
    ];
  },
};

export default nextConfig;