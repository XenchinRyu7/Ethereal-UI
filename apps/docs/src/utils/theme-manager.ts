export interface ThemePreviewPalette {
  background: string
  foreground: string
  primary: string
  secondary: string
  accent: string
  card: string
}

export interface ThemeManifestItem {
  fileName: string
  name: string
  id: string
  themeId: string
  author: string
  authorImage: string | null
  likeCount: number
  tags: string[]
  publishedAt: string
  cssPath?: string
  previewColors: {
    light: ThemePreviewPalette
    dark: ThemePreviewPalette
  }
}

export const DEFAULT_ETHEREAL_THEME: ThemeManifestItem = {
  fileName: "default",
  name: "Ethereal Default",
  id: "ethereal-default",
  themeId: "ethereal-default",
  author: "Ethereal UI",
  authorImage: null,
  likeCount: 999,
  tags: ["default", "minimal", "enterprise", "clean"],
  publishedAt: "2026-01-01T00:00:00.000Z",
  previewColors: {
    light: {
      background: "#ffffff",
      foreground: "#09090b",
      primary: "#2563eb",
      secondary: "#f4f4f5",
      accent: "#dbeafe",
      card: "#ffffff",
    },
    dark: {
      background: "#09090b",
      foreground: "#fafafa",
      primary: "#3b82f6",
      secondary: "#27272a",
      accent: "#1e3a8a",
      card: "#121215",
    },
  },
}

let cachedManifest: ThemeManifestItem[] | null = null
let manifestPromise: Promise<ThemeManifestItem[]> | null = null

export async function loadThemesManifest(): Promise<ThemeManifestItem[]> {
  if (cachedManifest) return cachedManifest
  if (manifestPromise) return manifestPromise

  manifestPromise = fetch("/themes/themes-manifest.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch themes-manifest.json")
      return res.json() as Promise<ThemeManifestItem[]>
    })
    .then((items) => {
      cachedManifest = items
      return items
    })
    .catch((err) => {
      console.error("Failed to load Ethereal UI themes manifest:", err)
      return []
    })

  return manifestPromise
}

export function getSavedColorTheme(): string {
  if (typeof window === "undefined") return "default"
  return localStorage.getItem("ethereal-color-theme") || "default"
}

export function getSavedDarkMode(): boolean {
  if (typeof window === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

const SYSTEM_FONT_KEYWORDS = new Set([
  "sans-serif",
  "serif",
  "monospace",
  "system-ui",
  "-apple-system",
  "blinkmacsystemfont",
  "segoe ui",
  "roboto",
  "helvetica neue",
  "helvetica",
  "arial",
  "noto sans",
  "apple color emoji",
  "segoe ui emoji",
  "segoe ui symbol",
  "noto color emoji",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "georgia",
  "cambria",
  "times new roman",
  "times",
  "menlo",
  "monaco",
  "consolas",
  "liberation mono",
  "courier new",
  "courier",
  "inter",
  "jetbrains mono",
])

export function syncThemeGoogleFonts(): void {
  if (typeof window === "undefined") return
  const style = getComputedStyle(document.documentElement)
  const rawVars = [
    style.getPropertyValue("--font-sans"),
    style.getPropertyValue("--font-mono"),
    style.getPropertyValue("--font-serif"),
  ]

  const families = new Set<string>()
  for (const raw of rawVars) {
    if (!raw) continue
    const firstFont = raw
      .split(",")[0]
      ?.trim()
      .replace(/^['"]|['"]$/g, "")
    if (
      firstFont &&
      !firstFont.startsWith("var(") &&
      !SYSTEM_FONT_KEYWORDS.has(firstFont.toLowerCase())
    ) {
      families.add(firstFont)
    }
  }

  const existingFontLink = document.getElementById(
    "ethereal-theme-google-fonts"
  ) as HTMLLinkElement | null

  if (families.size === 0) {
    if (existingFontLink) existingFontLink.removeAttribute("href")
    return
  }

  const query = Array.from(families)
    .map(
      (f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}:wght@400;500;600;700`
    )
    .join("&")

  const href = `https://fonts.googleapis.com/css2?${query}&display=swap`
  let fontLink = existingFontLink
  if (!fontLink) {
    fontLink = document.createElement("link")
    fontLink.id = "ethereal-theme-google-fonts"
    fontLink.rel = "stylesheet"
    document.head.appendChild(fontLink)
  }
  if (fontLink.href !== href) {
    fontLink.href = href
  }
}

function parseLightness(colorStr: string): number | null {
  if (!colorStr) return null
  const trimmed = colorStr.trim().toLowerCase()
  const oklchMatch = trimmed.match(/oklch\(\s*([0-9.]+)/)
  if (oklchMatch) {
    return parseFloat(oklchMatch[1])
  }
  const hslMatch = trimmed.match(/hsl\([^)]*,\s*([0-9.]+)%\)/)
  if (hslMatch) {
    return parseFloat(hslMatch[1]) / 100
  }
  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1)
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16)
      const g = parseInt(hex[1] + hex[1], 16)
      const b = parseInt(hex[2] + hex[2], 16)
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    }
  }
  const rgbMatch = trimmed.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/)
  if (rgbMatch) {
    const r = parseFloat(rgbMatch[1])
    const g = parseFloat(rgbMatch[2])
    const b = parseFloat(rgbMatch[3])
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  }
  return null
}

