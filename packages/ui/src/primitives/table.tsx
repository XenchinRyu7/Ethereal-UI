import * as React from "react"
import { cn } from "../utils/cn"

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
    <table
      ref={ref}
      className={cn("w-full border-collapse text-left text-xs", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "border-b border-zinc-200 bg-zinc-50/80 text-[11px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "divide-y divide-zinc-200 dark:divide-zinc-800",
      className
    )}
    {...props}
  />
))
TableBody.displayName = "TableBody"

