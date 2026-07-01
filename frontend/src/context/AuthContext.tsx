import React, { createContext, useContext, useEffect, useState } from "react";
import { api, getSavedSchemes, saveScheme, unsaveScheme } from "../services/api";

export interface User {
  id: string;
  full_name: string;
  email: string;
  state: string;
  is_admin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  savedSchemes: string[];
  login: (email: string, password: string) => Promise<void>;
  registerUser: (fullName: string, email: string, state: string, password: string, consent: boolean) => Promise<void>;
  logout: () => void;
  toggleSaveScheme: (schemeName: string) => Promise<void>;
  refreshSavedSchemes: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);

  useEffect(() => {
    async function loadMe() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          // Fetch current user details
          const response = await api.get<User>("/auth/me");
          const me = response.data;
          // Standard check for admin (e.g. email has admin prefix or just standard parameter)
          me.is_admin = me.email.includes("admin") || me.email === "admin@jansathi.gov.in";
          setUser(me);
          
          // Load saved schemes
          const saved = await getSavedSchemes();
          setSavedSchemes(saved);
        } catch (error) {
          console.error("Token verification failed, logging out", error);
          logout();
        }
      }
      setIsAuthenticating(false);
    }
    loadMe();
  }, [token]);

  async function login(email: string, password: string) {
    const response = await api.post<{ access_token: string; user: User }>("/auth/login", {
      email,
      password,
    });
    const { access_token, user: loggedUser } = response.data;
    localStorage.setItem("token", access_token);
    loggedUser.is_admin = loggedUser.email.includes("admin") || loggedUser.email === "admin@jansathi.gov.in";
    setToken(access_token);
    setUser(loggedUser);
  }

  async function registerUser(fullName: string, email: string, state: string, password: string, consent: boolean) {
    const response = await api.post<{ access_token: string; user: User }>("/auth/register", {
      full_name: fullName,
      email,
      state,
      password,
      consent,
    });
    const { access_token, user: registeredUser } = response.data;
    localStorage.setItem("token", access_token);
    registeredUser.is_admin = registeredUser.email.includes("admin") || registeredUser.email === "admin@jansathi.gov.in";
    setToken(access_token);
    setUser(registeredUser);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setSavedSchemes([]);
  }

  async function refreshSavedSchemes() {
    if (user) {
      try {
        const saved = await getSavedSchemes();
        setSavedSchemes(saved);
      } catch (e) {
        console.error("Failed to refresh saved schemes", e);
      }
    }
  }

  async function toggleSaveScheme(schemeName: string) {
    if (!user) return;
    try {
      if (savedSchemes.includes(schemeName)) {
        await unsaveScheme(schemeName);
        setSavedSchemes((prev) => prev.filter((name) => name !== schemeName));
      } else {
        await saveScheme(schemeName);
        setSavedSchemes((prev) => [...prev, schemeName]);
      }
    } catch (error) {
      console.error("Failed to save/unsave scheme", error);
      throw error;
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isAuthenticating,
    savedSchemes,
    login,
    registerUser,
    logout,
    toggleSaveScheme,
    refreshSavedSchemes,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
