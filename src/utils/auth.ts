import { UserType } from "src/types/user.types";

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const clearAuthenInfoFromLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
};

export const getAccessTokenFromLS = () => localStorage.getItem("access_token") || "";

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const saveProfileToLS = (profile: UserType) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
