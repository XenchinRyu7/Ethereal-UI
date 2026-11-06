import * as React from "react"
import { KeyRound, Copy, Check, Plus, Eye, EyeOff } from "lucide-react"
import { cn } from "../utils/cn"
import {
  SidebarShell,
  HeaderNavbar,
  PageHeaderBar,
} from "../blocks/app-shell"
import {
  UserProfileFormBlock,
  SecurityPasswordFormBlock,
  TeamRbacTableBlock,
  BillingPlanCardBlock,
} from "../blocks/settings-blocks"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../primitives/tabs"
import { Badge } from "../primitives/badge"
import { Button } from "../primitives/button"

export const WorkspaceSettingsTemplate: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null)
  const [revealSecret, setRevealSecret] = React.useState(false)

  const apiKeys = [
    {
      id: "key-prod",
      name: "Production API Key",
      token: revealSecret
        ? "sk_live_99482a7f10c3e81140b29d"
        : "sk_live_••••••••••••••••••••9d",
      scope: "Read & Write",
      lastUsed: "2 minutes ago",
    },
    {
      id: "key-ci",
      name: "CI/CD Deployment Token",
      token: "sk_ci_••••••••••••••••••••4a",
      scope: "Read-only",
      lastUsed: "3 hours ago",
    },
  ]

  return (
    <div
      className={cn(
        "flex min-h-[720px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/40 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
        className
      )}
    >
      <SidebarShell activeId="settings" />

      <div className="flex flex-1 flex-col min-w-0">
        <HeaderNavbar
          breadcrumbs={["Workspace", "Settings", "General"]}
        />

        <main className="flex-1 space-y-6 overflow-y-auto p-6">
          <PageHeaderBar
            title="Workspace Settings"
            subtitle="Manage your profile, team members, billing plan, and API keys."
          />

          <Tabs defaultValue="general" className="w-full">
            <TabsList variant="underline">
              <TabsTrigger variant="underline" value="general">
                Profile
              </TabsTrigger>
              <TabsTrigger variant="underline" value="team">
                Team
              </TabsTrigger>
              <TabsTrigger variant="underline" value="billing">
                Billing
              </TabsTrigger>
              <TabsTrigger variant="underline" value="apikeys">
                API Keys
              </TabsTrigger>
              <TabsTrigger variant="underline" value="security">
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="pt-4">
              <UserProfileFormBlock />
            </TabsContent>

            <TabsContent value="team" className="pt-4">
              <TeamRbacTableBlock />
            </TabsContent>

            <TabsContent value="billing" className="pt-4">
              <BillingPlanCardBlock />
            </TabsContent>

            <TabsContent value="apikeys" className="pt-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                      <KeyRound className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      API Keys
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Use these keys to authenticate API requests from your backend.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRevealSecret(!revealSecret)}
                    >
                      {revealSecret ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                      {revealSecret ? "Hide" : "Reveal"}
                    </Button>
                    <Button variant="primary" size="sm">
                      <Plus className="h-3.5 w-3.5" />
                      Create key
                    </Button>
                  </div>
                </div>

                <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                  {apiKeys.map((k) => (
                    <div
                      key={k.id}
                      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                            {k.name}
                          </span>
                          <Badge variant="default">{k.scope}</Badge>
                        </div>
                        <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          {k.token}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-zinc-400">
                          Used {k.lastUsed}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard?.writeText(k.token)
                            setCopiedKey(k.id)
                            setTimeout(() => setCopiedKey(null), 1500)
                          }}
                        >
                          {copiedKey === k.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          {copiedKey === k.id ? "Copied" : "Copy"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="pt-4">
              <SecurityPasswordFormBlock />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
