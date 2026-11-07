import * as React from "react"
import { Minus, Plus, DollarSign } from "lucide-react"
import { cn } from "../utils/cn"
import { Button } from "./button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"

export interface NumberInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  currency?: string
  currencies?: string[]
  onCurrencyChange?: (currency: string) => void
  onValueChange?: (value: number) => void
  label?: string
  quickAmounts?: number[]
}

export const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 25000,
      min = 0,
      max = 10000000,
      step = 500,
      currency: controlledCurrency,
      currencies = ["USD", "IDR", "EUR", "SGD"],
      onCurrencyChange,
      onValueChange,
      label = "Transfer / Settlement Amount",
      quickAmounts = [5000, 25000, 100000, 250000],
      ...props
    },
    ref
  ) => {
    const [internalVal, setInternalVal] = React.useState(defaultValue)
    const [internalCurrency, setInternalCurrency] = React.useState(
      controlledCurrency || currencies[0] || "USD"
    )

    const currentVal = controlledValue ?? internalVal
    const currentCurrency = controlledCurrency ?? internalCurrency

    const updateValue = (next: number) => {
      const clamped = Math.max(min, Math.min(max, next))
      if (controlledValue === undefined) {
        setInternalVal(clamped)
      }
      onValueChange?.(clamped)
    }

    const handleCurrencySelect = (nextCurr: string) => {
      if (controlledCurrency === undefined) {
        setInternalCurrency(nextCurr)
      }
      onCurrencyChange?.(nextCurr)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-4 space-y-3 dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {label}
          </span>
          <span className="font-mono text-[11px] text-zinc-400">
            Formatted: {currentCurrency} {currentVal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Select value={currentCurrency} onValueChange={handleCurrencySelect}>
            <SelectTrigger className="w-24 shrink-0 font-mono text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-1 items-center rounded-lg border border-zinc-200 bg-zinc-50/50 px-2 dark:border-zinc-800 dark:bg-zinc-950">
            <DollarSign className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <input
              type="number"
              value={currentVal}
              min={min}
              max={max}
              step={step}
              onChange={(e) => updateValue(Number(e.target.value) || 0)}
              className="h-9 w-full bg-transparent px-2 font-mono text-sm font-semibold text-zinc-900 focus:outline-none dark:text-zinc-100"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => updateValue(currentVal - step)}
              disabled={currentVal <= min}
              aria-label="Decrease amount"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => updateValue(currentVal + step)}
              disabled={currentVal >= max}
              aria-label="Increase amount"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {quickAmounts.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {quickAmounts.map((amt) => (
              <Button
                key={amt}
                type="button"
                variant={currentVal === amt ? "secondary" : "outline"}
                size="xs"
                onClick={() => updateValue(amt)}
                className="font-mono text-[11px]"
              >
                {currentCurrency} {amt.toLocaleString()}
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"

