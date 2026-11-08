import * as React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Plus,
  Landmark,
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

export interface TreasuryAccountBalance {
  currency: string;
  name: string;
  ibanOrAccount: string;
  balance: string;
  change24h: string;
}

export interface LedgerTransactionItem {
  id: string;
  reference: string;
  counterparty: string;
  bankOrRail: string;
  direction: "inbound" | "outbound";
  amount: string;
  currency: string;
  status: "settled" | "processing" | "aml-review";
  timestamp: string;
  category: string;
}

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 1: TreasuryVaultCard                                 */
/* -------------------------------------------------------------------------- */

export interface TreasuryVaultCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  account: TreasuryAccountBalance;
}

export const TreasuryVaultCard = React.forwardRef<
  HTMLDivElement,
  TreasuryVaultCardProps
>(({ account, className, ...props }, ref) => {
  const isPositive = account.change24h.trim().startsWith("+");

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-4 transition-all hover:-translate-y-0.5 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge variant="blue" className="font-mono">
          {account.currency}
        </Badge>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
          {account.ibanOrAccount}
        </span>
      </div>
      <div className="mt-2.5 text-base sm:text-lg font-semibold font-mono text-zinc-900 dark:text-zinc-100 truncate">
        {account.balance}
      </div>
      <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span className="truncate">{account.name}</span>
        <span
          className={cn(
            "font-mono font-medium shrink-0",
            isPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          {account.change24h}
        </span>
      </div>
    </div>
  );
});
TreasuryVaultCard.displayName = "TreasuryVaultCard";

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 2: TransactionLedgerTable                            */
/* -------------------------------------------------------------------------- */

export interface TransactionLedgerTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  transactions: LedgerTransactionItem[];
}

export const TransactionLedgerTable = React.forwardRef<
  HTMLDivElement,
  TransactionLedgerTableProps
