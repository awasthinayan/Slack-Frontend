import { useContext } from 'react';

import WorkspaceContext from '@/Context/WorkspaceContext';

export const useCurrentWorkspace = () => {
  return useContext(WorkspaceContext);
};
