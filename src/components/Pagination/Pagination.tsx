import React, { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, showPages = 4 }) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    const updateVisiblePages = () => {
      const leftLimit = Math.max(currentPage - Math.floor(showPages / 2), 1);
      const rightLimit = Math.min(
        leftLimit + showPages - 1,
        totalPages,
        leftLimit + showPages - 1 + Math.min(showPages, totalPages - leftLimit),
      );

      const visiblePagesArray = [];
      if (leftLimit > 1) {
        visiblePagesArray.push(-1);
      }
      for (let i = leftLimit; i <= rightLimit; i++) {
        visiblePagesArray.push(i);
      }
      if (rightLimit < totalPages) {
        visiblePagesArray.push(-2);
      }
      setVisiblePages(visiblePagesArray);
    };

    updateVisiblePages();
  }, [currentPage, totalPages, showPages]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="my-4 flex justify-center">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="mx-1 rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
      >
        Prev
      </button>
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === -1 && <span className="mx-1 px-3 py-1">...</span>}
          {page === -2 && <span className="mx-1 px-3 py-1">...</span>}
          {page !== -1 && page !== -2 && (
            <button
              onClick={() => handlePageClick(page)}
              className={`mx-1 rounded border border-gray-300 px-3 py-1 ${currentPage === page ? "bg-gray-300" : ""}`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="mx-1 rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
