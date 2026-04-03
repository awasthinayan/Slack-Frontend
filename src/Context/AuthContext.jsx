import { createContext, useState } from 'react';

const AuthContext = createContext();
export const AUTH_USER_KEY = 'user';
export const AUTH_TOKEN_KEY = 'token';
export const AUTH_EXPIRY_KEY = 'authExpiry';
export const LAST_WORKSPACE_KEY = 'lastWorkspaceId';
export const AUTH_SESSION_DURATION_MS = 48 * 60 * 60 * 1000;

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
      return {
        user: JSON.parse(user),
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
