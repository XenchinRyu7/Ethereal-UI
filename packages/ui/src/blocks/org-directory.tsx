import * as React from "react";
import {
  Users,
  UserPlus,
  Search,
  MapPin,
  Building2,
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

export interface OrgDirectoryBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant:
   * - "default": Full HRMS Employee Directory + Featured Contributor & Heatmap Spotlight
   * - "spotlight": Single Contributor & Metric Profile Card (matches Landing Bento Card 7)
   */
  variant?: "default" | "spotlight";
  /** Initial or controlled employees */
  employees?: EmployeeProfileItem[];
  /** Callback fired when a new employee is added */
  onEmployeeCreate?: (emp: EmployeeProfileItem) => void;
}

const DEFAULT_HEATMAP: number[] = [
  1, 2, 3, 2, 3, 3, 1, 2, 3, 3, 2, 1,
  2, 3, 3, 3, 2, 3, 2, 1, 2, 3, 3, 2,
  3, 2, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3,
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
    avatar: "https://i.pravatar.cc/120?img=11",
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
    avatar: "https://i.pravatar.cc/120?img=5",
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
    role: "Senior Rust Ledger Engineer",
    department: "Settlement Engine",
    location: "Bandung, ID",
    avatar: "https://i.pravatar.cc/120?img=12",
    status: "on-leave",
    mrrOrKpiValue: "99.999%",
    mrrOrKpiLabel: "RTGS Uptime SLA",
    commitsOrTasks: "984",
    attendanceScore: "98.1%",
    heatmapLevels: DEFAULT_HEATMAP.map((n, i) => (i > 30 ? 0 : n)),
  },
];

export function OrgDirectoryBlock({
  variant = "default",
  employees: initialEmployees = DEFAULT_EMPLOYEES,
  onEmployeeCreate,
  className,
  ...props
}: OrgDirectoryBlockProps) {
  const [employees, setEmployees] =
    React.useState<EmployeeProfileItem[]>(initialEmployees);
  const [selectedId, setSelectedId] = React.useState<string>(
    initialEmployees[0]?.id ?? "emp-1"
  );
  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Add Employee Form
  const [newName, setNewName] = React.useState("");
  const [newRole, setNewRole] = React.useState("");
  const [newDept, setNewDept] = React.useState("Core Platform");
  const [newLoc, setNewLoc] = React.useState("Jakarta, ID");

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
    setSelectedId(created.id);
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
        "w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                HRMS People Directory & Contributor Telemetry
              </h3>
              <Badge variant="default">
                {employees.length} Active Staff
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Employee KPI dossier, 90-day attendance/contribution heatmap & org placement
            </p>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" size="sm">
              <UserPlus className="h-3.5 w-3.5" />
              Onboard Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Onboard New Employee to HRMS</DialogTitle>
              <DialogDescription>
                Register a new team member into the organizational directory and KPI tracker.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEmployee} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="emp-name">Full Legal Name</Label>
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
                  <Label htmlFor="emp-role">Job Title / Role</Label>
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
                      <SelectItem value="Core Platform">Core Platform</SelectItem>
                      <SelectItem value="Core Banking Operations">
                        Core Banking Operations
                      </SelectItem>
                      <SelectItem value="People & HRMS">People & HRMS</SelectItem>
                      <SelectItem value="AI & Agentic R&D">AI & Agentic R&D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="emp-loc">Office / Work Arrangement</Label>
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
                <Button type="submit" variant="primary" size="sm">
                  Complete Onboarding
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div
        className={cn(
          "mt-5 grid gap-5",
          variant === "default" ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        )}
      >
        {/* Left List: Employee Roster */}
        {variant === "default" && (
          <div className="lg:col-span-5 space-y-3">
            <Input
              placeholder="Search employee name, role, code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-8 text-xs"
            />

            <div className="space-y-2">
              {filteredEmployees.map((emp) => {
                const isSelected = emp.id === activeEmployee?.id;
                return (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => setSelectedId(emp.id)}
                    className={cn(
                      "w-full text-left rounded-xl border p-3 transition-all flex items-center justify-between gap-3 cursor-pointer",
                      isSelected
                        ? "border-amber-500/50 bg-amber-500/5 dark:bg-amber-500/10"
                        : "border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar
                        src={emp.avatar}
                        fallback={emp.name.slice(0, 2).toUpperCase()}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {emp.name}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                            {emp.employeeCode}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                          {emp.role}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={
                        emp.status === "active"
                          ? "emerald"
                          : emp.status === "remote"
                            ? "default"
                            : "amber"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Spotlight: Contributor & Metric Profile + Heatmap (Landing Card 7) */}
        {activeEmployee && (
          <div
            className={cn(
              "rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/40 p-5 flex flex-col justify-between",
              variant === "default" ? "lg:col-span-7" : "col-span-1"
            )}
          >
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <Avatar
                    src={activeEmployee.avatar}
                    fallback={activeEmployee.name.slice(0, 2).toUpperCase()}
                    size="lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                        {activeEmployee.name}
                      </h4>
                      <Badge variant="amber">
                        Top 1% Core
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {activeEmployee.role} • {activeEmployee.handle}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-amber-500" />
                        {activeEmployee.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-amber-500" />
                        {activeEmployee.location}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200/70 dark:border-zinc-800">
                  {activeEmployee.employeeCode}
                </span>
              </div>

              {/* 3 Metric KPI Tiles */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-3">
                  <div className="text-lg font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
                    {activeEmployee.mrrOrKpiValue}
                  </div>
                  <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    {activeEmployee.mrrOrKpiLabel}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-3">
                  <div className="text-lg font-extrabold font-mono text-zinc-900 dark:text-zinc-50">
                    {activeEmployee.commitsOrTasks}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Deliverables • 90d
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-3">
                  <div className="text-lg font-extrabold font-mono text-amber-600 dark:text-amber-400">
                    {activeEmployee.attendanceScore}
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Attendance & SLA
                  </div>
                </div>
              </div>
            </div>

            {/* 36-cell Activity & Attendance Heatmap */}
            <div className="mt-5 pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                  90-Day Attendance & Engineering Velocity Matrix
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                  Verified by HRMS Biometric & Git Telemetry
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1.5">
                {activeEmployee.heatmapLevels.map((lvl, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-3.5 rounded-[4px] transition-transform hover:scale-110",
                      lvl === 3
                        ? "bg-amber-500 shadow-xs shadow-amber-500/30"
                        : lvl === 2
                          ? "bg-amber-500/60"
                          : lvl === 1
                            ? "bg-amber-500/30"
                            : "bg-zinc-200 dark:bg-zinc-800"
                    )}
                    title={`Day ${idx + 1}: Level ${lvl}/3`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
