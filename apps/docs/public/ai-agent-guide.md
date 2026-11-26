# 🌌 Ethereal UI — Complete AI Agent Guide & Rules (`ETHEREAL_AGENT_GUIDE.md`)

> **For AI Coding Agents (Cursor, Claude Code, GitHub Copilot, Gemini, Antigravity):**  
> This document is the single source of truth for generating, styling, and architecting applications with **Ethereal UI** (`@etherealui/react` and `@etherealui/cli`). Adhere strictly to the token pairing rules, Tailwind CSS v4 conventions, and component patterns outlined below.

---

## 1. Overview & Architecture Philosophy

**Ethereal UI** is a production-grade, dark-first enterprise component library and agentic block system designed specifically for SaaS platforms, AI telemetry consoles, and data-dense dashboards.

### Core Principles
- **Dark-First Telemetry Canvas:** The default canvas is deep zinc `#09090b` with elevated panels `#121215`, crisp `1px solid rgba(255, 255, 255, 0.08)` borders, and subtle luminous accents.
- **Tailwind CSS v4 Native:** Pure `@theme inline` CSS variable tokens. **Zero legacy `tailwind.config.js`**.
- **Radix UI Headless Accessibility:** All overlays, popovers, dropdowns, and dialogs are powered by Radix UI for strict WCAG AA keyboard accessibility and ARIA semantics.
- **870+ OKLCH Theme Presets:** Real-time dynamic theming powered by OKLCH color spaces and linear Oklab interpolation.

---

## 2. Quickstart & Installation for New Projects

When scaffolding a new project or adding Ethereal UI into an existing React/Next.js/Astro/Vite application:

### Step 1: Install Packages
```bash
# Using pnpm (recommended)
pnpm add @etherealui/react lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot

# Or using npm
npm install @etherealui/react lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
```

### Step 2: Configure Tailwind CSS v4 (`globals.css`)
In your root CSS file (e.g. `src/styles/globals.css` or `src/app/globals.css`):

```css
@import "tailwindcss";
@import "@etherealui/react/styles.css";

/* Optional custom theme overrides */
:root {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

### Step 3: Scaffold Components via CLI (Optional)
If you prefer scaffolding individual component source files directly into your project:

```bash
# Initialize ethereal configuration (creates ethereal.json)
npx @etherealui/cli init

# Add specific primitives or blocks
npx @etherealui/cli add button data-table kanban-board stat-card
```

---

## 3. Strict Theming & Token Pairing Rules (CRITICAL FOR AGENTS)

> [!CAUTION]
> **THE "GHOST FIELD" & CONTRAST INVERSION TRAP (WHITE-ON-WHITE BUG)**
> 
> **The Common AI Agent Pitfall:**
> AI agents frequently write hardcoded utilities like:
> ```tsx
> /* ❌ FATAL MISTAKE: Causes invisible "Ghost Fields" in Dark Mode! */
> <input className="bg-white text-foreground border-gray-300" />
> <div className="bg-white text-foreground p-6 rounded-xl">...</div>
> ```
> 
> **Why does this break?**
> 1. In **Light Mode**: `bg-white` is white and `text-foreground` is near-black (`#09090b`). It looks fine.
> 2. In **Dark Mode**: `text-foreground` automatically transitions to white (`#fafafa`). Because `bg-white` was hardcoded, the result is **White Text on White Background** = **Completely invisible text!**
> 
> **The Reverse Trap ("Neon Burnout"):**
> ```tsx
> /* ❌ FATAL MISTAKE: Text disappears on bright neon themes! */
> <button className="bg-primary text-white">Submit</button>
> ```
> In Ethereal UI, themes like *Light Green*, *Cyberpunk*, or *Pastel* feature bright neon primary colors (lightness > 85%). If you hardcode `text-white`, the white text on a bright neon button becomes completely unreadable!
> 
> **STRICT AGENT MANDATES:**
> 1. **USE ETHEREAL UI PRIMITIVES DIRECTLY**: Native components (`<Input>`, `<Button>`, `<Card>`, `<DataTable>`, etc.) already use semantic tokens internally and are 100% immune to this issue.
> 2. **NEVER hardcode Tailwind palette colors**: Do NOT use `bg-blue-600`, `text-white`, `bg-white`, `border-gray-200`, `bg-zinc-900`.
> 3. **ALWAYS pair semantic background tokens with their matching foreground token**:
>    - `bg-background` ➔ `text-foreground`
>    - `bg-card` ➔ `text-card-foreground`
>    - `bg-primary` ➔ `text-primary-foreground` (NEVER `text-white`!)
>    - `bg-secondary` ➔ `text-secondary-foreground`
>    - `bg-muted` ➔ `text-muted-foreground`
>    - `bg-popover` ➔ `text-popover-foreground`
>    - `border-border`, `ring-ring`

