import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Search,
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  CreditCard,
  FolderKanban,
  BarChart3,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Avatar } from "../primitives/avatar"
import { Badge } from "../primitives/badge"
import { Button } from "../primitives/button"
import { CommandPalette } from "../primitives/command-palette"

export interface SidebarNavItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string
  active?: boolean
  children?: Array<{ id: string; label: string; active?: boolean }>
}

const defaultNavItems: SidebarNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
    active: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    children: [
      { id: "revenue", label: "Revenue & MRR", active: true },
      { id: "retention", label: "Cohort Retention" },
      { id: "funnels", label: "Conversion Funnels" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanban className="h-4 w-4" />,
    badge: "12",
  },
  {
    id: "customers",
    label: "Customers",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "billing",
    label: "Billing",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export interface SidebarShellProps {
  items?: SidebarNavItem[]
  activeId?: string
  onSelect?: (id: string) => void
  defaultCollapsed?: boolean
  workspaceName?: string
  workspaceTier?: string
  className?: string
}

export const SidebarShell: React.FC<SidebarShellProps> = ({
  items = defaultNavItems,
  activeId,
  onSelect,
  defaultCollapsed = false,
  workspaceName = "Acme Corp",
  workspaceTier = "Pro",
  className,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const [selectedId, setSelectedId] = React.useState(activeId || "overview")
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    analytics: true,
  })

  const currentId = activeId !== undefined ? activeId : selectedId

  const handleSelect = (id: string) => {
    setSelectedId(id)
    onSelect?.(id)
  }

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-zinc-200 bg-zinc-50/70 text-zinc-700 transition-all duration-200 select-none shrink-0 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      {/* Workspace Header */}
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-3.5 dark:border-zinc-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Layers className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {workspaceName}
                </p>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  {workspaceTier}
                </span>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {!collapsed && (
          <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Workspace
          </div>
        )}
        {items.map((item) => {
          const isActive = currentId === item.id
          const hasChildren = Boolean(item.children && item.children.length > 0)
          const isOpen = openGroups[item.id]

          return (
            <div key={item.id} className="space-y-0.5">
              <button
                type="button"
                onClick={() => {
                  handleSelect(item.id)
                  if (hasChildren) {
                    setOpenGroups((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }))
                  }
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-zinc-200/75 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-200/40 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                )}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      "shrink-0",
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-zinc-400"
                    )}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </span>

                {!collapsed && (
                  <span className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-zinc-400 transition-transform",
                          isOpen ? "rotate-0" : "-rotate-90"
                        )}
                      />
                    )}
                  </span>
                )}
              </button>

              {!collapsed && hasChildren && isOpen && (
                <div className="ml-4 border-l border-zinc-200 pl-2.5 space-y-0.5 dark:border-zinc-800">
                  {item.children!.map((sub) => {
                    const subActive = currentId === sub.id
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => handleSelect(sub.id)}
                        className={cn(
                          "flex w-full items-center rounded-md px-2.5 py-1.5 text-xs transition-colors cursor-pointer",
                          subActive
                            ? "text-blue-600 font-medium dark:text-blue-400"
                            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                        )}
                      >
                        {sub.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer User Pod */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar fallback="SR" tint="blue" size="sm" status="online" />
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  Saeful Rohman
                </p>
                <p className="truncate text-[11px] text-zinc-500">
                  saeful@acme.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export interface HeaderNavbarProps {
  breadcrumbs?: string[]
  onOpenCommandPalette?: () => void
  className?: string
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  breadcrumbs = ["Workspace", "Analytics", "Overview"],
  onOpenCommandPalette,
  className,
}) => {
  const [internalCmdOpen, setInternalCmdOpen] = React.useState(false)

  const handleOpenSearch = () => {
    if (onOpenCommandPalette) {
      onOpenCommandPalette()
    } else {
      setInternalCmdOpen(true)
    }
  }

  return (
    <>
      <header
        className={cn(
          "flex h-14 w-full items-center justify-between border-b border-zinc-200 bg-white px-5 dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
      >
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            return (
              <React.Fragment key={crumb}>
                {idx > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                )}
                <span
                  className={cn(
                    "truncate",
                    isLast
                      ? "font-medium text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {crumb}
                </span>
              </React.Fragment>
            )
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenSearch}
            className="hidden sm:flex h-8 w-52 items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 text-xs text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-400" />
              <span>Quick search...</span>
            </span>
            <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
          >
            <Bell className="h-3.5 w-3.5" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600" />
          </button>
        </div>
      </header>

      {!onOpenCommandPalette && (
        <CommandPalette
          open={internalCmdOpen}
          onOpenChange={setInternalCmdOpen}
          enableGlobalShortcut={false}
        />
      )}
    </>
  )
}

export interface PageHeaderBarProps {
  title: string
  subtitle?: string
  badge?: string
  actions?: React.ReactNode
  className?: string
}

export const PageHeaderBar: React.FC<PageHeaderBarProps> = ({
  title,
  subtitle,
  badge,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800",
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          {badge && (
            <Badge variant="blue" dot>
              {badge}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {actions || (
          <>
            <Button variant="outline" size="sm">
              Export report
            </Button>
            <Button variant="primary" size="sm">
              New report
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export interface AppShellProps {
  workspaceName?: string
  planBadge?: string
  breadcrumbs?: string[]
  user?: {
    name: string
    email: string
    initials: string
    avatarSrc?: string
  }
  children?: React.ReactNode
  className?: string
}

export const AppShell: React.FC<AppShellProps> = ({
  workspaceName = "Acme Corp",
  planBadge = "Pro",
  breadcrumbs = ["Workspace", "Overview"],
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex min-h-[600px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
    >
      <SidebarShell
        workspaceName={workspaceName}
        workspaceTier={planBadge}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <HeaderNavbar breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
