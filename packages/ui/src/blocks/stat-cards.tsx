import * as React from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "../utils/cn"
import { Badge } from "../primitives/badge"
import { Progress } from "../primitives/progress"

export interface StatMetricCardProps {
  title: string
  value: string
  change: string
  trend?: "up" | "down" | "neutral"
  subtitle?: string
  sparkline?: number[]
  accent?: "blue" | "indigo" | "emerald" | "amber" | "rose"
  className?: string
}

const strokeColors = {
  blue: "var(--primary)",
  indigo: "var(--primary)",
  emerald: "var(--chart-3, #10b981)",
  amber: "var(--chart-4, #f59e0b)",
  rose: "var(--destructive, #f43f5e)",
}

export const StatMetricCard: React.FC<StatMetricCardProps> = ({
  title,
  value,
  change,
  trend = "up",
  subtitle = "vs. previous 30 days",
  sparkline = [28, 34, 31, 45, 42, 56, 64, 61, 78, 86],
  accent = "blue",
  className,
}) => {
  const min = Math.min(...sparkline)
  const max = Math.max(...sparkline)
  const range = Math.max(1, max - min)
  const width = 104
  const height = 34

  const points = sparkline
    .map((val, i) => {
      const x = (i / Math.max(1, sparkline.length - 1)) * width
      const y = height - ((val - min) / range) * (height - 8) - 4
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-5 transition-colors dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
        <Badge
          variant={
            trend === "up" ? "emerald" : trend === "down" ? "rose" : "default"
          }
          className="text-[11px]"
        >
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </Badge>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {value}
          </div>
          <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            {subtitle}
          </p>
        </div>

        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible shrink-0"
        >
          <polyline
            fill="none"
            stroke={strokeColors[accent]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  )
}

export interface MultiMetricGridProps {
  metrics?: StatMetricCardProps[]
  className?: string
}

const defaultMetrics: StatMetricCardProps[] = [
  {
    title: "Monthly Recurring Revenue",
    value: "$128,430",
    change: "+14.2%",
    trend: "up",
    subtitle: "Compared to $112.4k last month",
    sparkline: [32, 38, 40, 48, 52, 60, 68, 74, 82, 95],
    accent: "blue",
  },
  {
    title: "Active Subscribers",
    value: "4,892",
    change: "+8.4%",
    trend: "up",
    subtitle: "312 new trials converted",
    sparkline: [40, 42, 49, 55, 53, 64, 72, 79, 88, 92],
    accent: "emerald",
  },
  {
    title: "Net Revenue Retention",
    value: "118.6%",
    change: "+2.1%",
    trend: "up",
    subtitle: "Enterprise cohort expansion",
    sparkline: [70, 72, 75, 78, 80, 84, 86, 89, 92, 95],
    accent: "blue",
  },
  {
    title: "Logo Churn Rate",
    value: "1.24%",
    change: "-0.4%",
    trend: "up",
    subtitle: "Lowest in 4 quarters",
    sparkline: [65, 58, 50, 44, 39, 32, 28, 22, 18, 12],
    accent: "emerald",
  },
]

export const MultiMetricGrid: React.FC<MultiMetricGridProps> = ({
  metrics = defaultMetrics,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {metrics.map((m) => (
        <StatMetricCard key={m.title} {...m} />
      ))}
    </div>
  )
}

export interface ProgressMetricCardProps {
  title?: string
  current?: string
  target?: string
  percentage?: number
  statusText?: string
  variant?: "blue" | "indigo" | "emerald" | "amber" | "rose"
  className?: string
}

export const ProgressMetricCard: React.FC<ProgressMetricCardProps> = ({
  title = "Monthly API Usage",
  current = "768,000",
  target = "1,000,000 reqs",
  percentage = 76.8,
  statusText = "Resets in 9 days • Pay-as-you-go enabled",
  variant = "blue",
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">
          {title}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          <strong className="text-zinc-900 dark:text-white">{current}</strong> /{" "}
          {target}
        </span>
      </div>
      <Progress value={percentage} variant={variant} showValue />
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
        {statusText}
      </p>
    </div>
  )
}

export type StatCardProps = StatMetricCardProps
export const StatCard = StatMetricCard
