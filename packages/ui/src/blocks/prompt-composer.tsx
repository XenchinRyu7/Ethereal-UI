import * as React from "react"
import {
  Plus,
  Sparkles,
  FileText,
  Image as ImageIcon,
  FileCode2,
  FolderKanban,
  ArrowUpRight,
  X,
  Paperclip,
  Check,
  Cpu,
} from "lucide-react"
import { cn } from "../utils/cn"

export interface PromptAttachment {
  id: string
  name: string
  size: string
  type: "image" | "csv" | "code"
  progress: number
}

export interface PromptComposerBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "attachments-only"
  defaultPrompt?: string
  branchName?: string
  repoName?: string
  defaultModel?: string
  suggestions?: string[]
  initialAttachments?: PromptAttachment[]
  onSubmitPrompt?: (payload: {
    prompt: string
    model: string
    autoSyncTokens: boolean
    attachments: PromptAttachment[]
  }) => void
}

const DEFAULT_ATTACHMENTS: PromptAttachment[] = [
  {
    id: "att-1",
    name: "hero-ui.png",
    size: "1.8 MB",
    type: "image",
    progress: 100,
  },
  {
    id: "att-2",
    name: "payroll.csv",
    size: "640 KB",
    type: "csv",
    progress: 84,
  },
  {
    id: "att-3",
    name: "tokens.ts",
    size: "4.2 KB",
    type: "code",
    progress: 100,
  },
]

const DEFAULT_SUGGESTIONS = [
  "Generate dark & light KPI block",
  "Audit ARIA contrast tokens",
  "Add CSV export to DataTable",
  "Scaffold Kanban sprint board",
]

const MODELS = [
  "Claude 4.6 Sonnet",
  "Gemini 3.1 Pro",
  "GPT-5.4 Thinking",
]

export const PromptComposerBlock = React.forwardRef<
  HTMLDivElement,
  PromptComposerBlockProps
>(
  (
    {
      className,
      variant = "default",
      defaultPrompt = "",
      branchName = "main",
      repoName = "ethereal-ui",
      defaultModel = MODELS[0],
      suggestions = DEFAULT_SUGGESTIONS,
      initialAttachments = DEFAULT_ATTACHMENTS,
      onSubmitPrompt,
      ...props
    },
    ref
  ) => {
    const [prompt, setPrompt] = React.useState(defaultPrompt)
    const [attachments, setAttachments] = React.useState<PromptAttachment[]>(initialAttachments)
    const [model, setModel] = React.useState(defaultModel)
    const [autoSyncTokens, setAutoSyncTokens] = React.useState(true)
    const [submittedMessage, setSubmittedMessage] = React.useState<string | null>(null)

    const removeAttachment = (id: string) => {
      setAttachments((prev) => prev.filter((item) => item.id !== id))
    }

    const addSampleAttachment = () => {
      const pool: PromptAttachment[] = [
        {
          id: `att-${Date.now()}`,
          name: "schema.prisma",
          size: "2.4 KB",
          type: "code",
          progress: 100,
        },
        {
          id: `att-${Date.now() + 1}`,
          name: "metrics-q4.csv",
          size: "1.1 MB",
          type: "csv",
          progress: 100,
        },
        {
          id: `att-${Date.now() + 2}`,
          name: "wireframe-v2.png",
          size: "3.2 MB",
          type: "image",
          progress: 100,
        },
      ]
      const pick = pool[attachments.length % pool.length]
      setAttachments((prev) => [...prev, pick])
    }

    const handleSubmit = (e?: React.FormEvent) => {
      e?.preventDefault()
      const text = prompt.trim() || "Generate a dark & light mode KPI card with live sparkline..."
      onSubmitPrompt?.({
        prompt: text,
        model,
        autoSyncTokens,
        attachments,
      })
      setSubmittedMessage(`Dispatched to ${model} (${attachments.length} context files)`)
      setPrompt("")
      setTimeout(() => setSubmittedMessage(null), 2600)
    }

    const cycleModel = () => {
      const nextIdx = (MODELS.indexOf(model) + 1) % MODELS.length
      setModel(MODELS[nextIdx])
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950",
          className
        )}
        {...props}
      >
        {/* Top Workspace & Branch Context Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <FolderKanban className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-mono">{branchName}</span>
            <span>/</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{repoName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={cycleModel}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
              title="Click to switch AI model"
            >
              <Cpu className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span>{model}</span>
            </button>

            <button
              type="button"
              onClick={addSampleAttachment}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <Paperclip className="h-3 w-3" />
              <span>Attach</span>
            </button>
          </div>
        </div>

        {/* Attachment Tiles Grid */}
        {variant !== "compact" && attachments.length > 0 && (
          <div className="mb-3.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="group relative rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-2.5 transition-all hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  {file.type === "image" && (
                    <ImageIcon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  )}
                  {file.type === "csv" && (
                    <FileText className="h-3.5 w-3.5 text-amber-500" />
                  )}
                  {file.type === "code" && (
                    <FileCode2 className="h-3.5 w-3.5 text-emerald-500" />
                  )}

                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "font-mono text-[10px]",
                        file.progress === 100
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      )}
                    >
                      {file.type === "code" && file.progress === 100
                        ? "TSX"
                        : `${file.progress}%`}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.id)}
                      aria-label={`Remove ${file.name}`}
                      className="rounded p-0.5 text-zinc-400 opacity-70 hover:bg-zinc-200 hover:text-zinc-700 group-hover:opacity-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <p className="mt-1.5 truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  {file.name}
                </p>

                {file.progress < 100 ? (
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                      style={{ width: `${file.progress}%` }}
                      className="h-full rounded-full bg-blue-600 animate-pulse"
                    />
                  </div>
                ) : (
                  <p className="text-[10px] text-zinc-400">{file.size}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quick Prompt Suggestion Chips */}
        {variant !== "attachments-only" && suggestions.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {suggestions.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setPrompt(chip)}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-600 transition-colors hover:border-blue-500/40 hover:bg-blue-50/50 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-500/40 dark:hover:text-blue-400 cursor-pointer"
              >
                <Sparkles className="h-2.5 w-2.5 text-blue-500" />
                <span>{chip}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Prompt Input Box */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-3 transition-colors focus-within:border-blue-500/60 focus-within:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:focus-within:border-blue-500/50 dark:focus-within:bg-zinc-900"
        >
          <textarea
            rows={variant === "compact" ? 2 : 3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                handleSubmit()
              }
            }}
            placeholder="Generate a dark & light mode KPI card, or ask anything about the workspace..."
            className="w-full resize-none bg-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100"
          />

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200/70 pt-2.5 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoSyncTokens(!autoSyncTokens)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer",
                  autoSyncTokens
                    ? "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                )}
              >
                {autoSyncTokens ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Plus className="h-3 w-3" />
                )}
                <span>{autoSyncTokens ? "Auto-sync tokens" : "Manual tokens"}</span>
              </button>

              <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-400">
                ⌘ + Enter to send
              </span>
            </div>

            <div className="flex items-center gap-2">
              {submittedMessage && (
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  {submittedMessage}
                </span>
              )}
              <button
                type="submit"
                aria-label="Send prompt"
                className="inline-flex h-7 items-center gap-1.5 rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-blue-700 cursor-pointer"
              >
                <span>Run Agent</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
)

PromptComposerBlock.displayName = "PromptComposerBlock"

