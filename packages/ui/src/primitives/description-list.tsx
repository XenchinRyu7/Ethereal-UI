import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "../utils/cn"
import { Badge } from "./badge"
import { Button } from "./button"

export interface DescriptionListItem {
  label: string
  value: string
  mono?: boolean
  copyable?: boolean
  badge?: string
  badgeVariant?: "blue" | "emerald" | "amber" | "rose" | "default"
}

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  items?: DescriptionListItem[]
}

const DEFAULT_DESCRIPTION_ITEMS: DescriptionListItem[] = [
  {
    label: "Beneficiary Account Holder",
    value: "PT Ethereal Cloud Nusantara Tbk",
    badge: "KYC Verified",
    badgeVariant: "emerald",
  },
  {
    label: "Virtual Account / IBAN",
    value: "ID88 0014 8920 4410 9920 01",
    mono: true,
    copyable: true,
  },
  {
    label: "SWIFT / BIC Routing Code",
    value: "ETHRIDJAXXX",
    mono: true,
    copyable: true,
  },
  {
    label: "HRMS Cost Center & Department",
    value: "CC-402 • Platform Engineering (Level E5)",
    badge: "Active",
    badgeVariant: "blue",
  },
  {
    label: "Settlement SLA & Approval Policy",
    value: "Real-Time Gross Settlement (RTGS) • Dual Maker-Checker",
  },
]

export const DescriptionList = React.forwardRef<
  HTMLDivElement,
  DescriptionListProps
>(
  (
    {
      className,
      title = "Account & Employee Dossier Details",
      subtitle = "Structured key-value metadata for Core Banking & HRMS records",
      items = DEFAULT_DESCRIPTION_ITEMS,
      ...props
    },
    ref
  ) => {
    const [copiedKey, setCopiedKey] = React.useState<string | null>(null)

    const handleCopy = (label: string, val: string) => {
      navigator.clipboard?.writeText(val)
      setCopiedKey(label)
      setTimeout(() => setCopiedKey(null), 1600)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div className="border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-800">
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {subtitle}
          </p>
        </div>

        <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">
                {item.label}
              </dt>
              <dd className="flex items-center gap-2 text-xs font-medium text-zinc-900 dark:text-zinc-100">
                <span className={cn(item.mono && "font-mono")}>
                  {item.value}
                </span>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant || "default"}
                    className="px-1.5 py-0 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
                {item.copyable && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => handleCopy(item.label, item.value)}
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedKey === item.label ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <Copy className="h-3 w-3 text-zinc-400" />
                    )}
                  </Button>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }
)

DescriptionList.displayName = "DescriptionList"

