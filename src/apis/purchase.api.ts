import { PurchaseListStatus, PurchaseType } from "src/types/purchase.type";
import { SuccessApiResponseType } from "src/types/utils.types";
import http from "src/utils/http";

const purchaseAPI = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessApiResponseType<PurchaseType>>("/purchases/add-to-cart", body),
  getCart: (params: { status: PurchaseListStatus }) =>
    http.get<SuccessApiResponseType<PurchaseType[]>>("/purchases", {
      params: {
        status: params.status,
      },
    }),
  buyProducts: (body: { product_id: string; buy_count: number }[]) =>
    http.post<SuccessApiResponseType<PurchaseType[]>>("/purchases/buy-products", body),
  updateCart: (body: { product_id: string; buy_count: number }) =>
    http.put<PurchaseType>("/purchases/update-purchase", body),
  deletePurchaseFromCart: (purchaseIds: string[]) =>
    http.delete<SuccessApiResponseType<{ deleted_count: number }>>("/purchases", {
      data: purchaseIds,
    }),
};

export default purchaseAPI;
