import { useContext } from 'react';

import WorkspacePreferencesContext from '@/Context/WorkspacePreferencesContext';

export const useWorkspacePreferencesModal = () => {
  return useContext(WorkspacePreferencesContext);
};
