import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"

export const ThemeToggle: React.FC<{ floating?: boolean }> = ({
  floating = false,
}) => {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setDark(isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("ethereal-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("ethereal-theme", "light")
    }
  }

  if (floating) {
    return (
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
        <a
          href="/docs/theming"
          title="Theme Tokens"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-md transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Palette className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          title="Switch Light / Dark Mode"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-md transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      title="Switch Light / Dark Mode"
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

