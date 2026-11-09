import * as React from "react"
import {
  Moon,
  Sun,
  Palette,
  ChevronDown,
  Search,
  Check,
  Shuffle,
  RotateCcw,
  Copy,
  Heart,
  X,
  ExternalLink,
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

const QUICK_TAGS = [
  "all",
  "minimal",
  "professional",
  "dark",
  "cyberpunk",
  "retro",
  "pastel",
  "brutalist",
  "neon",
]

export const ThemeToggle: React.FC<{ floating?: boolean }> = ({
  floating = false,
}) => {
  const [dark, setDark] = React.useState(false)
  const [activeFileName, setActiveFileName] = React.useState("default")
  const [themes, setThemes] = React.useState<ThemeManifestItem[]>([])
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedTag, setSelectedTag] = React.useState("all")
  const [visibleLimit, setVisibleLimit] = React.useState(60)
  const [copiedCss, setCopiedCss] = React.useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setDark(getSavedDarkMode())
    setActiveFileName(getSavedColorTheme())

    loadThemesManifest().then((loaded) => {
      setThemes(loaded)
    })

    const handleThemeSync = (e: Event) => {
      const custom = e as CustomEvent<{ colorTheme: string; dark: boolean }>
      if (custom.detail) {
        setActiveFileName(custom.detail.colorTheme)
        setDark(custom.detail.dark)
      } else {
        setActiveFileName(getSavedColorTheme())
        setDark(getSavedDarkMode())
      }
    }

    window.addEventListener("ethereal-theme-change", handleThemeSync)
    return () => {
      window.removeEventListener("ethereal-theme-change", handleThemeSync)
    }
  }, [])

  React.useEffect(() => {
    if (!open) return
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    document.addEventListener("keydown", handleKeyDown)
    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus()
    }, 40)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleKeyDown)
      window.clearTimeout(timer)
    }
  }, [open])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    setDarkModePreference(next)
  }

  const selectTheme = (fileName: string) => {
    setActiveFileName(fileName)
    applyColorTheme(fileName)
  }

  const pickRandomTheme = () => {
    if (themes.length === 0) return
    const randomIndex = Math.floor(Math.random() * themes.length)
    const chosen = themes[randomIndex]
    if (chosen) {
      selectTheme(chosen.fileName)
    }
  }

  const copyActiveThemeCss = async () => {
    try {
      if (activeFileName === "default") {
        await navigator.clipboard.writeText(
          `:root {\n  --background: #ffffff;\n  --foreground: #09090b;\n  --primary: #2563eb;\n  --primary-foreground: #ffffff;\n}\n.dark {\n  --background: #09090b;\n  --foreground: #fafafa;\n  --primary: #3b82f6;\n  --primary-foreground: #ffffff;\n}`
        )
      } else {
        const res = await fetch(`/themes/${encodeURIComponent(activeFileName)}`)
        const cssText = await res.text()
        await navigator.clipboard.writeText(cssText)
      }
      setCopiedCss(true)
      window.setTimeout(() => setCopiedCss(false), 1800)
    } catch (err) {
      console.error("Failed to copy theme CSS:", err)
    }
  }

  const activeThemeObj = React.useMemo(() => {
    if (activeFileName === "default") return DEFAULT_ETHEREAL_THEME
    return (
      themes.find((t) => t.fileName === activeFileName) ||
      DEFAULT_ETHEREAL_THEME
    )
  }, [activeFileName, themes])

  const filteredThemes = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return themes.filter((item) => {
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
  }, [themes, search, selectedTag])

  const visibleThemes = React.useMemo(
    () => filteredThemes.slice(0, visibleLimit),
    [filteredThemes, visibleLimit]
  )

  const activePalette = dark
    ? activeThemeObj.previewColors.dark
    : activeThemeObj.previewColors.light

  const renderSwatches = (item: ThemeManifestItem) => {
    const pal = dark ? item.previewColors.dark : item.previewColors.light
    return (
      <span
        className="inline-flex items-center gap-0.5 rounded-md border border-black/10 p-0.5 dark:border-white/15 shrink-0"
        style={{ backgroundColor: pal.background }}
      >
        <span
          className="h-2.5 w-2.5 rounded-xs"
          style={{ backgroundColor: pal.primary }}
        />
        <span
          className="h-2.5 w-2.5 rounded-xs"
          style={{ backgroundColor: pal.accent }}
        />
        <span
          className="h-2.5 w-2.5 rounded-xs"
          style={{ backgroundColor: pal.secondary }}
        />
        <span
          className="h-2.5 w-2.5 rounded-xs border border-black/10 dark:border-white/10"
          style={{ backgroundColor: pal.card }}
        />
      </span>
    )
  }

  const renderDropdownPanel = () => {
    if (!open) return null
    return (
      <div
        className={`z-50 w-[330px] sm:w-[370px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 ${
          floating
            ? "fixed bottom-16 right-5"
            : "fixed inset-x-3 top-14 mx-auto sm: insets-auto sm:absolute sm:right-0 sm:left-auto sm:top-full sm:mt-2 sm:mx-0"
        }`}
      >
        {/* Top Header & Quick Actions */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-3.5 py-2.5 dark:border-zinc-800">
          <div className="flex items-center gap-2 min-w-0">
            <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                Ethereal Themes ({themes.length || "870+"})
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                Active: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{activeThemeObj.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={pickRandomTheme}
              title="Random Theme"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Shuffle className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={copyActiveThemeCss}
              title="Copy Active Theme CSS Variables"
              className="inline-flex h-7 items-center gap-1 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2 text-[10px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {copiedCss ? (
                <>
                  <Check className="h-3 w-3 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>CSS</span>
                </>
              )}
            </button>
            {activeFileName !== "default" && (
              <button
                type="button"
                onClick={() => selectTheme("default")}
                title="Reset to Default Ethereal Theme"
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              title="Close"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Search Input & Tag Filters */}
        <div className="space-y-2 border-b border-zinc-200/80 bg-zinc-50/50 p-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setVisibleLimit(60)
              }}
              placeholder="Search theme name, tag, or author..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-1.5 pl-8 pr-7 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar">
            {QUICK_TAGS.map((tag) => {
              const isSelected = selectedTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSelectedTag(tag)
                    setVisibleLimit(60)
                  }}
                  className={`shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-medium capitalize transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-200/70 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrollable Theme List */}
        <div className="max-h-[320px] overflow-y-auto divide-y divide-zinc-100 p-1.5 dark:divide-zinc-800/50">
          {/* Default Ethereal UI Option */}
          {(!search || "ethereal default".includes(search.toLowerCase())) &&
            selectedTag === "all" && (
              <button
                type="button"
                onClick={() => selectTheme("default")}
                className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer ${
                  activeFileName === "default"
                    ? "bg-blue-50/90 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                    : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {renderSwatches(DEFAULT_ETHEREAL_THEME)}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        Ethereal Default
                      </span>
                      <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[9px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                        Built-in
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      Precision Zinc &amp; Electric Blue
                    </div>
                  </div>
                </div>
                {activeFileName === "default" && (
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                )}
              </button>
            )}

          {visibleThemes.map((item) => {
            const isSelected = activeFileName === item.fileName
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectTheme(item.fileName)}
                className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/90 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                    : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {renderSwatches(item)}
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      <span className="truncate">by {item.author}</span>
                      {item.likeCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-zinc-400">
                          <Heart className="h-2.5 w-2.5 fill-current text-rose-400" />
                          {item.likeCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                )}
              </button>
            )
          })}

          {filteredThemes.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
              No themes found matching &ldquo;{search}&rdquo;
            </div>
          )}

          {filteredThemes.length > visibleLimit && (
            <div className="p-2 text-center">
              <button
                type="button"
                onClick={() => setVisibleLimit((prev) => prev + 80)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
              >
                Show more themes ({filteredThemes.length - visibleLimit} remaining)
              </button>
            </div>
          )}
        </div>

        {/* Footer Link to Full Theme Explorer */}
        <div className="flex items-center justify-between border-t border-zinc-200/80 bg-zinc-50/70 px-3.5 py-2 text-[11px] dark:border-zinc-800 dark:bg-zinc-950/50">
          <button
            type="button"
            onClick={toggleDark}
            className="inline-flex items-center gap-1.5 font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
          >
            {dark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span>Switch to Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-blue-600" />
                <span>Switch to Dark</span>
              </>
            )}
          </button>

          <a
            href="/themes"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>Explore All Themes</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    )
  }

  if (floating) {
    return (
      <div
        ref={containerRef}
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
      >
        {renderDropdownPanel()}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open Theme Selector"
          title="Choose Color Theme"
          className="flex h-9 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 shadow-lg transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <span
            className="h-3 w-3 rounded-full border border-black/15 dark:border-white/20"
            style={{ backgroundColor: activePalette.primary }}
          />
          <Palette className="h-3.5 w-3.5" />
          <span className="hidden sm:inline max-w-[96px] truncate">
            {activeThemeObj.name}
          </span>
        </button>
        <button
          type="button"
          onClick={toggleDark}
          aria-label="Toggle Light / Dark Mode"
          title="Switch Light / Dark Mode"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-lg transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center gap-1.5">
      {/* Theme Preset Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select Color Theme"
        title="Select Ethereal UI Theme"
        className="inline-flex h-8 items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/70 px-2.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
      >
        <span
          className="inline-flex items-center gap-0.5 rounded border border-black/10 p-0.5 dark:border-white/15"
          style={{ backgroundColor: activePalette.background }}
        >
          <span
            className="h-2 w-2 rounded-xs"
            style={{ backgroundColor: activePalette.primary }}
          />
          <span
            className="h-2 w-2 rounded-xs"
            style={{ backgroundColor: activePalette.accent }}
          />
          <span
            className="h-2 w-2 rounded-xs"
            style={{ backgroundColor: activePalette.card }}
          />
        </span>
        <span className="hidden md:inline max-w-[110px] truncate">
          {activeThemeObj.name}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </button>

      {/* Light / Dark Mode Button */}
      <button
        type="button"
        onClick={toggleDark}
        aria-label="Toggle theme"
        title="Switch Light / Dark Mode"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {renderDropdownPanel()}
    </div>
  )
}
