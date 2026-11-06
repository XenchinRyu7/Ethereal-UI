import * as React from "react"
import {
  ArrowUpDown,
  Search,
  MoreHorizontal,
  Download,
  Eye,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Avatar } from "../primitives/avatar"
import { Badge } from "../primitives/badge"
import { Button } from "../primitives/button"
import { Checkbox } from "../primitives/switch"
import { Input } from "../primitives/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../primitives/dropdown-menu"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../primitives/drawer"
import { Progress } from "../primitives/progress"

export interface EnterpriseRowData {
  id: string
  customer: string
  email: string
  plan: string
  status: "active" | "trialing" | "past_due" | "canceled"
  mrrAmount: number
  mrrFormatted: string
  seatUsage: number
  updatedAt: string
}

const defaultRows: EnterpriseRowData[] = [
  {
    id: "cus-9921",
    customer: "Linear Orbit Inc.",
    email: "billing@linearorbit.io",
    plan: "Enterprise Annual",
    status: "active",
    mrrAmount: 4200,
    mrrFormatted: "$4,200.00",
    seatUsage: 84,
    updatedAt: "2 hours ago",
  },
  {
    id: "cus-8840",
    customer: "Raycast Labs GmbH",
    email: "finance@raycastlabs.de",
    plan: "Enterprise Annual",
    status: "active",
    mrrAmount: 3150,
    mrrFormatted: "$3,150.00",
    seatUsage: 62,
    updatedAt: "5 hours ago",
  },
  {
    id: "cus-7732",
    customer: "chronicle.so",
    email: "accounts@chronicle.so",
    plan: "Pro Monthly",
    status: "trialing",
    mrrAmount: 890,
    mrrFormatted: "$890.00",
    seatUsage: 45,
    updatedAt: "1 day ago",
  },
  {
    id: "cus-6419",
    customer: "Northstar Analytics",
    email: "ops@northstar.co",
    plan: "Scale Annual",
    status: "past_due",
    mrrAmount: 1950,
    mrrFormatted: "$1,950.00",
    seatUsage: 92,
    updatedAt: "2 days ago",
  },
  {
    id: "cus-5108",
    customer: "Veloce Design Studio",
    email: "team@veloce.design",
    plan: "Pro Monthly",
    status: "active",
    mrrAmount: 640,
    mrrFormatted: "$640.00",
    seatUsage: 38,
    updatedAt: "3 days ago",
  },
]

const statusBadgeVariant: Record<
  EnterpriseRowData["status"],
  { variant: "emerald" | "blue" | "amber" | "rose"; label: string }
> = {
  active: { variant: "emerald", label: "Active" },
  trialing: { variant: "blue", label: "Trialing" },
  past_due: { variant: "amber", label: "Past Due" },
  canceled: { variant: "rose", label: "Canceled" },
}

export interface EnterpriseDataTableProps {
  data?: EnterpriseRowData[]
  className?: string
}

