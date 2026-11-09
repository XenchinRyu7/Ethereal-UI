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

  window.dispatchEvent(
    new CustomEvent("ethereal-theme-change", {
      detail: {
        colorTheme: getSavedColorTheme(),
        dark: nextDark,
      },
    })
  )
}

