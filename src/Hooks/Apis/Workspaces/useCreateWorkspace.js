import { useMutation } from '@tanstack/react-query';

import { createWorkspaceRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useCreateWorkspace = () => {
  const { auth } = useAuth();

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
    },
    onError: (error) => {
      console.log('Error while creating workspace', error);
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    createWorkspaceMutation,
  };
};
