import * as React from "react";
import { CheckCircle2, Activity } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/button";
import { Badge } from "../primitives/badge";
import { Progress } from "../primitives/progress";

export interface SystemAlertItem {
  id: string;
  title: string;
  regionOrCluster: string;
  timestamp: string;
  severity: "warning" | "info" | "resolved";
  acknowledged?: boolean;
}

export interface SlaMetricBarItem {
  id: string;
  label: string;
  valueLabel: string;
  percent: number;
}

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 1: SlaRingGaugeCard                                  */
/* -------------------------------------------------------------------------- */

export interface SlaRingGaugeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  title?: string;
  subtitle?: string;
  targetLabel?: string;
  statusLabel?: string;
  metrics?: SlaMetricBarItem[];
}

const DEFAULT_SLA_METRICS: SlaMetricBarItem[] = [
  {
    id: "uptime",
    label: "Core Uptime SLA",
    valueLabel: "99.98%",
    percent: 99,
  },
  {
    id: "cache",
    label: "Edge Cache Hit Ratio",
    valueLabel: "94.2%",
    percent: 94,
  },
  {
    id: "db",
    label: "DB Pool Utilization",
    valueLabel: "28.4%",
    percent: 28,
  },
];

export const SlaRingGaugeCard = React.forwardRef<
  HTMLDivElement,
  SlaRingGaugeCardProps
>(
  (
    {
      score,
      title = "Composite System Health",
      subtitle = "Multi-region SLA telemetry",
      targetLabel = "99.98% Target",
      statusLabel = "Healthy",
      metrics = DEFAULT_SLA_METRICS,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 sm:p-5 flex flex-col justify-between dark:border-zinc-800 dark:bg-zinc-950/40",
          className
        )}
        {...props}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {title}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </div>
          </div>
          <Badge variant="blue" className="font-mono text-[10px]">
            {targetLabel}
          </Badge>
        </div>

        <div className="my-5 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                className="text-zinc-200/80 dark:text-zinc-800"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="242 264"
              />
              <circle
                cx="50"
                cy="50"
                r="31"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-zinc-200/80 dark:text-zinc-800"
              />
              <circle
                cx="50"
                cy="50"
                r="31"
                fill="none"
                stroke="var(--chart-2, #10b981)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="165 195"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                {score}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="w-full space-y-3">
            {metrics.map((m, idx) => (
              <div key={m.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {m.label}
                  </span>
                  <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                    {m.valueLabel}
                  </span>
                </div>
                <Progress
                  value={m.percent}
                  variant={idx % 2 === 0 ? "blue" : "emerald"}
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
SlaRingGaugeCard.displayName = "SlaRingGaugeCard";

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 2: IncidentAlertRow                                  */
/* -------------------------------------------------------------------------- */

export interface IncidentAlertRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  alert: SystemAlertItem;
  onAcknowledge?: (id: string) => void;
}

export const IncidentAlertRow = React.forwardRef<
  HTMLDivElement,
  IncidentAlertRowProps
>(({ alert, onAcknowledge, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <span
          className={cn(
            "mt-1.5 h-2 w-2 rounded-full shrink-0",
            alert.severity === "warning"
              ? "bg-rose-500"
              : alert.severity === "info"
                ? "bg-blue-500"
                : "bg-emerald-500"
          )}
        />
        <div className="min-w-0">
          <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {alert.title}
          </div>
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            {alert.regionOrCluster} • {alert.timestamp}
          </div>
        </div>
      </div>

      {!alert.acknowledged ? (
        <Button
          variant="outline"
          size="xs"
          className="shrink-0"
          onClick={() => onAcknowledge?.(alert.id)}
        >
          Acknowledge
        </Button>
      ) : (
        <Badge variant="emerald" className="shrink-0">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Resolved
        </Badge>
      )}
    </div>
  );
});
IncidentAlertRow.displayName = "IncidentAlertRow";

/* -------------------------------------------------------------------------- */
/* Composed Block: SystemHealthBlock                                          */
/* -------------------------------------------------------------------------- */

export interface SystemHealthBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom block header title */
  title?: string;
  /** Custom block header subtitle */
  subtitle?: string;
  /** Overall composite health score (0..100) */
  score?: number;
  /** Custom SLA metric progress bars */
  metrics?: SlaMetricBarItem[];
  /** Initial or controlled alerts */
  alerts?: SystemAlertItem[];
  /** Callback fired when an alert is acknowledged */
  onAcknowledgeAlert?: (id: string) => void;
}

const DEFAULT_ALERTS: SystemAlertItem[] = [
  {
    id: "al-1",
    title: "High P99 Latency (142ms) — Payment Gateway",
    regionOrCluster: "us-east-1 • Edge Cluster",
    timestamp: "14m ago",
    severity: "warning",
    acknowledged: false,
  },
  {
    id: "al-2",
    title: "Rate Limit 85% — Upstream Inference Router",
    regionOrCluster: "ap-southeast-1 • API Proxy",
    timestamp: "38m ago",
    severity: "info",
    acknowledged: false,
  },
  {
    id: "al-3",
    title: "Auto-scaling Group Rebalanced (+4 Nodes)",
    regionOrCluster: "eu-central-1 • Core Ledger",
    timestamp: "1h ago",
    severity: "resolved",
    acknowledged: true,
  },
];

export function SystemHealthBlock({
  title = "System SLA Health & Incident Telemetry",
  subtitle = "Multi-ring SLA gauge, edge cache hit ratio, and real-time incident feed.",
  score = 98,
  metrics = DEFAULT_SLA_METRICS,
  alerts: initialAlerts = DEFAULT_ALERTS,
  onAcknowledgeAlert,
  className,
  ...props
}: SystemHealthBlockProps) {
  const [alerts, setAlerts] = React.useState<SystemAlertItem[]>(initialAlerts);
  const [liveScore, setLiveScore] = React.useState<number>(score);

  React.useEffect(() => {
    setAlerts(initialAlerts);
  }, [initialAlerts]);

  React.useEffect(() => {
    setLiveScore(score);
  }, [score]);

  const handleAck = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, acknowledged: true, severity: "resolved" } : a
      )
    );
    setLiveScore((s) => Math.min(100, s + 1));
    onAcknowledgeAlert?.(id);
  };

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-5",
        className
      )}
      {...props}
    >
      {/* Header matching KanbanBoard & PromptComposer */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <Badge variant="emerald" dot>
              Operational
            </Badge>
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
        {/* Left: Composed SlaRingGaugeCard */}
        <SlaRingGaugeCard
          score={liveScore}
          metrics={metrics}
          className="lg:col-span-6"
        />

        {/* Right: Composed Incident Alerts Feed */}
        <div className="lg:col-span-6 rounded-2xl border border-zinc-200/90 bg-zinc-50/50 p-4 sm:p-5 flex flex-col justify-between dark:border-zinc-800 dark:bg-zinc-900/50">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Active Incident Feed
              </span>
              <Badge
                variant={
                  alerts.filter((a) => !a.acknowledged).length > 0
                    ? "rose"
                    : "emerald"
                }
                className="font-mono text-[10px]"
              >
                {alerts.filter((a) => !a.acknowledged).length} open
              </Badge>
            </div>

            <div className="space-y-2.5">
              {alerts.map((alert) => (
                <IncidentAlertRow
                  key={alert.id}
                  alert={alert}
                  onAcknowledge={handleAck}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
