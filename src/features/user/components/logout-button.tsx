'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/old/button';
import { authApi } from '@/features/auth/api';
import { CURRENT_USER_QUERY_KEY } from '../hooks/use-current-user';

export function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Even if the request fails, clear local state and redirect
    } finally {
      queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      queryClient.clear();
      router.push('/login');
      router.refresh();
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
      className="gap-2 text-muted-foreground hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
      {isLoading ? 'Выход...' : 'Выйти'}
    </Button>
  );
}
