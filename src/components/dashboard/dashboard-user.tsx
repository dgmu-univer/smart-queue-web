'use client';

import { useSession } from 'next-auth/react';
import { Bell, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DashboardUser() {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="hidden sm:inline-flex"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-9 rounded-full p-0"
            aria-label="Account menu"
          >
            <Avatar className="size-9">
              <AvatarImage src="/avatars/avatar-1.jpg" alt="Account" />
              <AvatarFallback><User className="size-4" /></AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{data?.fio}</span>
              <span className="text-muted-foreground text-xs font-normal">
                {data?.role}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <User className="size-4" />
              Профиль
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut className="size-4" />
            Выход
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
