import { TCategory } from "src/types/category.type";
import { TSuccessApiResponse } from "src/types/utils.types";
import http from "src/utils/http";

const categoryApi = {
  getCategories: () => http.get<TSuccessApiResponse<TCategory[]>>("/categories"),
};

export default categoryApi;
