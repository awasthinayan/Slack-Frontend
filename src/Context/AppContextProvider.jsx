import CombineContext from '@/Utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider
);
