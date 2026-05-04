"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogHighlights({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  // Show max 3 latest blogs
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="relative bg-[#0B1C3D] text-white py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[35%] h-[35%] bg-[#08e5c012] blur-[200px] rounded-full absolute top-10 right-[10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Knowledge Hub
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Stay ahead with our latest thoughts on technology, business, and Zoho.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {latestBlogs.map((blog, i) => (
            <Link key={blog._id} href={`/blogs/${blog.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass-card glass-card-hover overflow-hidden cursor-pointer h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-[180px] sm:h-[200px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={blog.image?.url || "https://placehold.net/default.png"}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E224B] via-transparent to-transparent opacity-60" />

                  {/* Category badge */}
                  {blog.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-[#08e5c0]/90 text-[#0B1C3D]">
                      {blog.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#08e5c0] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  {blog.shortDescription && (
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                      {blog.shortDescription}
                    </p>
                  )}

                  <span className="mt-auto text-[#08e5c0] text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#08e5c0] font-medium hover:gap-3 transition-all duration-300 group"
          >
            View All Articles
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
