#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as culori from "culori";

const BASE_URL = "https://tweakcn.com";
const COMMUNITY_URL = `${BASE_URL}/community`;
const FALLBACK_ACTION_ID = "7ea31f9be67f30e9257bce54353dd1465c459c0905";

// Default theme styles from jnsahaj/tweakcn (config/theme.ts)
const DEFAULT_FONT_SANS =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
const DEFAULT_FONT_SERIF =
  'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';
const DEFAULT_FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const defaultLightThemeStyles = {
  background: "oklch(1 0 0)",
  foreground: "oklch(0.145 0 0)",
  card: "oklch(1 0 0)",
  "card-foreground": "oklch(0.145 0 0)",
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.145 0 0)",
  primary: "oklch(0.205 0 0)",
  "primary-foreground": "oklch(0.985 0 0)",
  secondary: "oklch(0.97 0 0)",
  "secondary-foreground": "oklch(0.205 0 0)",
  muted: "oklch(0.97 0 0)",
  "muted-foreground": "oklch(0.556 0 0)",
  accent: "oklch(0.97 0 0)",
  "accent-foreground": "oklch(0.205 0 0)",
  destructive: "oklch(0.577 0.245 27.325)",
  "destructive-foreground": "oklch(1 0 0)",
  border: "oklch(0.922 0 0)",
  input: "oklch(0.922 0 0)",
  ring: "oklch(0.708 0 0)",
  "chart-1": "oklch(0.81 0.10 252)",
  "chart-2": "oklch(0.62 0.19 260)",
  "chart-3": "oklch(0.55 0.22 263)",
  "chart-4": "oklch(0.49 0.22 264)",
  "chart-5": "oklch(0.42 0.18 266)",
  radius: "0.625rem",
  sidebar: "oklch(0.985 0 0)",
  "sidebar-foreground": "oklch(0.145 0 0)",
  "sidebar-primary": "oklch(0.205 0 0)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(0.97 0 0)",
  "sidebar-accent-foreground": "oklch(0.205 0 0)",
  "sidebar-border": "oklch(0.922 0 0)",
  "sidebar-ring": "oklch(0.708 0 0)",
  "font-sans": DEFAULT_FONT_SANS,
  "font-serif": DEFAULT_FONT_SERIF,
  "font-mono": DEFAULT_FONT_MONO,
  "shadow-color": "oklch(0 0 0)",
  "shadow-opacity": "0.1",
  "shadow-blur": "3px",
  "shadow-spread": "0px",
  "shadow-offset-x": "0",
  "shadow-offset-y": "1px",
  "letter-spacing": "0em",
  spacing: "0.25rem",
};

const defaultDarkThemeStyles = {
  ...defaultLightThemeStyles,
  background: "oklch(0.145 0 0)",
  foreground: "oklch(0.985 0 0)",
  card: "oklch(0.205 0 0)",
  "card-foreground": "oklch(0.985 0 0)",
  popover: "oklch(0.269 0 0)",
  "popover-foreground": "oklch(0.985 0 0)",
  primary: "oklch(0.922 0 0)",
  "primary-foreground": "oklch(0.205 0 0)",
  secondary: "oklch(0.269 0 0)",
  "secondary-foreground": "oklch(0.985 0 0)",
  muted: "oklch(0.269 0 0)",
  "muted-foreground": "oklch(0.708 0 0)",
  accent: "oklch(0.371 0 0)",
  "accent-foreground": "oklch(0.985 0 0)",
  destructive: "oklch(0.704 0.191 22.216)",
  "destructive-foreground": "oklch(0.985 0 0)",
  border: "oklch(0.275 0 0)",
  input: "oklch(0.325 0 0)",
  ring: "oklch(0.556 0 0)",
  "chart-1": "oklch(0.81 0.10 252)",
  "chart-2": "oklch(0.62 0.19 260)",
  "chart-3": "oklch(0.55 0.22 263)",
  "chart-4": "oklch(0.49 0.22 264)",
  "chart-5": "oklch(0.42 0.18 266)",
  radius: "0.625rem",
  sidebar: "oklch(0.205 0 0)",
  "sidebar-foreground": "oklch(0.985 0 0)",
  "sidebar-primary": "oklch(0.488 0.243 264.376)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(0.269 0 0)",
  "sidebar-accent-foreground": "oklch(0.985 0 0)",
  "sidebar-border": "oklch(0.275 0 0)",
  "sidebar-ring": "oklch(0.439 0 0)",
  "shadow-color": "oklch(0 0 0)",
  "letter-spacing": "0em",
  spacing: "0.25rem",
};

