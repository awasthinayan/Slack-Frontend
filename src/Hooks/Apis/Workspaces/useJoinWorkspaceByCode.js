import { useMutation } from '@tanstack/react-query';

import { joinWorkspaceByCodeRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useJoinWorkspaceRequest = () => {
  const { auth } = useAuth();
  const {
    mutateAsync: joinWorkspaceMutation,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ workspaceId, joinCode, token }) =>
      joinWorkspaceByCodeRequest({
        workspaceId,
        joinCode,
        token: token ?? auth?.token,
      }),
    onSuccess: () => {
      console.log('Workspace joined successfully');
    },
    onError: (error) => {
      console.log('Error in joining workspace', error);
    },
  });

  return {
    joinWorkspaceMutation,
    isSuccess,
    isPending,
    error,
  };
};
