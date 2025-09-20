// import React from "react";

// interface PaginationProps {
//   // Add any necessary props here
// }

// const Pagination: React.FC<PaginationProps> = () => {
//   return (
//     <div className="flex gap-1.5 self-center mt-10 max-w-full text-sm text-center text-black w-[358px]">
//       <div className="px-5 py-3 text-black bg-green-600 border border-green-600 border-solid rounded-md whitespace-nowrap">
//         1
//       </div>
//       <div className="px-4 py-3 bg-white border border-solid rounded-md whitespace-nowrap border-zinc-200">
//         2
//       </div>
//       <div className="px-4 py-3 bg-white border border-solid rounded-md whitespace-nowrap border-zinc-200">
//         3
//       </div>
//       <div className="px-4 py-3 bg-white border border-solid rounded-md whitespace-nowrap border-zinc-200">
//         4
//       </div>
//       <div className="px-4 pt-5 pb-3 bg-white border border-solid rounded-md whitespace-nowrap border-zinc-200">
//         ...
//       </div>
//       <div className="px-3.5 py-3 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
//         20
//       </div>
//       <div className="px-4 py-3 bg-white border border-solid rounded-md border-zinc-200 max-md:pr-5">
//         Next{" "}
//       </div>
//     </div>
//   );
// };

// export default Pagination;

"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 20,
  onPageChange = () => {},
  showPages = 5,
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== activePage) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const halfShow = Math.floor(showPages / 2);

    let startPage = Math.max(1, activePage - halfShow);
    let endPage = Math.min(totalPages, activePage + halfShow);

    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < showPages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + showPages - 1);
      } else {
        startPage = Math.max(1, endPage - showPages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis =
    visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="p-2 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage === 1}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activePage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* First Page */}
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-3 font-semibold text-gray-700 transition-all duration-300 transform rounded-xl hover:scale-105 bg-gray-50 hover:bg-gray-100 hover:shadow-md"
              >
                1
              </button>
              {showStartEllipsis && (
                <div className="flex items-center justify-center px-3 py-3">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </>
          )}

          {/* Visible Page Numbers */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                page === activePage
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg ring-4 ring-green-500/20"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md hover:text-gray-900"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Last Page */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {showEndEllipsis && (
                <div className="flex items-center justify-center px-3 py-3">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-4 py-3 font-semibold text-gray-700 transition-all duration-300 transform rounded-xl hover:scale-105 bg-gray-50 hover:bg-gray-100 hover:shadow-md"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === totalPages}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              activePage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page Info */}
        <div className="flex items-center justify-center px-4 py-2 mt-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Page</span>
            <div className="px-3 py-1 font-semibold text-gray-900 bg-white rounded-lg shadow-sm">
              {activePage}
            </div>
            <span>of</span>
            <div className="px-3 py-1 font-semibold text-gray-900 bg-white rounded-lg shadow-sm">
              {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alternative Compact Version
export const CompactPagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 20,
  onPageChange = () => {},
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== activePage) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 space-x-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
          activePage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      {/* Page Counter */}
      <div className="px-8 py-4 bg-white border border-gray-100 shadow-lg rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">Page</div>
          <div className="px-4 py-2 text-lg font-bold text-white shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            {activePage}
          </div>
          <div className="text-sm text-gray-600">of {totalPages}</div>
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
          activePage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600"
        }`}
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// Minimal Dots Version
export const DotsPagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 20,
  onPageChange = () => {},
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== activePage) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 space-x-6">
      {/* Previous */}
      <button
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
        className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
          activePage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex items-center space-x-3">
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                page === activePage
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg ring-4 ring-blue-500/20"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
        className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
          activePage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
