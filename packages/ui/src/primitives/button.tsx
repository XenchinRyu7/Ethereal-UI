import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2, X } from "lucide-react"
import { cn } from "../utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-2xs",
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-2xs",
        glow:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-2xs",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
        outline:
          "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
        ghost:
          "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500",
      },
      size: {
        default: "h-9 px-3.5 py-2 text-xs",
        sm: "h-8 rounded-md px-2.5 text-xs",
        lg: "h-10 rounded-lg px-5 text-sm",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default"
}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, size = "default", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer",
        size === "sm" ? "h-6 w-6" : "h-8 w-8",
        className
      )}
      {...props}
    >
      <X className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </button>
  )
)
CloseButton.displayName = "CloseButton"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, attached = true, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex items-center",
        attached
          ? "rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-0.5 [&>button]:border-0 [&>button]:rounded-md [&>button]:shadow-none"
          : "gap-2",
        className
      )}
      {...props}
    />
  )
)
ButtonGroup.displayName = "ButtonGroup"

export interface ToggleGroupItem {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[]
  value: string
  onValueChange: (value: string) => void
  size?: "sm" | "default"
  className?: string
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items,
  value,
  onValueChange,
  size = "default",
  className,
}) => {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-100/80 dark:border-zinc-800 dark:bg-zinc-900 p-0.5 gap-0.5",
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onValueChange(item.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md font-medium transition-all cursor-pointer",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs",
              active
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
ToggleGroup.displayName = "ToggleGroup"

export { Button, CloseButton, ButtonGroup, ToggleGroup, buttonVariants }
