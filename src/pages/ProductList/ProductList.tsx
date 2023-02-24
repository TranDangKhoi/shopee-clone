import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import productApi from "src/apis/product.api";
import Pagination from "src/components/Pagination";
import useQueryParams from "src/hooks/useQueryParams";
import AsideFilter from "./AsideFilter";
import Product from "./Product/Product";
import SortProductList from "./SortProductList/SortProductList";

const ProductList = () => {
  const queryParams = useQueryParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productApi.getProducts(queryParams),
  });
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter />
          </div>
          <div className="col-span-9">
            <SortProductList />
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={20}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
