import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../utils/cn"

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void
  active?: boolean
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, children, onRemove, active = false, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300"
          : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
)
Chip.displayName = "Chip"

