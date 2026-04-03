import { AlertTriangleIcon, Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { WorkspacePanelHeader } from '@/components/Molecules/Workspace/WorkspacePanelHeader';
import { useGetWorkspaceDetailsById } from '@/Hooks/Apis/Workspaces/useGetWorkspaceById';

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();

  const { isFetching, workspace, isSuccess } =
    useGetWorkspaceDetailsById(workspaceId);

  if (isFetching) {
    return (
      <div>
        <Loader className="animate-spin size-6 text-white" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-y-2 text-white h-full items-center justify-center">
        <AlertTriangleIcon className="text-red-500 h-12 w-12" />
        <p className="text-sm">Something went wrong</p>
      </div>
    );
  }
  return (
    <div>
      <WorkspacePanelHeader workspace={workspace} />
    </div>
  );
};
