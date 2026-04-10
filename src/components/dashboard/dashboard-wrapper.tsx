"use client";

import { type ComponentProps, type CSSProperties, type FC } from "react";

import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";

export const DashboardWrapper: FC<ComponentProps<"div">> = ({
  children,
  style,
  className,
  ...props
}) => {
  return (
    <div
      data-slot="bashboard"
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "group/bashboard has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
