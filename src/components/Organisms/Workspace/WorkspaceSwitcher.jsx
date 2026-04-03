import { Check, Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getSidebarButtonClassName,
  getSidebarButtonLabelClassName,
} from '@/components/Molecules/SidebarButton/SidebarButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFetchWorkspace } from '@/Hooks/Apis/Workspaces/useFetchWorkspace';
import { useGetWorkspaceDetailsById } from '@/Hooks/Apis/Workspaces/useGetWorkspaceById';

export const WorkspaceSwitcher = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const { isFetching, workspace } = useGetWorkspaceDetailsById(workspaceId);
  const { isFetching: isFetchingWorkspaces, workspaces } = useFetchWorkspace();
  const isHighlighted = true;
  const workspaceName = workspace?.workspaceName || workspace?.name || 'Workspace';
  const workspaceInitial =
    workspaceName.trim().charAt(0).toUpperCase() || 'W';

  const handleWorkspaceSelect = (selectedWorkspaceId) => {
    if (!selectedWorkspaceId || selectedWorkspaceId === workspaceId) return;

    navigate(`/workspace/${selectedWorkspaceId}`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon-lg"
            variant="ghost"
            className={getSidebarButtonClassName(isHighlighted)}
            aria-label={`Switch workspace from ${workspaceName}`}
          >
            {isFetching ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <span className="text-sm font-semibold">{workspaceInitial}</span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          align="start"
          sideOffset={12}
          className="w-64 rounded-2xl border border-sidebar-border/80 bg-sidebar p-2 text-sidebar-foreground shadow-xl"
        >
          <DropdownMenuLabel className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/60">
            Your workspaces
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-sidebar-border/80" />

          {isFetchingWorkspaces ? (
            <div className="flex items-center gap-2 px-2 py-3 text-sm text-sidebar-foreground/70">
              <Loader className="h-4 w-4 animate-spin" />
              <span>Loading workspaces...</span>
            </div>
          ) : workspaces?.length ? (
            workspaces.map((item) => {
              const itemName = item?.workspaceName || item?.name || 'Workspace';
              const itemInitial = itemName.trim().charAt(0).toUpperCase() || 'W';
              const isActiveWorkspace = item?._id === workspaceId;

              return (
                <DropdownMenuItem
                  key={item._id}
                  onSelect={() => handleWorkspaceSelect(item._id)}
                  className="mt-1 flex items-center gap-3 rounded-xl px-2 py-2 text-sm focus:bg-sidebar-accent focus:text-sidebar-accent-foreground"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                    {itemInitial}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{itemName}</p>
                  </div>

                  {isActiveWorkspace ? (
                    <Check className="h-4 w-4 text-sidebar-primary" />
                  ) : null}
                </DropdownMenuItem>
              );
            })
          ) : (
            <div className="px-2 py-3 text-sm text-sidebar-foreground/70">
              No workspaces found
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <span className={getSidebarButtonLabelClassName(isHighlighted)}>
        Workspace
      </span>
    </div>
  );
};
