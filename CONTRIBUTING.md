# Contributing to Ethereal UI

Thank you for your interest in contributing to **Ethereal UI (`@etherealui/react`)**! We are building a 100% free, open-source, modern enterprise component system and dashboard block library for React 19 and Tailwind CSS v4.

This guide covers everything you need to set up the monorepo locally, follow our engineering standards, and submit pull requests.

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: `v20.11+` or `v22+` (LTS recommended)
- **pnpm**: `v10.22.0` (managed via `corepack enable`)
- **Git**: `v2.40+`

---

## 🚀 Local Monorepo Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/XenchinRyu7/Ethereal-UI.git
   cd Ethereal-UI
   ```

2. **Install dependencies across all workspaces**:
   ```bash
   pnpm install
   ```

3. **Build the `@etherealui/react` package and documentation site**:
   ```bash
   pnpm build
   ```

4. **Start the development servers**:
   ```bash
   pnpm dev
   ```
   - `apps/docs` runs at `http://localhost:4321` with instant Vite HMR connected directly to `packages/ui/src`.

---

## 📂 Monorepo Architecture

```text
ethereal-ui/
├── .changeset/                 # Changesets configuration & release notes
├── .github/workflows/          # GitHub Actions CI/CD & NPM Release pipelines
├── .husky/                     # Git hooks (pre-commit lint & full build verification)
├── apps/
│   └── docs/                   # Astro v5 Documentation, Interactive Playground & JSON Registry
└── packages/
    └── ui/                     # @etherealui/react (Primitives, Charts, Blocks & Templates)
```

---

## 🎨 Component & Design Standards

Every component or block contributed to `@etherealui/react` must adhere to our core design rules:

1. **Seamless Light & Dark Mode**:
   - Never hardcode light-only or dark-only surfaces. Always pair light tokens with explicit `dark:` semantic variants (e.g., `bg-white border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100`).
2. **Tailwind CSS v4 Native**:
   - Do not introduce legacy `tailwind.config.js` files. Define theme tokens using CSS custom properties and `@theme` inside `packages/ui/src/styles/globals.css`.
3. **Accessibility First (WAI-ARIA)**:
   - Interactive overlays (`Modal`, `Drawer`, `DropdownMenu`, `Popover`, `Select`, `Switch`, `Tabs`, `Tooltip`) must use Radix UI Primitives with full keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`, Arrow keys) and visible focus rings (`focus-visible:ring-2`).
4. **Strict TypeScript**:
   - Zero `any` types. Export clean, documented prop interfaces (`ComponentProps`) and forward refs where appropriate.

---

## 📏 Commit Message Convention

We strictly follow **Conventional Commits** for clean release history and automated changelog generation:

```text
<type>(<scope>): <concise summary in imperative mood>
```

### Allowed Types:
- `feat(<scope>)`: New component, chart, enterprise block, or feature (e.g., `feat(avatar): implement Avatar and AvatarGroup primitive`)
- `fix(<scope>)`: Bug fix, accessibility fix, or dark-mode contrast fix (e.g., `fix(charts): pass complete BoardUIDocPage props`)
- `docs(<scope>)`: Documentation, MDX guides, or README updates (e.g., `docs(readme): update quickstart examples`)
- `style(<scope>)`: Styling, spacing, or visual refinements without breaking API changes
- `refactor(<scope>)`: Internal code restructuring
- `chore(<scope>)`: Build scripts, CI/CD workflows, dependencies, or release configurations

---

## ✅ Linting, Typechecking & Pre-Commit Checks

Before committing or opening a Pull Request, verify that your changes pass all static analysis and full production builds:

```bash
# Run ESLint + TypeScript typecheck across all workspaces
pnpm lint

# Run full production build (tsup bundle + 66 Astro static routes)
pnpm build
```

> **Note**: Our Husky pre-commit hook (`.husky/pre-commit`) automatically executes `pnpm lint && pnpm build` before every commit to guarantee zero broken types or SSR rendering errors.

---

## 🔄 Pull Request Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-component-name
   ```
2. Implement your component or fix in `packages/ui/src/` and register its live preview in `apps/docs/src/data/registry-catalog.ts`.
3. If your PR modifies `@etherealui/react`, generate a changeset entry:
   ```bash
   pnpm changeset
   ```
4. Commit your changes atomically using Conventional Commits.
5. Push your branch and open a Pull Request against `main`.

---

## 📜 License

By contributing to Ethereal UI, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

