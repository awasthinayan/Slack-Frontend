import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
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

const stepContent = {
  request: {
    title: 'Forgot password',
    description:
      'Enter your account email and we will send you a verification code.',
    submitLabel: 'Send verification code',
    loadingLabel: 'Sending code',
  },
  verify: {
    title: 'Verify code',
    description:
      'Check your inbox for the OTP and enter it here to continue.',
    submitLabel: 'Verify code',
    loadingLabel: 'Verifying code',
  },
  reset: {
    title: 'Set new password',
    description:
      'Choose a new password for your account after the code is verified.',
    submitLabel: 'Reset password',
    loadingLabel: 'Resetting password',
  },
  success: {
    title: 'Password updated',
    description:
      'Your password has been reset successfully. Continue to sign in.',
  },
};

export const ForgotPasswordCard = ({
  feedback,
  formData,
  isPending,
  onChange,
  onRequestOtp,
  onResendOtp,
  onResetPassword,
  onVerifyOtp,
  step,
}) => {
  const currentStep = stepContent[step];

  const renderRequestForm = () => (
    <form className="space-y-2" onSubmit={onRequestOtp}>
      <label className="space-y-1">
        <span className="block text-sm font-medium text-foreground/90">
          Email address
        </span>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoComplete="email"
            className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm shadow-sm transition-all focus-visible:ring-primary/25"
            onChange={onChange('email')}
            placeholder="you@example.com"
            type="email"
            value={formData.email}
          />
        </div>
      </label>

      <Button
        className="h-11 w-full rounded-xl bg-foreground text-background hover:bg-foreground/92 cursor-pointer mt-2"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            {currentStep.loadingLabel}
          </>
        ) : (
          <>
            {currentStep.submitLabel}
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  );

  const renderVerifyForm = () => (
    <form className="space-y-5" onSubmit={onVerifyOtp}>
      <div className="rounded-xl border border-border/70 bg-muted/35 px-4 py-3 text-sm text-muted-foreground">
        Verification code sent to <span className="font-medium text-foreground">{formData.email}</span>
      </div>

      <label className="space-y-1">
        <span className="block text-sm font-medium text-foreground/90">
          6-digit code
        </span>
        <div className="relative">
          <ShieldCheck className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoComplete="one-time-code"
            className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm tracking-[0.35em] shadow-sm transition-all focus-visible:ring-primary/25"
            maxLength={6}
            onChange={onChange('otp')}
            placeholder="123456"
            type="text"
            value={formData.otp}
          />
        </div>
      </label>

      <div className="flex gap-3">
        <Button
          className="mt-2 h-11 flex-1 rounded-xl bg-foreground text-background hover:bg-foreground/92 cursor-pointer"
          disabled={isPending}
          size="lg"
          type="submit"
        >
          {isPending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              {currentStep.loadingLabel}
            </>
          ) : (
            <>
              {currentStep.submitLabel}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <Button
          className="h-11 rounded-xl cursor-pointer mt-2"
          disabled={isPending}
          onClick={onResendOtp}
          type="button"
          variant="outline"
        >
          Resend code
        </Button>
      </div>
    </form>
  );

  const renderResetForm = () => (
    <form className="space-y-5" onSubmit={onResetPassword}>
      <div className="grid gap-5">
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground/90">
            New password
          </span>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoComplete="new-password"
              className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm shadow-sm transition-all focus-visible:ring-primary/25"
              onChange={onChange('password')}
              placeholder="Create a new password"
              type="password"
              value={formData.password}
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground/90">
            Confirm new password
          </span>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoComplete="new-password"
              className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm shadow-sm transition-all focus-visible:ring-primary/25"
              onChange={onChange('confirmPassword')}
              placeholder="Repeat your new password"
              type="password"
              value={formData.confirmPassword}
            />
          </div>
        </label>
      </div>

      <Button
        className="h-11 w-full rounded-xl bg-primary text-sm font-semibold hover:bg-primary/90 cursor-pointer"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            {currentStep.loadingLabel}
          </>
        ) : (
          <>
            {currentStep.submitLabel}
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  );

  const renderSuccessState = () => (
    <div className="space-y-5">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-700">
        <span className="inline-flex items-center gap-2 font-medium">
          <CheckCircle2 className="size-4" />
          {feedback.message || 'Password reset successful. You can sign in now.'}
        </span>
      </div>

      <Button asChild className="h-11 w-full rounded-xl cursor-pointer" size="lg">
        <Link to="/signin">Back to sign in</Link>
      </Button>
    </div>
  );

  return (
    <Card className="w-full rounded-[1.5rem] border border-border/70 bg-card py-0 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <CardHeader className="gap-2 border-b border-border/70 px-6 pt-6 pb-5">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {currentStep.title}
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          {currentStep.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-6">
        {feedback.message && step !== 'success' && (
          <div
            className={`mb-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
              feedback.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-amber-200 bg-amber-50 text-amber-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {step === 'request' && renderRequestForm()}
        {step === 'verify' && renderVerifyForm()}
        {step === 'reset' && renderResetForm()}
        {step === 'success' && renderSuccessState()}

        <Separator className="my-6" />

        <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Remembered your password?</p>
            <p className="text-sm text-muted-foreground">
              Return to the sign-in screen.
            </p>
          </div>
          <Button asChild className="rounded-xl cursor-pointer" variant="outline">
            <Link to="/signin">Sign in</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
