import type { NextConfig } from 'next';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:4000';

const nextConfig: NextConfig = {
  /* Next.js 16 App Router Configuration */
   reactStrictMode: true,
  /* Performance Optimization */
    // Enable compression for better performance
  compress: true,
    
    /* Output Optimization */
    // On Windows the standalone build copies traced files which can include
    // filenames with characters (like `:`) that are invalid on NTFS. To avoid
    // build-time copyfile errors during local development on Windows, disable
    // the `standalone` output there. It will still be used on non-Windows
    // environments (CI / Linux containers) where filenames are supported.
  output: process.platform === 'win32' ? undefined : 'standalone',
  /* Cache Components - disabled for now to avoid incompatibilities with
   * route segment config (e.g. `export const dynamic = 'force-dynamic'`).
   * The project plans to enable Cache Components once all routes are
   * updated to the new caching primitives. See docs in .github for notes.
   */
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
        'recharts',
        'date-fns',
        'react-hook-form',
        '@hookform/resolvers',
      ],
  },
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
