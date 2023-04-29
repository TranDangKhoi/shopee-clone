import { useQuery } from "@tanstack/react-query";
import categoryApi from "src/apis/category.api";
import productApi from "src/apis/product.api";
import Pagination from "src/components/Pagination";
import { Helmet } from "react-helmet-async";
import useQueryConfig from "src/hooks/useQueryConfig";
import { TProductListConfig } from "src/types/product.type";
import AsideFilter from "./components/AsideFilter";
import Product from "./components/Product";
import SortProductList from "./components/SortProductList";

const ProductList = () => {
  const queryConfig = useQueryConfig();
  const { data: productsData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as TProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
  });
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories(),
  });
  return (
    <div className="bg-gray-200 py-6">
      <Helmet>
        <title>Shopee At Home | Trang chủ</title>
        <meta
          name="description"
          content="A shopee clone edition used for studying purposes"
          data-react-helmet="true"
        />
      </Helmet>
      <div className="container">
        {productsData && (
          <div className="gap-6 md:grid md:grid-cols-12">
            <div className="block w-full md:col-span-3">
              <AsideFilter
                queryConfig={queryConfig}
                categories={categoriesData?.data.data || []}
              />
            </div>
            <div className="block w-full md:col-span-9">
              <SortProductList
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              />
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {productsData &&
                  productsData.data.data.products.map((product) => (
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
                pageSize={productsData.data.data.pagination.page_size}
              ></Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
