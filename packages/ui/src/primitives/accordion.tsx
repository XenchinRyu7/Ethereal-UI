import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../utils/cn"

export interface AccordionItemData {
  id: string
  title: string
  content: string
}

export interface AccordionProps {
  items: AccordionItemData[]
  defaultOpenId?: string
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  className,
}) => {
  const [openId, setOpenId] = React.useState<string | null>(
    defaultOpenId ?? items[0]?.id ?? null
  )
  return (
    <div
      className={cn(
        "w-full divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-4 py-3.5 text-left text-xs font-medium text-zinc-900 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800/50 cursor-pointer"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-zinc-400 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-3.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
Accordion.displayName = "Accordion"

