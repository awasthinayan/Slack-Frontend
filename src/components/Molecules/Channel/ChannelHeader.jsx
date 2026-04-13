import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { ChannelPreferencesModal } from '@/components/Molecules/ChannelPreferenceModal/ChannelPreferencesModal';
import { Button } from '@/components/ui/button';

export const ChannelHeader = ({ name }) => {
  const [open, setOpen] = useState(false);
  const { channelId, workspaceId } = useParams();

  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="text-lg font-semibold px-2 w-auto overflow-hidden cursor-pointer"
      >
        <span># {name}</span>
        <FaChevronDown className="size-3 ml-2" />
      </Button>

      <ChannelPreferencesModal
        open={open}
        setOpen={setOpen}
        name={name}
        channelId={channelId}
        workspaceId={workspaceId}
      />
    </div>
  );
};
