'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

import { AuthUser } from '@/components/auth-user';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Статистика', href: '/admin' },
  { label: 'Абитуриенты', href: '/admin/applicants' },
  { label: 'Заявки', href: '/admin/applications' },
  { label: 'Уровни образования', href: '/admin/education-levels' },
  { label: 'Настройки', href: '/admin/settings' },
];

export function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        {/* Logo */}
        <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
          <div className="bg-primary flex size-7 items-center justify-center rounded-md">
            <GraduationCap className="text-primary-foreground size-4" />
          </div>
          <span className="text-foreground text-sm font-semibold">
            Панель управления
          </span>
        </Link>

        <Separator orientation="vertical" className="h-5" />

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive
              = link.href === '/admin'
                ? pathname === '/admin'
                : pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="ml-auto">
          <AuthUser />
        </div>
      </div>
    </header>
  );
}
