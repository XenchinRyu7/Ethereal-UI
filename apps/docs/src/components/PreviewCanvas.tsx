import * as React from "react"
import {
  Eye,
  Code2,
  Copy,
  Check,
  ChevronDown,
  Terminal,
  FileCode2,
  Settings,
  Bell,
  Plus,
  ExternalLink,
  Mail,
  Search,
} from "lucide-react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Accordion,
  Announcement,
  Avatar,
  AvatarGroup,
  Badge,
  Chip,
  Breadcrumb,
  Button,
  CloseButton,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Kbd,
  Rating,
  Spinner,
  CopyButton,
  AspectRatio,
  PasswordInput,
  TagInput,
  FormField,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  HoverCard,
  SegmentedControl,
  Carousel,
  AreaStatisticChart,
  BarStatisticChart,
  LineStatisticChart,
  DonutStatisticChart,
  RadialStatisticChart,
  HeatmapStatisticChart,
  CandlestickStatisticChart,
  DepthStatisticChart,
  RadarStatisticChart,
  FunnelStatisticChart,
  GaugeStatisticChart,
  TreemapStatisticChart,
  Checkbox,
  ColorPicker,
  Combobox,
  CommandPalette,
  ContextMenuBox,
  Calendar,
  DatePicker,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  FileDropzone,
  Input,
  Textarea,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
  CircularProgress,
  RadioGroup,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  CardSkeleton,
  Slider,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ToastCard,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SidebarShell,
  HeaderNavbar,
  PageHeaderBar,
  StatMetricCard,
  MultiMetricGrid,
  ProgressMetricCard,
  EnterpriseDataTable,
  AdvancedFilterBar,
  UserProfileFormBlock,
  SecurityPasswordFormBlock,
  TeamRbacTableBlock,
  BillingPlanCardBlock,
  LoginFormBlock,
  PromptComposerBlock,
  AgentProgressBlock,
  TokenUsageBlock,
  KanbanBoardBlock,
  ApprovalWorkflowBlock,
  ApprovalRequestCard,
  TransactionLedgerBlock,
  TreasuryVaultCard,
  OrgDirectoryBlock,
  ContributorProfileCard,
  EventSchedulerBlock,
  DayAgendaCard,
  SystemHealthBlock,
  SlaRingGaugeCard,
  NotificationCenter,
  AiChatThreadBlock,
  ToolCallExecutionCard,
  CodeArtifactCard,
  Timeline,
  Stepper,
  NumberInput,
  OtpInput,
  EmptyState,
  DescriptionList,
  ExecutiveAnalyticsTemplate,
  ControlTowerTemplate,
  WorkspaceSettingsTemplate,
  cn,
  type PromptSubmitPayload,
  type NotificationItem,
} from "@etherealui/react"
import type { RegistryVariantSection } from "../data/registry-catalog"

const ControlledPromptComposerDemo: React.FC = () => {
  const [selectedModel, setSelectedModel] = React.useState("gemini-3.1-pro")
  const [selectedProvider, setSelectedProvider] = React.useState("Google")
  const [lastPayload, setLastPayload] = React.useState<PromptSubmitPayload | null>(null)

  return (
    <div className="w-full max-w-xl space-y-3">
      <PromptComposerBlock
        selectedModel={selectedModel}
        onModelChange={(modelId, modelObj) => {
          setSelectedModel(modelId)
          setSelectedProvider(modelObj.provider)
        }}
        onSubmitPrompt={(payload) => setLastPayload(payload)}
      />

      <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 text-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            Parent State Callback Receiver
          </span>
          <Badge variant="emerald" className="font-mono text-[10px]">
            Active: {selectedModel} ({selectedProvider})
          </Badge>
        </div>
        {lastPayload ? (
          <p className="font-mono text-[11px] text-zinc-600 dark:text-zinc-300">
            onSubmitPrompt &rarr; modelId: &quot;{lastPayload.modelId}&quot;, attachments:{" "}
            {lastPayload.attachments.length}, prompt: &quot;{lastPayload.prompt}&quot;
          </p>
        ) : (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Switch the AI model dropdown above or click <strong>Run Agent</strong> to inspect the callback payload received by your parent component.
          </p>
        )}
      </div>
    </div>
  )
}

