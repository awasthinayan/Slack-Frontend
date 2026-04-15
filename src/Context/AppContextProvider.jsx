import CombineContext from '@/Utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { ConfirmDialogContextProvider } from './ConfirmDialogContext';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateMemberContextProvider } from './CreateMemberContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { SocketContextProvider } from './SocketContext/SocketContext';
import { ToastContextProvider } from './ToastContext';
import { WorkspaceContextProvider } from './WorkspaceContext';
import { WorkspacePreferencesContextProvider } from './WorkspacePreferencesContext';

export const AppContextProvider = CombineContext(
  SocketContextProvider,
  AuthContextProvider,
  WorkspaceContextProvider,
  ToastContextProvider,
  CreateWorkspaceContextProvider,
  CreateChannelContextProvider,
  CreateMemberContextProvider,
  WorkspacePreferencesContextProvider,
  ConfirmDialogContextProvider
);
