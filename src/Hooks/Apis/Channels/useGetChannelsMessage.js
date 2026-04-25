import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getPaginatedMessages } from '@/API/Channel/Channel';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useSocket } from '@/Hooks/Context/useSocket';

export const useGetChannelsMessage = (channelId) => {
  const { auth } = useAuth();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { isFetching, isError, error, isSuccess, data } = useQuery({
    queryFn: () =>
      getPaginatedMessages({
        channelId,
        limit: 25,
        offset: 0,
        token: auth.token,
      }),
    queryKey: ['getPaginatedMessages', channelId],
    staleTime: 10000,
  });

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (payload) => {
      if (payload?.roomId !== channelId) return;

      queryClient.invalidateQueries({
        queryKey: ['getPaginatedMessages', channelId],
      });
    };

    socket.on('NewMessageReceived', handleNewMessage);

    return () => {
      socket.off('NewMessageReceived', handleNewMessage);
    };
  }, [socket, channelId, queryClient]);

  return {
    isFetching,
    isError,
    error,
    isSuccess,
    messages: data || [],
  };
};
