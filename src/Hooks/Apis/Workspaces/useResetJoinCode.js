import { useMutation, useQueryClient } from '@tanstack/react-query';

import { resetJoinCodeRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useResetJoinCode = () => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: resetJoinCode, isLoading: isResetting } =
    useMutation({
      mutationFn: (workspaceId) =>
        resetJoinCodeRequest({ workspaceId, token: auth?.token }),
      onSuccess: (_, workspaceId) => {
        queryClient.invalidateQueries({
          queryKey: [`getworkspaceById - ${workspaceId}`],
        });
        showToast({
          title: 'Join code refreshed',
          description: 'A new join code was generated.',
          type: 'success',
        });
      },
      onError: (error) => {
        showToast({
          title: 'Refresh failed',
          description: error?.message || 'Could not refresh join code.',
          type: 'error',
        });
      },
    });

  return {
    resetJoinCode,
    isResetting,
  };
};