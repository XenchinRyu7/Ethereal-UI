export type RegistryCategory = "primitives" | "charts" | "blocks" | "templates"

export interface RegistryVariantSection {
  id: string
  title: string
  description: string
  code: string
}

export interface RegistryItem {
  slug: string
  title: string
  category: RegistryCategory
  subcategory: string
  description: string
  isNew?: boolean
  dependencies: string[]
  sourceFile: string
  code: string
  sections: RegistryVariantSection[]
}

export const REGISTRY_ITEMS: RegistryItem[] = [
  // ============================================================================
  // BASE COMPONENTS (One-by-one, matching BoardUI sidebar)
  // ============================================================================
  {
    slug: "accordion",
    title: "Accordion",
    category: "primitives",
    subcategory: "Base",
    description:
      "Vertically stacked collapsible panels for FAQs, settings sections, and progressive disclosure.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/dialog.tsx",
    code: `import { Accordion } from "@etherealui/react"

export function AccordionDemo() {
  return (
    <Accordion
      className="max-w-md"
      items={[
        {
          id: "item-1",
          title: "How does automatic theme switching work?",
          content: "All components use semantic CSS variables that adapt to light and dark mode automatically.",
        },
        {
          id: "item-2",
          title: "Can I copy individual components without installing the full package?",
          content: "Yes. Use the CLI or copy the source code directly from the Manual tab.",
        },
        {
          id: "item-3",
          title: "Are enterprise blocks included for free?",
          content: "Every component, dashboard block, and template is 100% open-source under the MIT license.",
        },
      ]}
    />
  )
}`,
    sections: [
      {
        id: "default-open",
        title: "Default expanded state",
        description: "Pass defaultOpenId to control which item starts expanded on mount.",
        code: `<Accordion defaultOpenId="item-2" items={items} />`,
      },
    ],
  },
  {
    slug: "announcement",
    title: "Announcement",
    category: "primitives",
    subcategory: "Base",
    description:
      "A compact pill banner with a highlight badge and directional arrow for product launches and changelogs.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/dialog.tsx",
    code: `import { Announcement } from "@etherealui/react"

export function AnnouncementDemo() {
  return (
    <Announcement
      tag="New"
      title="Introducing 35+ light & dark mode components"
      href="/components/avatar"
    />
  )
}`,
    sections: [
      {
        id: "tags",
        title: "Custom tag labels",
        description: "Customize the leading pill text for releases, beta features, or announcements.",
        code: `<Announcement tag="v1.0" title="Explore our new dashboard blocks" />`,
      },
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    category: "primitives",
    subcategory: "Base",
    description:
      "A photo or initials avatar in four sizes (20 / 24 / 32 / 36px) with neutral and blue initial tints - used across tables, breadcrumbs, menus, and the sidebar.",
    dependencies: ["class-variance-authority"],
    sourceFile: "packages/ui/src/primitives/avatar.tsx",
    code: `import { Avatar } from "@etherealui/react"

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
        alt="Sarah Jenkins"
      />
      <Avatar fallback="B" tint="blue" />
      <Avatar fallback="M" tint="neutral" />
    </div>
  )
}`,
    sections: [
      {
        id: "sizes",
        title: "Sizes",
        description: "Four standard sizes (20px xs, 24px sm, 32px default, and 36px lg) for dense tables or profile headers.",
        code: `<div className="flex items-center gap-3">
  <Avatar size="xs" fallback="B" tint="blue" />
  <Avatar size="sm" fallback="B" tint="blue" />
  <Avatar size="default" fallback="B" tint="blue" />
  <Avatar size="lg" fallback="B" tint="blue" />
</div>`,
      },
      {
        id: "initial-tints",
        title: "Initial tints",
        description: "Use neutral, blue, emerald, or amber tints when a user photo is unavailable.",
        code: `<div className="flex items-center gap-3">
  <Avatar fallback="M" tint="neutral" />
  <Avatar fallback="B" tint="blue" />
  <Avatar fallback="E" tint="emerald" />
  <Avatar fallback="A" tint="amber" />
</div>`,
      },
      {
        id: "photo",
        title: "Photo & Avatar Group",
        description: "Stack multiple avatars with an automatic overflow counter.",
        code: `<AvatarGroup
  max={4}
  items={[
    { alt: "Sarah", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
    { alt: "Ben", fallback: "B", tint: "blue" },
    { alt: "Marcus", fallback: "M", tint: "neutral" },
    { alt: "Elena", fallback: "E", tint: "emerald" },
    { alt: "Kenji", fallback: "K", tint: "neutral" },
  ]}
/>`,
      },
    ],
  },
  {
    slug: "badge",
    title: "Badge",
    category: "primitives",
    subcategory: "Base",
    description:
      "Compact status indicators and semantic labels with optional dot indicators for tables, cards, and navigation items.",
    dependencies: ["class-variance-authority"],
    sourceFile: "packages/ui/src/primitives/badge.tsx",
    code: `import { Badge } from "@etherealui/react"

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Badge variant="default">Neutral</Badge>
      <Badge variant="blue" dot>Active</Badge>
      <Badge variant="emerald" dot>Completed</Badge>
      <Badge variant="amber" dot>Pending</Badge>
      <Badge variant="rose" dot>Failed</Badge>
    </div>
  )
}`,
    sections: [
      {
        id: "dot-indicators",
        title: "Status dots",
        description: "Add the dot prop to display a status indicator circle next to the label.",
        code: `<Badge variant="emerald" dot>Operational</Badge>`,
      },
    ],
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    category: "primitives",
    subcategory: "Base",
    description:
      "Displays the current page hierarchy within a workspace so users can navigate back to parent views.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/dialog.tsx",
    code: `import { Breadcrumb } from "@etherealui/react"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { label: "Workspace", href: "#" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumb" },
      ]}
    />
  )
}`,
    sections: [],
  },
  {
    slug: "button",
    title: "Button",
    category: "primitives",
    subcategory: "Base",
    description:
      "Interactive button primitive with six semantic variants, four sizes, and built-in loading spinner support.",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/button.tsx",
    code: `import { Button } from "@etherealui/react"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}`,
    sections: [
      {
        id: "sizes",
        title: "Sizes",
        description: "Available in small (32px), default (36px), large (40px), and square icon sizes.",
        code: `<div className="flex items-center gap-2.5">
  <Button size="sm" variant="outline">Small</Button>
  <Button size="default" variant="outline">Default</Button>
  <Button size="lg" variant="primary">Large</Button>
</div>`,
      },
      {
        id: "loading",
        title: "Loading state",
        description: "Pass loading={true} to disable interaction and render an inline spinner.",
        code: `<Button variant="primary" loading>Saving changes</Button>`,
      },
    ],
  },
  {
    slug: "button-group",
    title: "Button Group",
    category: "primitives",
    subcategory: "Base",
    description:
      "Groups related action buttons or view toggles into a unified segmented container.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/button.tsx",
    code: `import { Button, ButtonGroup } from "@etherealui/react"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="ghost" size="sm">Day</Button>
      <Button variant="secondary" size="sm">Week</Button>
      <Button variant="ghost" size="sm">Month</Button>
    </ButtonGroup>
  )
}`,
    sections: [],
  },
  {
    slug: "carousel",
    title: "Carousel",
    category: "primitives",
    subcategory: "Base",
    description:
      "A stepped card switcher for cycling through metric highlights, onboarding steps, or media slides.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/date-picker.tsx",
    code: `import { Carousel } from "@etherealui/react"

export function CarouselDemo() {
  return <Carousel />
}`,
    sections: [],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    category: "primitives",
    subcategory: "Base",
    description:
      "Accessible Radix UI checkbox control for forms, bulk table row selection, and filter lists.",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/switch.tsx",
    code: `import { Checkbox } from "@etherealui/react"

export function CheckboxDemo() {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
        <Checkbox defaultChecked />
        <span>Send weekly analytics digest via email</span>
      </label>
      <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
        <Checkbox />
        <span>Require two-factor authentication for all members</span>
      </label>
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "chip",
    title: "Chip",
    category: "primitives",
    subcategory: "Base",
    description:
      "Interactive pill tags with optional remove buttons for active filters, multi-select inputs, and categories.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/badge.tsx",
    code: `import { Chip } from "@etherealui/react"

export function ChipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip active onRemove={() => {}}>Status: Active</Chip>
      <Chip onRemove={() => {}}>Plan: Enterprise</Chip>
      <Chip>Region: US-East</Chip>
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "close-button",
    title: "Close Button",
    category: "primitives",
    subcategory: "Base",
    description:
      "Standardized dismiss button for modals, drawers, alerts, and toast notifications.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/button.tsx",
    code: `import { CloseButton } from "@etherealui/react"

export function CloseButtonDemo() {
  return (
    <div className="flex items-center gap-3">
      <CloseButton size="sm" />
      <CloseButton size="default" />
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "color-picker",
    title: "Color Picker",
    category: "primitives",
    subcategory: "Base",
    description:
      "Hex color input paired with preset brand swatches for workspace customization and chart series coloring.",
    isNew: true,
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/date-picker.tsx",
    code: `import { ColorPicker } from "@etherealui/react"

export function ColorPickerDemo() {
  return <ColorPicker />
}`,
    sections: [],
  },
  {
    slug: "combobox",
    title: "Combobox",
    category: "primitives",
    subcategory: "Base",
    description:
      "Searchable dropdown selector with instant filtering, checkmarks, and optional right-aligned metadata badges.",
    isNew: true,
    dependencies: ["@radix-ui/react-popover", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/select.tsx",
    code: `import * as React from "react"
import { Combobox } from "@etherealui/react"

export function ComboboxDemo() {
  const [value, setValue] = React.useState("us-east")
  return (
    <Combobox
      className="w-64"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "us-east", label: "US East (N. Virginia)", badge: "Primary" },
        { value: "eu-central", label: "EU Central (Frankfurt)", badge: "EU" },
        { value: "ap-south", label: "Asia Pacific (Singapore)", badge: "APAC" },
      ]}
    />
  )
}`,
    sections: [],
  },
  {
    slug: "command-palette",
    title: "Command Palette",
    category: "primitives",
    subcategory: "Base",
    description:
      "Keyboard-first Cmd+K search modal with categorized results and shortcut hints.",
    isNew: true,
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/command-palette.tsx",
    code: `import * as React from "react"
