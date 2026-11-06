import * as React from "react"
import { Button, type ButtonProps } from "./button"
import { cn } from "../utils/cn"

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  label: string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, className, children, ...props }, ref) => (
    <Button
      ref={ref}
      size="icon"
      aria-label={label}
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </Button>
  )
)
IconButton.displayName = "IconButton"

