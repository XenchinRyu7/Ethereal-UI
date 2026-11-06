import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../utils/cn"

export interface DateCalendarProps {
  className?: string
  defaultSelectedDay?: number
}

export const DateCalendar: React.FC<DateCalendarProps> = ({
  className,
  defaultSelectedDay = 14,
}) => {
  const [selectedDay, setSelectedDay] = React.useState(defaultSelectedDay)
  const days = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div
      className={cn(
        "w-64 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          November 2026
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-zinc-400 mb-1.5">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const active = d === selectedDay
          return (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDay(d)}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer",
                active
                  ? "bg-blue-600 font-semibold text-white"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              )}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
DateCalendar.displayName = "DateCalendar"

