import { createContext } from "react";

export interface AuthUser {
  token: string;
  email: string;
  fullName: string;
  roles: string[];
}

export const AuthContext = createContext<{
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
} | null>(null);