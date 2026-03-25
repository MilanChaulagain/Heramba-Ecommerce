"use client";

import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type AuthContextValue = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}