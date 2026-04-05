'use client'

import { useState } from 'react'

import { Building2, Store } from 'lucide-react'

import { Button } from '@/components/ui/old/button'
import { cn } from '@/lib/utils'

import type { UserRole } from '../types'

interface RoleStepProps {
  phone: string
  onSuccess: () => void
  onBack: () => void
  onRegister: (role: UserRole) => Promise<void>
  isLoading: boolean
}

const roles: {
  value: UserRole
  label: string
  description: string
  icon: React.ReactNode
}[] = [
  {
    value: 'SUPPLIER',
    label: 'Поставщик',
    description: 'Поставляю товары оптом для магазинов и других предприятий',
    icon: <Building2 className='h-8 w-8' />,
  },
  {
    value: 'STORE',
    label: 'Магазин',
    description:
      'Закупаю товары у поставщиков для продажи конечным покупателям',
    icon: <Store className='h-8 w-8' />,
  },
]

export function RoleStep({
  phone,
  onSuccess,
  onBack,
  onRegister,
  isLoading,
}: RoleStepProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Выберите роль для продолжения')
      return
    }
    setError(null)
    try {
      await onRegister(selectedRole)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    }
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold tracking-tight'>Регистрация</h1>
        <p className='text-muted-foreground text-sm'>
          Номер <span className='text-foreground font-medium'>{phone}</span> не
          зарегистрирован. Выберите вашу роль.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {roles.map((role) => (
          <button
            key={role.value}
            type='button'
            onClick={() => {
              setSelectedRole(role.value)
              setError(null)
            }}
            className={cn(
              'hover:border-primary/60 hover:bg-accent focus-visible:ring-ring relative flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              selectedRole === role.value
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-card text-card-foreground',
            )}
          >
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-full transition-colors',
                selectedRole === role.value
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {role.icon}
            </div>
            <div className='space-y-1'>
              <p className='font-semibold'>{role.label}</p>
              <p className='text-muted-foreground text-xs leading-relaxed'>
                {role.description}
              </p>
            </div>
            {selectedRole === role.value && (
              <span className='bg-primary text-primary-foreground absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {error && <p className='text-destructive text-center text-sm'>{error}</p>}

      <div className='space-y-3'>
        <Button
          type='button'
          className='w-full'
          size='lg'
          onClick={handleSubmit}
          disabled={isLoading || !selectedRole}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
        <Button
          type='button'
          variant='ghost'
          className='w-full'
          onClick={onBack}
          disabled={isLoading}
        >
          ← Назад
        </Button>
      </div>
    </div>
  )
}
