# Ethereal UI (`@ethereal/ui`)

> **Free, Open-Source, Modern, Dark-First Enterprise Dashboard Blocks & Component System**  
> Built with **Astro v5**, **React 19**, **Tailwind CSS v4**, **Radix UI Primitives**, **TypeScript**, and **CVA**.

---

## ✨ Core Highlights

- **100% Free Enterprise Blocks**: Every dashboard layout shell, KPI sparkline card, server-side ready data table with slide-over drawer, filter bar, and RBAC governance view is completely free and MIT-licensed.
- **BoardUI & shadcn/ui Experience**: Interactive live playground with responsive viewport resizers (`Desktop`, `Tablet`, `Mobile`), one-click CLI command & TSX code copy, and static JSON Registry endpoints (`/registry/[slug].json`).
- **Tailwind CSS v4 Native**: Zero legacy `tailwind.config.js` overhead—powered by native `@import "tailwindcss";` and `@theme` CSS variable tokens.
- **Headless Accessibility**: Interactive overlays (Dialogs, Drawers, Comboboxes, Dropdowns, Switches, Tooltips) built on Radix UI Primitives.

---

## 📂 Monorepo Structure

```text
ethereal-ui/
├── .github/workflows/          # CI/CD workflows (Vercel Docs & NPM Release)
├── apps/
│   └── docs/                   # Astro v5 Documentation & Live Registry App
├── packages/
│   └── ui/                     # @ethereal/ui React 19 Primitives, Blocks & Templates
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## 🚀 Quick Start

```bash
# Install dependencies across all workspaces
pnpm install

# Build @ethereal/ui and apps/docs via Turborepo
pnpm build

# Start development servers concurrently
pnpm dev
```

