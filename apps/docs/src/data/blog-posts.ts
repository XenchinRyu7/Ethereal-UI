export interface BlogPost {
  slug: string
  title: string
  date: string
  readTime: string
  tag: string
  excerpt: string
  author: string
  role: string
  authorAvatar: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "announcing-v0-0-6-cli-parity",
    title: "Announcing Ethereal UI v0.0.6: CLI Parity, 870+ Theme Generator & Modern Navbars",
    date: "November 15, 2026",
    readTime: "3 min read",
    tag: "Release",
    author: "Saeful Rohman",
    role: "Creator of Ethereal UI",
    authorAvatar: "SR",
    excerpt:
      "Version 0.0.6 brings automated CLI installations with npx @etherealui/cli@latest, responsive theme switching across 870+ themes, and a clutter-free navbar architecture.",
    content: `
## What's New in v0.0.6

We are thrilled to roll out **Ethereal UI v0.0.6**! This release focuses on developer experience, CLI precision, and eliminating UI redundancy across our documentation and application shells.

### 1. Direct CLI Parity & Instant Component Installation
Every primitive, statistical chart, and enterprise block can now be installed directly into your Next.js, Vite, or Astro projects with a single command:

\`\`\`bash
npx @etherealui/cli@latest add button
npx @etherealui/cli@latest add data-table
npx @etherealui/cli@latest add executive-analytics
\`\`\`

The CLI automatically parses your local Tailwind config, installs dependencies (like Radix UI primitives and Lucide icons), and places clean, zero-runtime TypeScript code into your \`components/ui/\` folder.

### 2. Streamlined Navigation: Docs, Showcase & Blog
Based on developer feedback, we removed redundant top navbar links that duplicated the sidebar. Both our landing page and documentation now focus strictly on:
- **Docs**: Comprehensive API references, copy-paste guides, and theme tokens.
- **Showcase**: Open-source SaaS & enterprise application templates (HRIS, Warehouse, Analytics, CRM).
- **Blog**: Engineering deep dives and architecture release logs.

### 3. Unified Copy Experience
No more unexpected blank pages when trying to copy component code. Our new interactive dropdown gives you three immediate actions:
- **Copy Code**: Copies the full React TSX component preview directly to your clipboard.
- **Copy CLI Command**: Prepares the exact \`npx\` installation command.
- **View Registry JSON**: Opens the verified registry manifest schema in a new tab.

### 4. 870+ Themes with Instant Mode Switching
The top navigation now hosts our single canonical \`ThemeToggle\` component. On desktop, tablet, and mobile screens, developers can switch between curated palettes—including **MX-Brutalist**, **Claude+**, **Nord**, **Vesper**, **Catppuccin Mocha**, and **Rose Pine**—with zero layout shift and automatic dark mode persistence.
`,
  },
  {
    slug: "introducing-ethereal-ui-v1",
    title: "Introducing Ethereal UI: 37+ Components & 10 Free Dashboard Blocks",
    date: "November 6, 2026",
    readTime: "5 min read",
    tag: "Release",
    author: "Saeful Rohman",
    role: "Creator of Ethereal UI",
    authorAvatar: "SR",
    excerpt:
      "Why we built a 100% free, open-source component system and dashboard block registry inspired by BoardUI and shadcn/ui—with native Light & Dark mode support.",
    content: `
## Why We Built Ethereal UI

Modern web applications require more than just basic buttons and input fields. Engineering teams spend weeks re-implementing the same complex dashboard layouts: collapsible app shells, multi-metric KPI grids, slide-over telemetry drawers, and interactive statistical charts.

We created **Ethereal UI** to bridge the gap between simple atomic primitives and high-density, production-ready enterprise templates.

### Key Highlights
- **37+ Accessible Primitives**: Built on top of Radix UI and Tailwind CSS v4 for complete keyboard accessibility, screen-reader support, and zero lock-in.
- **10 Enterprise Dashboard Blocks**: Ready-to-use Header Navbars, Filter Bars, Data Tables with bulk selection, Kanban Boards, and RBAC Permission Tables.
- **3 Full-Page Application Templates**: Executive Analytics, Control Tower Customer Directory, and Workspace Settings.
- **100% Open Source & Free**: Copy and paste what you need, customize every token, and deploy without license restrictions.

### Architecture Philosophy: Code You Own
Just like shadcn/ui, Ethereal UI is **not** an opaque npm library that wraps your markup in black-box abstractions. When you run:

\`\`\`bash
npx @etherealui/cli add data-table
\`\`\`

The exact component source code is placed in your repository. You have 100% control over every Tailwind class, state handler, and animation.

### Getting Started

Install the CLI or grab components manually from our documentation:

\`\`\`bash
# Initialize your project
npx @etherealui/cli@latest init

# Add components
npx @etherealui/cli@latest add button avatar data-table
\`\`\`

Explore our interactive [Docs](/docs/introduction) and [Showcase](/templates) to see all components in action!
`,
  },
  {
    slug: "tailwind-v4-semantic-tokens",
    title: "Zero-Config Light & Dark Mode with Tailwind CSS v4 Semantic Tokens",
    date: "November 2, 2026",
    readTime: "4 min read",
    tag: "Architecture",
    author: "Saeful Rohman",
    role: "Creator of Ethereal UI",
    authorAvatar: "SR",
    excerpt:
      "How we replaced legacy tailwind.config.js files with native CSS variables and @custom-variant dark for instant, flicker-free theme switching.",
    content: `
## The Shift to Tailwind CSS v4

Tailwind CSS v4 introduces a revolutionary CSS-first configuration engine. Gone are the sprawling \`tailwind.config.js\` files, complex PostCSS plugins, and manual purge configs.

In Ethereal UI, all theming is powered by native CSS Custom Properties and Tailwind v4's \`@theme\` directive:

\`\`\`css
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
}
\`\`\`

### Solving the Dark Mode Flash (FOUC)
Flicker of unstyled content during server-side rendering or page transitions is one of the biggest pain points in modern web development.

Ethereal UI resolves this by injecting a blocking, zero-dependency inline script in the HTML \`<head>\`:

\`\`\`html
<script is:inline>
  (function() {
    const saved = localStorage.getItem("ethereal-theme") || "neutral";
    const dark = localStorage.getItem("ethereal-dark") === "true" ||
      (!("ethereal-dark" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", saved);
  })();
</script>
\`\`\`

Because this executes before the DOM renders, your users will never experience white flashes when browsing in dark mode.

### Semantic Tokens for Themes
By binding sidebar tokens (\`--sidebar\`, \`--sidebar-accent\`, \`--sidebar-foreground\`) separately from card and canvas backgrounds, themes like **MX-Brutalist** (with high-contrast dark green sidebars) render with perfect contrast without requiring manual per-component overrides.
`,
  },
  {
    slug: "accessible-data-tables-radix",
    title: "Designing High-Density SaaS Data Tables with Slide-Over Drawers",
    date: "October 26, 2026",
    readTime: "6 min read",
    tag: "Engineering",
    author: "Saeful Rohman",
    role: "Creator of Ethereal UI",
    authorAvatar: "SR",
    excerpt:
      "A deep dive into building accessible keyboard navigation, bulk row selection, and slide-over telemetry inspection drawers with Radix UI Primitives.",
    content: `
## High-Density Enterprise Data Tables

Data tables are the heartbeat of SaaS products. Whether monitoring MRR churn, server telemetry, or logistics inventory, users require rapid scanning, sorting, and drill-down capabilities.

In Ethereal UI, the **Enterprise Data Table** block combines:
1. **Sortable Columns** with animated chevron indicators.
2. **Bulk Selection & Checkbox State** with floating batch action bars.
3. **Multi-View Modes**: Instant switching between dense tabular view and a responsive card grid.
4. **Slide-Over Detail Drawer**: Clicking any customer or row smoothly opens an accessible Radix Dialog/Drawer without leaving the page.

### Dual-View Flexibility: Table vs. Grid

Different users digest data differently. Analysts prefer tabular density, while executive stakeholders favor scannable metric cards. 

With Ethereal UI's \`EnterpriseDataTable\`, switching views is as simple as toggling \`viewMode="table" | "grid"\`:

\`\`\`tsx
<AdvancedFilterBar
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  searchQuery={query}
  onSearchChange={setQuery}
/>

<EnterpriseDataTable
  viewMode={viewMode}
  searchQuery={query}
/>
\`\`\`

When switched to \`grid\`, each record renders with avatar initials, seat utilization progress meters, MRR statistics, and an explicit **Inspect** button that connects directly to the telemetry drawer.

### Keyboard Navigation & ARIA Compliance
Using Radix UI Primitives under the hood ensures full compliance with WAI-ARIA standards:
- Pressing \`Esc\` dismisses the slide-over drawer and restores focus to the triggering row.
- \`Tab\` and arrow keys cycle cleanly through actionable buttons without trapping focus.
- Screen readers announce the total selected count and filter state automatically.
`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
