import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserRole = "tourist" | "host";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const USERS_KEY = "experiencia_users";
const CURRENT_USER_KEY = "experiencia_current_user";

const getStoredUsers = (): (User & { password: string })[] => {
  const data = localStorage.getItem(USERS_KEY);
  if (!data) {
    const defaults = [
      { id: "host1", name: "أحمد المرشد", email: "host@test.com", password: "123456", role: "host" as UserRole },
      { id: "tourist1", name: "سارة السائحة", email: "tourist@test.com", password: "123456", role: "tourist" as UserRole },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
    return defaults;
  }
  return JSON.parse(data);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string, role: UserRole): boolean => {
    const users = getStoredUsers();
    if (users.find((u) => u.email === email)) return false;
    const newUser = { id: `user_${Date.now()}`, name, email, password, role };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
