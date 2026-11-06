import * as React from "react"
import { cn } from "../utils/cn"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/80 dark:bg-zinc-800",
        className
      )}
      {...props}
    />
  )
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <Skeleton className="h-8 w-36" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-4/5" />
      </div>
    </div>
  )
}

function TableRowSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white divide-y divide-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:divide-zinc-800">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-2.5 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      ))}
    </div>
  )
}

export { Skeleton, CardSkeleton, TableRowSkeleton }
