"use client";

import {
  getCurrentWebUser,
  handleOAuthCallback,
  loginWithEmail,
  loginWithGoogle as startGoogleLogin,
  logout as authLogout,
  WebUser,
} from "@/lib/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  webUser: WebUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  completeOAuthLogin: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [webUser, setWebUser] = useState<WebUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      const current = await getCurrentWebUser();
      setWebUser(current);
    } catch {
      setWebUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await loginWithEmail(email, password);
      setWebUser(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(() => {
    setError(null);
    startGoogleLogin();
  }, []);

  const completeOAuthLogin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await handleOAuthCallback();
      setWebUser(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "OAuth login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authLogout();
      setWebUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        webUser,
        loading,
        error,
        login,
        loginWithGoogle,
        completeOAuthLogin,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
