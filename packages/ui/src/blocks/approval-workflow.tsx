import * as React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Plus,
  Search,
  AlertTriangle,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Button, ToggleGroup } from "../primitives/button";
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

export interface ApprovalRequestItem {
  id: string;
  code: string;
  title: string;
  category: "wire-transfer" | "leave-request" | "expense-claim" | "access-grant";
  requesterName: string;
  requesterRole: string;
  requesterAvatar?: string;
  amountOrDuration: string;
  submittedAt: string;
  riskLevel: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected";
  approversRequired: number;
  approversSigned: number;
  notes?: string;
}

export interface ApprovalWorkflowBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant
   * - "default": Full Maker-Checker Approval Queue (Core Banking & HRMS)
   * - "compact": Compact pending approvals widget
   */
  variant?: "default" | "compact";
  /** Initial or controlled approval requests */
  requests?: ApprovalRequestItem[];
  /** Callback fired when an item is approved */
  onApprove?: (id: string, item: ApprovalRequestItem) => void;
  /** Callback fired when an item is rejected */
  onReject?: (id: string, item: ApprovalRequestItem) => void;
  /** Callback fired when a new request is created via the modal */
  onRequestCreate?: (newRequest: ApprovalRequestItem) => void;
}

const DEFAULT_REQUESTS: ApprovalRequestItem[] = [
  {
    id: "req-1",
    code: "TRX-9941",
    title: "SWIFT Outbound Wire — Cloud Infrastructure Settlement",
    category: "wire-transfer",
    requesterName: "Nadia Kusuma",
    requesterRole: "VP Treasury • Finance",
    requesterAvatar: "https://i.pravatar.cc/120?img=5",
    amountOrDuration: "$148,500.00 USD",
    submittedAt: "14m ago",
    riskLevel: "high",
    status: "pending",
    approversRequired: 2,
    approversSigned: 1,
    notes: "Dual-control Maker-Checker required for wires exceeding $100,000 USD.",
  },
  {
    id: "req-2",
    code: "HR-4082",
    title: "Annual Paid Leave — Q4 Family Sabbatical",
    category: "leave-request",
    requesterName: "Rizky Pratama",
    requesterRole: "Staff Backend Engineer • Core Platform",
    requesterAvatar: "https://i.pravatar.cc/120?img=12",
    amountOrDuration: "8 Working Days (Nov 18 – Nov 27)",
    submittedAt: "1h ago",
    riskLevel: "low",
    status: "pending",
    approversRequired: 1,
    approversSigned: 0,
    notes: "Handover completed with Dimas & Sarah on payment gateway on-call.",
  },
  {
    id: "req-3",
    code: "EXP-2190",
    title: "Enterprise Client Summit Flight & Hotel Reimbursement",
    category: "expense-claim",
    requesterName: "Amanda Lim",
    requesterRole: "Enterprise Account Director • APAC",
    requesterAvatar: "https://i.pravatar.cc/120?img=32",
    amountOrDuration: "$3,420.00 SGD",
    submittedAt: "3h ago",
    riskLevel: "medium",
    status: "pending",
    approversRequired: 1,
    approversSigned: 0,
    notes: "Receipts verified by OCR policy engine (100% compliant).",
  },
  {
    id: "req-4",
    code: "IAM-7710",
    title: "Production Core Banking Read-Replica DB Access (JIT)",
    category: "access-grant",
    requesterName: "Vikram Patel",
    requesterRole: "Principal SRE • Security",
    requesterAvatar: "https://i.pravatar.cc/120?img=68",
    amountOrDuration: "4 Hours JIT Window",
    submittedAt: "5h ago",
    riskLevel: "high",
    status: "approved",
    approversRequired: 2,
    approversSigned: 2,
    notes: "Approved for incident post-mortem query #INC-802.",
  },
];

const CATEGORY_META: Record<
  ApprovalRequestItem["category"],
  { label: string; badgeVariant: "default" | "blue" | "amber" | "outline" }
> = {
  "wire-transfer": { label: "Core Banking Wire", badgeVariant: "blue" },
  "leave-request": { label: "HRMS Leave", badgeVariant: "default" },
  "expense-claim": { label: "Expense Claim", badgeVariant: "outline" },
  "access-grant": { label: "JIT Security Access", badgeVariant: "amber" },
};

