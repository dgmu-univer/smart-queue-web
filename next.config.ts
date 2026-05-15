import type { NextConfig } from 'next';

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:4000';

// Адрес бэкенда для rewrite.
// Локально: указываем на продакшен бэкенд через NEXT_PUBLIC_API_URL.
// На проде: rewrite не нужен — nginx сам проксирует /api/* на backend:8080.
const DEV_API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://price05.ru';

const nextConfig: NextConfig = {
  /* Next.js 16 App Router Configuration */
  reactStrictMode: true,
  compress: true,

  output: process.platform === 'win32' ? undefined : 'standalone',

  cacheComponents: false,

  /* TypeScript Configuration */
  typescript: {
    ignoreBuildErrors: false,
  },

  /*
   * Rewrite работает только локально.
   * Браузер делает запрос на localhost:3000/api/*,
   * Next.js проксирует его на price05.ru на серверной стороне.
   * Кука SESSION передаётся через proxy.ts (из NextAuth JWT).
   * /api/auth/* исключается — это NextAuth.
   */
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    return [
      {
        source: '/api/((?!auth/).*)',
        destination: `${DEV_API_URL}/api/$1`,
      },
    ];
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-icons',
      'lucide-react',
      'date-fns',
      'react-hook-form',
      '@hookform/resolvers',
    ],
  },
};

export default nextConfig;
