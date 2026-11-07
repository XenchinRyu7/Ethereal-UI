import * as React from "react"
import {
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Bot,
  GripVertical,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Button, ToggleGroup } from "../primitives/button"
import { Badge } from "../primitives/badge"
import { Input } from "../primitives/input"

export type KanbanColumnId = "backlog" | "in-progress" | "agent-review" | "shipped"

export interface KanbanTaskItem {
  id: string
  code: string
  title: string
  tag: "Agentic" | "UI Kit" | "CLI" | "Analytics"
  priority: "Urgent" | "High" | "Medium"
  column: KanbanColumnId
  assignee: string
  isAgentAssigned?: boolean
  completedSubtasks: number
  totalSubtasks: number
}

export interface KanbanBoardBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "agent-queue"
  initialTasks?: KanbanTaskItem[]
}

const COLUMNS: Array<{ id: KanbanColumnId; title: string; dotClass: string }> = [
  { id: "backlog", title: "Backlog", dotClass: "bg-zinc-400" },
  { id: "in-progress", title: "In Progress", dotClass: "bg-blue-600" },
  { id: "agent-review", title: "Agent Review", dotClass: "bg-violet-500" },
  { id: "shipped", title: "Shipped", dotClass: "bg-emerald-500" },
]

const DEFAULT_TASKS: KanbanTaskItem[] = [
  {
    id: "t-1",
    code: "ETH-104",
    title: "Multi-modal Prompt Composer with file upload tiles",
    tag: "Agentic",
    priority: "High",
    column: "shipped",
    assignee: "SR",
    isAgentAssigned: true,
    completedSubtasks: 4,
    totalSubtasks: 4,
  },
  {
    id: "t-2",
    code: "ETH-108",
    title: "Streaming Chain-of-Thought & search query citations",
    tag: "Agentic",
    priority: "Urgent",
    column: "agent-review",
    assignee: "AI",
    isAgentAssigned: true,
    completedSubtasks: 3,
    totalSubtasks: 4,
  },
  {
    id: "t-3",
    code: "ETH-112",
    title: "1M Context Window multi-segment token meter",
    tag: "Analytics",
    priority: "High",
    column: "in-progress",
    assignee: "SR",
    isAgentAssigned: false,
    completedSubtasks: 2,
    totalSubtasks: 3,
  },
  {
    id: "t-4",
    code: "ETH-115",
    title: "Publish @etherealui/cli v0.0.4 registry scaffolding",
    tag: "CLI",
    priority: "Medium",
    column: "in-progress",
    assignee: "AI",
    isAgentAssigned: true,
    completedSubtasks: 1,
    totalSubtasks: 2,
  },
  {
    id: "t-5",
    code: "ETH-119",
    title: "Zero-runtime OKLCH contrast audit for dark surfaces",
    tag: "UI Kit",
    priority: "Medium",
    column: "backlog",
    assignee: "SR",
    isAgentAssigned: false,
    completedSubtasks: 0,
    totalSubtasks: 3,
  },
  {
    id: "t-6",
    code: "ETH-121",
    title: "Autonomous PR review webhook for GitHub Actions",
    tag: "Agentic",
    priority: "Urgent",
    column: "agent-review",
    assignee: "AI",
    isAgentAssigned: true,
    completedSubtasks: 4,
    totalSubtasks: 5,
  },
]

const TAG_BADGE_VARIANT: Record<
  KanbanTaskItem["tag"],
  "blue" | "emerald" | "amber" | "default"
> = {
  Agentic: "blue",
  "UI Kit": "default",
  CLI: "amber",
  Analytics: "emerald",
}

export const KanbanBoardBlock = React.forwardRef<
  HTMLDivElement,
  KanbanBoardBlockProps
