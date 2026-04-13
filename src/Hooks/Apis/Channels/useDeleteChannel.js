import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChannelRequest } from '@/API/Channel/Channel';
import { useAuth } from '@/Hooks/Context/useAuth';
import { useToast } from '@/Hooks/Context/useToast';

export const useDeleteChannel = (channelId, workspaceId) => {
  const { auth } = useAuth();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: deleteChannelMutation,
  } = useMutation({
    mutationFn: () => deleteChannelRequest({ channelId, token: auth?.token }),
    onSuccess: () => {
      console.log('Successfully deleted channel');
      queryClient.invalidateQueries({
        queryKey: [`getChannelById - ${channelId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`getworkspaceById - ${workspaceId}`],
      });
      showToast({
        title: 'Channel deleted successfully',
      });
    },
    onError: (error) => {
      console.log('Error while deleting Channel', error);
      showToast({
        type: 'error',
        title: error?.message || 'Failed to delete Channel',
      });
    },
  });

  return {
    isPending,
    isError,
    isSuccess,
    deleteChannelMutation,
  };
};