### Mandatory Semantic Token Matrix

Always pair background tokens with their corresponding foreground tokens:

| Element / Utility | Background Class | Matching Text Class | Note / Contrast Rule |
| :--- | :--- | :--- | :--- |
| **Canvas / Root** | `bg-background` | `text-foreground` | ✅ Adapts cleanly between Light & Dark canvas |
| **Cards & Panels** | `bg-card` | `text-card-foreground` | ✅ Prevents white-on-white card/modal bug in Dark Mode |
| **Primary Actions** | `bg-primary` | `text-primary-foreground` | ✅ Adapts to black on neon themes and white on dark themes |
| **Secondary Controls** | `bg-secondary` | `text-secondary-foreground` | ✅ Secondary buttons, active chips |
| **Muted Surfaces** | `bg-muted` | `text-muted-foreground` | ✅ Badges, subtle tags, inactive tab pills |
| **Popovers & Menus** | `bg-popover` | `text-popover-foreground` | ✅ Tooltips, dropdown menus |
| **Sidebar Root** | `bg-sidebar` | `text-sidebar-foreground` | ✅ Navigation drawers |
| **Sidebar Accent** | `bg-sidebar-primary` | `text-sidebar-primary-foreground` | ✅ Active badges (e.g. `NEW`, counts) |

### Dynamic Oklab Neutral Scale (`zinc-50` to `zinc-950`)
Ethereal UI dynamically computes the neutral grayscale using linear Oklab interpolation:
```css
--color-zinc-100: color-mix(in oklab, var(--foreground) 6%, var(--background));
--color-zinc-600: color-mix(in oklab, var(--foreground) 70%, var(--background));
--color-zinc-700: color-mix(in oklab, var(--foreground) 82%, var(--background));
```
- **Rule:** If you use `bg-zinc-100`, pair it with `text-zinc-700` or `text-foreground`.
- **Prefer:** Use semantic tokens (`bg-muted text-muted-foreground`) over hardcoded color utilities whenever possible.

### Applying One of the 870+ OKLCH Community Themes

> [!IMPORTANT]
> **NO REACT `<ThemeProvider>` NEEDED!**  
> Ethereal UI runs on native Tailwind CSS v4 `@theme inline` variables. DO NOT hallucinate or import a `<ThemeProvider>` or pass `theme="..."` props to components.  
> Theming is activated via the `data-color-theme` attribute on the root `<html>` element.

To apply an Ethereal UI theme preset:
1. Download via CLI (`npx @etherealui/cli theme add <theme-name>`) or fetch from `https://ethereal-ui.saefulrohman.dev/themes/<theme-name>.css`.
2. Add `data-color-theme="custom"` (or the theme name) to the root `<html>` element.
3. Paste the `:root` and `.dark` variables into your `globals.css` or link the CSS file in `<head>`.

```html
<!-- Example in index.html or root layout -->
<html lang="en" class="dark" data-color-theme="custom">
  <head>
    <link rel="stylesheet" href="/themes/cyberpunk.css" />
  </head>
  <body class="bg-background text-foreground antialiased min-h-screen">
    <!-- Application Content -->
  </body>
</html>
```

### Runtime Theme Switching in React
To switch themes dynamically at runtime without re-rendering the component tree:

```tsx
export function switchTheme(themeName: string) {
  // 1. Activate dynamic OKLCH mapping engine
  document.documentElement.setAttribute("data-color-theme", themeName)

  if (themeName === "default") {
    const activeLink = document.getElementById("ethereal-theme-css")
    if (activeLink) activeLink.remove()
    return
  }

  // 2. Inject or switch active CSS stylesheet
  let link = document.getElementById("ethereal-theme-css") as HTMLLinkElement | null
  if (!link) {
    link = document.createElement("link")
    link.id = "ethereal-theme-css"
    link.rel = "stylesheet"
    document.head.appendChild(link)
  }
  link.href = `/themes/${themeName}.css`
}
```

