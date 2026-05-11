import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  loginWithGoogle: (user: AuthUser) => void;
  updateProfile: (updates: Partial<Pick<AuthUser, "name" | "email" | "picture">>) => void;
  logout: () => void;
}

const STORAGE_KEY = "logo_project_auth_user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadInitialUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadInitialUser());

  const loginWithGoogle = (nextUser: AuthUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  };

  const updateProfile = (updates: Partial<Pick<AuthUser, "name" | "email" | "picture">>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const merged = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      isLoggedIn: !!user,
      user,
      loginWithGoogle,
      updateProfile,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
