import { yupResolver } from "@hookform/resolvers/yup";
import omit from "lodash/omit";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { searchQuerySchema, TSearchQueryType } from "src/schemas/schema";
import useQueryConfig from "./useQueryConfig";

const useSearchProducts = () => {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TSearchQueryType>({
    resolver: yupResolver(searchQuerySchema),
    defaultValues: {
      search: "",
    },
  });
  const handleSearch = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            page: "1",
            search: data.search.toString(),
          },
          ["rating_filter", "sort_by", "price_min", "price_max", "order"],
        ),
      ).toString(),
    });
  });
  return {
    register,
    handleSearch,
  };
};

export default useSearchProducts;
