import * as React from "react"
import {
  Plus,
  Sparkles,
  FileText,
  Image as ImageIcon,
  FileCode2,
  Video,
  FolderKanban,
  ArrowUpRight,
  Paperclip,
  Check,
  Cpu,
  Upload,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Button, CloseButton } from "../primitives/button"
import { Badge } from "../primitives/badge"
import { Progress } from "../primitives/progress"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../primitives/select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../primitives/dropdown-menu"

export type PromptAttachmentType = "image" | "video" | "csv" | "document" | "code"

export interface PromptAttachment {
  id: string
  name: string
  size: string
  type: PromptAttachmentType
  progress: number
  mimeType?: string
}

export interface PromptModelOption {
  id: string
  name: string
  provider: string
  badge?: string
}

export interface PromptSubmitPayload {
  prompt: string
  modelId: string
  model: PromptModelOption
  autoSyncTokens: boolean
  attachments: PromptAttachment[]
}

export interface PromptComposerBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  variant?: "default" | "compact" | "attachments-only"
  defaultPrompt?: string
  branchName?: string
  repoName?: string
  models?: PromptModelOption[]
  selectedModel?: string
  defaultModel?: string
  onModelChange?: (modelId: string, model: PromptModelOption) => void
  suggestions?: string[]
  initialAttachments?: PromptAttachment[]
  onAttach?: (attachment: PromptAttachment, rawFile?: File) => void
  onRemoveAttachment?: (attachmentId: string) => void
  onSubmitPrompt?: (payload: PromptSubmitPayload) => void
}

