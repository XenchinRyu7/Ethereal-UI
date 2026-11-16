import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react"
import { cn } from "../utils/cn"

export const alertVariants = cva(
  "relative w-full rounded-xl border p-4 text-sm transition-colors [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4",
  {
    variants: {
      variant: {
        default:
          "border-border bg-card text-card-foreground shadow-2xs [&>svg]:text-foreground",
        info:
          "border-blue-500/20 bg-blue-500/10 text-zinc-900 dark:text-zinc-100 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-zinc-900 dark:text-zinc-100 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
        warning:
          "border-amber-500/20 bg-amber-500/10 text-zinc-900 dark:text-zinc-100 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive dark:text-rose-200 [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const defaultIconMap = {
  default: <Info className="h-4 w-4 shrink-0" />,
  info: <Info className="h-4 w-4 shrink-0" />,
  success: <CheckCircle2 className="h-4 w-4 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 shrink-0" />,
  destructive: <AlertCircle className="h-4 w-4 shrink-0" />,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  onClose?: () => void
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, onClose, children, ...props }, ref) => {
    const resolvedIcon = icon !== undefined ? icon : defaultIconMap[variant || "default"]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {resolvedIcon}
        <div className="flex-1">{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss alert"
            className="absolute right-3.5 top-3.5 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/5 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight text-foreground", className)}
    {...props}
  >
    {children}
  </h5>
))
AlertTitle.displayName = "AlertTitle"

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs leading-relaxed text-muted-foreground", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export const AlertAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-3 flex items-center gap-2", className)}
    {...props}
  />
))
AlertAction.displayName = "AlertAction"
