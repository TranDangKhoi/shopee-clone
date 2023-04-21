import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { config } from "src/constants/config.enum";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { TAuthResponse } from "src/types/auth-response.types";
import { TUser } from "src/types/user.types";
import {
  clearAuthenInfoFromLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
} from "./auth";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private userProfile: TUser;
  constructor() {
    this.accessToken = getAccessTokenFromLS() || "";
    this.userProfile = getProfileFromLS() || null;
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/login" || url === "/register") {
          this.accessToken = (response.data as TAuthResponse).data.access_token;
          this.userProfile = (response.data as TAuthResponse).data.user;
          saveAccessTokenToLS(this.accessToken);
          saveProfileToLS(this.userProfile);
        } else if (url === "/logout") {
          this.accessToken = "";
          clearAuthenInfoFromLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearAuthenInfoFromLS();
          return Promise.reject(error);
        }
        if (error?.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // const message = error.message;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
