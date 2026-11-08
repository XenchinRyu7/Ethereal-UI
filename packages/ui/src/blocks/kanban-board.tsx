import * as React from "react"
import {
  Plus,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Bot,
  GripVertical,
  Search,
  Trash2,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Button, ToggleGroup } from "../primitives/button"
import { Badge } from "../primitives/badge"
import { Input, Label } from "../primitives/input"
import { Switch } from "../primitives/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../primitives/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../primitives/dialog"

export type KanbanColumnId = string

export interface KanbanColumnConfig {
  id: KanbanColumnId
  title: string
  dotClass?: string
}

export interface KanbanCategoryConfig {
  id: string
  label: string
  badgeVariant?: "blue" | "emerald" | "amber" | "rose" | "default"
}

export type KanbanPriority = "Urgent" | "High" | "Medium" | "Low"

export interface KanbanTaskItem {
  id: string
  code: string
  title: string
  tag: string
  priority: KanbanPriority
  column: KanbanColumnId
  assignee: string
  isAgentAssigned?: boolean
  completedSubtasks: number
  totalSubtasks: number
}

export interface KanbanBoardBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "agent-queue"
  title?: string
  subtitle?: string
  taskCodePrefix?: string
  columns?: KanbanColumnConfig[]
  categories?: KanbanCategoryConfig[]
  tasks?: KanbanTaskItem[]
  initialTasks?: KanbanTaskItem[]
  onTaskCreate?: (task: KanbanTaskItem) => void
  onTaskMove?: (
    taskId: string,
    fromColumn: KanbanColumnId,
    toColumn: KanbanColumnId,
    task: KanbanTaskItem
  ) => void
  onTaskDelete?: (taskId: string) => void
}

export const DEFAULT_KANBAN_COLUMNS: KanbanColumnConfig[] = [
  { id: "backlog", title: "Backlog", dotClass: "bg-zinc-400" },
  { id: "in-progress", title: "In Progress", dotClass: "bg-blue-600" },
  { id: "agent-review", title: "Agent Review", dotClass: "bg-violet-500" },
  { id: "shipped", title: "Shipped", dotClass: "bg-emerald-500" },
]

