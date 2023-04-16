import { TProduct } from "./product.type";

export type TPurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5;
export type TPurchaseListStatus = TPurchaseStatus | 0;

export type TPurchase = {
  _id: string;
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: TPurchaseStatus;
  product: TProduct;
  createdAt: string;
  updatedAt: string;
};

export type TExtendedPurchases = {
  disabled: boolean;
  checked: boolean;
} & TPurchase;
