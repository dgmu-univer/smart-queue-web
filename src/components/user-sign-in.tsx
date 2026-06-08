'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CalendarClock, LayoutDashboard, User } from 'lucide-react';

export function UserSignIn() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (<div className="h-4 w-24 animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-800" />);
  }

  if (session?.user.role === 'ADMIN') {
    return (
      <Link
        href="/admin"
        className="text-foreground hover:text-foreground/70 inline-flex items-center gap-1.5 rounded-md font-medium transition-colors"
      >
        <LayoutDashboard className="size-4" aria-hidden="true" />
        <span>Панель управления</span>
      </Link>
    );
  }

  if (session?.user.role === 'OPERATOR') {
    return (
      <Link
        href="/schedule"
        className="text-foreground hover:text-foreground/70 inline-flex items-center gap-1.5 rounded-md font-medium transition-colors"
      >
        <CalendarClock className="size-4" aria-hidden="true" />
        <span>Календарь</span>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="text-foreground hover:text-foreground/70 inline-flex items-center gap-1.5 rounded-md font-medium transition-colors"
    >
      <User className="size-4" aria-hidden="true" />
      <span>Войти</span>
    </Link>
  );
}
