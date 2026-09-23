"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: string;
  getIdToken: () => Promise<string>;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, phone: string) => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => { },
  loginWithGithub: async () => { },
  logout: async () => { },
  registerWithEmail: async () => { },
  loginWithEmail: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${getApiUrl()}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            ...data,
            uid: String(data.id),
            displayName: data.name,
            getIdToken: async () => token
          });
        } else {
          localStorage.removeItem("auth_token");
          setUser(null);
        }
      } catch (err) {
        console.error("Session restore failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const loginWithGoogle = async () => {
    window.location.href = `${getApiUrl()}/auth/google/redirect`;
  };

  const loginWithGithub = async () => {
    window.location.href = `${getApiUrl()}/auth/github/redirect`;
  };

  const registerWithEmail = async (email: string, pass: string, name: string, phone: string) => {
    const res = await fetch(`${getApiUrl()}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass, password_confirmation: pass, name, phone })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Registration failed");
    }

    // Automatically log them in by fetching /me using the new token
    if (data.token) {
      localStorage.setItem("auth_token", data.token);

      const meRes = await fetch(`${getApiUrl()}/auth/me`, {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      if (meRes.ok) {
        const meData = await meRes.json();
        setUser({
          ...meData,
          uid: String(meData.id),
          displayName: meData.name,
          getIdToken: async () => data.token
        });
      }
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const res = await fetch(`${getApiUrl()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Login failed");
    }

    if (data.token) {
      localStorage.setItem("auth_token", data.token);

      const meRes = await fetch(`${getApiUrl()}/auth/me`, {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      if (meRes.ok) {
        const meData = await meRes.json();
        setUser({
          ...meData,
          uid: String(meData.id),
          displayName: meData.name,
          getIdToken: async () => data.token
        });
      }
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      await fetch(`${getApiUrl()}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(console.error);
    }
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithGithub, logout, registerWithEmail, loginWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
