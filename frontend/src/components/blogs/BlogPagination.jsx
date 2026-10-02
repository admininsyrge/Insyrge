"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * Calculates page numbers to display with smart ellipsis windowing
 * e.g. [1, 2, 3, 4, 5, 'ellipsis-right', 41]
 *      [1, 'ellipsis-left', 19, 20, 21, 'ellipsis-right', 41]
 *      [1, 'ellipsis-left', 37, 38, 39, 40, 41]
 */
function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Near the start
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
  }

  // Near the end
  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // In the middle
  return [
    1,
    "ellipsis-left",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-right",
    totalPages,
  ];
}

const BlogPagination = ({ totalPages, currentPage, onPageChange, totalItems }) => {
  if (totalPages <= 1) return null;

  const pageItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className="w-full flex flex-col items-center justify-center gap-4 py-12 px-4 select-none"
    >
      {/* Page Navigation Controls */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full">
        {/* === First Page Quick Button (Desktop only if beyond page 4) === */}
        {totalPages > 7 && currentPage > 4 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(1)}
            aria-label="First page"
            title="First page"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs font-semibold bg-[#0F2555]/70 hover:bg-[#142E63] text-gray-300 hover:text-[#08e5c0] border border-white/10 hover:border-[#08e5c0]/40 transition-colors"
          >
            <ChevronsLeft className="w-4 h-4" />
          </motion.button>
        )}

        {/* === Prev Button === */}
        <motion.button
          whileHover={currentPage > 1 ? { scale: 1.05, boxShadow: "0 0 15px #08e5c040" } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold bg-[#0F2555] text-white hover:bg-[#142E63] border border-white/10 hover:border-[#08e5c0]/40 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-[#0F2555] disabled:hover:border-white/10 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </motion.button>

        {/* === Page Number Buttons === */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
          {pageItems.map((item, index) => {
            if (item === "ellipsis-left") {
              const jumpTarget = Math.max(1, currentPage - 5);
              return (
                <button
                  key={`ellipsis-left-${index}`}
                  onClick={() => onPageChange(jumpTarget)}
                  title={`Jump back 5 pages (to page ${jumpTarget})`}
                  aria-label={`Jump back 5 pages to page ${jumpTarget}`}
                  className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#0F2555]/40 hover:bg-[#142E63] text-gray-400 hover:text-[#08e5c0] border border-transparent hover:border-[#08e5c0]/30 transition-all text-xs font-semibold cursor-pointer"
                >
                  <span className="group-hover:hidden">•••</span>
                  <span className="hidden group-hover:inline text-[10px] tracking-tighter">« 5</span>
                </button>
              );
            }

            if (item === "ellipsis-right") {
              const jumpTarget = Math.min(totalPages, currentPage + 5);
              return (
                <button
                  key={`ellipsis-right-${index}`}
                  onClick={() => onPageChange(jumpTarget)}
                  title={`Jump forward 5 pages (to page ${jumpTarget})`}
                  aria-label={`Jump forward 5 pages to page ${jumpTarget}`}
                  className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-[#0F2555]/40 hover:bg-[#142E63] text-gray-400 hover:text-[#08e5c0] border border-transparent hover:border-[#08e5c0]/30 transition-all text-xs font-semibold cursor-pointer"
                >
                  <span className="group-hover:hidden">•••</span>
                  <span className="hidden group-hover:inline text-[10px] tracking-tighter">5 »</span>
                </button>
              );
            }

            const pageNumber = item;
            const isActive = currentPage === pageNumber;

            return (
              <motion.button
                key={`page-${pageNumber}`}
                whileHover={!isActive ? { scale: 1.08 } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(pageNumber)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
                className={`relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#08e5c0] text-[#0B1C3D] font-bold shadow-[0_0_20px_#08e5c080] border border-[#08e5c0]"
                    : "bg-[#0F2555] text-white hover:bg-[#142E63] border border-white/10 hover:border-[#08e5c0]/40"
                }`}
              >
                <span className="relative z-10">{pageNumber}</span>
                {isActive && (
                  <motion.span
                    layoutId="activePageIndicator"
                    className="absolute inset-0 rounded-lg bg-[#08e5c0]/25 blur-sm -z-0"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* === Next Button === */}
        <motion.button
          whileHover={currentPage < totalPages ? { scale: 1.05, boxShadow: "0 0 15px #08e5c040" } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-semibold bg-[#0F2555] text-white hover:bg-[#142E63] border border-white/10 hover:border-[#08e5c0]/40 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-[#0F2555] disabled:hover:border-white/10 transition-all"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>

        {/* === Last Page Quick Button (Desktop only if before totalPages - 3) === */}
        {totalPages > 7 && currentPage < totalPages - 3 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(totalPages)}
            aria-label="Last page"
            title="Last page"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs font-semibold bg-[#0F2555]/70 hover:bg-[#142E63] text-gray-300 hover:text-[#08e5c0] border border-white/10 hover:border-[#08e5c0]/40 transition-colors"
          >
            <ChevronsRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Counter Label */}
      <div className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
        Page <span className="text-[#08e5c0] font-semibold">{currentPage}</span> of{" "}
        <span className="text-white font-semibold">{totalPages}</span>
        {totalItems ? ` (${totalItems} total articles)` : ""}
      </div>
    </nav>
  );
};

export default BlogPagination;
