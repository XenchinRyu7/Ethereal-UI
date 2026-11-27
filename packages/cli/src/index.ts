import fs from "node:fs/promises"
import path from "node:path"

interface RegistryFileItem {
  path: string
  target?: string
  type: string
  content: string
}

interface RegistryItemPayload {
  name: string
  title: string
  type: string
  description: string
  dependencies: string[]
  usage?: string
  files: RegistryFileItem[]
}

interface RegistryIndexPayload {
  name: string
  version: string
  totalItems: number
  items: Array<{
    name: string
    title: string
    category: string
    description: string
    dependencies: string[]
    endpoint: string
  }>
}

interface EtherealConfig {
  $schema: string
  registryUrl: string
  componentsDir: string
  utilsDir: string
}

const DEFAULT_REGISTRY_URL = "https://ethereal-ui.saefulrohman.dev/registry"
const THEMES_BASE_URL = "https://ethereal-ui.saefulrohman.dev/themes"
const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/XenchinRyu7/Ethereal-UI/main/packages/ui/src"

const SOURCE_FILE_MAP: Record<string, string> = {
  alert: "primitives/alert.tsx",
  "alert-dialog": "primitives/alert-dialog.tsx",
  accordion: "primitives/accordion.tsx",
  announcement: "primitives/announcement.tsx",
  "aspect-ratio": "primitives/aspect-ratio.tsx",
  avatar: "primitives/avatar.tsx",
  badge: "primitives/badge.tsx",
  breadcrumb: "primitives/breadcrumb.tsx",
  button: "primitives/button.tsx",
  "button-group": "primitives/button-group.tsx",
  card: "primitives/card.tsx",
  carousel: "primitives/carousel.tsx",
  checkbox: "primitives/checkbox.tsx",
  chip: "primitives/chip.tsx",
  "close-button": "primitives/close-button.tsx",
  "color-picker": "primitives/color-picker.tsx",
  combobox: "primitives/combobox.tsx",
  "command-palette": "primitives/command-palette.tsx",
  "context-menu": "primitives/context-menu.tsx",
  "copy-button": "primitives/copy-button.tsx",
  calendar: "primitives/calendar.tsx",
  "date-calendar": "primitives/date-calendar.tsx",
  "date-picker": "primitives/date-picker.tsx",
  divider: "primitives/divider.tsx",
  drawer: "primitives/drawer.tsx",
  dropdown: "primitives/dropdown-menu.tsx",
  "file-upload": "primitives/file-upload.tsx",
  "icon-button": "primitives/icon-button.tsx",
  input: "primitives/input.tsx",
  kbd: "primitives/kbd.tsx",
  modal: "primitives/modal.tsx",
  pagination: "primitives/pagination.tsx",
  popover: "primitives/popover.tsx",
  progress: "primitives/progress.tsx",
  "radio-group": "primitives/radio-group.tsx",
  rating: "primitives/rating.tsx",
  select: "primitives/select.tsx",
  sheet: "primitives/sheet.tsx",
  skeleton: "primitives/skeleton.tsx",
  slider: "primitives/slider.tsx",
  spinner: "primitives/spinner.tsx",
  switch: "primitives/switch.tsx",
  table: "primitives/table.tsx",
  tabs: "primitives/tabs.tsx",
  textarea: "primitives/textarea.tsx",
  toast: "primitives/toast.tsx",
  tooltip: "primitives/tooltip.tsx",
  timeline: "primitives/timeline.tsx",
  stepper: "primitives/stepper.tsx",
  "number-input": "primitives/number-input.tsx",
  "otp-input": "primitives/otp-input.tsx",
  "empty-state": "primitives/empty-state.tsx",
  "description-list": "primitives/description-list.tsx",
  "area-chart": "primitives/chart.tsx",
  "bar-chart": "primitives/chart.tsx",
  "line-chart": "primitives/chart.tsx",
  "donut-chart": "primitives/chart.tsx",
  "radial-chart": "primitives/chart.tsx",
  "heatmap-chart": "primitives/chart.tsx",
  sidebar: "blocks/app-shell.tsx",
  "header-navbar": "blocks/app-shell.tsx",
  "stat-card": "blocks/stat-cards.tsx",
  "metric-grid": "blocks/stat-cards.tsx",
  "data-table": "blocks/data-table.tsx",
  "filter-bar": "blocks/filter-bar.tsx",
  "profile-form": "blocks/settings-blocks.tsx",
  "team-members": "blocks/settings-blocks.tsx",
  "security-settings": "blocks/settings-blocks.tsx",
  "billing-card": "blocks/settings-blocks.tsx",
  "prompt-composer": "blocks/prompt-composer.tsx",
  "agent-progress": "blocks/agent-progress.tsx",
  "token-usage": "blocks/token-usage.tsx",
  "kanban-board": "blocks/kanban-board.tsx",
  "approval-workflow": "blocks/approval-workflow.tsx",
  "transaction-ledger": "blocks/transaction-ledger.tsx",
  "org-directory": "blocks/org-directory.tsx",
  "event-scheduler": "blocks/event-scheduler.tsx",
  "system-health": "blocks/system-health.tsx",
  "ai-chat-thread": "blocks/ai-chat-thread.tsx",
  "notification-center": "blocks/notification-center.tsx",
  "executive-analytics": "templates/executive-analytics.tsx",
  "control-tower": "templates/control-tower.tsx",
  "workspace-settings": "templates/workspace-settings.tsx",
}

