import * as React from "react"
import { Check, Clock, AlertCircle, CircleDot } from "lucide-react"
import { cn } from "../utils/cn"
import { Badge } from "./badge"

export type TimelineItemStatus = "completed" | "current" | "pending" | "error"

export interface TimelineEventItem {
  id: string
  title: string
  description?: string
  timestamp: string
  actor?: string
  badge?: string
  status?: TimelineItemStatus
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: TimelineEventItem[]
}

const DEFAULT_TIMELINE_ITEMS: TimelineEventItem[] = [
  {
    id: "tl-1",
    title: "Wire Transfer Initiated (#TRX-98412)",
    description: "Maker request submitted for $48,500.00 USD to Acme Treasury IBAN.",
    timestamp: "09:14 UTC",
    actor: "Saeful Rohman",
    badge: "Maker",
    status: "completed",
  },
  {
    id: "tl-2",
    title: "AML & Sanctions Screening Passed",
    description: "Automated compliance check verified beneficiary SWIFT BIC and OFAC status.",
    timestamp: "09:15 UTC",
    actor: "Compliance Engine",
    badge: "Automated",
    status: "completed",
  },
  {
    id: "tl-3",
    title: "Awaiting VP Finance Checker Approval",
    description: "Requires dual-authorization signature for transfers above $25,000.",
    timestamp: "In Progress",
    actor: "Elena Rostova",
    badge: "Checker",
    status: "current",
  },
  {
    id: "tl-4",
    title: "RTGS Central Bank Settlement",
    description: "Final settlement and webhook receipt dispatch.",
    timestamp: "Pending",
    status: "pending",
  },
]

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, items = DEFAULT_TIMELINE_ITEMS, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div className="relative space-y-6 before:absolute before:left-3.5 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
          {items.map((item) => {
            const status = item.status || "pending"
            return (
              <div key={item.id} className="relative flex items-start gap-4 pl-9">
                <span
                  className={cn(
                    "absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-colors",
                    status === "completed" &&
                      "border-emerald-500/30 bg-emerald-500 text-white",
                    status === "current" &&
                      "border-blue-500 bg-blue-600 text-white ring-4 ring-blue-500/15",
                    status === "error" &&
                      "border-rose-500 bg-rose-600 text-white",
                    status === "pending" &&
                      "border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                  )}
                >
                  {status === "completed" && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                  {status === "current" && <CircleDot className="h-3.5 w-3.5 animate-pulse" />}
                  {status === "error" && <AlertCircle className="h-3.5 w-3.5" />}
                  {status === "pending" && <Clock className="h-3.5 w-3.5" />}
                </span>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </p>
                      {item.badge && (
                        <Badge
                          variant={
                            status === "completed"
                              ? "emerald"
                              : status === "current"
                                ? "blue"
                                : status === "error"
                                  ? "rose"
                                  : "default"
                          }
                          className="px-1.5 py-0 text-[10px]"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400">
                      {item.timestamp}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.actor && (
                    <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                      Actor: <span className="text-zinc-700 dark:text-zinc-300">{item.actor}</span>
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

Timeline.displayName = "Timeline"

