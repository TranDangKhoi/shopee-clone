import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";
import { TQueryConfig } from "src/types/query.type";
import useQueryParams from "./useQueryParams";

export default function useQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig: TQueryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      name: queryParams.search,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category,
    },
    isUndefined,
  );
  return queryConfig;
}
