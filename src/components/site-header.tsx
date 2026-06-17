import Link from 'next/link';

import { UserSignIn } from './user-sign-in';

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-5 sm:px-8 sm:py-6">
        {/* Announcement pill */}
        <Link
          href="https://www.dgmu.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group border-border/60 inline-flex items-center gap-2 rounded-full border bg-white/70 py-1 pr-3 pl-1 text-xs shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:text-sm
          "
        >
          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white sm:text-xs">
            ДГМУ
          </span>
          <span className="text-foreground/80 font-medium md:inline-flex">Официальный сайт</span>
        </Link>

        {/* Right nav */}
        <nav className="flex items-center gap-3 text-sm sm:gap-5">
          <Link
            href="https://xn--e1afnjf.xn--c1abz2a.xn--p1ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-foreground inline-block font-medium transition-colors"
          >
            Приемная комиссия
          </Link>
          <span aria-hidden="true" className="bg-border hidden h-4 w-px sm:inline-block" />
          <UserSignIn />
        </nav>
      </div>
    </header>
  );
}
