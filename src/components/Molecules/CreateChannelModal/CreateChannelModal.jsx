import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Dialog, Input } from '@/components/ui/input';
import { useCreateChannelModal } from '@/Hooks/Context/useCreateChannel';

export const CreateChannelModal = () => {
  const { opentoCreateChannelModal, setOpentoCreateChannelModal } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState('');

  function handleClose() {
    setOpentoCreateChannelModal(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('channelName', channelName);
    setOpentoCreateChannelModal(false);
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
          />

          <div>
            <Button className="flex justify-end mt-4">Create Channel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
