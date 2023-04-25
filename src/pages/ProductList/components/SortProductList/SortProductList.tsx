import classNames from "classnames";
import omit from "lodash/omit";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { sortBy, sortOrder } from "src/constants/params.enum";
import { path } from "src/constants/path.enum";
import { TProductListConfig } from "src/types/product.type";
import { TQueryConfig } from "src/types/query.type";

type SortProductListProps = {
  queryConfig: TQueryConfig;
  pageSize: number;
};

const SortProductList = ({ pageSize, queryConfig }: SortProductListProps) => {
  const page = Number(queryConfig.page);
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const navigate = useNavigate();
  const handleFilterSort = (sortByValue: Exclude<TProductListConfig["sort_by"], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
          },
          ["order"],
        ),
      ).toString(),
    });
  };
  const handlePriceOrderSort = (orderValue: Exclude<TProductListConfig["order"], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price.toString(),
        order: orderValue.toString(),
      }).toString(),
    });
  };
  const isActiveSortBy = (sortByValue: Exclude<TProductListConfig["sort_by"], undefined>) => {
    return sort_by === sortByValue;
  };
  return (
    <div className="bg-gray-300/40 py-4 px-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={classNames(
              "h-8 bg-primary px-4 text-center text-sm capitalize hover:bg-primary/80",
              {
                "bg-primary text-white hover:bg-primary/80": isActiveSortBy(sortBy.view),
              },
              {
                "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.view),
              },
            )}
            onClick={() => handleFilterSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames(
              "h-8 bg-primary px-4 text-center text-sm capitalize hover:bg-primary/80",
              {
                "bg-primary text-white hover:bg-primary/80": isActiveSortBy(sortBy.createdAt),
              },
              {
                "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.createdAt),
              },
            )}
            onClick={() => handleFilterSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames(
              "h-8 bg-primary px-4 text-center text-sm capitalize hover:bg-primary/80",
              {
                "bg-primary text-white hover:bg-primary/80": isActiveSortBy(sortBy.sold),
              },
              {
                "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.sold),
              },
            )}
            onClick={() => handleFilterSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              "h-8 px-4 text-left text-sm capitalize outline-none",
              {
                "bg-primary text-white hover:bg-primary/80": isActiveSortBy(sortBy.price),
              },
              {
                "bg-white text-black hover:bg-slate-100": !isActiveSortBy(sortBy.price),
              },
            )}
            value={order || ""}
            onChange={(e) => handlePriceOrderSort(e.target.value as sortOrder)}
          >
            <option
              value=""
              className="cursor-not-allowed bg-white text-black hover:bg-slate-100"
              disabled
            >
              Giá
            </option>
            <option
              value={sortOrder.asc}
              className="bg-white text-black hover:bg-slate-100"
            >
              Giá: Thấp đến cao
            </option>
            <option
              value={sortOrder.desc}
              className="bg-white text-black hover:bg-slate-100"
            >
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className="flex items-center gap-x-2">
          <div>
            <span className="text-primary">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="flex items-center justify-center">
            {page === 1 ? (
              <button className="h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString(),
                  }).toString(),
                }}
                className="flex h-8 items-center justify-center rounded-tl-sm rounded-bl-sm bg-white px-3 shadow hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <button className="flex h-8 cursor-not-allowed items-center justify-center rounded-tr-sm rounded-br-sm bg-white/60 px-3 shadow hover:bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString(),
                  }).toString(),
                }}
                className="flex h-8 items-center justify-center rounded-tr-sm rounded-br-sm bg-white px-3 shadow hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortProductList;
