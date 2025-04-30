
import * as React from "react";
import { cn } from "@/lib/utils";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2 border-b border-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
