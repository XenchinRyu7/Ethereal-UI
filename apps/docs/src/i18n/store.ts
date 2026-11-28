import { translations, defaultLang, type Language, type TranslationKey } from "./translations"

export type { Language, TranslationKey }

const STORAGE_KEY = "ethereal-lang"

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return defaultLang
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored === "en" || stored === "id") return stored
    const browserLang = navigator.language.toLowerCase()
    return browserLang.startsWith("id") ? "id" : "en"
  } catch {
    return defaultLang
  }
}

export function setLanguage(lang: Language) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.setAttribute("data-lang", lang)
    applyTranslations()
    window.dispatchEvent(new CustomEvent("ethereal-lang-change", { detail: { lang } }))
  } catch (e) {
    console.error("Failed to set language:", e)
  }
}

export function t(key: TranslationKey, lang?: Language): string {
  const currentLang = lang || (typeof window !== "undefined" ? getStoredLanguage() : defaultLang)
  const dict = translations[currentLang] || translations[defaultLang]
  return (dict as Record<string, string>)[key] || (translations.en as Record<string, string>)[key] || key
}

export function applyTranslations(root: Document | HTMLElement = document) {
  if (typeof window === "undefined") return
  const currentLang = getStoredLanguage()
  const elements = root.querySelectorAll<HTMLElement>("[data-i18n]")

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n") as TranslationKey | null
    if (!key) return
    const text = t(key, currentLang)
    if (text) {
      el.textContent = text
    }
  })

  // Also support placeholder translation
  const placeholderEls = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-i18n-placeholder]")
  placeholderEls.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder") as TranslationKey | null
    if (!key) return
    const text = t(key, currentLang)
    if (text) {
      el.placeholder = text
    }
  })
}
