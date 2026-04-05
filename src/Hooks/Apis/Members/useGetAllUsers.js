import { useQuery } from '@tanstack/react-query';

import { fetchAllUsers } from '@/API/User/user';

export const useGetAllUsers = () => {
  const {
    isFetching,
    error,
    isSuccess,
    data: users,
  } = useQuery({
    queryFn: () => fetchAllUsers(),
    queryKey: ['fetchAllUsers'],
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  return {
    isFetching,
    error,
    isSuccess,
    users,
  };
};
