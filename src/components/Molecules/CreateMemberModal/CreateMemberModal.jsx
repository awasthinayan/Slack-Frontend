import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAddMemberToWorkspace } from '@/Hooks/Apis/Members/useAddMemberToWorkspace';
import { useGetAllUsers } from '@/Hooks/Apis/Members/useGetAllUsers';
import { useCreateMemberModal } from '@/Hooks/Context/useCreateMember';

export const CreateMemberModal = () => {
  const {
    opentoCreateMemberModal,
    setOpentoCreateMemberModal,
    selectedWorkspaceId,
    setSelectedWorkspaceId,
  } = useCreateMemberModal();
  const [memberId, setMemberId] = useState('');

  const { isFetching: isUsersLoading, users } = useGetAllUsers();
  const { isPending, addMemberMutation } = useAddMemberToWorkspace();

  function handleClose() {
    setOpentoCreateMemberModal(false);
    setSelectedWorkspaceId(null);
    setMemberId('');
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!memberId || !selectedWorkspaceId) return;

    try {
      await addMemberMutation({
        workspaceId: selectedWorkspaceId,
        memberId,
        role: 'member',
      });
      handleClose();
    } catch (error) {
      console.log('Failed to add member', error);
    }
  }

  return (
    <Dialog open={opentoCreateMemberModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Select user
            </label>
            <select
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 ease-in-out hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              disabled={isUsersLoading}
              required
            >
              <option value="">Choose a user</option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name || user.username || user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isPending || isUsersLoading}
            >
              {isPending ? 'Adding...' : 'Add Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
