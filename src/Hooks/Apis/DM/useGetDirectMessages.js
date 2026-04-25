import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { getDirectMessages } from '@/API/DM/DM';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useSocket } from '@/Hooks/Context/useSocket';
import { buildDirectConversationId } from '@/Utils/conversation';

export const useGetDirectMessages = (workspaceId, memberId) => {
  const { auth } = useAuth();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const conversationId = useMemo(() => {
    if (!workspaceId || !auth?.user?._id || !memberId) return null;
    return buildDirectConversationId(workspaceId, auth.user._id, memberId);
  }, [workspaceId, auth?.user?._id, memberId]);

  const { isFetching, isError, error, isSuccess, data } = useQuery({
    enabled: Boolean(conversationId && auth?.token),
    queryFn: () =>
      getDirectMessages({
        workspaceId,
        memberId,
        token: auth.token,
        limit: 25,
        page: 1,
      }),
    queryKey: ['getDirectMessages', conversationId],
    staleTime: 10000,
  });

  useEffect(() => {
    if (!socket || !conversationId) return;

    const handleNewMessage = (payload) => {
      if (payload?.roomId !== conversationId) return;

      queryClient.invalidateQueries({
        queryKey: ['getDirectMessages', conversationId],
      });
    };

    socket.on('NewMessageReceived', handleNewMessage);

    return () => {
      socket.off('NewMessageReceived', handleNewMessage);
    };
  }, [socket, conversationId, queryClient]);

  return {
    isFetching,
    isError,
    error,
    isSuccess,
    messages: data?.messages || [],
    member: data?.member || null,
    conversationId,
  };
};