---

## 4. Component Catalog & Import Reference

Import any of the 44 primitives, 6 charts, and 17 enterprise blocks directly from `@etherealui/react`:

```tsx
import {
  // 1. Actions & Triggers
  Button,
  ButtonGroup,
  CloseButton,
  IconButton,

  // 2. Feedback, Indicators & Badges
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
  Chip,
  Announcement,
  Progress,
  Skeleton,
  EmptyState,
  Toast,

  // 3. Form & Inputs
  Input,
  NumberInput,
  OtpInput,
  Textarea,
  Switch,
  Checkbox,
  RadioGroup,
  Slider,
  Select,
  Combobox,
  DatePicker,
  DateCalendar,
  ColorPicker,
  FileUpload,

  // 4. Navigation & Layout
  Tabs,
  Pagination,
  Stepper,
  Timeline,
  Breadcrumb,
  Divider,
  Sidebar,

  // 5. Overlays & Dialogs (Radix UI)
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  ConfirmationDialog,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Sheet, // Interoperable alias for Drawer
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Popover,
  Tooltip,
  Dropdown,
  ContextMenu,
  CommandPalette,

  // 6. Data Display & Grouping
  Table,
  DescriptionList,
  Avatar,
  Carousel,
  Accordion,

  // 7. Statistical SVG Charts
  AreaStatisticChart,
  BarStatisticChart,
  LineStatisticChart,
  DonutStatisticChart,
  RadialStatisticChart,
  HeatmapStatisticChart,

  // 8. Enterprise & Agentic Blocks
  NotificationCenter,
  StatCardBlock,
  MultiMetricGrid,
  SystemHealthBlock,
  TokenUsageTelemetryBlock,
  EnterpriseDataTable,
  AdvancedFilterBar,
  TransactionLedgerBlock,
  UserProfileFormBlock,
  TeamRbacTableBlock,
  SecurityPasswordFormBlock,
  BillingPlanCardBlock,
  PromptComposerBlock,
  AgentProgressStreamBlock,
  AiChatThreadBlock,
  ApprovalWorkflowBlock,
  KanbanBoardBlock,
  EventSchedulerBlock,
  OrgDirectoryBlock,

  // 9. Full Application Shell
  InteractiveDashboardShell,
  ExecutiveAnalyticsTemplate,
  ControlTowerTemplate,
  WorkspaceSettingsTemplate
} from "@etherealui/react"
```

---

## 5. Architectural Code Recipes for AI Agents

### Recipe 1: Executive Analytics Dashboard (Charts + Metric Grid)
```tsx
import React, { useState } from "react"
import {
  MultiMetricGrid,
  AreaStatisticChart,
  BarStatisticChart,
  Card,
  Button
} from "@etherealui/react"

export function AnalyticsView() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("30d")

  return (
    <div className="space-y-6">
      {/* 4-KPI Metric Grid with sparkline indicators */}
      <MultiMetricGrid
        metrics={[
          { title: "Monthly Recurring Revenue", value: "$124,590", change: "+14.2%", isPositive: true },
          { title: "Active API Consumers", value: "8,924", change: "+5.8%", isPositive: true },
          { title: "Average Latency", value: "42ms", change: "-12.4%", isPositive: true },
          { title: "Error Rate (5xx)", value: "0.012%", change: "+0.002%", isPositive: false },
        ]}
      />

      {/* SVG Telemetry Chart automatically bound to var(--primary) and var(--chart-2) */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="text-base font-bold text-card-foreground">Throughput Telemetry</h3>
            <p className="text-xs text-muted-foreground">Real-time requests and edge worker distribution</p>
          </div>
          <div className="flex gap-1.5">
            <Button
              size="sm"
              variant={timeRange === "7d" ? "primary" : "outline"}
              onClick={() => setTimeRange("7d")}
            >
              7 Days
            </Button>
            <Button
              size="sm"
              variant={timeRange === "30d" ? "primary" : "outline"}
              onClick={() => setTimeRange("30d")}
            >
              30 Days
            </Button>
          </div>
        </div>

        <AreaStatisticChart
          data={[
            { label: "Mon", value: 4500, secondary: 2100 },
            { label: "Tue", value: 5200, secondary: 2600 },
            { label: "Wed", value: 6100, secondary: 3100 },
            { label: "Thu", value: 5800, secondary: 2900 },
            { label: "Fri", value: 7400, secondary: 3800 },
            { label: "Sat", value: 8900, secondary: 4500 },
            { label: "Sun", value: 9200, secondary: 4900 },
          ]}
        />
      </div>
    </div>
  )
}
```

