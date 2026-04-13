import CombineContext from '@/Utils/CombineContext';

import { AuthContextProvider } from './AuthContext';
import { ConfirmDialogContextProvider } from './ConfirmDialogContext';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateMemberContextProvider } from './CreateMemberContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { SocketContextProvider } from './SocketContext/SocketContext';
import { ToastContextProvider } from './ToastContext';
import { WorkspacePreferencesContextProvider } from './WorkspacePreferencesContext';

export const AppContextProvider = CombineContext(
  SocketContextProvider,
  AuthContextProvider,
  ToastContextProvider,
  CreateWorkspaceContextProvider,
  CreateChannelContextProvider,
  CreateMemberContextProvider,
  WorkspacePreferencesContextProvider,
  ConfirmDialogContextProvider
);
