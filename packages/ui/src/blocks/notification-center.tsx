import * as React from "react"
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  ExternalLink,
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Trash2,
  X,
} from "lucide-react"
import { cn } from "../utils/cn"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Badge } from "../primitives/badge"
import { Button } from "../primitives/button"

export type NotificationType = "info" | "success" | "warning" | "error" | "mention"

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type?: NotificationType
  actor?: {
    name: string
    avatar?: string
  }
  actionUrl?: string
  actionLabel?: string
}

export interface NotificationCenterProps {
  notifications?: NotificationItem[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDismiss?: (id: string) => void
  onClearAll?: () => void
  className?: string
  align?: "end" | "center" | "start"
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Deployment Successful",
    message: "Production build v0.0.7 successfully deployed to edge clusters.",
    timestamp: "2m ago",
    read: false,
    type: "success",
  },
  {
    id: "notif-2",
    title: "High Memory Telemetry Alert",
    message: "Cluster worker-04 exceeded 88% memory allocation threshold.",
    timestamp: "18m ago",
    read: false,
    type: "warning",
    actionLabel: "Inspect Pod",
    actionUrl: "#",
  },
  {
    id: "notif-3",
    title: "New Team Member Invitation",
    message: "Sarah Connor accepted your invitation to join Engineering team.",
    timestamp: "1h ago",
    read: false,
    type: "mention",
    actor: {
      name: "Sarah Connor",
    },
  },
  {
    id: "notif-4",
    title: "Monthly Invoice Paid",
    message: "Payment of $1,450.00 for Enterprise Tier has been processed.",
    timestamp: "3h ago",
    read: true,
    type: "info",
    actionLabel: "View Receipt",
    actionUrl: "#",
  },
  {
    id: "notif-5",
    title: "API Rate Limit Breach",
    message: "Tenant id-982 exceeded 50,000 req/min rate limit.",
    timestamp: "1d ago",
    read: true,
    type: "error",
  },
]

const typeIconMap: Record<NotificationType, React.ReactNode> = {
  info: <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
  error: <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
  mention: <MessageSquare className="h-4 w-4 text-violet-600 dark:text-violet-400" />,
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications: initialItems,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  className,
  align = "end",
}) => {
  const [items, setItems] = React.useState<NotificationItem[]>(
    initialItems || DEFAULT_NOTIFICATIONS
  )
  const [filter, setFilter] = React.useState<"all" | "unread">("all")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (initialItems) setItems(initialItems)
  }, [initialItems])

  const unreadCount = items.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    )
    onMarkAsRead?.(id)
  }

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })))
    onMarkAllAsRead?.()
  }

  const handleDismiss = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setItems((prev) => prev.filter((item) => item.id !== id))
    onDismiss?.(id)
  }

  const handleClearAll = () => {
    setItems([])
    onClearAll?.()
  }

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return !item.read
    return true
  })

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={`Open notifications, ${unreadCount} unread`}
          className={cn(
            "relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground shadow-2xs transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer",
            className
          )}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-2xs animate-in zoom-in-50">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={8}
          className="z-50 w-80 sm:w-96 rounded-2xl border border-border bg-card text-card-foreground shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-foreground">Notifications</h4>
              {unreadCount > 0 ? (
                <Badge variant="primary" className="rounded-full px-1.5 py-0 text-[10px]">
                  {unreadCount} new
                </Badge>
              ) : (
                <span className="text-[11px] text-muted-foreground">All caught up</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  title="Mark all as read"
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                >
                  <CheckCheck className="h-3 w-3 text-primary" />
                  <span>Mark all read</span>
                </button>
              )}
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  title="Clear all notifications"
                  className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-destructive cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 border-b border-border/60 bg-muted/30 px-3 py-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
                filter === "all"
                  ? "bg-card text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
                filter === "unread"
                  ? "bg-card text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Scrollable Notification List */}
          <div className="max-h-[360px] divide-y divide-border/60 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground mb-2">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-foreground">No notifications</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {filter === "unread"
                    ? "You have read all your notifications."
                    : "Your notification inbox is clean."}
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => !item.read && handleMarkAsRead(item.id)}
                  className={cn(
                    "group relative flex items-start gap-3 p-3.5 text-xs transition-colors hover:bg-muted/50 cursor-pointer",
                    !item.read ? "bg-primary/5" : "bg-card"
                  )}
                >
                  {/* Type or Actor Icon */}
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card shrink-0 shadow-2xs">
                    {item.actor ? (
                      <span className="font-semibold text-[10px] text-foreground">
                        {item.actor.name.slice(0, 2).toUpperCase()}
                      </span>
                    ) : (
                      typeIconMap[item.type || "info"]
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex-1 space-y-1 pr-4 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={cn("text-xs font-semibold truncate", !item.read ? "text-foreground font-bold" : "text-foreground/80")}>
                        {item.title}
                      </p>
                      {!item.read && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                      {item.message}
                    </p>

                    <div className="flex items-center gap-3 pt-0.5">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        {item.timestamp}
                      </span>

                      {item.actionLabel && (
                        <a
                          href={item.actionUrl || "#"}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-primary hover:underline"
                        >
                          <span>{item.actionLabel}</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action on hover: Dismiss button */}
                  <button
                    type="button"
                    onClick={(e) => handleDismiss(item.id, e)}
                    title="Dismiss"
                    className="absolute right-2.5 top-2.5 opacity-0 group-hover:opacity-100 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border bg-muted/20 p-2.5 text-center">
            <span className="text-[10px] text-muted-foreground">
              Real-time Event Stream
            </span>
            <Button
              size="xs"
              variant="ghost"
              className="text-[11px]"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

export const NotificationCenterBlock = NotificationCenter
