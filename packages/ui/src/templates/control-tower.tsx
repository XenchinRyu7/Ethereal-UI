import * as React from "react"
import { X } from "lucide-react"
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
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "relative flex min-h-[560px] sm:min-h-[720px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/40 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
        className
      )}
    >
      <SidebarShell activeId="customers" className="hidden md:flex" />

      {mobileNavOpen && (
        <div className="absolute inset-0 z-30 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative z-10 flex h-full">
            <SidebarShell
              activeId="customers"
              className="h-full bg-white dark:bg-zinc-900 shadow-xl"
            />
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close sidebar"
              className="m-2 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900/80 text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <HeaderNavbar
          breadcrumbs={["Workspace", "Customers", "Directory"]}
          onToggleMobileMenu={() => setMobileNavOpen(true)}
        />

        <main className="flex-1 space-y-4 sm:space-y-5 overflow-y-auto p-3.5 sm:p-6">
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
