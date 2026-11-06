import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils/cn"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva("inline-flex items-center text-zinc-500 dark:text-zinc-400", {
  variants: {
    variant: {
      segmented:
        "h-9 rounded-lg border border-zinc-200 bg-zinc-100/80 p-1 gap-1 dark:border-zinc-800 dark:bg-zinc-900",
      underline:
        "w-full justify-start border-b border-zinc-200 bg-transparent gap-6 px-1 dark:border-zinc-800",
      pills: "gap-1.5 bg-transparent",
    },
  },
  defaultVariants: {
    variant: "segmented",
  },
})

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, className }))}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        segmented:
          "rounded-md px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-2xs hover:text-zinc-900 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-100 dark:hover:text-zinc-200",
        underline:
          "border-b-2 border-transparent pb-2.5 pt-1 text-zinc-500 data-[state=active]:border-blue-600 data-[state=active]:text-zinc-900 hover:text-zinc-800 dark:text-zinc-400 dark:data-[state=active]:border-blue-500 dark:data-[state=active]:text-zinc-100 dark:hover:text-zinc-200",
        pills:
          "rounded-lg px-3 py-1.5 border border-transparent data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-zinc-100 dark:data-[state=active]:bg-blue-500/15 dark:data-[state=active]:text-blue-300 dark:data-[state=active]:border-blue-500/30 dark:hover:bg-zinc-800",
      },
    },
    defaultVariants: {
      variant: "segmented",
    },
  }
)

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, className }))}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-3 focus-visible:outline-none", className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