const CN_HELPER_SOURCE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
}

function printBanner() {
  console.log(
    `\n${c.bold}${c.blue}◆ Ethereal UI CLI${c.reset} ${c.dim}(@etherealui/cli v0.0.9)${c.reset}\n`
  )
}

function printHelp() {
  printBanner()
  console.log(`${c.bold}Usage:${c.reset}`)
  console.log(`  npx @etherealui/cli@latest <command> [options]\n`)
  console.log(`${c.bold}Commands:${c.reset}`)
  console.log(
    `  ${c.cyan}init${c.reset}                  Initialize Ethereal UI config & cn() utility in your project`
  )
  console.log(
    `  ${c.cyan}add <slug...>${c.reset}         Add one or more components/blocks/charts to your project`
  )
  console.log(
    `  ${c.cyan}theme add <name...>${c.reset}   Download OKLCH theme presets (e.g. cyberpunk, light-green)`
  )
  console.log(
    `  ${c.cyan}theme list [query]${c.reset}    Browse and search community OKLCH themes`
  )
  console.log(
    `  ${c.cyan}list${c.reset}                  List all 56+ available primitives, charts, blocks & templates\n`
  )
  console.log(`${c.bold}Options:${c.reset}`)
  console.log(
    `  ${c.dim}--dir <path>${c.reset}          Target directory (default: src/components/ui or public/themes)`
  )
  console.log(
    `  ${c.dim}--overwrite${c.reset}           Overwrite existing files\n`
  )
  console.log(`${c.bold}Examples:${c.reset}`)
  console.log(`  npx @etherealui/cli@latest init`)
  console.log(`  npx @etherealui/cli@latest add avatar button stat-card`)
  console.log(`  npx @etherealui/cli@latest theme add cyberpunk light-green`)
  console.log(`  npx @etherealui/cli@latest theme list neon\n`)
}

async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function loadConfig(cwd: string): Promise<EtherealConfig> {
  const configPath = path.join(cwd, "ethereal.json")
  if (await fileExists(configPath)) {
    try {
      const raw = await fs.readFile(configPath, "utf-8")
      return JSON.parse(raw) as EtherealConfig
    } catch {
      // Fallback to default config
    }
  }
  return {
    $schema: "https://ethereal-ui.saefulrohman.dev/schema/registry.json",
    registryUrl: process.env.ETHEREAL_REGISTRY_URL || DEFAULT_REGISTRY_URL,
    componentsDir: "src/components/ui",
    utilsDir: "src/components/utils",
  }
}

