import { Navigate, Outlet } from 'react-router-dom';

import { LAST_WORKSPACE_KEY } from '@/Context/AuthContext';
import { useAuth } from '@/Hooks/Context/useAuth';

export const PublicRoute = () => {
  const { auth } = useAuth();
  const lastWorkspaceId = localStorage.getItem(LAST_WORKSPACE_KEY);
  const redirectPath = lastWorkspaceId
    ? `/workspace/${lastWorkspaceId}`
    : '/home';

  if (auth.isloading) {
    return null;
  }

  if (auth.token) {
    return <Navigate replace to={redirectPath} />;
  }

  return <Outlet />;
};
