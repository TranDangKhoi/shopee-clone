import { TAuthResponse } from "src/types/auth-response.types";
import http from "src/utils/http";

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<TAuthResponse>("/register", body),
  loginAccount: (body: { email: string; password: string }) => http.post<TAuthResponse>("/login", body),
  logoutAccount: () => http.post("/logout"),
};

export default authApi;