export const DEFAULT_PROMPT_MODELS: PromptModelOption[] = [
  {
    id: "gemini-3.1-pro",
    name: "Gemini 3.1 Pro",
    provider: "Google",
    badge: "2M Context",
  },
  {
    id: "gemini-3.1-flash",
    name: "Gemini 3.1 Flash",
    provider: "Google",
    badge: "Low Latency",
  },
  {
    id: "claude-4.6-sonnet",
    name: "Claude 4.6 Sonnet",
    provider: "Anthropic",
    badge: "Coding",
  },
  {
    id: "gpt-5.4-thinking",
    name: "GPT-5.4 Thinking",
    provider: "OpenAI",
    badge: "Reasoning",
  },
]

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
    name: "demo-walkthrough.mp4",
    size: "14.2 MB",
    type: "video",
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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(1)} MB`
}

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
      models = DEFAULT_PROMPT_MODELS,
      selectedModel: controlledModelId,
      defaultModel = DEFAULT_PROMPT_MODELS[0].id,
      onModelChange,
      suggestions = DEFAULT_SUGGESTIONS,
      initialAttachments = DEFAULT_ATTACHMENTS,
      onAttach,
      onRemoveAttachment,
      onSubmitPrompt,
      ...props
    },
    ref
  ) => {
    const [prompt, setPrompt] = React.useState(defaultPrompt)
    const [attachments, setAttachments] =
      React.useState<PromptAttachment[]>(initialAttachments)
    const [internalModelId, setInternalModelId] = React.useState(defaultModel)
    const [autoSyncTokens, setAutoSyncTokens] = React.useState(true)
    const [submittedMessage, setSubmittedMessage] = React.useState<string | null>(
      null
    )
    const fileInputRef = React.useRef<HTMLInputElement | null>(null)
    const [pendingAcceptType, setPendingAcceptType] =
      React.useState<PromptAttachmentType>("image")

    const activeModelId = controlledModelId ?? internalModelId
    const activeModelObj =
      models.find((m) => m.id === activeModelId) || models[0]

    const handleModelSelect = (newModelId: string) => {
      if (controlledModelId === undefined) {
        setInternalModelId(newModelId)
      }
      const found = models.find((m) => m.id === newModelId)
      if (found) {
        onModelChange?.(newModelId, found)
      }
    }

    const removeAttachment = (id: string) => {
      setAttachments((prev) => prev.filter((item) => item.id !== id))
      onRemoveAttachment?.(id)
    }

    const triggerNativeFilePicker = (
      attachType: PromptAttachmentType,
      acceptMime: string
    ) => {
      setPendingAcceptType(attachType)
      if (fileInputRef.current) {
        fileInputRef.current.accept = acceptMime
        fileInputRef.current.value = ""
        fileInputRef.current.click()
      }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      let inferredType: PromptAttachmentType = pendingAcceptType
      if (file.type.startsWith("image/")) inferredType = "image"
      else if (file.type.startsWith("video/")) inferredType = "video"
      else if (file.name.endsWith(".csv")) inferredType = "csv"
      else if (
        /\.(ts|tsx|js|jsx|py|go|rs|json|css|html)$/i.test(file.name)
      ) {
        inferredType = "code"
      }

      const newAttachment: PromptAttachment = {
        id: `att-${Date.now()}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: inferredType,
        progress: 100,
        mimeType: file.type,
      }

      setAttachments((prev) => [...prev, newAttachment])
      onAttach?.(newAttachment, file)
    }

    const addSampleAttachment = (sampleType: PromptAttachmentType) => {
      const sampleMap: Record<PromptAttachmentType, Omit<PromptAttachment, "id">> = {
        image: {
          name: "dashboard-mockup.png",
          size: "2.4 MB",
          type: "image",
          progress: 100,
        },
        video: {
          name: "agent-recording.mp4",
          size: "18.6 MB",
          type: "video",
          progress: 100,
        },
        document: {
          name: "architecture-prd.pdf",
          size: "1.2 MB",
          type: "document",
          progress: 100,
        },
        csv: {
          name: "telemetry-q4.csv",
          size: "840 KB",
          type: "csv",
          progress: 100,
        },
        code: {
          name: "gemini-client.ts",
          size: "5.8 KB",
          type: "code",
          progress: 100,
        },
      }

      const item: PromptAttachment = {
        id: `att-${Date.now()}`,
        ...sampleMap[sampleType],
      }
      setAttachments((prev) => [...prev, item])
      onAttach?.(item)
    }

    const handleSubmit = (e?: React.FormEvent) => {
      e?.preventDefault()
      const text =
        prompt.trim() ||
        "Generate a dark & light mode KPI card with live sparkline..."
      const payload: PromptSubmitPayload = {
        prompt: text,
        modelId: activeModelObj.id,
        model: activeModelObj,
        autoSyncTokens,
        attachments,
      }
      onSubmitPrompt?.(payload)
      setSubmittedMessage(
        `Sent to ${activeModelObj.name} (${attachments.length} attachments)`
      )
      setPrompt("")
      setTimeout(() => setSubmittedMessage(null), 2800)
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
        {/* Hidden Native File Input for Real OS File Selection */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Top Workspace, Model Dropdown & Multi-Type Attachment Menu */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <FolderKanban className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-mono">{branchName}</span>
            <span>/</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {repoName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Global Select Primitive for AI Model Switching */}
            <Select value={activeModelId} onValueChange={handleModelSelect}>
              <SelectTrigger
                aria-label="Select AI Model"
                className="h-7 w-auto min-w-[168px] rounded-lg px-2.5 py-1 text-[11px] font-medium"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Cpu className="h-3 w-3 text-blue-600 dark:text-blue-400 shrink-0" />
                  <SelectValue placeholder="Select model" />
                </div>
              </SelectTrigger>
              <SelectContent align="end">
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{m.name}</span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {m.badge || m.provider}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Global DropdownMenu Primitive for Multi-Modal Attachments */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="xs">
                  <Paperclip className="h-3 w-3" />
                  <span>Attach</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Upload from device</DropdownMenuLabel>
                <DropdownMenuItem
                  onSelect={() =>
                    triggerNativeFilePicker("image", "image/png,image/jpeg,image/webp,image/gif")
                  }
                  shortcut="PNG/JPG"
                >
                  <ImageIcon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Upload Image</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    triggerNativeFilePicker("video", "video/mp4,video/webm,video/quicktime")
                  }
                  shortcut="MP4/MOV"
                >
                  <Video className="h-3.5 w-3.5 text-violet-500" />
                  <span>Upload Video</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    triggerNativeFilePicker(
                      "document",
                      ".pdf,.csv,.txt,.md,.doc,.docx"
                    )
                  }
                  shortcut="PDF/CSV"
                >
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                  <span>Upload Document / CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() =>
                    triggerNativeFilePicker(
                      "code",
                      ".ts,.tsx,.js,.jsx,.py,.go,.rs,.json,.css"
                    )
                  }
                  shortcut="TSX/JSON"
                >
                  <FileCode2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Upload Code File</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Quick demo presets</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => addSampleAttachment("image")}>
                  <Upload className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Attach sample image</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => addSampleAttachment("video")}>
                  <Upload className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Attach sample video</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => addSampleAttachment("code")}>
                  <Upload className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Attach sample code</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  {file.type === "video" && (
                    <Video className="h-3.5 w-3.5 text-violet-500" />
                  )}
                  {(file.type === "csv" || file.type === "document") && (
                    <FileText className="h-3.5 w-3.5 text-amber-500" />
                  )}
                  {file.type === "code" && (
                    <FileCode2 className="h-3.5 w-3.5 text-emerald-500" />
                  )}

                  <div className="flex items-center gap-1">
                    <Badge
                      variant={
                        file.progress === 100
                          ? file.type === "video"
                            ? "blue"
                            : "emerald"
                          : "amber"
                      }
                      className="px-1.5 py-0 text-[9px] font-mono uppercase"
                    >
                      {file.progress < 100 ? `${file.progress}%` : file.type}
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
            placeholder={`Ask ${activeModelObj.name} to generate a block, analyze video/images, or audit code...`}
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
                {activeModelObj.provider} • ⌘ + Enter
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
