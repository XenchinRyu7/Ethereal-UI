import * as React from "react"
import { ShieldCheck, RotateCcw } from "lucide-react"
import { cn } from "../utils/cn"
import { Button } from "./button"
import { Badge } from "./badge"

export interface OtpInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number
  defaultValue?: string
  onComplete?: (code: string) => void
  label?: string
}

export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      className,
      length = 6,
      defaultValue = "482910",
      onComplete,
      label = "Transaction Authorization PIN / 2FA OTP",
      ...props
    },
    ref
  ) => {
    const [digits, setDigits] = React.useState<string[]>(() => {
      const arr = Array.from({ length }, (_, idx) => defaultValue[idx] || "")
      return arr
    })
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

    const handleDigitChange = (idx: number, raw: string) => {
      const char = raw.replace(/\D/g, "").slice(-1)
      const next = [...digits]
      next[idx] = char
      setDigits(next)

      if (char && idx < length - 1) {
        inputRefs.current[idx + 1]?.focus()
      }
      const joined = next.join("")
      if (joined.length === length) {
        onComplete?.(joined)
      }
    }

    const handleKeyDown = (
      idx: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !digits[idx] && idx > 0) {
        inputRefs.current[idx - 1]?.focus()
      }
    }

    const isComplete = digits.every((d) => d !== "")

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 space-y-3.5 dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {label}
          </span>
          {isComplete ? (
            <Badge variant="emerald">
              <ShieldCheck className="h-3 w-3" /> Verified
            </Badge>
          ) : (
            <Badge variant="amber">Enter {length} digits</Badge>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              aria-label={`Digit ${idx + 1}`}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 text-center font-mono text-base font-bold text-zinc-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:bg-zinc-900"
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-zinc-400">
            Hardware token or authenticator code
          </span>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => {
              setDigits(Array.from({ length }, () => ""))
              inputRefs.current[0]?.focus()
            }}
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear</span>
          </Button>
        </div>
      </div>
    )
  }
)

OtpInput.displayName = "OtpInput"

