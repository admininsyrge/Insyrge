"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogCard from "./BlogCard";

const BlogList = ({
  posts,
  searchQuery: externalQuery,
  onSearchChange,
  totalMatches,
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = typeof onSearchChange === "function";
  const query = isControlled ? (externalQuery ?? "") : internalQuery;

  const handleQueryChange = (val) => {
    if (isControlled) {
      onSearchChange(val);
    } else {
      setInternalQuery(val);
    }
  };

  // If controlled, BlogClient already filtered the posts. If uncontrolled, filter locally.
  const displayPosts = isControlled
    ? posts
    : posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(query.toLowerCase()) ||
          post.category?.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <section className="relative bg-[#0B1C3D] py-12 overflow-hidden">
      {/* === Page Main Heading === */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
          Knowledge Base &amp; Insights
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Latest <span className="text-[#08e5c0]">Insights</span> &amp; Guides
        </h1>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          Actionable architecture guides, Zoho CRM tutorials, integration walkthroughs, and field automation best practices by Insyrge engineers.
        </p>
      </div>

      {/* === Search Bar === */}
      <div className="flex justify-center mb-16">
        <div
          className={`
            flex items-center w-[90%] sm:w-[480px]
            bg-[#102a66]/80 backdrop-blur-md
            border rounded-full px-5 py-3
            transition-all duration-300
            ${isFocused
              ? "border-[#08e5c0] shadow-[0_0_20px_rgba(8,229,192,0.4)]"
              : "border-[#08e5c0]/40"}
          `}
        >
          <FaSearch className="text-[#08e5c0] text-lg mr-3 opacity-80" aria-hidden="true" />

          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search topics, Zoho modules, or workflows..."
            aria-label="Search articles and guides"
            className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-base tracking-wide"
          />


          {/* Simple dot (no animation) */}
          {query && (
            <button
              onClick={() => handleQueryChange("")}
              title="Clear search"
              className="text-gray-400 hover:text-white text-xs px-2 py-0.5 rounded-full bg-white/10"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* === Blog Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-16">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => (
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