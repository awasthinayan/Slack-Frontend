import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SignInCard = ({
  apiErrorMessage,
  formData,
  isPending,
  isSuccess,
  onChange,
  onSubmit,
  validationError,
}) => {
  return (
    <Card className="w-full rounded-[1.5rem] border border-border/70 bg-card py-0 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <CardHeader className="gap-2 border-b border-border/70 px-6 pt-6 pb-5">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Sign in
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          Enter your email and password to continue to your workspace.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-6">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground/90">
                Email address
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoComplete="email"
                  className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm shadow-sm transition-all focus-visible:ring-primary/25 my-1"
                  onChange={onChange('email')}
                  placeholder="you@example.com"
                  type="email"
                  value={formData.email}
                />
              </div>
            </label>

            <label className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground/90">
                  Password
                </span>
                <Link
                  className="text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoComplete="current-password"
                  className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm shadow-sm transition-all focus-visible:ring-primary/25"
                  onChange={onChange('password')}
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                />
              </div>
            </label>
          </div>

          {(validationError || apiErrorMessage || isSuccess) && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                isSuccess
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-amber-200 bg-amber-50 text-amber-700'
              }`}
            >
              {isSuccess ? (
                <span className="inline-flex items-center gap-2 font-medium">
                  <CheckCircle2 className="size-4" />
                  Signed in successfully. Your workspace is ready.
                </span>
              ) : (
                validationError || apiErrorMessage
              )}
            </div>
          )}

          <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/35 px-4 py-3 text-sm">
            <label className="flex items-center gap-3 text-muted-foreground">
              <input
                className="size-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                type="checkbox"
              />
              Keep me signed in on this device
            </label>
          </div>

          <Button
            className="h-11 w-full rounded-xl bg-foreground text-background hover:bg-foreground/92 cursor-pointer"
            disabled={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Signing you in
              </>
            ) : (
              <>
                Continue to workspace
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </form>

        <Separator className="my-6" />

        <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">New here?</p>
            <p className="text-sm text-muted-foreground">Create an account.</p>
          </div>
          <Button asChild className="rounded-xl" variant="outline">
            <Link to="/signup">Create account</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
