import { ConfirmDialog } from '@/components/Molecules/ConfirmDialogModal/ConfirmDialogModal';
import { CreateChannelModal } from '@/components/Molecules/CreateChannelModal/CreateChannelModal';
import { CreateWorkspaceModal } from '@/components/Molecules/CreateWorkspaceModal/CreateWorkspaceModal';
import { WorkspacePreferencesModal } from '@/components/Molecules/WorkspacePreferencesModal/WorkspacePreferencesModal';

const Modals = () => {
  return (
    <div>
      <CreateWorkspaceModal />
      <CreateChannelModal />
      <WorkspacePreferencesModal />
      <ConfirmDialog />
      <CreateChannelModal />
    </div>
  );
};

export default Modals;
