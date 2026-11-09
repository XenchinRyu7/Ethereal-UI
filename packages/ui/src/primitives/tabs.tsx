import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils/cn"

const Tabs = TabsPrimitive.Root

const tabsListVariants = cva("inline-flex items-center text-muted-foreground", {
  variants: {
    variant: {
      segmented:
        "h-9 rounded-lg border border-border bg-muted/80 p-1 gap-1",
      underline:
        "w-full justify-start border-b border-border bg-transparent gap-6 px-1",
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
          "rounded-md px-3 py-1 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-2xs hover:text-foreground",
        underline:
          "border-b-2 border-transparent pb-2.5 pt-1 text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground hover:text-foreground",
        pills:
          "rounded-lg px-3 py-1.5 border border-transparent data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 hover:bg-accent hover:text-accent-foreground",
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
