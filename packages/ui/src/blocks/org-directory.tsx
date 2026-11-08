import * as React from "react";
import { Plus, Search, Users } from "lucide-react";
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
import { Avatar } from "../primitives/avatar";

export interface EmployeeProfileItem {
  id: string;
  employeeCode: string;
  name: string;
  handle: string;
  role: string;
  department: string;
  location: string;
  avatar?: string;
  status: "active" | "on-leave" | "remote";
  mrrOrKpiValue: string;
  mrrOrKpiLabel: string;
  commitsOrTasks: string;
  attendanceScore: string;
  heatmapLevels: number[]; // 36 cells (0..3)
}

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 1: EmployeeRosterItem                                */
/* -------------------------------------------------------------------------- */

export interface EmployeeRosterItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  employee: EmployeeProfileItem;
  selected?: boolean;
}

export const EmployeeRosterItem = React.forwardRef<
  HTMLButtonElement,
  EmployeeRosterItemProps
>(({ employee, selected = false, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "w-full text-left rounded-2xl border p-3 transition-all flex items-center justify-between gap-3 cursor-pointer",
        selected
          ? "border-blue-500/60 bg-blue-50/40 shadow-2xs dark:border-blue-500/50 dark:bg-blue-500/10"
          : "border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/60",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          src={employee.avatar}
          fallback={employee.name.slice(0, 2).toUpperCase()}
          size="sm"
          tint={selected ? "blue" : "neutral"}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {employee.name}
            </span>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 shrink-0">
              {employee.employeeCode}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            {employee.role}
          </p>
        </div>
      </div>

      <Badge
        variant={
          employee.status === "active"
            ? "emerald"
            : employee.status === "remote"
              ? "blue"
              : "default"
        }
        dot
        className="shrink-0"
      >
        {employee.status}
      </Badge>
    </button>
  );
});
EmployeeRosterItem.displayName = "EmployeeRosterItem";

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 2: ContributorProfileCard                            */
/* -------------------------------------------------------------------------- */

export interface ContributorProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  employee: EmployeeProfileItem;
}

export const ContributorProfileCard = React.forwardRef<
  HTMLDivElement,
  ContributorProfileCardProps
