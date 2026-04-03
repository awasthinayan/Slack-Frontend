import { InfoIcon, LucideLoader2, SearchIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useGetWorkspaceDetailsById } from '@/Hooks/Apis/Workspaces/useGetWorkspaceById';

export const WorkspaceOptions = () => {
  const { workspaceId } = useParams();

  const { isPending, workspace } = useGetWorkspaceDetailsById(workspaceId);
  const workspaceTitle =
    workspace?.workspaceName || workspace?.name || 'workspace';

  if (isPending) {
    return (
      <div className="flex h-14 items-center px-4">
        <LucideLoader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <nav className="flex h-14 items-center px-4 bg-sidebar-accent/50 ">
      <div className="flex-1" />
      <div>
        <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl px-4 py-4 text-sm shadow-md transition-all duration-200 cursor-pointer">
          <SearchIcon className="h-4 w-4 text-white" />
          <span className="capitalize">search {workspaceTitle}</span>
        </Button>
      </div>

      <div className="ml-auto flex flex-1 justify-end items-center">
        <Button className="cursor-pointer" variant="transparent" size="icon-sm">
          <InfoIcon className="mr-2 h-5 w-5 text-taupe-500" />
        </Button>
      </div>
    </nav>
  );
};
