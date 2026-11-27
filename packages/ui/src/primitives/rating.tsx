import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "../utils/cn"

export interface RatingProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  max?: number
  readOnly?: boolean
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
  allowHalf?: boolean
}

export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  max = 5,
  readOnly = false,
  disabled = false,
  size = "md",
  className,
  allowHalf = false,
}) => {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const currentValue = isControlled ? (controlledValue ?? 0) : internalValue
  const displayValue = hoverValue !== null ? hoverValue : currentValue

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  }

  const handleSelect = (val: number) => {
    if (readOnly || disabled) return
    if (!isControlled) {
      setInternalValue(val)
    }
    onChange?.(val)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      className={cn(
        "inline-flex items-center gap-1 select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onMouseLeave={() => !readOnly && setHoverValue(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starIndex = i + 1
        const isFilled = displayValue >= starIndex
        const isHalf =
          allowHalf && displayValue >= starIndex - 0.5 && displayValue < starIndex

        return (
          <button
            key={i}
            type="button"
            disabled={readOnly || disabled}
            aria-label={`${starIndex} star${starIndex > 1 ? "s" : ""}`}
            onClick={() => handleSelect(starIndex)}
            onMouseEnter={() => !readOnly && setHoverValue(starIndex)}
            className={cn(
              "relative inline-flex items-center justify-center p-0.5 rounded transition-transform",
              !readOnly && !disabled && "cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
              readOnly && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled
                  ? "fill-amber-400 text-amber-400 dark:fill-amber-400 dark:text-amber-400"
                  : isHalf
                    ? "fill-amber-400/50 text-amber-400"
                    : "fill-transparent text-zinc-300 dark:text-zinc-700"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
Rating.displayName = "Rating"
