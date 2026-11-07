import * as React from "react"
import {
  Check,
  Search,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  FileCode2,
  ChevronRight,
} from "lucide-react"
import { cn } from "../utils/cn"

export interface AgentWorkflowStep {
  id: string
  label: string
  detail: string
  duration: string
}

export interface AgentReasoningStep {
  id: string
  label: string
  meta: string
  icon: string
  thought: string
}

export interface AgentProgressBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "reasoning" | "search-stream"
  autoPlay?: boolean
  steps?: AgentWorkflowStep[]
  reasoningSteps?: AgentReasoningStep[]
}

const DEFAULT_WORKFLOW_STEPS: AgentWorkflowStep[] = [
  {
    id: "step-1",
    label: "Read workspace configuration",
    detail: "Parsed ethereal.json, tsconfig.json, and Tailwind v4 CSS tokens.",
    duration: "140ms",
  },
  {
    id: "step-2",
    label: "Install light & dark semantic tokens",
    detail: "Synced --bg-canvas, --bg-surface, and semantic contrast variables.",
    duration: "320ms",
  },
  {
    id: "step-3",
    label: "Compile accessible UI primitives",
    detail: "Verified WAI-ARIA keyboard navigation & focus-visible rings.",
    duration: "610ms",
  },
  {
    id: "step-4",
    label: "Mount statistical & agentic blocks",
    detail: "Connected PromptComposer, AgentProgress, TokenUsage, and Kanban.",
    duration: "480ms",
  },
  {
    id: "step-5",
    label: "Run Husky lint & production build",
    detail: "Zero TypeScript or ESLint errors across 3 monorepo packages.",
    duration: "1.2s",
  },
]

const DEFAULT_REASONING_STEPS: AgentReasoningStep[] = [
  {
    id: "r-1",
    label: "Thinking",
    meta: "1.2s",
    icon: "✦",
    thought: "Analyzing component hierarchy and semantic dark/light token mappings...",
  },
  {
    id: "r-2",
    label: "Searching the docs",
    meta: "37 matches",
    icon: "⌕",
    thought: "Matched 37 primitives, 6 statistical charts, and 14 enterprise blocks.",
  },
  {
    id: "r-3",
    label: "Reading token files",
    meta: "globals.css",
    icon: "▤",
    thought: "Verified zero-runtime CSS variables for surface, elevated card, and borders.",
  },
  {
    id: "r-4",
    label: "Writing the answer",
    meta: "Streaming...",
    icon: "✎",
    thought: "Generating copy-pasteable TSX snippet with @etherealui/react imports.",
  },
]

export const AgentProgressBlock = React.forwardRef<
  HTMLDivElement,
  AgentProgressBlockProps
