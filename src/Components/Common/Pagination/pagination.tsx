// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md hover:bg-blue-500 hover:text-white`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;