import * as React from "react"
import { Search, Layers, Box, LayoutTemplate, BookOpen } from "lucide-react"
import { CommandPalette, type CommandItem } from "@etherealui/react"
import { REGISTRY_ITEMS } from "../data/registry-catalog"

export const NavbarSearchModal: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const items: CommandItem[] = React.useMemo(() => {
    const docsItems: CommandItem[] = [
      {
        id: "doc-intro",
        label: "Overview & Architecture",
        category: "Guides",
        shortcut: "DOC",
        icon: <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
        onSelect: () => {
          window.location.href = "/docs/introduction"
        },
      },
      {
        id: "doc-install",
        label: "Installation & CLI Setup",
        category: "Guides",
        shortcut: "DOC",
        icon: <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
        onSelect: () => {
          window.location.href = "/docs/installation"
        },
      },
      {
        id: "doc-theming",
        label: "Light & Dark Theme Tokens",
        category: "Guides",
        shortcut: "DOC",
        icon: <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
        onSelect: () => {
          window.location.href = "/docs/theming"
        },
      },
    ]

    const catalogItems: CommandItem[] = REGISTRY_ITEMS.map((item) => ({
      id: item.slug,
      label: item.title,
      category:
        item.category === "primitives"
          ? "Base Components"
          : item.category === "charts"
          ? "Charts"
          : item.category === "blocks"
          ? "Blocks"
          : "Templates",
      shortcut: item.category === "primitives" ? "COMP" : item.category.toUpperCase(),
      icon:
        item.category === "primitives" ? (
          <Box className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        ) : item.category === "charts" ? (
          <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        ) : item.category === "blocks" ? (
          <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <LayoutTemplate className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        ),
      onSelect: () => {
        const base =
          item.category === "primitives"
            ? "/components"
            : item.category === "charts"
            ? "/charts"
            : item.category === "blocks"
            ? "/blocks"
            : "/templates"
        window.location.href = `${base}/${item.slug}`
      },
    }))

    return [...docsItems, ...catalogItems]
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-100/80 px-3 text-xs text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
      >
        <span className="flex items-center gap-2 truncate">
          <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <span className="truncate">Quick Search</span>
        </span>
        <kbd className="rounded bg-zinc-200/90 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 shrink-0">
          ⌘K
        </kbd>
      </button>

      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        placeholder="Search components, blocks, or templates..."
        enableGlobalShortcut={true}
      />
    </>
  )
}
