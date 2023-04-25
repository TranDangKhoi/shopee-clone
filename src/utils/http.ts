import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { AUTH_ENUM } from "src/apis/auth.api";
import { config } from "src/constants/config.enum";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { path } from "src/constants/path.enum";
import { TAuthResponse, TRefreshTokenResponse } from "src/types/auth-response.types";
import { TUser } from "src/types/user.types";
import {
  clearAuthenInfoFromLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
  saveRefreshTokenToLS,
} from "./auth";
import { isAxiosUnauthorizedError } from "./isAxiosError";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  // private userProfile: TUser;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    // this.userProfile = getProfileFromLS() || null;
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "expire-access-token": 10, // 10 giây
        "expire-refresh-token": 60 * 60, // 1 giờ
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
        if (url === AUTH_ENUM.URL_LOGIN || url === AUTH_ENUM.URL_REGISTER) {
          const data = response.data as TAuthResponse;
          this.accessToken = data.data.access_token;
          this.refreshToken = data.data.refresh_token;
          // this.userProfile = (response.data as TAuthResponse).data.user;
          saveAccessTokenToLS(this.accessToken);
          saveRefreshTokenToLS(this.refreshToken);
          saveProfileToLS(data.data.user);
        } else if (url === "/logout") {
          this.accessToken = "";
          this.refreshToken = "";
          clearAuthenInfoFromLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error?.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // const message = error.message;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if (isAxiosUnauthorizedError(error)) {
          // Lỗi 401 có rất nhiều trường hợp
          // 1. Token không đúng hoặc token trống
          // 2. Token hết hạn
          // v.v...
          clearAuthenInfoFromLS();
        }
        return Promise.reject(error);
      },
    );
  }
  private handleRefreshToken() {
    this.instance
      .post<TRefreshTokenResponse>(AUTH_ENUM.URL_REFRESHTOKEN, {
        refresh_token: this.refreshToken,
      })
      .then((res) => {
        const { access_token } = res.data.data;
        saveAccessTokenToLS(access_token);
        this.accessToken = access_token;
        return access_token;
      })
      .catch((error) => {
        clearAuthenInfoFromLS();
        this.accessToken = "";
        this.refreshToken = "";
        throw error;
      });
  }
}

const http = new Http().instance;

export default http;
