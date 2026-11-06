import * as React from "react"
import { cn } from "../utils/cn"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: "blue" | "indigo" | "emerald" | "amber" | "rose" | "white"
  size?: "sm" | "default" | "lg"
  showValue?: boolean
  label?: string
}

const barColorMap: Record<NonNullable<ProgressProps["variant"]>, string> = {
  blue: "bg-blue-600 dark:bg-blue-500",
  indigo: "bg-blue-600 dark:bg-blue-500",
  emerald: "bg-emerald-600 dark:bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-600 dark:bg-rose-500",
  white: "bg-zinc-900 dark:bg-zinc-100",
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      variant = "blue",
      size = "default",
      showValue = false,
      label,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div className={cn("w-full space-y-1.5", className)} ref={ref} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs">
            {label && (
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                {label}
              </span>
            )}
            {showValue && (
              <span className="font-mono text-zinc-500 dark:text-zinc-400">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800",
            size === "sm" && "h-1.5",
            size === "default" && "h-2",
            size === "lg" && "h-3"
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              barColorMap[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  size?: number
  strokeWidth?: number
  variant?: "blue" | "indigo" | "emerald" | "amber" | "rose"
}

const strokeColorMap: Record<NonNullable<CircularProgressProps["variant"]>, string> = {
  blue: "text-blue-600 dark:text-blue-500",
  indigo: "text-blue-600 dark:text-blue-500",
  emerald: "text-emerald-600 dark:text-emerald-500",
  amber: "text-amber-500",
  rose: "text-rose-600 dark:text-rose-500",
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 48,
  strokeWidth = 4,
  variant = "blue",
  className,
  ...props
}) => {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-200 dark:text-zinc-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-all duration-300", strokeColorMap[variant])}
        />
      </svg>
      <span className="absolute font-mono text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
        {Math.round(clamped)}%
      </span>
    </div>
  )
}
CircularProgress.displayName = "CircularProgress"

export { Progress, CircularProgress }