export function ApprovalWorkflowBlock({
  variant = "default",
  requests: initialRequests = DEFAULT_REQUESTS,
  onApprove,
  onReject,
  onRequestCreate,
  className,
  ...props
}: ApprovalWorkflowBlockProps) {
  const [requests, setRequests] = React.useState<ApprovalRequestItem[]>(initialRequests);
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // New Request Modal State
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] =
    React.useState<ApprovalRequestItem["category"]>("wire-transfer");
  const [newAmountOrDuration, setNewAmountOrDuration] = React.useState("$25,000.00 USD");
  const [newRequester, setNewRequester] = React.useState("Saeful Rohman");
  const [newRole] = React.useState("Head of Engineering");
  const [newRisk, setNewRisk] = React.useState<ApprovalRequestItem["riskLevel"]>("medium");
  const [newNotes, setNewNotes] = React.useState("");

  React.useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const handleAction = (id: string, nextStatus: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated: ApprovalRequestItem = {
          ...item,
          status: nextStatus,
          approversSigned:
            nextStatus === "approved" ? item.approversRequired : item.approversSigned,
        };
        if (nextStatus === "approved") onApprove?.(id, updated);
        if (nextStatus === "rejected") onReject?.(id, updated);
        return updated;
      })
    );
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const prefix =
      newCategory === "wire-transfer"
        ? "TRX"
        : newCategory === "leave-request"
          ? "HR"
          : newCategory === "expense-claim"
            ? "EXP"
            : "IAM";

    const created: ApprovalRequestItem = {
      id: `req-${Date.now()}`,
      code: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle.trim(),
      category: newCategory,
      requesterName: newRequester.trim() || "Saeful Rohman",
      requesterRole: newRole.trim() || "Enterprise Admin",
      amountOrDuration: newAmountOrDuration.trim() || "$10,000.00 USD",
      submittedAt: "Just now",
      riskLevel: newRisk,
      status: "pending",
      approversRequired: newRisk === "high" ? 2 : 1,
      approversSigned: 0,
      notes: newNotes.trim() || "Submitted via Maker-Checker portal.",
    };

    setRequests((prev) => [created, ...prev]);
    onRequestCreate?.(created);
    setNewTitle("");
    setNewNotes("");
    setDialogOpen(false);
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = filterStatus === "all" ? true : req.status === filterStatus;
    const matchesSearch =
      !searchQuery.trim() ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requesterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;

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
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Maker-Checker Approval Center
                </h3>
                <Badge variant="amber" dot>
                  {pendingCount} Pending
                </Badge>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Dual-authorization workflow for Core Banking wires, HRMS leave & JIT access
              </p>
            </div>
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" size="sm">
              <Plus className="h-3.5 w-3.5" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Maker-Checker Request</DialogTitle>
              <DialogDescription>
                Create a new authorization request for Treasury wire transfer, HRMS leave, or expense approval.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="req-title">Request Title / Purpose</Label>
                <Input
                  id="req-title"
                  placeholder="e.g., Q4 Vendor Settlement or Paternity Leave"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Workflow Category</Label>
                  <Select
                    value={newCategory}
                    onValueChange={(v) =>
                      setNewCategory(v as ApprovalRequestItem["category"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wire-transfer">Core Banking Wire</SelectItem>
                      <SelectItem value="leave-request">HRMS Leave Request</SelectItem>
                      <SelectItem value="expense-claim">Expense Reimbursement</SelectItem>
                      <SelectItem value="access-grant">JIT Security Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Risk / Control Tier</Label>
                  <Select
                    value={newRisk}
                    onValueChange={(v) =>
                      setNewRisk(v as ApprovalRequestItem["riskLevel"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (1 Approver)</SelectItem>
                      <SelectItem value="medium">Medium (1 Approver)</SelectItem>
                      <SelectItem value="high">High (2 Approvers / Dual-Control)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="req-amount">Amount or Duration</Label>
                  <Input
                    id="req-amount"
                    placeholder="$25,000.00 USD or 5 Days"
                    value={newAmountOrDuration}
                    onChange={(e) => setNewAmountOrDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="req-requester">Requester Name</Label>
                  <Input
                    id="req-requester"
                    value={newRequester}
                    onChange={(e) => setNewRequester(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-notes">Audit Justification / Handover Notes</Label>
                <Input
                  id="req-notes"
                  placeholder="Supporting policy reference or handover contact..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
              </div>

              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary" size="sm">
                  Submit for Approval
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Search Toolbar */}
      {variant === "default" && (
        <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ToggleGroup
            size="sm"
            value={filterStatus}
            onValueChange={(v) => v && setFilterStatus(v)}
            items={[
              { value: "all", label: `All (${requests.length})` },
              { value: "pending", label: `Pending (${pendingCount})` },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
          />

          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search code, requester, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-8 text-xs"
            />
          </div>
        </div>
      )}

      {/* Request Cards */}
      <div className="mt-4 space-y-3">
        {filteredRequests.map((item) => {
          const catMeta = CATEGORY_META[item.category];
          return (
            <div
              key={item.id}
              className="group rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {item.code}
                    </span>
                    <Badge variant={catMeta.badgeVariant}>
                      {catMeta.label}
                    </Badge>
                    {item.riskLevel === "high" && (
                      <Badge variant="rose">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Dual-Control High Risk
                      </Badge>
                    )}
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.submittedAt}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={item.requesterAvatar}
                        fallback={item.requesterName.slice(0, 2).toUpperCase()}
                        size="xs"
                      />
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {item.requesterName}
                      </span>
                      <span>• {item.requesterRole}</span>
                    </div>
                  </div>

                  {item.notes && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                      {item.notes}
                    </p>
                  )}
                </div>

                {/* Right Column: Value + Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="text-left lg:text-right">
                    <div className="text-sm font-bold font-mono text-zinc-900 dark:text-zinc-50">
                      {item.amountOrDuration}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Signatures: {item.approversSigned}/{item.approversRequired} verified
                    </div>
                  </div>

                  {item.status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleAction(item.id, "rejected")}
                      >
                        <XCircle className="h-3.5 w-3.5 text-rose-500" />
                        Reject
                      </Button>
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => handleAction(item.id, "approved")}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                    </div>
                  ) : item.status === "approved" ? (
                    <Badge variant="emerald">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Authorized & Dispatched
                    </Badge>
                  ) : (
                    <Badge variant="rose">
                      <XCircle className="h-3 w-3 mr-1" />
                      Rejected
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
