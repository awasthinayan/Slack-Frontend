import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const GlobalErrorHandler = () => {
  const location = useLocation();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground sm:px-6">
      <div className="auth-orb auth-orb-left" />
      <div className="auth-orb auth-orb-right" />

      <Card className="relative z-10 w-full max-w-lg rounded-[1.5rem] border border-border/70 bg-card py-0 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <CardHeader className="gap-3 border-b border-border/70 px-6 pt-6 pb-5">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-500/12 dark:text-amber-300">
            <AlertTriangle className="size-5" />
          </div>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Page not found
          </CardTitle>
          <CardDescription className="text-sm leading-6">
            The page you are trying to open does not exist or may have been
            moved.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-6 py-6">
          <div className="rounded-xl border border-border/70 bg-muted/45 p-4">
            <p className="text-sm font-medium">Requested path</p>
            <p className="mt-2 break-all text-sm text-muted-foreground">
              {location.pathname}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 flex-1 rounded-xl">
              <Link to="/">
                <Home className="size-4" />
                Go to home
              </Link>
            </Button>
            <Button
              asChild
              className="h-11 flex-1 rounded-xl"
              variant="outline"
            >
              <Link to="/signin">
                <ArrowLeft className="size-4" />
                Back to sign in
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
