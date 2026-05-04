import React from 'react';

import { Hero } from '@/components/hero';
import { SiteHeader } from '@/components/site-header';
import { SocialProof } from '@/components/social-proof';

export default function RootPage() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,#fde8ef_0%,#fff5e6_28%,#eef3ff_58%,#ffffff_85%)]"
      />
      {/* Subtle accent blobs for extra depth */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -top-24 left-1/2 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,200,210,0.55),rgba(255,200,210,0)_70%)]
          blur-2xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute top-40 right-[-10%] -z-10 hidden h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(190,210,255,0.5),rgba(190,210,255,0)_70%)] blur-2xl
          sm:block
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute top-72 left-[-10%] -z-10 hidden h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,225,180,0.45),rgba(255,225,180,0)_70%)] blur-2xl
          sm:block
        "
      />

      <SiteHeader />
      <Hero />
      <SocialProof />
    </main>
  );
}
