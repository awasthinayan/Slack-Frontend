import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addMemberToWorkspaceRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useAddMemberToWorkspace = () => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: addMemberMutation,
  } = useMutation({
    mutationFn: (data) =>
      addMemberToWorkspaceRequest({ ...data, token: auth?.token }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`getworkspaceById - ${variables.workspaceId}`],
      });

      showToast({
        title: 'Member added successfully',
        description: data?.data?.message || 'New member added',
      });
    },

    onError: (error) => {
      showToast({
        type: 'error',
        title: error?.message || 'Failed to add member',
      });
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    addMemberMutation,
  };
};
