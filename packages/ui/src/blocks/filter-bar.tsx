import * as React from "react"
import { Search, SlidersHorizontal, X, RotateCcw, LayoutGrid, List } from "lucide-react"
import { cn } from "../utils/cn"
import { Input } from "../primitives/input"
import { Button, ToggleGroup } from "../primitives/button"
import { DateRangePicker } from "../primitives/date-picker"

export interface ActiveFilterPill {
  id: string
  field: string
  value: string
}

export interface AdvancedFilterBarProps {
  searchQuery?: string
  onSearchChange?: (q: string) => void
  initialPills?: ActiveFilterPill[]
  className?: string
}

export const AdvancedFilterBar: React.FC<AdvancedFilterBarProps> = ({
  searchQuery = "",
  onSearchChange,
  initialPills = [
    { id: "status", field: "Status", value: "Active, Trialing" },
    { id: "plan", field: "Plan", value: "Enterprise, Pro" },
  ],
  className,
}) => {
  const [query, setQuery] = React.useState(searchQuery)
  const [pills, setPills] = React.useState<ActiveFilterPill[]>(initialPills)
  const [viewMode, setViewMode] = React.useState("table")

  const handleSearch = (val: string) => {
    setQuery(val)
    onSearchChange?.(val)
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-3.5 space-y-3 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-2.5">
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search customers, emails, or invoices..."
            leftIcon={<Search className="h-3.5 w-3.5" />}
            className="max-w-md"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (!pills.some((p) => p.id === "region")) {
                setPills((prev) => [
                  ...prev,
                  { id: "region", field: "Region", value: "North America" },
                ])
              }
            }}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
            Filter
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker />
          <ToggleGroup
            size="sm"
            value={viewMode}
            onValueChange={setViewMode}
            items={[
              {
                value: "table",
                label: "List",
                icon: <List className="h-3.5 w-3.5" />,
              },
              {
                value: "grid",
                label: "Grid",
                icon: <LayoutGrid className="h-3.5 w-3.5" />,
              },
            ]}
          />
        </div>
      </div>

      {pills.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-2.5 dark:border-zinc-800">
          <span className="text-[11px] font-medium text-zinc-400">
            Active filters:
          </span>
          {pills.map((pill) => (
            <span
              key={pill.id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200"
            >
              <span className="text-zinc-400">{pill.field}:</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {pill.value}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPills((prev) => prev.filter((item) => item.id !== pill.id))
                }
                className="ml-0.5 rounded p-0.5 text-zinc-400 hover:bg-zinc-200/70 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => {
              setPills([])
              handleSearch("")
            }}
            className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white ml-auto cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
