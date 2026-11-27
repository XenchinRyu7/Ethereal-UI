import * as React from "react"
import { cn } from "../utils/cn"

export interface SegmentedControlOption {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentedControlOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  disabled?: boolean
}

export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      size = "md",
      fullWidth = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = React.useState<string>(
      defaultValue || options[0]?.value || ""
    )

    const currentValue = isControlled ? controlledValue : internalValue

    const handleSelect = (val: string) => {
      if (disabled) return
      if (!isControlled) {
        setInternalValue(val)
      }
      onChange?.(val)
    }

    const sizeClasses = {
      sm: "h-7 text-[11px] px-2.5",
      md: "h-8 text-xs px-3",
      lg: "h-9 text-xs px-4",
    }

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "inline-flex items-center rounded-xl border border-zinc-200/80 bg-zinc-100/90 p-1 select-none dark:border-zinc-800 dark:bg-zinc-900",
          fullWidth && "w-full",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {options.map((opt) => {
          const isSelected = opt.value === currentValue
          const isOptionDisabled = disabled || opt.disabled

          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              disabled={isOptionDisabled}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "relative flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all cursor-pointer focus:outline-none",
                sizeClasses[size],
                fullWidth && "flex-1",
                isSelected
                  ? "bg-white text-zinc-900 font-semibold shadow-2xs dark:bg-zinc-950 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200",
                isOptionDisabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span className="truncate">{opt.label}</span>
            </button>
          )
        })}
      </div>
    )
  }
)
SegmentedControl.displayName = "SegmentedControl"
