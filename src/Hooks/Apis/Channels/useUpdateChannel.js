import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateChannelRequest } from '@/API/Channel/Channel';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useUpdateChannel = (channelId, workspaceId) => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: updateChannelMutation,
  } = useMutation({
    mutationFn: (data) => updateChannelRequest({ channelId, workspaceId, ...data, token: auth?.token }),
    onSuccess: (_, variables) => {
      console.log('Successfully updated channel');
      queryClient.invalidateQueries({
        queryKey: [`getChannelById - ${channelId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`getworkspaceById - ${workspaceId}`],
      });
      showToast({
        title: 'Channel updated successfully',
        description: variables?.ChannelName || '',
      });
    },
    onError: (error) => {
      console.log('Error while updating Channel', error);
      showToast({
        type: 'error',
        title: error?.message || 'Failed to update Channel',
      });
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    updateChannelMutation,
  };
};
