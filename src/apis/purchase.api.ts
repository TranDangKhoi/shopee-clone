import { TPurchaseListStatus, TPurchase } from "src/types/purchase.type";
import { TSuccessApiResponse } from "src/types/utils.types";
import http from "src/utils/http";

const purchaseAPI = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<TSuccessApiResponse<TPurchase>>("/purchases/add-to-cart", body),
  getCart: (params: { status: TPurchaseListStatus }) =>
    http.get<TSuccessApiResponse<TPurchase[]>>("/purchases", {
      params: {
        status: params.status,
      },
    }),
  buyProducts: (body: { product_id: string; buy_count: number }[]) =>
    http.post<TSuccessApiResponse<TPurchase[]>>("/purchases/buy-products", body),
  updateCart: (body: { product_id: string; buy_count: number }) =>
    http.put<TPurchase>("/purchases/update-purchase", body),
  deletePurchaseFromCart: (purchaseIds: string[]) =>
    http.delete<TSuccessApiResponse<{ deleted_count: number }>>("/purchases", {
      data: purchaseIds,
    }),
};

export default purchaseAPI;
