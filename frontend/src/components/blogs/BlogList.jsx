"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogCard from "./BlogCard";

const BlogList = ({ posts }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(query.toLowerCase()) ||
      post.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="relative bg-[#0B1C3D] py-20 overflow-hidden">

      {/* === Section Title === */}
      <h2 className="text-center text-3xl md:text-5xl font-bold text-white mb-12">
        Latest <span className="text-[#08e5c0]">Insights</span> & Articles
      </h2>

      {/* === Search Bar === */}
      <div className="flex justify-center mb-16">
        <div
          className={`
            flex items-center w-[90%] sm:w-[450px]
            bg-[#102a66]/80 backdrop-blur-md
            border rounded-full px-5 py-3
            transition-all duration-300
            ${isFocused
              ? "border-[#08e5c0] shadow-[0_0_20px_rgba(8,229,192,0.4)]"
              : "border-[#08e5c0]/40"}
          `}
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

          {/* Simple dot (no animation) */}
          {query && (
            <div className="w-2.5 h-2.5 rounded-full bg-[#08e5c0] ml-2" />
          )}
        </div>
      </div>

      {/* === Blog Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <BlogCard post={post} />
            </div>
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