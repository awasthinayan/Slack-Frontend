import { createContext, useEffect, useState } from 'react';

import { getMemberDetails } from '@/API/Member/member';

const AuthContext = createContext();
export const AUTH_USER_KEY = 'user';
export const AUTH_TOKEN_KEY = 'token';
export const AUTH_EXPIRY_KEY = 'authExpiry';
export const LAST_WORKSPACE_KEY = 'lastWorkspaceId';
export const AUTH_SESSION_DURATION_MS = 48 * 60 * 60 * 1000;

const decodeTokenPayload = (token) => {
  if (!token) return null;

  try {
    const [, payload] = token.split('.');
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload =
      normalizedPayload + '='.repeat((4 - (normalizedPayload.length % 4)) % 4);

    return JSON.parse(atob(paddedPayload));
  } catch (error) {
    console.log('Unable to decode auth token payload', error);
    return null;
  }
};

const normalizeStoredUser = (user, token) => {
  if (!user && !token) return null;

  const tokenPayload = decodeTokenPayload(token);
  const resolvedId = user?._id || user?.id || tokenPayload?._id || tokenPayload?.id;
  const resolvedEmail = user?.email || tokenPayload?.email || null;
  const resolvedUsername =
    user?.username ||
    user?.name ||
    tokenPayload?.username ||
    tokenPayload?.name ||
    null;

  if (!user && !resolvedId && !tokenPayload?.email) {
    return null;
  }

  console.log('resolved user', resolvedId, resolvedEmail, resolvedUsername);
  return {
    ...user,
    _id: resolvedId || null,
    email: resolvedEmail,
    username: resolvedUsername,
    name: user?.name || tokenPayload?.name || resolvedUsername,
  };

};

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const user = localStorage.getItem(AUTH_USER_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const authExpiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    const hasValidSession =
      user &&
      token &&
      authExpiry &&
      Number(authExpiry) > Date.now();

    if (hasValidSession) {
      const parsedUser = normalizeStoredUser(JSON.parse(user), token);

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(parsedUser));

      return {
        user: parsedUser,
        token: token,
        isloading: false,
      };
    }

    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
    localStorage.removeItem(LAST_WORKSPACE_KEY);

    return {
      user: null,
      token: null,
      isloading: false,
    };
  });

  function logout() {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
    localStorage.removeItem(LAST_WORKSPACE_KEY);
    setAuth({
      user: null,
      token: null,
      isloading: false,
    });
  }

  useEffect(() => {
    const syncCurrentUser = async () => {
      if (!auth?.user?._id || !auth?.token) return;

      try {
        const memberDetails = await getMemberDetails(auth.user._id, auth.token);
        const resolvedUsername =
          memberDetails?.username ||
          memberDetails?.name ||
          null;

        if (!resolvedUsername) return;

        const currentUsername = auth.user?.username || auth.user?.name || null;
        if (currentUsername === resolvedUsername) return;

        const nextUser = {
          ...auth.user,
          username: resolvedUsername,
          name: memberDetails?.name || auth.user?.name || resolvedUsername,
          email: memberDetails?.email || auth.user?.email || null,
        };

        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
        setAuth((current) => ({
          ...current,
          user: nextUser,
        }));
      } catch (error) {
        console.log('Unable to hydrate current auth user', error);
      }
    };

    syncCurrentUser();
  }, [auth.user?._id, auth.token]);

  return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
