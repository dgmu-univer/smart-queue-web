'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { AppIcon } from '../app-icon';
import { DashboardUser } from './dashboard-user';

const navLinks = [
  { href: '/dashboard', label: 'Управление' },
  // { href: '/dashboard', label: 'Projects' },
  // { href: '/dashboard', label: 'Library' },
  // { href: '/dashboard', label: 'Billing' },
];

export function DashboardNav() {
  return (
    <header className="border-border/60 bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-background flex size-8 items-center justify-center rounded-lg bg-blue-600">
              <AppIcon width={23} height={23} />
            </span>
            <span className="text-sm font-semibold tracking-tight">ДГМУ</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navLinks.map(link => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <DashboardUser />
      </div>

      <div className="border-border/60 border-t md:hidden">
        <NavigationMenu className="mx-auto max-w-full px-2">
          <NavigationMenuList className="flex w-full justify-start gap-0 overflow-x-auto py-1">
            {navLinks.map(link => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
