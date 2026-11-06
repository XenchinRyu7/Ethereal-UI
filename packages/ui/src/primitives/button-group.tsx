import * as React from "react"
import { cn } from "../utils/cn"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  attached?: boolean
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
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

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
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

