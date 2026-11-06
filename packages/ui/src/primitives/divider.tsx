import * as React from "react"
import { cn } from "../utils/cn"

export interface DividerProps {
  label?: string
  className?: string
}

export const Divider: React.FC<DividerProps> = ({ label, className }) => {
  if (!label) {
    return (
      <hr
        className={cn(
          "border-t border-zinc-200 dark:border-zinc-800",
          className
        )}
      />
    )
  }
  return (
    <div className={cn("relative flex items-center py-2", className)}>
      <div className="grow border-t border-zinc-200 dark:border-zinc-800" />
      <span className="mx-3 shrink text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="grow border-t border-zinc-200 dark:border-zinc-800" />
    </div>
  )
}
Divider.displayName = "Divider"

