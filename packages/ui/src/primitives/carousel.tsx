import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../utils/cn"

export interface CarouselSlide {
  title: string
  subtitle: string
  metric: string
}

export interface CarouselProps {
  slides?: CarouselSlide[]
  className?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  slides = [
    {
      title: "Q4 Revenue Velocity",
      subtitle: "Net dollar retention across enterprise accounts",
      metric: "128.4%",
    },
    {
      title: "Global Checkout Conversion",
      subtitle: "30-day rolling average across 14 currencies",
      metric: "4.82%",
    },
    {
      title: "Customer Support SLA",
      subtitle: "Median first response time for priority tickets",
      metric: "3m 12s",
    },
  ],
  className,
}) => {
  const [idx, setIdx] = React.useState(0)
  const current = slides[idx]

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-zinc-400">
          Slide {idx + 1} of {slides.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              setIdx((p) => (p - 1 + slides.length) % slides.length)
            }
            className="rounded-lg border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIdx((p) => (p + 1) % slides.length)}
            className="rounded-lg border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <div className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {current.metric}
        </div>
        <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
          {current.title}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {current.subtitle}
        </p>
      </div>
    </div>
  )
}
Carousel.displayName = "Carousel"

