import * as React from "react"
import { getStoredLanguage, setLanguage, type Language } from "../i18n/store"

export interface LanguageToggleProps {
  className?: string
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = "",
}) => {
  const [lang, setLangState] = React.useState<Language>("en")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setLangState(getStoredLanguage())
    setMounted(true)

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: Language }>
      if (customEvent.detail?.lang) {
        setLangState(customEvent.detail.lang)
      }
    }

    window.addEventListener("ethereal-lang-change", handleLangChange)
    return () => window.removeEventListener("ethereal-lang-change", handleLangChange)
  }, [])

  const handleToggle = (newLang: Language) => {
    setLangState(newLang)
    setLanguage(newLang)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`inline-flex h-8 items-center rounded-xl border border-zinc-200/90 bg-zinc-100/80 p-0.5 text-xs dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs ${className}`}>
        <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold text-zinc-500">ID</span>
        <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100">EN</span>
      </div>
    )
  }

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={`inline-flex h-8 items-center rounded-xl border border-zinc-200/90 bg-zinc-100/80 p-0.5 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => handleToggle("id")}
        aria-pressed={lang === "id"}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] transition-all cursor-pointer ${
          lang === "id"
            ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100 font-bold"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        }`}
        title="Bahasa Indonesia"
      >
        <span>ID</span>
      </button>

      <button
        type="button"
        onClick={() => handleToggle("en")}
        aria-pressed={lang === "en"}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] transition-all cursor-pointer ${
          lang === "en"
            ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100 font-bold"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        }`}
        title="English"
      >
        <span>EN</span>
      </button>
    </div>
  )
}