const InteractiveAlertDemo: React.FC = () => {
  const [alerts, setAlerts] = React.useState<
    Array<{
      id: number
      variant: "default" | "info" | "success" | "warning" | "destructive"
      title: string
      description: string
    }>
  >([
    {
      id: 1,
      variant: "success",
      title: "Live Interactive Alert",
      description:
        "Nice! You triggered this live alert message. Try closing it with the (X) button.",
    },
  ])

  const addAlert = (
    variant: "default" | "info" | "success" | "warning" | "destructive",
    title: string,
    description: string
  ) => {
    setAlerts((prev) => [
      { id: Date.now() + Math.random(), variant, title, description },
      ...prev,
    ])
  }

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Live Alert Trigger Test
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Click any button below to spawn dynamic, dismissible alerts with real animations.
            </p>
          </div>
          {alerts.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAlerts([])}
              className="text-[11px] h-7 px-2.5 self-start sm:self-auto"
            >
              Clear All ({alerts.length})
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() =>
              addAlert(
                "success",
                "Deployment Successful",
                "Cluster worker #04 has been scaled up and passed health checks."
              )
            }
          >
            + Success Alert
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addAlert(
                "info",
                "Cache Refreshed",
                "Edge CDN cache was invalidated and warmed for us-east region."
              )
            }
          >
            + Info Alert
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              addAlert(
                "warning",
                "High Resource Usage",
                "Memory consumption reached 82% of assigned container limits."
              )
            }
          >
            + Warning Alert
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              addAlert(
                "destructive",
                "Database Timeout",
                "Replica query latency exceeded 3000ms threshold."
              )
            }
          >
            + Destructive Alert
          </Button>
        </div>

        <div className="space-y-2.5 pt-2 min-h-[60px]">
          {alerts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/80 p-5 text-center text-xs text-muted-foreground">
              No active alerts. Click a button above to spawn a live alert!
            </div>
          ) : (
            alerts.map((item) => (
              <Alert
                key={item.id}
                variant={item.variant}
                onClose={() => removeAlert(item.id)}
              >
                <AlertTitle>{item.title}</AlertTitle>
                <AlertDescription>{item.description}</AlertDescription>
              </Alert>
            ))
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          All Token Variants
        </h4>
        <Alert variant="default">
          <AlertTitle>Default Notification</AlertTitle>
          <AlertDescription>
            System maintenance is scheduled for Sunday at 02:00 UTC.
          </AlertDescription>
        </Alert>
        <Alert variant="info">
          <AlertTitle>Telemetry Stream Connected</AlertTitle>
          <AlertDescription>
            Cluster agent is synchronizing metrics to edge nodes.
          </AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>License Renewed</AlertTitle>
          <AlertDescription>
            Your enterprise license has been renewed for 12 months.
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>Quota Threshold Reached</AlertTitle>
          <AlertDescription>
            Worker pod-09 exceeded 85% CPU capacity.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive" onClose={() => {}}>
          <AlertTitle>Database Connection Lost</AlertTitle>
          <AlertDescription>
            Failed to connect to primary replica. Retrying in 5 seconds.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

const InteractiveAlertDialogDemo: React.FC = () => {
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [deployOpen, setDeployOpen] = React.useState(false)
  const [lastAction, setLastAction] = React.useState<string | null>(null)

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Confirmation Dialog Live Test
          </h4>
          <p className="text-[11px] text-muted-foreground">
            AlertDialog interrupts user workflow to ask for explicit confirmation before irreversible or high-impact actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Delete Project (Destructive)
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the project
                  and remove all associated databases from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setLastAction("Cancelled repository deletion")}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => setLastAction("Confirmed: Repository permanently deleted")}
                >
                  Yes, Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={deployOpen} onOpenChange={setDeployOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="primary">
                Deploy Release v1.2.0
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deploy to Production</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to deploy release v1.2.0 across 14 edge clusters. Traffic will transition smoothly over 60 seconds.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setLastAction("Cancelled production deployment")}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="primary"
                  onClick={() => setLastAction("Confirmed: Production deployment v1.2.0 initiated")}
                >
                  Start Rolling Deployment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {lastAction && (
          <div className="rounded-xl bg-muted/60 border border-border p-3 text-xs flex items-center justify-between">
            <span className="text-foreground">
              Feedback: <strong>{lastAction}</strong>
            </span>
            <button
              onClick={() => setLastAction(null)}
              className="text-muted-foreground hover:text-foreground text-[11px] underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const InteractiveDrawerDemo: React.FC = () => {
  const [openSide, setOpenSide] = React.useState<"right" | "left" | "top" | "bottom" | null>(null)
  const [userData, setUserData] = React.useState({
    name: "Elena Rostova",
    email: "elena.rostova@ethereal.dev",
    role: "Principal Architect",
    status: "Active",
    bio: "Design systems architect crafting tokenized UI components and accessible micro-interactions.",
  })
  const [formData, setFormData] = React.useState(userData)
  const [saveBanner, setSaveBanner] = React.useState(false)

  const handleOpen = (side: "right" | "left" | "top" | "bottom") => {
    setFormData({ ...userData })
    setOpenSide(side)
  }

  const handleSave = () => {
    setUserData({ ...formData })
    setOpenSide(null)
    setSaveBanner(true)
    setTimeout(() => setSaveBanner(false), 3000)
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      {saveBanner && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50/60 p-3 text-xs text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Profile changes saved successfully via Drawer!</span>
        </div>
      )}

      {/* Target Record Card */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <Avatar fallback={userData.name.slice(0, 2).toUpperCase()} tint="blue" size="lg" status="online" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{userData.name}</h4>
                <Badge variant={userData.status === "Active" ? "emerald" : "muted"} dot>
                  {userData.status}
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{userData.email}</p>
            </div>
          </div>
          <Badge variant="blue">{userData.role}</Badge>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {userData.bio}
        </p>

        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[11px] font-medium text-zinc-400">Open Drawer to Edit:</span>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" size="sm" onClick={() => handleOpen("right")}>
              Edit (Right Drawer)
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOpen("left")}>
              Left Side
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleOpen("bottom")}>
              Bottom Sheet
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={openSide !== null} onOpenChange={(open) => !open && setOpenSide(null)}>
        <DrawerContent side={openSide || "right"} size="default">
          <DrawerHeader>
            <DrawerTitle>Edit Member Profile</DrawerTitle>
            <DrawerDescription>
              Update team details, role permissions, and active settings in real time.
            </DrawerDescription>
          </DrawerHeader>

          <DrawerBody className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="drawer-name">Full Name</Label>
              <Input
                id="drawer-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="drawer-email">Email Address</Label>
              <Input
                id="drawer-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Role Designation</Label>
              <Select
                value={formData.role}
                onValueChange={(val) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Principal Architect">Principal Architect</SelectItem>
                  <SelectItem value="Lead Engineer">Lead Engineer</SelectItem>
                  <SelectItem value="Product Designer">Product Designer</SelectItem>
                  <SelectItem value="Security Officer">Security Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
              <div>
                <Label>Active Status</Label>
                <p className="text-[11px] text-zinc-500">Allow active team collaboration access</p>
              </div>
              <Switch
                checked={formData.status === "Active"}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, status: checked ? "Active" : "Inactive" })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label optional>Biography &amp; Notes</Label>
              <Textarea
                autoResize
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={() => setOpenSide(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

const InteractiveModalDemo: React.FC = () => {
  const [modalType, setModalType] = React.useState<"center" | "top" | "lg" | "sm" | null>(null)

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Modal / Dialog Interactive Test
          </h4>
          <p className="text-[11px] text-muted-foreground">
            Test center-aligned vs top-aligned positions and various size variants.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="primary" onClick={() => setModalType("center")}>
            Center Modal (Default)
          </Button>
          <Button variant="secondary" onClick={() => setModalType("top")}>
            Top Anchored Modal
          </Button>
          <Button variant="outline" onClick={() => setModalType("lg")}>
            Large Modal (size="lg")
          </Button>
          <Button variant="outline" onClick={() => setModalType("sm")}>
            Small Modal (size="sm")
          </Button>
        </div>

        <Dialog open={modalType !== null} onOpenChange={(open) => !open && setModalType(null)}>
          <DialogContent
            size={modalType === "lg" ? "lg" : modalType === "sm" ? "sm" : "default"}
            position={modalType === "top" ? "top" : "center"}
          >
            <DialogHeader>
              <DialogTitle>
                {modalType === "top"
                  ? "Top Position Modal"
                  : modalType === "lg"
                  ? "Large Configuration Modal"
                  : modalType === "sm"
                  ? "Quick Confirm Modal"
                  : "Edit Project Settings"}
              </DialogTitle>
              <DialogDescription>
                Configure parameters and environment settings for your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="space-y-1">
                <Label>Project Name</Label>
                <Input defaultValue="Ethereal Telemetry Core" />
              </div>
              <div className="space-y-1">
                <Label>Edge Cluster Hostname</Label>
                <Input defaultValue="prod-edge-01.ethereal.internal" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setModalType(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalType(null)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const InteractiveToastDemo: React.FC = () => {
  const [toasts, setToasts] = React.useState<
    Array<{
      id: number
      variant?: "success" | "error" | "warning" | "info"
      title: string
      description: string
    }>
  >([
    {
      id: 1,
      variant: "success",
      title: "Changes saved",
      description: "Your workspace settings have been updated.",
    },
  ])

  const addToast = (
    variant: "success" | "error" | "warning" | "info",
    title: string,
    description: string
  ) => {
    setToasts((prev) => [
      { id: Date.now() + Math.random(), variant, title, description },
      ...prev.slice(0, 3),
    ])
  }

  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Toast Notification Live Test
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Click to trigger floating notification toasts in real time.
            </p>
          </div>
          {toasts.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setToasts([])}
              className="text-[11px] h-7 px-2"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() =>
              addToast(
                "success",
                "Artifact Uploaded",
                "Dataset exported to cloud storage bucket."
              )
            }
          >
            + Success Toast
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              addToast(
                "warning",
                "Worker Degraded",
                "Edge cluster is experiencing elevated latency."
              )
            }
          >
            + Warning Toast
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() =>
              addToast(
                "error",
                "Deployment Failed",
                "Docker image build failed with exit code 1."
              )
            }
          >
            + Error Toast
          </Button>
        </div>

        <div className="space-y-3 pt-2">
          {toasts.map((t) => (
            <ToastCard
              key={t.id}
              variant={t.variant}
              title={t.title}
              description={t.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const InteractiveNotificationCenterDemo: React.FC = () => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: "1",
      title: "Deployment Completed",
      description: "Release v1.0.0 was deployed to edge nodes.",
      timestamp: "5m ago",
      read: false,
      type: "success",
    },
    {
      id: "2",
      title: "Rate Limit Approaching",
      description: "API consumer token usage reached 85% of tier limit.",
      timestamp: "20m ago",
      read: false,
      type: "warning",
    },
  ])

  const pushTestNotification = () => {
    const types: Array<"info" | "success" | "warning" | "error"> = [
      "info",
      "success",
      "warning",
      "error",
    ]
    const randomType = types[Math.floor(Math.random() * types.length)]
    setNotifications((prev) => [
      {
        id: String(Date.now()),
        title: `Live Alert Event #${prev.length + 1}`,
        description: "Triggered from the interactive documentation live tester.",
        timestamp: "Just now",
        read: false,
        type: randomType,
      },
      ...prev,
    ])
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm w-full max-w-lg">
        <div className="text-left space-y-1">
          <p className="text-sm font-semibold text-foreground">Header Notification Bell</p>
          <p className="text-xs text-muted-foreground">
            Click the bell to inspect feed & mark-as-read
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={pushTestNotification}
            className="text-xs"
          >
            + Push Live Notif
          </Button>
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={(id) => {
              setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
              )
            }}
            onMarkAllAsRead={() => {
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }}
            onClearAll={() => setNotifications([])}
          />
        </div>
      </div>
    </div>
  )
}

export const LiveDemoRenderer: React.FC<{ slug: string; sectionId?: string }> = ({
  slug,
  sectionId,
}) => {
  const [comboboxVal, setComboboxVal] = React.useState("us-east")
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [radioVal, setRadioVal] = React.useState("pro")
  const [sliderVal, setSliderVal] = React.useState(65)

  // Section-specific sub-demos
  if (slug === "avatar" && sectionId === "sizes") {
    return (
      <div className="flex items-center gap-3">
        <Avatar size="xs" fallback="B" tint="blue" />
        <Avatar size="sm" fallback="B" tint="blue" />
        <Avatar size="default" fallback="B" tint="blue" />
        <Avatar size="lg" fallback="B" tint="blue" />
      </div>
    )
  }
  if (slug === "avatar" && sectionId === "initial-tints") {
    return (
      <div className="flex items-center gap-3">
        <Avatar fallback="M" tint="neutral" />
        <Avatar fallback="B" tint="blue" />
        <Avatar fallback="E" tint="emerald" />
        <Avatar fallback="A" tint="amber" />
      </div>
    )
  }
  if (slug === "avatar" && sectionId === "photo") {
    return (
      <AvatarGroup
        max={4}
        items={[
          {
            alt: "Sarah",
            src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          },
          { alt: "Ben", fallback: "B", tint: "blue" },
          { alt: "Marcus", fallback: "M", tint: "neutral" },
          { alt: "Elena", fallback: "E", tint: "emerald" },
          { alt: "Kenji", fallback: "K", tint: "neutral" },
        ]}
      />
    )
  }
  if (slug === "button" && sectionId === "sizes") {
    return (
      <div className="flex items-center gap-2.5">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="default" variant="outline">
          Default
        </Button>
        <Button size="lg" variant="primary">
          Large
        </Button>
      </div>
    )
  }
  if (slug === "button" && sectionId === "loading") {
    return (
      <div className="flex items-center gap-3">
        <Button variant="primary" loading>
          Saving changes
        </Button>
        <Button variant="outline" loading>
          Processing
        </Button>
      </div>
    )
  }

  switch (slug) {
    case "alert":
      return <InteractiveAlertDemo />

    case "alert-dialog":
      return <InteractiveAlertDialogDemo />

    case "accordion":
      return (
        <Accordion
          className="max-w-md"
          items={[
            {
              id: "item-1",
              title: "How does automatic theme switching work?",
              content:
                "All components use semantic CSS variables that adapt to light and dark mode automatically.",
            },
            {
              id: "item-2",
              title: "Can I copy individual components without installing the full package?",
              content:
                "Yes. Use the CLI or copy the source code directly from the Manual tab.",
            },
            {
              id: "item-3",
              title: "Are enterprise blocks included for free?",
              content:
                "Every component, dashboard block, and template is 100% open-source under the MIT license.",
            },
          ]}
        />
      )

    case "announcement":
      return (
        <Announcement
          tag="New"
          title="Introducing 35+ light & dark mode components"
          href="/components/avatar"
        />
      )

    case "avatar":
      return (
        <div className="flex items-center gap-3">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Sarah Jenkins"
          />
          <Avatar fallback="B" tint="blue" />
          <Avatar fallback="M" tint="neutral" />
        </div>
      )

    case "badge":
      return (
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="default">Neutral</Badge>
          <Badge variant="blue" dot>
            Active
          </Badge>
          <Badge variant="emerald" dot>
            Completed
          </Badge>
          <Badge variant="amber" dot>
            Pending
          </Badge>
          <Badge variant="rose" dot>
            Failed
          </Badge>
        </div>
      )

    case "breadcrumb":
      return (
        <Breadcrumb
          items={[
            { label: "Workspace", href: "#" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb" },
          ]}
        />
      )

    case "button":
      return (
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      )

    case "button-group":
      return (
        <ButtonGroup>
          <Button variant="ghost" size="sm">
            Day
          </Button>
          <Button variant="secondary" size="sm">
            Week
          </Button>
          <Button variant="ghost" size="sm">
            Month
          </Button>
        </ButtonGroup>
      )

    case "carousel":
      return <Carousel />

    // CHARTS
    case "area-chart":
      return (
        <div className="w-full max-w-2xl">
          <AreaStatisticChart />
        </div>
      )

    case "bar-chart":
      return (
        <div className="w-full max-w-2xl">
          <BarStatisticChart />
        </div>
      )

    case "line-chart":
      return (
        <div className="w-full max-w-2xl">
          <LineStatisticChart />
        </div>
      )

    case "donut-chart":
      return (
        <div className="w-full max-w-2xl">
          <DonutStatisticChart />
        </div>
      )

    case "radial-chart":
      return (
        <div className="w-full max-w-2xl">
          <RadialStatisticChart />
        </div>
      )

    case "heatmap-chart":
      return (
        <div className="w-full max-w-2xl">
          <HeatmapStatisticChart />
        </div>
      )

    case "candlestick-chart":
      return (
        <div className="w-full max-w-2xl">
          <CandlestickStatisticChart />
        </div>
      )

    case "depth-chart":
      return (
        <div className="w-full max-w-2xl">
          <DepthStatisticChart />
        </div>
      )

    case "radar-chart":
      return (
        <div className="w-full max-w-md">
          <RadarStatisticChart />
        </div>
      )

    case "funnel-chart":
      return (
        <div className="w-full max-w-xl">
          <FunnelStatisticChart />
        </div>
      )

    case "gauge-chart":
      return (
        <div className="w-full max-w-sm">
          <GaugeStatisticChart />
        </div>
      )

    case "treemap-chart":
      return (
        <div className="w-full max-w-2xl">
          <TreemapStatisticChart />
        </div>
      )

    case "checkbox":
      return (
        <div className="space-y-3">
          <label className="flex items-center gap-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
            <Checkbox defaultChecked />
            <span>Send weekly analytics digest via email</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
            <Checkbox />
            <span>Require two-factor authentication for all members</span>
          </label>
        </div>
      )

    case "chip":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Chip active onRemove={() => {}}>
            Status: Active
          </Chip>
          <Chip onRemove={() => {}}>Plan: Enterprise</Chip>
          <Chip>Region: US-East</Chip>
        </div>
      )

    case "close-button":
      return (
        <div className="flex items-center gap-3">
          <CloseButton size="sm" />
          <CloseButton size="default" />
        </div>
      )

    case "color-picker":
      return <ColorPicker />

    case "combobox":
      return (
        <Combobox
          className="w-64"
          value={comboboxVal}
          onValueChange={setComboboxVal}
          options={[
            { value: "us-east", label: "US East (N. Virginia)", badge: "Primary" },
            { value: "eu-central", label: "EU Central (Frankfurt)", badge: "EU" },
            { value: "ap-south", label: "Asia Pacific (Singapore)", badge: "APAC" },
          ]}
        />
      )

    case "command-palette":
      return (
        <>
          <Button variant="outline" onClick={() => setCmdOpen(true)}>
            Open Command Palette (⌘K)
          </Button>
          <CommandPalette
            open={cmdOpen}
            onOpenChange={setCmdOpen}
            enableGlobalShortcut={false}
          />
        </>
      )

    case "card":
      return (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>Deploy your new project in one click.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-zinc-500">
              Connect your GitHub repository and automatically configure CI/CD pipelines.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Deploy</Button>
          </CardFooter>
        </Card>
      )

    case "kbd":
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Quick Search:</span>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      )

    case "rating":
      return (
        <div className="flex items-center gap-3">
          <Rating defaultValue={4} />
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
            4 / 5 Stars
          </span>
        </div>
      )

    case "spinner":
      return (
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" variant="primary" />
          <Spinner size="lg" />
        </div>
      )

    case "copy-button":
      return (
        <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900">
          <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
            npm i @etherealui/react
          </code>
          <CopyButton value="npm i @etherealui/react" />
        </div>
      )

    case "aspect-ratio":
      return (
        <div className="w-80 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <AspectRatio ratio={16 / 9}>
            <div className="h-full w-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
              16 : 9 Aspect Ratio
            </div>
          </AspectRatio>
        </div>
      )

    case "password-input":
      return (
        <div className="w-full max-w-xs space-y-2">
          <PasswordInput placeholder="Enter strong password..." showStrengthMeter />
        </div>
      )

    case "tag-input":
      return (
        <div className="w-full max-w-sm space-y-2">
          <TagInput defaultValue={["React", "TypeScript", "Tailwind"]} placeholder="Add skill..." />
        </div>
      )

    case "form-field":
      return (
        <div className="w-full max-w-xs space-y-4">
          <FormField label="Organization Name" required description="Public company or team display name.">
            <Input placeholder="Acme Corp" />
          </FormField>
        </div>
      )

    case "collapsible":
      return (
        <Collapsible className="w-80 rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
          <CollapsibleTrigger>Advanced Security Configuration</CollapsibleTrigger>
          <CollapsibleContent className="pt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Configure biometric keys, session revocation thresholds, and hardware security token verification.
          </CollapsibleContent>
        </Collapsible>
      )

    case "hover-card":
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Collaborator:</span>
          <HoverCard
            content={
              <div className="space-y-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">Elena Rostova</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Principal Design Architect @ Ethereal Labs. Specializing in OKLCH palettes and design systems.
                </p>
              </div>
            }
          >
            <span className="text-xs font-semibold text-blue-600 underline cursor-pointer dark:text-blue-400">
              @elena
            </span>
          </HoverCard>
        </div>
      )

    case "segmented-control":
      return (
        <SegmentedControl
          defaultValue="monthly"
          options={[
            { label: "Daily", value: "daily" },
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Yearly", value: "yearly" },
          ]}
        />
      )

    case "context-menu":
      return (
        <ContextMenuBox
          actions={[
            { label: "View details", shortcut: "⌘ I" },
            { label: "Duplicate row", shortcut: "⌘ D" },
            { label: "Delete record", shortcut: "⌘ ⌫", destructive: true },
          ]}
          className="flex h-36 w-full max-w-xs items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white/50 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40"
        >
          Right-click anywhere inside this box
        </ContextMenuBox>
      )

    case "calendar":
    case "date-calendar":
      return (
        <div className="flex flex-col items-center gap-3">
          <Calendar />
        </div>
      )

    case "date-picker":
      return (
        <div className="flex flex-col items-center gap-3">
          <DatePicker />
        </div>
      )

    case "divider":
      return (
        <div className="w-full max-w-xs space-y-4">
          <Divider />
          <Divider label="Or continue with" />
        </div>
      )

    case "drawer":
    case "sheet":
      return <InteractiveDrawerDemo />

    case "dropdown":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Options
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem shortcut="⌘ E">Edit profile</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘ D">Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive shortcut="⌘ ⌫">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )

    case "file-upload":
      return <FileDropzone className="w-full max-w-md" />

    case "icon-button":
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="primary" size="icon" aria-label="Add">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )

    case "input":
      return (
        <div className="w-full max-w-xs space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="demo-email">Email address</Label>
            <Input id="demo-email" type="email" placeholder="you@ethereal.dev" leftIcon={<Mail className="h-4 w-4" />} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="demo-url">Workspace subdomain</Label>
            <Input
              id="demo-url"
              prefixText="https://"
              suffixText=".ethereal.dev"
              defaultValue="acme-corp"
            />
          </div>
          <div className="space-y-1.5">
            <Label optional>Search filter</Label>
            <Input placeholder="Filter records or keywords..." leftIcon={<Search className="h-4 w-4" />} />
          </div>
        </div>
      )

    case "modal":
      return <InteractiveModalDemo />

    case "pagination":
      return <Pagination totalPages={5} initialPage={2} />

    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Configure dimensions</Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-3">
            <div className="text-xs font-semibold">Dimensions</div>
            <div className="space-y-1.5">
              <Label>Max width</Label>
              <Input defaultValue="100%" />
            </div>
          </PopoverContent>
        </Popover>
      )

    case "progress":
      return (
        <div className="flex items-center gap-6 w-full max-w-xs">
          <CircularProgress value={72} variant="blue" />
          <Progress
            value={72}
            label="Storage used"
            showValue
            className="flex-1"
          />
        </div>
      )

    case "radio-group":
      return (
        <RadioGroup
          className="w-full max-w-xs"
          value={radioVal}
          onValueChange={setRadioVal}
          options={[
            {
              value: "starter",
              label: "Starter — Free",
              description: "Up to 3 team members and 5 projects.",
            },
            {
              value: "pro",
              label: "Pro — $29/mo",
              description: "Unlimited projects and custom domains.",
            },
          ]}
        />
      )

    case "select":
      return (
        <Select defaultValue="admin">
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Workspace Owner</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      )

    case "skeleton":
      return <CardSkeleton className="w-full max-w-xs" />

    case "slider":
      return (
        <Slider
          value={sliderVal}
          onValueChange={setSliderVal}
          label="Alert threshold"
          className="w-full max-w-xs"
        />
      )

    case "switch":
      return (
        <label className="flex items-center gap-3 text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
          <Switch defaultChecked />
          <span>Enable automatic daily backups</span>
        </label>
      )

    case "table":
      return (
        <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/50">
              <tr>
                <th className="px-4 py-2.5 font-medium text-zinc-500">Member</th>
                <th className="px-4 py-2.5 font-medium text-zinc-500">Status</th>
                <th className="px-4 py-2.5 font-medium text-zinc-500 text-right">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-2.5 flex items-center gap-2.5">
                  <Avatar fallback="SR" tint="blue" size="xs" />
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Saeful Rohman
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant="emerald" dot>
                    Active
                  </Badge>
                </td>
                <td className="px-4 py-2.5 text-right text-zinc-500">Owner</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 flex items-center gap-2.5">
                  <Avatar fallback="ER" tint="neutral" size="xs" />
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Elena Rostova
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <Badge variant="blue" dot>
                    Online
                  </Badge>
                </td>
                <td className="px-4 py-2.5 text-right text-zinc-500">Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      )

    case "tabs":
      return (
        <Tabs defaultValue="overview" className="w-full max-w-xs">
          <TabsList variant="segmented">
            <TabsTrigger variant="segmented" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger variant="segmented" value="analytics">
              Analytics
            </TabsTrigger>
            <TabsTrigger variant="segmented" value="reports">
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-xs text-zinc-500 pt-2">
            Overview metrics and recent activity.
          </TabsContent>
          <TabsContent value="analytics" className="text-xs text-zinc-500 pt-2">
            Real-time conversion and retention breakdowns.
          </TabsContent>
          <TabsContent value="reports" className="text-xs text-zinc-500 pt-2">
            Downloadable CSV and PDF statements.
          </TabsContent>
        </Tabs>
      )

    case "textarea":
      return (
        <div className="w-full max-w-xs space-y-1.5">
          <Label optional>Project description</Label>
          <Textarea autoResize placeholder="Write a short summary..." />
        </div>
      )

    case "toast":
      return <InteractiveToastDemo />

    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Add to workspace library</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

    // BLOCKS
    case "sidebar":
      return (
        <div className="flex h-[440px] overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <SidebarShell />
        </div>
      )

    case "header-navbar":
      return (
        <div className="w-full space-y-6">
          <HeaderNavbar />
          <PageHeaderBar
            title="Revenue Overview"
            subtitle="Monthly recurring revenue and customer cohort metrics."
          />
        </div>
      )

    case "stat-card":
      return (
        <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <StatMetricCard
            title="Monthly Recurring Revenue"
            value="$128,430"
            change="+14.2%"
            trend="up"
          />
          <ProgressMetricCard />
        </div>
      )

    case "metric-grid":
      return (
        <div className="w-full">
          <MultiMetricGrid />
        </div>
      )

    case "data-table":
      return (
        <div className="w-full">
          <EnterpriseDataTable />
        </div>
      )

    case "filter-bar":
      return (
        <div className="w-full">
          <AdvancedFilterBar />
        </div>
      )

    case "profile-form":
      return (
        <div className="w-full max-w-2xl">
          <UserProfileFormBlock />
        </div>
      )

    case "team-members":
      return (
        <div className="w-full max-w-2xl">
          <TeamRbacTableBlock />
        </div>
      )

    case "security-settings":
      return (
        <div className="w-full max-w-2xl">
          <SecurityPasswordFormBlock />
        </div>
      )

    case "billing-card":
      return (
        <div className="w-full max-w-2xl">
          <BillingPlanCardBlock />
        </div>
      )

    case "login-form":
      return (
        <div className="w-full max-w-md py-4">
          <LoginFormBlock />
        </div>
      )

    case "prompt-composer":
      if (sectionId === "controlled-api") {
        return <ControlledPromptComposerDemo />
      }
      if (sectionId === "attachments") {
        return <PromptComposerBlock variant="attachments-only" />
      }
      if (sectionId === "compact") {
        return <PromptComposerBlock variant="compact" />
      }
      return <PromptComposerBlock />

    case "agent-progress":
      if (sectionId === "reasoning-trace") {
        return <AgentProgressBlock variant="reasoning" />
      }
      if (sectionId === "search-stream") {
        return <AgentProgressBlock variant="search-stream" />
      }
      return <AgentProgressBlock />

    case "token-usage":
      if (sectionId === "context-window") {
        return <TokenUsageBlock variant="context-only" />
      }
      if (sectionId === "rate-limits") {
        return <TokenUsageBlock variant="limits-only" />
      }
      return <TokenUsageBlock />

    case "kanban-board":
      if (sectionId === "custom-config") {
        return (
          <KanbanBoardBlock
            title="Product Engineering Roadmap"
            taskCodePrefix="ENG"
            columns={[
              { id: "todo", title: "To Do", dotClass: "bg-zinc-400" },
              { id: "review", title: "Code Review", dotClass: "bg-amber-500" },
              { id: "production", title: "Production", dotClass: "bg-emerald-500" },
            ]}
            categories={[
              { id: "Frontend", label: "Frontend", badgeVariant: "blue" },
              { id: "Backend", label: "Backend", badgeVariant: "emerald" },
              { id: "DevOps", label: "DevOps", badgeVariant: "amber" },
            ]}
            initialTasks={[
              {
                id: "eng-1",
                code: "ENG-201",
                title: "Migrate authentication session store to Redis Cluster",
                tag: "Backend",
                priority: "Urgent",
                column: "review",
                assignee: "SR",
                isAgentAssigned: false,
                completedSubtasks: 3,
                totalSubtasks: 4,
              },
              {
                id: "eng-2",
                code: "ENG-204",
                title: "Automated Lighthouse CI performance budget check",
                tag: "DevOps",
                priority: "High",
                column: "todo",
                assignee: "AI",
                isAgentAssigned: true,
                completedSubtasks: 1,
                totalSubtasks: 3,
              },
              {
                id: "eng-3",
                code: "ENG-209",
                title: "Ship accessible Dialog and Select primitives",
                tag: "Frontend",
                priority: "Medium",
                column: "production",
                assignee: "SR",
                isAgentAssigned: false,
                completedSubtasks: 5,
                totalSubtasks: 5,
              },
            ]}
          />
        )
      }
      if (sectionId === "compact-board") {
        return <KanbanBoardBlock variant="compact" />
      }
      if (sectionId === "agent-tasks") {
        return <KanbanBoardBlock variant="agent-queue" />
      }
      return <KanbanBoardBlock />

    case "ai-chat-thread":
      if (sectionId === "modular-composition") {
        return (
          <div className="w-full max-w-2xl space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <ToolCallExecutionCard
              defaultExpanded
              toolCall={{
                id: "tc-custom",
                toolName: "stripe.invoices.list_overdue",
                durationMs: 184,
                status: "success",
                inputSummary: '{ "status": "past_due", "limit": 10 }',
                outputJson: '{ "overdue_accounts": 2, "total_amount": "$14,200.00" }',
              }}
            />
            <CodeArtifactCard
              title="reconcile-ledger.ts"
              code={`export async function reconcileInvoice(id: string) {\n  return await db.invoices.update({ where: { id }, data: { reconciled: true } })\n}`}
            />
          </div>
        )
      }
      return <AiChatThreadBlock />

    case "approval-workflow":
      if (sectionId === "modular-composition") {
        return (
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <ApprovalRequestCard
              item={{
                id: "apr-custom",
                code: "APR-9901",
                category: "wire",
                title: "Treasury Liquidity Sweep — JPMorgan Chase NY",
                requesterName: "Elena Rostova",
                requesterRole: "VP Finance",
                amountOrDuration: "$450,000.00",
                submittedAt: "Just now",
                riskLevel: "high",
                notes: "Requires 2 of 3 Executive Signers (Dual-Control)",
                status: "pending",
                approversSigned: 1,
                approversRequired: 2,
              }}
            />
          </div>
        )
      }
      return <ApprovalWorkflowBlock />

    case "transaction-ledger":
      if (sectionId === "modular-composition") {
        return (
          <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <TreasuryVaultCard
              account={{
                currency: "SGD",
                name: "DBS Bank Singapore Nostro",
                ibanOrAccount: "**** 7741",
                balance: "S$ 3,840,200.00",
                change24h: "+4.2% (24h)",
              }}
            />
            <TreasuryVaultCard
              account={{
                currency: "GBP",
                name: "Barclays London Clearing",
                ibanOrAccount: "**** 1094",
                balance: "£ 1,920,500.00",
                change24h: "+1.8% (24h)",
              }}
            />
          </div>
        )
      }
      return <TransactionLedgerBlock />

    case "org-directory":
      if (sectionId === "spotlight") {
        return (
          <ContributorProfileCard
            className="w-full max-w-md"
            employee={{
              id: "emp-01",
              employeeCode: "EMP-001",
              name: "Saeful Rohman",
              handle: "@saefulrohman",
              role: "Principal Systems Architect",
              department: "Engineering",
              location: "Jakarta, ID (GMT+7)",
              status: "active",
              mrrOrKpiValue: "99.8%",
              mrrOrKpiLabel: "Architecture SLA",
              commitsOrTasks: "418 PRs",
              attendanceScore: "99.4%",
              heatmapLevels: [
                3, 3, 2, 3, 3, 2, 3, 1, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3,
                3, 2, 3, 3, 1, 2, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3, 2, 3,
              ],
            }}
          />
        )
      }
      return <OrgDirectoryBlock />

    case "event-scheduler":
      if (sectionId === "modular-composition") {
        return (
          <div className="w-full max-w-lg">
            <DayAgendaCard
              day={24}
              events={[
                {
                  id: "ev-1",
                  day: 24,
                  title: "Core Banking ISO-20022 Cutover Window",
                  time: "02:00 UTC",
                  category: "release",
                  owner: "SR",
                },
                {
                  id: "ev-2",
                  day: 24,
                  title: "APAC Primary SRE On-Call Handover",
                  time: "08:00 UTC",
                  category: "shift",
                  owner: "DK",
                },
              ]}
            />
          </div>
        )
      }
      return <EventSchedulerBlock />

    case "system-health":
      if (sectionId === "modular-composition") {
        return (
          <div className="w-full max-w-md">
            <SlaRingGaugeCard
              score={99}
              title="Global Edge Network"
              subtitle="Multi-region telemetry"
              statusLabel="Operational"
              metrics={[
                {
                  id: "api",
                  label: "API Availability",
                  valueLabel: "99.99%",
                  percent: 99,
                },
                {
                  id: "cache",
                  label: "Cache Hit Ratio",
                  valueLabel: "96.4%",
                  percent: 96,
                },
              ]}
            />
          </div>
        )
      }
      return <SystemHealthBlock />

    case "notification-center":
      return <InteractiveNotificationCenterDemo />

    // NEW ENTERPRISE PRIMITIVES
    case "timeline":
      return <Timeline />

    case "stepper":
      return <Stepper />

    case "number-input":
      return <NumberInput />

    case "otp-input":
      return <OtpInput />

    case "empty-state":
      return <EmptyState />

    case "description-list":
      return <DescriptionList />

    // TEMPLATES
    case "executive-analytics":
      return <ExecutiveAnalyticsTemplate />

    case "control-tower":
      return <ControlTowerTemplate />

    case "workspace-settings":
      return <WorkspaceSettingsTemplate />

    default:
      return (
        <div className="flex items-center gap-3">
          <Avatar fallback="B" tint="blue" />
          <Avatar fallback="M" tint="neutral" />
        </div>
      )
  }
}

