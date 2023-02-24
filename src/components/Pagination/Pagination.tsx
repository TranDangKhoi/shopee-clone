import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const RANGE = 2;
const Pagination = ({ currentPage, pageSize, setCurrentPage }: PaginationProps) => {
  const renderPagination = () => {
    let ellipsisAfter = false;
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE - 1) {
          if (!ellipsisAfter) {
            ellipsisAfter = true;
            return (
              <button
                key={index}
                className="cursor-default bg-white px-3 py-2 shadow-md"
              >
                ...
              </button>
            );
          }
          return null;
        }
        return (
          <button
            key={index}
            className={classNames("cursor-pointer px-3 py-2 shadow-sm hover:bg-gray-200", {
              "bg-primary text-white hover:bg-primary": pageNumber === currentPage,
              "bg-white": pageNumber !== currentPage,
            })}
          >
            {pageNumber}
          </button>
        );
      });
  };
  return (
    <div className="mt-6 flex flex-wrap justify-center">
      <button className="cursor-pointer bg-white px-3 py-2 shadow-sm hover:bg-gray-200">{"<"} Prev</button>
      {renderPagination()}
      <button className="cursor-pointer bg-white px-3 py-2 shadow-sm hover:bg-gray-200">Next {">"}</button>
    </div>
  );
};

export default Pagination;
