import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "../utils/cn"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground border border-border/80",
        blue:
          "bg-primary/10 text-primary border border-primary/25",
        primary:
          "bg-primary text-primary-foreground border border-transparent shadow-2xs",
        glow:
          "bg-primary/15 text-primary border border-primary/30 shadow-2xs",
        emerald:
          "bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 dark:text-emerald-400",
        amber:
          "bg-amber-500/10 text-amber-600 border border-amber-500/25 dark:text-amber-400",
        rose:
          "bg-destructive/10 text-destructive border border-destructive/25",
        outline:
          "bg-transparent text-foreground border border-border",
        mono:
          "bg-muted text-muted-foreground border border-border font-mono text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const dotColorMap: Record<string, string> = {
  default: "bg-muted-foreground",
  blue: "bg-primary",
  primary: "bg-primary-foreground",
  glow: "bg-primary",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-destructive",
  outline: "bg-muted-foreground",
  mono: "bg-primary",
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", dot = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0",
              dotColorMap[variant || "default"]
            )}
          />
        )}
        {children}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void
  active?: boolean
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, children, onRemove, active = false, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
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

export { Badge, Chip, badgeVariants }
