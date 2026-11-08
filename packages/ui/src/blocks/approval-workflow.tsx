import * as React from "react";
import { Plus, Search, ShieldCheck, Check, X } from "lucide-react";
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
  category: string;
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

export interface ApprovalCategoryOption {
  id: string;
  label: string;
  codePrefix: string;
}

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component: ApprovalRequestCard                                 */
/* -------------------------------------------------------------------------- */

export interface ApprovalRequestCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item: ApprovalRequestItem;
  categoryLabel?: string;
  onApprove?: (id: string, item: ApprovalRequestItem) => void;
  onReject?: (id: string, item: ApprovalRequestItem) => void;
}

export const ApprovalRequestCard = React.forwardRef<
  HTMLDivElement,
  ApprovalRequestCardProps
>(({ item, categoryLabel, onApprove, onReject, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white dark:bg-zinc-900 p-4 transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1.5 max-w-2xl min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="mono">{item.code}</Badge>
            <Badge
              variant={
                item.category === "wire-transfer" || item.category === "wire"
                  ? "blue"
                  : item.category === "leave-request"
                    ? "emerald"
                    : "default"
              }
            >
              {categoryLabel || item.category}
            </Badge>
            {item.riskLevel === "high" && (
              <Badge variant="rose">Dual-Control</Badge>
            )}
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {item.submittedAt}
            </span>
          </div>

          <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug">
            {item.title}
          </h4>

          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Avatar
              src={item.requesterAvatar}
              fallback={item.requesterName.slice(0, 2).toUpperCase()}
              size="xs"
              tint="blue"
            />
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {item.requesterName}
            </span>
            <span className="truncate">• {item.requesterRole}</span>
          </div>

          {item.notes && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
              {item.notes}
            </p>
          )}
        </div>

        {/* Right Column: Value + Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-200/70 dark:border-zinc-800 shrink-0">
          <div className="text-left sm:text-left lg:text-right">
            <div className="text-sm font-semibold font-mono text-zinc-900 dark:text-zinc-100">
              {item.amountOrDuration}
            </div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Quorum: {item.approversSigned}/{item.approversRequired} signed
            </div>
          </div>

          {item.status === "pending" ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="xs"
                className="flex-1 sm:flex-initial"
                onClick={() => onReject?.(item.id, item)}
              >
                <X className="h-3 w-3" />
                <span>Reject</span>
              </Button>
              <Button
                variant="primary"
                size="xs"
                className="flex-1 sm:flex-initial"
                onClick={() => onApprove?.(item.id, item)}
              >
                <Check className="h-3 w-3" />
                <span>Approve</span>
              </Button>
            </div>
          ) : item.status === "approved" ? (
            <Badge variant="emerald" dot>
              Approved
            </Badge>
          ) : (
            <Badge variant="rose" dot>
              Rejected
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
});
ApprovalRequestCard.displayName = "ApprovalRequestCard";

/* -------------------------------------------------------------------------- */
/* Composed Block: ApprovalWorkflowBlock                                      */
/* -------------------------------------------------------------------------- */

export interface ApprovalWorkflowBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom header title */
  title?: string;
  /** Custom header subtitle */
  subtitle?: string;
  /**
   * Visual variant
   * - "default": Full Maker-Checker Approval Queue (Core Banking & HRMS)
   * - "compact": Compact pending approvals widget
   */
  variant?: "default" | "compact";
  /** Customizable workflow categories */
  categories?: ApprovalCategoryOption[];
  /** Initial or controlled approval requests */
  requests?: ApprovalRequestItem[];
  /** Callback fired when an item is approved */
  onApprove?: (id: string, item: ApprovalRequestItem) => void;
  /** Callback fired when an item is rejected */
  onReject?: (id: string, item: ApprovalRequestItem) => void;
  /** Callback fired when a new request is created via the modal */
  onRequestCreate?: (newRequest: ApprovalRequestItem) => void;
}

const DEFAULT_CATEGORIES: ApprovalCategoryOption[] = [
  { id: "wire-transfer", label: "Treasury Wire", codePrefix: "TRX" },
  { id: "leave-request", label: "HRMS Leave", codePrefix: "HR" },
  { id: "expense-claim", label: "Expense Claim", codePrefix: "EXP" },
  { id: "access-grant", label: "JIT Access", codePrefix: "IAM" },
];

const DEFAULT_REQUESTS: ApprovalRequestItem[] = [
  {
    id: "req-1",
    code: "TRX-9941",
    title: "SWIFT Outbound Wire — Cloud Infrastructure Settlement",
    category: "wire-transfer",
    requesterName: "Nadia Kusuma",
    requesterRole: "VP Treasury • Finance",
    amountOrDuration: "$148,500.00 USD",
    submittedAt: "14m ago",
    riskLevel: "high",
    status: "pending",
    approversRequired: 2,
    approversSigned: 1,
    notes: "Dual-control sign-off required for wires exceeding $100,000 USD.",
  },
  {
    id: "req-2",
    code: "HR-4082",
    title: "Annual Paid Leave — Q4 Family Sabbatical",
    category: "leave-request",
    requesterName: "Rizky Pratama",
    requesterRole: "Staff Backend Engineer • Core Platform",
    amountOrDuration: "8 Working Days (Nov 18 – Nov 27)",
    submittedAt: "1h ago",
    riskLevel: "low",
    status: "pending",
    approversRequired: 1,
    approversSigned: 0,
    notes: "On-call rotation handed over to Dimas & Sarah.",
  },
  {
    id: "req-3",
    code: "EXP-2190",
    title: "Client Summit Flight & Hotel Reimbursement",
    category: "expense-claim",
    requesterName: "Amanda Lim",
    requesterRole: "Account Director • APAC",
    amountOrDuration: "$3,420.00 SGD",
    submittedAt: "3h ago",
    riskLevel: "medium",
    status: "pending",
    approversRequired: 1,
    approversSigned: 0,
  },
  {
    id: "req-4",
    code: "IAM-7710",
    title: "Production Read-Replica DB Access (JIT)",
    category: "access-grant",
    requesterName: "Vikram Patel",
    requesterRole: "Principal SRE • Security",
    amountOrDuration: "4 Hours JIT Window",
    submittedAt: "5h ago",
    riskLevel: "high",
    status: "approved",
    approversRequired: 2,
    approversSigned: 2,
  },
];

export function ApprovalWorkflowBlock({
  title = "Maker-Checker Approvals",
  subtitle = "Dual-authorization queue for treasury wires, HRMS leave requests, and access grants.",
  variant = "default",
  categories = DEFAULT_CATEGORIES,
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
  const [newCategory, setNewCategory] = React.useState<string>(
    categories[0]?.id || "wire-transfer"
  );
  const [newAmountOrDuration, setNewAmountOrDuration] = React.useState("$25,000.00 USD");
  const [newRequester, setNewRequester] = React.useState("Saeful Rohman");
  const [newRole] = React.useState("Head of Engineering");
  const [newRisk, setNewRisk] = React.useState<ApprovalRequestItem["riskLevel"]>("medium");
  const [newNotes, setNewNotes] = React.useState("");

  React.useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const categoryLabelMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.id] = c.label;
    });
    return map;
  }, [categories]);

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

    const matchedCat = categories.find((c) => c.id === newCategory);
    const prefix = matchedCat?.codePrefix || "REQ";

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
      notes: newNotes.trim() || undefined,
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
        "w-full rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-5",
        className
      )}
      {...props}
    >
      {/* Header matching KanbanBoard & PromptComposer */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <Badge variant="blue" className="font-mono text-[10px]">
              {pendingCount} pending
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
              <span>New Request</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Approval Request</DialogTitle>
              <DialogDescription>
                Submit a request for Maker-Checker review.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="req-title">Request title</Label>
                <Input
                  id="req-title"
                  placeholder="e.g., Q4 Vendor Settlement or Paid Leave"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
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
                  <Label>Control tier</Label>
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
                      <SelectItem value="low">Standard (1 Approver)</SelectItem>
                      <SelectItem value="medium">Elevated (1 Approver)</SelectItem>
                      <SelectItem value="high">Dual-Control (2 Approvers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="req-amount">Amount or duration</Label>
                  <Input
                    id="req-amount"
                    placeholder="$25,000.00 USD or 5 Days"
                    value={newAmountOrDuration}
                    onChange={(e) => setNewAmountOrDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="req-requester">Requester</Label>
                  <Input
                    id="req-requester"
                    value={newRequester}
                    onChange={(e) => setNewRequester(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="req-notes" optional>
                  Notes
                </Label>
                <Input
                  id="req-notes"
                  placeholder="Policy reference or handover notes..."
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
                <Button type="submit" variant="default" size="sm">
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Search Toolbar */}
      {variant === "default" && (
        <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="overflow-x-auto pb-1 sm:pb-0">
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
          </div>

          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Filter requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-3.5 w-3.5" />}
              className="h-8 text-xs"
            />
          </div>
        </div>
      )}

      {/* Composed Request List */}
      <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {filteredRequests.map((item) => (
          <ApprovalRequestCard
            key={item.id}
            item={item}
            categoryLabel={categoryLabelMap[item.category]}
            onApprove={(id) => handleAction(id, "approved")}
            onReject={(id) => handleAction(id, "rejected")}
          />
        ))}
      </div>
    </div>
  );
}
