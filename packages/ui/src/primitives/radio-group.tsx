import * as React from "react"
import { cn } from "../utils/cn"

export interface RadioGroupOption {
  value: string
  label: string
  description?: string
}

export interface RadioGroupProps {
  options: RadioGroupOption[]
  value: string
  onValueChange: (val: string) => void
  className?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onValueChange,
  className,
}) => (
  <div role="radiogroup" className={cn("space-y-2", className)}>
    {options.map((opt) => {
      const checked = opt.value === value
      return (
        <label
          key={opt.value}
          onClick={() => onValueChange(opt.value)}
          className={cn(
            "flex items-start gap-3 rounded-xl border p-3.5 transition-colors cursor-pointer",
            checked
              ? "border-blue-500/50 bg-blue-50/40 dark:border-blue-500/40 dark:bg-blue-500/10"
              : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/50"
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
              checked
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-zinc-300 dark:border-zinc-700"
            )}
          >
            {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
          </span>
          <div className="space-y-0.5 text-xs">
            <div className="font-medium text-zinc-900 dark:text-zinc-100">
              {opt.label}
            </div>
            {opt.description && (
              <div className="text-zinc-500 dark:text-zinc-400">
                {opt.description}
              </div>
            )}
          </div>
        </label>
      )
    })}
  </div>
)
RadioGroup.displayName = "RadioGroup"

