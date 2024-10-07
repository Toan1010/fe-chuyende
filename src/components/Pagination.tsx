import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Tạo danh sách trang cần hiển thị
  const getPaginationNumbers = () => {
    const pages = [];

    if (totalPages <= 4) {
      // Hiển thị tất cả khi số trang ít hơn hoặc bằng 4
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Trang đầu và trang cuối luôn hiện
      if (currentPage > 2) {
        pages.push(1);
      }

      // Hiển thị trang 1, 2, 3
      if (currentPage === 1 || currentPage === 2) {
        pages.push(2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1);
      } else {
        // Hiển thị trang xung quanh trang hiện tại
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }

      // Dấu "..." nếu cần
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Trang cuối
      if (currentPage !== totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const paginationNumbers = getPaginationNumbers();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
      >
        Trước
      </button>

      {/* Hiển thị danh sách các số trang */}
      {paginationNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-3 py-1 mx-1">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination;