---

### Recipe 2: AI Agent Control Room (Progress Stream + Token Telemetry + Prompt Composer)
```tsx
import React from "react"
import {
  AgentProgressStreamBlock,
  TokenUsageTelemetryBlock,
  PromptComposerBlock
} from "@etherealui/react"

export function AgentWorkflowConsole() {
  const handlePromptSubmit = (prompt: string, model: string) => {
    console.log("Dispatching agent job:", { prompt, model })
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 2-Column: Live Agent Progress Stream & Prompt Composer */}
      <div className="space-y-6 lg:col-span-2">
        <AgentProgressStreamBlock
          agentName="Code Review Agent v2"
          taskStatus="processing"
          steps={[
            { id: "1", title: "Cloning target repository", status: "completed", timestamp: "02:14:01" },
            { id: "2", title: "AST Parsing & Type Resolution", status: "completed", timestamp: "02:14:15" },
            { id: "3", title: "Auditing Tailwind v4 CSS variables", status: "active", timestamp: "02:14:32" },
            { id: "4", title: "Emitting automated refactor patch", status: "pending", timestamp: "Waiting" },
          ]}
        />

        <PromptComposerBlock
          defaultModel="gemini-2.5-pro"
          onSubmit={handlePromptSubmit}
        />
      </div>

      {/* 1-Column: Live Token Telemetry & Budget Quota */}
      <div className="space-y-6">
        <TokenUsageTelemetryBlock
          dailyUsed={412890}
          dailyQuota={1000000}
          costEst="$4.12"
          breakdown={[
            { model: "gemini-2.5-pro", tokens: 284100, cost: "$2.84" },
            { model: "claude-3-7-sonnet", tokens: 128790, cost: "$1.28" },
          ]}
        />
      </div>
    </div>
  )
}
```

---

### Recipe 3: Enterprise Data Table with Filter Bar & Slide-Over Drawer
```tsx
import React, { useState } from "react"
import {
  AdvancedFilterBar,
  EnterpriseDataTable,
  Drawer,
  Badge,
  Button
} from "@etherealui/react"

export function CustomerManagementPage() {
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleRowClick = (record: any) => {
    setSelectedRecord(record)
    setIsDrawerOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Search, Filter Pills & List/Grid Mode Switcher */}
      <AdvancedFilterBar
        onSearchChange={(query) => console.log("Search:", query)}
        onFilterChange={(filter) => console.log("Filter:", filter)}
      />

      {/* Enterprise Data Table with Row Selection & Action Drawer */}
      <EnterpriseDataTable
        onRowSelect={handleRowClick}
      />

      {/* Slide-over Detail Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedRecord?.name || "Record Details"}
      >
        {selectedRecord && (
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Account Status</span>
              <Badge variant="primary">{selectedRecord.status || "Active"}</Badge>
            </div>
            <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs">
              <p className="font-semibold text-foreground">Plan Allocation</p>
              <p className="text-muted-foreground">Enterprise Tier &bull; Unlimited seats</p>
            </div>
            <Button className="w-full" variant="primary" onClick={() => setIsDrawerOpen(false)}>
              Close Drawer
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  )
}
```

---

### Recipe 4: Overlays — Confirmation Dialogs (AlertDialog), Side Modals (Drawer/Sheet) & Dialogs
Ethereal UI provides three distinct, accessible overlay primitives:
- `AlertDialog`: Confirmation dialog that interrupts the user before destructive actions (requires explicit Cancel or Confirm).
- `Drawer` (or `Sheet`): Edge-anchored side modal (`side="right" | "left" | "top" | "bottom"`) with standard widths (`sm`, `default`, `lg`, `xl`, `full`).
- `Modal` / `Dialog`: Center-anchored or top-anchored dialog with configurable size (`sm`, `default`, `lg`, `xl`, `full`) and position (`center`, `top`).

