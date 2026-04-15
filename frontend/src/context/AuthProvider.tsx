import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";
import { getToken } from "../services/auth";

function parseToken(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const roles = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return {
      token,
      email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      fullName: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      roles: Array.isArray(roles) ? roles : roles ? [roles] : [],
    };
  } catch {
    return null;
  }
}

function getInitialUser(): AuthUser | null {
  const token = getToken();
  return token ? parseToken(token) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(getInitialUser);

  const setUser = (user: AuthUser | null) => {
    setUserState(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}