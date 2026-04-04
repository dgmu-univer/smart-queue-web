'use-client'

import { useLayout } from '@/components/providers/layout-provider'
import { PropsWithChildren } from 'react'

type SibeparWrapperProps = PropsWithChildren<unknown>

export function SibeparWrapper({ children }: SibeparWrapperProps) {
  const { collapsed, isMobile } = useLayout()

  if (!collapsed) {
    return (
      <div
        data-slot='sidebar'
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      data-slot='sidebar'
      className={cn(
        'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-collapsed-width) flex-col',
        className,
      )}
      {...props}
    >
      <div>
        dfsfsdfsdfsdfsdfsdf <div>sdfsdfsdf</div>
      </div>
      {children}
    </div>
  )
}