import { CommandPalette, Button } from "@etherealui/react"

export function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command Palette (⌘K)
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  )
}`,
    sections: [],
  },
  {
    slug: "context-menu",
    title: "Context Menu",
    category: "primitives",
    subcategory: "Base",
    description:
      "Right-click contextual action menu with keyboard shortcut labels and destructive item styling.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/dropdown-menu.tsx",
    code: `import { ContextMenuBox } from "@etherealui/react"

export function ContextMenuDemo() {
  return (
    <ContextMenuBox
      actions={[
        { label: "View details", shortcut: "⌘ I" },
        { label: "Duplicate row", shortcut: "⌘ D" },
        { label: "Delete record", shortcut: "⌘ ⌫", destructive: true },
      ]}
      className="flex h-36 w-80 items-center justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-xs text-zinc-500"
    >
      Right-click anywhere here
    </ContextMenuBox>
  )
}`,
    sections: [],
  },
  {
    slug: "date-calendar",
    title: "Date Calendar",
    category: "primitives",
    subcategory: "Base",
    description:
      "Inline month calendar grid for selecting single dates or scheduling events.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/date-picker.tsx",
    code: `import { DateCalendar } from "@etherealui/react"

export function DateCalendarDemo() {
  return <DateCalendar />
}`,
    sections: [],
  },
  {
    slug: "date-picker",
    title: "Date Picker",
    category: "primitives",
    subcategory: "Base",
    description:
      "Popover date-range selector with common analytics reporting presets (Last 7 days, Last 30 days, YTD).",
    dependencies: ["@radix-ui/react-popover", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/date-picker.tsx",
    code: `import { DateRangePicker } from "@etherealui/react"

