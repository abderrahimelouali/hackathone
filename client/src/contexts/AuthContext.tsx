import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as api from "@/services/api";

type UserRole = "tourist" | "host" | "superAdmin";

type User = {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ requiresVerification?: boolean }>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ requiresVerification?: boolean }>;
  verifyOTP: (email: string, code: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const TOKEN_KEY = "experiencia_token";
const USER_KEY = "experiencia_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      
      if (token && savedUser) {
        try {
          const res = await api.getMe();
          const userData = { ...res.data, id: res.data._id };
          setUser(userData);
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
          console.error("Session restoration failed:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.login({ email, password });
      const { token, ...userData } = res.data;
      const userWithId = { ...userData, id: userData._id };
      
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(userWithId));
      setUser(userWithId);
      return {};
    } catch (error: any) {
      if (error.response?.data?.requiresVerification) {
         return { requiresVerification: true };
      }
      const message = error.response?.data?.message || "Invalid email or password";
      throw message;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const res = await api.register({ name, email, password, role });
      if (res.data.requiresVerification) {
          return { requiresVerification: true };
      }
      return {};
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      throw message;
    }
  };

  const verifyOTP = async (email: string, code: string) => {
    try {
        const res = await api.verifyOTP({ email, code });
        const { token, ...userData } = res.data;
        const userWithId = { ...userData, id: userData._id };
      
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(userWithId));
        setUser(userWithId);
    } catch (error: any) {
        const message = error.response?.data?.message || "Invalid or expired verification code";
        throw message;
    }
  };

  const resendOTP = async (email: string) => {
    try {
        await api.resendOTP({ email });
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to resend code";
        throw message;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verifyOTP, resendOTP, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
