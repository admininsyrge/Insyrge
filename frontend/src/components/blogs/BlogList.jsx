"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import BlogCard from "./BlogCard";

const BlogList = ({ posts }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // ✅ Filter posts by title or category
  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(query.toLowerCase()) ||
      post.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="relative bg-[#0B1C3D] py-20 overflow-hidden">
      {/* === Section Title === */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center text-3xl md:text-5xl font-bold text-white mb-12"
      >
        Latest <span className="text-[#08e5c0]">Insights</span> & Articles
      </motion.h2>

      {/* === Integrated Search Bar === */}
      <div className="flex justify-center mb-16">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 0 25px #08e5c0, 0 0 50px #08e5c055"
              : "0 0 10px rgba(255,255,255,0.15)",
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center w-[90%] sm:w-[450px] bg-[#102a66]/80 backdrop-blur-md border border-[#08e5c0]/50 rounded-full px-5 py-3 transition-all duration-300"
        >
          <FaSearch className="text-[#08e5c0] text-lg mr-3 opacity-80" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search insightful articles..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-base tracking-wide"
          />

          {/* Glow Dot Animation when typing */}
          <AnimatePresence>
            {query && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-3 h-3 rounded-full bg-[#08e5c0] shadow-[0_0_10px_#08e5c0] ml-2"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* === Blog Cards Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full text-lg">
            No blogs found matching your search.
          </p>
        )}
      </div>

      {/* === Bottom Glow === */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#08e5c033] to-transparent blur-2xl" />
    </section>
  );
};

export default BlogList;
