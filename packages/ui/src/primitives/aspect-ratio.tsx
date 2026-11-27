import * as React from "react"
import { cn } from "../utils/cn"

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, style, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(1 / ratio) * 100}%`,
          ...style,
        }}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        <div className="absolute inset-0 h-full w-full">{children}</div>
      </div>
    )
  }
)
AspectRatio.displayName = "AspectRatio"
