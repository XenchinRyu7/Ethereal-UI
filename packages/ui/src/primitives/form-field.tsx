import * as React from "react"
import { cn } from "../utils/cn"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  description?: string
  error?: string
  required?: boolean
  htmlFor?: string
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      error,
      required,
      htmlFor,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-1.5 w-full", className)} {...props}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              htmlFor={htmlFor}
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1 select-none"
            >
              <span>{label}</span>
              {required && (
                <span className="text-rose-500 font-bold leading-none">*</span>
              )}
            </label>
          </div>
        )}

        {children}

        {description && !error && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
            {description}
          </p>
        )}

        {error && (
          <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)
FormField.displayName = "FormField"