>(({ className, variant = "default", initialTasks = DEFAULT_TASKS, ...props }, ref) => {
  const [tasks, setTasks] = React.useState<KanbanTaskItem[]>(initialTasks)
  const [filterTag, setFilterTag] = React.useState<string>("All")
  const [newTaskTitle, setNewTaskTitle] = React.useState("")
  const [draggedTaskId, setDraggedTaskId] = React.useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = React.useState<KanbanColumnId | null>(null)

  const visibleColumns =
    variant === "compact"
      ? COLUMNS.filter((c) => c.id !== "backlog")
      : variant === "agent-queue"
        ? COLUMNS.filter((c) => c.id === "in-progress" || c.id === "agent-review" || c.id === "shipped")
        : COLUMNS

  const filteredTasks = tasks.filter((t) => {
    if (variant === "agent-queue" && !t.isAgentAssigned) return false
    if (filterTag === "All") return true
    return t.tag === filterTag
  })

  const moveTask = (taskId: string, direction: -1 | 1) => {
    const colOrder = visibleColumns.map((c) => c.id)
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task
        const currentIdx = colOrder.indexOf(task.column)
        const nextIdx = currentIdx + direction
        if (nextIdx < 0 || nextIdx >= colOrder.length) return task
        const nextCol = colOrder[nextIdx]
        return {
          ...task,
          column: nextCol,
          completedSubtasks:
            nextCol === "shipped" ? task.totalSubtasks : task.completedSubtasks,
        }
      })
    )
  }

  const handleDropToColumn = (targetCol: KanbanColumnId) => {
    if (!draggedTaskId) return
    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggedTaskId
          ? {
              ...task,
              column: targetCol,
              completedSubtasks:
                targetCol === "shipped"
                  ? task.totalSubtasks
                  : task.completedSubtasks,
            }
          : task
      )
    )
    setDraggedTaskId(null)
    setDragOverCol(null)
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    const nextCode = `ETH-${125 + tasks.length}`
    const targetColumn: KanbanColumnId =
      variant === "compact" || variant === "agent-queue"
        ? "in-progress"
        : "backlog"

    const created: KanbanTaskItem = {
      id: `t-${Date.now()}`,
      code: nextCode,
      title: newTaskTitle.trim(),
      tag: "Agentic",
      priority: "High",
      column: targetColumn,
      assignee: "AI",
      isAgentAssigned: true,
      completedSubtasks: 1,
      totalSubtasks: 3,
    }
    setTasks((prev) => [created, ...prev])
    setNewTaskTitle("")
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-5",
        className
      )}
      {...props}
    >
      {/* Top Kanban Header & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {variant === "agent-queue"
                ? "Autonomous Agent Task Queue"
                : "Sprint & Agentic Kanban Board"}
            </h3>
            <Badge variant="blue" className="font-mono text-[10px]">
              {filteredTasks.length} tasks
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Drag cards across columns or use arrow buttons to update workflow state.
          </p>
        </div>

        {/* Filter Pills & Quick Add Input */}
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup
            size="sm"
            value={filterTag}
            onValueChange={setFilterTag}
            items={[
              { value: "All", label: "All" },
              { value: "Agentic", label: "Agentic" },
              { value: "UI Kit", label: "UI Kit" },
              { value: "CLI", label: "CLI" },
            ]}
          />

          <form onSubmit={handleAddTask} className="flex items-center gap-1.5">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="New sprint task..."
              className="h-8 w-36 sm:w-44 text-xs"
            />
            <Button type="submit" variant="primary" size="sm">
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          visibleColumns.length === 3
            ? "md:grid-cols-3"
            : "sm:grid-cols-2 xl:grid-cols-4"
        )}
      >
        {visibleColumns.map((col, colIdx) => {
          const colTasks = filteredTasks.filter((t) => t.column === col.id)
          const isDropTarget = dragOverCol === col.id

          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOverCol(col.id)
              }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={() => handleDropToColumn(col.id)}
              className={cn(
                "flex flex-col rounded-2xl border p-3 transition-colors min-h-[260px]",
                isDropTarget
                  ? "border-blue-500/60 bg-blue-50/40 dark:border-blue-500/50 dark:bg-blue-500/5"
                  : "border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800/80 dark:bg-zinc-900/40"
              )}
            >
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", col.dotClass)} />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {col.title}
                  </span>
                </div>
                <Badge variant="mono" className="px-1.5 py-0 text-[10px]">
                  {colTasks.length}
                </Badge>
              </div>

              {/* Column Cards */}
              <div className="space-y-2.5 flex-1">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTaskId(task.id)}
                    onDragEnd={() => {
                      setDraggedTaskId(null)
                      setDragOverCol(null)
                    }}
                    className="group rounded-xl border border-zinc-200/90 bg-white p-3 shadow-2xs transition-all hover:border-zinc-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <GripVertical className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                        <span className="font-mono text-[10px] font-medium text-zinc-400">
                          {task.code}
                        </span>
                        <Badge
                          variant={TAG_BADGE_VARIANT[task.tag]}
                          className="px-1.5 py-0 text-[9px]"
                        >
                          {task.tag}
                        </Badge>
                      </div>

                      {task.isAgentAssigned && (
                        <Badge variant="blue" className="px-1.5 py-0 text-[9px]">
                          <Bot className="h-2.5 w-2.5" />
                          Agent
                        </Badge>
                      )}
                    </div>

                    <p className="mt-2 text-xs font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                      {task.title}
                    </p>

                    {/* Footer: Subtasks + Move Controls */}
                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 dark:border-zinc-800/80">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        {task.column === "shipped" ? (
                          <span className="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Done
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono">
                            <Clock className="h-3 w-3" />
                            {task.completedSubtasks}/{task.totalSubtasks}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          disabled={colIdx === 0}
                          onClick={() => moveTask(task.id, -1)}
                          aria-label="Move task left"
                        >
                          <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          disabled={colIdx === visibleColumns.length - 1}
                          onClick={() => moveTask(task.id, 1)}
                          aria-label="Move task right"
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                        <span
                          className={cn(
                            "ml-1 flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold",
                            task.isAgentAssigned
                              ? "bg-blue-600 text-white"
                              : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                          )}
                        >
                          {task.isAgentAssigned ? (
                            <Sparkles className="h-2.5 w-2.5" />
                          ) : (
                            task.assignee
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

KanbanBoardBlock.displayName = "KanbanBoardBlock"
