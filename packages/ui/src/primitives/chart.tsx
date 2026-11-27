import * as React from "react"
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  PieChart as PieChartIcon,
  Gauge,
  Grid,
  LineChart as LineChartIcon,
  Layers,
  Filter,
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
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
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
            stroke="var(--primary)"
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
                    stroke="var(--primary)"
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
            stroke="var(--primary)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={p50Path}
            fill="none"
            stroke="var(--chart-2, #10b981)"
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
  { label: "Enterprise Cloud", value: 48, color: "var(--primary)", dotClass: "bg-blue-600" },
  { label: "Growth Team", value: 32, color: "var(--chart-2, #8b5cf6)", dotClass: "bg-violet-500" },
  { label: "Self-Serve Pro", value: 20, color: "var(--chart-3, #10b981)", dotClass: "bg-emerald-500" },
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
              stroke="var(--primary)"
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
              stroke="var(--chart-2, #10b981)"
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

// ==========================================
// 1. CANDLESTICK STATISTIC CHART (Trading/Crypto)
// ==========================================

export interface CandlestickDataPoint {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const DEFAULT_CANDLESTICKS: CandlestickDataPoint[] = [
  { time: "09:00", open: 95400, high: 95800, low: 95100, close: 95750, volume: 142 },
  { time: "10:00", open: 95750, high: 96200, low: 95600, close: 96100, volume: 188 },
  { time: "11:00", open: 96100, high: 96350, low: 95800, close: 95900, volume: 165 },
  { time: "12:00", open: 95900, high: 96400, low: 95750, close: 96320, volume: 210 },
  { time: "13:00", open: 96320, high: 96800, low: 96200, close: 96750, volume: 245 },
  { time: "14:00", open: 96750, high: 97100, low: 96500, close: 96600, volume: 198 },
  { time: "15:00", open: 96600, high: 96900, low: 96300, close: 96420, volume: 154 },
  { time: "16:00", open: 96420, high: 97350, low: 96400, close: 97280, volume: 312 },
  { time: "17:00", open: 97280, high: 97600, low: 97050, close: 97450, volume: 280 },
  { time: "18:00", open: 97450, high: 97550, low: 96800, close: 96950, volume: 220 },
  { time: "19:00", open: 96950, high: 97400, low: 96900, close: 97320, volume: 175 },
  { time: "20:00", open: 97320, high: 97850, low: 97200, close: 97800, volume: 340 },
]

export interface CandlestickStatisticChartProps {
  title?: string
  subtitle?: string
  currentPrice?: string
  change?: string
  isPositive?: boolean
  data?: CandlestickDataPoint[]
  className?: string
}

export const CandlestickStatisticChart: React.FC<CandlestickStatisticChartProps> = ({
  title = "BTC/USDT Perpetual",
  subtitle = "Binance Futures • 1H Interval",
  currentPrice = "$97,800.00",
  change = "+2.51%",
  isPositive = true,
  data = DEFAULT_CANDLESTICKS,
  className,
}) => {
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null)
  const [timeframe, setTimeframe] = React.useState<"1H" | "4H" | "1D" | "1W">("1H")

  const width = 540
  const height = 190
  const padX = 24
  const padTop = 15
  const padBottom = 35

  const chartHeight = height - padTop - padBottom

  const minPrice = Math.min(...data.map((d) => d.low)) * 0.998
  const maxPrice = Math.max(...data.map((d) => d.high)) * 1.002
  const maxVolume = Math.max(...data.map((d) => d.volume), 1)

  const getY = (price: number) => {
    return padTop + chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight
  }