>(
  (
    {
      className,
      variant = "default",
      autoPlay = true,
      steps = DEFAULT_WORKFLOW_STEPS,
      reasoningSteps = DEFAULT_REASONING_STEPS,
      ...props
    },
    ref
  ) => {
    const [activeStep, setActiveStep] = React.useState(3)
    const [isPlaying, setIsPlaying] = React.useState(autoPlay)
    const [activeReasoningIdx, setActiveReasoningIdx] = React.useState(0)
    const [searchQuery, setSearchQuery] = React.useState(
      "What teams need in an enterprise design system"
    )

    React.useEffect(() => {
      if (!isPlaying) return
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev >= steps.length ? 1 : prev + 1))
        setActiveReasoningIdx((prev) => (prev + 1) % reasoningSteps.length)
      }, 2200)
      return () => clearInterval(timer)
    }, [isPlaying, steps.length, reasoningSteps.length])

    if (variant === "reasoning") {
      const currentReasoning = reasoningSteps[activeReasoningIdx] || reasoningSteps[0]
      return (
        <div
          ref={ref}
          className={cn(
            "w-full max-w-md rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-4",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Streaming Reasoning Trace
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10px] font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
              <span>{isPlaying ? "Live" : "Paused"}</span>
            </button>
          </div>

          <div className="space-y-2">
            {reasoningSteps.map((item, idx) => {
              const isCurrent = activeReasoningIdx === idx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false)
                    setActiveReasoningIdx(idx)
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-all cursor-pointer text-left",
                    isCurrent
                      ? "bg-zinc-100 text-zinc-900 font-semibold dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-400 hover:bg-zinc-50 dark:text-zinc-500 dark:hover:bg-zinc-900/40"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "text-xs",
                        isCurrent && "text-blue-600 dark:text-blue-400"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <span className="font-mono text-[10px]">{item.meta}</span>
                </button>
              )
            })}
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-3 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-blue-600 dark:text-blue-400 mb-1">
              <Terminal className="h-3 w-3" />
              <span>chain-of-thought</span>
            </div>
            <p className="leading-relaxed">{currentReasoning.thought}</p>
          </div>
        </div>
      )
    }

    if (variant === "search-stream") {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full max-w-md rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-3.5",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-100">
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Ran 3 registry queries</span>
            </span>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
              18ms
            </span>
          </div>

          <div className="ml-1.5 border-l-2 border-zinc-200 pl-3.5 space-y-3 text-xs dark:border-zinc-800">
            <div className="space-y-1.5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700 focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-zinc-400">Sources</span>
                <span className="inline-flex h-4 items-center rounded bg-blue-500/10 px-1.5 font-mono text-[10px] text-blue-600 dark:text-blue-400">
                  Radix
                </span>
                <span className="inline-flex h-4 items-center rounded bg-emerald-500/10 px-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  TW v4
                </span>
                <span className="inline-flex h-4 items-center rounded bg-amber-500/10 px-1.5 font-mono text-[10px] text-amber-600 dark:text-amber-400">
                  ARIA
                </span>
                <span className="inline-flex h-4 items-center rounded bg-violet-500/10 px-1.5 font-mono text-[10px] text-violet-600 dark:text-violet-400">
                  CLI Registry
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <FileCode2 className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">Searched for zero-runtime CSS tokens</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
              <span className="truncate font-medium">
                Indexing 60+ accessible primitives &amp; agentic blocks...
              </span>
            </div>
          </div>
        </div>
      )
    }

    const percent = Math.round((activeStep / steps.length) * 100)
    const selectedStepObj = steps[activeStep - 1] || steps[0]

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-lg rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-4",
          className
        )}
        {...props}
      >
        {/* Header & Live Controls */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {activeStep >= steps.length
                  ? "All agent steps completed"
                  : `Executing step ${activeStep} of ${steps.length}...`}
              </span>
              <span className="rounded-md bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {percent}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Click any step below to inspect execution logs
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex h-7 items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 text-[11px] font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>{isPlaying ? "Pause" : "Resume"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStep(1)
                setIsPlaying(true)
              }}
              aria-label="Restart workflow"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            style={{ width: `${percent}%` }}
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
          />
        </div>

        {/* Step Checklist */}
        <div className="space-y-2">
          {steps.map((step, idx) => {
            const stepNum = idx + 1
            const done = stepNum <= activeStep
            const isCurrent = stepNum === activeStep
            return (
              <div
                key={step.id}
                onClick={() => {
                  setIsPlaying(false)
                  setActiveStep(stepNum)
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer",
                  isCurrent
                    ? "bg-blue-50/70 dark:bg-blue-500/10"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition-colors",
                      done
                        ? "bg-blue-600 text-white"
                        : "border border-zinc-300 text-zinc-400 dark:border-zinc-700"
                    )}
                  >
                    {done ? <Check className="h-3 w-3 stroke-[3]" /> : stepNum}
                  </span>
                  <span
                    className={cn(
                      "truncate transition-all",
                      done && !isCurrent
                        ? "line-through text-zinc-400 dark:text-zinc-500"
                        : "font-medium text-zinc-800 dark:text-zinc-200"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                <span className="font-mono text-[10px] text-zinc-400 shrink-0 ml-2">
                  {step.duration}
                </span>
              </div>
            )
          })}
        </div>

        {/* Active Step Telemetry Output */}
        <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3.5 py-2.5 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
            <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>{selectedStepObj.label}</span>
          </div>
          <p className="mt-1 pl-5 text-[11px] text-zinc-500 dark:text-zinc-400">
            {selectedStepObj.detail}
          </p>
        </div>
      </div>
    )
  }
)

AgentProgressBlock.displayName = "AgentProgressBlock"

