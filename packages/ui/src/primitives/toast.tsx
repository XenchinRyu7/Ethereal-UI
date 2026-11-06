import * as React from "react"
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react"
import { cn } from "../utils/cn"

export type ToastVariant = "success" | "error" | "warning" | "info"

export interface ToastItem {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

const iconMap: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />,
  error: <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />,
  info: <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />,
}

const borderMap: Record<ToastVariant, string> = {
  success: "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
  error: "border-rose-200 bg-rose-50/40 dark:border-rose-500/30 dark:bg-rose-950/20",
  warning: "border-amber-200 bg-amber-50/40 dark:border-amber-500/30 dark:bg-amber-950/20",
  info: "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
}

export interface ToastCardProps extends Omit<ToastItem, "id"> {
  onDismiss?: () => void
  className?: string
}

export const ToastCard: React.FC<ToastCardProps> = ({
  title,
  description,
  variant = "info",
  onDismiss,
  className,
}) => {
  return (
    <div
      role="status"
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-xl border p-3.5 text-zinc-900 shadow-md transition-all dark:text-zinc-100",
        borderMap[variant],
        className
      )}
    >
      <div className="mt-0.5">{iconMap[variant]}</div>
      <div className="flex-1 space-y-1">
        <p className="text-xs font-semibold leading-none text-zinc-900 dark:text-zinc-100">
          {title}
        </p>
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
