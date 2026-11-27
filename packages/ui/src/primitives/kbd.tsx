import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils/cn"

const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-medium rounded-md border select-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-zinc-200/90 bg-zinc-100/90 text-zinc-700 shadow-2xs dark:border-zinc-700/80 dark:bg-zinc-800 dark:text-zinc-200",
        outline:
          "border-zinc-300/80 bg-transparent text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
        solid:
          "border-transparent bg-zinc-900 text-zinc-100 shadow-2xs dark:bg-zinc-100 dark:text-zinc-900",
      },
      size: {
        xs: "h-5 min-w-[20px] px-1 text-[10px]",
        sm: "h-6 min-w-[24px] px-1.5 text-xs",
        md: "h-7 min-w-[28px] px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)
Kbd.displayName = "Kbd"
