import * as React from "react"
import { cn } from "../utils/cn"
import {
  SidebarShell,
  HeaderNavbar,
  PageHeaderBar,
} from "../blocks/app-shell"
import { AdvancedFilterBar } from "../blocks/filter-bar"
import { EnterpriseDataTable } from "../blocks/data-table"

export const ControlTowerTemplate: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "flex min-h-[720px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/40 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
        className
      )}
    >
      <SidebarShell activeId="customers" />

      <div className="flex flex-1 flex-col min-w-0">
        <HeaderNavbar
          breadcrumbs={["Workspace", "Customers", "Directory"]}
        />

        <main className="flex-1 space-y-5 overflow-y-auto p-6">
          <PageHeaderBar
            title="Customer Directory"
            subtitle="Search, filter, and inspect customer subscriptions. Click any row to open the details drawer."
          />

          <AdvancedFilterBar />

          <EnterpriseDataTable />
        </main>
      </div>
    </div>
  )
}
