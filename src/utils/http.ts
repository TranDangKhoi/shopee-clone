import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { AuthResponseType } from "src/types/auth-response.types";
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from "./auth";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS() || "";
    this.instance = axios.create({
      baseURL: "https://api-ecom.duthanhduoc.com",
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
          this.accessToken = (response.data as AuthResponseType).data.access_token;
          saveAccessTokenToLS(this.accessToken);
        } else if (url === "/logout") {
          this.accessToken = "";
          clearAccessTokenFromLS;
        }
        return response;
      },
      (error: AxiosError) => {
        if (error?.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // const message = error.message;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
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