export function enforceThemeContrastSafeguards(): void {
  if (typeof window === "undefined") return
  const root = document.documentElement
  const style = getComputedStyle(root)

  // 1. Sidebar background vs Sidebar foreground
  const sidebarBg = style.getPropertyValue("--sidebar")
  const sidebarFg = style.getPropertyValue("--sidebar-foreground")
  const bgL = parseLightness(sidebarBg)
  const fgL = parseLightness(sidebarFg)

  if (bgL !== null && fgL !== null) {
    if (Math.abs(bgL - fgL) < 0.35) {
      if (bgL > 0.5) {
        root.style.setProperty("--sidebar-foreground", "oklch(0.18 0.02 260)")
      } else {
        root.style.setProperty("--sidebar-foreground", "oklch(0.98 0 0)")
      }
    } else {
      root.style.removeProperty("--sidebar-foreground")
    }
  }

  // 2. Primary vs Primary Foreground
  const primaryBg = style.getPropertyValue("--primary")
  const primaryFg = style.getPropertyValue("--primary-foreground")
  const pBgL = parseLightness(primaryBg)
  const pFgL = parseLightness(primaryFg)

  if (pBgL !== null && pFgL !== null) {
    if (Math.abs(pBgL - pFgL) < 0.35) {
      if (pBgL > 0.6) {
        root.style.setProperty("--primary-foreground", "oklch(0 0 0)")
      } else {
        root.style.setProperty("--primary-foreground", "oklch(1 0 0)")
      }
    } else {
      root.style.removeProperty("--primary-foreground")
    }
  }

  // 3. Secondary vs Secondary Foreground
  const secBg = style.getPropertyValue("--secondary")
  const secFg = style.getPropertyValue("--secondary-foreground")
  const sBgL = parseLightness(secBg)
  const sFgL = parseLightness(secFg)

  if (sBgL !== null && sFgL !== null) {
    if (Math.abs(sBgL - sFgL) < 0.35) {
      if (sBgL > 0.6) {
        root.style.setProperty("--secondary-foreground", "oklch(0 0 0)")
      } else {
        root.style.setProperty("--secondary-foreground", "oklch(1 0 0)")
      }
    } else {
      root.style.removeProperty("--secondary-foreground")
    }
  }
}

export function applyColorTheme(fileName: string): void {
  if (typeof window === "undefined") return
  let normalized = fileName || "default"
  if (normalized === "claude+.css") {
    normalized = "claude-plus.css"
  }
  localStorage.setItem("ethereal-color-theme", normalized)
  document.documentElement.setAttribute("data-color-theme", normalized)

  const existingLink = document.getElementById(
    "ethereal-active-theme-css"
  ) as HTMLLinkElement | null

  if (normalized === "default") {
    if (existingLink) {
      existingLink.removeAttribute("href")
    }
    document.documentElement.style.removeProperty("--sidebar-foreground")
    document.documentElement.style.removeProperty("--primary-foreground")
    document.documentElement.style.removeProperty("--secondary-foreground")
    syncThemeGoogleFonts()
  } else {
    let link = existingLink
    if (!link) {
      link = document.createElement("link")
      link.id = "ethereal-active-theme-css"
      link.rel = "stylesheet"
    }
    link.onload = () => {
      syncThemeGoogleFonts()
      enforceThemeContrastSafeguards()
      window.dispatchEvent(
        new CustomEvent("ethereal-theme-change", {
          detail: {
            colorTheme: normalized,
            dark: document.documentElement.classList.contains("dark"),
          },
        })
      )
    }
    link.href = `/themes/${normalized}`
    document.head.appendChild(link)
  }

  window.dispatchEvent(
    new CustomEvent("ethereal-theme-change", {
      detail: {
        colorTheme: normalized,
        dark: document.documentElement.classList.contains("dark"),
      },
    })
  )
}

export function setDarkModePreference(nextDark: boolean): void {
  if (typeof window === "undefined") return
  if (nextDark) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("ethereal-theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("ethereal-theme", "light")
  }

  window.setTimeout(() => {
    enforceThemeContrastSafeguards()
  }, 10)

  window.dispatchEvent(
    new CustomEvent("ethereal-theme-change", {
      detail: {
        colorTheme: getSavedColorTheme(),
        dark: nextDark,
      },
    })
  )
}

