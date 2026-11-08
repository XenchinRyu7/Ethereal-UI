import * as React from "react";
import {
  Terminal,
  Send,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Cpu,
  FileCode2,
} from "lucide-react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/button";
import { Badge } from "../primitives/badge";
import { Input } from "../primitives/input";
import { Avatar } from "../primitives/avatar";

export interface AgentToolCallItem {
  id: string;
  toolName: string;
  durationMs: number;
  status: "success" | "running" | "error";
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

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 1: ToolCallExecutionCard                             */
/* -------------------------------------------------------------------------- */

export interface ToolCallExecutionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  toolCall: AgentToolCallItem;
  defaultExpanded?: boolean;
}

export const ToolCallExecutionCard = React.forwardRef<
  HTMLDivElement,
  ToolCallExecutionCardProps
>(({ toolCall, defaultExpanded = false, className, ...props }, ref) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-zinc-200/90 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/70 overflow-hidden transition-colors hover:border-zinc-300 dark:hover:border-zinc-700",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-zinc-100/80 dark:hover:bg-zinc-800/70 cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          )}
          <Terminal className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="font-mono text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate">
            {toolCall.toolName}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            variant={
              toolCall.status === "error"
                ? "rose"
                : toolCall.status === "running"
                  ? "blue"
                  : "emerald"
            }
            dot
            className="font-mono text-[10px] px-1.5 py-0"
          >
            {toolCall.durationMs}ms
          </Badge>
        </div>
      </button>

      {expanded && (
        <div className="px-3 py-2.5 border-t border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-[11px] space-y-1.5 overflow-x-auto">
          <div className="text-zinc-600 dark:text-zinc-400 break-all sm:break-normal">
            <span className="text-blue-600 dark:text-blue-400 font-semibold select-none">
              input:{" "}
            </span>
            {toolCall.inputSummary}
          </div>
          <div className="text-zinc-800 dark:text-zinc-200 break-all sm:break-normal">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold select-none">
              output:{" "}
            </span>
            {toolCall.outputJson}
          </div>
        </div>
      )}
    </div>
  );
});
ToolCallExecutionCard.displayName = "ToolCallExecutionCard";

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 2: CodeArtifactCard                                  */
/* -------------------------------------------------------------------------- */

export interface CodeArtifactCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  code: string;
}

export const CodeArtifactCard = React.forwardRef<
  HTMLDivElement,
  CodeArtifactCardProps
>(({ title = "artifact.ts", code, className, ...props }, ref) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-zinc-200/90 dark:border-zinc-800 overflow-hidden bg-zinc-50/80 dark:bg-zinc-950",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 px-3.5 py-2 border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/80">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="text-[11px] font-mono font-medium text-zinc-800 dark:text-zinc-200 truncate">
            {title}
          </span>
        </div>
        <Button variant="outline" size="xs" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-500" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <pre className="p-3.5 text-[11px] font-mono leading-relaxed overflow-x-auto text-zinc-800 dark:text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
});
CodeArtifactCard.displayName = "CodeArtifactCard";

/* -------------------------------------------------------------------------- */
/* Modular Sub-Component 3: ChatMessageBubble                                 */
/* -------------------------------------------------------------------------- */

export interface ChatMessageBubbleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message: ChatTurnMessage;
  defaultExpandFirstTool?: boolean;
}

export const ChatMessageBubble = React.forwardRef<
  HTMLDivElement,
  ChatMessageBubbleProps
>(({ message, defaultExpandFirstTool = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border p-3.5 sm:p-4 transition-colors",
        message.role === "user"
          ? "border-zinc-200/80 bg-zinc-50/60 dark:border-zinc-800/80 dark:bg-zinc-900/40"
          : "border-zinc-200/90 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-950",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <Avatar
            fallback={
              message.role === "user"
                ? message.author.slice(0, 2).toUpperCase()
                : "AI"
            }
            size="xs"
            tint={message.role === "assistant" ? "blue" : "neutral"}
          />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {message.author}
          </span>
          {message.modelBadge && (
            <Badge variant="blue" className="font-mono text-[10px]">
              {message.modelBadge}
            </Badge>
          )}
        </div>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          {message.timestamp}
        </span>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {message.content}
      </p>

      {message.toolCalls && message.toolCalls.length > 0 && (
        <div className="mt-3.5 space-y-2">
          {message.toolCalls.map((tc, idx) => (
            <ToolCallExecutionCard
              key={tc.id}
              toolCall={tc}
              defaultExpanded={defaultExpandFirstTool && idx === 0}
            />
          ))}
        </div>
      )}

      {message.artifactCode && (
        <div className="mt-3.5">
          <CodeArtifactCard
            title={message.artifactTitle}
            code={message.artifactCode}
          />
        </div>
      )}
    </div>
  );
});
ChatMessageBubble.displayName = "ChatMessageBubble";

