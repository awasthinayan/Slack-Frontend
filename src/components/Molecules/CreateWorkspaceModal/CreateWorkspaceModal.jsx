import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateWorkspace } from '@/Hooks/Apis/Workspaces/useCreateWorkspace';
import { useCreateWorkspaceModal } from '@/Hooks/Context/workspaceContext';

export const CreateWorkspaceModal = () => {
  const { openCreateWorkspaceModal, setopenCreateWorkspaceModal } =
    useCreateWorkspaceModal();

  const [workspaceName, setWorkspaceName] = useState('');

  const { isPending, createWorkspaceMutation } = useCreateWorkspace();

  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await createWorkspaceMutation({ workspaceName });
      const createdWorkspaceId = response?.data?.data?._id;

      if (createdWorkspaceId) {
        navigate(`/workspace/${createdWorkspaceId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setopenCreateWorkspaceModal(false);
      setWorkspaceName('');
    }
  }

  return (
    <Dialog
      open={openCreateWorkspaceModal}
      onOpenChange={setopenCreateWorkspaceModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <Input
            required
            disabled={isPending}
            minLength={3}
            placeholder="Please enter a name for your workspace e.g. My Workspace"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <div className="flex justify-end mt-5 cursor-pointer">
            <Button disabled={isPending} isLoading={isPending}>
              Create Workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
