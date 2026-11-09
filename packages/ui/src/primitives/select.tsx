import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Check, ChevronDown, Search, ChevronsUpDown } from "lucide-react"
import { cn } from "../utils/cn"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer shadow-2xs",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-72 min-w-[8rem] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-8 pr-2.5 text-xs text-popover-foreground outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export interface ComboboxOption {
  value: string
  label: string
  badge?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  className,
}) => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const selected = options.find((o) => o.value === value)
  const filtered = React.useMemo(() => {
    if (!query.trim()) return options
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase())
    )
  }, [options, query])

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-2xs",
            className
          )}
        >
          <span className={cn("truncate", !selected && "text-muted-foreground")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-50 w-64 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg focus:outline-none"
        >
          <div className="flex items-center gap-2 border-b border-border px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs text-popover-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="mt-1 max-h-52 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="py-4 text-center text-xs text-muted-foreground">
                No matching items found.
              </div>
            ) : (
              filtered.map((opt) => {
                const isSelected = opt.value === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onValueChange(opt.value)
                      setOpen(false)
                      setQuery("")
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Check
                        className={cn(
                          "h-3.5 w-3.5",
                          isSelected ? "opacity-100 text-primary" : "opacity-0"
                        )}
                      />
                      {opt.label}
                    </span>
                    {opt.badge && (
                      <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {opt.badge}
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
Combobox.displayName = "Combobox"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Combobox,
}
