import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "../utils/cn"

export interface AnnouncementProps {
  tag?: string
  title: string
  href?: string
  className?: string
}

export const Announcement: React.FC<AnnouncementProps> = ({
  tag = "New",
  title,
  href = "#",
  className,
}) => (
  <a
    href={href}
    className={cn(
      "inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 shadow-2xs transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
      className
    )}
  >
    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
      {tag}
    </span>
    <span className="font-medium">{title}</span>
    <ArrowRight className="h-3 w-3 text-zinc-400" />
  </a>
)
Announcement.displayName = "Announcement"

