import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { env } from "process";
import { toast } from "react-toastify";
import { AUTH_ENUM } from "src/apis/auth.api";
import { config } from "src/constants/config.enum";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { TAuthResponse, TRefreshTokenResponse } from "src/types/auth-response.types";
import { TErrorApiResponse } from "src/types/utils.types";
import {
  clearAuthenInfoFromLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
  saveRefreshTokenToLS,
} from "./auth";
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from "./isAxiosError";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  private TIME_BEFORE_LOOKING_FOR_A_NEW_REFRESH_TOKEN: number;
  // private userProfile: TUser;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.TIME_BEFORE_LOOKING_FOR_A_NEW_REFRESH_TOKEN = 10000;
    this.refreshTokenRequest = null;
    // this.userProfile = getProfileFromLS() || null;
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API,
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
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error?.response?.status as number)
        ) {
          // const message = error.message;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if (isAxiosUnauthorizedError<TErrorApiResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig);
          const { url } = config;
          // Lỗi 401 có rất nhiều trường hợp
          // TH1: Token hết hạn
          if (isAxiosExpiredTokenError(error) && url !== AUTH_ENUM.URL_REFRESHTOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // giữ refresh token request trong một khoảng thời gian nhất định rồi mới set lại là null để
                  // tránh các trường hợp bất đắc dĩ handleRefreshToken() bị invoke 2 lần
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, this.TIME_BEFORE_LOOKING_FOR_A_NEW_REFRESH_TOKEN);
                });
            return this.refreshTokenRequest.then((access_token) => {
              if (config?.headers) {
                config.headers.Authorization = access_token;
              }
              // Nghĩa là chúng ta tiếp tục request cũ vừa bị lỗi sau khi refresh thành công, chỉ là thay thế header Authorization bằng token mới
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: access_token },
              });
            });
          }
          // Các trường hợp còn lại:
          clearAuthenInfoFromLS();
          this.accessToken = "";
          this.refreshToken = "";
          toast.error(error.response?.data.data?.message);
        }
        return Promise.reject(error);
      },
    );
  }
  private handleRefreshToken() {
    return this.instance
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
