import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "../utils/cn"

export interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  timeout?: number
  label?: string
  copiedLabel?: string
  showText?: boolean
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      timeout = 2000,
      label = "Copy",
      copiedLabel = "Copied",
      showText = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (copied) return
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch (err) {
        console.error("Failed to copy text: ", err)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? copiedLabel : label}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white p-2 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer",
          copied && "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
          className
        )}
        {...props}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0" />
        )}
        {showText && <span>{copied ? copiedLabel : label}</span>}
      </button>
    )
  }
)
CopyButton.displayName = "CopyButton"
