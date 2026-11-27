import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../utils/cn"

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  disabled?: boolean
}

export const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value: controlledTags,
      defaultValue = [],
      onChange,
      placeholder = "Add a tag...",
      maxTags,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledTags !== undefined
    const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue)
    const [inputValue, setInputValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const tags = isControlled ? (controlledTags || []) : internalTags

    const updateTags = (newTags: string[]) => {
      if (!isControlled) {
        setInternalTags(newTags)
      }
      onChange?.(newTags)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        const trimmed = inputValue.trim()
        if (!trimmed) return
        if (tags.includes(trimmed)) {
          setInputValue("")
          return
        }
        if (maxTags && tags.length >= maxTags) return
        updateTags([...tags, trimmed])
        setInputValue("")
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        updateTags(tags.slice(0, -1))
      }
    }

    const removeTag = (indexToRemove: number) => {
      if (disabled) return
      updateTags(tags.filter((_, idx) => idx !== indexToRemove))
    }

    return (
      <div
        ref={ref}
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs shadow-2xs transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-200/80 bg-zinc-100/80 pl-2 pr-1 py-0.5 text-xs font-medium text-zinc-800 dark:border-zinc-700/80 dark:bg-zinc-800 dark:text-zinc-200"
          >
            <span>{tag}</span>
            <button
              type="button"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                removeTag(idx)
              }}
              className="rounded p-0.5 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {(!maxTags || tags.length < maxTags) && (
          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[80px] bg-transparent text-xs text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        )}
      </div>
    )
  }
)
TagInput.displayName = "TagInput"
