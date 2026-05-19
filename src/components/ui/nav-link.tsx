'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  exact = false,
  children,
  ...props
}: {
  href: string
  exact?: boolean
  className?: string
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  // const newClassName = isActive ? `${className ?? ''} active` : className

  return (
    <Link href={href} {...props} data-active={String(isActive)}>
      {children}
    </Link>
  );
}
