"use client";
import { BASE_URL } from "@/API";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }) => (
  <Link href={`/blogs/${post.slug}`}>
    <div className="relative flex flex-col bg-[#0E1E44]/90 backdrop-blur-xl rounded-2xl border border-[#08e5c0]/20 overflow-hidden group h-full cursor-pointer">
      {/* === Image Section === */}
      <div className="relative w-full h-52 overflow-hidden shrink-0">
        <Image
          src={`${BASE_URL}/uploads/${post.image}`}
          alt={post.title}
          fill
          className="object-cover"
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-[#08e5c0]/20 border border-[#08e5c0]/40 text-[#08e5c0] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
          {post.category}
        </div>

        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/90 via-transparent to-transparent opacity-70" />
      </div>

      {/* === Text Section === */}
      <div className="flex flex-col justify-between flex-grow p-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-white line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            {new Date(post.createdAt).toLocaleDateString()} • {post.author}
          </p>
          <p className="text-sm text-gray-400 mb-3">• {post.subTitle}</p>

          <p className="text-gray-300 mb-5 leading-relaxed line-clamp-3">
            {post.shortDescription}
          </p>
        </div>

        <button className="text-[#08e5c0] font-semibold flex items-center gap-1 mt-4">
          Read More →
        </button>
      </div>

      {/* === Bottom Glow === */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0] to-transparent opacity-50" />
    </div>
  </Link>
);

export default BlogCard;
