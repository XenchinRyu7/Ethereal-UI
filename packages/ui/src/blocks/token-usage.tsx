import * as React from "react"
import {
  Zap,
  RotateCcw,
  Layers,
  Clock,
  ShieldCheck,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Button } from "../primitives/button"
import { Badge } from "../primitives/badge"
import { Progress } from "../primitives/progress"

export interface TokenSegmentItem {
  id: string
  label: string
  tokens: string
  percent: number
  colorClass: string
  dotClass: string
}

export interface RateLimitQuotaItem {
  id: string
  label: string
  resetText: string
  percent: number
  variant: "blue" | "emerald" | "amber" | "rose"
}

export interface TokenUsageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "context-only" | "limits-only"
  planName?: string
  totalContextLabel?: string
  segments?: TokenSegmentItem[]
  quotas?: RateLimitQuotaItem[]
}

const DEFAULT_SEGMENTS: TokenSegmentItem[] = [
  {
    id: "system",
    label: "System & MCP Tools",
    tokens: "420k",
    percent: 42,
    colorClass: "bg-blue-600",
    dotClass: "bg-blue-600",
  },
  {
    id: "workspace",
    label: "Workspace Files",
    tokens: "240k",
    percent: 24,
    colorClass: "bg-violet-500",
    dotClass: "bg-violet-500",
  },
  {
    id: "reasoning",
    label: "Reasoning & Output",
    tokens: "160k",
    percent: 16,
    colorClass: "bg-emerald-500",
    dotClass: "bg-emerald-500",
  },
]

const COMPACTED_SEGMENTS: TokenSegmentItem[] = [
  {
    id: "system",
    label: "System & MCP Tools",
    tokens: "180k",
    percent: 18,
    colorClass: "bg-blue-600",
    dotClass: "bg-blue-600",
  },
  {
    id: "workspace",
    label: "Workspace Files",
    tokens: "100k",
    percent: 10,
    colorClass: "bg-violet-500",
    dotClass: "bg-violet-500",
  },
  {
    id: "reasoning",
    label: "Reasoning & Output",
    tokens: "60k",
    percent: 6,
    colorClass: "bg-emerald-500",
    dotClass: "bg-emerald-500",
  },
]

const DEFAULT_QUOTAS: RateLimitQuotaItem[] = [
  {
    id: "burst",
    label: "5-hour burst",
    resetText: "Resets in 2 hr 46 min",
    percent: 38,
    variant: "blue",
  },
  {
    id: "weekly",
    label: "Weekly - all models",
    resetText: "Resets Tue 9:00 PM",
    percent: 64,
    variant: "emerald",
  },
]

export const TokenUsageBlock = React.forwardRef<
  HTMLDivElement,
  TokenUsageBlockProps
>(
  (
    {
      className,
      variant = "default",
      planName = "Plan usage limits - Enterprise (5x)",
      totalContextLabel = "1M",
      segments: propSegments,
      quotas = DEFAULT_QUOTAS,
      ...props
    },
    ref
  ) => {
    const [compacted, setCompacted] = React.useState(false)
    const [activeSegmentId, setActiveSegmentId] = React.useState<string | null>(null)

    const currentSegments = propSegments
      ? propSegments
      : compacted
        ? COMPACTED_SEGMENTS
        : DEFAULT_SEGMENTS

    const totalPercent = currentSegments.reduce((acc, s) => acc + s.percent, 0)
    const usedTokensLabel = compacted ? "340k" : "820k"

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-5",
          className
        )}
        {...props}
      >
        {/* 1. Context Window Multi-Segment Section */}
        {variant !== "limits-only" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Context window
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {usedTokensLabel} / {totalContextLabel}{" "}
                  <strong className="text-zinc-900 dark:text-white">
                    ({totalPercent}%)
                  </strong>
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => setCompacted(!compacted)}
                  title={compacted ? "Restore full context" : "Compact context window"}
                >
                  {compacted ? (
                    <>
                      <RotateCcw className="h-2.5 w-2.5" />
                      <span>Restore</span>
                    </>
                  ) : (
                    <span>Compact</span>
                  )}
                </Button>
              </div>
            </div>

            {/* Multi-segment color bar */}
            <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 gap-0.5 dark:bg-zinc-800">
              {currentSegments.map((seg, idx) => (
                <div
                  key={seg.id}
                  onMouseEnter={() => setActiveSegmentId(seg.id)}
                  onMouseLeave={() => setActiveSegmentId(null)}
                  style={{ width: `${seg.percent}%` }}
                  className={cn(
                    "h-full transition-all duration-500 cursor-pointer",
                    seg.colorClass,
                    idx === 0 && "rounded-l-full",
                    idx === currentSegments.length - 1 && "rounded-r-full",
                    activeSegmentId && activeSegmentId !== seg.id && "opacity-45"
                  )}
                />
              ))}
            </div>

            {/* Segment Legend */}
            <div className="grid grid-cols-3 gap-2 pt-0.5">
              {currentSegments.map((seg) => (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() =>
                    setActiveSegmentId(activeSegmentId === seg.id ? null : seg.id)
                  }
                  className={cn(
                    "rounded-xl border p-2 text-left transition-colors cursor-pointer",
                    activeSegmentId === seg.id
                      ? "border-blue-500/40 bg-blue-50/70 text-zinc-900 dark:border-blue-500/40 dark:bg-blue-500/15 dark:text-white"
                      : "border-zinc-200/80 bg-zinc-50/60 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("h-2 w-2 rounded-full", seg.dotClass)} />
                    <span className="font-mono text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {seg.tokens}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                    {seg.label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Plan Rate Limits Section */}
        {variant !== "context-only" && (
          <div
            className={cn(
              "space-y-3",
              variant === "default" &&
                "border-t border-zinc-200/80 pt-4 dark:border-zinc-800"
            )}
          >
            <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>{planName}</span>
              </span>
              <Badge variant="emerald">
                <ShieldCheck className="h-3 w-3" /> Active
              </Badge>
            </div>

            <div className="space-y-3">
              {quotas.map((quota) => (
                <div key={quota.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      {quota.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <Clock className="h-3 w-3" />
                      <span>{quota.resetText}</span>
                      <strong className="font-mono text-zinc-900 dark:text-zinc-100">
                        {quota.percent}%
                      </strong>
                    </span>
                  </div>
                  <Progress
                    value={quota.percent}
                    variant={quota.variant}
                    size="default"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

TokenUsageBlock.displayName = "TokenUsageBlock"