  const activeCandle = hoverIdx !== null ? data[hoverIdx] : data[data.length - 1]
  const candleWidth = Math.max((width - padX * 2) / data.length - 8, 6)

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <span
              className={cn(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-semibold",
                isPositive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}
            >
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
              {change}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-mono text-base font-bold text-zinc-900 dark:text-zinc-100">
              {currentPrice}
            </div>
          </div>
          <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-800 dark:bg-zinc-800/60">
            {(["1H", "4H", "1D", "1W"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-medium transition cursor-pointer",
                  timeframe === t
                    ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OHLC Bar readout */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
        <span>Time: <strong className="text-zinc-800 dark:text-zinc-200">{activeCandle.time}</strong></span>
        <span>O: <strong className="text-zinc-800 dark:text-zinc-200">${activeCandle.open.toLocaleString()}</strong></span>
        <span>H: <strong className="text-emerald-600 dark:text-emerald-400">${activeCandle.high.toLocaleString()}</strong></span>
        <span>L: <strong className="text-rose-600 dark:text-rose-400">${activeCandle.low.toLocaleString()}</strong></span>
        <span>C: <strong className={activeCandle.close >= activeCandle.open ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>${activeCandle.close.toLocaleString()}</strong></span>
        <span>Vol: <strong className="text-zinc-800 dark:text-zinc-200">{activeCandle.volume} BTC</strong></span>
      </div>

      <div className="relative mt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
        >
          {/* Horizontal gridlines */}
          {[0.2, 0.5, 0.8].map((pct, idx) => {
            const y = padTop + chartHeight * pct
            return (
              <line
                key={idx}
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="currentColor"
                strokeDasharray="3 3"
                className="text-zinc-200 dark:text-zinc-800/80"
              />
            )
          })}

          {/* Volume separator */}
          <line
            x1={padX}
            y1={height - padBottom}
            x2={width - padX}
            y2={height - padBottom}
            stroke="currentColor"
            className="text-zinc-200 dark:text-zinc-800/80"
          />

          {data.map((c, idx) => {
            const x = padX + (idx / (data.length - 1)) * (width - padX * 2)
            const isUp = c.close >= c.open
            const candleTop = getY(Math.max(c.open, c.close))
            const candleBottom = getY(Math.min(c.open, c.close))
            const candleH = Math.max(candleBottom - candleTop, 2)
            const highY = getY(c.high)
            const lowY = getY(c.low)

            // Volume bar
            const volH = (c.volume / maxVolume) * 22
            const volY = height - volH

            const strokeColor = isUp ? "#10b981" : "#f43f5e"
            const fillColor = isUp ? "#10b981" : "#f43f5e"

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoverIdx(idx)}
                onMouseLeave={() => setHoverIdx(null)}
                className="cursor-pointer transition-opacity"
                opacity={hoverIdx === null || hoverIdx === idx ? 1 : 0.4}
              >
                {/* Wick High/Low */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={strokeColor}
                  strokeWidth={1.5}
                />

                {/* Body Rect */}
                <rect
                  x={x - candleWidth / 2}
                  y={candleTop}
                  width={candleWidth}
                  height={candleH}
                  fill={fillColor}
                  rx={1}
                />

                {/* Volume Bar */}
                <rect
                  x={x - candleWidth / 2}
                  y={volY}
                  width={candleWidth}
                  height={volH}
                  fill={fillColor}
                  opacity={0.4}
                  rx={1}
                />

                {/* Time Axis Text */}
                {idx % 2 === 0 && (
                  <text
                    x={x}
                    y={height - 26}
                    textAnchor="middle"
                    className="fill-zinc-400 text-[9px] font-mono select-none"
                  >
                    {c.time}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
export const CandlestickChart = CandlestickStatisticChart

// ==========================================
// 2. DEPTH STATISTIC CHART (Order Book Liquidity)
// ==========================================

export interface DepthOrderPoint {
  price: number
  volume: number
  totalVolume: number
}

const DEFAULT_BIDS: DepthOrderPoint[] = [
  { price: 97800, volume: 4.2, totalVolume: 4.2 },
  { price: 97750, volume: 8.5, totalVolume: 12.7 },
  { price: 97700, volume: 15.3, totalVolume: 28.0 },
  { price: 97650, volume: 22.1, totalVolume: 50.1 },
  { price: 97600, volume: 34.0, totalVolume: 84.1 },
  { price: 97550, volume: 48.2, totalVolume: 132.3 },
  { price: 97500, volume: 65.4, totalVolume: 197.7 },
]

const DEFAULT_ASKS: DepthOrderPoint[] = [
  { price: 97820, volume: 5.1, totalVolume: 5.1 },
  { price: 97870, volume: 9.8, totalVolume: 14.9 },
  { price: 97920, volume: 16.4, totalVolume: 31.3 },
  { price: 97970, volume: 24.5, totalVolume: 55.8 },
  { price: 98020, volume: 38.0, totalVolume: 93.8 },
  { price: 98070, volume: 52.1, totalVolume: 145.9 },
  { price: 98120, volume: 72.3, totalVolume: 218.2 },
]

export interface DepthStatisticChartProps {
  title?: string
  subtitle?: string
  midPrice?: string
  spread?: string
  bids?: DepthOrderPoint[]
  asks?: DepthOrderPoint[]
  className?: string
}

export const DepthStatisticChart: React.FC<DepthStatisticChartProps> = ({
  title = "Market Order Book Depth",
  subtitle = "Cumulative Bids (Buy) vs Asks (Sell) Liquidity",
  midPrice = "$97,810.00",
  spread = "$20.00 (0.02%)",
  bids = DEFAULT_BIDS,
  asks = DEFAULT_ASKS,
  className,
}) => {
  const [hoverDepth, setHoverDepth] = React.useState<{ side: "bid" | "ask"; price: number; total: number } | null>(null)

  const width = 540
  const height = 180
  const padX = 20
  const padY = 20
  const midX = width / 2

  const maxTotal = Math.max(
    bids[bids.length - 1].totalVolume,
    asks[asks.length - 1].totalVolume
  )

  // Bids curve: from left to mid
  const bidPoints = bids.map((b, idx) => {
    const x = midX - ((idx + 1) / bids.length) * (midX - padX)
    const y = height - padY - (b.totalVolume / maxTotal) * (height - padY * 2)
    return { x, y, ...b }
  })

  // Asks curve: from mid to right
  const askPoints = asks.map((a, idx) => {
    const x = midX + ((idx + 1) / asks.length) * (midX - padX)
    const y = height - padY - (a.totalVolume / maxTotal) * (height - padY * 2)
    return { x, y, ...a }
  })

  const bidPath = `M ${midX} ${height - padY} ` +
    [...bidPoints].reverse().map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    ` L ${padX} ${height - padY} Z`

  const askPath = `M ${midX} ${height - padY} ` +
    askPoints.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    ` L ${width - padX} ${height - padY} Z`

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 select-none",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-500" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 text-right">
          <div>
            <div className="text-[10px] uppercase font-semibold text-zinc-400">Mid Price</div>
            <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{midPrice}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-zinc-400">Spread</div>
            <div className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">{spread}</div>
          </div>
        </div>
      </div>

      {/* Hover info banner */}
      <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-500">
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
          ◀ Bids (Buy Support)
        </span>
        <span>
          {hoverDepth
            ? `${hoverDepth.side.toUpperCase()}: $${hoverDepth.price.toLocaleString()} • Vol: ${hoverDepth.total.toFixed(1)} BTC`
            : "Hover depth chart to inspect cumulative liquidity"}
        </span>
        <span className="text-rose-600 dark:text-rose-400 font-semibold">
          Asks (Sell Wall) ▶
        </span>
      </div>

      <div className="relative mt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
          <defs>
            <linearGradient id="bidDepthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="askDepthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Dotted Center line */}
          <line
            x1={midX}
            y1={padY}
            x2={midX}
            y2={height - padY}
            stroke="currentColor"
            strokeDasharray="3 3"
            className="text-zinc-400 dark:text-zinc-600"
          />

          {/* Bids fill & stroke */}
          <path d={bidPath} fill="url(#bidDepthGrad)" />
          <path
            d={[...bidPoints].reverse().map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")}
            fill="none"
            stroke="#10b981"
            strokeWidth={2}
          />

          {/* Asks fill & stroke */}
          <path d={askPath} fill="url(#askDepthGrad)" />
          <path
            d={askPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ")}
            fill="none"
            stroke="#f43f5e"
            strokeWidth={2}
          />

          {/* Bid point triggers */}
          {bidPoints.map((p, i) => (
            <circle
              key={`b-${i}`}
              cx={p.x}
              cy={p.y}
              r={4}
              className="fill-emerald-500 hover:r-6 transition-all cursor-pointer"
              onMouseEnter={() => setHoverDepth({ side: "bid", price: p.price, total: p.totalVolume })}
              onMouseLeave={() => setHoverDepth(null)}
            />
          ))}

          {/* Ask point triggers */}
          {askPoints.map((p, i) => (
            <circle
              key={`a-${i}`}
              cx={p.x}
              cy={p.y}
              r={4}
              className="fill-rose-500 hover:r-6 transition-all cursor-pointer"
              onMouseEnter={() => setHoverDepth({ side: "ask", price: p.price, total: p.totalVolume })}
              onMouseLeave={() => setHoverDepth(null)}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
export const DepthChart = DepthStatisticChart

// ==========================================
// 3. RADAR STATISTIC CHART (Spider Web / AI Benchmark)
// ==========================================

export interface RadarSeriesItem {
  name: string
  color: string
  values: number[]
}

const DEFAULT_RADAR_AXES = ["Reasoning", "Coding", "Mathematics", "Multimodal", "Low Latency", "Safety"]
const DEFAULT_RADAR_SERIES: RadarSeriesItem[] = [
  { name: "Gemini 3.1 Pro", color: "#2563eb", values: [95, 92, 88, 96, 90, 94] },
  { name: "Claude 3.5 Sonnet", color: "#f59e0b", values: [94, 95, 86, 89, 85, 96] },
]

export interface RadarStatisticChartProps {
  title?: string
  subtitle?: string
  axes?: string[]
  series?: RadarSeriesItem[]
  className?: string
}

export const RadarStatisticChart: React.FC<RadarStatisticChartProps> = ({
  title = "AI Foundation Model Capability Radar",
  subtitle = "Multi-axis intelligence, speed, and safety benchmark",
  axes = DEFAULT_RADAR_AXES,
  series = DEFAULT_RADAR_SERIES,
  className,
}) => {
  const [hoveredAxis, setHoveredAxis] = React.useState<number | null>(null)

  const size = 320
  const cx = size / 2
  const cy = size / 2
  const radius = 105
  const levels = 5
  const count = axes.length

  const getAxisPoint = (idx: number, dist: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 select-none",
        className
      )}
    >
      <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>

      <div className="relative mt-2 flex flex-col items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[340px] overflow-visible">
          {/* Concentric Web Polygons */}
          {Array.from({ length: levels }).map((_, lIdx) => {
            const levelRadius = (radius / levels) * (lIdx + 1)
            const polyPoints = Array.from({ length: count })
              .map((_, aIdx) => {
                const pt = getAxisPoint(aIdx, levelRadius)
                return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`
              })
              .join(" ")
            return (
              <polygon
                key={lIdx}
                points={polyPoints}
                fill="none"
                stroke="currentColor"
                strokeDasharray="2 3"
                className="text-zinc-200 dark:text-zinc-800"
              />
            )
          })}

          {/* Radial Spokes */}
          {axes.map((axis, idx) => {
            const end = getAxisPoint(idx, radius)
            const labelPos = getAxisPoint(idx, radius + 22)
            const isHovered = hoveredAxis === idx

            return (
              <g key={idx}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={end.x}
                  y2={end.y}
                  stroke="currentColor"
                  className={cn(
                    "transition-colors",
                    isHovered ? "text-blue-500 stroke-[1.5]" : "text-zinc-200 dark:text-zinc-800"
                  )}
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  onMouseEnter={() => setHoveredAxis(idx)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  className={cn(
                    "text-[10px] font-medium transition-colors cursor-pointer select-none",
                    isHovered
                      ? "fill-blue-600 font-bold dark:fill-blue-400"
                      : "fill-zinc-600 dark:fill-zinc-400"
                  )}
                >
                  {axis}
                </text>
              </g>
            )
          })}

          {/* Radar Series Polygons */}
          {series.map((s, sIdx) => {
            const points = s.values.map((v, aIdx) => {
              const pt = getAxisPoint(aIdx, (v / 100) * radius)
              return pt
            })
            const polyStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")

            return (
              <g key={sIdx}>
                <polygon
                  points={polyStr}
                  fill={s.color}
                  fillOpacity={0.2}
                  stroke={s.color}
                  strokeWidth={2}
                />
                {points.map((p, pIdx) => (
                  <circle
                    key={pIdx}
                    cx={p.x}
                    cy={p.y}
                    r={3.5}
                    fill={s.color}
                    className="cursor-pointer hover:r-5 transition-all"
                  />
                ))}
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          {series.map((s, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-zinc-700 dark:text-zinc-300">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export const RadarChart = RadarStatisticChart

// ==========================================
// 4. FUNNEL STATISTIC CHART (SaaS Conversion)
// ==========================================

export interface FunnelStageItem {
  name: string
  count: number
  value?: string
}

const DEFAULT_FUNNEL_STAGES: FunnelStageItem[] = [
  { name: "Website Visitors", count: 120000, value: "$0" },
  { name: "Free Trial Signups", count: 42000, value: "$0" },
  { name: "Product Qualified Leads", count: 18500, value: "$185k ARR pipeline" },
  { name: "Sales Demo & Trial", count: 6200, value: "$920k ARR pipeline" },
  { name: "Closed Won Customers", count: 2450, value: "$1.42M Net ARR" },
]

export interface FunnelStatisticChartProps {
  title?: string
  subtitle?: string
  stages?: FunnelStageItem[]
  className?: string
}

export const FunnelStatisticChart: React.FC<FunnelStatisticChartProps> = ({
  title = "Enterprise Sales & Conversion Funnel",
  subtitle = "End-to-end customer journey drop-off and conversion benchmarks",
  stages = DEFAULT_FUNNEL_STAGES,
  className,
}) => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null)
  const topCount = stages[0]?.count || 1

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-500" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-semibold uppercase text-zinc-400">Overall Win Rate</span>
          <div className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {((stages[stages.length - 1].count / topCount) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {stages.map((stage, idx) => {
          const pctOfTop = (stage.count / topCount) * 100
          const prevCount = idx > 0 ? stages[idx - 1].count : null
          const dropoffPct = prevCount ? ((prevCount - stage.count) / prevCount) * 100 : null

          return (
            <div
              key={stage.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                "rounded-xl border p-3 transition-all cursor-pointer",
                hoveredIdx === idx
                  ? "border-blue-500 bg-blue-50/40 shadow-xs dark:border-blue-500/60 dark:bg-blue-950/20"
                  : "border-zinc-100 bg-zinc-50/60 dark:border-zinc-800/70 dark:bg-zinc-800/30"
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs mb-2">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {idx + 1}. {stage.name}
                </span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    ({pctOfTop.toFixed(1)}%)
                  </span>
                  {dropoffPct !== null && (
                    <span className="text-[10px] font-medium text-rose-500">
                      -{dropoffPct.toFixed(0)}% drop
                    </span>
                  )}
                </div>
              </div>

              {/* Progressive width bar */}
              <div className="h-2.5 w-full rounded-full bg-zinc-200/70 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-600 to-indigo-500 transition-all duration-500"
                  style={{ width: `${Math.max(pctOfTop, 3)}%` }}
                />
              </div>

              {stage.value && (
                <div className="mt-1.5 text-right font-mono text-[10px] text-zinc-400">
                  {stage.value}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export const FunnelChart = FunnelStatisticChart

// ==========================================
// 5. GAUGE STATISTIC CHART (Speedometer/Capacity)
// ==========================================

export interface GaugeStatisticChartProps {
  title?: string
  subtitle?: string
  value?: number
  min?: number
  max?: number
  unit?: string
  statusLabel?: string
  className?: string
}

export const GaugeStatisticChart: React.FC<GaugeStatisticChartProps> = ({
  title = "Cluster Compute & GPU Pressure",
  subtitle = "Real-time AI inference capacity load",
  value = 78,
  min = 0,
  max = 100,
  unit = "%",
  statusLabel = "Elevated",
  className,
}) => {
  const radius = 80
  const cx = 130
  const cy = 110
  const clampedVal = Math.min(Math.max(value, min), max)
  const pct = (clampedVal - min) / (max - min)

  // -180 deg to 0 deg
  const needleAngle = -180 + pct * 180
  const needleRad = (needleAngle * Math.PI) / 180
  const needleX = cx + (radius - 16) * Math.cos(needleRad)
  const needleY = cy + (radius - 16) * Math.sin(needleRad)

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-amber-500" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
        <span
          className={cn(
            "rounded-md px-2 py-0.5 text-[11px] font-semibold",
            pct < 0.6
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              : pct < 0.85
              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
              : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
          )}
        >
          {statusLabel}
        </span>
      </div>

      <div className="relative mt-2 flex flex-col items-center justify-center">
        <svg viewBox="0 0 260 140" className="w-full max-w-[280px] overflow-visible">
          {/* Background Arc */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={14}
            strokeLinecap="round"
            className="text-zinc-100 dark:text-zinc-800"
          />

          {/* Safe Zone (0-60%) Emerald */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx - radius * 0.3} ${cy - radius * 0.95}`}
            fill="none"
            stroke="#10b981"
            strokeWidth={14}
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Elevated Zone (60-85%) Amber */}
          <path
            d={`M ${cx - radius * 0.25} ${cy - radius * 0.96} A ${radius} ${radius} 0 0 1 ${cx + radius * 0.58} ${cy - radius * 0.81}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={14}
            opacity={0.8}
          />

          {/* Critical Zone (85-100%) Rose */}
          <path
            d={`M ${cx + radius * 0.62} ${cy - radius * 0.78} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#f43f5e"
            strokeWidth={14}
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            className="text-zinc-800 dark:text-zinc-100 transition-all duration-500"
          />

          {/* Pivot Dot */}
          <circle cx={cx} cy={cy} r={6} className="fill-zinc-800 dark:fill-zinc-100" />
          <circle cx={cx} cy={cy} r={3} fill="#fff" />

          {/* Min/Max indicators */}
          <text x={cx - radius} y={cy + 16} textAnchor="middle" className="fill-zinc-400 text-[10px] font-mono">
            {min}
          </text>
          <text x={cx + radius} y={cy + 16} textAnchor="middle" className="fill-zinc-400 text-[10px] font-mono">
            {max}
          </text>
        </svg>

        {/* Center Big Number */}
        <div className="-mt-2 text-center">
          <div className="font-mono text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            {clampedVal}
            <span className="text-base font-normal text-zinc-400">{unit}</span>
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Current Workload Index</div>
        </div>
      </div>
    </div>
  )
}
export const GaugeChart = GaugeStatisticChart

// ==========================================
// 6. TREEMAP STATISTIC CHART (Resource Allocation)
// ==========================================

export interface TreemapItem {
  label: string
  value: number
  formatted: string
  color: string
}

const DEFAULT_TREEMAP_ITEMS: TreemapItem[] = [
  { label: "Elastic Kubernetes (EKS)", value: 42, formatted: "$18,450/mo", color: "bg-blue-500/20 border-blue-500/40 text-blue-900 dark:text-blue-200" },
  { label: "Managed PostgreSQL", value: 24, formatted: "$10,540/mo", color: "bg-indigo-500/20 border-indigo-500/40 text-indigo-900 dark:text-indigo-200" },
  { label: "Vector Search & Embeddings", value: 16, formatted: "$7,020/mo", color: "bg-purple-500/20 border-purple-500/40 text-purple-900 dark:text-purple-200" },
  { label: "S3 Object Lakehouse", value: 10, formatted: "$4,390/mo", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-900 dark:text-emerald-200" },
  { label: "Global Edge CDN", value: 8, formatted: "$3,510/mo", color: "bg-amber-500/20 border-amber-500/40 text-amber-900 dark:text-amber-200" },
]

export interface TreemapStatisticChartProps {
  title?: string
  subtitle?: string
  totalSpend?: string
  items?: TreemapItem[]
  className?: string
}

export const TreemapStatisticChart: React.FC<TreemapStatisticChartProps> = ({
  title = "Cloud Infrastructure Cost Treemap",
  subtitle = "Proportional compute, database, and storage monthly burn",
  totalSpend = "$43,910/mo",
  items = DEFAULT_TREEMAP_ITEMS,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 select-none",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800/80">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Grid className="h-4 w-4 text-indigo-500" />
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-semibold uppercase text-zinc-400">Total Run Rate</span>
          <div className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {totalSpend}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-2 h-56">
        {/* Large Block 1 (EKS 42%) -> span 7 */}
        <div
          className={cn(
            "col-span-12 sm:col-span-7 row-span-2 rounded-xl border p-4 flex flex-col justify-between transition hover:scale-[1.01] cursor-pointer",
            items[0]?.color
          )}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider">{items[0]?.label}</span>
            <div className="text-[11px] opacity-80">{items[0]?.value}% of infrastructure footprint</div>
          </div>
          <div className="font-mono text-base font-bold">{items[0]?.formatted}</div>
        </div>

        {/* Medium Block 2 (PostgreSQL 24%) -> span 5 */}
        <div
          className={cn(
            "col-span-6 sm:col-span-5 rounded-xl border p-3 flex flex-col justify-between transition hover:scale-[1.01] cursor-pointer",
            items[1]?.color
          )}
        >
          <div>
            <span className="text-xs font-semibold">{items[1]?.label}</span>
            <div className="text-[10px] opacity-80">{items[1]?.value}%</div>
          </div>
          <div className="font-mono text-xs font-bold">{items[1]?.formatted}</div>
        </div>

        {/* Nested Blocks (Vector, S3, CDN) */}
        <div className="col-span-6 sm:col-span-5 grid grid-cols-3 gap-2">
          {items.slice(2).map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-xl border p-2 flex flex-col justify-between transition hover:scale-[1.01] cursor-pointer text-center",
                item.color
              )}
            >
              <span className="text-[10px] font-semibold truncate" title={item.label}>
                {item.label.split(" ")[0]}
              </span>
              <div className="font-mono text-[10px] font-bold">{item.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export const TreemapChart = TreemapStatisticChart

