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

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <main className="min-h-screen bg-[#0B1C3D] text-white py-16">
      {blogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No blogs found.</div>
      ) : (
        <>
          <BlogList posts={currentPosts} />
          {totalPages > 1 && (
            <BlogPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
}
