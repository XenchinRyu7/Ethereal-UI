import * as React from "react"
import {
  Plus,
  Sparkles,
  FileText,
  Image as ImageIcon,
  FileCode2,
  FolderKanban,
  ArrowUpRight,
  Paperclip,
  Check,
  Cpu,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Button, CloseButton } from "../primitives/button"
import { Badge } from "../primitives/badge"
import { Progress } from "../primitives/progress"

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
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={cycleModel}
              title="Click to switch AI model"
            >
              <Cpu className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span>{model}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={addSampleAttachment}
            >
              <Paperclip className="h-3 w-3" />
              <span>Attach</span>
            </Button>
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

                  <div className="flex items-center gap-1">
                    <Badge
                      variant={file.progress === 100 ? "emerald" : "amber"}
                      className="px-1.5 py-0 text-[9px] font-mono"
                    >
                      {file.type === "code" && file.progress === 100
                        ? "TSX"
                        : `${file.progress}%`}
                    </Badge>
                    <CloseButton
                      size="sm"
                      onClick={() => removeAttachment(file.id)}
                      aria-label={`Remove ${file.name}`}
                      className="h-5 w-5"
                    />
                  </div>
                </div>

                <p className="mt-1.5 truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  {file.name}
                </p>

                {file.progress < 100 ? (
                  <Progress
                    value={file.progress}
                    size="sm"
                    variant="blue"
                    className="mt-1.5"
                  />
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
              <Button
                key={chip}
                type="button"
                variant="outline"
                size="xs"
                onClick={() => setPrompt(chip)}
                className="h-6 px-2 text-[11px] font-normal"
              >
                <Sparkles className="h-2.5 w-2.5 text-blue-500" />
                <span>{chip}</span>
              </Button>
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
              <Button
                type="button"
                variant={autoSyncTokens ? "secondary" : "outline"}
                size="xs"
                onClick={() => setAutoSyncTokens(!autoSyncTokens)}
              >
                {autoSyncTokens ? (
                  <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Plus className="h-3 w-3" />
                )}
                <span>{autoSyncTokens ? "Auto-sync tokens" : "Manual tokens"}</span>
              </Button>

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
              <Button type="submit" variant="primary" size="xs">
                <span>Run Agent</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
)

PromptComposerBlock.displayName = "PromptComposerBlock"
