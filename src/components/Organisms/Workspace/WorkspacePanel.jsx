import {
  AlertTriangleIcon,
  FilePenLineIcon,
  HashIcon,
  Loader,
  MessageSquare,
  SendIcon,
  UserIcon,
} from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { SideBarItem } from '@/components/Atoms/SideBarItem/SideBarItem';
import { WorkspacePanelHeader } from '@/components/Molecules/Workspace/WorkspacePanelHeader';
import { WorkspacePanelSection } from '@/components/Molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceDetailsById } from '@/Hooks/Apis/Workspaces/useGetWorkspaceById';
import { useAuth } from '@/Hooks/Context/useAuth';

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();
  const location = useLocation();
  const { auth } = useAuth();

  const { isFetching, workspace, isSuccess } =
    useGetWorkspaceDetailsById(workspaceId);

  const channels = workspace?.channels ?? [];
  const members = workspace?.members ?? [];
  const authUserId = auth?.user?._id || auth?.user?.id || null;

  const isCurrentUserAdmin = members.some((member) => {
    const memberUser = member?.memberId;
    const memberId = memberUser?._id || memberUser?.id || memberUser;
    return String(memberId) === String(authUserId) && member?.role === 'admin';
  });

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

        <WorkspacePanelSection
          title="Channels"
          canCreate={isCurrentUserAdmin}
        >
          {channels.length ? (
            channels.map((channel) => (
              <SideBarItem
                key={channel._id}
                label={channel.ChannelName}
                icon={HashIcon}
                Id={channel._id}
                variant={
                  location.pathname.includes(`/channels/${channel._id}`)
                    ? 'active'
                    : 'default'
                }
              />
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white/40 px-3 py-4 text-sm text-slate-600">
              No channels yet.
            </p>
          )}
        </WorkspacePanelSection>

        <WorkspacePanelSection
          title="Members"
          canCreate={isCurrentUserAdmin}
        >
          {members.length ? (
            members.map((member) => {
              const memberUser = member?.memberId;
              const memberName =
                memberUser?.name ||
                memberUser?.username ||
                memberUser?.email ||
                'Unknown member';

              return (
                <div
                  key={memberUser?._id || member?._id || memberName}
                  className="flex items-center gap-1"
                >
                  <SideBarItem
                    icon={UserIcon}
                    label={memberName}
                    Id={memberUser?._id}
                    variant={
                      location.pathname.includes(`/members/${memberUser?._id}`)
                        ? 'active'
                        : 'default'
                    }
                    type="member"
                    className="flex-1 min-w-0"
                  />
                  {String(memberUser?._id) !== String(authUserId) ? (
                    <Link
                      to={`/workspace/${workspaceId}/dm/${memberUser?._id}`}
                      className="rounded-xl p-2 text-slate-500 transition hover:bg-white/70 hover:text-slate-900"
                      title={`Message ${memberName}`}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Link>
                  ) : (
                    <div className="h-8 w-8" aria-hidden="true" />
                  )}
                </div>
              );
            })
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white/40 px-3 py-4 text-sm text-slate-600">
              No members yet.
            </p>
          )}
        </WorkspacePanelSection>
      </div>
    </div>
  );
};
