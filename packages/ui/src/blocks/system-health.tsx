import * as React from "react";
import {
  Activity,
  Bell,
  CheckCircle2,
} from "lucide-react";
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

export interface SystemHealthBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Overall composite health score (0..100) */
  score?: number;
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
    title: "Token Rate Limit 85% — Anthropic Router",
    regionOrCluster: "ap-southeast-1 • AI Proxy",
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
  score = 98,
  alerts: initialAlerts = DEFAULT_ALERTS,
  onAcknowledgeAlert,
  className,
  ...props
}: SystemHealthBlockProps) {
  const [alerts, setAlerts] = React.useState<SystemAlertItem[]>(initialAlerts);
  const [liveScore, setLiveScore] = React.useState<number>(score);

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
        "w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                System SLA Health & Incident Telemetry
              </h3>
              <Badge variant="emerald" dot>
                All Systems Operational
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Multi-ring SLA gauge, edge cache hit ratio & real-time PagerDuty/incident feed
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Grid matching Landing Card 5 */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left: Multi-Ring Health Score Card */}
        <div className="lg:col-span-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                Composite System Health
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Real-time multi-region SLA telemetry
              </div>
            </div>
            <Badge variant="default">
              99.98% Target
            </Badge>
          </div>

          <div className="my-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-32 w-32 shrink-0 flex items-center justify-center">
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
                  stroke="#f59e0b"
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
                  stroke="#fbbf24"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="165 195"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
                  {liveScore}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Excellent
                </span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-zinc-600 dark:text-zinc-300">
                    Core Uptime SLA
                  </span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    99.98%
                  </span>
                </div>
                <Progress value={99} className="h-1.5" />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-zinc-600 dark:text-zinc-300">
                    Edge Cache Hit Ratio
                  </span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    94.2%
                  </span>
                </div>
                <Progress value={94} className="h-1.5" />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-zinc-600 dark:text-zinc-300">
                    DB Pool Saturation
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    28.4% (Healthy)
                  </span>
                </div>
                <Progress value={28} className="h-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Important Alerts Feed */}
        <div className="lg:col-span-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Important Alerts & Pager Feed
                </span>
              </div>
              <Badge variant="amber">
                {alerts.filter((a) => !a.acknowledged).length} Active
              </Badge>
            </div>

            <div className="space-y-2.5">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-3"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "mt-1 h-2 w-2 rounded-full shrink-0",
                        alert.severity === "warning"
                          ? "bg-amber-500"
                          : alert.severity === "info"
                            ? "bg-amber-400"
                            : "bg-emerald-500"
                      )}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {alert.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {alert.regionOrCluster} • {alert.timestamp}
                      </div>
                    </div>
                  </div>

                  {!alert.acknowledged ? (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleAck(alert.id)}
                    >
                      Ack
                    </Button>
                  ) : (
                    <Badge variant="emerald">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Resolved
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
