import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
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

export const SignUpCard = ({
  apiErrorMessage,
  formData,
  isPending,
  isSuccess,
  onChange,
  onSubmit,
  validationError,
}) => {
  const fields = [
    {
      id: 'username',
      label: 'Username',
      placeholder: 'e.g. John Doe',
      type: 'text',
      icon: UserRound,
      autoComplete: 'username',
      value: formData.username,
    },
    {
      id: 'email',
      label: 'Work email',
      placeholder: 'you@example.com',
      type: 'email',
      icon: Mail,
      autoComplete: 'email',
      value: formData.email,
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'Create a strong password',
      type: 'password',
      icon: LockKeyhole,
      autoComplete: 'new-password',
      value: formData.password,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm password',
      placeholder: 'Repeat your password',
      type: 'password',
      icon: LockKeyhole,
      autoComplete: 'new-password',
      value: formData.confirmPassword,
    },
  ];

  return (
    <Card className="w-full rounded-[1.5rem] border border-border/70 bg-card py-0 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <CardHeader className="gap-2 border-b border-border/70 px-6 pt-6 pb-5">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          Enter your details to create a new workspace account.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-6">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-5">
            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <label key={field.id} className="space-y-2">
                  <span className="text-sm font-medium text-foreground/90">
                    {field.label}
                  </span>
                  <div className="relative">
                    <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      autoComplete={field.autoComplete}
                      className="h-11 rounded-xl border-border/70 bg-background pr-4 pl-10 text-sm shadow-sm transition-all focus-visible:ring-primary/25"
                      onChange={onChange(field.id)}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={field.value}
                    />
                  </div>
                </label>
              );
            })}
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
                  Account created successfully. You can continue to the next
                  step.
                </span>
              ) : (
                validationError || apiErrorMessage
              )}
            </div>
          )}

          <Button
            className="h-11 w-full rounded-xl bg-primary text-sm font-semibold hover:bg-primary/90 cursor-pointer"
            disabled={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Creating workspace
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          <p className="text-center text-sm leading-6 text-muted-foreground">
            By continuing, you agree to our terms, privacy policy, and workspace
            usage guidelines.
          </p>
        </form>

        <Separator className="my-6" />

        <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Already have an account?</p>
            <p className="text-sm text-muted-foreground">
              Sign in to continue.
            </p>
          </div>
          <Button
            asChild
            className="rounded-xl cursor-pointer"
            variant="outline"
          >
            <Link to="/signin">Sign in</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