async function ensureCnUtility(cwd: string, utilsDir: string): Promise<string> {
  const cnFile = path.join(cwd, utilsDir, "cn.ts")
  if (!(await fileExists(cnFile))) {
    await fs.mkdir(path.dirname(cnFile), { recursive: true })
    await fs.writeFile(cnFile, CN_HELPER_SOURCE, "utf-8")
  }
  return cnFile
}

async function fetchComponentSource(
  slug: string,
  registryUrl: string
): Promise<{ content: string; dependencies: string[] }> {
  // 1. Try Official JSON Registry endpoint first
  try {
    const res = await fetch(`${registryUrl}/${slug}.json`)
    if (res.ok) {
      const data = (await res.json()) as RegistryItemPayload
      const fileContent = data.files?.[0]?.content || data.usage
      if (fileContent) {
        return {
          content: fileContent,
          dependencies: data.dependencies || [],
        }
      }
    }
  } catch {
    // Fallback to GitHub Raw source
  }

  // 2. Fallback to GitHub Raw repository source
  const relFile = SOURCE_FILE_MAP[slug]
  if (!relFile) {
    throw new Error(
      `Unknown component slug "${slug}". Run "npx @etherealui/cli list" to view all available components.`
    )
  }

  const rawRes = await fetch(`${GITHUB_RAW_BASE}/${relFile}`)
  if (!rawRes.ok) {
    throw new Error(
      `Failed to fetch component "${slug}" from registry and GitHub fallback (${rawRes.status}).`
    )
  }

  const content = await rawRes.text()
  return {
    content,
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
  }
}

async function handleInit(cwd: string) {
  printBanner()
  const configPath = path.join(cwd, "ethereal.json")
  const config = await loadConfig(cwd)

  await fs.writeFile(configPath, JSON.stringify(config, null, 2) + "\n", "utf-8")
  const cnPath = await ensureCnUtility(cwd, config.utilsDir)

  console.log(`${c.green}✔${c.reset} Created ${c.bold}ethereal.json${c.reset}`)
  console.log(
    `${c.green}✔${c.reset} Created utility helper ${c.bold}${path.relative(cwd, cnPath)}${c.reset}\n`
  )
  console.log(`${c.bold}Next steps:${c.reset}`)
  console.log(
    `  1. Install peer utilities: ${c.cyan}pnpm add @etherealui/react clsx tailwind-merge lucide-react class-variance-authority${c.reset}`
  )
  console.log(
    `  2. Add components:         ${c.cyan}npx @etherealui/cli@latest add avatar button stat-card${c.reset}\n`
  )
}

async function handleList(cwd: string) {
  printBanner()
  const config = await loadConfig(cwd)

  try {
    const res = await fetch(`${config.registryUrl}/index.json`)
    if (res.ok) {
      const indexData = (await res.json()) as RegistryIndexPayload
      console.log(
        `Available items in ${c.bold}${indexData.name}${c.reset} (${indexData.totalItems} total):\n`
      )
      for (const item of indexData.items) {
        console.log(
          `  ${c.cyan}${item.name.padEnd(22)}${c.reset} ${c.dim}[${item.category}]${c.reset} ${item.title}`
        )
      }
      console.log("")
      return
    }
  } catch {
    // Use local built-in map fallback
  }

  const slugs = Object.keys(SOURCE_FILE_MAP)
  console.log(`Available Ethereal UI Registry Items (${slugs.length} total):\n`)
  for (const slug of slugs) {
    const sourcePath = SOURCE_FILE_MAP[slug]
    const category = sourcePath.split("/")[0]
    console.log(
      `  ${c.cyan}${slug.padEnd(22)}${c.reset} ${c.dim}[${category}]${c.reset} ${sourcePath}`
    )
  }
  console.log("")
}