>(({ transactions, className, ...props }, ref) => {
  const renderStatusBadge = (status: LedgerTransactionItem["status"]) => {
    if (status === "settled") {
      return (
        <Badge variant="emerald" dot>
          Settled
        </Badge>
      );
    }
    if (status === "processing") {
      return (
        <Badge variant="blue" dot>
          Clearing
        </Badge>
      );
    }
    return (
      <Badge variant="rose" dot>
        Review
      </Badge>
    );
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-zinc-200/90 dark:border-zinc-800 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Mobile Stacked Card View (< sm) */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800 sm:hidden">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-3.5 space-y-2 bg-white dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                    tx.direction === "inbound"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  )}
                >
                  {tx.direction === "inbound" ? (
                    <ArrowDownLeft className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                  {tx.reference}
                </span>
              </div>
              <span
                className={cn(
                  "font-mono text-xs font-semibold shrink-0",
                  tx.direction === "inbound"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-900 dark:text-zinc-100"
                )}
              >
                {tx.amount}
              </span>
            </div>

            <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              {tx.counterparty}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {tx.bankOrRail} • {tx.category} • {tx.timestamp}
              </span>
              {renderStatusBadge(tx.status)}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet Table View (sm+) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              <th className="py-2.5 px-3.5">Reference</th>
              <th className="py-2.5 px-3.5">Counterparty</th>
              <th className="py-2.5 px-3.5">Category</th>
              <th className="py-2.5 px-3.5">Status</th>
              <th className="py-2.5 px-3.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="transition-colors hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50"
              >
                <td className="py-3 px-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md border",
                        tx.direction === "inbound"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      )}
                    >
                      {tx.direction === "inbound" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <div>
                      <div className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                        {tx.reference}
                      </div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {tx.bankOrRail} • {tx.timestamp}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3.5 font-medium text-zinc-800 dark:text-zinc-200">
                  {tx.counterparty}
                </td>
                <td className="py-3 px-3.5 text-zinc-500 dark:text-zinc-400">
                  {tx.category}
                </td>
                <td className="py-3 px-3.5 whitespace-nowrap">
                  {renderStatusBadge(tx.status)}
                </td>
                <td
                  className={cn(
                    "py-3 px-3.5 text-right font-mono font-semibold whitespace-nowrap",
                    tx.direction === "inbound"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-900 dark:text-zinc-100"
                  )}
                >
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
TransactionLedgerTable.displayName = "TransactionLedgerTable";

/* -------------------------------------------------------------------------- */
/* Composed Block: TransactionLedgerBlock                                     */
/* -------------------------------------------------------------------------- */

export interface TransactionLedgerBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom header title */
  title?: string;
  /** Custom header subtitle */
  subtitle?: string;
  /**
   * Visual mode:
   * - "default": Full Multi-Currency Treasury + Settlement Ledger
   * - "ledger-only": Compact ledger table view
   */
  variant?: "default" | "ledger-only";
  /** Supported clearing rails */
  rails?: string[];
  /** Multi-currency accounts */
  accounts?: TreasuryAccountBalance[];
  /** Initial or controlled transactions */
  transactions?: LedgerTransactionItem[];
  /** Callback fired when a new wire transfer is initiated */
  onInitiateTransfer?: (tx: LedgerTransactionItem) => void;
}

const DEFAULT_RAILS = ["SWIFT", "RTGS", "BI-FAST", "SEPA"];

const DEFAULT_ACCOUNTS: TreasuryAccountBalance[] = [
  {
    currency: "USD",
    name: "JPMorgan Chase • Operating",
    ibanOrAccount: "US89 0021 4491 8820",
    balance: "$2,845,920.00",
    change24h: "+$142,000 today",
  },
  {
    currency: "IDR",
    name: "Bank Mandiri • BI-FAST Clearing",
    ibanOrAccount: "ID44 0081 9920 1104",
    balance: "Rp 18.450.000.000",
    change24h: "-Rp 420jt payroll",
  },
  {
    currency: "EUR",
    name: "Deutsche Bank • SEPA Settlement",
    ibanOrAccount: "DE89 3704 0044 0532",
    balance: "€940,120.50",
    change24h: "+€38,400 today",
  },
];

const DEFAULT_TRANSACTIONS: LedgerTransactionItem[] = [
  {
    id: "tx-1",
    reference: "SWFT-2026-8841",
    counterparty: "Stripe Global Payouts Ltd",
    bankOrRail: "SWIFT",
    direction: "inbound",
    amount: "+$184,250.00",
    currency: "USD",
    status: "settled",
    timestamp: "Today, 14:22 UTC",
    category: "Merchant Settlement",
  },
  {
    id: "tx-2",
    reference: "BIFAST-992014",
    counterparty: "PT Karya Digital Nusantara (Payroll #11)",
    bankOrRail: "BI-FAST",
    direction: "outbound",
    amount: "-Rp 420.000.000",
    currency: "IDR",
    status: "settled",
    timestamp: "Today, 11:05 WIB",
    category: "HRMS Payroll",
  },
  {
    id: "tx-3",
    reference: "RTGS-774102",
    counterparty: "Amazon Web Services EMEA SARL",
    bankOrRail: "SEPA",
    direction: "outbound",
    amount: "-€64,800.00",
    currency: "EUR",
    status: "processing",
    timestamp: "Today, 09:48 UTC",
    category: "Cloud Infrastructure",
  },
  {
    id: "tx-4",
    reference: "SWFT-2026-8819",
    counterparty: "Meridian Quantitative Holdings SG",
    bankOrRail: "SWIFT",
    direction: "outbound",
    amount: "-$250,000.00",
    currency: "USD",
    status: "aml-review",
    timestamp: "Yesterday, 19:14 UTC",
    category: "Liquidity Sweep",
  },
];

export function TransactionLedgerBlock({
  title = "Treasury & Settlement Ledger",
  subtitle = "Multi-currency nostro balances and real-time clearing across SWIFT, BI-FAST, and SEPA.",
  variant = "default",
  rails = DEFAULT_RAILS,
  accounts = DEFAULT_ACCOUNTS,
  transactions: initialTransactions = DEFAULT_TRANSACTIONS,
  onInitiateTransfer,
  className,
  ...props
}: TransactionLedgerBlockProps) {
  const [transactions, setTransactions] =
    React.useState<LedgerTransactionItem[]>(initialTransactions);
  const [railFilter, setRailFilter] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Wire Transfer Modal Form State
  const [beneficiary, setBeneficiary] = React.useState("");
  const [rail, setRail] = React.useState<string>(rails[0] || "SWIFT");
  const [currency, setCurrency] = React.useState(
    accounts[0]?.currency || "USD"
  );
  const [amount, setAmount] = React.useState("50,000.00");
  const [category, setCategory] = React.useState("Vendor Settlement");

  React.useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleCreateWire = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beneficiary.trim()) return;

    const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "Rp ";
    const created: LedgerTransactionItem = {
      id: `tx-${Date.now()}`,
      reference: `${rail}-${Math.floor(100000 + Math.random() * 900000)}`,
      counterparty: beneficiary.trim(),
      bankOrRail: rail,
      direction: "outbound",
      amount: `-${symbol}${amount.trim()}`,
      currency,
      status: "processing",
      timestamp: "Just now",
      category,
    };

    setTransactions((prev) => [created, ...prev]);
    onInitiateTransfer?.(created);
    setBeneficiary("");
    setDialogOpen(false);
  };

  const filteredTx = transactions.filter((tx) => {
    const matchesRail = railFilter === "all" ? true : tx.bankOrRail === railFilter;
    const matchesSearch =
      !search.trim() ||
      tx.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    return matchesRail && matchesSearch;
  });

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
            <Landmark className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            <Badge variant="emerald" dot>
              ISO-20022
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
              <span>Initiate Wire</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Initiate Outbound Wire</DialogTitle>
              <DialogDescription>
                Dispatch a treasury wire via SWIFT, RTGS, BI-FAST, or SEPA rails.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateWire} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="wire-beneficiary">Beneficiary entity</Label>
                <Input
                  id="wire-beneficiary"
                  placeholder="e.g., Cloudflare Inc. or PT Bank Central Asia"
                  value={beneficiary}
                  onChange={(e) => setBeneficiary(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Clearing rail</Label>
                  <Select value={rail} onValueChange={setRail}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rails.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Source account</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.currency} value={acc.currency}>
                          {acc.currency} — {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="wire-amount">Amount</Label>
                  <Input
                    id="wire-amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wire-cat">Purpose category</Label>
                  <Input
                    id="wire-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                  Dispatch Wire
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Multi-currency Nostro Balance Cards */}
      {variant === "default" && (
        <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {accounts.map((acc) => (
            <TreasuryVaultCard key={acc.currency} account={acc} />
          ))}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="overflow-x-auto pb-1 sm:pb-0">
          <ToggleGroup
            size="sm"
            value={railFilter}
            onValueChange={(v) => v && setRailFilter(v)}
            items={[
              { value: "all", label: "All Rails" },
              ...rails.map((r) => ({ value: r, label: r })),
            ]}
          />
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Filter counterparty or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-3.5 w-3.5" />}
            className="h-8 text-xs"
          />
        </div>
      </div>

      {/* Composed Settlement Ledger Table */}
      <div className="mt-4">
        <TransactionLedgerTable transactions={filteredTx} />
      </div>
    </div>
  );
}
