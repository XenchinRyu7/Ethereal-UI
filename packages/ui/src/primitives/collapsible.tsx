import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../utils/cn"

export interface CollapsibleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledOpen !== undefined
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const isOpen = isControlled ? controlledOpen : internalOpen

    const toggleOpen = () => {
      const next = !isOpen
      if (!isControlled) {
        setInternalOpen(next)
      }
      onOpenChange?.(next)
    }

    return (
      <CollapsibleContext.Provider value={{ isOpen, toggleOpen }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = "Collapsible"

interface CollapsibleContextValue {
  isOpen: boolean
  toggleOpen: () => void
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  isOpen: false,
  toggleOpen: () => {},
})

export interface CollapsibleTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showChevron?: boolean
}

export const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, children, showChevron = true, onClick, ...props }, ref) => {
  const { isOpen, toggleOpen } = React.useContext(CollapsibleContext)

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => {
        onClick?.(e)
        toggleOpen()
      }}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showChevron && (
        <ChevronDown
          className={cn(
            "h-4 w-4 text-zinc-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      )}
    </button>
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

export interface CollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { isOpen } = React.useContext(CollapsibleContext)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-xs text-zinc-600 dark:text-zinc-400 animate-in fade-in-0 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
CollapsibleContent.displayName = "CollapsibleContent"
