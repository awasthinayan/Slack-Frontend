import { useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchWorkspaceRequest } from '@/API/Workspace/workspace';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { LAST_WORKSPACE_KEY } from '@/Context/AuthContext';
import { useDeleteWorkspace } from '@/Hooks/Apis/Workspaces/useDeleteWorkspace';
import { useUpdateWorkspace } from '@/Hooks/Apis/Workspaces/useUpdateWorkspace';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useConfirmDialog } from '@/Hooks/Context/useConfirmDialog';
import { useWorkspacePreferencesModal } from '@/Hooks/Context/useWorkspacePreferencesModal';

const WorkspacePreferencesForm = ({
  closeWorkspacePreferencesModal,
  deleteWorkspaceMutation,
  handleOpenChange,
  isPending,
  isPendingDelete,
  isbusy,
  navigate,
  queryClient,
  token,
  updateWorkspaceMutation,
  workspace,
}) => {
  const [formValues, setFormValues] = useState({
    workspaceName: workspace?.workspaceName || workspace?.name || '',
    description: workspace?.description || '',
  });
  const [errors, setErrors] = useState({});

  const { confirm } = useConfirmDialog();

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (!workspace?._id) return;

    const workspaceName = formValues.workspaceName.trim();
    const description = formValues.description.trim();
    const nextErrors = {};

    if (!workspaceName) {
      nextErrors.workspaceName = 'Workspace name is required';
    } else if (workspaceName.length < 3) {
      nextErrors.workspaceName = 'Workspace name must be at least 3 characters';
    }

    if (!description) {
      nextErrors.description = 'Description is required';
    } else if (description.length < 3) {
      nextErrors.description = 'Description must be at least 3 characters';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      const isConfirmed = await confirm({
        title: 'Update Workspace',
        description: 'Are you sure you want to update this workspace?',
        confirmText: 'Update',
        cancelText: 'Cancel',
        variant: 'secondary',
      });

      if (!isConfirmed) return;
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

  const handleChange = (field) => (event) => {
    const value = event.target.value;

    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  async function handleWorkspaceDelete() {
    if (!workspace?._id) return;

    const isConfirmed = await confirm({
      title: 'Delete Workspace',
      description: 'Are you sure you want to delete this workspace?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });

    if (!isConfirmed) return;

    await deleteWorkspaceMutation({
      workspaceId: workspace._id,
    });

    const updatedWorkspaces = await queryClient.fetchQuery({
      queryKey: ['fetchWorkspaceByMember'],
      queryFn: () => fetchWorkspaceRequest({ token }),
    });

    const nextWorkspace = updatedWorkspaces?.[0];

    if (nextWorkspace?._id) {
      localStorage.setItem(LAST_WORKSPACE_KEY, nextWorkspace._id);
    } else if (localStorage.getItem(LAST_WORKSPACE_KEY) === workspace._id) {
      localStorage.removeItem(LAST_WORKSPACE_KEY);
    }

    closeWorkspacePreferencesModal();

    if (nextWorkspace?._id) {
      navigate(`/workspace/${nextWorkspace._id}`, { replace: true });
      return;
    }

    navigate('/home', { replace: true, state: { stayOnHome: true } });
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Workspace Name
        </label>
        <Input
          name="workspaceName"
          required
          value={formValues.workspaceName}
          onChange={handleChange('workspaceName')}
          disabled={isbusy}
          minLength={3}
          placeholder="Enter workspace name"
          aria-invalid={Boolean(errors.workspaceName)}
        />
        {errors.workspaceName ? (
          <p className="text-sm text-red-500">{errors.workspaceName}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          name="description"
          required
          value={formValues.description}
          onChange={handleChange('description')}
          disabled={isbusy}
          minLength={3}
          placeholder="Add a short description"
          rows={4}
          aria-invalid={Boolean(errors.description)}
          className="flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.description ? (
          <p className="text-sm text-red-500">{errors.description}</p>
        ) : null}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isbusy}
          onClick={() => handleOpenChange(false)}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isbusy} className="cursor-pointer">
          {isPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
        <Button
          type="button"
          disabled={isbusy}
          className="cursor-pointer"
          variant="destructive"
          onClick={handleWorkspaceDelete}
        >
          {isPendingDelete ? (
            <>
              <Loader className="size-4 animate-spin" />
              Deleting...
            </>
          ) : (
            'Delete Workspace'
          )}
        </Button>
      </div>
    </form>
  );
};

export const WorkspacePreferencesModal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    closeWorkspacePreferencesModal,
    preferencesModalState,
    setWorkspacePreferencesModalOpen,
  } = useWorkspacePreferencesModal();
  const { auth } = useAuth();

  const workspace = preferencesModalState?.workspace;
  const isOpen = preferencesModalState?.isOpen;

  const { isPending, updateWorkspaceMutation } = useUpdateWorkspace();

  const { isPending: isPendingDelete, deleteWorkspaceMutation } =
    useDeleteWorkspace();

  const isbusy = isPending || isPendingDelete;

  const handleOpenChange = (open) => {
    if (isbusy) return;
    setWorkspacePreferencesModalOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent key={workspace?._id || 'workspace-preferences'}>
        <DialogHeader>
          <DialogTitle>Workspace Preferences</DialogTitle>
          <DialogDescription>
            Update the workspace name and description.
          </DialogDescription>
        </DialogHeader>

        <WorkspacePreferencesForm
          key={workspace?._id || 'workspace-preferences-form'}
          closeWorkspacePreferencesModal={closeWorkspacePreferencesModal}
          deleteWorkspaceMutation={deleteWorkspaceMutation}
          handleOpenChange={handleOpenChange}
          isPending={isPending}
          isPendingDelete={isPendingDelete}
          isbusy={isbusy}
          navigate={navigate}
          queryClient={queryClient}
          token={auth?.token}
          updateWorkspaceMutation={updateWorkspaceMutation}
          workspace={workspace}
        />
      </DialogContent>
    </Dialog>
  );
};
