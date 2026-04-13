import { CheckIcon, PencilIcon, TrashIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react'; // ✅ add useEffect
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteChannel } from '@/Hooks/Apis/Channels/useDeleteChannel';
import { useUpdateChannel } from '@/Hooks/Apis/Channels/useUpdateChannel';
import { useConfirmDialog } from '@/Hooks/Context/useConfirmDialog';

export const ChannelPreferencesModal = ({
  open,
  setOpen,
  name,
  channelId,
  workspaceId,
}) => {
  const navigate = useNavigate();
  const { confirm } = useConfirmDialog();

  const [isEditing, setIsEditing] = useState(false);
  const [channelName, setChannelName] = useState(name);

  // ✅ Sync channelName when name prop updates after API refetch
  useEffect(() => {
    setChannelName(name);
  }, [name]);

  const { isPending: isDeleting, deleteChannelMutation } = useDeleteChannel(
    channelId,
    workspaceId
  );
  const { isPending: isUpdating, updateChannelMutation } = useUpdateChannel(
    channelId,
    workspaceId
  );

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Channel',
      description: `Are you sure you want to delete # ${name}? This action cannot be undone.`, 
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
    });
    if (!confirmed) return;

    await deleteChannelMutation();
    setOpen(false);
    navigate(`/workspace/${workspaceId}`);
  };

  const handleUpdate = async () => {
    if (!channelName.trim() || channelName === name) {
      setIsEditing(false);
      return;
    }
    await updateChannelMutation({ ChannelName: channelName.trim() });
    setIsEditing(false);
    setOpen(false); // ✅ close modal so header updates immediately
  };

  const handleCancel = () => {
    setChannelName(name);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle># {name}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold">Channel Name</p>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-sm text-blue-600 font-semibold 
                             hover:underline cursor-pointer"
                >
                  <PencilIcon className="size-3" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="flex items-center gap-1 text-sm text-green-600 
                               font-semibold hover:underline disabled:opacity-50 cursor-pointer"
                  >
                    <CheckIcon className="size-3" />
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 text-sm text-gray-500 
                               font-semibold hover:underline cursor-pointer"
                  >
                    <XIcon className="size-3" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdate();
                  if (e.key === 'Escape') handleCancel();
                }}
                autoFocus
                className="w-full border border-slate-300 rounded px-2 py-1 text-sm 
                           outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            ) : (
              <p className="text-sm text-gray-700">{channelName}</p> // ✅ use channelName not name
            )}
          </div>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border 
                       cursor-pointer hover:bg-red-50 hover:border-red-200 
                       text-red-600 transition-colors w-full disabled:opacity-50"
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold">
              {isDeleting ? 'Deleting...' : 'Delete Channel'}
            </p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