export interface PreviewBoxProps {
  slug: string
  code: string
  sectionId?: string
  showCopyPage?: boolean
}

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "function",
  "return",
  "const",
  "let",
  "var",
  "type",
  "interface",
  "async",
  "await",
  "true",
  "false",
  "null",
  "undefined",
])

const highlightTsxLine = (line: string): React.ReactNode[] => {
  if (line.trim().startsWith("//")) {
    return [
      <span key="comment" className="text-zinc-400 dark:text-zinc-500 italic">
        {line}
      </span>,
    ]
  }

  const tokenRegex =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[A-Za-z0-9_.]+|\b[A-Za-z_][A-Za-z0-9_]*(?=\s*=)|\b[A-Za-z_][A-Za-z0-9_]*\b|[{}()[\].,:;+-=*/>]+)/g

  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${match.index}-${token}`

    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      nodes.push(
        <span key={key} className="text-emerald-600 dark:text-emerald-400">
          {token}
        </span>
      )
    } else if (token.startsWith("</") || token.startsWith("<")) {
      const tagName = token.replace(/^<\/?/, "")
      const isComponent = /^[A-Z]/.test(tagName)
      const bracket = token.startsWith("</") ? "</" : "<"
      nodes.push(
        <span key={key}>
          <span className="text-zinc-400 dark:text-zinc-500">{bracket}</span>
          <span
            className={
              isComponent
                ? "text-blue-600 dark:text-sky-400 font-medium"
                : "text-indigo-600 dark:text-indigo-400"
            }
          >
            {tagName}
          </span>
        </span>
      )
    } else if (KEYWORDS.has(token)) {
      nodes.push(
        <span key={key} className="text-rose-600 dark:text-rose-400 font-medium">
          {token}
        </span>
      )
    } else if (
      line.slice(match.index + token.length).trimStart().startsWith("=") &&
      !line.slice(0, match.index).trimEnd().endsWith("const") &&
      !line.slice(0, match.index).trimEnd().endsWith("let")
    ) {
      nodes.push(
        <span key={key} className="text-violet-600 dark:text-violet-400">
          {token}
        </span>
      )
    } else if (/^[A-Z][A-Za-z0-9_]*$/.test(token)) {
      nodes.push(
        <span key={key} className="text-blue-600 dark:text-sky-400">
          {token}
        </span>
      )
    } else if (/^[{}()[\].,:;+-=*/>]+$/.test(token)) {
      nodes.push(
        <span key={key} className="text-zinc-400 dark:text-zinc-500">
          {token}
        </span>
      )
    } else {
      nodes.push(
        <span key={key} className="text-zinc-800 dark:text-zinc-200">
          {token}
        </span>
      )
    }

    lastIndex = tokenRegex.lastIndex
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex))
  }

  return nodes
}

export const SyntaxHighlightedCodeBox: React.FC<{
  code: string
  filename?: string
}> = ({ code, filename }) => {
  const [copied, setCopied] = React.useState(false)
  const lines = code.trim().split("\n")

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span className="font-mono text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            {filename || "example.tsx"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-xs leading-6">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell select-none pr-4 text-right text-[11px] text-zinc-300 dark:text-zinc-600">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {highlightTsxLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}

export const PreviewCanvas: React.FC<PreviewBoxProps & { title?: string; description?: string; badge?: string; sourceFile?: string }> = ({
  slug,
  code,
  sectionId,
  showCopyPage = true,
}) => {
  const [tab, setTab] = React.useState<"preview" | "code">("preview")
  const [copyMenuOpen, setCopyMenuOpen] = React.useState(false)
  const [copiedType, setCopiedType] = React.useState<"code" | "cli" | null>(null)
  const copyMenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (copyMenuRef.current && !copyMenuRef.current.contains(e.target as Node)) {
        setCopyMenuOpen(false)
      }
    }
    if (copyMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [copyMenuOpen])

  return (
    <div className="space-y-3">
      {/* Top Controls Row (Exact BoardUI style) */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all cursor-pointer",
              tab === "preview"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all cursor-pointer",
              tab === "code"
                ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            Code
          </button>
        </div>

        {showCopyPage && (
          <div ref={copyMenuRef} className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => setCopyMenuOpen((prev) => !prev)}
              aria-expanded={copyMenuOpen}
              aria-label="Copy code or CLI command"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors",
                copyMenuOpen && "bg-zinc-50 dark:bg-zinc-800 ring-2 ring-zinc-400/20"
              )}
            >
              {copiedType ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {copiedType === "code" ? "Copied Code" : "Copied CLI"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
                  copyMenuOpen && "rotate-180"
                )}
              />
            </button>

            {copyMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-1.5 w-60 rounded-xl border border-zinc-200 bg-white p-1.5 text-xs shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(code)
                    setCopiedType("code")
                    setCopyMenuOpen(false)
                    setTimeout(() => setCopiedType(null), 2000)
                  }}
                  className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      Copy Code
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      React TSX component preview
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(`npx @etherealui/cli@latest add ${slug}`)
                    setCopiedType("cli")
                    setCopyMenuOpen(false)
                    setTimeout(() => setCopiedType(null), 2000)
                  }}
                  className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" />
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      Copy CLI Command
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                      npx @etherealui/cli add {slug}
                    </span>
                  </div>
                </button>

                <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

                <a
                  href={`/registry/${slug}.json`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setCopyMenuOpen(false)}
                  className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-600 dark:text-zinc-300"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      View Registry JSON
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Raw schema in new tab
                    </span>
                  </div>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Rounded Preview / Code Box */}
      {tab === "preview" ? (
        <div
          className={cn(
            "w-full rounded-2xl border border-border bg-card/60 overflow-hidden shadow-2xs",
            slug === "executive-analytics" ||
              slug === "control-tower" ||
              slug === "workspace-settings" ||
              slug.startsWith("template")
              ? "p-0"
              : "flex min-h-[240px] sm:min-h-[260px] items-center justify-center p-3.5 sm:p-8 overflow-x-auto"
          )}
        >
          <LiveDemoRenderer slug={slug} sectionId={sectionId} />
        </div>
      ) : (
        <SyntaxHighlightedCodeBox
          code={code}
          filename={`${slug}${sectionId ? `-${sectionId}` : ""}.tsx`}
        />
      )}
    </div>
  )
}

export interface BoardUIDocPageProps {
  slug?: string
  title?: string
  description?: string
  code?: string
  sourceFile?: string
  dependencies?: string[]
  sections?: RegistryVariantSection[]
  item?: {
    slug: string
    title: string
    description: string
    code: string
    sourceFile: string
    dependencies: string[]
    sections?: RegistryVariantSection[]
  }
}

export const BoardUIDocPage: React.FC<BoardUIDocPageProps> = ({
  slug: propSlug,
  code: propCode,
  sections: propSections,
  item,
}) => {
  const slug = propSlug || item?.slug || "component"
  const code = propCode || item?.code || ""
  const sections = propSections || item?.sections || []
  const [installTab, setInstallTab] = React.useState<"cli" | "manual">("cli")
  const [pkgManager, setPkgManager] = React.useState<"npm" | "pnpm" | "yarn">("npm")
  const [copiedCli, setCopiedCli] = React.useState(false)

  const cliCommandMap = {
    npm: `npx @etherealui/cli@latest add ${slug}`,
    pnpm: `pnpm dlx @etherealui/cli@latest add ${slug}`,
    yarn: `yarn dlx @etherealui/cli@latest add ${slug}`,
  }

  return (
    <div className="space-y-12">
      {/* 1. Primary Preview Section */}
      <section id="preview" className="scroll-mt-20">
        <PreviewCanvas slug={slug} code={code} showCopyPage={true} />
      </section>

      {/* 2. Installation Section (Exact BoardUI style) */}
      <section id="installation" className="space-y-4 scroll-mt-20">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Installation
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          You can add this {slug.replace("-", " ")} component using our CLI or manually:
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Dark mode ready - this component follows Ethereal UI semantic tokens automatically.{" "}
          <a
            href="/docs/theming"
            className="text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400"
          >
            Set up theme switching.
          </a>
        </p>

        {/* CLI / Manual Tabs */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setInstallTab("cli")}
            className={cn(
              "inline-flex items-center gap-2 border-b-2 pb-2.5 text-xs font-medium transition-colors cursor-pointer",
              installTab === "cli"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            <Terminal className="h-3.5 w-3.5" />
            CLI
          </button>
          <button
            type="button"
            onClick={() => setInstallTab("manual")}
            className={cn(
              "inline-flex items-center gap-2 border-b-2 pb-2.5 text-xs font-medium transition-colors cursor-pointer",
              installTab === "manual"
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            <FileCode2 className="h-3.5 w-3.5" />
            Manual
          </button>
        </div>

        {installTab === "cli" ? (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              The CLI copies the component source (with its internal dependencies) into your project and installs any required npm packages.
            </p>

            {/* Package Manager Box (npm / pnpm / yarn) */}
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
                <div className="flex items-center gap-1">
                  {(["npm", "pnpm", "yarn"] as const).map((pm) => (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => setPkgManager(pm)}
                      className={cn(
                        "rounded-md px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer",
                        pkgManager === pm
                          ? "bg-white text-zinc-900 shadow-2xs font-medium dark:bg-zinc-800 dark:text-zinc-100"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                      )}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(cliCommandMap[pkgManager])
                    setCopiedCli(true)
                    setTimeout(() => setCopiedCli(false), 1800)
                  }}
                  className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-200/60 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                  title="Copy command"
                >
                  {copiedCli ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <div className="bg-white px-4 py-3.5 font-mono text-xs dark:bg-zinc-950">
                <span className="text-rose-500 dark:text-rose-400">
                  {pkgManager === "npm" ? "npx" : `${pkgManager} dlx`}
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  @etherealui/cli@latest
                </span>{" "}
                <span className="text-zinc-700 dark:text-zinc-300">
                  add {slug}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              1. Install <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-blue-600 dark:bg-zinc-800 dark:text-blue-400">@etherealui/react</code> from NPM or copy the component usage below into your project:
            </p>
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white px-4 py-3 font-mono text-xs dark:border-zinc-800 dark:bg-zinc-950">
              <span className="text-rose-500 dark:text-rose-400">pnpm</span>{" "}
              <span className="text-zinc-700 dark:text-zinc-300">add</span>{" "}
              <span className="text-blue-600 dark:text-sky-400 font-medium">
                @etherealui/react
              </span>{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                lucide-react clsx tailwind-merge
              </span>
            </div>
            <SyntaxHighlightedCodeBox
              code={code}
              filename={`components/ui/${slug}.tsx`}
            />
          </div>
        )}
      </section>

      {/* 3. Variant Sub-Sections (Sizes, Initial tints, Photo, etc.) */}
      {sections.map((sec) => (
        <section key={sec.id} id={sec.id} className="space-y-3 scroll-mt-20">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {sec.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {sec.description}
          </p>
          <PreviewCanvas
            slug={slug}
            sectionId={sec.id}
            code={sec.code}
            showCopyPage={false}
          />
        </section>
      ))}
    </div>
  )
}
