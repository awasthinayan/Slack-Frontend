import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createChannelRequest } from '@/API/Channel/Channel';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useCreateChannel = () => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: createChannelMutation,
  } = useMutation({
    mutationFn: (data) => createChannelRequest({ ...data, token: auth?.token }),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`getworkspaceById - ${variables.workspaceId}`],
      });

      showToast({
        title: 'Channel created successfully',
        description: data?.data?.ChannelName || variables.channelName,
      });
    },

    onError: (error) => {
      showToast({
        type: 'error',
        title: error?.message || 'Failed to create channel',
      });
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    createChannelMutation,
  };
};
