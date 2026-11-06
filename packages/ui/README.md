# Ethereal UI (`@etherealui/react`)

**Free, Open-Source, Modern Enterprise Dashboard Blocks & Component System for React**

[![NPM Version](https://img.shields.io/npm/v/@etherealui/react?style=flat-square&logo=npm&color=2563eb&label=%40etherealui%2Freact)](https://www.npmjs.com/package/@etherealui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-10b981.svg?style=flat-square)](https://github.com/XenchinRyu7/Ethereal-UI/blob/main/LICENSE)
[![Astro Docs](https://img.shields.io/badge/Docs-ethereal-ui.saefulrohman.dev-ff5d01?style=flat-square&logo=astro&logoColor=white)](https://ethereal-ui.saefulrohman.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 📦 Installation

```bash
pnpm add @etherealui/react lucide-react clsx tailwind-merge class-variance-authority
```

Import the stylesheet in your root CSS file:

```css
@import "tailwindcss";
@import "@etherealui/react/styles.css";
```

---

## 🚀 Quickstart

```tsx
import { AppShell, Avatar, Button, StatCard, PageHeaderBar } from "@etherealui/react"

export default function Dashboard() {
  return (
    <AppShell workspaceName="Acme Corp" planBadge="Enterprise">
      <PageHeaderBar
        title="Revenue & Telemetry Overview"
        subtitle="Real-time financial metrics and API throughput."
        badge="Live Sync"
        actions={
          <div className="flex items-center gap-2">
            <Avatar initials="SR" size="sm" tint="blue" status="online" />
            <Button variant="primary" size="sm">Create Report</Button>
          </div>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Net Revenue (MRR)" value="$128,430" change="+18.4%" trend="up" accent="blue" />
        <StatCard title="Active Enterprise Seats" value="14,892" change="+11.2%" trend="up" accent="emerald" />
        <StatCard title="P99 Edge Latency" value="18.4ms" change="-4.1%" trend="up" accent="indigo" />
      </div>
    </AppShell>
  )
}
```

---

## 🔗 Links

- **Official Documentation**: [https://ethereal-ui.saefulrohman.dev](https://ethereal-ui.saefulrohman.dev)
- **GitHub Repository**: [https://github.com/XenchinRyu7/Ethereal-UI](https://github.com/XenchinRyu7/Ethereal-UI)
- **Author**: [Saeful Rohman (`saefulrohman.dev`)](https://saefulrohman.dev)