async function handleAdd(cwd: string, args: string[]) {
  printBanner()
  const config = await loadConfig(cwd)

  let targetDir = config.componentsDir
  let overwrite = false
  const slugs: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--overwrite" || arg === "-o") {
      overwrite = true
    } else if (arg === "--dir" || arg === "-d") {
      if (args[i + 1]) {
        targetDir = args[i + 1]
        i++
      }
    } else if (!arg.startsWith("-")) {
      slugs.push(arg.toLowerCase())
    }
  }

  if (slugs.length === 0) {
    console.error(
      `${c.red}✖ Please specify at least one component to add (e.g. npx @etherealui/cli add avatar).${c.reset}\n`
    )
    process.exit(1)
  }

  await ensureCnUtility(cwd, config.utilsDir)
  const absTargetDir = path.join(cwd, targetDir)
  await fs.mkdir(absTargetDir, { recursive: true })

  const allDependencies = new Set<string>(["clsx", "tailwind-merge"])

  for (const slug of slugs) {
    try {
      const { content, dependencies } = await fetchComponentSource(
        slug,
        config.registryUrl
      )
      dependencies.forEach((dep) => allDependencies.add(dep))

      const outFilePath = path.join(absTargetDir, `${slug}.tsx`)
      if ((await fileExists(outFilePath)) && !overwrite) {
        console.log(
          `${c.yellow}⚠ Skipped${c.reset} ${c.bold}${path.relative(cwd, outFilePath)}${c.reset} ${c.dim}(already exists, pass --overwrite to replace)${c.reset}`
        )
        continue
      }

      await fs.writeFile(outFilePath, content, "utf-8")
      console.log(
        `${c.green}✔ Added${c.reset} ${c.bold}${path.relative(cwd, outFilePath)}${c.reset}`
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`${c.red}✖ Error adding "${slug}": ${message}${c.reset}`)
    }
  }

  console.log(
    `\n${c.bold}Required peer packages:${c.reset}\n  ${c.cyan}pnpm add ${Array.from(allDependencies).join(" ")}${c.reset}\n`
  )
}

interface ThemeManifestEntry {
  fileName: string
  name: string
  id: string
  themeId: string
  author: string
  likeCount: number
  tags: string[]
}

