import { Aperture, Apple } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pt-8 pb-12 text-center sm:py-16">
      {/* App icon */}
      <div className="flex size-16 items-center justify-center rounded-2xl bg-neutral-900 shadow-lg ring-1 shadow-neutral-900/20 ring-black/10 sm:size-[72px]">
        <Aperture className="size-8 text-white sm:size-9" strokeWidth={2} aria-hidden="true" />
      </div>

      {/* Brand */}
      <p className="text-foreground mt-4 text-base font-bold tracking-tight sm:text-lg">PhotoPro</p>

      {/* Handwriting tagline */}
      <p className="font-handwriting mt-2 text-2xl text-blue-600 sm:text-[28px]">
        The last photo editor you&apos;ll ever need.
      </p>

      {/* Headline */}
      <h1 className="text-foreground mt-7 text-4xl leading-[1.05] font-extrabold tracking-tight text-pretty sm:mt-10 sm:text-6xl">
        Transform your photos into stunning masterpieces
        {' '}
        <span className="underline decoration-blue-600 decoration-[3px] underline-offset-[6px] sm:decoration-4 sm:underline-offset-8">
          instantly
        </span>
        .
      </h1>

      {/* Description */}
      <p className="text-muted-foreground mt-5 max-w-xl text-[15px] leading-relaxed text-pretty sm:mt-6 sm:text-base">
        PhotoPro is your AI-powered photo editing companion that brings professional-grade filters, effects, and
        enhancements right to your fingertips. Create magazine-quality photos in seconds.
      </p>

      {/* CTA with peach glow */}
      <div id="download" className="relative mt-8 sm:mt-10">
        {/* Soft peach glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 -z-10 mx-auto h-44 w-72 -translate-y-6 rounded-full bg-[radial-gradient(closest-side,rgba(255,168,140,0.55),rgba(255,168,140,0)_70%)] blur-xl sm:h-52
            sm:w-96
          "
        />
        <a
          href="/"
          className="
            inline-flex items-center gap-2.5 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg ring-1 shadow-neutral-900/20 ring-black/10 transition-transform
            hover:scale-[1.02] active:scale-[0.99] sm:px-7 sm:py-4 sm:text-base
          "
        >
          <Apple className="size-5 fill-white" aria-hidden="true" />
          <span>Download MacOS App</span>
        </a>
        <p className="text-muted-foreground mt-3 text-xs sm:text-sm">Apple Silicon &amp; Intel · macOS 11+</p>
      </div>
    </section>
  );
}
