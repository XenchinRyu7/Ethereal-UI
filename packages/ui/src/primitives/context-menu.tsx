import * as React from "react"
import { cn } from "../utils/cn"

export interface ContextMenuAction {
  label: string
  shortcut?: string
  icon?: React.ReactNode
  destructive?: boolean
  onClick?: () => void
}

export interface ContextMenuBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  actions: ContextMenuAction[]
}

export const ContextMenuBox: React.FC<ContextMenuBoxProps> = ({
  actions,
  children,
  className,
  ...props
}) => {
  const [coords, setCoords] = React.useState<{ x: number; y: number } | null>(
    null
  )

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

