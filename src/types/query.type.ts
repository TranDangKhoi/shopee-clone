import { ProductListConfigType } from "./product.type";

export type QueryConfigType = {
  [key in keyof ProductListConfigType]: string;
};
