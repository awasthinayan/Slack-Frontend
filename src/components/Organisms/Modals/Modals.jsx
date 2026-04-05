import { ConfirmDialog } from '@/components/Molecules/ConfirmDialogModal/ConfirmDialogModal';
import { CreateChannelModal } from '@/components/Molecules/CreateChannelModal/CreateChannelModal';
import { CreateMemberModal } from '@/components/Molecules/CreateMemberModal/CreateMemberModal';
import { CreateWorkspaceModal } from '@/components/Molecules/CreateWorkspaceModal/CreateWorkspaceModal';
import { WorkspacePreferencesModal } from '@/components/Molecules/WorkspacePreferencesModal/WorkspacePreferencesModal';

const Modals = () => {
  return (
    <div>
      <CreateWorkspaceModal />
      <WorkspacePreferencesModal />
      <ConfirmDialog />
      <CreateChannelModal />
      <CreateMemberModal />
    </div>
  );
};

export default Modals;
