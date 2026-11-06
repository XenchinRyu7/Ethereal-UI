import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../utils/cn"

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default"
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(({ className, size = "default", ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label="Close"
    className={cn(
      "inline-flex items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer",
      size === "sm" ? "h-6 w-6" : "h-8 w-8",
      className
    )}
    {...props}
  >
    <X className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
  </button>
))
CloseButton.displayName = "CloseButton"

