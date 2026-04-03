import { createContext, useState } from 'react';

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

  if (!user && !resolvedId && !tokenPayload?.email) {
    return null;
  }

  return {
    ...user,
    _id: resolvedId || null,
    email: user?.email || tokenPayload?.email || null,
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

  return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
