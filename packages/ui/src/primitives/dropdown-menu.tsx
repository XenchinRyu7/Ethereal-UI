import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "../utils/cn"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[11rem] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg focus:outline-none",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    shortcut?: string
    destructive?: boolean
  }
>(({ className, shortcut, destructive, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-xs outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      destructive
        ? "text-destructive focus:bg-destructive/10 focus:text-destructive"
        : "text-popover-foreground focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    <span className="flex items-center gap-2">{children}</span>
    {shortcut && (
      <span className="font-mono text-[10px] text-muted-foreground">{shortcut}</span>
    )}
  </DropdownMenuPrimitive.Item>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground", className)}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export interface ContextMenuAction {
  label: string
  shortcut?: string
  icon?: React.ReactNode
  destructive?: boolean
  onClick?: () => void
}

export interface ContextMenuBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: ContextMenuAction[]
}

const ContextMenuBox: React.FC<ContextMenuBoxProps> = ({
  actions,
  children,
  className,
  ...props
}) => {
  const [coords, setCoords] = React.useState<{ x: number; y: number } | null>(null)

  React.useEffect(() => {
    const close = () => setCoords(null)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [])

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        const rect = e.currentTarget.getBoundingClientRect()
        setCoords({
          x: Math.min(e.clientX - rect.left, rect.width - 180),
          y: Math.min(e.clientY - rect.top, rect.height - 140),
        })
      }}
      className={cn("relative select-none", className)}
      {...props}
    >
      {children}
      {coords && (
        <div
          style={{ left: coords.x, top: coords.y }}
          className="absolute z-40 min-w-[180px] rounded-xl border border-zinc-200 bg-white p-1 text-zinc-900 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {actions.map((act, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                act.onClick?.()
                setCoords(null)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer",
                act.destructive
                  ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/15"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              )}
            >
              <span className="flex items-center gap-2">
                {act.icon}
                {act.label}
              </span>
              {act.shortcut && (
                <span className="font-mono text-[10px] text-zinc-400">
                  {act.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
ContextMenuBox.displayName = "ContextMenuBox"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  ContextMenuBox,
}