export function DatePickerDemo() {
  return <DateRangePicker />
}`,
    sections: [],
  },
  {
    slug: "divider",
    title: "Divider",
    category: "primitives",
    subcategory: "Base",
    description:
      "Horizontal structural hairline with an optional centered section label.",
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/dialog.tsx",
    code: `import { Divider } from "@etherealui/react"

export function DividerDemo() {
  return (
    <div className="w-80 space-y-4">
      <Divider />
      <Divider label="Or continue with" />
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "drawer",
    title: "Drawer",
    category: "primitives",
    subcategory: "Base",
    description:
      "Slide-over side panel anchored to the left or right viewport edge for inspecting table rows or forms.",
    isNew: true,
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/drawer.tsx",
    code: `import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, Button
} from "@etherealui/react"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Customer Details</DrawerTitle>
          <DrawerDescription>Subscription and billing breakdown</DrawerDescription>
        </DrawerHeader>
        <div className="py-6 text-xs text-zinc-500">
          Drawer body content goes here.
        </div>
        <DrawerFooter>
          <Button variant="primary" size="sm">Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
    sections: [],
  },
  {
    slug: "dropdown",
    title: "Dropdown",
    category: "primitives",
    subcategory: "Base",
    description:
      "Accessible menu overlay triggered by a button for row actions, profile menus, and quick settings.",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/dropdown-menu.tsx",
    code: `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button
} from "@etherealui/react"

export function DropdownDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem shortcut="⌘ E">Edit profile</DropdownMenuItem>
        <DropdownMenuItem shortcut="⌘ D">Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive shortcut="⌘ ⌫">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    sections: [],
  },
  {
    slug: "file-upload",
    title: "File Upload",
    category: "primitives",
    subcategory: "Base",
    description:
      "Drag-and-drop file upload zone with file size formatting and upload progress bars.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/date-picker.tsx",
    code: `import { FileDropzone } from "@etherealui/react"

export function FileUploadDemo() {
  return <FileDropzone className="w-full max-w-md" />
}`,
    sections: [],
  },
  {
    slug: "icon-button",
    title: "Icon Button",
    category: "primitives",
    subcategory: "Base",
    description:
      "Compact square button designed specifically for toolbar icons, table actions, and navigation controls.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/button.tsx",
    code: `import { Button } from "@etherealui/react"
import { Settings, Bell, Plus } from "lucide-react"

export function IconButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" aria-label="Settings">
        <Settings className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>
      <Button variant="primary" size="icon" aria-label="Add">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "input",
    title: "Input",
    category: "primitives",
    subcategory: "Base",
    description:
      "Single-line text input supporting leading/trailing icons and fixed text prefixes or suffixes.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/input.tsx",
    code: `import { Input, Label } from "@etherealui/react"

export function InputDemo() {
  return (
    <div className="w-80 space-y-3">
      <div className="space-y-1.5">
        <Label>Email address</Label>
        <Input placeholder="you@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label>Workspace URL</Label>
        <Input prefixText="https://" suffixText=".boardui.com" defaultValue="acme" />
      </div>
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "modal",
    title: "Modal",
    category: "primitives",
    subcategory: "Base",
    description:
      "Centered dialog window with backdrop blur, focus trapping, and accessible keyboard dismissal.",
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/dialog.tsx",
    code: `import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button
} from "@etherealui/react"

export function ModalDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Deploy a new workspace project in your organization.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="primary" size="sm">Create project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    sections: [],
  },
  {
    slug: "pagination",
    title: "Pagination",
    category: "primitives",
    subcategory: "Base",
    description:
      "Page number navigation bar with previous and next buttons for multi-page tables and lists.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/dialog.tsx",
    code: `import { Pagination } from "@etherealui/react"

export function PaginationDemo() {
  return <Pagination totalPages={5} initialPage={2} />
}`,
    sections: [],
  },
  {
    slug: "popover",
    title: "Popover",
    category: "primitives",
    subcategory: "Base",
    description:
      "Floating card anchored to a trigger button for quick settings, filters, and inline forms.",
    dependencies: ["@radix-ui/react-popover"],
    sourceFile: "packages/ui/src/primitives/tooltip.tsx",
    code: `import { Popover, PopoverTrigger, PopoverContent, Button, Input, Label } from "@etherealui/react"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Configure dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-3">
        <div className="text-xs font-semibold">Dimensions</div>
        <div className="space-y-1.5">
          <Label>Max width</Label>
          <Input defaultValue="100%" />
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
    sections: [],
  },
  {
    slug: "progress",
    title: "Progress",
    category: "primitives",
    subcategory: "Base",
    description:
      "Linear and circular progress bars for quota consumption, onboarding completion, and file uploads.",
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/progress.tsx",
    code: `import { Progress, CircularProgress } from "@etherealui/react"

export function ProgressDemo() {
  return (
    <div className="flex items-center gap-6 w-80">
      <CircularProgress value={72} variant="blue" />
      <Progress value={72} label="Storage used" showValue className="flex-1" />
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    category: "primitives",
    subcategory: "Base",
    description:
      "Mutually exclusive card selection group for billing plans, roles, and configuration options.",
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/switch.tsx",
    code: `import * as React from "react"
import { RadioGroup } from "@etherealui/react"

export function RadioGroupDemo() {
  const [plan, setPlan] = React.useState("pro")
  return (
    <RadioGroup
      className="w-80"
      value={plan}
      onValueChange={setPlan}
      options={[
        { value: "starter", label: "Starter — Free", description: "Up to 3 team members and 5 projects." },
        { value: "pro", label: "Pro — $29/mo", description: "Unlimited projects and custom domains." },
      ]}
    />
  )
}`,
    sections: [],
  },
  {
    slug: "select",
    title: "Select",
    category: "primitives",
    subcategory: "Base",
    description:
      "Native-feeling accessible dropdown menu built on Radix UI Select primitives.",
    dependencies: ["@radix-ui/react-select", "lucide-react"],
    sourceFile: "packages/ui/src/primitives/select.tsx",
    code: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@etherealui/react"

export function SelectDemo() {
  return (
    <Select defaultValue="admin">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Workspace Owner</SelectItem>
        <SelectItem value="admin">Administrator</SelectItem>
        <SelectItem value="member">Member</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
    sections: [],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    category: "primitives",
    subcategory: "Base",
    description:
      "Animated placeholder shapes that preview the layout of cards and tables while data is loading.",
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/skeleton.tsx",
    code: `import { CardSkeleton } from "@etherealui/react"

export function SkeletonDemo() {
  return <CardSkeleton className="w-80" />
}`,
    sections: [],
  },
  {
    slug: "slider",
    title: "Slider",
    category: "primitives",
    subcategory: "Base",
    description:
      "Range input control for selecting numeric values or percentages within a defined interval.",
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/switch.tsx",
    code: `import * as React from "react"
import { Slider } from "@etherealui/react"

export function SliderDemo() {
  const [val, setVal] = React.useState(65)
  return <Slider value={val} onValueChange={setVal} label="Alert threshold" className="w-72" />
}`,
    sections: [],
  },
  {
    slug: "switch",
    title: "Switch",
    category: "primitives",
    subcategory: "Base",
    description:
      "Two-state toggle switch built on Radix UI Switch for instant boolean preferences.",
    dependencies: ["@radix-ui/react-switch"],
    sourceFile: "packages/ui/src/primitives/switch.tsx",
    code: `import { Switch } from "@etherealui/react"

export function SwitchDemo() {
  return (
    <label className="flex items-center gap-3 text-xs font-medium cursor-pointer">
      <Switch defaultChecked />
      <span>Enable automatic backups</span>
    </label>
  )
}`,
    sections: [],
  },
  {
    slug: "table",
    title: "Table",
    category: "primitives",
    subcategory: "Base",
    description:
      "Clean, responsive tabular layout with subtle row hover states, avatars, and status badges.",
    dependencies: [],
    sourceFile: "packages/ui/src/blocks/data-table.tsx",
    code: `import { Avatar, Badge } from "@etherealui/react"

export function SimpleTableDemo() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-2.5 font-medium text-zinc-500">Member</th>
            <th className="px-4 py-2.5 font-medium text-zinc-500">Status</th>
            <th className="px-4 py-2.5 font-medium text-zinc-500 text-right">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
          <tr>
            <td className="px-4 py-2.5 flex items-center gap-2.5">
              <Avatar fallback="SR" tint="blue" size="xs" />
              <span className="font-medium">Saeful Rohman</span>
            </td>
            <td className="px-4 py-2.5"><Badge variant="emerald" dot>Active</Badge></td>
            <td className="px-4 py-2.5 text-right text-zinc-500">Owner</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "tabs",
    title: "Tabs",
    category: "primitives",
    subcategory: "Base",
    description:
      "Layered content views supporting Segmented, Underline, and Pill trigger styles.",
    dependencies: ["@radix-ui/react-tabs", "class-variance-authority"],
    sourceFile: "packages/ui/src/primitives/tabs.tsx",
    code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@etherealui/react"

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-80">
      <TabsList variant="segmented">
        <TabsTrigger variant="segmented" value="overview">Overview</TabsTrigger>
        <TabsTrigger variant="segmented" value="analytics">Analytics</TabsTrigger>
        <TabsTrigger variant="segmented" value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-xs text-zinc-500 pt-2">
        Overview metrics and recent activity.
      </TabsContent>
    </Tabs>
  )
}`,
    sections: [],
  },
  {
    slug: "textarea",
    title: "Textarea",
    category: "primitives",
    subcategory: "Base",
    description:
      "Multi-line text input with optional automatic height expansion as the user types.",
    dependencies: [],
    sourceFile: "packages/ui/src/primitives/input.tsx",
    code: `import { Textarea, Label } from "@etherealui/react"

export function TextareaDemo() {
  return (
    <div className="w-80 space-y-1.5">
      <Label optional>Project description</Label>
      <Textarea autoResize placeholder="Write a short summary..." />
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "toast",
    title: "Toast",
    category: "primitives",
    subcategory: "Base",
    description:
      "Non-disruptive notification card with semantic status icons (success, info, warning, error).",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/toast.tsx",
    code: `import { ToastCard } from "@etherealui/react"

export function ToastDemo() {
  return (
    <ToastCard
      variant="success"
      title="Changes saved"
      description="Your workspace settings have been updated."
    />
  )
}`,
    sections: [],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    category: "primitives",
    subcategory: "Base",
    description:
      "Compact floating label that appears on hover or keyboard focus to explain icon controls.",
    dependencies: ["@radix-ui/react-tooltip"],
    sourceFile: "packages/ui/src/primitives/tooltip.tsx",
    code: `import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from "@etherealui/react"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to workspace library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
    sections: [],
  },

  // ============================================================================
  // ENTERPRISE DASHBOARD BLOCKS (Individual blocks)
  // ============================================================================
  {
    slug: "sidebar",
    title: "Sidebar",
    category: "blocks",
    subcategory: "Navigation",
    description:
      "Collapsible application sidebar with workspace switcher, nested sub-menus, badge counters, and user profile footer.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/blocks/app-shell.tsx",
    code: `import { SidebarShell } from "@etherealui/react"

export function SidebarBlockDemo() {
  return <SidebarShell />
}`,
    sections: [],
  },
  {
    slug: "header-navbar",
    title: "Header Navbar",
    category: "blocks",
    subcategory: "Navigation",
    description:
      "Top application bar featuring breadcrumb navigation, Cmd+K quick search trigger, and notification bell.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/blocks/app-shell.tsx",
    code: `import { HeaderNavbar, PageHeaderBar } from "@etherealui/react"

export function HeaderNavbarDemo() {
  return (
    <div className="w-full space-y-6">
      <HeaderNavbar />
      <PageHeaderBar
        title="Revenue Overview"
        subtitle="Monthly recurring revenue and customer cohort metrics."
      />
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "stat-card",
    title: "Stat Card",
    category: "blocks",
    subcategory: "Metrics",
    description:
      "KPI metric card with percentage trend badge, comparison subtitle, and inline SVG sparkline.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/blocks/stat-cards.tsx",
    code: `import { StatMetricCard, ProgressMetricCard } from "@etherealui/react"

export function StatCardDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
      <StatMetricCard
        title="Monthly Recurring Revenue"
        value="$128,430"
        change="+14.2%"
        trend="up"
      />
      <ProgressMetricCard />
    </div>
  )
}`,
    sections: [],
  },
  {
    slug: "metric-grid",
    title: "Metric Grid",
    category: "blocks",
    subcategory: "Metrics",
    description:
      "Four-column responsive KPI grid displaying core business metrics and sparkline trends.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/blocks/stat-cards.tsx",
    code: `import { MultiMetricGrid } from "@etherealui/react"

export function MetricGridDemo() {
  return <MultiMetricGrid />
}`,
    sections: [],
  },
  {
    slug: "data-table",
    title: "Data Table",
    category: "blocks",
    subcategory: "Tables",
    description:
      "Full-featured customer data table with search toolbar, status tabs, column sorting, bulk selection, pagination, and a slide-over details drawer on row click.",
    isNew: true,
    dependencies: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "lucide-react"],
    sourceFile: "packages/ui/src/blocks/data-table.tsx",
    code: `import { EnterpriseDataTable } from "@etherealui/react"

export function DataTableDemo() {
  return <EnterpriseDataTable />
}`,
    sections: [],
  },
  {
    slug: "filter-bar",
    title: "Filter Bar",
    category: "blocks",
    subcategory: "Tables",
    description:
      "Multi-condition filter bar with search input, removable filter chips, date-range picker, and list/grid view toggle.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/blocks/filter-bar.tsx",
    code: `import { AdvancedFilterBar } from "@etherealui/react"

export function FilterBarDemo() {
  return <AdvancedFilterBar />
}`,
    sections: [],
  },
  {
    slug: "profile-form",
    title: "Profile Form",
    category: "blocks",
    subcategory: "Settings",
    description:
      "Account profile form block with avatar upload header, prefix username input, timezone select, and auto-resizing bio.",
    dependencies: ["@radix-ui/react-select", "lucide-react"],
    sourceFile: "packages/ui/src/blocks/settings-blocks.tsx",
    code: `import { UserProfileFormBlock } from "@etherealui/react"

export function ProfileFormDemo() {
  return <UserProfileFormBlock />
}`,
    sections: [],
  },
  {
    slug: "team-members",
    title: "Team Members",
    category: "blocks",
    subcategory: "Settings",
    description:
      "Workspace team directory with online presence avatars, role selector dropdowns, and member invitation flow.",
    dependencies: ["@radix-ui/react-select", "lucide-react"],
    sourceFile: "packages/ui/src/blocks/settings-blocks.tsx",
    code: `import { TeamRbacTableBlock } from "@etherealui/react"

export function TeamMembersDemo() {
  return <TeamRbacTableBlock />
}`,
    sections: [],
  },
  {
    slug: "security-settings",
    title: "Security Settings",
    category: "blocks",
    subcategory: "Settings",
    description:
      "Two-factor authentication toggles (TOTP & WebAuthn passkeys) paired with an active device session list.",
    dependencies: ["@radix-ui/react-switch", "lucide-react"],
    sourceFile: "packages/ui/src/blocks/settings-blocks.tsx",
    code: `import { SecurityPasswordFormBlock } from "@etherealui/react"

export function SecuritySettingsDemo() {
  return <SecurityPasswordFormBlock />
}`,
    sections: [],
  },
  {
    slug: "billing-card",
    title: "Billing Card",
    category: "blocks",
    subcategory: "Settings",
    description:
      "Subscription plan overview with seat/storage usage meters and default payment method management.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/blocks/settings-blocks.tsx",
    code: `import { BillingPlanCardBlock } from "@etherealui/react"

export function BillingCardDemo() {
  return <BillingPlanCardBlock />
}`,
    sections: [],
  },

  // ============================================================================
  // FULL PAGE TEMPLATES
  // ============================================================================
  {
    slug: "executive-analytics",
    title: "Analytics Dashboard",
    category: "templates",
    subcategory: "Templates",
    description:
      "Complete SaaS analytics dashboard combining the collapsible sidebar, 4 KPI cards, revenue chart, activity feed, and top accounts table.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/templates/executive-analytics.tsx",
    code: `import { ExecutiveAnalyticsTemplate } from "@etherealui/react"

export default function AnalyticsDashboardPage() {
  return <ExecutiveAnalyticsTemplate />
}`,
    sections: [],
  },
  {
    slug: "control-tower",
    title: "Customer Directory",
    category: "templates",
    subcategory: "Templates",
    description:
      "Full-page customer management view featuring the filter bar, sortable data table, and slide-over customer details drawer.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/templates/control-tower.tsx",
    code: `import { ControlTowerTemplate } from "@etherealui/react"

export default function CustomerDirectoryPage() {
  return <ControlTowerTemplate />
}`,
    sections: [],
  },
  {
    slug: "workspace-settings",
    title: "Workspace Settings",
    category: "templates",
    subcategory: "Templates",
    description:
      "Tabbed organization settings portal covering profile details, team members, billing usage, API keys, and security.",
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/templates/workspace-settings.tsx",
    code: `import { WorkspaceSettingsTemplate } from "@etherealui/react"

export default function WorkspaceSettingsPage() {
  return <WorkspaceSettingsTemplate />
}`,
    sections: [],
  },

  // ============================================================================
  // CHARTS (Dedicated Statistical Charts category in Sidebar)
  // ============================================================================
  {
    slug: "area-chart",
    title: "Area Chart",
    category: "charts",
    subcategory: "Charts",
    description:
      "Interactive SVG Area & Line velocity chart with timeframe switching (7D / 30D / 90D), gradient fill, comparison line, and live hover crosshair.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/chart.tsx",
    code: `import { AreaStatisticChart } from "@etherealui/react"

export function AreaChartDemo() {
  return (
    <AreaStatisticChart
      title="Net Revenue & MRR Velocity"
      subtitle="Real-time settled volume vs previous billing cycle"
      value="$128,430"
      change="+18.4%"
    />
  )
}`,
    sections: [],
  },
  {
    slug: "bar-chart",
    title: "Bar Chart",
    category: "charts",
    subcategory: "Charts",
    description:
      "Dual-series comparative bar chart for cohort conversion, monthly revenue, and quota benchmarks with hover value tooltips.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/chart.tsx",
    code: `import { BarStatisticChart } from "@etherealui/react"

export function BarChartDemo() {
  return (
    <BarStatisticChart
      title="Monthly Cohort Conversion"
      subtitle="Enterprise vs self-serve onboarding completion (%)"
    />
  )
}`,
    sections: [],
  },
  {
    slug: "line-chart",
    title: "Line Chart",
    category: "charts",
    subcategory: "Charts",
    description:
      "Multi-series telemetry line chart for tracking P95/P50 API latency, request throughput, and time-series benchmarks.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/chart.tsx",
    code: `import { LineStatisticChart } from "@etherealui/react"

export function LineChartDemo() {
  return (
    <LineStatisticChart
      title="Edge API Response Latency (ms)"
      subtitle="P95 vs P50 global edge worker response time over 24 hours"
    />
  )
}`,
    sections: [],
  },
  {
    slug: "donut-chart",
    title: "Donut Chart",
    category: "charts",
    subcategory: "Charts",
    description:
      "Multi-segment SVG ring chart with interactive segment highlighting, dynamic center total, and breakdown legend.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/chart.tsx",
    code: `import { DonutStatisticChart } from "@etherealui/react"

export function DonutChartDemo() {
  return (
    <DonutStatisticChart title="Revenue Distribution by Tier" />
  )
}`,
    sections: [],
  },
  {
    slug: "radial-chart",
    title: "Radial Ring Chart",
    category: "charts",
    subcategory: "Charts",
    description:
      "Concentric multi-ring KPI health score gauge for SLA uptime, cache efficiency, and quota completion.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/chart.tsx",
    code: `import { RadialStatisticChart } from "@etherealui/react"

export function RadialChartDemo() {
  return (
    <RadialStatisticChart
      title="Workspace Health & SLA Score"
      score={98}
    />
  )
}`,
    sections: [],
  },
  {
    slug: "heatmap-chart",
    title: "Activity Heatmap",
    category: "charts",
    subcategory: "Charts",
    description:
      "64-day contribution and production deployment intensity matrix with interactive cell hover inspection.",
    isNew: true,
    dependencies: ["lucide-react"],
    sourceFile: "packages/ui/src/primitives/chart.tsx",
    code: `import { HeatmapStatisticChart } from "@etherealui/react"

export function HeatmapChartDemo() {
  return (
    <HeatmapStatisticChart
      title="Deployment & Commit Frequency Heatmap"
      subtitle="64-day production release intensity across workspace repositories"
    />
  )
}`,
    sections: [],
  },
]

export function getRegistryByCategory(category: RegistryCategory) {
  return REGISTRY_ITEMS.filter((item) => item.category === category)
}

export function getRegistryBySlug(slug: string) {
  return REGISTRY_ITEMS.find((item) => item.slug === slug)
}

export const PRIMITIVE_ITEMS = getRegistryByCategory("primitives")
export const CHART_ITEMS = getRegistryByCategory("charts")
export const BLOCK_ITEMS = getRegistryByCategory("blocks")
export const TEMPLATE_ITEMS = getRegistryByCategory("templates")

