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
    if (currentPage <= RANGE * 2 + 1)
      return Array(pageSize)
        .fill(0)
        .map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={index}
              className="cursor-pointer bg-white px-3 py-2 shadow-sm"
            >
              {pageNumber}
            </button>
          );
        });
  };
  return (
    <div className="mt-6 flex flex-wrap justify-center">
      <button className="cursor-pointer bg-white px-3 py-2 shadow-sm">{"<"} Prev</button>
      {renderPagination()}
      <button className="cursor-pointer bg-white px-3 py-2 shadow-sm">Next {">"}</button>
    </div>
  );
};

export default Pagination;
