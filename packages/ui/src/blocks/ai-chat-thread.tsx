import * as React from "react";
import {
  Sparkles,
  Terminal,
  Code2,
  Send,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/button";
import { Badge } from "../primitives/badge";
import { Input } from "../primitives/input";

export interface AgentToolCallItem {
  id: string;
  toolName: string;
  durationMs: number;
  status: "success" | "running";
  inputSummary: string;
  outputJson: string;
}

export interface ChatTurnMessage {
  id: string;
  role: "user" | "assistant";
  author: string;
  timestamp: string;
  content: string;
  modelBadge?: string;
  toolCalls?: AgentToolCallItem[];
  artifactTitle?: string;
  artifactCode?: string;
}

export interface AiChatThreadBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Initial or controlled conversation turns */
  messages?: ChatTurnMessage[];
  /** Callback fired when the user sends a follow-up message */
  onSendMessage?: (text: string) => void;
}

const DEFAULT_MESSAGES: ChatTurnMessage[] = [
  {
    id: "msg-1",
    role: "user",
    author: "Saeful Rohman",
    timestamp: "10:14 AM",
    content:
      "Audit the Q4 SWIFT settlement anomalies in USD Nostro and generate a TypeScript reconciliation guard for transactions above $100k.",
  },
  {
    id: "msg-2",
    role: "assistant",
    author: "Ethereal Copilot",
    timestamp: "10:14 AM",
    modelBadge: "Gemini 3.1 Pro • Thinking",
    content:
      "I inspected the ISO-20022 ledger and verified all high-value outbound wires. Only 1 transaction (`SWFT-2026-8819` for `$250,000.00`) is currently held in Maker-Checker AML review. Below is the automated dual-control guard.",
    toolCalls: [
      {
        id: "tc-1",
        toolName: "mcp.core_banking.query_swift_ledger",
        durationMs: 184,
        status: "success",
        inputSummary: '{ "currency": "USD", "minAmount": 100000, "window": "24h" }',
        outputJson:
          '{ "matched": 2, "settled": 1, "pendingDualControl": ["SWFT-2026-8819"] }',
      },
      {
        id: "tc-2",
        toolName: "mcp.hrms.verify_approver_signature",
        durationMs: 92,
        status: "success",
        inputSummary: '{ "role": "VP_TRERASURY", "quorum": 2 }',
        outputJson: '{ "status": "VALID_QUORUM", "signers": ["EMP-0108", "EMP-0042"] }',
      },
    ],
    artifactTitle: "reconcile-dual-control.ts",
    artifactCode: `export function assertDualControlGuard(tx: { amountUsd: number; signatures: string[] }) {
  if (tx.amountUsd >= 100_000 && tx.signatures.length < 2) {
    throw new Error("MAKER_CHECKER_QUORUM_REQUIRED: Minimum 2 signatures required.");
  }
  return { authorized: true, iso20022Compliant: true };
}`,
  },
];

export function AiChatThreadBlock({
  messages: initialMessages = DEFAULT_MESSAGES,
  onSendMessage,
  className,
  ...props
}: AiChatThreadBlockProps) {
  const [messages, setMessages] =
    React.useState<ChatTurnMessage[]>(initialMessages);
  const [expandedTools, setExpandedTools] = React.useState<Record<string, boolean>>({
    "tc-1": true,
  });
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState("");

  const toggleTool = (id: string) => {
    setExpandedTools((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const userMsg: ChatTurnMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      author: "Saeful Rohman",
      timestamp: "Just now",
      content: replyText.trim(),
    };

    const botReply: ChatTurnMessage = {
      id: `msg-${Date.now() + 1}`,
      role: "assistant",
      author: "Ethereal Copilot",
      timestamp: "Just now",
      modelBadge: "Gemini 3.1 Pro",
      content: `Executed verification for "${replyText.trim()}". All Maker-Checker and HRMS compliance policies passed with zero drift.`,
      toolCalls: [
        {
          id: `tc-${Date.now()}`,
          toolName: "mcp.policy_engine.evaluate",
          durationMs: 112,
          status: "success",
          inputSummary: JSON.stringify({ prompt: replyText.trim() }),
          outputJson: '{ "compliant": true, "riskScore": 0.02 }',
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    onSendMessage?.(replyText.trim());
    setReplyText("");
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-5 sm:p-6 shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Agentic Copilot Thread & Tool-Call Artifacts
              </h3>
              <Badge variant="amber" dot>
                MCP Connected
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Multi-turn agentic conversation with expandable MCP tool calls & code artifacts
            </p>
          </div>
        </div>
      </div>

      {/* Conversation Stream */}
      <div className="mt-5 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "rounded-xl border p-4",
              msg.role === "user"
                ? "border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/70 dark:bg-zinc-900/40"
                : "border-amber-500/25 bg-amber-500/[0.03] dark:bg-amber-500/[0.04]"
            )}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold",
                    msg.role === "user"
                      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                      : "bg-amber-500 text-zinc-950"
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="h-3.5 w-3.5" />
                  ) : (
                    <Bot className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {msg.author}
                </span>
                {msg.modelBadge && (
                  <Badge variant="default">
                    {msg.modelBadge}
                  </Badge>
                )}
              </div>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {msg.timestamp}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {msg.content}
            </p>

            {/* Expandable MCP Tool Calls */}
            {msg.toolCalls && msg.toolCalls.length > 0 && (
              <div className="mt-3.5 space-y-2">
                {msg.toolCalls.map((tc) => {
                  const isOpen = !!expandedTools[tc.id];
                  return (
                    <div
                      key={tc.id}
                      className="rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTool(tc.id)}
                        className="w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Terminal className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                            {tc.toolName}
                          </span>
                          <Badge variant="emerald">
                            {tc.durationMs}ms
                          </Badge>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3 py-2.5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 font-mono text-[11px] space-y-1.5">
                          <div className="text-zinc-500 dark:text-zinc-400">
                            <span className="font-bold text-zinc-700 dark:text-zinc-300">
                              args:{" "}
                            </span>
                            {tc.inputSummary}
                          </div>
                          <div className="text-emerald-600 dark:text-emerald-400">
                            <span className="font-bold">return: </span>
                            {tc.outputJson}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Generated Code Artifact Card */}
            {msg.artifactCode && (
              <div className="mt-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden bg-zinc-950 text-zinc-100">
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800 bg-zinc-900/90">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>{msg.artifactTitle || "artifact.ts"}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleCopy(msg.id, msg.artifactCode!)}
                    className="text-zinc-300 hover:text-white hover:bg-zinc-800"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy Artifact
                      </>
                    )}
                  </Button>
                </div>
                <pre className="p-3.5 text-[11px] font-mono leading-relaxed overflow-x-auto text-zinc-200">
                  <code>{msg.artifactCode}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Follow-up Input Bar */}
      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
        <div className="flex-1">
          <Input
            placeholder="Ask Copilot to inspect another SWIFT batch or HRMS policy..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary" size="default">
          <Send className="h-3.5 w-3.5" />
          Send
        </Button>
      </form>
    </div>
  );
}
