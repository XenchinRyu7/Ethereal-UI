import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "../utils/cn"

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  strengthScore?: number
  showStrengthMeter?: boolean
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      disabled,
      strengthScore,
      showStrengthMeter = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [internalVal, setInternalVal] = React.useState("")

    const currentVal = value !== undefined ? String(value) : internalVal

    const calculateStrength = (pass: string): number => {
      if (!pass) return 0
      let score = 0
      if (pass.length >= 8) score++
      if (/[A-Z]/.test(pass)) score++
      if (/[0-9]/.test(pass)) score++
      if (/[^A-Za-z0-9]/.test(pass)) score++
      return score
    }

    const calculatedScore =
      strengthScore !== undefined
        ? strengthScore
        : calculateStrength(currentVal)

    const strengthColors = [
      "bg-zinc-200 dark:bg-zinc-800",
      "bg-rose-500",
      "bg-amber-500",
      "bg-blue-500",
      "bg-emerald-500",
    ]

    const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"]

    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            ref={ref}
            disabled={disabled}
            value={value}
            onChange={(e) => {
              if (value === undefined) setInternalVal(e.target.value)
              onChange?.(e)
            }}
            className={cn(
              "flex h-9 w-full rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-xs text-zinc-900 shadow-2xs transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
              className
            )}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 flex h-5 w-5 items-center justify-center rounded text-zinc-400 hover:text-zinc-600 focus:outline-none dark:hover:text-zinc-200 cursor-pointer disabled:pointer-events-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {showStrengthMeter && currentVal.length > 0 && (
          <div className="space-y-1 pt-0.5">
            <div className="flex h-1 w-full gap-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-full flex-1 transition-colors duration-200",
                    calculatedScore > idx
                      ? strengthColors[calculatedScore]
                      : "bg-transparent"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>Password strength</span>
              <span className="font-medium">
                {strengthLabels[calculatedScore]}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
