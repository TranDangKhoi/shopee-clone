import classNames from "classnames";
import React from "react";
import { createSearchParams, Link } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { TQueryConfig } from "src/types/query.type";

type PaginationProps = {
  queryConfig: TQueryConfig;
  pageSize: number;
};
const RANGE = 2;
const Pagination = ({ pageSize, queryConfig }: PaginationProps) => {
  const currentPage = Number(queryConfig.page);
  const renderPagination = () => {
    let ellipsisAfter = false;
    let ellipsisBefore = false;
    const renderEllipsisBefore = (index: number) => {
      if (!ellipsisBefore) {
        ellipsisBefore = true;
        return (
          <span
            key={index}
            className=" bg-white px-3 py-2"
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderEllipsisAfter = (index: number) => {
      if (!ellipsisAfter) {
        ellipsisAfter = true;
        return (
          <span
            key={index}
            className="bg-white px-3 py-2"
          >
            ...
          </span>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderEllipsisAfter(index);
        } else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
          if (pageNumber < currentPage - RANGE && pageNumber > RANGE) {
            return renderEllipsisBefore(index);
          } else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderEllipsisAfter(index);
          }
        } else if (currentPage >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderEllipsisBefore(index);
        }
        return (
          <Link
            key={index}
            className={classNames("cursor-pointer px-3 py-2 shadow-sm", {
              "bg-primary text-white hover:bg-primary": pageNumber === currentPage,
              "bg-white hover:bg-gray-100": pageNumber !== currentPage,
            })}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="mt-6 flex flex-wrap justify-center">
      {currentPage === 1 ? (
        <button className="cursor-not-allowed bg-white bg-opacity-30 px-3 py-2 shadow-sm hover:bg-gray-100">
          {"<"} Prev
        </button>
      ) : (
        <Link
          className="cursor-pointer bg-white px-3 py-2 shadow-sm hover:bg-gray-100"
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage - 1).toString(),
            }).toString(),
          }}
        >
          {"<"} Prev
        </Link>
      )}
      {renderPagination()}
      {currentPage >= pageSize ? (
        <button className="cursor-not-allowed bg-white bg-opacity-30 px-3 py-2 shadow-sm hover:bg-gray-100">
          Next {">"}
        </button>
      ) : (
        <Link
          className="cursor-pointer bg-white px-3 py-2 shadow-sm hover:bg-gray-100"
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (currentPage + 1).toString(),
            }).toString(),
          }}
        >
          Next {">"}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
