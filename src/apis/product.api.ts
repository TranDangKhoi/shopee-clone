import { ProductListConfigType, ProductListType, ProductType } from "src/types/product.type";
import { SuccessApiResponseType } from "src/types/utils.types";
import http from "src/utils/http";

const productApi = {
  getProducts: (params: ProductListConfigType) =>
    http.get<SuccessApiResponseType<ProductListType>>("/products", {
      params,
    }),
  getProductById: (productId: string) => http.get<SuccessApiResponseType<ProductType>>(`/products/${productId}`),
};

export default productApi;