```tsx
import React, { useState } from "react"
import {
  Button,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Input
} from "@etherealui/react"

export function OverlaysOverview() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 1. Side Modal (Drawer / Sheet) */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Side Drawer</Button>
        </DrawerTrigger>
        <DrawerContent side="right" size="lg">
          <DrawerHeader>
            <DrawerTitle>Configure Agent Parameters</DrawerTitle>
            <DrawerDescription>
              Adjust hyper-parameters, context temperature, and execution limits.
            </DrawerDescription>
          </DrawerHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground">Temperature</label>
              <Input type="number" defaultValue="0.7" className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground">System Prompt</label>
              <Input defaultValue="You are an expert autonomous coder." className="mt-1" />
            </div>
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setDrawerOpen(false)}>Save Changes</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* 2. Center/Top Modal with custom size */}
      <Button variant="outline" onClick={() => setModalOpen(true)}>
        Open Center Modal
      </Button>

      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalContent size="default" position="center">
          <ModalHeader>
            <ModalTitle>Edit Settings</ModalTitle>
            <ModalDescription>
              Update your workspace profile preferences.
            </ModalDescription>
          </ModalHeader>
          <div className="py-2 text-xs text-muted-foreground">
            Configure default notification feeds and dark-mode tokens.
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 3. Confirmation Dialog (AlertDialog) for critical/destructive actions */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Deployment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently destroy worker cluster pod-09 and erase cached telemetry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={() => console.log("Deleted!")}>
              Yes, Delete Deployment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
```

---

### Recipe 5: Inline Alerts & Dashboard Notification Center
Use `Alert` for context-sensitive inline banner messages and `NotificationCenter` for the global dashboard notification popover.

```tsx
import React, { useState } from "react"
import {
  Alert,
  AlertTitle,
  AlertDescription,
  NotificationCenter,
  type NotificationItem
} from "@etherealui/react"
import { AlertCircle, ShieldCheck } from "lucide-react"

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Deployment Successful",
    description: "Production build v0.0.9 passed health checks.",
    timestamp: "2m ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Rate Limit Approaching",
    description: "API consumer token usage reached 85% of tier quota.",
    timestamp: "18m ago",
    read: false,
    type: "warning",
  },
]

export function DashboardHeaderBar() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  return (
    <div className="space-y-4">
      {/* Inline Callout Alert */}
      <Alert variant="warning" dismissible>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Scheduled Maintenance Window</AlertTitle>
        <AlertDescription>
          Database indexing will occur tonight at 02:00 UTC. Expect slight read latency.
        </AlertDescription>
      </Alert>

      {/* Header bar with Notification Bell Popover */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold text-foreground">Control Tower</span>
        </div>

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
  )
}
```

---

## 6. AI Agent Rules & Enforcement Checklist

When writing code that uses Ethereal UI, you **MUST** review your code against this checklist before finishing:

### 1. Token Safety & Contrast
- [ ] Did you use `text-primary-foreground` on any element with `bg-primary`?
- [ ] Did you avoid hardcoding `text-white` or `text-zinc-900` on interactive components?
- [ ] Are badges and pill tags using `bg-muted text-muted-foreground` or `bg-primary text-primary-foreground`?
- [ ] Are borders using `border-border` or `border-white/10` rather than arbitrary hex borders?

### 2. Styling & Layout
- [ ] Is dark mode supported natively via semantic classes (`bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`)?
- [ ] Are cards styled with `rounded-2xl border border-border bg-card p-6 shadow-sm`?
- [ ] Is layout responsive across mobile (`< sm`), tablet (`sm` to `lg`), and desktop (`lg+`)?

### 3. Component Reuse
- [ ] Did you check if an existing Ethereal UI block covers the requirement (`InteractiveDashboardShell`, `KanbanBoardBlock`, `PromptComposerBlock`, etc.) before building from scratch?
- [ ] Are icons sourced consistently from `lucide-react`?
- [ ] Are dialogs, modals, and drawers properly controlled via open/close state?

---

*Authored by Ethereal UI Team &bull; Published for AI Agent Systems*
