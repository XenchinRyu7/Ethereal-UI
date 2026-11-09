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

export function applyColorTheme(fileName: string): void {
  if (typeof window === "undefined") return
  const normalized = fileName || "default"
  localStorage.setItem("ethereal-color-theme", normalized)
  document.documentElement.setAttribute("data-color-theme", normalized)

  const existingLink = document.getElementById(
    "ethereal-active-theme-css"
  ) as HTMLLinkElement | null

  if (normalized === "default") {
    if (existingLink) {
      existingLink.removeAttribute("href")
    }
  } else {
    let link = existingLink
    if (!link) {
      link = document.createElement("link")
      link.id = "ethereal-active-theme-css"
      link.rel = "stylesheet"
      document.head.appendChild(link)
    }
    link.href = `/themes/${encodeURIComponent(normalized)}`
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

