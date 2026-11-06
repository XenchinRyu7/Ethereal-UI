import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Search, CornerDownLeft, FileText, Settings, Users, Terminal, BarChart3 } from "lucide-react"
import { cn } from "../utils/cn"

export interface CommandItem {
  id: string
  label: string
  category: string
  shortcut?: string
  icon?: React.ReactNode
  onSelect?: () => void
}

export interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  items?: CommandItem[]
  placeholder?: string
  enableGlobalShortcut?: boolean
}

const defaultCommandItems: CommandItem[] = [
  {
    id: "overview",
    label: "Go to Analytics Overview",
    category: "Navigation",
    shortcut: "G A",
    icon: <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: "customers",
    label: "Search Customer Directory",
    category: "Navigation",
    shortcut: "G C",
    icon: <Users className="h-4 w-4 text-zinc-500" />,
  },
  {
    id: "docs-cli",
    label: "Copy CLI Installation Command",
    category: "Developer",
    shortcut: "⌘ C",
    icon: <Terminal className="h-4 w-4 text-zinc-500" />,
  },
  {
    id: "invoices",
    label: "Export Monthly Invoice PDF",
    category: "Billing",
    shortcut: "⌘ E",
    icon: <FileText className="h-4 w-4 text-zinc-500" />,
  },
  {
    id: "settings",
    label: "Open Workspace Preferences",
    category: "Settings",
    shortcut: "⌘ ,",
    icon: <Settings className="h-4 w-4 text-zinc-500" />,
  },
]

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open: controlledOpen,
  onOpenChange,
  items = defaultCommandItems,
  placeholder = "Type a command or search...",
  enableGlobalShortcut = true,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  React.useEffect(() => {
    if (!enableGlobalShortcut) return
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [enableGlobalShortcut, isOpen, setOpen])

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    )
  }, [items, query])

  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of filtered) {
      const list = map.get(item.category) || []
      list.push(item)
      map.set(item.category, list)
    }
    return Array.from(map.entries())
  }, [filtered])

  React.useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      )
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault()
      filtered[activeIndex].onSelect?.()
      setOpen(false)
    }
  }

  let flatCursor = -1

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          className="fixed left-1/2 top-[18%] z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <DialogPrimitive.Title className="sr-only">
            Command Palette
          </DialogPrimitive.Title>
          <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100"
            />
            <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
              ESC
            </kbd>
          </div>

          <div className="max-h-80 overflow-y-auto p-2 space-y-3">
            {grouped.length === 0 ? (
              <div className="py-10 text-center text-xs text-zinc-400">
                No matching results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              grouped.map(([category, groupItems]) => (
                <div key={category} className="space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    {category}
                  </div>
                  {groupItems.map((item) => {
                    flatCursor += 1
                    const idx = flatCursor
                    const isActive = idx === activeIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => {
                          item.onSelect?.()
                          setOpen(false)
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer",
                          isActive
                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                            : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </span>
                        {item.shortcut && (
                          <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                            {item.shortcut}
                          </kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Select
              </span>
              <span>↑↓ Navigate</span>
            </div>
            <span className="font-mono text-[10px]">Quick Search</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
