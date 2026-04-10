import { Navigate, Route, Routes } from 'react-router-dom';

import { LAST_WORKSPACE_KEY } from '@/Context/AuthContext';
import { useAuth } from '@/Hooks/Context/useAuth';
import { ForgotPasswordPage } from '@/Pages/Auth/ForgotPasswordPage';
import { SignInPage } from '@/Pages/Auth/SignInPage';
import { SignUpPage } from '@/Pages/Auth/SignUpPage';
import { VerifyEmailPage } from '@/Pages/Auth/VerifyEmailPage';
import { ChannelPage } from '@/Pages/Channel/ChannelPage';
import { Home } from '@/Pages/Home/Home';
import { MemberPage } from '@/Pages/Member/MemberPage';
import { GlobalErrorHandler } from '@/Pages/NotFound/GlobalErrorHandler';
import { WelcomePage } from '@/Pages/Welcome/WelcomePage';
import { JoinPage } from '@/Pages/Workspace/JoinCode';
import { WorkspaceLayout } from '@/Pages/Workspace/Layout';
import { ProtectedRoute } from '@/Routes/ProtectedRoute';
import { PublicRoute } from '@/Routes/PublicRoute';

export const AppRoutes = () => {
  const { auth } = useAuth();
  const lastWorkspaceId = localStorage.getItem(LAST_WORKSPACE_KEY);
  const authenticatedRedirectPath = lastWorkspaceId
    ? `/workspace/${lastWorkspaceId}`
    : '/home';

  return (
    <Routes>
      <Route
        path="/"
        element={
          auth.token ? (
            <Navigate replace to={authenticatedRedirectPath} />
          ) : (
            <WelcomePage />
          )
        }
      />

      <Route element={<PublicRoute />}>
        <Route path="/welcome" element={<Navigate replace to="/" />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/workspace/:workspaceId" element={<WorkspaceLayout />} />
        <Route
          path="/workspace/:workspaceId/channels/:channelId"
          element={<ChannelPage />}
        />
        <Route
          path="/workspace/:workspaceId/members/:memberId"
          element={<MemberPage />}
        />
      </Route>

      <Route path="*" element={<GlobalErrorHandler />} />
    </Routes>
  );
};
