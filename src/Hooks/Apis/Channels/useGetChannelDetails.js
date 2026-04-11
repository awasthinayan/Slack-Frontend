import { useQuery } from '@tanstack/react-query';

import { getChannelDetailsRequest } from '@/API/Channel/Channel';
import { useAuth } from '@/Hooks/Context/useAuth';

export const useGetChannelDetailsById = (channelId) => {
  const { auth } = useAuth();

  const {
    isFetching,
    error,
    isSuccess,
    data: channel,
  } = useQuery({
    enabled: Boolean(channelId && auth?.token),
    queryFn: () => getChannelDetailsRequest({ channelId, token: auth?.token }),
    queryKey: [`getChannelById - ${channelId}`],
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  return {
    isFetching,
    error,
    isSuccess,
    channel,
  };
};