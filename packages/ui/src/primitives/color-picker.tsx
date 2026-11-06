import * as React from "react"
import { cn } from "../utils/cn"

export interface ColorPickerProps {
  className?: string
  defaultColor?: string
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  className,
  defaultColor = "#2563eb",
}) => {
  const swatches = [
    "#2563eb",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#f43f5e",
    "#8b5cf6",
    "#18181b",
  ]
  const [color, setColor] = React.useState(defaultColor)

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-6 w-6 rounded-lg border border-black/10 shrink-0"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-28 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-800 focus:outline-none dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
        />
      </div>
      <div className="flex items-center gap-1.5">
        {swatches.map((sw) => (
          <button
            key={sw}
            type="button"
            onClick={() => setColor(sw)}
            style={{ backgroundColor: sw }}
            className={cn(
              "h-6 w-6 rounded-full transition-transform cursor-pointer",
              color === sw &&
                "scale-110 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-zinc-900"
            )}
          />
        ))}
      </div>
    </div>
  )
}
ColorPicker.displayName = "ColorPicker"