async function handleTheme(cwd: string, args: string[]) {
  printBanner()
  const subCommand = args[0]
  if (!subCommand || subCommand === "help" || subCommand === "--help" || subCommand === "-h") {
    console.log(`${c.bold}Usage:${c.reset}`)
    console.log(`  npx @etherealui/cli theme add <theme-name...> [options]`)
    console.log(`  npx @etherealui/cli theme list [search-query]\n`)
    console.log(`${c.bold}Examples:${c.reset}`)
    console.log(`  npx @etherealui/cli theme add cyberpunk`)
    console.log(`  npx @etherealui/cli theme add light-green zen-inspired-theme --overwrite`)
    console.log(`  npx @etherealui/cli theme list neon\n`)
    return
  }

  // 1. THEME LIST / SEARCH
  if (subCommand === "list" || subCommand === "ls" || subCommand === "search") {
    const query = args[1]?.toLowerCase()
    console.log(`${c.dim}Fetching themes manifest from registry...${c.reset}`)
    try {
      const res = await fetch(`${THEMES_BASE_URL}/themes-manifest.json`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      let items = (await res.json()) as ThemeManifestEntry[]

      if (query) {
        items = items.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.fileName.toLowerCase().includes(query) ||
            t.tags?.some((tag) => tag.toLowerCase().includes(query))
        )
      }

      console.log(
        `\nAvailable OKLCH Themes${query ? ` matching "${query}"` : ""} (${items.length} total):\n`
      )
      const topItems = items.slice(0, 30)
      for (const item of topItems) {
        const fileBase = item.fileName.replace(/\.css$/, "")
        console.log(
          `  ${c.cyan}${fileBase.padEnd(26)}${c.reset} ${c.bold}${item.name}${c.reset} ${c.dim}(♥ ${item.likeCount || 0})${c.reset}`
        )
        if (item.tags?.length) {
          console.log(`    ${c.dim}tags: ${item.tags.join(", ")}${c.reset}`)
        }
      }
      if (items.length > 30) {
        console.log(
          `\n  ${c.dim}...and ${items.length - 30} more themes. Visit ${THEMES_BASE_URL} to view all 870+ themes.${c.reset}`
        )
      }
      console.log("")
    } catch (err) {
      console.error(`${c.red}✖ Failed to fetch theme list: ${err}${c.reset}\n`)
    }
    return
  }

  // 2. THEME ADD
  const themeNames: string[] = []
  let targetDir = (await fileExists(path.join(cwd, "public")))
    ? "public/themes"
    : "src/styles/themes"
  let overwrite = false

  const themeArgs = subCommand === "add" ? args.slice(1) : args

  for (let i = 0; i < themeArgs.length; i++) {
    const arg = themeArgs[i]
    if (arg === "--overwrite" || arg === "-o") {
      overwrite = true
    } else if (arg === "--dir" || arg === "-d") {
      if (themeArgs[i + 1]) {
        targetDir = themeArgs[i + 1]
        i++
      }
    } else if (!arg.startsWith("-")) {
      themeNames.push(arg)
    }
  }

  if (themeNames.length === 0) {
    console.error(
      `${c.red}✖ Please specify at least one theme to download (e.g. npx @etherealui/cli theme add cyberpunk).${c.reset}\n`
    )
    process.exit(1)
  }

  const absTargetDir = path.join(cwd, targetDir)
  await fs.mkdir(absTargetDir, { recursive: true })

  for (const rawName of themeNames) {
    const slug = rawName.replace(/\.css$/, "").toLowerCase()
    const fileName = `${slug}.css`
    const outFilePath = path.join(absTargetDir, fileName)

    if ((await fileExists(outFilePath)) && !overwrite) {
      console.log(
        `${c.yellow}⚠ Skipped${c.reset} ${c.bold}${path.relative(cwd, outFilePath)}${c.reset} ${c.dim}(already exists, pass --overwrite to replace)${c.reset}`
      )
      continue
    }

    try {
      const res = await fetch(`${THEMES_BASE_URL}/${fileName}`)
      if (!res.ok) {
        throw new Error(
          `Theme "${slug}" not found at ${THEMES_BASE_URL}/${fileName} (${res.status})`
        )
      }
      const cssContent = await res.text()
      await fs.writeFile(outFilePath, cssContent, "utf-8")
      console.log(
        `${c.green}✔ Added${c.reset} theme ${c.bold}${path.relative(cwd, outFilePath)}${c.reset}`
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`${c.red}✖ Error downloading theme "${slug}": ${message}${c.reset}`)
    }
  }

  const firstTheme = themeNames[0]?.replace(/\.css$/, "")
  console.log(`\n${c.bold}How to activate your theme:${c.reset}`)
  console.log(
    `  1. In your root ${c.cyan}<html>${c.reset} element, add: ${c.yellow}data-color-theme="${firstTheme}"${c.reset}`
  )
  console.log(
    `  2. In your HTML <head> or layout, link the stylesheet:\n     ${c.dim}<link rel="stylesheet" href="/themes/${firstTheme}.css" />${c.reset}\n`
  )
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const cwd = process.cwd()

  if (!command || command === "--help" || command === "-h" || command === "help") {
    printHelp()
    return
  }

  if (command === "--version" || command === "-v") {
    console.log("0.0.4")
    return
  }

  if (command === "init") {
    await handleInit(cwd)
    return
  }

  if (command === "list" || command === "ls") {
    await handleList(cwd)
    return
  }

  if (command === "add") {
    await handleAdd(cwd, args.slice(1))
    return
  }

  if (command === "theme") {
    await handleTheme(cwd, args.slice(1))
    return
  }

  console.error(`${c.red}✖ Unknown command "${command}".${c.reset}`)
  printHelp()
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