// --- Color & CSS Generator Utils (ported from jnsahaj/tweakcn) ---

const formatNumber = (num) => {
  if (!num) return "0";
  return num % 1 === 0 ? num : num.toFixed(4);
};

const formatHsl = (hsl) => {
  return `hsl(${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%)`;
};

const parseColorInput = (colorValue) => {
  if (!colorValue || typeof colorValue !== "string") return null;
  const trimmed = colorValue.trim();
  // Handle raw comma-separated RGB like "0, 0, 0"
  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(trimmed)) {
    return culori.parse(`rgb(${trimmed})`);
  }
  return culori.parse(trimmed);
};

const colorFormatter = (colorValue, format = "oklch", tailwindVersion = "4") => {
  try {
    const color = parseColorInput(colorValue);
    if (!color) return colorValue;

    switch (format) {
      case "hsl": {
        const hsl = culori.converter("hsl")(color);
        if (tailwindVersion === "4") {
          return formatHsl(hsl);
        }
        return `${formatNumber(hsl.h)} ${formatNumber(hsl.s * 100)}% ${formatNumber(hsl.l * 100)}%`;
      }
      case "rgb":
        return culori.formatRgb(color);
      case "oklch": {
        const oklch = culori.converter("oklch")(color);
        return `oklch(${formatNumber(oklch.l)} ${formatNumber(oklch.c)} ${formatNumber(oklch.h)})`;
      }
      case "hex":
        return culori.formatHex(color);
      default:
        return colorValue;
    }
  } catch {
    return colorValue;
  }
};

const getShadowMap = (themeStyles, mode) => {
  const styles = themeStyles[mode];
  const shadowColor = styles["shadow-color"];
  const hsl = colorFormatter(shadowColor, "hsl", "3");
  const offsetX = styles["shadow-offset-x"];
  const offsetY = styles["shadow-offset-y"];
  const blur = styles["shadow-blur"];
  const spread = styles["shadow-spread"];
  const opacity = parseFloat(styles["shadow-opacity"]);
  const safeOpacity = Number.isNaN(opacity) ? 0.1 : opacity;
  const color = (opacityMultiplier) =>
    `hsl(${hsl} / ${(safeOpacity * opacityMultiplier).toFixed(2)})`;

  const secondLayer = (fixedOffsetY, fixedBlur) => {
    const offsetX2 = offsetX;
    const offsetY2 = fixedOffsetY;
    const blur2 = fixedBlur;
    const spread2 =
      (parseFloat(spread?.replace("px", "") ?? "0") - 1).toString() + "px";
    const color2 = color(1.0);
    return `${offsetX2} ${offsetY2} ${blur2} ${spread2} ${color2}`;
  };

  return {
    "shadow-2xs": `${offsetX} ${offsetY} ${blur} ${spread} ${color(0.5)}`,
    "shadow-xs": `${offsetX} ${offsetY} ${blur} ${spread} ${color(0.5)}`,
    "shadow-2xl": `${offsetX} ${offsetY} ${blur} ${spread} ${color(2.5)}`,
    "shadow-sm": `${offsetX} ${offsetY} ${blur} ${spread} ${color(1.0)}, ${secondLayer("1px", "2px")}`,
    shadow: `${offsetX} ${offsetY} ${blur} ${spread} ${color(1.0)}, ${secondLayer("1px", "2px")}`,
    "shadow-md": `${offsetX} ${offsetY} ${blur} ${spread} ${color(1.0)}, ${secondLayer("2px", "4px")}`,
    "shadow-lg": `${offsetX} ${offsetY} ${blur} ${spread} ${color(1.0)}, ${secondLayer("4px", "6px")}`,
    "shadow-xl": `${offsetX} ${offsetY} ${blur} ${spread} ${color(1.0)}, ${secondLayer("8px", "10px")}`,
  };
};

