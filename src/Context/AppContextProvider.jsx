import CombineContext from '@/Utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspacePreferencesContextProvider } from './WorkspacePreferencesContext';

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesContextProvider
);
