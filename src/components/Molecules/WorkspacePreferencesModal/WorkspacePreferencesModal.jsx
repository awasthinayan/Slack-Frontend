import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateWorkspace } from '@/Hooks/Apis/Workspaces/useUpdateWorkspace';
import { useWorkspacePreferencesModal } from '@/Hooks/Context/useWorkspacePreferencesModal';

export const WorkspacePreferencesModal = () => {
  const {
    closeWorkspacePreferencesModal,
    preferencesModalState,
    setWorkspacePreferencesModalOpen,
  } = useWorkspacePreferencesModal();

  const workspace = preferencesModalState?.workspace;
  const isOpen = preferencesModalState?.isOpen;

  const { isPending, updateWorkspaceMutation } = useUpdateWorkspace();

  const handleOpenChange = (open) => {
    setWorkspacePreferencesModalOpen(open);
  };

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!workspace?._id) return;

    const formData = new FormData(event.currentTarget);
    const workspaceName = String(formData.get('workspaceName') || '').trim();
    const description = String(formData.get('description') || '').trim();

    try {
      await updateWorkspaceMutation({
        workspaceId: workspace._id,
        workspaceName,
        description,
      });
      closeWorkspacePreferencesModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent key={workspace?._id || 'workspace-preferences'}>
        <DialogHeader>
          <DialogTitle>Workspace Preferences</DialogTitle>
          <DialogDescription>
            Update the workspace name and description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Workspace Name
            </label>
            <Input
              name="workspaceName"
              required
              disabled={isPending}
              minLength={3}
              placeholder="Enter workspace name"
              defaultValue={workspace?.workspaceName || workspace?.name || ''}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              name="description"
              disabled={isPending}
              placeholder="Add a short description"
              defaultValue={workspace?.description || ''}
              rows={4}
              className="flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
