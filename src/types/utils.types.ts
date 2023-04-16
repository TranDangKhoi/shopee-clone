export type TErrorApiResponse<Data> = {
  message: string;
  data?: Data;
};

export type TSuccessApiResponse<Data> = Required<TErrorApiResponse<Data>>;
