import * as React from "react"
import {
  BarChart3,
  Users,
  Settings,
  Layers,
  Terminal,
  Copy,
  Check,
} from "lucide-react"
import {
  ExecutiveAnalyticsTemplate,
  ControlTowerTemplate,
  WorkspaceSettingsTemplate,
  StatMetricCard,
  AvatarGroup,
  Badge,
  Button,
  Switch,
  Progress,
  CircularProgress,
  ToastCard,
  Combobox,
  cn,
} from "@etherealui/react"

export const LandingHeroShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<
    "analytics" | "customers" | "settings" | "primitives"
  >("analytics")
  const [copiedCli, setCopiedCli] = React.useState(false)
  const [region, setRegion] = React.useState("us-east-1")
  const [autoBackup, setAutoBackup] = React.useState(true)

  const cliCmd = "npx @etherealui/cli@latest add avatar"

  return (
    <div className="space-y-4">
      {/* Clean BoardUI / shadcn Switcher Bar */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-1.5 dark:border-zinc-800 dark:bg-zinc-900/70">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              activeTab === "analytics"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            )}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Analytics
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("customers")}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              activeTab === "customers"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            )}
          >
            <Users className="h-3.5 w-3.5" />
            Customers Table
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              activeTab === "settings"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            )}
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("primitives")}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 sm:px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer",
              activeTab === "primitives"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-white"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            Components
          </button>
        </div>

        <div className="flex items-center gap-2 px-1">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(cliCmd)
              setCopiedCli(true)
              setTimeout(() => setCopiedCli(false), 1800)
            }}
            className="inline-flex h-8 w-full sm:w-auto items-center justify-between sm:justify-start gap-2 rounded-xl border border-zinc-200 bg-white px-3 font-mono text-[11px] sm:text-xs text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 cursor-pointer min-w-0"
          >
            <span className="flex items-center gap-2 truncate">
              <Terminal className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <span className="truncate">{cliCmd}</span>
            </span>
            {copiedCli ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
            )}
          </button>
        </div>
      </div>

      {/* Active Viewport */}
      <div>
        {activeTab === "analytics" && <ExecutiveAnalyticsTemplate />}
        {activeTab === "customers" && <ControlTowerTemplate />}
        {activeTab === "settings" && <WorkspaceSettingsTemplate />}
        {activeTab === "primitives" && (
          <div className="grid grid-cols-1 gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/40 p-6 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="space-y-4">
              <StatMetricCard
                title="Monthly Recurring Revenue"
                value="$128,430"
                change="+14.2%"
                trend="up"
                subtitle="Compared to $112.4k last month"
                accent="blue"
              />
              <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Active Workspace Members
                  </span>
                  <Badge variant="emerald" dot>
                    Online
                  </Badge>
                </div>
                <AvatarGroup
                  max={5}
                  items={[
                    { alt: "Saeful Rohman", fallback: "SR", tint: "blue" },
                    { alt: "Elena Rostova", fallback: "ER", tint: "neutral" },
                    { alt: "Marcus Vance", fallback: "MV", tint: "emerald" },
                    { alt: "Aria Chen", fallback: "AC", tint: "blue" },
                    { alt: "Kenji Takahashi", fallback: "KT", tint: "neutral" },
                    { alt: "Nadia Vance", fallback: "NV", tint: "neutral" },
                  ]}
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button variant="primary" size="sm">
                    Invite member
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage roles
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Interactive Controls
                </h3>
                <p className="text-xs text-zinc-500">
                  Built on Radix UI Primitives with Light &amp; Dark mode tokens
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Primary Region
                </span>
                <Combobox
                  value={region}
                  onValueChange={setRegion}
                  options={[
                    { value: "us-east-1", label: "US East (N. Virginia)", badge: "Primary" },
                    { value: "eu-central-1", label: "EU Central (Frankfurt)", badge: "EU" },
                    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)", badge: "APAC" },
                  ]}
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div>
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    Automatic Daily Backups
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    Retain snapshots for 30 days
                  </p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>

              <Progress
                value={76}
                label="Storage Quota"
                showValue
                variant="blue"
              />
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col justify-between space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    System Uptime
                  </h3>
                  <p className="text-xs text-zinc-500">Last 90 days</p>
                </div>
                <CircularProgress value={99} variant="emerald" />
              </div>

              <ToastCard
                variant="success"
                title="Changes published"
                description="Your workspace configuration is now live."
              />

              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="blue" dot>
                  Light &amp; Dark Mode
                </Badge>
                <Badge variant="default">Tailwind v4</Badge>
                <Badge variant="emerald">100% Free</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
