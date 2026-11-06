import * as React from "react"
import { cn } from "../utils/cn"

export interface SliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (val: number) => void
  label?: string
  className?: string
}

export const Slider: React.FC<SliderProps> = ({
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
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
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
Slider.displayName = "Slider"

