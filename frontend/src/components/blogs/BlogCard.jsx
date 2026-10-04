"use client";
import { BASE_URL } from "@/API";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }) => {
  const imageUrl = post.image?.url || "/logo.png";

  return (
    <Link href={`/blogs/${post.slug}`} aria-label={`Read article: ${post.title}`}>
      <div className="relative flex flex-col bg-[#0E1E44]/90 backdrop-blur-xl rounded-2xl border border-[#08e5c0]/20 overflow-hidden group h-full cursor-pointer">
        {/* === Image Section === */}
        <div className="relative w-full h-52 overflow-hidden shrink-0">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Category Tag */}
          {post.category && (
            <div className="absolute top-3 left-3 bg-[#08e5c0]/20 border border-[#08e5c0]/40 text-[#08e5c0] text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
              {post.category}
            </div>
          )}

          {/* Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/90 via-transparent to-transparent opacity-70" />
        </div>

        {/* === Text Section === */}
        <div className="flex flex-col justify-between flex-grow p-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-[#08e5c0] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
              {post.author ? ` • ${post.author}` : ""}
            </p>
            {post.subTitle && <p className="text-sm text-gray-400 mb-3 italic">• {post.subTitle}</p>}

            {post.shortDescription && (
              <p className="text-gray-300 mb-5 leading-relaxed line-clamp-3 text-sm">
                {post.shortDescription}
              </p>
            )}
          </div>

          <span className="text-[#08e5c0] font-semibold inline-flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform text-sm">
            Read More →
          </span>
        </div>

        {/* === Bottom Glow === */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0] to-transparent opacity-50" />
      </div>
    </Link>
  );
};


export default BlogCard;
