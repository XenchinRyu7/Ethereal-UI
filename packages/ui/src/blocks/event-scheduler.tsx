import * as React from "react";
import { Plus, Clock, Calendar } from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/button";
import { Badge } from "../primitives/badge";
import { Input, Label } from "../primitives/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../primitives/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../primitives/dialog";

export interface ScheduledEventItem {
  id: string;
  day: number;
  title: string;
  time: string;
  category: string;
  owner: string;
}

export interface SchedulerCategoryOption {
  id: string;
  label: string;
  pillClass: string;
  dotClass: string;
}

const DEFAULT_CATEGORIES: SchedulerCategoryOption[] = [
  {
    id: "release",
    label: "Release Milestone",
    pillClass:
      "bg-blue-600 text-white dark:bg-blue-500 dark:text-white font-medium",
    dotClass: "bg-blue-600 dark:bg-blue-400",
  },
  {
    id: "sync",
    label: "Team Sync",
    pillClass:
      "bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 font-medium",
    dotClass: "bg-blue-500",
  },
  {
    id: "audit",
    label: "Compliance Audit",
    pillClass:
      "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 font-medium",
    dotClass: "bg-emerald-500",
  },
  {
    id: "shift",
    label: "On-Call Shift",
    pillClass:
      "bg-violet-50 text-violet-700 border border-violet-200/80 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30 font-medium",
    dotClass: "bg-violet-500",
  },
];

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 1: CalendarDayCell                                   */
/* -------------------------------------------------------------------------- */

export interface CalendarDayCellProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  day: number;
  events: ScheduledEventItem[];
  selected?: boolean;
  categoryMap?: Record<string, SchedulerCategoryOption>;
}

export const CalendarDayCell = React.forwardRef<
  HTMLButtonElement,
  CalendarDayCellProps
>(
  (
    {
      day,
      events,
      selected = false,
      categoryMap = {},
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "min-h-[48px] sm:min-h-[72px] rounded-xl p-1.5 sm:p-2 text-left border transition-all flex flex-col justify-between cursor-pointer",
          selected
            ? "border-blue-500/70 bg-blue-50/40 shadow-2xs dark:border-blue-500/50 dark:bg-blue-500/10"
            : events.length > 0
              ? "border-zinc-200/90 bg-zinc-50/50 hover:border-zinc-300 hover:bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60"
              : "border-zinc-200/60 bg-white hover:bg-zinc-50 dark:border-zinc-800/60 dark:bg-zinc-950 dark:hover:bg-zinc-900/50",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "text-[11px] font-mono font-semibold",
            selected
              ? "text-blue-600 dark:text-blue-400"
              : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {day}
        </span>

        {/* Mobile (< sm): Compact Dots so 7 columns never overflow */}
        {events.length > 0 && (
          <div className="flex items-center gap-1 sm:hidden mt-1">
            {events.slice(0, 3).map((ev) => {
              const cat = categoryMap[ev.category];
              return (
                <span
                  key={ev.id}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    cat?.dotClass || "bg-zinc-500"
                  )}
                />
              );
            })}
          </div>
        )}

        {/* Desktop / Tablet (sm+): Crisp Event Pills */}
        <div className="hidden sm:block space-y-1 w-full mt-1">
          {events.slice(0, 2).map((ev) => {
            const cat = categoryMap[ev.category];
            return (
              <div
                key={ev.id}
                className={cn(
                  "truncate rounded px-1.5 py-0.5 text-[10px]",
                  cat?.pillClass ||
                    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                )}
              >
                {ev.title}
              </div>
            );
          })}
        </div>
      </button>
    );
  }
);
CalendarDayCell.displayName = "CalendarDayCell";

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 2: DayAgendaCard                                     */
/* -------------------------------------------------------------------------- */

export interface DayAgendaCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  day: number;
  events: ScheduledEventItem[];
  categoryMap?: Record<string, SchedulerCategoryOption>;
}

export const DayAgendaCard = React.forwardRef<
  HTMLDivElement,
  DayAgendaCardProps
