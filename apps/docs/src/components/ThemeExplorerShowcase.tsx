import * as React from "react"
import {
  Palette,
  Search,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Heart,
  Sun,
  Moon,
  Code2,
  Download,
  SlidersHorizontal,
  X,
} from "lucide-react"
import {
  type ThemeManifestItem,
  DEFAULT_ETHEREAL_THEME,
  loadThemesManifest,
  getSavedColorTheme,
  getSavedDarkMode,
  applyColorTheme,
  setDarkModePreference,
} from "../utils/theme-manager"

const POPULAR_TAGS = [
  "all",
  "minimal",
  "professional",
  "corporate",
  "startup",
  "saas",
  "dark",
  "cyberpunk",
  "retro",
  "pastel",
  "brutalist",
  "neon",
  "zen",
]

export const ThemeExplorerShowcase: React.FC = () => {
  const [themes, setThemes] = React.useState<ThemeManifestItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeFileName, setActiveFileName] = React.useState("default")
  const [dark, setDark] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState("all")
  const [sortBy, setSortBy] = React.useState<"popular" | "newest" | "name">(
    "popular"
  )
  const [visibleCount, setVisibleCount] = React.useState(48)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [inspectingTheme, setInspectingTheme] =
    React.useState<ThemeManifestItem | null>(null)
  const [inspectCssText, setInspectCssText] = React.useState("")

  React.useEffect(() => {
    setActiveFileName(getSavedColorTheme())
    setDark(getSavedDarkMode())

    loadThemesManifest().then((items) => {
      setThemes(items)
      setLoading(false)
    })

    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<{ colorTheme: string; dark: boolean }>
      if (custom.detail) {
        setActiveFileName(custom.detail.colorTheme)
        setDark(custom.detail.dark)
      } else {
        setActiveFileName(getSavedColorTheme())
        setDark(getSavedDarkMode())
      }
    }

    window.addEventListener("ethereal-theme-change", handleSync)
    return () => window.removeEventListener("ethereal-theme-change", handleSync)
  }, [])

  const activeThemeObj = React.useMemo(() => {
    if (activeFileName === "default") return DEFAULT_ETHEREAL_THEME
    return (
      themes.find((t) => t.fileName === activeFileName) ||
      DEFAULT_ETHEREAL_THEME
    )
  }, [activeFileName, themes])

  const filteredThemes = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = themes.filter((item) => {
      if (selectedTag !== "all" && !item.tags.includes(selectedTag)) {
        return false
      }
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      )
    })

    if (sortBy === "popular") {
      return [...list].sort((a, b) => b.likeCount - a.likeCount)
    }
    if (sortBy === "newest") {
      return [...list].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    }
    return [...list].sort((a, b) => a.name.localeCompare(b.name))
  }, [themes, search, selectedTag, sortBy])

  const visibleThemes = React.useMemo(
    () => filteredThemes.slice(0, visibleCount),
    [filteredThemes, visibleCount]
  )

  const handleSelectTheme = (fileName: string) => {
    setActiveFileName(fileName)
    applyColorTheme(fileName)
  }

  const handleRandomTheme = () => {
    if (themes.length === 0) return
    const randomItem = themes[Math.floor(Math.random() * themes.length)]
    if (randomItem) {
      handleSelectTheme(randomItem.fileName)
    }
  }

  const handleCopyCss = async (
    item: ThemeManifestItem,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation()
    try {
      let cssText = ""
      if (item.fileName === "default") {
        cssText = `:root {\n  --background: #ffffff;\n  --foreground: #09090b;\n  --card: #ffffff;\n  --card-foreground: #09090b;\n  --primary: #2563eb;\n  --primary-foreground: #ffffff;\n  --secondary: #f4f4f5;\n  --muted: #f4f4f5;\n  --muted-foreground: #71717a;\n  --accent: #dbeafe;\n  --border: #e4e4e7;\n}\n\n.dark {\n  --background: #09090b;\n  --foreground: #fafafa;\n  --card: #121215;\n  --card-foreground: #fafafa;\n  --primary: #3b82f6;\n  --primary-foreground: #ffffff;\n  --secondary: #27272a;\n  --muted: #18181b;\n  --muted-foreground: #a1a1aa;\n  --accent: #1e3a8a;\n  --border: #27272a;\n}`
      } else {
        const res = await fetch(`/themes/${encodeURIComponent(item.fileName)}`)
        cssText = await res.text()
      }
      await navigator.clipboard.writeText(cssText)
      setCopiedId(item.id)
      window.setTimeout(() => setCopiedId(null), 1800)
    } catch (err) {
      console.error("Failed to copy theme CSS:", err)
    }
  }

  const openInspectModal = async (
    item: ThemeManifestItem,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation()
    setInspectingTheme(item)
    setInspectCssText("Loading CSS variables...")
    try {
      if (item.fileName === "default") {
        setInspectCssText(
          `:root {\n  --background: #ffffff;\n  --foreground: #09090b;\n  --card: #ffffff;\n  --card-foreground: #09090b;\n  --primary: #2563eb;\n  --primary-foreground: #ffffff;\n  --border: #e4e4e7;\n}\n\n.dark {\n  --background: #09090b;\n  --foreground: #fafafa;\n  --card: #121215;\n  --card-foreground: #fafafa;\n  --primary: #3b82f6;\n  --primary-foreground: #ffffff;\n  --border: #27272a;\n}`
        )
      } else {
        const res = await fetch(`/themes/${encodeURIComponent(item.fileName)}`)
        const text = await res.text()
        setInspectCssText(text)
      }
    } catch {
      setInspectCssText("/* Failed to load CSS file */")
    }
  }

  return (
    <div className="space-y-8">
      {/* Sticky Control Bar */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Active Theme Summary */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xs shrink-0">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Active Theme Preset
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {themes.length || 871} Community Themes
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {activeThemeObj.name}{" "}
                <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  by {activeThemeObj.author}
                </span>
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkModePreference(!dark)}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {dark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-blue-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleRandomTheme}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>Randomize</span>
            </button>

            <button
              type="button"
              onClick={() => openInspectModal(activeThemeObj)}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>View CSS</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyCss(activeThemeObj)}
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
            >
              {copiedId === activeThemeObj.id ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied CSS!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Active CSS</span>
                </>
              )}
            </button>

            {activeFileName !== "default" && (
              <button
                type="button"
                onClick={() => handleSelectTheme("default")}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Search, Sort & Tags Filter Row */}
        <div className="mt-5 flex flex-col gap-3 border-t border-zinc-200/80 pt-4 dark:border-zinc-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setVisibleCount(48)
                }}
                placeholder="Search 870+ themes by name, author, or style (e.g. Claude, Cyberpunk, Catppuccin, Nord, Rose Pine)..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-2 pl-10 pr-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100 dark:focus:bg-zinc-900"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "popular" | "newest" | "name")
                }
                aria-label="Sort themes"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-700 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Added</option>
                <option value="name">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {POPULAR_TAGS.map((tag) => {
              const active = selectedTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSelectedTag(tag)
                    setVisibleCount(48)
                  }}
                  className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Themes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="h-44 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100/60 dark:border-zinc-800 dark:bg-zinc-900/50"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Default Ethereal Card */}
            {(!search ||
              "ethereal default".includes(search.toLowerCase())) &&
              selectedTag === "all" && (
                <div
                  onClick={() => handleSelectTheme("default")}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-3.5 transition-all cursor-pointer ${
                    activeFileName === "default"
                      ? "border-blue-600 ring-2 ring-blue-500/20 bg-white dark:bg-zinc-900"
                      : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
                  }`}
                >
                  {/* Mini UI Preview Box */}
                  <div
                    className="rounded-xl border border-black/10 p-3 dark:border-white/10"
                    style={{
                      backgroundColor: dark ? "#09090b" : "#ffffff",
                      color: dark ? "#fafafa" : "#09090b",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: "#2563eb" }}
                        />
                        <span className="text-[11px] font-bold">
                          Ethereal Default
                        </span>
                      </div>
                      <span
                        className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white"
                        style={{ backgroundColor: "#2563eb" }}
                      >
                        Built-in
                      </span>
                    </div>
                    <div
                      className="mt-2.5 rounded-lg p-2"
                      style={{
                        backgroundColor: dark ? "#121215" : "#f4f4f5",
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-12 rounded-full bg-current opacity-70" />
                        <span
                          className="ml-auto h-3.5 w-8 rounded text-[8px] font-bold flex items-center justify-center text-white"
                          style={{ backgroundColor: "#2563eb" }}
                        >
                          UI
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        Ethereal Default
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        by Ethereal UI
                      </div>
                    </div>
                    {activeFileName === "default" && (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              )}

            {visibleThemes.map((item) => {
              const isSelected = activeFileName === item.fileName
              const pal = dark
                ? item.previewColors.dark
                : item.previewColors.light

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectTheme(item.fileName)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-3.5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-500/25 bg-white dark:bg-zinc-900"
                      : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
                  }`}
                >
                  {/* Simulated Mini Card Preview */}
                  <div
                    className="rounded-xl border border-black/10 p-3 transition-transform group-hover:scale-[1.01] dark:border-white/10"
                    style={{
                      backgroundColor: pal.background,
                      color: pal.foreground,
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: pal.primary }}
                        />
                        <span className="text-[11px] font-bold truncate">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className="h-2.5 w-2.5 rounded-xs border border-black/10 dark:border-white/15"
                          style={{ backgroundColor: pal.secondary }}
                        />
                        <span
                          className="h-2.5 w-2.5 rounded-xs border border-black/10 dark:border-white/15"
                          style={{ backgroundColor: pal.accent }}
                        />
                      </div>
                    </div>

                    <div
                      className="mt-2.5 rounded-lg border border-black/5 p-2 dark:border-white/5"
                      style={{ backgroundColor: pal.card }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div
                            className="h-2 w-16 rounded-full opacity-80"
                            style={{ backgroundColor: pal.foreground }}
                          />
                          <div
                            className="h-1.5 w-10 rounded-full opacity-40"
                            style={{ backgroundColor: pal.foreground }}
                          />
                        </div>
                        <span
                          className="rounded px-2 py-0.5 text-[9px] font-bold"
                          style={{
                            backgroundColor: pal.primary,
                            color: pal.background,
                          }}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {item.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        <span className="truncate">by {item.author}</span>
                        {item.likeCount > 0 && (
                          <span className="inline-flex items-center gap-0.5 text-zinc-400 shrink-0">
                            <Heart className="h-2.5 w-2.5 fill-current text-rose-400" />
                            {item.likeCount}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => openInspectModal(item, e)}
                        title="Inspect CSS Variables"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleCopyCss(item, e)}
                        title="Copy Theme CSS"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredThemes.length === 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                No themes found matching &ldquo;{search}&rdquo;
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Try clearing the search query or selecting a different category tag.
              </p>
            </div>
          )}

          {filteredThemes.length > visibleCount && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 60)}
                className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-6 py-2.5 text-xs font-semibold text-zinc-800 shadow-2xs transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <span>
                  Load More Themes ({filteredThemes.length - visibleCount}{" "}
                  remaining)
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {/* CSS Variable Inspector Modal */}
      {inspectingTheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setInspectingTheme(null)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {inspectingTheme.name} — CSS Variables
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Paste into your <code className="font-mono">globals.css</code>{" "}
                  or download <code className="font-mono">/themes/{inspectingTheme.fileName}</code>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {inspectingTheme.fileName !== "default" && (
                  <a
                    href={`/themes/${encodeURIComponent(inspectingTheme.fileName)}`}
                    download={inspectingTheme.fileName}
                    className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download .css</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleCopyCss(inspectingTheme)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 text-xs font-semibold text-white cursor-pointer"
                >
                  {copiedId === inspectingTheme.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy CSS</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setInspectingTheme(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <pre className="flex-1 overflow-auto bg-zinc-950 p-5 text-xs font-mono leading-relaxed text-zinc-100">
              <code>{inspectCssText}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

