import { useQuery } from '@tanstack/react-query';

import { getMemberDetails } from '@/API/Member/member';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useGetMemberById = (id) => {
  const { auth } = useAuth();

  const {
    isPending,
    isFetching,
    error,
    isSuccess,
    data: member,
  } = useQuery({
    enabled: Boolean(id && auth?.token),
    queryFn: () => getMemberDetails(id, auth?.token),
    queryKey: [`getMemberById - ${id}`],
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  return {
    isPending,
    isFetching,
    error,
    isSuccess,
    member,
  };
};
