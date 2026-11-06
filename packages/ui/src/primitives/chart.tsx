import * as React from "react"
import {
  ArrowUpRight,
  TrendingUp,
  Activity,
  PieChart as PieChartIcon,
  Gauge,
  Grid,
  LineChart as LineChartIcon,
} from "lucide-react"
import { cn } from "../utils/cn"

export interface ChartDataPoint {
  label: string
  value: number
  secondary?: number
}

const DEFAULT_AREA_SERIES: Record<string, ChartDataPoint[]> = {
  "7d": [
    { label: "Mon", value: 14200, secondary: 11800 },
    { label: "Tue", value: 16800, secondary: 13200 },
    { label: "Wed", value: 15900, secondary: 14100 },
    { label: "Thu", value: 19400, secondary: 15600 },
    { label: "Fri", value: 22100, secondary: 17200 },
    { label: "Sat", value: 24600, secondary: 18900 },
    { label: "Sun", value: 28400, secondary: 21400 },
  ],
  "30d": [
    { label: "Oct 05", value: 64000, secondary: 52000 },
    { label: "Oct 10", value: 72000, secondary: 58000 },
    { label: "Oct 15", value: 69500, secondary: 61000 },
    { label: "Oct 20", value: 84200, secondary: 67500 },
    { label: "Oct 25", value: 96800, secondary: 74200 },
    { label: "Oct 30", value: 112400, secondary: 82900 },
    { label: "Nov 05", value: 128430, secondary: 94100 },
  ],
  "90d": [
    { label: "Aug", value: 195000, secondary: 162000 },
    { label: "Sep", value: 248000, secondary: 198000 },
    { label: "Oct", value: 312000, secondary: 244000 },
    { label: "Nov", value: 384500, secondary: 289000 },
  ],
}

export interface AreaStatisticChartProps {
  title?: string
  subtitle?: string
  value?: string
  change?: string
  data?: ChartDataPoint[]
  className?: string
}

