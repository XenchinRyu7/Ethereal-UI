import * as React from "react"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "../utils/cn"
import { Button } from "./button"
import { Badge } from "./badge"

export interface StepperStepItem {
  id: string
  title: string
  subtitle: string
  summary?: string
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: StepperStepItem[]
  currentStep?: number
  defaultStep?: number
  onStepChange?: (stepIndex: number) => void
}

const DEFAULT_STEPS: StepperStepItem[] = [
  {
    id: "kyc",
    title: "Entity & KYC Verification",
    subtitle: "Tax ID, Articles of Incorporation",
    summary: "Verified corporate entity NPWP/EIN and beneficial ownership structure.",
  },
  {
    id: "limits",
    title: "Treasury & FX Limits",
    subtitle: "Daily RTGS & SWIFT thresholds",
    summary: "Configured $250,000 daily wire limit with dual maker-checker sign-off.",
  },
  {
    id: "approvers",
    title: "RBAC Signatories",
    subtitle: "Assign Maker & Checker roles",
    summary: "Assigned 2 Makers (Treasury Ops) and 2 Checkers (VP Finance, CFO).",
  },
  {
    id: "activate",
    title: "Activate Ledger",
    subtitle: "Issue virtual IBAN accounts",
    summary: "Ready to provision multi-currency USD, EUR, and IDR settlement accounts.",
  },
]

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps = DEFAULT_STEPS,
      currentStep: controlledStep,
      defaultStep = 1,
      onStepChange,
      ...props
    },
    ref
  ) => {
    const [internalStep, setInternalStep] = React.useState(defaultStep)
    const activeIdx = controlledStep ?? internalStep

    const setStep = (idx: number) => {
      const clamped = Math.max(0, Math.min(steps.length - 1, idx))
      if (controlledStep === undefined) {
        setInternalStep(clamped)
      }
      onStepChange?.(clamped)
    }

    const activeStepObj = steps[activeIdx] || steps[0]

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-4 sm:p-5 space-y-4 dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        {/* Horizontal Step Indicators */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeIdx
            const isCurrent = idx === activeIdx
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setStep(idx)}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl border p-2.5 text-left transition-colors cursor-pointer",
                  isCurrent
                    ? "border-blue-500/60 bg-blue-50/40 dark:border-blue-500/50 dark:bg-blue-500/10"
                    : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                        ? "bg-blue-600 text-white"
                        : "border border-zinc-300 text-zinc-400 dark:border-zinc-700"
                  )}
                >
                  {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : idx + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </p>
                  <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Step Content Box */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-950/50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="blue" className="font-mono text-[10px]">
                Step {activeIdx + 1} of {steps.length}
              </Badge>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {activeStepObj.title}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {activeStepObj.summary || activeStepObj.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="xs"
              disabled={activeIdx === 0}
              onClick={() => setStep(activeIdx - 1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="primary"
              size="xs"
              disabled={activeIdx === steps.length - 1}
              onClick={() => setStep(activeIdx + 1)}
            >
              <span>Next</span>
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

Stepper.displayName = "Stepper"
