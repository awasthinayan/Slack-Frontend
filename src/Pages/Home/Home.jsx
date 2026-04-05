import { ArrowRightIcon, LucideLoader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UserButton from '@/components/Atoms/UserButton/UserButton';
import { Button } from '@/components/ui/button';
import { LAST_WORKSPACE_KEY } from '@/Context/AuthContext';
import { useFetchWorkspace } from '@/Hooks/Apis/Workspaces/useFetchWorkspace';

export const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspace();

  const location = useLocation();
  const navigate = useNavigate();
  const lastWorkspaceId = localStorage.getItem(LAST_WORKSPACE_KEY);
  const preferredWorkspace = workspaces?.find(
    (workspace) => workspace?._id === lastWorkspaceId
  );
  const fallbackWorkspace = workspaces?.[0];
  const nextWorkspace = preferredWorkspace || fallbackWorkspace;

  const handleOpenWorkspace = () => {
    if (!nextWorkspace?._id) return;
    navigate(`/workspace/${nextWorkspace._id}`);
  };

  useEffect(() => {
    if (isFetching) return;
    if (location.state?.stayOnHome) return;

    if (!workspaces || workspaces.length === 0) {
      console.log('No workspace found creating one');
    } else {
      if (nextWorkspace?._id) {
        navigate(`/workspace/${nextWorkspace._id}`);
      }
    }
  }, [isFetching, location.state, navigate, nextWorkspace, workspaces]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_28%),linear-gradient(160deg,_hsl(var(--background))_0%,_hsl(var(--muted)/0.55)_100%)] px-6 py-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-border/70 bg-card/85 p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <div className="mb-8 space-y-3 text-center">
          <span className="inline-flex rounded-full border border-border/80 bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Slack Workspace
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Preparing your space
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Open an existing workspace or stay here on the home page.
          </p>
        </div>

        <div className="space-y-4 rounded-[24px] border border-border/70 bg-background/75 p-6 shadow-inner">
          <div className="flex items-center justify-center cursor-pointer">
            <UserButton />
          </div>

          {isFetching ? (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <LucideLoader2 className="h-4 w-4 animate-spin" />
              Loading workspaces...
            </div>
          ) : nextWorkspace ? (
            <Button
              type="button"
              onClick={handleOpenWorkspace}
              className="w-full cursor-pointer rounded-2xl"
            >
              Go to {nextWorkspace.workspaceName || nextWorkspace.name}(Workspace)
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No existing workspace found yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
