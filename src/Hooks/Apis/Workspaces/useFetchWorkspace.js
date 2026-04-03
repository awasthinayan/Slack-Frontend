import { useQuery } from '@tanstack/react-query';

import { fetchWorkspaceRequest } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useFetchWorkspace = () => {
  const { auth } = useAuth();

  const {
    isFetching,
    error,
    isSuccess,
    data: workspaces,
  } = useQuery({
    enabled: Boolean(auth?.token),
    queryFn: () => fetchWorkspaceRequest({ token: auth?.token }),
    queryKey: ['fetchWorkspaceByMember'],
    staleTime: 30000,
  });

  return {
    isFetching,
    error,
    isSuccess,
    workspaces,
  };
};
