import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
} from "lucide-react"
import { cn } from "../utils/cn"

export interface CalendarProps {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  minDate?: Date
  maxDate?: Date
  className?: string
  disabledDates?: (date: Date) => boolean
}

type CalendarViewMode = "days" | "months" | "years"

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function isSameDay(d1?: Date | null, d2?: Date | null): boolean {
  if (!d1 || !d2) return false
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date())
}

export const Calendar: React.FC<CalendarProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  className,
  disabledDates,
}) => {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState<Date | null>(
    defaultValue || (isControlled ? controlledValue : null)
  )
  const selectedDate = isControlled ? controlledValue : internalValue

  const initialViewDate = selectedDate || new Date()
  const [viewYear, setViewYear] = React.useState(initialViewDate.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(initialViewDate.getMonth())
  const [viewMode, setViewMode] = React.useState<CalendarViewMode>("days")

  const yearRangeStart = Math.floor(viewYear / 12) * 12
  const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i)

  React.useEffect(() => {
    if (isControlled && controlledValue) {
      setViewYear(controlledValue.getFullYear())
      setViewMonth(controlledValue.getMonth())
    }
  }, [controlledValue, isControlled])

  const handleSelectDate = (date: Date) => {
    if (isDisabled(date)) return
    if (!isControlled) {
      setInternalValue(date)
    }
    onChange?.(date)
  }

  const handleQuickToday = () => {
    const today = new Date()
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())
    setViewMode("days")
    handleSelectDate(today)
  }

  const handlePrev = () => {
    if (viewMode === "days") {
      if (viewMonth === 0) {
        setViewMonth(11)
        setViewYear((y) => y - 1)
      } else {
        setViewMonth((m) => m - 1)
      }
    } else if (viewMode === "months") {
      setViewYear((y) => y - 1)
    } else if (viewMode === "years") {
      setViewYear((y) => y - 12)
    }
  }

  const handleNext = () => {
    if (viewMode === "days") {
      if (viewMonth === 11) {
        setViewMonth(0)
        setViewYear((y) => y + 1)
      } else {
        setViewMonth((m) => m + 1)
      }
    } else if (viewMode === "months") {
      setViewYear((y) => y + 1)
    } else if (viewMode === "years") {
      setViewYear((y) => y + 12)
    }
  }

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true
    if (disabledDates?.(date)) return true
    return false
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  const calendarCells = []

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const prevDate = new Date(viewYear, viewMonth - 1, d)
    calendarCells.push({
      date: prevDate,
      dayNumber: d,
      isCurrentMonth: false,
    })
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const currDate = new Date(viewYear, viewMonth, i)
    calendarCells.push({
      date: currDate,
      dayNumber: i,
      isCurrentMonth: true,
    })
  }

  const remainingSlots = 42 - calendarCells.length
  for (let i = 1; i <= remainingSlots; i++) {
    const nextDate = new Date(viewYear, viewMonth + 1, i)
    calendarCells.push({
      date: nextDate,
      dayNumber: i,
      isCurrentMonth: false,
    })
  }

  return (
    <div
      className={cn(
        "w-72 select-none rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <div className="mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {viewMode === "days" && (
            <>
              <button
                type="button"
                onClick={() => setViewMode("months")}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                {MONTH_NAMES[viewMonth]}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("years")}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
              >
                {viewYear}
              </button>
            </>
          )}

          {viewMode === "months" && (
            <button
              type="button"
              onClick={() => setViewMode("years")}
              className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {viewYear}
            </button>
          )}

          {viewMode === "years" && (
            <span className="px-2 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {years[0]} – {years[years.length - 1]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={handleQuickToday}
            title="Jump to today"
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous"
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
          >
            {viewMode === "years" ? (
              <ChevronsLeft className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next"
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
          >
            {viewMode === "years" ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {viewMode === "days" && (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-zinc-400 dark:text-zinc-500 mb-1.5">
            {WEEKDAYS.map((w) => (
              <span key={w} className="h-7 flex items-center justify-center">
                {w}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((cell, idx) => {
              const selected = isSameDay(cell.date, selectedDate)
              const today = isToday(cell.date)
              const disabled = isDisabled(cell.date)

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDate(cell.date)}
                  className={cn(
                    "relative flex h-8 w-8 mx-auto items-center justify-center rounded-lg text-xs transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-30",
                    selected
                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : cell.isCurrentMonth
                      ? "text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
                      : "text-zinc-400/60 hover:bg-zinc-100/50 dark:text-zinc-600 dark:hover:bg-zinc-800/40",
                    today && !selected && "font-bold text-primary ring-1 ring-primary/40 dark:ring-primary/60"
                  )}
                >
                  {cell.dayNumber}
                </button>
              )
            })}
          </div>
        </>
      )}

      {viewMode === "months" && (
        <div className="grid grid-cols-3 gap-2 py-1">
          {MONTH_SHORT.map((name, idx) => {
            const isCurrent =
              selectedDate &&
              selectedDate.getFullYear() === viewYear &&
              selectedDate.getMonth() === idx

            const isThisMonth =
              new Date().getFullYear() === viewYear &&
              new Date().getMonth() === idx

            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setViewMonth(idx)
                  setViewMode("days")
                }}
                className={cn(
                  "flex h-9 items-center justify-center rounded-xl text-xs font-medium transition-colors cursor-pointer",
                  isCurrent
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                  isThisMonth && !isCurrent && "border border-primary/40 font-semibold text-primary"
                )}
              >
                {name}
              </button>
            )
          })}
        </div>
      )}

      {viewMode === "years" && (
        <div className="grid grid-cols-3 gap-2 py-1">
          {years.map((year) => {
            const isCurrent =
              selectedDate && selectedDate.getFullYear() === year
            const isThisYear = new Date().getFullYear() === year

            return (
              <button
                key={year}
                type="button"
                onClick={() => {
                  setViewYear(year)
                  setViewMode("months")
                }}
                className={cn(
                  "flex h-9 items-center justify-center rounded-xl text-xs font-medium transition-colors cursor-pointer",
                  isCurrent
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                  isThisYear && !isCurrent && "border border-primary/40 font-semibold text-primary"
                )}
              >
                {year}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

Calendar.displayName = "Calendar"

export const DateCalendar = Calendar
export type DateCalendarProps = CalendarProps