const generateColorVariables = (themeStyles, mode, formatColor) => {
  const styles = themeStyles[mode];
  return `
  --background: ${formatColor(styles.background)};
  --foreground: ${formatColor(styles.foreground)};
  --card: ${formatColor(styles.card)};
  --card-foreground: ${formatColor(styles["card-foreground"])};
  --popover: ${formatColor(styles.popover)};
  --popover-foreground: ${formatColor(styles["popover-foreground"])};
  --primary: ${formatColor(styles.primary)};
  --primary-foreground: ${formatColor(styles["primary-foreground"])};
  --secondary: ${formatColor(styles.secondary)};
  --secondary-foreground: ${formatColor(styles["secondary-foreground"])};
  --muted: ${formatColor(styles.muted)};
  --muted-foreground: ${formatColor(styles["muted-foreground"])};
  --accent: ${formatColor(styles.accent)};
  --accent-foreground: ${formatColor(styles["accent-foreground"])};
  --destructive: ${formatColor(styles.destructive)};
  --destructive-foreground: ${formatColor(styles["destructive-foreground"])};
  --border: ${formatColor(styles.border)};
  --input: ${formatColor(styles.input)};
  --ring: ${formatColor(styles.ring)};
  --chart-1: ${formatColor(styles["chart-1"])};
  --chart-2: ${formatColor(styles["chart-2"])};
  --chart-3: ${formatColor(styles["chart-3"])};
  --chart-4: ${formatColor(styles["chart-4"])};
  --chart-5: ${formatColor(styles["chart-5"])};
  --sidebar: ${formatColor(styles.sidebar)};
  --sidebar-foreground: ${formatColor(styles["sidebar-foreground"])};
  --sidebar-primary: ${formatColor(styles["sidebar-primary"])};
  --sidebar-primary-foreground: ${formatColor(styles["sidebar-primary-foreground"])};
  --sidebar-accent: ${formatColor(styles["sidebar-accent"])};
  --sidebar-accent-foreground: ${formatColor(styles["sidebar-accent-foreground"])};
  --sidebar-border: ${formatColor(styles["sidebar-border"])};
  --sidebar-ring: ${formatColor(styles["sidebar-ring"])};`;
};

const generateFontVariables = (themeStyles, mode) => {
  const styles = themeStyles[mode];
  return `
  --font-sans: ${styles["font-sans"]};
  --font-serif: ${styles["font-serif"]};
  --font-mono: ${styles["font-mono"]};`;
};

const generateShadowVariables = (shadowMap) => {
  return `
  --shadow-2xs: ${shadowMap["shadow-2xs"]};
  --shadow-xs: ${shadowMap["shadow-xs"]};
  --shadow-sm: ${shadowMap["shadow-sm"]};
  --shadow: ${shadowMap["shadow"]};
  --shadow-md: ${shadowMap["shadow-md"]};
  --shadow-lg: ${shadowMap["shadow-lg"]};
  --shadow-xl: ${shadowMap["shadow-xl"]};
  --shadow-2xl: ${shadowMap["shadow-2xl"]};`;
};

const generateRawShadowVariables = (themeStyles, mode, formatColor) => {
  const styles = themeStyles[mode];
  return `
  --shadow-x: ${styles["shadow-offset-x"]};
  --shadow-y: ${styles["shadow-offset-y"]};
  --shadow-blur: ${styles["shadow-blur"]};
  --shadow-spread: ${styles["shadow-spread"]};
  --shadow-opacity: ${styles["shadow-opacity"]};
  --shadow-color: ${formatColor(styles["shadow-color"])};`;
};

const generateTrackingVariables = (themeStyles) => {
  const styles = themeStyles["light"];
  if (styles["letter-spacing"] === "0em") {
    return "";
  }
  return `

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);`;
};

const generateThemeVariables = (themeStyles, mode, formatColor) => {
  const selector = mode === "dark" ? ".dark" : ":root";
  const colorVars = generateColorVariables(themeStyles, mode, formatColor);
  const fontVars = generateFontVariables(themeStyles, mode);
  const radiusVar = `\n  --radius: ${themeStyles[mode].radius};`;
  const shadowVars = generateShadowVariables(getShadowMap(themeStyles, mode));
  const rawShadowVars = generateRawShadowVariables(themeStyles, mode, formatColor);
  const spacingVar =
    mode === "light"
      ? `\n  --spacing: ${themeStyles["light"].spacing ?? defaultLightThemeStyles.spacing};`
      : "";
  const trackingVars =
    mode === "light"
      ? `\n  --tracking-normal: ${themeStyles["light"]["letter-spacing"] ?? defaultLightThemeStyles["letter-spacing"]};`
      : "";

  return (
    selector +
    " {" +
    colorVars +
    fontVars +
    radiusVar +
    rawShadowVars +
    shadowVars +
    trackingVars +
    spacingVar +
    "\n}"
  );
};

