import React, { createContext, useState } from "react";
import { TUser } from "src/types/user.types";
import { getAccessTokenFromLS, getProfileFromLS } from "src/utils/auth";

interface AuthContextInterface {
  isAuthenticated: boolean;
  userProfile: TUser | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<TUser | null>>;
  clearAuthenFromProvider: () => void;
}

const initialAuthContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  userProfile: getProfileFromLS() || null,
  setIsAuthenticated: () => null,
  setUserProfile: () => null,
  clearAuthenFromProvider: () => null,
};

export const AuthContext = createContext<AuthContextInterface>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated);
  const [userProfile, setUserProfile] = useState<TUser | null>(initialAuthContext.userProfile);
  const clearAuthenFromProvider = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };
  return (
    <AuthContext.Provider
      value={{ userProfile, isAuthenticated, setIsAuthenticated, setUserProfile, clearAuthenFromProvider }}
    >
      {children}
    </AuthContext.Provider>
  );
};
