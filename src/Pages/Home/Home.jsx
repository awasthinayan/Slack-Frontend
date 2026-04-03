import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserButton from '@/components/Atoms/UserButton/UserButton';
import { LAST_WORKSPACE_KEY } from '@/Context/AuthContext';
import { useFetchWorkspace } from '@/Hooks/Apis/Workspaces/useFetchWorkspace';

export const Home = () => {
  const { isFetching, workspaces } = useFetchWorkspace();

  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) return;

    if (!workspaces || workspaces.length === 0) {
      console.log('No workspace found creating one');
    } else {
      const lastWorkspaceId = localStorage.getItem(LAST_WORKSPACE_KEY);
      const preferredWorkspace = workspaces.find(
        (workspace) => workspace?._id === lastWorkspaceId
      );
      const fallbackWorkspace = workspaces[0];
      const nextWorkspaceId =
        preferredWorkspace?._id || fallbackWorkspace?._id;

      if (nextWorkspaceId) {
        navigate(`/workspace/${nextWorkspaceId}`);
      }
    }
  }, [isFetching, workspaces, navigate]);

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
            We&apos;re checking your workspaces and taking you to the right one.
          </p>
        </div>

        <div className="flex items-center justify-center rounded-[24px] border border-border/70 bg-background/75 p-6 shadow-inner cursor-pointer">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
