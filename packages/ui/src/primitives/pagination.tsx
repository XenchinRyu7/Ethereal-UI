import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../utils/cn"

export interface PaginationProps {
  totalPages?: number
  initialPage?: number
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages = 5,
  initialPage = 1,
  className,
}) => {
  const [page, setPage] = React.useState(initialPage)
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const num = idx + 1
        const active = num === page
        return (
          <button
            key={num}
            type="button"
            onClick={() => setPage(num)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer",
              active
                ? "bg-blue-600 text-white"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            )}
          >
            {num}
          </button>
        )
      })}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
Pagination.displayName = "Pagination"

