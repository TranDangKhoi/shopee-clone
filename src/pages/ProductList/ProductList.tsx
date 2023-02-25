import { useQuery } from "@tanstack/react-query";
import { isUndefined, omitBy } from "lodash";
import productApi from "src/apis/product.api";
import Pagination from "src/components/Pagination";
import useQueryParams from "src/hooks/useQueryParams";
import { ProductListConfigType } from "src/types/product.type";
import { QueryConfigType } from "src/types/query.type";
import AsideFilter from "./AsideFilter";
import Product from "./Product/Product";
import SortProductList from "./SortProductList/SortProductList";

const ProductList = () => {
  const queryParams = useQueryParams();
  const queryConfig: QueryConfigType = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit,
      sort_by: queryParams.sort_by,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
    },
    isUndefined,
  );
  const { data } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfigType),
    keepPreviousData: true,
  });
  console.log(queryConfig);
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        {data && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <AsideFilter />
            </div>
            <div className="col-span-9">
              <SortProductList
                queryConfig={queryConfig}
                pageSize={data.data.data.pagination.page_size}
              />
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {data &&
                  data.data.data.products.map((product) => (
                    <div
                      className="col-span-1"
                      key={product._id}
                    >
                      <Product product={product}></Product>
                    </div>
                  ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={data.data.data.pagination.page_size}
              ></Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
