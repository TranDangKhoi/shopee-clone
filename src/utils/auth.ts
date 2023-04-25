import { TUser } from "src/types/user.types";

export const LocalStorageEventTarget = new EventTarget();

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};
export const saveRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem("refresh_token", refresh_token);
};

export const clearAuthenInfoFromLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
  const clearAuthenInfoEvent = new Event("clearAuthen");
  LocalStorageEventTarget.dispatchEvent(clearAuthenInfoEvent);
};

export const getAccessTokenFromLS = () => localStorage.getItem("access_token") || "";
export const getRefreshTokenFromLS = () => localStorage.getItem("refresh_token") || "";

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const saveProfileToLS = (profile: TUser) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
