'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CalendarClock, LayoutDashboard, User } from 'lucide-react';

export function UserSignLink() {
  const { data: session } = useSession();

  if (session?.user.role === 'ADMIN') {
    return (
      <Link
        href="/dashboard"
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
        href="/booking"
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
