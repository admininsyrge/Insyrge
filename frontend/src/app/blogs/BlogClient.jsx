"use client";

import { useState } from "react";
import BlogList from "@/components/blogs/BlogList";
import BlogPagination from "@/components/blogs/BlogPagination";
import { useUser } from "@/context/UserContext";

export default function BlogPageClient({ initialBlogs = [] }) {
  const { blogs: contextBlogs } = useUser();
  const blogs =
    initialBlogs && initialBlogs.length > 0
      ? initialBlogs
      : contextBlogs || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Filter across all blogs
  const filteredBlogs = blogs.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title?.toLowerCase().includes(q) ||
      post.category?.toLowerCase().includes(q) ||
      post.shortDescription?.toLowerCase().includes(q) ||
      post.subTitle?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to page 1 on search
  };

  return (
    <main className="min-h-screen bg-[#0B1C3D] text-white py-16">
      {blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No blogs found.</div>
      ) : (
        <>
          <BlogList
            posts={currentPosts}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            totalMatches={filteredBlogs.length}
          />
          {totalPages > 1 && (
            <BlogPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalItems={filteredBlogs.length}
            />
          )}
        </>
      )}
    </main>
  );
}
