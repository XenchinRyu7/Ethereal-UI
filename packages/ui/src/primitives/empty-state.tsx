import * as React from "react"
import { FolderSearch, Plus, RotateCcw } from "lucide-react"
import { cn } from "../utils/cn"
import { Button } from "./button"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title?: string
  description?: string
  primaryActionLabel?: string
  secondaryActionLabel?: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      icon,
      title = "No matching records found",
      description = "No transactions, employees, or audit logs matched your active filters. Try resetting your filter query or create a new record.",
      primaryActionLabel = "Create new record",
      secondaryActionLabel = "Reset filters",
      onPrimaryAction,
      onSecondaryAction,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white/80 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/50",
          className
        )}
        {...props}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-blue-600 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-blue-400">
          {icon || <FolderSearch className="h-5 w-5" />}
        </div>

        <h3 className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {secondaryActionLabel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSecondaryAction}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{secondaryActionLabel}</span>
            </Button>
          )}
          {primaryActionLabel && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={onPrimaryAction}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{primaryActionLabel}</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)

EmptyState.displayName = "EmptyState"

