import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, ChevronDown, ChevronRight, ArrowRight, ChevronLeft } from "lucide-react"
import { cn } from "../utils/cn"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-3 border-t border-zinc-200 dark:border-zinc-800",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base font-semibold leading-none tracking-tight text-zinc-900 dark:text-zinc-100", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

// Accordion Primitive
export interface AccordionItemData {
  id: string
  title: string
  content: string
}

export const Accordion: React.FC<{
  items: AccordionItemData[]
  defaultOpenId?: string
  className?: string
}> = ({ items, defaultOpenId, className }) => {
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

// Announcement Pill Primitive
export const Announcement: React.FC<{
  tag?: string
  title: string
  href?: string
  className?: string
}> = ({ tag = "New", title, href = "#", className }) => (
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

// Breadcrumb Primitive
export const Breadcrumb: React.FC<{
  items: Array<{ label: string; href?: string }>
  className?: string
}> = ({ items, className }) => (
  <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-xs", className)}>
    {items.map((item, idx) => {
      const isLast = idx === items.length - 1
      return (
        <React.Fragment key={item.label}>
          {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />}
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

// Divider Primitive
export const Divider: React.FC<{ label?: string; className?: string }> = ({
  label,
  className,
}) => {
  if (!label) {
    return <hr className={cn("border-t border-zinc-200 dark:border-zinc-800", className)} />
  }
  return (
    <div className={cn("relative flex items-center py-2", className)}>
      <div className="grow border-t border-zinc-200 dark:border-zinc-800" />
      <span className="mx-3 shrink text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="grow border-t border-zinc-200 dark:border-zinc-800" />
    </div>
  )
}

// Pagination Primitive
export const Pagination: React.FC<{
  totalPages?: number
  initialPage?: number
  className?: string
}> = ({ totalPages = 5, initialPage = 1, className }) => {
  const [page, setPage] = React.useState(initialPage)
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const num = idx + 1
        const active = num === page
        return (
          <button
            key={num}
            type="button"
            onClick={() => setPage(num)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors cursor-pointer",
              active
                ? "bg-blue-600 text-white"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            )}
          >
            {num}
          </button>
        )
      })}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
