import * as React from "react"
import {
  Plus,
  Search,
  Check,
  Sparkles,
  FileText,
  Image as ImageIcon,
  FileCode2,
  Home,
  FolderKanban,
  AlertTriangle,
  ArrowUpRight,
  Calendar as CalendarIcon,
  ChevronRight,
  Copy,
  Terminal,
  Activity,
  Users,
  TrendingUp,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react"
import {
  cn,
  KanbanBoardBlock,
  PromptComposerBlock,
  AgentProgressBlock,
  TokenUsageBlock,
} from "@etherealui/react"

type AccentColor = "blue" | "orange" | "violet" | "emerald" | "rose" | "cyan"

const ACCENT_PALETTE: Record<
  AccentColor,
  {
    name: string
    dot: string
    bg: string
    bgHover: string
    softBg: string
    text: string
    border: string
    ring: string
    hex: string
  }
> = {
  blue: {
    name: "Electric Blue",
    dot: "bg-blue-600",
    bg: "bg-blue-600",
    bgHover: "hover:bg-blue-700",
    softBg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    ring: "ring-blue-500/30",
    hex: "#2563eb",
  },
  orange: {
    name: "Board Amber",
    dot: "bg-amber-500",
    bg: "bg-amber-500",
    bgHover: "hover:bg-amber-600",
    softBg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/30",
    ring: "ring-amber-500/30",
    hex: "#f59e0b",
  },
  violet: {
    name: "Royal Violet",
    dot: "bg-violet-600",
    bg: "bg-violet-600",
    bgHover: "hover:bg-violet-700",
    softBg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/30",
    ring: "ring-violet-500/30",
    hex: "#7c3aed",
  },
  emerald: {
    name: "Emerald Pulse",
    dot: "bg-emerald-600",
    bg: "bg-emerald-600",
    bgHover: "hover:bg-emerald-700",
    softBg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    ring: "ring-emerald-500/30",
    hex: "#059669",
  },
  rose: {
    name: "Crimson Rose",
    dot: "bg-rose-600",
    bg: "bg-rose-600",
    bgHover: "hover:bg-rose-700",
    softBg: "bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500/30",
    ring: "ring-rose-500/30",
    hex: "#e11d48",
  },
  cyan: {
    name: "Cyber Cyan",
    dot: "bg-cyan-600",
    bg: "bg-cyan-600",
    bgHover: "hover:bg-cyan-700",
    softBg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500/30",
    ring: "ring-cyan-500/30",
    hex: "#0891b2",
  },
}

const HEATMAP_LEVELS = [
  0, 1, 2, 3, 2, 1, 3, 4, 2, 1, 0, 2, 3, 4, 3, 2, 1, 4, 3, 2, 4, 3, 1, 2,
  1, 3, 4, 2, 0, 1, 3, 2, 4, 3, 2, 1, 2, 4, 3, 1, 2, 3, 4, 2, 1, 3, 2, 4,
  2, 4, 3, 1, 2, 3, 4, 1, 2, 3, 2, 4, 3, 1, 2, 4, 3, 2, 1, 3, 4, 2, 3, 4,
]

export const LandingBentoShowcase: React.FC = () => {
  const [accent, setAccent] = React.useState<AccentColor>("blue")
  const [copiedInstall, setCopiedInstall] = React.useState(false)
  const [activeStep, setActiveStep] = React.useState(3)
  const [selectedRows, setSelectedRows] = React.useState<string[]>(["c1"])
  const [activeNav, setActiveNav] = React.useState("home")
  const [bypassMode, setBypassMode] = React.useState(true)
  const [selectedDay, setSelectedDay] = React.useState(14)
  const [statRange, setStatRange] = React.useState<"24h" | "7d" | "30d">("30d")

  const theme = ACCENT_PALETTE[accent]

  // Auto-animate step progress like a live agentic workflow
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1))
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const statMultipliers = {
    "24h": { mrr: "$4,820", users: "1,420", latency: "18ms", bars: [45, 62, 58, 75, 82, 79, 94, 88, 96, 100] },
    "7d": { mrr: "$32,940", users: "8,910", latency: "21ms", bars: [52, 60, 68, 64, 78, 85, 80, 91, 95, 98] },
    "30d": { mrr: "$128,430", users: "24,892", latency: "19ms", bars: [38, 48, 55, 62, 70, 74, 83, 89, 94, 100] },
  }[statRange]

  return (
    <div className="space-y-16">
      {/* 1. Hero Action & Interactive CLI + Theme Accent Bar */}
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white",
              theme.bg
            )}
          >
            <Sparkles className="h-2.5 w-2.5" /> v0.0.4
          </span>
          <span>37+ Components, 14 AI, Statistical &amp; SaaS Blocks, Light &amp; Dark Mode</span>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl leading-[1.06] dark:text-zinc-100">
          Agentic components, statistical blocks &amp; SaaS dashboards.
        </h1>

        <p className="max-w-xl text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Buttons, data tables, statistical widgets, calendars, command palettes, and full-page templates—crafted with{" "}
          <strong className="font-medium text-zinc-900 dark:text-zinc-100">Tailwind CSS v4</strong> &amp;{" "}
          <strong className="font-medium text-zinc-900 dark:text-zinc-100">Radix UI</strong>.
        </p>

        {/* BoardUI-style dual CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href="/docs/installation"
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-xl px-5 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer",
              theme.bg,
              theme.bgHover
            )}
          >
            <Zap className="h-3.5 w-3.5" />
            Install for free
          </a>
          <a
            href="/components/avatar"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-xs font-semibold text-zinc-800 shadow-2xs transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <Layers className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            Browse all components
          </a>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText("npx @etherealui/cli@latest init")
              setCopiedInstall(true)
              setTimeout(() => setCopiedInstall(false), 1800)
            }}
            className="inline-flex h-10 items-center gap-2.5 rounded-xl border border-zinc-200/90 bg-zinc-50 px-3.5 font-mono text-xs text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700 cursor-pointer"
          >
            <Terminal className={cn("h-3.5 w-3.5", theme.text)} />
            <span>npx @etherealui/cli@latest init</span>
            {copiedInstall ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
            )}
          </button>
        </div>

        {/* Interactive Accent Color Switcher Pill (BoardUI style) */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 pr-1">
            Live Accent:
          </span>
          {(Object.keys(ACCENT_PALETTE) as AccentColor[]).map((key) => {
            const item = ACCENT_PALETTE[key]
            const active = accent === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setAccent(key)}
                title={item.name}
                aria-label={`Select ${item.name} theme`}
                className={cn(
                  "h-5 w-5 rounded-full transition-transform cursor-pointer",
                  item.dot,
                  active
                    ? "scale-110 ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-950"
                    : "opacity-75 hover:opacity-100 hover:scale-105"
                )}
              />
            )
          })}
        </div>
      </div>

      {/* 2. BoardUI-Style 4-Column Interactive Visual Bento Grid (8 Live Widget Cards) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Composer Attachments & Upload Tile */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-2.5">
              <FolderKanban className="h-3 w-3" />
              <span>main</span>
              <span>/</span>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">ethereal-ui</span>
            </div>

            {/* Animated Floating Attachment Tiles */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <ImageIcon className={cn("h-3.5 w-3.5", theme.text)} />
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">100%</span>
                </div>
                <p className="mt-1.5 truncate text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                  hero-ui.png
                </p>
                <p className="text-[9px] text-zinc-400">1.8 MB</p>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 transition-transform duration-300 delay-75 group-hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400">84%</span>
                </div>
                <p className="mt-1.5 truncate text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                  payroll.csv
                </p>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className={cn("h-full w-4/5 rounded-full animate-pulse", theme.bg)} />
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 transition-transform duration-300 delay-150 group-hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center justify-between">
                  <FileCode2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-[9px] font-mono text-zinc-400">TSX</span>
                </div>
                <p className="mt-1.5 truncate text-[10px] font-medium text-zinc-700 dark:text-zinc-200">
                  tokens.ts
                </p>
                <p className="text-[9px] text-zinc-400">4.2 KB</p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-[11px] text-zinc-400">
                Generate a dark &amp; light mode KPI card...
              </p>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setBypassMode(!bypassMode)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>{bypassMode ? "Auto-sync tokens" : "Manual tokens"}</span>
                </button>
                <span className={cn("h-2 w-2 rounded-full animate-ping", theme.dot)} />
              </div>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/prompt-composer#attachments" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Composer attachments
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              File tiles landing one by one above the prompt, each with live upload progress.
            </p>
          </div>
        </div>

        {/* Card 2: Streaming Web Search & Command Trace */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 dark:text-zinc-200">
              <span className="flex items-center gap-1.5">
                <Search className={cn("h-3.5 w-3.5", theme.text)} />
                Ran 3 registry queries
              </span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                18ms
              </span>
            </div>

            <div className="mt-3 ml-1.5 border-l-2 border-zinc-200 pl-3 space-y-2.5 text-[11px] dark:border-zinc-800">
              <div className="space-y-1">
                <p className="text-zinc-600 dark:text-zinc-300 truncate">
                  What teams need in a design system
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400">Sources</span>
                  <span className="inline-flex h-4 items-center rounded bg-blue-500/10 px-1 font-mono text-[9px] text-blue-600 dark:text-blue-400">
                    Radix
                  </span>
                  <span className="inline-flex h-4 items-center rounded bg-emerald-500/10 px-1 font-mono text-[9px] text-emerald-600 dark:text-emerald-400">
                    TW v4
                  </span>
                  <span className="inline-flex h-4 items-center rounded bg-amber-500/10 px-1 font-mono text-[9px] text-amber-600 dark:text-amber-400">
                    ARIA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <span className="font-mono text-[10px] text-zinc-900 dark:text-zinc-100">𝕏</span>
                <span className="truncate">Searched for zero-runtime CSS tokens</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", theme.dot)} />
                <span className="truncate">Indexing 37 accessible primitives...</span>
              </div>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/agent-progress#search-stream" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Command &amp; search stream
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Real-time search traces, keyboard command palette, and source citations.
            </p>
          </div>
        </div>

        {/* Card 3: Agent Limits & Statistical Quota Breakdown (Block Statistik) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 space-y-3">
            <div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-zinc-700 dark:text-zinc-200">Context window</span>
                <span className="font-mono text-zinc-500 dark:text-zinc-400">
                  820k / 1M <strong className="text-zinc-900 dark:text-white">(82%)</strong>
                </span>
              </div>
              {/* Multi-segment color bar */}
              <div className="mt-1.5 flex h-2 w-full overflow-hidden rounded-full bg-zinc-100 gap-0.5 dark:bg-zinc-800">
                <div className="h-full w-[42%] bg-blue-600 rounded-l-full" />
                <div className="h-full w-[24%] bg-violet-500" />
                <div className="h-full w-[16%] bg-emerald-500 rounded-r-full" />
              </div>
            </div>

            <div className="text-[10px] font-medium text-zinc-400 pt-0.5">
              Plan usage limits - Enterprise (5x)
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">5-hour burst</span>
                  <span className="text-zinc-400">
                    Resets in 2 hr 46 min <strong className="text-zinc-800 dark:text-zinc-200">38%</strong>
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className={cn("h-full w-[38%] rounded-full transition-all duration-500", theme.bg)} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Weekly - all models</span>
                  <span className="text-zinc-400">
                    Resets Tue 9:00 PM <strong className="text-zinc-800 dark:text-zinc-200">64%</strong>
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full w-[64%] rounded-full bg-emerald-500 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/token-usage" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Usage &amp; quota statistics
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Context window usage with multi-segment token breakdown and plan limits.
            </p>
          </div>
        </div>

        {/* Card 4: Interactive Mini Data Table */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5 dark:border-zinc-800">
              <div>
                <p className="text-[10px] text-zinc-400">Total Results</p>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">48 customers</p>
              </div>
              <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                All ({selectedRows.length} selected)
              </span>
            </div>

            <div className="mt-2 space-y-1.5">
              {[
                { id: "c1", name: "John Clarkson", mrr: "$4,200", badge: "Enterprise", init: "JC" },
                { id: "c2", name: "Sarah Jenkins", mrr: "$2,850", badge: "Scale", init: "SJ" },
                { id: "c3", name: "Marcus Vance", mrr: "$1,920", badge: "Pro", init: "MV" },
              ].map((row) => {
                const checked = selectedRows.includes(row.id)
                return (
                  <div
                    key={row.id}
                    onClick={() => toggleRow(row.id)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-2 py-1.5 text-xs transition-colors cursor-pointer",
                      checked
                        ? "bg-blue-50/70 dark:bg-blue-500/10"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px]",
                          checked
                            ? cn("border-transparent text-white", theme.bg)
                            : "border-zinc-300 dark:border-zinc-700"
                        )}
                      >
                        {checked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </span>
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[9px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        {row.init}
                      </span>
                      <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">
                        {row.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                      {row.mrr}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/data-table" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Data table
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Filter, sort, and select complex datasets in a responsive enterprise table.
            </p>
          </div>
        </div>

        {/* Card 5: Playful Health & Circular Ring Widgets (Block Statistik) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 grid grid-cols-2 gap-2.5">
            {/* Left Health Ring Card */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-2.5 flex flex-col items-center justify-between dark:border-zinc-800/80 dark:bg-zinc-900/50">
              <div className="w-full flex items-center justify-between text-[10px]">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Excellent</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">+4.2%</span>
              </div>

              {/* Multi-color SVG Ring */}
              <div className="relative flex h-20 w-20 items-center justify-center my-1">
                <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-zinc-200 dark:text-zinc-800"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="7"
                    strokeDasharray="188"
                    strokeDashoffset="32"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="7"
                    strokeDasharray="188"
                    strokeDashoffset="115"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-base font-bold text-zinc-900 dark:text-white">
                  98
                </span>
              </div>

              <div className="w-full space-y-0.5 text-[9px] text-zinc-500">
                <div className="flex justify-between">
                  <span>Uptime SLA</span>
                  <span className="font-mono text-zinc-800 dark:text-zinc-200">49/50</span>
                </div>
                <div className="flex justify-between">
                  <span>Cache Hit</span>
                  <span className="font-mono text-zinc-800 dark:text-zinc-200">29/30</span>
                </div>
              </div>
            </div>

            {/* Right Alerts Feed */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-2.5 flex flex-col justify-between dark:border-zinc-800/80 dark:bg-zinc-900/50">
              <div>
                <p className="text-[10px] text-zinc-400">Important alerts</p>
                <p className="text-xs font-bold text-zinc-900 dark:text-white">
                  12 <span className="text-[9px] font-normal text-rose-500">this week</span>
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="rounded-lg bg-white p-1.5 border border-zinc-200/60 dark:bg-zinc-950 dark:border-zinc-800">
                  <div className="flex items-center gap-1 text-[9px] font-semibold text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    High P99 Latency
                  </div>
                  <p className="text-[8px] text-zinc-400 truncate mt-0.5">
                    us-east-1 spiked to 142ms
                  </p>
                </div>

                <div className="rounded-lg bg-white p-1.5 border border-zinc-200/60 dark:bg-zinc-950 dark:border-zinc-800">
                  <div className="flex items-center gap-1 text-[9px] font-semibold text-amber-600 dark:text-amber-400">
                    <Activity className="h-2.5 w-2.5" />
                    Rate Limit 85%
                  </div>
                  <p className="text-[8px] text-zinc-400 truncate mt-0.5">
                    Auto-scaling worker pool
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/stat-card" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Statistical &amp; health widgets
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Health widgets with live charts, activity rings, KPI counters, and alerts.
            </p>
          </div>
        </div>

        {/* Card 6: Interactive Sidebar Navigation */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  SR
                </span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Saeful Rohman
                </span>
              </div>
              <span className="rounded border border-zinc-200 px-1.5 py-0.5 text-[9px] text-zinc-400 dark:border-zinc-800">
                PRO
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[11px] text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="flex items-center gap-1.5">
                <Search className="h-3 w-3" /> Quick Search
              </span>
              <kbd className="rounded bg-zinc-200/80 px-1 py-0.5 font-mono text-[9px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                ⌘K
              </kbd>
            </div>

            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveNav("home")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
                  activeNav === "home"
                    ? cn("text-white shadow-xs", theme.bg)
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                )}
              >
                <span className="flex items-center gap-2">
                  <Home className="h-3.5 w-3.5" />
                  Home
                </span>
                <span
                  className={cn(
                    "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                    activeNav === "home"
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  )}
                >
                  152
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveNav("projects")}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer",
                  activeNav === "projects"
                    ? cn("text-white shadow-xs", theme.bg)
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                )}
              >
                <span className="flex items-center gap-2">
                  <FolderKanban className="h-3.5 w-3.5" />
                  Project board
                </span>
                <span className="text-[10px] opacity-75">24</span>
              </button>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/sidebar" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Sidebar
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Collapsible navigation with quick search, badges, and account controls.
            </p>
          </div>
        </div>

        {/* Card 7: Contributor Profile & Heatmap Matrix (Block Statistik) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Saeful Rohman
                </p>
                <p className="text-[10px] text-zinc-400">@saefulrdevs • Lead Architect</p>
              </div>
              <span className="rounded-lg border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                Follow
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-zinc-50 p-2 dark:bg-zinc-900">
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-white">$7,402</p>
                <p className="text-[9px] text-zinc-400">MRR Impact</p>
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 dark:text-white">1,428</p>
                <p className="text-[9px] text-zinc-400">Commits</p>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">99.4%</p>
                <p className="text-[9px] text-zinc-400">Test Pass</p>
              </div>
            </div>

            {/* Colorful Heatmap Grid */}
            <div className="grid grid-cols-12 gap-1 pt-1">
              {HEATMAP_LEVELS.slice(0, 36).map((lvl, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "h-2.5 w-full rounded-[3px] transition-transform hover:scale-125",
                    lvl === 0 && "bg-zinc-100 dark:bg-zinc-800",
                    lvl === 1 && "bg-violet-200 dark:bg-violet-950",
                    lvl === 2 && "bg-violet-400 dark:bg-violet-700",
                    lvl === 3 && "bg-blue-500 dark:bg-blue-500",
                    lvl === 4 && cn(theme.bg)
                  )}
                />
              ))}
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/profile-form" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Contributor &amp; metric profile
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Contributor activity, token stats, and streak insights at a glance.
            </p>
          </div>
        </div>

        {/* Card 8: Live Animated Multi-Step Agent Progress */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {activeStep >= 5 ? "All steps completed" : `Executing step ${activeStep} of 5...`}
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                {activeStep * 20}%
              </span>
            </div>

            <div className="space-y-2">
              {[
                "Read workspace configuration",
                "Install light & dark semantic tokens",
                "Compile 37 Radix UI primitives",
                "Mount statistical dashboard blocks",
                "Run Husky lint & production build",
              ].map((stepLabel, idx) => {
                const stepNum = idx + 1
                const done = stepNum <= activeStep
                return (
                  <div
                    key={stepLabel}
                    onClick={() => setActiveStep(stepNum)}
                    className="flex items-center gap-2 text-[11px] cursor-pointer"
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] transition-colors",
                        done
                          ? cn("text-white", theme.bg)
                          : "border border-zinc-300 text-zinc-400 dark:border-zinc-700"
                      )}
                    >
                      {done ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : stepNum}
                    </span>
                    <span
                      className={cn(
                        "truncate transition-all",
                        done
                          ? "line-through text-zinc-400 dark:text-zinc-500"
                          : "font-medium text-zinc-800 dark:text-zinc-200"
                      )}
                    >
                      {stepLabel}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/agent-progress" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Agent workflow progress
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Live multi-step progress tracker and interactive completion states.
            </p>
          </div>
        </div>

        {/* Card 9: Interactive Prompt Composer (BoardUI Row 3 Card 1) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div className="flex flex-wrap gap-1.5">
              {["Generate KPI block", "Add dark mode", "Export CSV"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-lg border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <Plus className="h-3 w-3" />
                </span>
                <input
                  type="text"
                  defaultValue=""
                  placeholder="Ask me anything..."
                  className="w-full bg-transparent text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-200"
                />
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-zinc-200/70 pt-2 text-[10px] text-zinc-500 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    ⑂ main
                  </span>
                  <span>•</span>
                  <span className="truncate">project-sea ▾</span>
                </div>
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full text-white",
                    theme.bg
                  )}
                >
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/prompt-composer" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Prompt composer
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Rich multi-line prompt input with branch context, attachments, and quick chips.
            </p>
          </div>
        </div>

        {/* Card 10: Streaming Reasoning Trace (BoardUI Row 3 Card 2) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-center">
            <div className="space-y-3">
              {[
                { label: "Thinking", meta: "1.2s", icon: "✦" },
                { label: "Searching the docs", meta: "37 matches", icon: "⌕" },
                { label: "Reading token files", meta: "globals.css", icon: "▤" },
                { label: "Writing the answer", meta: "Streaming...", icon: "✎" },
              ].map((item, idx) => {
                const isCurrent = (activeStep % 4) === idx
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-all",
                      isCurrent
                        ? "bg-zinc-100 text-zinc-900 font-semibold dark:bg-zinc-900 dark:text-white"
                        : "text-zinc-400 dark:text-zinc-500"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className={cn("text-xs", isCurrent && theme.text)}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className="font-mono text-[10px]">{item.meta}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/blocks/agent-progress#reasoning-trace" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Streaming reasoning trace
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Step-by-step reasoning states and live skeleton transitions for AI &amp; SaaS apps.
            </p>
          </div>
        </div>

        {/* Card 11: Interactive Media & Carousel Card (BoardUI Row 3 Card 3) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-4 text-white shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-xs">
                Featured System
              </span>
              <span className="font-mono text-[10px] text-white/80">01 / 04</span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium text-white/80">Design Token Engine</p>
              <h4 className="text-base font-bold leading-snug">
                Zero-Runtime Light &amp; Dark Theme Architecture
              </h4>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1">
                <span className="h-1.5 w-5 rounded-full bg-white" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              </div>
              <span className="text-[10px] font-medium text-white/90">Explore &rarr;</span>
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/components/carousel" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Media &amp; feature carousel
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Smooth multi-slide carousels and rich spotlight cards with keyboard controls.
            </p>
          </div>
        </div>

        {/* Card 12: Monthly Event Scheduler Calendar (BoardUI Row 3 Card 4) */}
        <div className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-zinc-50/50 p-3 transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
          <div className="relative h-52 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                August 2026
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-semibold text-white",
                  theme.bg
                )}
              >
                <Plus className="h-2.5 w-2.5" /> New event
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1 text-[9px]">
              {[
                { day: "12", tag: "Sync", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
                { day: "13", tag: "", color: "" },
                { day: "14", tag: "Release", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
                { day: "15", tag: "Review", color: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
                { day: "16", tag: "", color: "" },
                { day: "17", tag: "Audit", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
                { day: "18", tag: "", color: "" },
                { day: "19", tag: "Demo", color: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
                { day: "20", tag: "", color: "" },
                { day: "21", tag: "Ship", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
              ].map((cell) => (
                <div
                  key={cell.day}
                  className="h-12 rounded-lg border border-zinc-100 p-1 flex flex-col justify-between dark:border-zinc-800/80"
                >
                  <span className="font-mono text-zinc-400">{cell.day}</span>
                  {cell.tag && (
                    <span className={cn("truncate rounded px-1 py-0.2 text-[8px] font-semibold", cell.color)}>
                      {cell.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-2 pt-3.5 pb-1.5">
            <a href="/components/date-calendar" className="text-sm font-semibold text-zinc-900 hover:underline dark:text-zinc-100">
              Event calendar &amp; scheduler
            </a>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              Monthly and range calendars with event pills, keyboard navigation, and popovers.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Center Accent Color Dock (BoardUI style) */}
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
        {(Object.keys(ACCENT_PALETTE) as AccentColor[]).map((key) => {
          const item = ACCENT_PALETTE[key]
          const active = accent === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setAccent(key)}
              title={`Theme: ${item.name}`}
              aria-label={`Theme: ${item.name}`}
              className={cn(
                "h-5 w-5 rounded-full transition-transform cursor-pointer",
                item.dot,
                active
                  ? "scale-115 ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-950"
                  : "opacity-80 hover:opacity-100 hover:scale-105"
              )}
            />
          )
        })}
      </div>

      {/* 3. Dedicated Interactive Statistical Block Section (Block Statistik) */}
      <div className="rounded-3xl border border-zinc-200/90 bg-zinc-50/60 p-5 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>ENTERPRISE STATISTICAL BLOCKS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Real-time KPI Cards, Sparklines &amp; Telemetry Blocks
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Interactive statistical blocks ready to drop into any SaaS analytics or executive dashboard.
            </p>
          </div>

          {/* Interactive Timeframe Switcher */}
          <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950 self-start">
            {(["24h", "7d", "30d"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setStatRange(t)}
                className={cn(
                  "rounded-lg px-3 py-1 text-xs font-semibold uppercase transition-all cursor-pointer",
                  statRange === t
                    ? cn("text-white shadow-2xs", theme.bg)
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Interactive Statistical Blocks */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Stat Block 1: Net Revenue with Live Bar Chart */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Net Settled Revenue
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" /> +18.4%
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {statMultipliers.mrr}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Across 428 enterprise subscriptions
              </p>
            </div>

            <div className="mt-5 flex items-end gap-1.5 h-14 pt-2">
              {statMultipliers.bars.map((val, i) => (
                <div
                  key={i}
                  style={{ height: `${val}%` }}
                  className={cn(
                    "flex-1 rounded-t-sm transition-all duration-500",
                    i >= 7 ? theme.bg : "bg-zinc-200 dark:bg-zinc-800"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Stat Block 2: Active Users & Cohort Breakdown */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Active Workspace Users
                </span>
                <Users className={cn("h-4 w-4", theme.text)} />
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {statMultipliers.users}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                94.2% daily retention score
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-500">Enterprise Tier</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">68%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={cn("h-full w-[68%] rounded-full transition-all duration-500", theme.bg)} />
              </div>
            </div>
          </div>

          {/* Stat Block 3: Edge API Latency & Uptime Meter */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Global Edge P95 Latency
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  99.99% SLA
                </span>
              </div>
              <div className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {statMultipliers.latency}
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                24 edge regions operational
              </p>
            </div>

            {/* 24-node uptime bar */}
            <div className="mt-5 space-y-1.5">
              <div className="grid grid-cols-16 gap-1">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "h-5 rounded-[3px] transition-transform hover:scale-110",
                      idx === 11 ? "bg-amber-400" : "bg-emerald-500"
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>30 days ago</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Today</span>
              </div>
            </div>
          </div>

          {/* Stat Block 4: Interactive Release & Sprint Calendar Widget */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <CalendarIcon className={cn("h-3.5 w-3.5", theme.text)} />
                Release Schedule
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Nov 2026</span>
            </div>

            <div className="my-2 grid grid-cols-7 gap-1 text-center text-[10px]">
              {[10, 11, 12, 13, 14, 15, 16].map((d) => {
                const active = selectedDay === d
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={cn(
                      "h-7 rounded-lg font-medium transition-all cursor-pointer",
                      active
                        ? cn("text-white shadow-2xs", theme.bg)
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    )}
                  >
                    {d}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2 text-[11px] dark:bg-zinc-900">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Nov {selectedDay}: v1.0 Audit
              </span>
              <span className="font-mono text-[10px] text-zinc-400">14:00 UTC</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Dedicated Interactive AI, Agentic & Kanban Blocks Showcase */}
      <div className="rounded-3xl border border-zinc-200/90 bg-zinc-50/60 p-5 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/40 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI, AGENTIC &amp; KANBAN WORKFLOW BLOCKS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Prompt Composer, Agent Progress, Token Quotas &amp; Kanban Board
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              100% free &amp; open-source blocks ready to install via <code className="font-mono text-xs text-blue-600 dark:text-blue-400">npx @etherealui/cli@latest add &lt;block&gt;</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/blocks/prompt-composer"
              className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Prompt Composer &rarr;
            </a>
            <a
              href="/blocks/agent-progress"
              className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Agent Progress &rarr;
            </a>
            <a
              href="/blocks/token-usage"
              className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Token Usage &rarr;
            </a>
            <a
              href="/blocks/kanban-board"
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-semibold text-white shadow-2xs",
                theme.bg,
                theme.bgHover
              )}
            >
              Kanban Board &rarr;
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <PromptComposerBlock className="max-w-none" variant="compact" />
          <AgentProgressBlock className="max-w-none" />
          <TokenUsageBlock className="max-w-none" />
        </div>

        <KanbanBoardBlock variant="compact" />
      </div>
    </div>
  )
}

