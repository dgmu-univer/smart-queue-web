import type { NextConfig } from 'next';

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
