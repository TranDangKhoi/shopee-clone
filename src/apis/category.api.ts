import { CategoryType } from "src/types/category.type";
import { SuccessApiResponseType } from "src/types/utils.types";
import http from "src/utils/http";

const categoryApi = {
  getCategories: () => http.get<SuccessApiResponseType<CategoryType[]>>("/categories"),
};

export default categoryApi;
