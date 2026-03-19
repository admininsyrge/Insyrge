"use client";
import { motion } from "framer-motion";
import React from "react";

const BlogPagination = ({ totalPages, currentPage, onPageChange }) => {
  const buttonBase =
    "relative px-4 py-2 rounded-md font-semibold transition-all duration-300";

  return (
    <div className="flex justify-center items-center gap-4 py-10">
      {/* === Prev Button === */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px #08e5c080" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonBase} bg-[#0F2555] text-white disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        ← Prev
      </motion.button>

      {/* === Page Numbers === */}
      <div className="flex gap-3">
        {[...Array(totalPages)].map((_, i) => {
          const isActive = currentPage === i + 1;
          return (
            <motion.button
              key={i}
              whileHover={{
                scale: 1.15,
                textShadow: "0 0 8px #08e5c0",
                boxShadow: "0 0 15px #08e5c070",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(i + 1)}
              className={`${buttonBase} ${
                isActive
                  ? "bg-[#08e5c0] text-[#0B1C3D] shadow-[0_0_20px_#08e5c080]"
                  : "bg-[#0F2555] text-white hover:bg-[#142E63]"
              }`}
            >
              {i + 1}
              {isActive && (
                <motion.span
                  layoutId="activePageGlow"
                  className="absolute inset-0 rounded-md bg-[#08e5c020] blur-md"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* === Next Button === */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px #08e5c080" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonBase} bg-[#0F2555] text-white disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        Next →
      </motion.button>
    </div>
  );
};

export default BlogPagination;