export const AreaStatisticChart: React.FC<AreaStatisticChartProps> = ({
  title = "Net Revenue & MRR Velocity",
  subtitle = "Real-time settled volume vs previous billing cycle",
  value = "$128,430",
  change = "+18.4%",
  data,
  className,
}) => {
  const [range, setRange] = React.useState<"7d" | "30d" | "90d">("30d")
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null)

  const series = data || DEFAULT_AREA_SERIES[range]
  const maxVal = Math.max(...series.map((d) => Math.max(d.value, d.secondary || 0)), 1)
  const width = 540
  const height = 160
  const padX = 16
  const padY = 18

  const getCoords = (val: number, idx: number) => {
    const x = padX + (idx / Math.max(series.length - 1, 1)) * (width - padX * 2)
    const y = height - padY - (val / maxVal) * (height - padY * 2)
    return { x, y }
  }

  const primaryPoints = series.map((d, i) => getCoords(d.value, i))
  const secondaryPoints = series.map((d, i) =>
    getCoords(d.secondary ?? d.value * 0.75, i)
  )

  const linePath = primaryPoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")

  const secondaryPath = secondaryPoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")

  const areaPath = `${linePath} L${primaryPoints[primaryPoints.length - 1].x.toFixed(
    1
  )},${height - padY} L${primaryPoints[0].x.toFixed(1)},${height - padY} Z`

  const activePoint = hoverIdx !== null ? series[hoverIdx] : series[series.length - 1]

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-950 self-start">
          {(["7d", "30d", "90d"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRange(r)
                setHoverIdx(null)
              }}
              className={cn(
                "rounded-lg px-2.5 py-1 text-[11px] font-semibold uppercase transition-all cursor-pointer",
                range === r
                  ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Live KPI Readout */}
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {hoverIdx !== null
              ? `$${activePoint.value.toLocaleString()}`
              : value}
          </span>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />
            {change}
          </span>
          <span className="text-xs text-zinc-400">
            {hoverIdx !== null ? `on ${activePoint.label}` : "current period"}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Current (${activePoint.value.toLocaleString()})
          </span>
          {activePoint.secondary !== undefined && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              Previous (${activePoint.secondary.toLocaleString()})
            </span>
          )}
        </div>
      </div>

      {/* Interactive SVG Area Canvas */}
      <div className="mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-44 w-full overflow-visible select-none"
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="etherealAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0.2, 0.5, 0.8].map((ratio) => (
            <line
              key={ratio}
              x1={padX}
              x2={width - padX}
              y1={height * ratio}
              y2={height * ratio}
              stroke="currentColor"
              strokeDasharray="3 3"
              className="text-zinc-200 dark:text-zinc-800"
            />
          ))}

          <path
            d={secondaryPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            className="text-zinc-300 dark:text-zinc-700"
          />

          <path d={areaPath} fill="url(#etherealAreaGrad)" />
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {primaryPoints.map((pt, idx) => {
            const isHovered = hoverIdx === idx
            return (
              <g
                key={series[idx].label}
                className="cursor-pointer"
                onMouseEnter={() => setHoverIdx(idx)}
              >
                {isHovered && (
                  <line
                    x1={pt.x}
                    x2={pt.x}
                    y1={padY}
                    y2={height - padY}
                    stroke="#2563eb"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5 : 3.5}
                  className={cn(
                    "transition-all",
                    isHovered
                      ? "fill-blue-600 stroke-white dark:stroke-zinc-900 stroke-2"
                      : "fill-white dark:fill-zinc-900 stroke-blue-600 stroke-2"
                  )}
                />
                <rect
                  x={pt.x - 24}
                  y={0}
                  width={48}
                  height={height}
                  fill="transparent"
                />
              </g>
            )
          })}
        </svg>

        <div className="mt-2 flex items-center justify-between px-2 text-[11px] font-mono text-zinc-400">
          {series.map((item, idx) => (
            <span
              key={item.label}
              className={cn(
                hoverIdx === idx && "font-semibold text-blue-600 dark:text-blue-400"
              )}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export interface BarStatisticChartProps {
  title?: string
  subtitle?: string
  data?: ChartDataPoint[]
  className?: string
}

const DEFAULT_BAR_DATA: ChartDataPoint[] = [
  { label: "Jan", value: 68, secondary: 52 },
  { label: "Feb", value: 74, secondary: 58 },
  { label: "Mar", value: 64, secondary: 60 },
  { label: "Apr", value: 82, secondary: 66 },
  { label: "May", value: 89, secondary: 72 },
  { label: "Jun", value: 96, secondary: 78 },
]

export const BarStatisticChart: React.FC<BarStatisticChartProps> = ({
  title = "Monthly Cohort Conversion",
  subtitle = "Enterprise vs self-serve onboarding completion (%)",
  data = DEFAULT_BAR_DATA,
  className,
}) => {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null)

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-600" />
            Enterprise
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-zinc-200 dark:bg-zinc-700" />
            Self-Serve
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-6 items-end gap-3 h-44 pt-6 px-2">
        {data.map((d, idx) => {
          const isHovered = activeIdx === idx
          return (
            <div
              key={d.label}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className="group relative flex flex-col items-center gap-2 h-full justify-end cursor-pointer"
            >
              {isHovered && (
                <div className="absolute -top-6 rounded-md bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
                  {d.value}%
                </div>
              )}
              <div className="w-full flex items-end justify-center gap-1.5 h-full">
                <div
                  style={{ height: `${d.value}%` }}
                  className="w-full max-w-[18px] rounded-t-md bg-blue-600 transition-all duration-300 group-hover:bg-blue-500"
                />
                {d.secondary !== undefined && (
                  <div
                    style={{ height: `${d.secondary}%` }}
                    className="w-full max-w-[14px] rounded-t-md bg-zinc-200 transition-all duration-300 dark:bg-zinc-700"
                  />
                )}
              </div>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export interface LineStatisticChartProps {
  title?: string
  subtitle?: string
  className?: string
}

const DEFAULT_LINE_TELEMETRY = [
  { time: "00:00", p95: 22, p50: 11 },
  { time: "04:00", p95: 19, p50: 10 },
  { time: "08:00", p95: 28, p50: 14 },
  { time: "12:00", p95: 34, p50: 16 },
  { time: "16:00", p95: 25, p50: 12 },
  { time: "20:00", p95: 21, p50: 11 },
  { time: "24:00", p95: 18, p50: 9 },
]

export const LineStatisticChart: React.FC<LineStatisticChartProps> = ({
  title = "Edge API Response Latency (ms)",
  subtitle = "P95 vs P50 global edge worker response time over 24 hours",
  className,
}) => {
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null)
  const width = 520
  const height = 150
  const padX = 18
  const padY = 18
  const maxVal = 45

  const toPoint = (val: number, i: number) => ({
    x: padX + (i / (DEFAULT_LINE_TELEMETRY.length - 1)) * (width - padX * 2),
    y: height - padY - (val / maxVal) * (height - padY * 2),
  })

  const p95Pts = DEFAULT_LINE_TELEMETRY.map((d, i) => toPoint(d.p95, i))
  const p50Pts = DEFAULT_LINE_TELEMETRY.map((d, i) => toPoint(d.p50, i))

  const p95Path = p95Pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")
  const p50Path = p50Pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")

  const current =
    hoverIdx !== null
      ? DEFAULT_LINE_TELEMETRY[hoverIdx]
      : DEFAULT_LINE_TELEMETRY[DEFAULT_LINE_TELEMETRY.length - 1]

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <LineChartIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 font-mono text-zinc-700 dark:text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            P95: <strong>{current.p95}ms</strong>
          </span>
          <span className="flex items-center gap-1.5 font-mono text-zinc-700 dark:text-zinc-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            P50: <strong>{current.p50}ms</strong>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-40 w-full overflow-visible select-none"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {[0.25, 0.5, 0.75].map((r) => (
            <line
              key={r}
              x1={padX}
              x2={width - padX}
              y1={height * r}
              y2={height * r}
              stroke="currentColor"
              strokeDasharray="3 3"
              className="text-zinc-200 dark:text-zinc-800"
            />
          ))}

          <path
            d={p95Path}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={p50Path}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {p95Pts.map((pt, i) => (
            <g
              key={DEFAULT_LINE_TELEMETRY[i].time}
              className="cursor-pointer"
              onMouseEnter={() => setHoverIdx(i)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoverIdx === i ? 5 : 3}
                className="fill-blue-600 stroke-white dark:stroke-zinc-900 stroke-2"
              />
              <circle
                cx={p50Pts[i].x}
                cy={p50Pts[i].y}
                r={hoverIdx === i ? 5 : 3}
                className="fill-emerald-500 stroke-white dark:stroke-zinc-900 stroke-2"
              />
              <rect
                x={pt.x - 24}
                y={0}
                width={48}
                height={height}
                fill="transparent"
              />
            </g>
          ))}
        </svg>

        <div className="mt-2 flex justify-between px-2 font-mono text-[11px] text-zinc-400">
          {DEFAULT_LINE_TELEMETRY.map((d, i) => (
            <span
              key={d.time}
              className={cn(
                hoverIdx === i && "font-semibold text-blue-600 dark:text-blue-400"
              )}
            >
              {d.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export interface DonutSegment {
  label: string
  value: number
  color: string
  dotClass: string
}

const DEFAULT_DONUT_SEGMENTS: DonutSegment[] = [
  { label: "Enterprise Cloud", value: 48, color: "#2563eb", dotClass: "bg-blue-600" },
  { label: "Growth Team", value: 32, color: "#8b5cf6", dotClass: "bg-violet-500" },
  { label: "Self-Serve Pro", value: 20, color: "#10b981", dotClass: "bg-emerald-500" },
]

export const DonutStatisticChart: React.FC<{
  title?: string
  segments?: DonutSegment[]
  className?: string
}> = ({
  title = "Revenue Distribution by Tier",
  segments = DEFAULT_DONUT_SEGMENTS,
  className,
}) => {
  const [activeSegment, setActiveSegment] = React.useState<number | null>(null)
  const total = segments.reduce((acc, s) => acc + s.value, 0)
  const radius = 50
  const circumference = 2 * Math.PI * radius
  let cumulativePercent = 0

  const current = activeSegment !== null ? segments[activeSegment] : null

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <PieChartIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
      </div>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
        <div className="relative flex h-36 w-36 items-center justify-center shrink-0">
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              className="text-zinc-100 dark:text-zinc-800"
            />
            {segments.map((seg, idx) => {
              const strokeDasharray = `${(seg.value / total) * circumference} ${circumference}`
              const strokeDashoffset = -cumulativePercent * circumference
              cumulativePercent += seg.value / total

              return (
                <circle
                  key={seg.label}
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={activeSegment === idx ? "17" : "14"}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setActiveSegment(idx)}
                  onMouseLeave={() => setActiveSegment(null)}
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              {current ? `${current.value}%` : "100%"}
            </span>
            <span className="text-[10px] text-zinc-400">
              {current ? current.label : "Total Share"}
            </span>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-2.5">
          {segments.map((seg, idx) => (
            <div
              key={seg.label}
              onMouseEnter={() => setActiveSegment(idx)}
              onMouseLeave={() => setActiveSegment(null)}
              className={cn(
                "flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition-colors cursor-pointer",
                activeSegment === idx
                  ? "border-blue-500/40 bg-zinc-50 dark:bg-zinc-800/70"
                  : "border-zinc-200/70 dark:border-zinc-800"
              )}
            >
              <span className="flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-200">
                <span className={cn("h-2.5 w-2.5 rounded-full", seg.dotClass)} />
                {seg.label}
              </span>
              <span className="font-mono font-semibold text-zinc-900 dark:text-white">
                {seg.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const RadialStatisticChart: React.FC<{
  title?: string
  score?: number
  className?: string
}> = ({
  title = "Workspace Health & SLA Score",
  score = 98,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          Excellent
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
        {/* Concentric Activity Rings */}
        <div className="relative flex h-36 w-36 items-center justify-center shrink-0">
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64"
              cy="64"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-zinc-100 dark:text-zinc-800"
            />
            <circle
              cx="64"
              cy="64"
              r="52"
              fill="none"
              stroke="#2563eb"
              strokeWidth="10"
              strokeDasharray="326"
              strokeDashoffset="22"
              strokeLinecap="round"
            />
            <circle
              cx="64"
              cy="64"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-zinc-100 dark:text-zinc-800"
            />
            <circle
              cx="64"
              cy="64"
              r="38"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray="238"
              strokeDashoffset="28"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              {score}
            </span>
            <span className="text-[10px] text-zinc-400">/ 100</span>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-3 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">Global Uptime SLA</span>
              <span className="font-mono font-semibold text-zinc-900 dark:text-white">
                99.98%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full w-[98%] rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">Edge Cache Hit Ratio</span>
              <span className="font-mono font-semibold text-zinc-900 dark:text-white">
                94.2%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full w-[94%] rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HEATMAP_DATA = [
  1, 2, 3, 2, 1, 0, 2, 3, 4, 3, 2, 1, 3, 4, 2, 3,
  2, 3, 4, 3, 2, 1, 3, 4, 2, 1, 3, 2, 4, 3, 1, 2,
  0, 1, 2, 4, 3, 2, 1, 3, 4, 4, 3, 2, 3, 4, 3, 4,
  2, 3, 1, 2, 3, 4, 2, 1, 3, 2, 4, 3, 2, 1, 4, 3,
]

export const HeatmapStatisticChart: React.FC<{
  title?: string
  subtitle?: string
  className?: string
}> = ({
  title = "Deployment & Commit Frequency Heatmap",
  subtitle = "64-day production release intensity across workspace repositories",
  className,
}) => {
  const [hoveredCell, setHoveredCell] = React.useState<number | null>(null)

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Grid className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
          {hoveredCell !== null
            ? `Day ${hoveredCell + 1}: ${HEATMAP_DATA[hoveredCell] * 6} events`
            : "1,428 total events"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-16 gap-1.5">
        {HEATMAP_DATA.map((lvl, idx) => (
          <button
            key={idx}
            type="button"
            onMouseEnter={() => setHoveredCell(idx)}
            onMouseLeave={() => setHoveredCell(null)}
            aria-label={`Day ${idx + 1}`}
            className={cn(
              "h-5 w-full rounded-[4px] transition-transform hover:scale-115 cursor-pointer",
              lvl === 0 && "bg-zinc-100 dark:bg-zinc-800",
              lvl === 1 && "bg-blue-200 dark:bg-blue-950",
              lvl === 2 && "bg-blue-400 dark:bg-blue-800",
              lvl === 3 && "bg-blue-500 dark:bg-blue-600",
              lvl === 4 && "bg-blue-600 dark:bg-blue-400"
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-400">
        <span>64 days ago</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-200 dark:bg-blue-950" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-400 dark:bg-blue-800" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-blue-600 dark:bg-blue-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
