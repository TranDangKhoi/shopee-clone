import { TProductListConfig } from "./product.type";

export type TQueryConfig = {
  [key in keyof TProductListConfig]: string;
};
