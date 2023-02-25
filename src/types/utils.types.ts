export type ErrorApiResponseType<Data> = {
  message: string;
  data?: Data;
};

export type SuccessApiResponseType<Data> = Required<ErrorApiResponseType<Data>>;
