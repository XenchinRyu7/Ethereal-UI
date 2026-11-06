import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../utils/cn"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => (
  <nav
    aria-label="Breadcrumb"
    className={cn("flex items-center gap-1.5 text-xs", className)}
  >
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1
      return (
        <React.Fragment key={item.label}>
          {idx > 0 && (
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          )}
          {item.href && !isLast ? (
            <a
              href={item.href}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {item.label}
            </span>
          )}
        </React.Fragment>
      )
    })}
  </nav>
)
Breadcrumb.displayName = "Breadcrumb"