export const EnterpriseDataTable: React.FC<EnterpriseDataTableProps> = ({
  data = defaultRows,
  className,
}) => {
  const [rows, setRows] = React.useState<EnterpriseRowData[]>(data)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [sortAsc, setSortAsc] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState<Record<string, boolean>>({})
  const [inspectedRow, setInspectedRow] = React.useState<EnterpriseRowData | null>(null)
  const [showPlanCol, setShowPlanCol] = React.useState(true)

  const filteredRows = React.useMemo(() => {
    return rows
      .filter((r) => {
        if (statusFilter !== "all" && r.status !== statusFilter) return false
        if (!search.trim()) return true
        const q = search.toLowerCase()
        return (
          r.customer.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.plan.toLowerCase().includes(q)
        )
      })
      .sort((a, b) =>
        sortAsc ? a.mrrAmount - b.mrrAmount : b.mrrAmount - a.mrrAmount
      )
  }, [rows, search, statusFilter, sortAsc])

  const selectedCount = Object.values(selectedIds).filter(Boolean).length

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      {/* Table Toolbar */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 lg:flex-row lg:items-center lg:justify-between dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2.5">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter customers..."
            leftIcon={<Search className="h-3.5 w-3.5" />}
            className="w-full sm:w-64"
          />

          <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100/70 p-0.5 text-xs dark:border-zinc-800 dark:bg-zinc-800/60">
            {(["all", "active", "trialing", "past_due"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "rounded-md px-2.5 py-1 capitalize transition-colors cursor-pointer",
                  statusFilter === st
                    ? "bg-white text-zinc-900 font-medium shadow-2xs dark:bg-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                )}
              >
                {st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <Badge variant="blue">{selectedCount} selected</Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPlanCol((prev) => !prev)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Columns
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/70 text-[11px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={
                    filteredRows.length > 0 &&
                    filteredRows.every((r) => selectedIds[r.id])
                  }
                  onCheckedChange={(checked) => {
                    const next: Record<string, boolean> = {}
                    if (checked) {
                      filteredRows.forEach((r) => {
                        next[r.id] = true
                      })
                    }
                    setSelectedIds(next)
                  }}
                />
              </th>
              <th className="px-4 py-3">Customer</th>
              {showPlanCol && <th className="px-4 py-3">Plan</th>}
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => setSortAsc(!sortAsc)}
                  className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white cursor-pointer"
                >
                  MRR
                  <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                </button>
              </th>
              <th className="px-4 py-3">Seat Utilization</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-xs text-zinc-400"
                >
                  No customers match your filter criteria.
                </td>
              </tr>
            ) : (
              filteredRows.map((row, idx) => {
                const badgeInfo = statusBadgeVariant[row.status]
                return (
                  <tr
                    key={row.id}
                    onClick={() => setInspectedRow(row)}
                    className="group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer"
                  >
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={Boolean(selectedIds[row.id])}
                        onCheckedChange={(checked) =>
                          setSelectedIds((prev) => ({
                            ...prev,
                            [row.id]: Boolean(checked),
                          }))
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          fallback={row.customer.slice(0, 2)}
                          tint={idx % 2 === 0 ? "blue" : "neutral"}
                          size="sm"
                        />
                        <div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">
                            {row.customer}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            {row.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    {showPlanCol && (
                      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                        {row.plan}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <Badge variant={badgeInfo.variant} dot>
                        {badgeInfo.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                      {row.mrrFormatted}
                    </td>
                    <td className="px-4 py-3 w-36">
                      <Progress
                        value={row.seatUsage}
                        size="sm"
                        variant={row.seatUsage > 85 ? "amber" : "blue"}
                      />
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{row.updatedAt}</td>
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => setInspectedRow(row)}
                          >
                            <Eye className="h-3.5 w-3.5 text-zinc-400" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              navigator.clipboard?.writeText(row.id)
                            }
                          >
                            <Copy className="h-3.5 w-3.5 text-zinc-400" />
                            Copy customer ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            destructive
                            onSelect={() =>
                              setRows((prev) =>
                                prev.filter((item) => item.id !== row.id)
                              )
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div>
          Showing <strong className="text-zinc-900 dark:text-zinc-100">1</strong>{" "}
          to{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            {filteredRows.length}
          </strong>{" "}
          of{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">
            {rows.length}
          </strong>{" "}
          results
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Slide-over Inspector Drawer */}
      <Drawer
        open={Boolean(inspectedRow)}
        onOpenChange={(open) => !open && setInspectedRow(null)}
      >
        <DrawerContent side="right">
          {inspectedRow && (
            <>
              <DrawerHeader>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={statusBadgeVariant[inspectedRow.status].variant}
                    dot
                  >
                    {statusBadgeVariant[inspectedRow.status].label}
                  </Badge>
                  <span className="font-mono text-xs text-zinc-400">
                    {inspectedRow.id}
                  </span>
                </div>
                <DrawerTitle className="mt-2">
                  {inspectedRow.customer}
                </DrawerTitle>
                <DrawerDescription>
                  {inspectedRow.email} • {inspectedRow.plan}
                </DrawerDescription>
              </DrawerHeader>

              <div className="my-5 space-y-4 overflow-y-auto text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                    <span className="text-zinc-500">Monthly Revenue</span>
                    <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                      {inspectedRow.mrrFormatted}
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/50">
                    <span className="text-zinc-500">Seat Utilization</span>
                    <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                      {inspectedRow.seatUsage}%
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-200 p-4 space-y-3 dark:border-zinc-800">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    Quota Usage
                  </div>
                  <Progress
                    value={inspectedRow.seatUsage}
                    label="Team Seats"
                    showValue
                    variant="blue"
                  />
                  <Progress
                    value={64}
                    label="Storage Volume"
                    showValue
                    variant="emerald"
                  />
                </div>
              </div>

              <DrawerFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInspectedRow(null)}
                >
                  Close
                </Button>
                <Button variant="primary" size="sm">
                  Edit subscription
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}
