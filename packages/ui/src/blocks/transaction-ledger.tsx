import * as React from "react";
import {
  Landmark,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
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
  flag: string;
}

export interface LedgerTransactionItem {
  id: string;
  reference: string;
  counterparty: string;
  bankOrRail: "SWIFT" | "RTGS" | "BI-FAST" | "ACH" | "SEPA";
  direction: "inbound" | "outbound";
  amount: string;
  currency: string;
  status: "settled" | "processing" | "aml-review";
  timestamp: string;
  category: string;
}

export interface TransactionLedgerBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual mode:
   * - "default": Full Multi-Currency Treasury + Settlement Ledger
   * - "ledger-only": Compact ledger table view
   */
  variant?: "default" | "ledger-only";
  /** Multi-currency accounts */
  accounts?: TreasuryAccountBalance[];
  /** Initial or controlled transactions */
  transactions?: LedgerTransactionItem[];
  /** Callback fired when a new wire transfer is initiated */
  onInitiateTransfer?: (tx: LedgerTransactionItem) => void;
}

const DEFAULT_ACCOUNTS: TreasuryAccountBalance[] = [
  {
    currency: "USD",
    name: "JPMorgan Chase — Operating Treasury",
    ibanOrAccount: "US89 0021 4491 8820",
    balance: "$2,845,920.00",
    change24h: "+$142,000 today",
    flag: "🇺🇸",
  },
  {
    currency: "IDR",
    name: "Bank Mandiri — Payroll & BI-FAST Clearing",
    ibanOrAccount: "ID44 0081 9920 1104",
    balance: "Rp 18.450.000.000",
    change24h: "-Rp 420jt payroll",
    flag: "🇮🇩",
  },
  {
    currency: "EUR",
    name: "Deutsche Bank — SEPA Settlement Vault",
    ibanOrAccount: "DE89 3704 0044 0532",
    balance: "€940,120.50",
    change24h: "+€38,400 today",
    flag: "🇪🇺",
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
    counterparty: "PT Karya Digital Nusantara (Payroll Batch #11)",
    bankOrRail: "BI-FAST",
    direction: "outbound",
    amount: "-Rp 420.000.000",
    currency: "IDR",
    status: "settled",
    timestamp: "Today, 11:05 WIB",
    category: "HRMS Monthly Payroll",
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
  variant = "default",
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
  const [rail, setRail] = React.useState<LedgerTransactionItem["bankOrRail"]>("SWIFT");
  const [currency, setCurrency] = React.useState("USD");
  const [amount, setAmount] = React.useState("50,000.00");
  const [category, setCategory] = React.useState("Vendor Settlement");

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
        "w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Core Banking Treasury & RTGS Ledger
              </h3>
              <Badge variant="emerald" dot>
                ISO-20022 Live
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Multi-currency nostro balances, real-time SWIFT / BI-FAST rails & AML screening
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="primary" size="sm">
                <Send className="h-3.5 w-3.5" />
                Initiate Wire
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Initiate ISO-20022 Outbound Wire</DialogTitle>
                <DialogDescription>
                  Dispatch a real-time treasury wire via SWIFT, RTGS, BI-FAST, or SEPA rails.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateWire} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="wire-beneficiary">Beneficiary Legal Entity</Label>
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
                    <Label>Clearing Rail</Label>
                    <Select
                      value={rail}
                      onValueChange={(v) =>
                        setRail(v as LedgerTransactionItem["bankOrRail"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SWIFT">SWIFT Cross-Border</SelectItem>
                        <SelectItem value="RTGS">BI-RTGS High Value</SelectItem>
                        <SelectItem value="BI-FAST">BI-FAST Instant (IDR)</SelectItem>
                        <SelectItem value="SEPA">SEPA Instant (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Source Nostro Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD — JPMorgan Operating</SelectItem>
                        <SelectItem value="IDR">IDR — Mandiri Clearing</SelectItem>
                        <SelectItem value="EUR">EUR — Deutsche SEPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="wire-amount">Transfer Amount</Label>
                    <Input
                      id="wire-amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="wire-cat">Ledger Purpose Code</Label>
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
                  <Button type="submit" variant="primary" size="sm">
                    Dispatch Wire Transfer
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Multi-currency Nostro Balance Cards */}
      {variant === "default" && (
        <div className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {accounts.map((acc) => (
            <div
              key={acc.currency}
              className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {acc.flag} {acc.currency} Vault
                </span>
                <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                  {acc.ibanOrAccount}
                </span>
              </div>
              <div className="mt-2 text-lg font-bold font-mono text-zinc-900 dark:text-zinc-50">
                {acc.balance}
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 dark:text-zinc-400 truncate max-w-[180px]">
                  {acc.name}
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  {acc.change24h}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ToggleGroup
          size="sm"
          value={railFilter}
          onValueChange={(v) => v && setRailFilter(v)}
          items={[
            { value: "all", label: "All Rails" },
            { value: "SWIFT", label: "SWIFT" },
            { value: "BI-FAST", label: "BI-FAST" },
            { value: "SEPA", label: "SEPA" },
          ]}
        />

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

      {/* Settlement Ledger Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <th className="py-2.5 px-3.5">Reference & Rail</th>
              <th className="py-2.5 px-3.5">Counterparty</th>
              <th className="py-2.5 px-3.5">Category</th>
              <th className="py-2.5 px-3.5">Status</th>
              <th className="py-2.5 px-3.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
            {filteredTx.map((tx) => (
              <tr
                key={tx.id}
                className="transition-colors hover:bg-zinc-50/90 dark:hover:bg-zinc-900/50"
              >
                <td className="py-3 px-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md",
                        tx.direction === "inbound"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      {tx.direction === "inbound" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <div>
                      <div className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
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
                  {tx.status === "settled" && (
                    <Badge variant="emerald">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Settled
                    </Badge>
                  )}
                  {tx.status === "processing" && (
                    <Badge variant="default">
                      <Clock className="h-3 w-3 mr-1" />
                      Clearing
                    </Badge>
                  )}
                  {tx.status === "aml-review" && (
                    <Badge variant="amber">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      AML Hold
                    </Badge>
                  )}
                </td>
                <td
                  className={cn(
                    "py-3 px-3.5 text-right font-mono font-bold whitespace-nowrap",
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
}
