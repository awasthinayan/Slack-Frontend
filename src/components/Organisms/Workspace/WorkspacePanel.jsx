import {
  AlertTriangleIcon,
  FilePenLineIcon,
  HashIcon,
  Loader,
  SendIcon,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { SideBarItem } from '@/components/Atoms/SideBarItem/SideBarItem';
import { WorkspacePanelHeader } from '@/components/Molecules/Workspace/WorkspacePanelHeader';
import { WorkspacePanelSection } from '@/components/Molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceDetailsById } from '@/Hooks/Apis/Workspaces/useGetWorkspaceById';

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();

  const { isFetching, workspace, isSuccess } =
    useGetWorkspaceDetailsById(workspaceId);
  const channels = workspace?.channels ?? [];

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
    <div className="flex h-full w-full flex-col">
      <WorkspacePanelHeader workspace={workspace} />

      <div className="flex flex-col px-3 mt-3">
        <div className="mb-3 flex flex-col gap-1">
          <SideBarItem
            label="Drafts"
            icon={FilePenLineIcon}
            Id="drafts"
            variant="default"
            className="cursor-pointer"
          />
          <SideBarItem
            label="Sends"
            icon={SendIcon}
            Id="sends"
            variant="default"
            className="cursor-pointer"
          />
        </div>

        <WorkspacePanelSection title="Channels">
          {channels.length ? (
            channels.map((channel) => (
              <SideBarItem
                key={channel._id}
                label={channel.ChannelName}
                icon={HashIcon}
                Id={channel._id}
                variant="default"
              />
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white/40 px-3 py-4 text-sm text-slate-600">
              No channels yet.
            </p>
          )}
        </WorkspacePanelSection>
      </div>
    </div>
  );
};
