import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateChannel } from '@/Hooks/Apis/Channels/useCreateChannel';
import { useCreateChannelModal } from '@/Hooks/Context/useCreateChannel';

export const CreateChannelModal = () => {
  const {
    opentoCreateChannelModal,
    setOpentoCreateChannelModal,
    selectedWorkspaceId,
    setSelectedWorkspaceId,
  } = useCreateChannelModal();
  const [channelName, setChannelName] = useState('');

  const { isPending, createChannelMutation } = useCreateChannel();

  function handleClose() {
    setOpentoCreateChannelModal(false);
    setChannelName('');
    setSelectedWorkspaceId(null);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const normalizedChannelName = channelName.trim().replace(/^#/, '');

    console.log('submit fired');
    console.log('workspaceId:', selectedWorkspaceId);
    console.log('channelName:', normalizedChannelName);

    if (!normalizedChannelName || !selectedWorkspaceId) return;

    try {
      await createChannelMutation({
        channelName: normalizedChannelName,
        workspaceId: selectedWorkspaceId,
      });

      setChannelName('');
      setSelectedWorkspaceId(null);
      setOpentoCreateChannelModal(false);
    } catch (error) {
      console.log('Failed to create channel', error);
    }
  }

  return (
    <Dialog open={opentoCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <Input
            required
            minLength={3}
            maxLength={80}
            placeholder="channel name e.g. #general"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            disabled={isPending}
          />

          <div>
            <Button
              className="flex justify-end mt-4 cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Channel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
