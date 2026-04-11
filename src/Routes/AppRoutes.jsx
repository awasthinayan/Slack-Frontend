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
        <Route path="/workspace/:workspaceId" element={<WorkspaceLayout />}>
          <Route
            index
            element={
              <div className="flex h-full items-center justify-center px-6 py-10 text-slate-600">
                <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/85 p-8 shadow-sm backdrop-blur">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Workspace Overview
                  </p>
                  <h1 className="mt-3 text-3xl font-bold text-slate-900">
                    Select a channel or member
                  </h1>
                  <p className="mt-4 text-base leading-7">
                    The left sidebar stays visible now, and the selected details
                    open here in this same page area.
                  </p>
                </div>
              </div>
            }
          />
          <Route path="channels/:channelId" element={<ChannelPage />} />
          <Route path="members/:memberId" element={<MemberPage />} />
        </Route>
      </Route>

      <Route path="*" element={<GlobalErrorHandler />} />
    </Routes>
  );
};
