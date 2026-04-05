import CombineContext from '@/Utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { ConfirmDialogContextProvider } from './ConfirmDialogContext';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { ToastContextProvider } from './ToastContext';
import { WorkspacePreferencesContextProvider } from './WorkspacePreferencesContext';

export const AppContextProvider = CombineContext(
  AuthContextProvider,
  ToastContextProvider,
  CreateWorkspaceContextProvider,
  CreateChannelContextProvider,
  WorkspacePreferencesContextProvider,
  ConfirmDialogContextProvider
);
