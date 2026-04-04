'use client'

import * as React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

const SIDEBAR_COOKIE_NAME = 'sidebar_collapsed'
const COOKIE_MAX_AGE = 604800 // 7 days

export interface LayoutContextValue {
  /** Whether the sidebar is collapsed (icon-only mode) */
  collapsed: boolean
  /** Set collapsed state */
  setCollapsed: (collapsed: boolean) => void
  /** Toggle collapsed state */
  toggleCollapsed: () => void
  /** Whether running on mobile viewport */
  isMobile: boolean
  /** Whether mobile sidebar sheet is open */
  mobileSidebarOpen: boolean
  /** Set mobile sidebar open state */
  setMobileSidebarOpen: (open: boolean) => void
  /** Toggle sidebar: on mobile toggles sheet, on desktop toggles collapsed */
  toggleSidebar: () => void
}

const LayoutContext = React.createContext<LayoutContextValue | null>(null)

function readCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(
    new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'),
  )
  return match ? decodeURIComponent(match[1]) : undefined
}

function setCookieValue(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${COOKIE_MAX_AGE}`
}

interface LayoutProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
}

export function LayoutProvider({
  children,
  defaultCollapsed = false,
}: LayoutProviderProps) {
  const isMobile = useIsMobile()
  const [collapsed, setCollapsedState] = React.useState(defaultCollapsed)
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)

  // Read initial collapsed state from cookie on mount
  React.useEffect(() => {
    const cookieValue = readCookieValue(SIDEBAR_COOKIE_NAME)
    if (cookieValue !== undefined) {
      setCollapsedState(cookieValue === 'true')
    }
  }, [])

  const setCollapsed = React.useCallback((value: boolean) => {
    setCollapsedState(value)
    setCookieValue(SIDEBAR_COOKIE_NAME, String(value))
  }, [])

  const toggleCollapsed = React.useCallback(() => {
    setCollapsedState((prev) => {
      const next = !prev
      setCookieValue(SIDEBAR_COOKIE_NAME, String(next))
      return next
    })
  }, [])

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setMobileSidebarOpen((prev) => !prev)
    } else {
      toggleCollapsed()
    }
  }, [isMobile, toggleCollapsed])

  // Keyboard shortcut: Ctrl+B / Cmd+B to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const value = React.useMemo<LayoutContextValue>(
    () => ({
      collapsed,
      setCollapsed,
      toggleCollapsed,
      isMobile,
      mobileSidebarOpen,
      setMobileSidebarOpen,
      toggleSidebar,
    }),
    [
      collapsed,
      setCollapsed,
      toggleCollapsed,
      isMobile,
      mobileSidebarOpen,
      setMobileSidebarOpen,
      toggleSidebar,
    ],
  )

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export function useLayout(): LayoutContextValue {
  const context = React.useContext(LayoutContext)
  if (context === null) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
