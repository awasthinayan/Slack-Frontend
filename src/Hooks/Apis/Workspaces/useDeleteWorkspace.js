import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteWorkspaceRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useDeleteWorkspace = () => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: deleteWorkspaceMutation,
  } = useMutation({
    mutationFn: (data) => deleteWorkspaceRequest({ ...data, token: auth?.token }),
    onSuccess: (_, variables) => {
      console.log('Workspace Deleted Successfully');
      queryClient.invalidateQueries({
        queryKey: ['fetchWorkspaceByMember'],
      });
      queryClient.removeQueries({
        queryKey: [`getworkspaceById - ${variables.workspaceId}`],
      });
      showToast({
        title: 'Workspace deleted successfully',
      });
    },
    onError: (error) => {
      console.log('Error while deleting workspace', error);
      showToast({
        type: 'error',
        title: error?.message || 'Failed to delete workspace',
      });
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    deleteWorkspaceMutation,
  };
};
