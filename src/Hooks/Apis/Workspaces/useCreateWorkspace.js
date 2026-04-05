import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkspaceRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useCreateWorkspace = () => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    mutationFn: (data) =>
      createWorkspaceRequest({ ...data, token: auth?.token }),
    onSuccess: (data) => {
      console.log('Successfuly created workspace', data);
      queryClient.invalidateQueries({
        queryKey: ['fetchWorkspaceByMember'],
      });
      showToast({
        title: 'Workspace created successfully',
        description: data?.data?.data?.workspaceName || '',
      });
    },
    onError: (error) => {
      console.log('Error while creating workspace', error);
      showToast({
        type: 'error',
        title: error?.message || 'Failed to create workspace',
      });
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    createWorkspaceMutation,
  };
};
