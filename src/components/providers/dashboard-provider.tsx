"use client";

import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

const SIDEBAR_COOKIE_NAME = "sidebar_collapsed";
const COOKIE_MAX_AGE = 604800; // 7 days

export interface DashboardContextValue {
  /** Whether the sidebar is collapsed (icon-only mode) */
  collapsed: boolean;
  /** Set collapsed state */
  setCollapsed: (collapsed: boolean) => void;
  /** Toggle collapsed state */
  toggleCollapsed: () => void;
  /** Whether running on mobile viewport */
  isMobile: boolean;
  /** Whether mobile sidebar sheet is open */
  mobileSidebarOpen: boolean;
  /** Set mobile sidebar open state */
  setMobileSidebarOpen: (open: boolean) => void;
  /** Toggle sidebar: on mobile toggles sheet, on desktop toggles collapsed */
  toggleSidebar: () => void;
}

const DashboardContext = React.createContext<DashboardContextValue | null>(
  null,
);

function readCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookieValue(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${COOKIE_MAX_AGE}`;
}

interface DashboardProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function DashboardProvider({
  children,
  defaultCollapsed = false,
}: DashboardProviderProps) {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsedState] = React.useState(defaultCollapsed);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  // Read initial collapsed state from cookie on mount
  React.useEffect(() => {
    const cookieValue = readCookieValue(SIDEBAR_COOKIE_NAME);
    if (cookieValue !== undefined) {
      setCollapsedState(cookieValue === "true");
    }
  }, []);

  const setCollapsed = React.useCallback((value: boolean) => {
    setCollapsedState(value);
    setCookieValue(SIDEBAR_COOKIE_NAME, String(value));
  }, []);

  const toggleCollapsed = React.useCallback(() => {
    setCollapsedState((prev) => {
      const next = !prev;
      setCookieValue(SIDEBAR_COOKIE_NAME, String(next));
      return next;
    });
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      toggleCollapsed();
    }
  }, [isMobile, toggleCollapsed]);

  // Keyboard shortcut: Ctrl+B / Cmd+B to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const value = React.useMemo<DashboardContextValue>(
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
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const context = React.useContext(DashboardContext);
  if (context === null) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