const generateTailwindV4ThemeInline = (themeStyles) => {
  return `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);${generateTrackingVariables(themeStyles)}
}`;
};

const indentBlock = (str) =>
  str
    .split("\n")
    .map((line) => (line.length > 0 ? `  ${line}` : line))
    .join("\n");

export function mergeWithDefaults(rawStyles) {
  return {
    light: {
      ...defaultLightThemeStyles,
      ...(rawStyles?.light || {}),
    },
    dark: {
      ...defaultDarkThemeStyles,
      ...(rawStyles?.light || {}),
      ...(rawStyles?.dark || {}),
    },
  };
}

export function generateThemeCss(
  rawStyles,
  { colorFormat = "oklch", tailwindVersion = "4", varsOnly = false } = {}
) {
  const themeStyles = mergeWithDefaults(rawStyles);
  const formatColor = (color) =>
    colorFormatter(color, colorFormat, tailwindVersion);

  const lightTheme = generateThemeVariables(themeStyles, "light", formatColor);
  const darkTheme = generateThemeVariables(themeStyles, "dark", formatColor);

  if (varsOnly) {
    return `${lightTheme}\n\n${darkTheme}\n`;
  }

  if (tailwindVersion === "4") {
    const tailwindV4Theme = generateTailwindV4ThemeInline(themeStyles);
    const bodyLetterSpacing =
      themeStyles["light"]["letter-spacing"] !== "0em"
        ? "\n    letter-spacing: var(--tracking-normal);"
        : "";

    return `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

${lightTheme}

${darkTheme}

${tailwindV4Theme}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;${bodyLetterSpacing}
  }
}
`;
  }

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
${indentBlock(lightTheme)}

${indentBlock(darkTheme)}
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
}

// --- Dynamic Next.js Server Action Discovery & Fetching ---

async function discoverActionId() {
  try {
    const res = await fetch(COMMUNITY_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) return FALLBACK_ACTION_ID;
    const html = await res.text();
    const scripts = [
      ...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js[^"]*)"/g),
    ].map((m) => m[1]);

    const regex =
      /createServerReference\)\("([a-f0-9]{40,44})"[^"]*"getCommunityThemes"\)/;

    for (let i = 0; i < scripts.length; i += 8) {
      const batch = scripts.slice(i, i + 8);
      const results = await Promise.all(
        batch.map(async (src) => {
          try {
            const jsRes = await fetch(`${BASE_URL}${src}`);
            if (!jsRes.ok) return null;
            const js = await jsRes.text();
            const match = js.match(regex);
            return match ? match[1] : null;
          } catch {
            return null;
          }
        })
      );
      const found = results.find(Boolean);
      if (found) return found;
    }
  } catch (err) {
    console.warn("⚠️ Could not auto-discover action ID, using fallback:", err.message);
  }
  return FALLBACK_ACTION_ID;
}

function parseReactFlightResponse(text) {
  const lines = text.trim().split("\n");
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const prefix = line.slice(0, colonIdx);
    const payload = line.slice(colonIdx + 1);
    if (prefix === "1" || payload.startsWith('{"themes":')) {
      return JSON.parse(payload);
    }
  }
  throw new Error(`Unexpected response format: ${text.slice(0, 200)}`);
}

