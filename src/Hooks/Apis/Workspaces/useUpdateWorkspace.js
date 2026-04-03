import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateWorkspaceRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useUpdateWorkspace = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: updateWorkspaceMutation,
  } = useMutation({
    mutationFn: (data) => updateWorkspaceRequest({ ...data, token: auth?.token }),
    onSuccess: (_, variables) => {
      console.log('Successfully updated workspace');
      queryClient.invalidateQueries({
        queryKey: [`getworkspaceById - ${variables.workspaceId}`],
      });
      queryClient.invalidateQueries({
        queryKey: ['fetchWorkspaceByMember'],
      });
    },
    onError: (error) => {
      console.log('Error while updating workspace', error);
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    updateWorkspaceMutation,
  };
};
