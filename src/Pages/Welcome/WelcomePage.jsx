import { ArrowRight, MessageSquareText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const quickPoints = [
  'Clean workspace access',
  'Simple team onboarding',
  'Modern interface',
];

export const WelcomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="auth-orb auth-orb-left" />
      <div className="auth-orb auth-orb-right" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_58%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="auth-grid gap-10">
          <section className="relative z-10 space-y-8">
            <div className="space-y-5">
              <span className="eyebrow-chip">
                <Sparkles className="mr-2 size-3.5" />
                Welcome
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  A simple, polished space to continue your workflow.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Sign in to continue, or create an account to get started.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-xl bg-foreground px-6 text-background hover:bg-foreground/92"
                size="lg"
              >
                <Link to="/signin">
                  Sign in
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                className="h-12 rounded-xl px-6"
                size="lg"
                variant="outline"
              >
                <Link to="/signup">Create account</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {quickPoints.map((point) => (
                <div
                  key={point}
                  className="glass-panel rounded-3xl border border-white/40 px-5 py-4"
                >
                  <p className="text-sm font-medium text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="relative z-10">
            <Card className="glass-panel overflow-hidden rounded-[2rem] border border-white/45 py-0 shadow-[0_28px_70px_rgba(15,23,42,0.14)]">
              <CardHeader className="items-center border-b border-border/60 px-6 pt-8 pb-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <MessageSquareText className="size-7" />
                </div>
                <CardTitle className="text-3xl font-semibold tracking-tight">
                  Slack App
                </CardTitle>
                <CardDescription className="max-w-sm text-sm leading-6">
                  Clean access to your workspace with a modern, focused entry
                  experience.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 px-6 py-6">
                <div className="rounded-3xl border border-border/70 bg-background/80 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">Ready when you are</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Enter your account and move directly into your workspace.
                      </p>
                    </div>
                    <div className="size-3 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(34,197,94,0.12)]" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/70 bg-card px-4 py-4">
                    <p className="text-sm font-medium text-foreground">Sign in</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Continue with your existing account.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-card px-4 py-4">
                    <p className="text-sm font-medium text-foreground">
                      Create account
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      Set up a new account in a few steps.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
};
