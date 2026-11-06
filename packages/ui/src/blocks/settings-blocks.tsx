import * as React from "react"
import {
  Shield,
  Plus,
  CreditCard,
  Check,
  Smartphone,
  Laptop,
} from "lucide-react"
import { cn } from "../utils/cn"
import { Avatar } from "../primitives/avatar"
import { Badge } from "../primitives/badge"
import { Button } from "../primitives/button"
import { Input, Label, Textarea } from "../primitives/input"
import { Switch } from "../primitives/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../primitives/select"
import { Progress } from "../primitives/progress"

export const UserProfileFormBlock: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [saved, setSaved] = React.useState(false)
  const [timezone, setTimezone] = React.useState("utc+7")

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-6 space-y-6 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <Avatar fallback="SR" tint="blue" size="xl" status="online" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Profile details
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Update your photo and personal details here.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Change photo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Full name</Label>
          <Input defaultValue="Saeful Rohman" />
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input prefixText="boardui.com/" defaultValue="saefulrdevs" />
        </div>
        <div className="space-y-2">
          <Label>Email address</Label>
          <Input type="email" defaultValue="saeful@acme.com" />
        </div>
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc+7">Asia/Jakarta (GMT+07:00)</SelectItem>
              <SelectItem value="utc+0">UTC / London (GMT+00:00)</SelectItem>
              <SelectItem value="utc-5">America/New_York (EST)</SelectItem>
              <SelectItem value="utc+9">Asia/Tokyo (JST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2 space-y-2">
          <Label optional>Bio</Label>
          <Textarea
            autoResize
            defaultValue="Product engineer focused on design systems and web architecture."
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
          }}
        >
          {saved ? "Saved ✓" : "Save changes"}
        </Button>
      </div>
    </div>
  )
}

export const SecurityPasswordFormBlock: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [mfaEnabled, setMfaEnabled] = React.useState(true)
  const [hardwareKey, setHardwareKey] = React.useState(true)

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-6 space-y-6 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Two-factor authentication &amp; sessions
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Manage passkeys, authenticator apps, and active devices.
          </p>
        </div>
        <Badge variant="emerald" dot>
          Protected
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Authenticator App (TOTP)
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Use a 6-digit verification code when signing in.
            </p>
          </div>
          <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Passkey / Security Key
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Biometric or hardware key sign-in via WebAuthn.
            </p>
          </div>
          <Switch checked={hardwareKey} onCheckedChange={setHardwareKey} />
        </div>
      </div>

      <div className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Active sessions
        </div>
        <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-center gap-3">
              <Laptop className="h-4 w-4 text-zinc-500" />
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  MacBook Pro • Chrome 134 (Current)
                </p>
                <p className="text-[11px] text-zinc-500">
                  Jakarta, Indonesia • Active now
                </p>
              </div>
            </div>
            <Badge variant="emerald">Current</Badge>
          </div>
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  iPhone 16 Pro • Safari
                </p>
                <p className="text-[11px] text-zinc-500">
                  Last active 3 hours ago
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Revoke
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export interface TeamMember {
  id: string
  name: string
  email: string
  fallback: string
  role: string
  status: "online" | "away" | "offline"
}

export const TeamRbacTableBlock: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [members, setMembers] = React.useState<TeamMember[]>([
    {
      id: "m1",
      name: "Saeful Rohman",
      email: "saeful@acme.com",
      fallback: "SR",
      role: "owner",
      status: "online",
    },
    {
      id: "m2",
      name: "Elena Rostova",
      email: "elena@acme.com",
      fallback: "ER",
      role: "admin",
      status: "online",
    },
    {
      id: "m3",
      name: "Marcus Vance",
      email: "mvance@acme.com",
      fallback: "MV",
      role: "member",
      status: "away",
    },
  ])

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 p-5 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Team members
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Manage who has access to this workspace and their permissions.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            setMembers((prev) => [
              ...prev,
              {
                id: `m-${prev.length + 1}`,
                name: "Aria Chen",
                email: "aria@acme.com",
                fallback: "AC",
                role: "member",
                status: "online",
              },
            ])
          }
        >
          <Plus className="h-3.5 w-3.5" />
          Invite member
        </Button>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {members.map((member, idx) => (
          <div
            key={member.id}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-3.5"
          >
            <div className="flex items-center gap-3">
              <Avatar
                fallback={member.fallback}
                tint={idx % 2 === 0 ? "blue" : "neutral"}
                status={member.status}
                size="default"
              />
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {member.name}
                </p>
                <p className="text-[11px] text-zinc-500">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={member.role}
                onValueChange={(newRole) =>
                  setMembers((prev) =>
                    prev.map((m) =>
                      m.id === member.id ? { ...m, role: newRole } : m
                    )
                  )
                }
              >
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="viewer">Billing Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const BillingPlanCardBlock: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-6 space-y-6 dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Pro Plan
            </h3>
            <Badge variant="blue">Active</Badge>
          </div>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Includes unlimited projects, custom domains, and team collaboration.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            $49<span className="text-xs font-normal text-zinc-400">/month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 space-y-2 dark:border-zinc-800 dark:bg-zinc-800/40">
          <Progress value={78} label="Team seats" showValue variant="blue" />
          <p className="text-[11px] text-zinc-500">39 of 50 seats used</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 space-y-2 dark:border-zinc-800 dark:bg-zinc-800/40">
          <Progress
            value={44}
            label="Storage volume"
            showValue
            variant="emerald"
          />
          <p className="text-[11px] text-zinc-500">44 GB of 100 GB</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 space-y-2 dark:border-zinc-800 dark:bg-zinc-800/40">
          <Progress value={62} label="Monthly bandwidth" showValue variant="blue" />
          <p className="text-[11px] text-zinc-500">620 GB of 1 TB</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            <CreditCard className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              Visa ending in 4242
            </p>
            <p className="text-[11px] text-zinc-500">
              Expires 09/2028 • Default payment method
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald">
            <Check className="h-3 w-3" /> Verified
          </Badge>
          <Button variant="outline" size="sm">
            Edit card
          </Button>
        </div>
      </div>
    </div>
  )
}
