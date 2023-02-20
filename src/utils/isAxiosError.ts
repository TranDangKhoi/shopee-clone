import axios, { AxiosError } from "axios";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntity = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};
