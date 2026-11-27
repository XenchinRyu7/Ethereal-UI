import * as React from "react"
import { Pipette, Check } from "lucide-react"
import { cn } from "../utils/cn"

export interface SemanticSwatch {
  label: string
  role?: "primary" | "secondary" | "accent" | "success" | "warning" | "destructive" | "muted"
  value: string
}

export interface ColorPickerProps {
  className?: string
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  label?: string
  showSemanticSwatches?: boolean
  showPaletteSwatches?: boolean
  showCustomInput?: boolean
  showEyedropper?: boolean
  customSwatches?: SemanticSwatch[]
}

const DEFAULT_SEMANTIC_SWATCHES: SemanticSwatch[] = [
  { label: "Primary", role: "primary", value: "#2563eb" },
  { label: "Secondary", role: "secondary", value: "#64748b" },
  { label: "Accent", role: "accent", value: "#8b5cf6" },
  { label: "Success", role: "success", value: "#10b981" },
  { label: "Warning", role: "warning", value: "#f59e0b" },
  { label: "Destructive", role: "destructive", value: "#ef4444" },
]

const DEFAULT_PALETTE_SWATCHES: string[] = [
  "#0f172a",
  "#475569",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#16a34a",
  "#0284c7",
  "#4f46e5",
  "#9333ea",
  "#db2777",
]

export const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  value: controlledValue,
  defaultValue = "#2563eb",
  onChange,
  label = "Color",
  showSemanticSwatches = true,
  showPaletteSwatches = true,
  showCustomInput = true,
  showEyedropper = true,
  customSwatches,
}) => {
  const [internalColor, setInternalColor] = React.useState(controlledValue ?? defaultValue)
  const color = controlledValue !== undefined ? controlledValue : internalColor
  const [hasEyeDropper, setHasEyeDropper] = React.useState(false)
  const nativeColorInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      setHasEyeDropper(true)
    }
  }, [])

  const handleColorChange = (newColor: string) => {
    if (controlledValue === undefined) {
      setInternalColor(newColor)
    }
    onChange?.(newColor)
  }

  const handleEyedropper = async () => {
    if (typeof window === "undefined" || !("EyeDropper" in window)) return
    try {
      // @ts-expect-error EyeDropper API is standard in modern Chromium
      const eyeDropper = new window.EyeDropper()
      const result = await eyeDropper.open()
      if (result?.sRGBHex) {
        handleColorChange(result.sRGBHex)
      }
    } catch {
      // User cancelled picker
    }
  }

  const semanticSwatches = customSwatches || DEFAULT_SEMANTIC_SWATCHES

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 w-full max-w-xs select-none",
        className
      )}
    >
      {/* Header with Title and Current Swatch */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500 uppercase">{color}</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => nativeColorInputRef.current?.click()}
              className="h-6 w-6 rounded-lg border border-black/10 dark:border-white/10 shrink-0 cursor-pointer shadow-2xs transition hover:scale-105 active:scale-95"
              style={{ backgroundColor: color }}
              title="Click to open full color spectrum picker"
              aria-label="Color preview and picker trigger"
            />
            {/* Hidden native color picker accessible on click */}
            <input
              ref={nativeColorInputRef}
              type="color"
              value={color.startsWith("#") && color.length === 7 ? color : "#2563eb"}
              onChange={(e) => handleColorChange(e.target.value)}
              className="sr-only"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Semantic Theme Token Rules */}
      {showSemanticSwatches && (
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Theme Rules &amp; Roles
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {semanticSwatches.map((item) => {
              const isSelected = color.toLowerCase() === item.value.toLowerCase()
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleColorChange(item.value)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition cursor-pointer text-xs",
                    isSelected
                      ? "border-blue-600 bg-blue-50/50 text-blue-900 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200 shadow-2xs"
                      : "border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <span
                    className="h-3 w-3 rounded-full shrink-0 border border-black/10 dark:border-white/10 flex items-center justify-center"
                    style={{ backgroundColor: item.value }}
                  >
                    {isSelected && <Check className="h-2 w-2 text-white stroke-[3]" />}
                  </span>
                  <span className="truncate text-[11px] font-medium leading-none">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Extended Palette Swatches */}
      {showPaletteSwatches && (
        <div className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Standard Palette
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {DEFAULT_PALETTE_SWATCHES.map((sw) => {
              const isSelected = color.toLowerCase() === sw.toLowerCase()
              return (
                <button
                  key={sw}
                  type="button"
                  onClick={() => handleColorChange(sw)}
                  style={{ backgroundColor: sw }}
                  aria-label={`Select color ${sw}`}
                  className={cn(
                    "relative h-6 w-6 rounded-md transition-all cursor-pointer border border-black/10 dark:border-white/10 hover:scale-110 active:scale-95",
                    isSelected && "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-zinc-900 scale-105"
                  )}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white drop-shadow stroke-[3]" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Custom Picker & EyeDropper Control Bar */}
      {showCustomInput && (
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="relative flex-1">
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              placeholder="#000000"
              maxLength={9}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50/70 px-2.5 py-1.5 font-mono text-xs uppercase text-zinc-800 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200"
            />
          </div>

          <button
            type="button"
            onClick={() => nativeColorInputRef.current?.click()}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-[11px] font-medium text-zinc-700 transition hover:bg-zinc-50 active:scale-98 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer shadow-2xs"
            title="Open color spectrum picker"
          >
            <span>Picker</span>
          </button>

          {showEyedropper && hasEyeDropper && (
            <button
              type="button"
              onClick={handleEyedropper}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 active:scale-98 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 cursor-pointer shadow-2xs"
              title="Pick color from screen (EyeDropper)"
              aria-label="Pick color from screen"
            >
              <Pipette className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

ColorPicker.displayName = "ColorPicker"
