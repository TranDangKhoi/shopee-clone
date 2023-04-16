import { TProductListConfig, TProductList, TProduct } from "src/types/product.type";
import { TSuccessApiResponse } from "src/types/utils.types";
import http from "src/utils/http";

const productApi = {
  getProducts: (params: TProductListConfig) =>
    http.get<TSuccessApiResponse<TProductList>>("/products", {
      params,
    }),
  getProductById: (productId: string) => http.get<TSuccessApiResponse<TProduct>>(`/products/${productId}`),
};

export default productApi;