>(({ employee, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-4 sm:p-5 flex flex-col justify-between dark:border-zinc-800 dark:bg-zinc-900/50",
        className
      )}
      {...props}
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <Avatar
              src={employee.avatar}
              fallback={employee.name.slice(0, 2).toUpperCase()}
              size="lg"
              tint="blue"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {employee.name}
                </h4>
                <Badge variant="blue" className="font-mono text-[10px]">
                  {employee.employeeCode}
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {employee.role} •{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">
                  {employee.handle}
                </span>
              </p>
              <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                {employee.department} • {employee.location}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metric KPI Tiles — Responsive stack on mobile, 3 cols on sm+ */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200/90 bg-white p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-base font-semibold font-mono text-zinc-900 dark:text-zinc-100">
              {employee.mrrOrKpiValue}
            </div>
            <div className="mt-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              {employee.mrrOrKpiLabel}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200/90 bg-white p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-base font-semibold font-mono text-zinc-900 dark:text-zinc-100">
              {employee.commitsOrTasks}
            </div>
            <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              Deliverables (90d)
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200/90 bg-white p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-950">
            <div className="text-base font-semibold font-mono text-blue-600 dark:text-blue-400">
              {employee.attendanceScore}
            </div>
            <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              Attendance SLA
            </div>
          </div>
        </div>
      </div>

      {/* 36-cell Activity & Attendance Heatmap */}
      <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
            90-Day Attendance & Output Consistency
          </span>
          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
            98.4% active
          </span>
        </div>
        <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
          {employee.heatmapLevels.map((lvl, idx) => (
            <div
              key={idx}
              className={cn(
                "h-2.5 sm:h-3 rounded-[3px] transition-transform hover:scale-110",
                lvl === 3
                  ? "bg-emerald-500 dark:bg-emerald-400"
                  : lvl === 2
                    ? "bg-emerald-500/65 dark:bg-emerald-500/70"
                    : lvl === 1
                      ? "bg-emerald-500/30 dark:bg-emerald-500/35"
                      : "bg-zinc-200/80 dark:bg-zinc-800"
              )}
              title={`Day ${idx + 1}: Level ${lvl}/3`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
ContributorProfileCard.displayName = "ContributorProfileCard";

/* -------------------------------------------------------------------------- */
/* Composed Block: OrgDirectoryBlock                                          */
/* -------------------------------------------------------------------------- */

export interface OrgDirectoryBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom header title */
  title?: string;
  /** Custom header subtitle */
  subtitle?: string;
  /**
   * Visual variant:
   * - "default": Full HRMS Employee Directory + Featured Contributor & Heatmap Spotlight
   * - "spotlight": Single Contributor & Metric Profile Card (matches Landing Bento Card 7)
   */
  variant?: "default" | "spotlight";
  /** Customizable departments list */
  departments?: string[];
  /** Initial or controlled employees */
  employees?: EmployeeProfileItem[];
  /** Optional controlled selected employee ID */
  selectedEmployeeId?: string;
  /** Callback fired when an employee row is selected */
  onEmployeeSelect?: (emp: EmployeeProfileItem) => void;
  /** Callback fired when a new employee is added */
  onEmployeeCreate?: (emp: EmployeeProfileItem) => void;
}

const DEFAULT_HEATMAP: number[] = [
  1, 2, 3, 2, 3, 3, 1, 2, 3, 3, 2, 1,
  2, 3, 3, 3, 2, 3, 2, 1, 2, 3, 3, 2,
  3, 2, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3,
];

const DEFAULT_DEPARTMENTS = [
  "Core Platform",
  "Core Banking Operations",
  "People & HRMS",
  "Platform Engineering",
];

const DEFAULT_EMPLOYEES: EmployeeProfileItem[] = [
  {
    id: "emp-1",
    employeeCode: "EMP-0042",
    name: "Saeful Rohman",
    handle: "@xenchinryu7",
    role: "Principal Staff Architect",
    department: "Design Systems & Core Platform",
    location: "Jakarta, ID (Hybrid)",
    status: "active",
    mrrOrKpiValue: "$7,402",
    mrrOrKpiLabel: "MRR Impact • +15.8%",
    commitsOrTasks: "1,428",
    attendanceScore: "99.4%",
    heatmapLevels: DEFAULT_HEATMAP,
  },
  {
    id: "emp-2",
    employeeCode: "EMP-0108",
    name: "Nadia Kusuma",
    handle: "@nadiakusuma",
    role: "VP of Treasury & Risk",
    department: "Core Banking Operations",
    location: "Singapore, SG",
    status: "remote",
    mrrOrKpiValue: "$14.2M",
    mrrOrKpiLabel: "Daily Liquidity Managed",
    commitsOrTasks: "642",
    attendanceScore: "100%",
    heatmapLevels: DEFAULT_HEATMAP.map((n, i) => (i % 4 === 0 ? 3 : n)),
  },
  {
    id: "emp-3",
    employeeCode: "EMP-0154",
    name: "Rizky Pratama",
    handle: "@rizkydev",
    role: "Senior Ledger Engineer",
    department: "Settlement Engine",
    location: "Bandung, ID",
    status: "on-leave",
    mrrOrKpiValue: "99.99%",
    mrrOrKpiLabel: "RTGS Uptime SLA",
    commitsOrTasks: "984",
    attendanceScore: "98.1%",
    heatmapLevels: DEFAULT_HEATMAP.map((n, i) => (i > 30 ? 0 : n)),
  },
];

export function OrgDirectoryBlock({
  title = "People Directory & Contributor Telemetry",
  subtitle = "Employee KPI dossier, 90-day attendance matrix, and organizational placement.",
  variant = "default",
  departments = DEFAULT_DEPARTMENTS,
  employees: initialEmployees = DEFAULT_EMPLOYEES,
  selectedEmployeeId,
  onEmployeeSelect,
  onEmployeeCreate,
  className,
  ...props
}: OrgDirectoryBlockProps) {
  const [employees, setEmployees] =
    React.useState<EmployeeProfileItem[]>(initialEmployees);
  const [internalSelectedId, setInternalSelectedId] = React.useState<string>(
    initialEmployees[0]?.id ?? "emp-1"
  );
  const selectedId = selectedEmployeeId ?? internalSelectedId;
  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Add Employee Form
  const [newName, setNewName] = React.useState("");
  const [newRole, setNewRole] = React.useState("");
  const [newDept, setNewDept] = React.useState(
    departments[0] || "Core Platform"
  );
  const [newLoc, setNewLoc] = React.useState("Jakarta, ID");

  React.useEffect(() => {
    setEmployees(initialEmployees);
  }, [initialEmployees]);

  const activeEmployee =
    employees.find((e) => e.id === selectedId) || employees[0];

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created: EmployeeProfileItem = {
      id: `emp-${Date.now()}`,
      employeeCode: `EMP-0${Math.floor(200 + Math.random() * 700)}`,
      name: newName.trim(),
      handle: `@${newName.trim().toLowerCase().replace(/\s+/g, "")}`,
      role: newRole.trim() || "Senior Software Engineer",
      department: newDept,
      location: newLoc,
      status: "active",
      mrrOrKpiValue: "$4,850",
      mrrOrKpiLabel: "KPI Velocity • +12.4%",
      commitsOrTasks: "312",
      attendanceScore: "100%",
      heatmapLevels: DEFAULT_HEATMAP,
    };

    setEmployees((prev) => [created, ...prev]);
    setInternalSelectedId(created.id);
    onEmployeeSelect?.(created);
    onEmployeeCreate?.(created);
    setNewName("");
    setNewRole("");
    setDialogOpen(false);
  };

  const filteredEmployees = employees.filter(
    (e) =>
      !search.trim() ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.employeeCode.toLowerCase().includes(search.toLowerCase())
  );

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
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <Badge variant="blue" className="font-mono text-[10px]">
              {employees.length} members
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
              <span>Add Member</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Onboard Team Member</DialogTitle>
              <DialogDescription>
                Register a new employee into the organizational directory.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="emp-name">Full name</Label>
                <Input
                  id="emp-name"
                  placeholder="e.g., Dimas Anggara"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="emp-role">Role</Label>
                  <Input
                    id="emp-role"
                    placeholder="e.g., Product Designer"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Department</Label>
                  <Select value={newDept} onValueChange={setNewDept}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="emp-loc">Location</Label>
                <Input
                  id="emp-loc"
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                />
              </div>

              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="default" size="sm">
                  Save Member
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div
        className={cn(
          "mt-4 sm:mt-5 grid gap-5",
          variant === "default" ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        )}
      >
        {/* Left List: Employee Roster */}
        {variant === "default" && (
          <div className="lg:col-span-5 space-y-3">
            <Input
              placeholder="Search name, role, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-8 text-xs"
            />

            <div className="space-y-1.5">
              {filteredEmployees.map((emp) => (
                <EmployeeRosterItem
                  key={emp.id}
                  employee={emp}
                  selected={emp.id === activeEmployee?.id}
                  onClick={() => {
                    setInternalSelectedId(emp.id);
                    onEmployeeSelect?.(emp);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Right Spotlight: Contributor & Metric Profile + Heatmap */}
        {activeEmployee && (
          <ContributorProfileCard
            employee={activeEmployee}
            className={variant === "default" ? "lg:col-span-7" : "col-span-1"}
          />
        )}
      </div>
    </div>
  );
}
