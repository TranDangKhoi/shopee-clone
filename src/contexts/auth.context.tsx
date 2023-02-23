import React, { createContext, useState } from "react";
import { UserType } from "src/types/user.types";
import { getAccessTokenFromLS, getProfileFromLS } from "src/utils/auth";

interface AuthContextInterface {
  isAuthenticated: boolean;
  userProfile: UserType | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const initialAuthContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  userProfile: getProfileFromLS() || null,
  setIsAuthenticated: () => null,
  setUserProfile: () => null,
};

export const AuthContext = createContext<AuthContextInterface>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated);
  const [userProfile, setUserProfile] = useState<UserType | null>(initialAuthContext.userProfile);
  return (
    <AuthContext.Provider value={{ userProfile, isAuthenticated, setIsAuthenticated, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