>(({ day, events, categoryMap = {}, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/40",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="mono">Day {day}</Badge>
          {events.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {events.map((ev) => {
                const cat = categoryMap[ev.category];
                return (
                  <span
                    key={ev.id}
                    className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5"
                  >
                    <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span>{ev.title}</span>
                    <span className="text-zinc-400 dark:text-zinc-500">
                      ({ev.time} • {cat?.label || ev.owner})
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              No events scheduled on Day {day}.
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
DayAgendaCard.displayName = "DayAgendaCard";

/* -------------------------------------------------------------------------- */
/* Composed Block: EventSchedulerBlock                                        */
/* -------------------------------------------------------------------------- */

export interface EventSchedulerBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom block header title */
  title?: string;
  /** Custom block header subtitle */
  subtitle?: string;
  /** Month label displayed in the header */
  monthLabel?: string;
  /** Customizable event categories */
  categories?: SchedulerCategoryOption[];
  /** Initial or controlled calendar events */
  events?: ScheduledEventItem[];
  /** Callback fired when a new event is scheduled via the modal */
  onEventCreate?: (event: ScheduledEventItem) => void;
}

const DEFAULT_EVENTS: ScheduledEventItem[] = [
  {
    id: "ev-1",
    day: 2,
    title: "Sync",
    time: "09:30 AM",
    category: "sync",
    owner: "Platform Squad",
  },
  {
    id: "ev-2",
    day: 5,
    title: "Release v2.4",
    time: "02:00 PM",
    category: "release",
    owner: "Release Train",
  },
  {
    id: "ev-3",
    day: 9,
    title: "Design Review",
    time: "11:00 AM",
    category: "sync",
    owner: "UI Guild",
  },
  {
    id: "ev-4",
    day: 12,
    title: "ISO Audit",
    time: "10:00 AM",
    category: "audit",
    owner: "Compliance",
  },
  {
    id: "ev-5",
    day: 14,
    title: "On-Call Shift",
    time: "08:00 PM",
    category: "shift",
    owner: "SRE Primary",
  },
  {
    id: "ev-6",
    day: 19,
    title: "Ship v0.0.4",
    time: "04:00 PM",
    category: "release",
    owner: "Core Team",
  },
];

export function EventSchedulerBlock({
  title,
  subtitle = "Release train calendar, shift roster, and compliance audit windows.",
  monthLabel = "November 2026",
  categories = DEFAULT_CATEGORIES,
  events: initialEvents = DEFAULT_EVENTS,
  onEventCreate,
  className,
  ...props
}: EventSchedulerBlockProps) {
  const [events, setEvents] = React.useState<ScheduledEventItem[]>(initialEvents);
  const [selectedDay, setSelectedDay] = React.useState<number>(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // New Event Modal State
  const [newTitle, setNewTitle] = React.useState("");
  const [newDay, setNewDay] = React.useState("16");
  const [newTime, setNewTime] = React.useState("10:30 AM");
  const [newCategory, setNewCategory] = React.useState<string>(
    categories[0]?.id || "release"
  );
  const [newOwner, setNewOwner] = React.useState("Core Engineering");

  React.useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const categoryMap = React.useMemo(() => {
    const map: Record<string, SchedulerCategoryOption> = {};
    categories.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [categories]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const parsedDay = Math.min(21, Math.max(1, parseInt(newDay, 10) || 15));

    const created: ScheduledEventItem = {
      id: `ev-${Date.now()}`,
      day: parsedDay,
      title: newTitle.trim(),
      time: newTime.trim() || "10:00 AM",
      category: newCategory,
      owner: newOwner.trim() || "Operations",
    };

    setEvents((prev) => [...prev, created]);
    setSelectedDay(parsedDay);
    onEventCreate?.(created);
    setNewTitle("");
    setDialogOpen(false);
  };

  const days = Array.from({ length: 21 }, (_, i) => i + 1);
  const selectedDayEvents = events.filter((e) => e.day === selectedDay);

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-5",
        className
      )}
      {...props}
    >
      {/* Header matching KanbanBoard & PromptComposer */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title || `${monthLabel} — Release & Shift Scheduler`}
            </h3>
            <Badge variant="blue" className="font-mono text-[10px]">
              {events.length} scheduled
            </Badge>
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" size="sm" className="w-full sm:w-auto">
              <Plus className="h-3.5 w-3.5" />
              <span>New Event</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Event or Shift</DialogTitle>
              <DialogDescription>
                Add a release window, team sync, compliance audit, or on-call shift.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-title">Event title</Label>
                <Input
                  id="ev-title"
                  placeholder="e.g., Core Banking DR Drill"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="ev-day">Day of month (1 – 21)</Label>
                  <Input
                    id="ev-day"
                    type="number"
                    min={1}
                    max={21}
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ev-time">Time slot</Label>
                  <Input
                    id="ev-time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label htmlFor="ev-owner">Assigned squad</Label>
                  <Input
                    id="ev-owner"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="default" size="sm">
                  Save Event
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekday Headers — Short on mobile, 3-letter on sm+ */}
      <div className="mt-4 sm:mt-5 grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {[
          { short: "M", full: "Mon" },
          { short: "T", full: "Tue" },
          { short: "W", full: "Wed" },
          { short: "T", full: "Thu" },
          { short: "F", full: "Fri" },
          { short: "S", full: "Sat" },
          { short: "S", full: "Sun" },
        ].map((d, idx) => (
          <div key={idx} className="py-1">
            <span className="sm:hidden">{d.short}</span>
            <span className="hidden sm:inline">{d.full}</span>
          </div>
        ))}
      </div>

      {/* 21-Day Interactive Grid */}
      <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-1.5">
        {days.map((day) => (
          <CalendarDayCell
            key={day}
            day={day}
            events={events.filter((e) => e.day === day)}
            selected={selectedDay === day}
            categoryMap={categoryMap}
            onClick={() => setSelectedDay(day)}
          />
        ))}
      </div>

      {/* Selected Day Agenda Card */}
      <div className="mt-4">
        <DayAgendaCard
          day={selectedDay}
          events={selectedDayEvents}
          categoryMap={categoryMap}
        />
      </div>
    </div>
  );
}
