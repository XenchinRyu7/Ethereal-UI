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
import { Button } from "../primitives/button"
import { Badge } from "../primitives/badge"
import { Input } from "../primitives/input"
import { Progress } from "../primitives/progress"

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
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
              <span>{isPlaying ? "Live" : "Paused"}</span>
            </Button>
          </div>

          <div className="space-y-1.5">
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
                    "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer text-left",
                    isCurrent
                      ? "bg-zinc-100 text-zinc-900 font-semibold dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
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
            <Badge variant="emerald" className="font-mono text-[10px]">
              18ms
            </Badge>
          </div>

          <div className="ml-1.5 border-l-2 border-zinc-200 pl-3.5 space-y-3 text-xs dark:border-zinc-800">
            <div className="space-y-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs"
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-zinc-400">Sources</span>
                <Badge variant="blue" className="px-1.5 py-0 text-[10px] font-mono">
                  Radix
                </Badge>
                <Badge variant="emerald" className="px-1.5 py-0 text-[10px] font-mono">
                  TW v4
                </Badge>
                <Badge variant="amber" className="px-1.5 py-0 text-[10px] font-mono">
                  ARIA
                </Badge>
                <Badge variant="default" className="px-1.5 py-0 text-[10px] font-mono">
                  CLI Registry
                </Badge>
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
              <Badge variant="blue" className="font-mono text-[11px]">
                {percent}%
              </Badge>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Click any step below to inspect execution logs
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              <span>{isPlaying ? "Pause" : "Resume"}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => {
                setActiveStep(1)
                setIsPlaying(true)
              }}
              aria-label="Restart workflow"
              className="px-2"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={percent} size="sm" variant="blue" />

        {/* Step Checklist */}
        <div className="space-y-1.5">
          {steps.map((step, idx) => {
            const stepNum = idx + 1
            const done = stepNum <= activeStep
            const isCurrent = stepNum === activeStep
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false)
                  setActiveStep(stepNum)
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer text-left",
                  isCurrent
                    ? "bg-blue-50/80 text-zinc-900 dark:bg-blue-500/15 dark:text-white"
                    : "hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/70 dark:hover:text-white"
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
                        : "font-medium text-zinc-800 dark:text-zinc-100"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                <span className="font-mono text-[10px] text-zinc-400 shrink-0 ml-2">
                  {step.duration}
                </span>
              </button>
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
