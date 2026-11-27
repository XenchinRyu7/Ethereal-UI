export interface BlogPost {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  author: string
  role: string
  authorAvatar: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "road-to-v1-roadmap",
    title: "The Road to Ethereal UI v1.0.0: Vision, Architecture, and What's Coming",
    date: "November 27, 2026",
    tag: "Roadmap",
    author: "Saeful Rohman",
    role: "Creator of Ethereal UI",
    authorAvatar: "SR",
    excerpt:
      "A comprehensive look at what's landing in Ethereal UI v1.0.0: 45+ accessible primitives, enterprise authentication blocks, OKLCH theme architecture, and CLI workflows.",
    content: `
## Setting the New Standard for Modern UI Engineering

As we gear up for the official release of **Ethereal UI v1.0.0**, our mission remains crystal clear: to give engineers and design teams the most modern, accessible, and high-density component system available—built from the ground up for **Tailwind CSS v4** and **Radix UI Primitives**.

In earlier versions (0.0.x), we focused on laying the core foundation—validating our zero-runtime semantic token architecture, perfecting server-side rendering in Astro, and creating initial showcase templates.

Now, as we approach **v1.0.0**, we are bridging every missing gap between atomic primitives and full-scale enterprise application blocks.

---

### 1. Complete Primitive Parity & Deep Form Polish

We conducted an exhaustive audit across the modern UI ecosystem (including shadcn/ui, Mantine, Ant Design, and Radix) to eliminate gaps before reaching v1.0.0. This release cycle delivers:

- **Enterprise Input Primitives**: \`PasswordInput\` (with integrated visibility toggling and password strength scoring), \`TagInput\` (interactive chip management with keyboard navigation), and \`FormField\` (standardized labels, required indicators, descriptions, and error states).
- **Modern Interactive Controls**: \`SegmentedControl\` with animated sliding pill indicators, \`Collapsible\` for smooth single-panel disclosure, and \`HoverCard\` with delayed hover previews.
- **Revamped Color Picker**: Moving far beyond simple static palettes, \`ColorPicker\` now features **Semantic Theme Rules** (\`Primary\`, \`Secondary\`, \`Accent\`, \`Success\`, \`Warning\`, \`Destructive\`), native spectrum picker trigger, manual Hex input, and native browser **EyeDropper API** integration.
- **Unified Layout Primitives**: \`Card\` compound components, \`Kbd\`, \`Rating\`, \`Spinner\`, \`AspectRatio\`, and \`CopyButton\`.

---

### 2. High-Density Enterprise & Agentic Blocks

Modern applications are no longer just static forms. With AI copilots, complex fintech workflows, and high-density dashboards taking center stage, Ethereal UI provides production-ready blocks:

- **Authentication & Security**: The newly added \`LoginFormBlock\` delivers enterprise Google & GitHub OAuth sign-in, email validation, password visibility toggle, remember-me options, and simulated loading states.
- **Dual-Control Workflows**: The \`ApprovalWorkflowBlock\` powers Maker-Checker verification for high-value banking transfers, HRMS requests, and privileged access.
- **FinTech Treasury Ledgers**: \`TransactionLedgerBlock\` handles multi-currency Nostro accounts (USD, EUR, IDR), SWIFT/BI-FAST settlements, and outbound wire modals.
- **AI Copilot & Prompt Engineering**: Dedicated blocks for multi-modal prompt composing (\`PromptComposerBlock\`), real-time agent reasoning traces (\`AgentProgressBlock\`), and context token meters (\`TokenUsageBlock\`).
- **Interactive Telemetry Drawers**: Our enhanced \`Drawer\` and \`DrawerBody\` now support live bidirectional data editing directly from inside slide-over sheets.

---

### 3. Architecture: Tailwind CSS v4 & OKLCH Color Engine

Ethereal UI v1.0.0 is built exclusively on **Tailwind CSS v4**'s \`@theme\` paradigm:

- **OKLCH Palette Precision**: Perceptually uniform color curves that preserve perceived brightness across different hues and mode switches.
- **Zero-FOUC Dark Mode**: Inline theme bootstrapping prevents white flashes during server-rendered page loads.
- **Theme Marketplace**: Instant community theme loading via CSS custom properties with zero runtime JavaScript overhead.

---

### 4. Developer Experience & CLI Scaffolding

With v1.0.0, developers can choose between:

1. **Copy-and-Paste Registry**:
   \`\`\`bash
   npx @etherealui/cli@latest add login-form color-picker drawer
   \`\`\`
2. **Pre-bundled NPM Package**:
   \`\`\`bash
   pnpm add @etherealui/react
   \`\`\`

Both distribution channels are backed by automated schema generation, complete TypeScript typings, and strict zero-error lint policies.

---

### 5. What's Next on the Roadmap to v1.0.0 GA

Before locking the v1.0.0 tag, our final milestones include:
- **Comprehensive Docs Polish**: Updating all component interactive code tabs, props tables, and installation copy commands.
- **Framework Adapters**: Continued verification with Next.js App Router, Remix, Vite, and Astro.
- **Full Showcase Gallery**: Live interactive templates demonstrating end-to-end applications built exclusively with Ethereal UI.

Stay tuned as we roll out the release candidate tags. Thank you for building with Ethereal UI!
`,
  },
  {
    slug: "introducing-ethereal-ui-v1",
    title: "Introducing Ethereal UI: 37+ Components & 10 Free Dashboard Blocks",
    date: "November 6, 2026",
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
