import * as React from "react"
import { cn } from "../utils/cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefixText?: string
  suffixText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, rightIcon, prefixText, suffixText, ...props }, ref) => {
    if (leftIcon || rightIcon || prefixText || suffixText) {
      return (
        <div
          className={cn(
            "flex h-9 w-full items-center rounded-lg border border-input bg-background text-sm text-foreground transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 shadow-2xs",
            className
          )}
        >
          {prefixText && (
            <span className="flex h-full items-center rounded-l-lg border-r border-input bg-muted px-3 text-xs text-muted-foreground select-none">
              {prefixText}
            </span>
          )}
          {leftIcon && (
            <span className="pl-3 text-muted-foreground flex items-center shrink-0">
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            ref={ref}
            className="h-full w-full bg-transparent px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
          {rightIcon && (
            <span className="pr-3 text-muted-foreground flex items-center shrink-0">
              {rightIcon}
            </span>
          )}
          {suffixText && (
            <span className="flex h-full items-center border-l border-input bg-muted px-3 text-xs text-muted-foreground select-none">
              {suffixText}
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && innerRef.current) {
        innerRef.current.style.height = "auto"
        innerRef.current.style.height = `${innerRef.current.scrollHeight}px`
      }
      onChange?.(e)
    }

    return (
      <textarea
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        onChange={handleChange}
        className={cn(
          "flex min-h-[84px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 shadow-2xs",
          autoResize && "resize-none overflow-hidden",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-xs font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {optional && <span className="text-[11px] font-normal text-muted-foreground">Optional</span>}
    </label>
  )
)
Label.displayName = "Label"

export { Input, Textarea, Label }
