import {
  ChevronDownIcon,
  ClipboardCopyIcon,
  ListFilterIcon,
  RefreshCwIcon,
  SquarePenIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useResetJoinCode } from '@/Hooks/Apis/Workspaces/useResetJoinCode';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';
import { useWorkspacePreferencesModal } from '@/Hooks/Context/useWorkspacePreferencesModal';

export const WorkspacePanelHeader = ({ workspace }) => {
  const workspaceName =
    workspace?.workspaceName || workspace?.name || 'Workspace';

  const workspaceMembers = workspace?.members;

  const { workspaceId } = useParams();

  const { auth } = useAuth();
  const { openWorkspacePreferencesModal } = useWorkspacePreferencesModal();
  const { showToast } = useToast();
  const { resetJoinCode, isResetting } = useResetJoinCode();
  const [isJoinCodeDialogOpen, setIsJoinCodeDialogOpen] = useState(false);

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

  const workspaceCode = workspace?.JoinCode ?? workspace?.joinCode;
  const shareWorkspaceId = workspace?._id || workspace?.id || workspaceId;

  const handleCopyJoinCode = async () => {
    if (!workspaceCode) return;

    await navigator.clipboard.writeText(workspaceCode);
    showToast({
      title: 'Join code copied',
      description: workspaceCode,
      type: 'success',
    });
  };

  async function handleRefreshJoinCode() {
    const workspaceId = workspace?._id || workspace?.id;
    if (!workspaceId) return;
    await resetJoinCode(workspaceId);
  }

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

          {isLoggedInUserisAdminofWorkspace && (
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onSelect={() => setIsJoinCodeDialogOpen(true)}
            >
              Invite people to {workspaceName}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog */}
      <Dialog
        open={isJoinCodeDialogOpen}
        onOpenChange={setIsJoinCodeDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workspace Join Code</DialogTitle>
            <DialogDescription>
              Copy this code and share it with someone so they can join this
              workspace.
            </DialogDescription>
          </DialogHeader>

          {/* Code Box */}
          <div className="rounded-xl border border-muted p-4 bg-muted/80 text-sm font-semibold text-foreground">
            {workspaceCode || 'No join code available'}
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleCopyJoinCode}
            >
              <ClipboardCopyIcon className="h-4 w-4 mr-2" />
              Copy code
            </Button>

            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>

          <div className="mt-4 flex justify-center">
            <a
              href={`/workspaces/join/${shareWorkspaceId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl 
               border border-blue-200 bg-blue-50 text-blue-600 
               text-sm font-semibold tracking-wide
               hover:bg-blue-100 hover:shadow-md hover:scale-[1.02]
               active:scale-[0.98]
               transition-all duration-200 ease-in-out"
            >
              🔗 Join via Link
            </a>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center gap-2 max-w-xs cursor-pointer"
              onClick={handleRefreshJoinCode}
              disabled={isResetting}
            >
              <RefreshCwIcon className="h-4 w-4" />
              Refresh code
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center gap-5">
        <Button variant="ghost" size="icon-sm" className="cursor-pointer">
          <SquarePenIcon className="size-4 text-green-600" />
        </Button>

        <Button variant="ghost" size="icon-sm" className="cursor-pointer">
          <ListFilterIcon className="size-4 text-green-600" />
        </Button>
      </div>
    </div>
  );
};
