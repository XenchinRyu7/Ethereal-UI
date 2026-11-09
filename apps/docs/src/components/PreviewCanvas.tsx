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
} from "lucide-react"
import {
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
  Carousel,
  AreaStatisticChart,
  BarStatisticChart,
  LineStatisticChart,
  DonutStatisticChart,
  RadialStatisticChart,
  HeatmapStatisticChart,
  Checkbox,
  ColorPicker,
  Combobox,
  CommandPalette,
  ContextMenuBox,
  DateCalendar,
  DateRangePicker,
  Divider,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
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
  DialogTrigger,
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

    case "date-calendar":
      return <DateCalendar />

    case "date-picker":
      return <DateRangePicker />

    case "divider":
      return (
        <div className="w-full max-w-xs space-y-4">
          <Divider />
          <Divider label="Or continue with" />
        </div>
      )

    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Customer Details</DrawerTitle>
              <DrawerDescription>
                Subscription and billing breakdown
              </DrawerDescription>
            </DrawerHeader>
            <div className="py-6 space-y-4 text-xs text-zinc-500">
              <Progress value={76} label="Seat usage" showValue variant="blue" />
              <Progress value={48} label="Storage used" showValue variant="emerald" />
            </div>
            <DrawerFooter>
              <Button variant="primary" size="sm">
                Save changes
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )

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
        <div className="w-full max-w-xs space-y-3">
          <div className="space-y-1.5">
            <Label>Email address</Label>
            <Input placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label>Workspace URL</Label>
            <Input
              prefixText="https://"
              suffixText=".boardui.com"
              defaultValue="acme"
            />
          </div>
        </div>
      )

    case "modal":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">Open Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new project</DialogTitle>
              <DialogDescription>
                Deploy a new workspace project in your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-2">
              <Label>Project name</Label>
              <Input defaultValue="Q4 Marketing Analytics" />
            </div>
            <DialogFooter>
              <Button variant="primary" size="sm">
                Create project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )

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
      return (
        <ToastCard
          variant="success"
          title="Changes saved"
          description="Your workspace settings have been updated."
        />
      )

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
  const [copied, setCopied] = React.useState(false)

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
          <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-700 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(code)
                setCopied(true)
                setTimeout(() => setCopied(false), 1800)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-l-xl cursor-pointer"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-zinc-400" />
              )}
              <span>{copied ? "Copied" : "Copy Page"}</span>
            </button>
            <a
              href={`/registry/${slug}.json`}
              target="_blank"
              rel="noreferrer"
              title="Open Registry JSON"
              className="border-l border-zinc-200 px-2 py-1.5 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 rounded-r-xl"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      {/* Main Rounded Preview / Code Box */}
      {tab === "preview" ? (
        <div className="flex min-h-[240px] sm:min-h-[260px] w-full items-center justify-center rounded-2xl border border-border bg-card/60 p-3.5 sm:p-8 overflow-x-auto shadow-2xs">
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
