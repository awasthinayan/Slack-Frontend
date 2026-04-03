import { useContext } from 'react';

import CreateWorkspaceContext from '@/Context/CreateWorkspaceContext';

export const useCreateWorkspaceModal = () => {
  return useContext(CreateWorkspaceContext);
};
