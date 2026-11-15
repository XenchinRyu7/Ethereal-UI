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
  syncThemeGoogleFonts,
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

export const ThemeToggle: React.FC = () => {
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
    const initialTheme = getSavedColorTheme()
    setActiveFileName(initialTheme)
    if (initialTheme && initialTheme !== "default") {
      applyColorTheme(initialTheme)
    }
    syncThemeGoogleFonts()

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
      <>
        {/* Mobile Backdrop (< sm) */}
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Dropdown Panel (Responsive: centered modal on mobile, anchored popover on tablet/desktop) */}
        <div
          className="fixed inset-x-3 top-14 sm:top-auto sm:inset-auto z-50 mx-auto w-auto max-w-[390px] sm:max-w-none sm:w-[380px] sm:absolute sm:top-full sm:right-0 sm:mt-2 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl flex flex-col max-h-[calc(100vh-5rem)] sm:max-h-[540px]"
        >
          {/* Top Header & Quick Actions */}
          <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <Palette className="h-4 w-4 text-primary shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold text-foreground truncate">
                  Ethereal Themes ({themes.length || "870+"})
                </div>
                <div className="text-[10px] text-muted-foreground truncate">
                  Active: <span className="font-semibold text-foreground">{activeThemeObj.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={pickRandomTheme}
                title="Random Theme"
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <Shuffle className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={copyActiveThemeCss}
                title="Copy Active Theme CSS Variables"
                className="inline-flex h-7 items-center gap-1 rounded-lg border border-border bg-muted/50 px-2 text-[10px] font-semibold text-foreground transition-colors hover:bg-muted cursor-pointer"
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
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                title="Close"
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Search Input & Tag Filters */}
          <div className="space-y-2 border-b border-border bg-muted/30 p-2.5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setVisibleLimit(60)
                }}
                placeholder="Search theme name, tag, or author..."
                className="w-full rounded-xl border border-border bg-background py-1.5 pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
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
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Scrollable Theme List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/30 p-1.5 max-h-[min(52vh,340px)]">
            {/* Default Ethereal UI Option */}
            {(!search || "ethereal default".includes(search.toLowerCase())) &&
              selectedTag === "all" && (
                <button
                  type="button"
                  onClick={() => selectTheme("default")}
                  className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer ${
                    activeFileName === "default"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-accent/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {renderSwatches(DEFAULT_ETHEREAL_THEME)}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-foreground truncate">
                          Ethereal Default
                        </span>
                        <span className="rounded bg-primary/15 text-primary border border-primary/20 px-1.5 py-0.2 text-[9px] font-semibold">
                          Built-in
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        Precision Zinc &amp; Electric Blue
                      </div>
                    </div>
                  </div>
                  {activeFileName === "default" && (
                    <Check className="h-4 w-4 text-primary shrink-0" />
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
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-accent/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {renderSwatches(item)}
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground truncate">
                        <span className="truncate">by {item.author}</span>
                        {item.likeCount > 0 && (
                          <span className="inline-flex items-center gap-0.5 text-muted-foreground">
                            <Heart className="h-2.5 w-2.5 fill-current text-rose-500" />
                            {item.likeCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  )}
                </button>
              )
            })}

            {filteredThemes.length === 0 && (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No themes found matching &ldquo;{search}&rdquo;
              </div>
            )}

            {filteredThemes.length > visibleLimit && (
              <div className="p-2 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((prev) => prev + 80)}
                  className="w-full rounded-xl border border-border bg-muted/60 py-1.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                >
                  Show more themes ({filteredThemes.length - visibleLimit} remaining)
                </button>
              </div>
            )}
          </div>

          {/* Footer Link to Full Theme Explorer & Mode Switcher */}
          <div className="flex items-center justify-between border-t border-border bg-muted/40 px-3.5 py-2 text-[11px] text-muted-foreground">
            <button
              type="button"
              onClick={toggleDark}
              className="inline-flex items-center gap-1.5 font-medium hover:text-foreground cursor-pointer"
            >
              {dark ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-primary" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <a
              href="/themes"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              <span>Explore All Themes</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center gap-1 sm:gap-1.5">
      {/* Theme Preset Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Select Color Theme"
        title="Select Ethereal UI Theme"
        className="inline-flex h-8 items-center gap-1.5 sm:gap-2 rounded-lg border border-border bg-card px-2 sm:px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent cursor-pointer"
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
        <span className="hidden md:inline max-w-[100px] lg:max-w-[120px] truncate text-[11px] lg:text-xs">
          {activeThemeObj.name}
        </span>
        <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground shrink-0" />
      </button>

      {/* Light / Dark Mode Button */}
      <button
        type="button"
        onClick={toggleDark}
        aria-label="Toggle light or dark theme"
        title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer shrink-0"
      >
        {dark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
      </button>

      {renderDropdownPanel()}
    </div>
  )
}
