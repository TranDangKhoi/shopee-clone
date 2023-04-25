import axios, { AxiosError } from "axios";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { TErrorApiResponse } from "src/types/utils.types";

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntity = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};

export const isAxiosUnauthorizedError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
};
export const isAxiosExpiredTokenError = <T>(error: unknown): error is AxiosError<T> => {
  return (
    isAxiosUnauthorizedError<TErrorApiResponse<{ name: string; message: string }>>(error) &&
    error.response?.data.data?.name === "EXPIRED_TOKEN"
  );
};
