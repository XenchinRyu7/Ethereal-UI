import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import {
  Calendar as CalendarIcon,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Progress } from "./progress"

export interface DateRangePreset {
  label: string
  value: string
  rangeText: string
}

const defaultPresets: DateRangePreset[] = [
  { label: "Last 7 days", value: "7d", rangeText: "Oct 31 – Nov 06, 2026" },
  { label: "Last 30 days", value: "30d", rangeText: "Oct 08 – Nov 06, 2026" },
  { label: "Last 90 days", value: "90d", rangeText: "Aug 09 – Nov 06, 2026" },
  { label: "Year to date", value: "ytd", rangeText: "Jan 01 – Nov 06, 2026" },
]

export interface DateRangePickerProps {
  value?: string
  onValueChange?: (preset: DateRangePreset) => void
  className?: string
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value = "30d",
  onValueChange,
  className,
}) => {
  const [selected, setSelected] = React.useState(value)
  const activePreset =
    defaultPresets.find((p) => p.value === selected) || defaultPresets[1]

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-9 items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer",
            className
          )}
        >
          <CalendarIcon className="h-3.5 w-3.5 text-zinc-400" />
          <span>{activePreset.label}</span>
          <span className="hidden sm:inline border-l border-zinc-200 pl-2 text-[11px] text-zinc-400 dark:border-zinc-800">
            {activePreset.rangeText}
          </span>
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={6}
          className="z-50 w-72 rounded-xl border border-zinc-200 bg-white p-2 text-zinc-900 shadow-lg focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <div className="px-2 py-1.5 text-[11px] font-medium text-zinc-400">
            Date range
          </div>
          <div className="space-y-0.5">
            {defaultPresets.map((preset) => {
              const isSelected = preset.value === selected
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => {
                    setSelected(preset.value)
                    onValueChange?.(preset)
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-colors cursor-pointer",
                    isSelected
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  )}
                >
                  <span className="font-medium">{preset.label}</span>
                  <span className="text-[11px] text-zinc-400">
                    {preset.rangeText}
                  </span>
                </button>
              )
            })}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

// Standalone DateCalendar Primitive
export const DateCalendar: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedDay, setSelectedDay] = React.useState(14)
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

// ColorPicker Primitive
export const ColorPicker: React.FC<{ className?: string }> = ({ className }) => {
  const swatches = [
    "#2563eb",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#f43f5e",
    "#8b5cf6",
    "#18181b",
  ]
  const [color, setColor] = React.useState(swatches[0])

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-6 w-6 rounded-lg border border-black/10 shrink-0"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-28 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-800 focus:outline-none dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
        />
      </div>
      <div className="flex items-center gap-1.5">
        {swatches.map((sw) => (
          <button
            key={sw}
            type="button"
            onClick={() => setColor(sw)}
            style={{ backgroundColor: sw }}
            className={cn(
              "h-6 w-6 rounded-full transition-transform cursor-pointer",
              color === sw && "scale-110 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-zinc-900"
            )}
          />
        ))}
      </div>
    </div>
  )
}

// Carousel Primitive
export const Carousel: React.FC<{
  slides?: Array<{ title: string; subtitle: string; metric: string }>
  className?: string
}> = ({
  slides = [
    {
      title: "Q4 Revenue Velocity",
      subtitle: "Net dollar retention across enterprise accounts",
      metric: "128.4%",
    },
    {
      title: "Global Checkout Conversion",
      subtitle: "30-day rolling average across 14 currencies",
      metric: "4.82%",
    },
    {
      title: "Customer Support SLA",
      subtitle: "Median first response time for priority tickets",
      metric: "3m 12s",
    },
  ],
  className,
}) => {
  const [idx, setIdx] = React.useState(0)
  const current = slides[idx]

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-zinc-400">
          Slide {idx + 1} of {slides.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIdx((p) => (p - 1 + slides.length) % slides.length)}
            className="rounded-lg border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIdx((p) => (p + 1) % slides.length)}
            className="rounded-lg border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {current.metric}
        </div>
        <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
          {current.title}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {current.subtitle}
        </p>
      </div>
    </div>
  )
}

export interface UploadedFileItem {
  name: string
  size: string
  progress: number
}

export interface FileDropzoneProps {
  className?: string
  initialFiles?: UploadedFileItem[]
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  className,
  initialFiles = [
    { name: "quarterly-report-2026.csv", size: "1.4 MB", progress: 100 },
    { name: "customer-invoices.pdf", size: "420 KB", progress: 76 },
  ],
}) => {
  const [files, setFiles] = React.useState<UploadedFileItem[]>(initialFiles)
  const [isDragging, setIsDragging] = React.useState(false)

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const dropped = Array.from(e.dataTransfer.files)
          if (dropped.length > 0) {
            setFiles((prev) => [
              ...prev,
              ...dropped.map((f) => ({
                name: f.name,
                size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
                progress: 100,
              })),
            ])
          }
        }}
        onClick={() => {
          setFiles((prev) => [
            ...prev,
            {
              name: `attachment-${prev.length + 1}.pdf`,
              size: "310 KB",
              progress: 100,
            },
          ])
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition-colors cursor-pointer",
          isDragging
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
            : "border-zinc-300 bg-zinc-50/50 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
        )}
      >
        <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <UploadCloud className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-[11px] text-zinc-400">
          CSV, PDF, JSON, or PNG up to 25MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="rounded-xl border border-zinc-200 bg-white p-3 space-y-2 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-zinc-400">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.progress >= 100 && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-rose-500 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <Progress
                value={file.progress}
                size="sm"
                variant={file.progress >= 100 ? "emerald" : "blue"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
