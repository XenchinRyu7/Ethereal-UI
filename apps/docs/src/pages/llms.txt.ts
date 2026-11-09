import type { APIRoute } from "astro"
import {
  PRIMITIVE_ITEMS,
  CHART_ITEMS,
  BLOCK_ITEMS,
  TEMPLATE_ITEMS,
} from "../data/registry-catalog"

const SITE_URL = "https://ethereal-ui.saefulrohman.dev"

export const GET: APIRoute = async () => {
  const lines: string[] = [
    "# Ethereal UI (@etherealui/react & @etherealui/cli)",
    "",
    "> Free, Open-Source, Modern Light & Dark Mode React Component System, AI & Agentic Blocks, Statistical SVG Charts, and Enterprise FinTech / HRMS Dashboard Blocks built with Tailwind CSS v4 and Radix UI.",
    "",
    "- Website: https://ethereal-ui.saefulrohman.dev",
    "- NPM Package (React UI): https://www.npmjs.com/package/@etherealui/react",
    "- NPM Package (CLI): https://www.npmjs.com/package/@etherealui/cli",
    "- GitHub Repository: https://github.com/XenchinRyu7/Ethereal-UI",
    "- Registry Index JSON: https://ethereal-ui.saefulrohman.dev/registry/index.json",
    "",
    "## Quick Installation",
    "- Install via NPM: `pnpm add @etherealui/react lucide-react clsx tailwind-merge`",
    "- Scaffold via CLI: `npx @etherealui/cli@latest init` and `npx @etherealui/cli@latest add <slug>`",
    "",
    "## Documentation Guides",
    `- [Introduction](${SITE_URL}/docs/introduction)`,
    `- [Installation](${SITE_URL}/docs/installation)`,
    `- [Theming & Dark Mode](${SITE_URL}/docs/theming)`,
    `- [CLI & JSON Registry](${SITE_URL}/docs/cli-registry)`,
    "",
    `## Enterprise & Agentic Blocks (${BLOCK_ITEMS.length})`,
    ...BLOCK_ITEMS.map(
      (item) =>
        `- [${item.title}](${SITE_URL}/blocks/${item.slug}): ${item.description} (CLI: \`npx @etherealui/cli@latest add ${item.slug}\`)`
    ),
    "",
    `## Base React Primitives (${PRIMITIVE_ITEMS.length})`,
    ...PRIMITIVE_ITEMS.map(
      (item) =>
        `- [${item.title}](${SITE_URL}/components/${item.slug}): ${item.description}`
    ),
    "",
    `## Statistical SVG Charts (${CHART_ITEMS.length})`,
    ...CHART_ITEMS.map(
      (item) =>
        `- [${item.title}](${SITE_URL}/charts/${item.slug}): ${item.description}`
    ),
    "",
    `## Full-Page SaaS Templates (${TEMPLATE_ITEMS.length})`,
    ...TEMPLATE_ITEMS.map(
      (item) =>
        `- [${item.title}](${SITE_URL}/templates/${item.slug}): ${item.description}`
    ),
    "",
  ]

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}

