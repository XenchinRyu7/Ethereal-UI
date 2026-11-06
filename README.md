<div align="center">
  <img src="./apps/docs/public/favicon.svg" alt="Ethereal UI Logo" width="64" height="64" />

  # Ethereal UI (`@etherealui/react`)

  **Free, Open-Source, Modern Enterprise Dashboard Blocks & Component System for React**

  [![NPM Version](https://img.shields.io/npm/v/@etherealui/react?style=flat-square&logo=npm&color=2563eb&label=%40etherealui%2Freact)](https://www.npmjs.com/package/@etherealui/react)
  [![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](./LICENSE)
  [![Astro Docs](https://img.shields.io/badge/Docs-Astro%20v5-ff5d01?style=flat-square&logo=astro&logoColor=white)](https://ui.saefulrohman.dev)
  [![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![Build Status](https://img.shields.io/github/actions/workflow/status/XenchinRyu7/Ethereal-UI/release.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=Build%20%26%20Release)](https://github.com/XenchinRyu7/Ethereal-UI/actions)

  <p align="center">
    <a href="https://ui.saefulrohman.dev"><strong>Explore Documentation</strong></a> ·
    <a href="https://ui.saefulrohman.dev/components/avatar"><strong>37+ Primitives</strong></a> ·
    <a href="https://ui.saefulrohman.dev/charts/area-chart"><strong>Statistical Charts</strong></a> ·
    <a href="https://ui.saefulrohman.dev/blocks/sidebar"><strong>Enterprise Blocks</strong></a> ·
    <a href="https://ui.saefulrohman.dev/templates/executive-analytics"><strong>SaaS Templates</strong></a>
  </p>
</div>

---

## ✨ Vision & Differentiator

Most modern UI ecosystems lock their most valuable **Application Shells**, **Multi-Metric Analytics Grids**, **Data Tables with Slide-Over Drawers**, and **RBAC Settings Views** behind $299+ commercial paywalls.

**Ethereal UI (`@etherealui/react`)** is built to democratize enterprise interface engineering:

- **100% Free & Open-Source Enterprise Blocks**: Every primitive, statistical SVG chart, complex data table, filter bar, and full-page SaaS template is completely free under the [MIT License](./LICENSE).
- **Dark-First Aesthetics with Seamless Light/Dark Parity**: Engineered with high-contrast Zinc surfaces (`#09090b`), crisp `1px` structural borders, and semantic CSS variables that adapt effortlessly between Light Mode and Dark Mode.
- **Tailwind CSS v4 Native**: Zero legacy `tailwind.config.js` overhead—powered by `@import "tailwindcss";` and native `@theme` tokens.
- **Headless WAI-ARIA Accessibility**: Built on top of **Radix UI Primitives** and **Class Variance Authority (CVA)** with full keyboard navigation and strict TypeScript types.
- **Dual Consumption Workflow**: Install `@etherealui/react` directly from NPM **or** copy source code into your project via our `shadcn`-compatible JSON Registry (`/registry/[slug].json`).

---

## 📦 Installation

Install `@etherealui/react` and its peer utilities using your preferred package manager:

```bash
# Using pnpm (recommended)
pnpm add @etherealui/react lucide-react clsx tailwind-merge class-variance-authority

# Using npm
npm install @etherealui/react lucide-react clsx tailwind-merge class-variance-authority

# Using yarn
yarn add @etherealui/react lucide-react clsx tailwind-merge class-variance-authority
```

Import the Ethereal UI stylesheet in your application's root CSS or entry file:

```css
@import "tailwindcss";
@import "@etherealui/react/styles.css";
```

---

## 🚀 Quickstart Usage

Compose accessible primitives and production-ready enterprise dashboard blocks in seconds:

```tsx
import {
  AppShell,
  Avatar,
  Button,
  StatCard,
  PageHeaderBar,
} from "@etherealui/react"

export default function ExecutiveDashboard() {
  return (
    <AppShell
      workspaceName="Acme Corp"
      planBadge="Enterprise"
      breadcrumbs={["Workspace", "Analytics", "Overview"]}
      user={{
        name: "Saeful Rohman",
        email: "saefulrohmandevelopers@gmail.com",
        initials: "SR",
      }}
    >
      <PageHeaderBar
        title="Revenue & Telemetry Overview"
        subtitle="Real-time financial metrics, active seats, and API throughput across regions."
        badge="Live Sync"
        actions={
          <div className="flex items-center gap-2.5">
            <Avatar initials="SR" size="sm" tint="blue" status="online" />
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button variant="primary" size="sm">Create Report</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Net Revenue (MRR)"
          value="$128,430"
          change="+18.4%"
          trend="up"
          accent="blue"
          sparkline={[32, 40, 38, 52, 61, 58, 74, 89]}
        />
        <StatCard
          title="Active Enterprise Seats"
          value="14,892"
          change="+11.2%"
          trend="up"
          accent="emerald"
          sparkline={[20, 24, 28, 35, 42, 49, 55, 64]}
        />
        <StatCard
          title="P99 Edge Latency"
          value="18.4ms"
          change="-4.1%"
          trend="up"
          accent="indigo"
          sparkline={[44, 41, 39, 35, 31, 28, 22, 18]}
        />
      </div>
    </AppShell>
  )
}
```

---

## 🧩 What's Inside `@etherealui/react`

| Category | Count | Included Components & Blocks |
| :--- | :---: | :--- |
| **Base Primitives** | **37** | `Accordion`, `Announcement`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `ButtonGroup`, `Carousel`, `Checkbox`, `Chip`, `CloseButton`, `ColorPicker`, `Combobox`, `CommandPalette`, `ContextMenuBox`, `DateCalendar`, `DateRangePicker`, `Dialog`, `Divider`, `Drawer`, `DropdownMenu`, `FileDropzone`, `IconButton`, `Input`, `Modal`, `Pagination`, `Popover`, `Progress`, `RadioGroup`, `Select`, `Skeleton`, `Slider`, `Switch`, `Table`, `Tabs`, `Textarea`, `ToastCard`, `Tooltip` |
| **Statistical Charts** | **6** | `AreaStatisticChart`, `BarStatisticChart`, `LineStatisticChart`, `DonutStatisticChart`, `RadialStatisticChart`, `HeatmapStatisticChart` |
| **Enterprise Blocks** | **10** | `AppShell`, `SidebarShell`, `HeaderNavbar`, `PageHeaderBar`, `StatCard` (`StatMetricCard`), `ProgressMetricCard`, `MultiMetricGrid`, `EnterpriseDataTable`, `AdvancedFilterBar`, `UserProfileFormBlock`, `TeamRbacTableBlock`, `SecurityPasswordFormBlock`, `BillingPlanCardBlock` |
| **SaaS Templates** | **3** | `ExecutiveAnalyticsTemplate`, `ControlTowerTemplate`, `WorkspaceSettingsTemplate` |

---

## 🏗️ Monorepo Structure

Ethereal UI is organized as a high-performance **pnpm + Turborepo** monorepo:

```text
ethereal-ui/
├── .changeset/                 # Changesets versioning & automated release notes
├── .github/workflows/          # GitHub Actions CI/CD (release.yml & deploy-docs.yml)
├── .husky/                     # Pre-commit quality gate (ESLint + tsc + Astro build)
├── apps/
│   └── docs/                   # Astro v5 Documentation & Playground (hosted at ui.saefulrohman.dev)
├── packages/
│   └── ui/                     # @etherealui/react source, Tailwind v4 tokens & tsup bundler
├── CONTRIBUTING.md             # Contributor setup, coding standards & PR workflow
├── LICENSE                     # MIT License (Copyright © 2026 Saeful Rohman)
├── SECURITY.md                 # Private vulnerability disclosure policy
└── SUPPORT.md                  # Community support & bug reporting guide
```

### Local Development Commands

```bash
# Install dependencies across all workspaces
pnpm install

# Start documentation & component development servers with instant HMR
pnpm dev

# Run ESLint & strict TypeScript typechecking across workspaces
pnpm lint

# Build @etherealui/react (CJS, ESM, DTS) and 66 static documentation routes
pnpm build
```

---

## 🔗 Links & Resources

- **Official Documentation & Playground**: [https://ui.saefulrohman.dev](https://ui.saefulrohman.dev)
- **NPM Package Registry**: [https://www.npmjs.com/package/@etherealui/react](https://www.npmjs.com/package/@etherealui/react)
- **Author's Personal Website**: [https://saefulrohman.dev](https://saefulrohman.dev)
- **Contributing Guide**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Support & Bug Reports**: [SUPPORT.md](./SUPPORT.md)
- **Security Policy**: [SECURITY.md](./SECURITY.md)

---

## 📄 License

Licensed under the **[MIT License](./LICENSE)** · Copyright © 2026 **[Saeful Rohman](https://saefulrohman.dev)**.
