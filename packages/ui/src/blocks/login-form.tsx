import * as React from "react"
import { Mail, ArrowRight, Lock, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "../utils/cn"
import { Button } from "../primitives/button"
import { Input, Label } from "../primitives/input"
import { PasswordInput } from "../primitives/password-input"
import { Checkbox } from "../primitives/checkbox"
import { Spinner } from "../primitives/spinner"

export interface LoginFormBlockProps {
  className?: string
  title?: string
  description?: string
  defaultEmail?: string
  onSuccess?: (credentials: { email: string; rememberMe: boolean }) => void
  onSocialLogin?: (provider: "google" | "github") => void
  onForgotPassword?: () => void
  onSignUpClick?: () => void
  onSsoClick?: () => void
}

export const LoginFormBlock: React.FC<LoginFormBlockProps> = ({
  className,
  title = "Welcome back",
  description = "Sign in to access your workspace and team projects.",
  defaultEmail = "",
  onSuccess,
  onSocialLogin,
  onForgotPassword,
  onSignUpClick,
  onSsoClick,
}) => {
  const [email, setEmail] = React.useState(defaultEmail)
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
      return
    }
    if (!password) {
      setStatus("error")
      setErrorMessage("Please enter your account password.")
      return
    }

    setStatus("idle")
    setIsLoading(true)

    // Simulate async authentication verification
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
      onSuccess?.({ email, rememberMe })
    }, 1200)
  }

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl border border-border bg-card p-7 shadow-xl text-card-foreground dark:shadow-black/20",
        className
      )}
    >
      <div className="space-y-1.5 text-center sm:text-left">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
          <Lock className="h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {status === "success" ? (
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-4 text-center dark:border-emerald-500/30 dark:bg-emerald-950/20">
          <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-2" />
          <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
            Authentication Verified
          </h4>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
            Redirecting to your dashboard...
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setStatus("idle")
              setPassword("")
            }}
          >
            Sign in with another account
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onSocialLogin?.("google")}
              className="flex h-9.5 items-center justify-center gap-2 rounded-lg border border-input bg-background text-xs font-medium text-foreground transition hover:bg-muted active:scale-[0.98] cursor-pointer shadow-2xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => onSocialLogin?.("github")}
              className="flex h-9.5 items-center justify-center gap-2 rounded-lg border border-input bg-background text-xs font-medium text-foreground transition hover:bg-muted active:scale-[0.98] cursor-pointer shadow-2xs"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <span className="relative bg-card px-2.5 text-[11px] uppercase tracking-wider text-muted-foreground">
              Or continue with email
            </span>
          </div>

          {status === "error" && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-50/70 p-3 text-xs text-red-700 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email address</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-[11px] font-medium text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <PasswordInput
                id="login-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                />
                <span className="text-xs text-muted-foreground">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-5 space-y-2 text-center text-xs text-muted-foreground">
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onSignUpClick}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
              >
                Sign up
              </button>
            </p>
            <div>
              <button
                type="button"
                onClick={onSsoClick}
                className="text-[11px] text-muted-foreground/80 hover:text-foreground hover:underline cursor-pointer"
              >
                Sign in with Enterprise SSO &rarr;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
