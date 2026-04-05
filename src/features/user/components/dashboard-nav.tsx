'use client'

import { useRouter } from 'next/navigation'

import { useQueryClient } from '@tanstack/react-query'
import { LogOut, ShoppingBag } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/old/button'
import type { User } from '@/features/auth/types'
import { CURRENT_USER_QUERY_KEY } from '@/features/user/hooks/use-current-user'
import { api } from '@/lib/api'

interface DashboardNavProps {
  user: User
}

const roleLabels: Record<User['role'], string> = {
  SUPPLIER: 'Поставщик',
  STORE: 'Магазин',
}

export function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  async function handleLogout() {
    try {
      await api('/auth/logout', { method: 'POST' })
    } catch {
      // Even if request fails — clear local state and redirect
    } finally {
      queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY })
      router.push('/login')
    }
  }

  return (
    <header className='border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <ShoppingBag className='text-primary h-6 w-6' />
          <span className='text-lg font-bold tracking-tight'>OptPrice</span>
        </div>

        {/* User info + logout */}
        <div className='flex items-center gap-4'>
          <div className='hidden flex-col items-end sm:flex'>
            <span className='text-sm leading-none font-medium'>
              {user.phone}
            </span>
            <span className='text-muted-foreground mt-0.5 text-xs'>
              {user.profileIsComplete
                ? 'Профиль заполнен'
                : 'Профиль не заполнен'}
            </span>
          </div>

          <Badge variant={user.role === 'SUPPLIER' ? 'default' : 'secondary'}>
            {roleLabels[user.role]}
          </Badge>

          <Button
            variant='ghost'
            size='sm'
            onClick={handleLogout}
            className='text-muted-foreground hover:text-foreground gap-2'
            aria-label='Выйти'
          >
            <LogOut className='h-4 w-4' />
            <span className='hidden sm:inline'>Выйти</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
