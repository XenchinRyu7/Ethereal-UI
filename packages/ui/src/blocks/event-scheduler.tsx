import * as React from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
} from "lucide-react";
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
  category: "release" | "sync" | "audit" | "shift";
  owner: string;
}

export interface EventSchedulerBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Month label displayed in the header */
  monthLabel?: string;
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

const CATEGORY_STYLES: Record<
  ScheduledEventItem["category"],
  { pill: string; label: string }
> = {
  release: {
    pill: "bg-amber-500 text-zinc-950 font-bold",
    label: "Release Milestone",
  },
  sync: {
    pill: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold",
    label: "Team Sync",
  },
  audit: {
    pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold",
    label: "Compliance Audit",
  },
  shift: {
    pill: "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-medium",
    label: "HRMS Roster Shift",
  },
};

export function EventSchedulerBlock({
  monthLabel = "November 2026",
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
  const [newCategory, setNewCategory] =
    React.useState<ScheduledEventItem["category"]>("release");
  const [newOwner, setNewOwner] = React.useState("Core Engineering");

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
        "w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {monthLabel} — Enterprise Release & Shift Scheduler
              </h3>
              <Badge variant="amber">
                {events.length} Scheduled
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Interactive release train calendar, HRMS shift roster & compliance audit windows
            </p>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" size="sm">
              <Plus className="h-3.5 w-3.5" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Calendar Event or Shift</DialogTitle>
              <DialogDescription>
                Add a release window, team sync, compliance audit, or HRMS on-call shift to the schedule.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="ev-title">Event / Shift Name</Label>
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
                  <Label htmlFor="ev-day">Day of Month (1 – 21)</Label>
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
                  <Label htmlFor="ev-time">Time Slot (WIB / UTC)</Label>
                  <Input
                    id="ev-time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Event Category</Label>
                  <Select
                    value={newCategory}
                    onValueChange={(v) =>
                      setNewCategory(v as ScheduledEventItem["category"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="release">Release Milestone</SelectItem>
                      <SelectItem value="sync">Team Sync</SelectItem>
                      <SelectItem value="audit">Compliance Audit</SelectItem>
                      <SelectItem value="shift">HRMS Roster Shift</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ev-owner">Assigned Squad / Owner</Label>
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
                <Button type="submit" variant="primary" size="sm">
                  Add to Calendar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekday Headers */}
      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* 21-Day Interactive Grid */}
      <div className="mt-1.5 grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const dayEvents = events.filter((e) => e.day === day);
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={cn(
                "min-h-[68px] rounded-xl p-2 text-left border transition-all flex flex-col justify-between cursor-pointer",
                isSelected
                  ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 ring-2 ring-amber-500/20"
                  : dayEvents.length > 0
                    ? "border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                    : "border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-mono font-bold",
                  isSelected
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {day}
              </span>

              <div className="space-y-1 w-full">
                {dayEvents.slice(0, 2).map((ev) => (
                  <div
                    key={ev.id}
                    className={cn(
                      "truncate rounded px-1.5 py-0.5 text-[10px]",
                      CATEGORY_STYLES[ev.category].pill
                    )}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda Bar */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 p-3.5">
        <div className="flex items-center gap-3">
          <Badge variant="default">
            Day {selectedDay} Agenda
          </Badge>
          {selectedDayEvents.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {selectedDayEvents.map((ev) => (
                <span
                  key={ev.id}
                  className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5"
                >
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <strong>{ev.title}</strong> ({ev.time} • {ev.owner})
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              No events scheduled on Day {selectedDay}. Click &ldquo;New Event&rdquo; to book this slot.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
