import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "../utils/cn"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-zinc-200 dark:data-[state=unchecked]:bg-zinc-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-xs ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded border border-zinc-300 bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:data-[state=checked]:bg-blue-600 cursor-pointer",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3 stroke-[2.5]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

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

const RadioGroup: React.FC<RadioGroupProps> = ({
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

export interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (val: number) => void
  label?: string
  className?: string
}

const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  label,
  className,
}) => (
  <div className={cn("space-y-2", className)}>
    {label && (
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="font-mono text-zinc-500">{value}%</span>
      </div>
    )}
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange?.(Number(e.target.value))}
      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-blue-600 dark:bg-zinc-800"
    />
  </div>
)

export { Switch, Checkbox, RadioGroup, Slider }
