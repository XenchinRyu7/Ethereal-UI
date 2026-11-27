import * as React from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils/cn"

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-10 w-10",
    },
    variant: {
      default: "text-zinc-600 dark:text-zinc-300",
      primary: "text-primary",
      muted: "text-zinc-400 dark:text-zinc-600",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => {
    return (
      <div className="inline-flex items-center gap-2">
        <Loader2
          ref={ref}
          aria-label={label}
          role="status"
          className={cn(spinnerVariants({ size, variant }), className)}
          {...props}
        />
        {label && <span className="sr-only">{label}</span>}
      </div>
    )
  }
)
Spinner.displayName = "Spinner"