async function fetchCommunityThemesPage(actionId, { sort, cursor, limit, tags, timeRange }) {
  const body = JSON.stringify([
    sort,
    cursor === undefined ? "$undefined" : cursor,
    limit,
    "all",
    tags,
    timeRange,
  ]);

  const res = await fetch(COMMUNITY_URL, {
    method: "POST",
    headers: {
      "Next-Action": actionId,
      Accept: "text/x-component",
      "Content-Type": "text/plain;charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }

  const text = await res.text();
  return parseReactFlightResponse(text);
}

/**
 * Clean, URL-safe filename formatting (e.g. "Claude +" -> "claude-plus.css")
 * Avoids `+` and parentheses which can cause 404s on static file servers.
 */
function formatThemeFileNameBase(str) {
  let s = String(str || "theme")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\+/g, "-plus-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!s || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i.test(s)) {
    s = `${s || "theme"}-theme`;
  }
  return s;
}

function parseArgs(argv) {
  const options = {
    outDir: "apps/docs/public/themes",
    sort: "popular", // Default: popular (All Time)
    tailwindVersion: "4",
    colorFormat: "oklch",
    varsOnly: true,
    maxThemes: Infinity,
    tags: [],
    timeRange: "all", // "all" | "weekly" | "monthly"
    withHeader: true,
  };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      console.log(`
Usage: node scripts/download-themes.mjs [options]

Options:
  --out=<dir>           Output folder for .css files (default: apps/docs/public/themes)
  --tailwind=<3|4>      Tailwind version format: 3 or 4 (default: 4)
  --color=<format>      Color format: oklch, hsl, rgb, hex (default: oklch)
  --vars-only           Only output :root and .dark CSS variables without @theme/@layer wrappers (default)
  --full                Output full Tailwind @theme/@layer wrappers
  --sort=<option>       Sort order: popular, all-time, newest, oldest (default: popular / all-time)
  --time=<range>        Time range for popular: all, all-time, monthly, weekly (default: all)
  --max=<number>        Maximum number of themes to download (default: all)
  --tags=<tag1,tag2>    Filter by community tags (comma-separated)
  --no-header           Omit metadata comment header at top of .css files
  --help, -h            Show this help message
`);
      process.exit(0);
    } else if (arg.startsWith("--out=")) {
      options.outDir = arg.split("=")[1];
    } else if (arg.startsWith("--tailwind=")) {
      options.tailwindVersion = arg.split("=")[1];
    } else if (arg.startsWith("--color=")) {
      options.colorFormat = arg.split("=")[1];
    } else if (arg === "--vars-only") {
      options.varsOnly = true;
    } else if (arg === "--full") {
      options.varsOnly = false;
    } else if (arg.startsWith("--sort=")) {
      const val = arg.split("=")[1].toLowerCase();
      if (val === "all-time" || val === "all" || val === "popular") {
        options.sort = "popular";
        options.timeRange = "all";
      } else if (val === "weekly" || val === "monthly") {
        options.sort = "popular";
        options.timeRange = val;
      } else if (val === "newest" || val === "oldest") {
        options.sort = val;
      } else {
        console.warn(`⚠️ Unknown --sort=${val}, falling back to "popular" (all-time)`);
        options.sort = "popular";
      }
    } else if (arg.startsWith("--time=")) {
      const val = arg.split("=")[1].toLowerCase();
      options.timeRange = val === "all-time" ? "all" : val;
    } else if (arg.startsWith("--max=")) {
      options.maxThemes = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--tags=")) {
      options.tags = arg
        .split("=")[1]
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (arg === "--no-header") {
      options.withHeader = false;
    }
  }

  if (options.tailwindVersion === "3" && options.colorFormat === "oklch") {
    options.colorFormat = "hsl";
  }

  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const outDir = path.resolve(process.cwd(), options.outDir);
  await fs.mkdir(outDir, { recursive: true });

  console.log(`🔍 Discovering tweakcn community server action ID...`);
  const actionId = await discoverActionId();
  console.log(`✅ Using Next-Action ID: ${actionId}`);
  console.log(
    `⚙️  Config: Tailwind v${options.tailwindVersion} | Color: ${options.colorFormat} | Sort: ${options.sort} (${options.timeRange}) | Output: ${outDir}`
  );

  const allThemes = [];
  const seenIds = new Set();
  let cursor = undefined;
  let page = 1;
  const pageSize = 50;

  while (allThemes.length < options.maxThemes) {
    process.stdout.write(`📥 Fetching page ${page} (cursor: ${cursor ?? "start"})... `);
    let data;
    let retries = 3;
    while (retries > 0) {
      try {
        data = await fetchCommunityThemesPage(actionId, {
          sort: options.sort,
          cursor,
          limit: pageSize,
          tags: options.tags,
          timeRange: options.timeRange,
        });
        break;
      } catch (err) {
        retries--;
        if (retries === 0) throw err;
        console.warn(`\n⚠️ Retry fetching page ${page} (${err.message})...`);
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    const pageThemes = data?.themes || [];
    for (const theme of pageThemes) {
      if (!seenIds.has(theme.id) && allThemes.length < options.maxThemes) {
        seenIds.add(theme.id);
        allThemes.push(theme);
      }
    }

    console.log(`got ${pageThemes.length} themes (total: ${allThemes.length})`);

    if (data?.nextCursor === null || data?.nextCursor === undefined || pageThemes.length === 0) {
      break;
    }
    cursor = data.nextCursor;
    page++;
  }

  // Clean old .css files in output directory so there are no stale filenames
  const existingFiles = await fs.readdir(outDir);
  for (const file of existingFiles) {
    if (file.endsWith(".css")) {
      await fs.unlink(path.join(outDir, file));
    }
  }

  console.log(`\n🎨 Generating ${allThemes.length} CSS files...`);

  const usedFilenames = new Set();
  const manifest = [];

  for (const theme of allThemes) {
    const baseName = formatThemeFileNameBase(theme.name);
    let fileName = `${baseName}.css`;

    if (usedFilenames.has(fileName)) {
      const authorBase = formatThemeFileNameBase(theme.author?.name || "user");
      const candidateWithAuthor = `${baseName}-by-${authorBase}.css`;
      if (!usedFilenames.has(candidateWithAuthor)) {
        fileName = candidateWithAuthor;
      } else {
        let counter = 2;
        while (usedFilenames.has(`${baseName}-${counter}.css`)) {
          counter++;
        }
        fileName = `${baseName}-${counter}.css`;
      }
    }
    usedFilenames.add(fileName);

    const mergedStyles = mergeWithDefaults(theme.styles);
    const cssBody = generateThemeCss(theme.styles, {
      colorFormat: options.colorFormat,
      tailwindVersion: options.tailwindVersion,
      varsOnly: options.varsOnly,
    });

    const header = options.withHeader
      ? `/**
 * Ethereal UI Theme: ${theme.name}
 * Author: ${theme.author?.name || "Community"}
 * Theme ID: ${theme.themeId}
 * Tags: ${(theme.tags || []).join(", ") || "none"}
 * Likes: ${theme.likeCount ?? 0}
 */

`
      : "";

    const filePath = path.join(outDir, fileName);
    await fs.writeFile(filePath, header + cssBody, "utf8");

    manifest.push({
      fileName,
      name: theme.name,
      id: theme.id,
      themeId: theme.themeId,
      author: theme.author?.name || "Unknown",
      authorImage: theme.author?.image || null,
      likeCount: theme.likeCount ?? 0,
      tags: theme.tags || [],
      publishedAt: theme.publishedAt,
      cssPath: `/themes/${fileName}`,
      previewColors: {
        light: {
          background: colorFormatter(mergedStyles.light.background, "hex", "4"),
          foreground: colorFormatter(mergedStyles.light.foreground, "hex", "4"),
          primary: colorFormatter(mergedStyles.light.primary, "hex", "4"),
          secondary: colorFormatter(mergedStyles.light.secondary, "hex", "4"),
          accent: colorFormatter(mergedStyles.light.accent, "hex", "4"),
          card: colorFormatter(mergedStyles.light.card, "hex", "4"),
        },
        dark: {
          background: colorFormatter(mergedStyles.dark.background, "hex", "4"),
          foreground: colorFormatter(mergedStyles.dark.foreground, "hex", "4"),
          primary: colorFormatter(mergedStyles.dark.primary, "hex", "4"),
          secondary: colorFormatter(mergedStyles.dark.secondary, "hex", "4"),
          accent: colorFormatter(mergedStyles.dark.accent, "hex", "4"),
          card: colorFormatter(mergedStyles.dark.card, "hex", "4"),
        },
      },
    });
  }

  const manifestPath = path.join(outDir, "themes-manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

  console.log(`✨ Done! Saved ${allThemes.length} .css files to: ${outDir}`);
  console.log(`📋 Manifest saved to: ${manifestPath}`);
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  main().catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
}
