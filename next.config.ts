import type { NextConfig } from 'next';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:4000';

const nextConfig: NextConfig = {
  output: 'standalone',
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