export const DEFAULT_KANBAN_CATEGORIES: KanbanCategoryConfig[] = [
  { id: "Agentic", label: "Agentic", badgeVariant: "blue" },
  { id: "UI Kit", label: "UI Kit", badgeVariant: "default" },
  { id: "CLI", label: "CLI", badgeVariant: "amber" },
  { id: "Analytics", label: "Analytics", badgeVariant: "emerald" },
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

const PRIORITY_BADGE_VARIANT: Record<
  KanbanPriority,
  "rose" | "amber" | "blue" | "default"
> = {
  Urgent: "rose",
  High: "amber",
  Medium: "blue",
  Low: "default",
}

export const KanbanBoardBlock = React.forwardRef<
  HTMLDivElement,
  KanbanBoardBlockProps
>(
  (
    {
      className,
      variant = "default",
      title,
      subtitle = "Drag cards across columns, filter by category, or open the modal to create custom tasks.",
      taskCodePrefix = "ETH",
      columns = DEFAULT_KANBAN_COLUMNS,
      categories = DEFAULT_KANBAN_CATEGORIES,
      tasks: controlledTasks,
      initialTasks = DEFAULT_TASKS,
      onTaskCreate,
      onTaskMove,
      onTaskDelete,
      ...props
    },
    ref
  ) => {
    const [internalTasks, setInternalTasks] =
      React.useState<KanbanTaskItem[]>(initialTasks)
    const tasks = controlledTasks ?? internalTasks

    const [filterTag, setFilterTag] = React.useState<string>("All")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [draggedTaskId, setDraggedTaskId] = React.useState<string | null>(
      null
    )
    const [dragOverCol, setDragOverCol] =
      React.useState<KanbanColumnId | null>(null)

    // Dialog Popup State for New Task Creation
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [formTitle, setFormTitle] = React.useState("")
    const [formCode, setFormCode] = React.useState("")
    const [formCategory, setFormCategory] = React.useState(
      categories[0]?.id || "Agentic"
    )
    const [formPriority, setFormPriority] =
      React.useState<KanbanPriority>("High")
    const [formColumn, setFormColumn] = React.useState<KanbanColumnId>(
      variant === "compact" || variant === "agent-queue"
        ? columns[1]?.id || columns[0]?.id || "in-progress"
        : columns[0]?.id || "backlog"
    )
    const [formAssignee, setFormAssignee] = React.useState("SR")
    const [formTotalSubtasks, setFormTotalSubtasks] = React.useState("3")
    const [formIsAgent, setFormIsAgent] = React.useState(true)

    const visibleColumns = React.useMemo(() => {
      if (columns !== DEFAULT_KANBAN_COLUMNS) return columns
      if (variant === "compact") {
        return columns.filter((c) => c.id !== "backlog")
      }
      if (variant === "agent-queue") {
        return columns.filter(
          (c) =>
            c.id === "in-progress" ||
            c.id === "agent-review" ||
            c.id === "shipped"
        )
      }
      return columns
    }, [columns, variant])

    const categoryBadgeMap = React.useMemo(() => {
      const map: Record<
        string,
        "blue" | "emerald" | "amber" | "rose" | "default"
      > = {}
      categories.forEach((cat) => {
        map[cat.id] = cat.badgeVariant || "default"
      })
      return map
    }, [categories])

    const filteredTasks = tasks.filter((t) => {
      if (variant === "agent-queue" && !t.isAgentAssigned) return false
      if (filterTag !== "All" && t.tag !== filterTag) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = t.title.toLowerCase().includes(q)
        const matchCode = t.code.toLowerCase().includes(q)
        if (!matchTitle && !matchCode) return false
      }
      return true
    })

    const updateTasks = (updater: (prev: KanbanTaskItem[]) => KanbanTaskItem[]) => {
      if (controlledTasks === undefined) {
        setInternalTasks(updater)
      }
    }

    const moveTask = (taskId: string, direction: -1 | 1) => {
      const colOrder = visibleColumns.map((c) => c.id)
      const target = tasks.find((t) => t.id === taskId)
      if (!target) return

      const currentIdx = colOrder.indexOf(target.column)
      const nextIdx = currentIdx + direction
      if (nextIdx < 0 || nextIdx >= colOrder.length) return

      const nextCol = colOrder[nextIdx]
      const updatedTask: KanbanTaskItem = {
        ...target,
        column: nextCol,
        completedSubtasks:
          nextCol === "shipped"
            ? target.totalSubtasks
            : target.completedSubtasks,
      }

      updateTasks((prev) =>
        prev.map((item) => (item.id === taskId ? updatedTask : item))
      )
      onTaskMove?.(taskId, target.column, nextCol, updatedTask)
    }

    const handleDropToColumn = (targetCol: KanbanColumnId) => {
      if (!draggedTaskId) return
      const target = tasks.find((t) => t.id === draggedTaskId)
      if (!target || target.column === targetCol) {
        setDraggedTaskId(null)
        setDragOverCol(null)
        return
      }

      const updatedTask: KanbanTaskItem = {
        ...target,
        column: targetCol,
        completedSubtasks:
          targetCol === "shipped"
            ? target.totalSubtasks
            : target.completedSubtasks,
      }

      updateTasks((prev) =>
        prev.map((item) => (item.id === draggedTaskId ? updatedTask : item))
      )
      onTaskMove?.(draggedTaskId, target.column, targetCol, updatedTask)
      setDraggedTaskId(null)
      setDragOverCol(null)
    }

    const handleDeleteTask = (taskId: string) => {
      updateTasks((prev) => prev.filter((item) => item.id !== taskId))
      onTaskDelete?.(taskId)
    }

    const handleCreateTaskSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!formTitle.trim()) return

      const autoCode = `${taskCodePrefix}-${125 + tasks.length}`
      const parsedSubtasks = Math.max(
        1,
        Math.min(20, parseInt(formTotalSubtasks, 10) || 3)
      )

      const created: KanbanTaskItem = {
        id: `t-${Date.now()}`,
        code: formCode.trim() ? formCode.trim().toUpperCase() : autoCode,
        title: formTitle.trim(),
        tag: formCategory,
        priority: formPriority,
        column: formColumn,
        assignee: formAssignee.trim().toUpperCase().slice(0, 2) || "SR",
        isAgentAssigned: formIsAgent,
        completedSubtasks: formColumn === "shipped" ? parsedSubtasks : 0,
        totalSubtasks: parsedSubtasks,
      }

      updateTasks((prev) => [created, ...prev])
      onTaskCreate?.(created)

      setFormTitle("")
      setFormCode("")
      setDialogOpen(false)
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
        {/* Top Kanban Header, Search, Category Filter & Modal Trigger */}
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-200/80 pb-4 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {title ||
                  (variant === "agent-queue"
                    ? "Autonomous Agent Task Queue"
                    : "Sprint & Agentic Kanban Board")}
              </h3>
              <Badge variant="blue" className="font-mono text-[10px]">
                {filteredTasks.length} tasks
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Search Input + Customizable Category ToggleGroup + New Task Modal Trigger */}
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-8 w-40 sm:w-48 text-xs"
            />

            <ToggleGroup
              size="sm"
              value={filterTag}
              onValueChange={setFilterTag}
              items={[
                { value: "All", label: "All" },
                ...categories.map((cat) => ({
                  value: cat.id,
                  label: cat.label,
                })),
              ]}
            />

            {/* Global Dialog Primitive for Rich Task Creation */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="primary" size="sm">
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Task</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Kanban Task</DialogTitle>
                  <DialogDescription>
                    Configure task parameters, category tag, priority, target column, and autonomous agent assignment.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateTaskSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="kanban-task-title">Task title</Label>
                    <Input
                      id="kanban-task-title"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Integrate Gemini 3.1 streaming webhook"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Category / Tag</Label>
                      <Select
                        value={formCategory}
                        onValueChange={setFormCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Priority</Label>
                      <Select
                        value={formPriority}
                        onValueChange={(val) =>
                          setFormPriority(val as KanbanPriority)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <Label>Column</Label>
                      <Select value={formColumn} onValueChange={setFormColumn}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          {visibleColumns.map((col) => (
                            <SelectItem key={col.id} value={col.id}>
                              {col.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label optional>Task code</Label>
                      <Input
                        value={formCode}
                        onChange={(e) => setFormCode(e.target.value)}
                        placeholder={`${taskCodePrefix}-${125 + tasks.length}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Assignee &amp; Subtasks</Label>
                      <div className="flex items-center gap-1.5">
                        <Input
                          value={formAssignee}
                          onChange={(e) => setFormAssignee(e.target.value)}
                          placeholder="SR"
                          maxLength={3}
                          className="w-14 text-center uppercase"
                          title="Assignee initials"
                        />
                        <Input
                          type="number"
                          min={1}
                          max={20}
                          value={formTotalSubtasks}
                          onChange={(e) => setFormTotalSubtasks(e.target.value)}
                          title="Total subtasks"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <Bot className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Assign to Autonomous AI Agent</span>
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Marks this task with the AI Agent badge for automated execution.
                      </p>
                    </div>
                    <Switch
                      checked={formIsAgent}
                      onCheckedChange={setFormIsAgent}
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Create Task</span>
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        col.dotClass || "bg-blue-600"
                      )}
                    />
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
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <GripVertical className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                          <span className="font-mono text-[10px] font-medium text-zinc-400">
                            {task.code}
                          </span>
                          <Badge
                            variant={categoryBadgeMap[task.tag] || "default"}
                            className="px-1.5 py-0 text-[9px]"
                          >
                            {task.tag}
                          </Badge>
                          <Badge
                            variant={PRIORITY_BADGE_VARIANT[task.priority]}
                            className="px-1.5 py-0 text-[9px]"
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1">
                          {task.isAgentAssigned && (
                            <Badge
                              variant="blue"
                              className="px-1.5 py-0 text-[9px]"
                            >
                              <Bot className="h-2.5 w-2.5" />
                              Agent
                            </Badge>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDeleteTask(task.id)}
                            aria-label={`Delete ${task.code}`}
                            className="opacity-0 group-hover:opacity-100 h-5 w-5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
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
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                            )}
                          >
                            {task.isAgentAssigned ? (
                              <Bot className="h-3 w-3" />
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
  }
)

KanbanBoardBlock.displayName = "KanbanBoardBlock"
