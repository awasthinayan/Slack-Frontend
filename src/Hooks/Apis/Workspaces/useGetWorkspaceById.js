import { useQuery } from '@tanstack/react-query';

import { getWorkspaceDetails } from '@/API/Workspace/workspace';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useGetWorkspaceDetailsById = (id) => {
  const { auth } = useAuth();

  const {
    isPending,
    isFetching,
    error,
    isSuccess,
    data: workspace,
  } = useQuery({
    enabled: Boolean(id && auth?.token),
    queryFn: () => getWorkspaceDetails(id, auth?.token),
    queryKey: [`getworkspaceById - ${id}`],
    staleTime: 10000,
  });

  return {
    isPending,
    isFetching,
    error,
    isSuccess,
    workspace,
  };
};
