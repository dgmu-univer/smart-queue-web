import Link from 'next/link';
import { Download } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-5 sm:px-8 sm:py-6">
        {/* Announcement pill */}
        <Link
          href="#"
          className="
            group border-border/60 inline-flex items-center gap-2 rounded-full border bg-white/70 py-1 pr-3 pl-1 text-xs shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:text-sm
          "
        >
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white sm:text-xs">
            v3.2 update
          </span>
          <span className="text-foreground/80 font-medium">AI filters are here!</span>
        </Link>

        {/* Right nav */}
        <nav className="flex items-center gap-3 text-sm sm:gap-5">
          <Link
            href="#"
            className="text-foreground/80 hover:text-foreground hidden font-medium transition-colors sm:inline-block"
          >
            Changelog
          </Link>
          <Link
            href="#"
            className="text-foreground/80 hover:text-foreground hidden font-medium transition-colors sm:inline-block"
          >
            Docs
          </Link>
          <span aria-hidden="true" className="bg-border hidden h-4 w-px sm:inline-block" />
          <Link
            href="#download"
            className="text-foreground hover:text-foreground/70 inline-flex items-center gap-1.5 rounded-md font-medium transition-colors"
          >
            <Download className="size-4" aria-hidden="true" />
            <span>Download</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
