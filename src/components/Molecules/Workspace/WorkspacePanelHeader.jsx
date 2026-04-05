import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useCreateChannel } from '@/Hooks/Context/useCreateChannel';
import { useWorkspacePreferencesModal } from '@/Hooks/Context/useWorkspacePreferencesModal';

export const WorkspacePanelHeader = ({ workspace }) => {
  const workspaceName =
    workspace?.workspaceName || workspace?.name || 'Workspace';

  const workspaceMembers = workspace?.members;

  const { auth } = useAuth();
  const { openCreateChannelModal } = useCreateChannel();
  const { openWorkspacePreferencesModal } = useWorkspacePreferencesModal();
  const authUserId = auth?.user?._id || auth?.user?.id;
  const authUserEmail = auth?.user?.email;

  const isLoggedInUserisAdminofWorkspace = workspaceMembers?.find((member) => {
    const memberUser = member?.memberId;
    const memberId = memberUser?._id || memberUser?.id || memberUser;
    const memberEmail = memberUser?.email;

    return (
      ((authUserId && String(memberId) === String(authUserId)) ||
        (authUserEmail && memberEmail === authUserEmail)) &&
      member?.role === 'admin'
    );
  });

  return (
    <div className="flex items-center justify-between px-2 py-1 h-12.5 gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-full bg-green-100 hover:bg-green-200 border-green-200 text-green-500 cursor-pointer"
          >
            <span className="truncate">{workspaceName}</span>
            <ChevronDownIcon className="size-5 ml-1" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-64 cursor-pointer"
        >
          <DropdownMenuItem className="cursor-pointer">
            <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#71eb8d]">
              {workspaceName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold">{workspaceName}</p>
              <p className="text-xs text-muted-foreground">
                (Active Workspace)
              </p>
            </div>
          </DropdownMenuItem>

          {isLoggedInUserisAdminofWorkspace && (
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onSelect={() => openWorkspacePreferencesModal(workspace)}
            >
              Preferences
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer py-2">
            Invite people to {workspaceName}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon-sm" className="cursor-pointer">
          <ListFilterIcon className="size-4 text-green-600" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer"
          onClick={() => openCreateChannelModal(workspace)}
        >
          <SquarePenIcon className="size-4 text-green-600" />
        </Button>
      </div>
    </div>
  );
};