/* -------------------------------------------------------------------------- */
/* Composed Block: AiChatThreadBlock                                          */
/* -------------------------------------------------------------------------- */

export interface AiChatThreadBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom block header title */
  title?: string;
  /** Custom block header subtitle */
  subtitle?: string;
  /** Status badge label in header */
  statusLabel?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Initial or controlled conversation turns */
  messages?: ChatTurnMessage[];
  /** Callback fired when the user sends a follow-up message */
  onSendMessage?: (text: string, message: ChatTurnMessage) => void;
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
    author: "Assistant",
    timestamp: "10:14 AM",
    modelBadge: "claude-4.6-sonnet",
    content:
      "Inspected the ISO-20022 ledger and verified all high-value outbound wires. One transaction (SWFT-2026-8819 for $250,000.00) is held in Maker-Checker review. Below is the dual-control validation guard.",
    toolCalls: [
      {
        id: "tc-1",
        toolName: "core_banking.query_swift_ledger",
        durationMs: 184,
        status: "success",
        inputSummary: '{ "currency": "USD", "minAmount": 100000, "window": "24h" }',
        outputJson:
          '{ "matched": 2, "settled": 1, "pendingDualControl": ["SWFT-2026-8819"] }',
      },
      {
        id: "tc-2",
        toolName: "hrms.verify_approver_quorum",
        durationMs: 92,
        status: "success",
        inputSummary: '{ "role": "VP_TREASURY", "quorum": 2 }',
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
  title = "Agentic Thread & Tool Execution",
  subtitle = "Multi-turn workspace thread with inspectable tool calls and code output.",
  statusLabel = "Connected",
  placeholder = "Send a follow-up instruction...",
  messages: initialMessages = DEFAULT_MESSAGES,
  onSendMessage,
  className,
  ...props
}: AiChatThreadBlockProps) {
  const [messages, setMessages] =
    React.useState<ChatTurnMessage[]>(initialMessages);
  const [replyText, setReplyText] = React.useState("");

  React.useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

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
      author: "Assistant",
      timestamp: "Just now",
      modelBadge: "claude-4.6-sonnet",
      content: `Completed verification for "${replyText.trim()}". All Maker-Checker and compliance policies passed without anomalies.`,
      toolCalls: [
        {
          id: `tc-${Date.now()}`,
          toolName: "policy_engine.evaluate",
          durationMs: 112,
          status: "success",
          inputSummary: JSON.stringify({ query: replyText.trim() }),
          outputJson: '{ "compliant": true, "riskScore": 0.02 }',
        },
      ],
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    onSendMessage?.(replyText.trim(), userMsg);
    setReplyText("");
  };

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-950 space-y-5",
        className
      )}
      {...props}
    >
      {/* Header matching PromptComposer & KanbanBoard */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h3>
            {statusLabel && (
              <Badge variant="emerald" dot>
                {statusLabel}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Composed Conversation Stream */}
      <div className="space-y-3.5">
        {messages.map((msg, idx) => (
          <ChatMessageBubble
            key={msg.id}
            message={msg}
            defaultExpandFirstTool={idx === 1}
          />
        ))}
      </div>

      {/* Follow-up Input Bar */}
      <form
        onSubmit={handleSend}
        className="flex flex-col gap-2 sm:flex-row sm:items-center pt-1"
      >
        <div className="flex-1 min-w-0">
          <Input
            placeholder={placeholder}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="default"
          className="w-full sm:w-auto shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Send</span>
        </Button>
      </form>
    </div>
  );
}
