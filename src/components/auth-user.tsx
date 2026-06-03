'use client';

import { signOut, useSession } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AuthUser() {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-9 rounded-full p-0"
            aria-label="Account menu"
          >
            <Avatar className="size-9">
              {/* <AvatarImage src="/avatars/avatar-1.jpg" alt="Account" /> */}
              <AvatarFallback><User className="size-4" /></AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{data?.user.fio}</span>
              <span className="text-muted-foreground text-xs font-normal">
                {data?.user.role === 'ADMIN' ? 'АДМИНИСТРАТОР' : 'ОПЕРАТОР'}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => void signOut()}>
            <LogOut className="size-4" />
            Выход
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
