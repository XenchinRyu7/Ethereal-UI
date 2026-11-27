import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../utils/cn"

export interface HoverCardProps {
  children: React.ReactNode
  content: React.ReactNode
  openDelay?: number
  closeDelay?: number
  className?: string
  contentClassName?: string
}

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  openDelay = 150,
  closeDelay = 200,
  className,
  contentClassName,
}) => {
  const [open, setOpen] = React.useState(false)
  const openTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = setTimeout(() => setOpen(true), openDelay)
  }

  const handleMouseLeave = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("inline-flex items-center", className)}
        >
          {children}
        </div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={8}
          align="center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "z-50 w-68 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xl outline-none animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950",
            contentClassName
          )}
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
HoverCard.displayName = "HoverCard"
