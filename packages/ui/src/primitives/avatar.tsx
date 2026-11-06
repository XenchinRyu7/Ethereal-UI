import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils/cn"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium select-none transition-colors",
  {
    variants: {
      size: {
        xs: "h-5 w-5 text-[10px]",
        sm: "h-6 w-6 text-[11px]",
        default: "h-8 w-8 text-xs",
        lg: "h-9 w-9 text-sm",
        xl: "h-11 w-11 text-sm",
      },
      tint: {
        neutral:
          "bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
        blue:
          "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
        emerald:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
        amber:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
      },
      ring: {
        none: "",
        subtle: "ring-1 ring-zinc-200 dark:ring-zinc-800",
        glow: "ring-2 ring-blue-500/40",
        emerald: "ring-2 ring-emerald-500/40",
      },
    },
    defaultVariants: {
      size: "default",
      tint: "neutral",
      ring: "none",
    },
  }
)

export type AvatarStatusType = "online" | "away" | "busy" | "offline"

const statusColorMap: Record<AvatarStatusType, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  busy: "bg-rose-500",
  offline: "bg-zinc-400 dark:bg-zinc-600",
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: AvatarStatusType
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, tint, ring, src, alt, fallback, status, children, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false)

    const initials = React.useMemo(() => {
      if (fallback) return fallback.slice(0, 2).toUpperCase()
      if (alt) {
        return alt
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      }
      return "B"
    }, [fallback, alt])

    return (
      <div className="relative inline-flex shrink-0" ref={ref} {...props}>
        <div className={cn(avatarVariants({ size, tint, ring, className }))}>
          {src && !imgError ? (
            <img
              src={src}
              alt={alt || "Avatar"}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            children || <span className="leading-none">{initials}</span>
          )}
        </div>
        {status && (
          <span
            aria-label={`Status: ${status}`}
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-zinc-950",
              size === "xs" || size === "sm" ? "h-1.5 w-1.5" : "h-2.5 w-2.5",
              statusColorMap[status]
            )}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    src?: string
    alt: string
    fallback?: string
    tint?: "neutral" | "blue" | "emerald" | "amber"
    status?: AvatarStatusType
  }>
  max?: number
  size?: "xs" | "sm" | "default" | "lg"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, items, max = 4, size = "default", ...props }, ref) => {
    const visible = items.slice(0, max)
    const remaining = items.length - visible.length

    return (
      <div
        ref={ref}
        className={cn("flex items-center -space-x-2", className)}
        {...props}
      >
        {visible.map((item, idx) => (
          <Avatar
            key={`${item.alt}-${idx}`}
            src={item.src}
            alt={item.alt}
            fallback={item.fallback}
            tint={item.tint || (idx % 2 === 1 ? "blue" : "neutral")}
            size={size}
            className="ring-2 ring-white dark:ring-zinc-950"
          />
        ))}
        {remaining > 0 && (
          <div
            className={cn(
              avatarVariants({ size, tint: "neutral" }),
              "ring-2 ring-white dark:ring-zinc-950 text-[11px] font-medium z-0"
            )}
          >
            +{remaining}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup, avatarVariants }
