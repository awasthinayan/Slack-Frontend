import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/Hooks/Context/useAuth';

export const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.isloading) {
    return null;
  }

  if (!auth.token) {
    return <Navigate replace state={{ from: location }} to="/signin" />;
  }

  return <Outlet />;
};
