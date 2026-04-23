"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { BASE_URL, BASE_URL_USER } from "@/API";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch blog by slug
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL_USER}/blog/slug/${slug}`);
        setPost(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white text-xl">
        Loading blog...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white text-2xl">
        {error || "Blog not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1C3D] text-white px-5 md:px-20 py-16 md:py-24">
      {/* === Back Button === */}
      <Link
        href="/blogs"
        className="inline-block mb-10 text-[#08e5c0] hover:underline"
      >
        ← Back to Blogs
      </Link>

      {/* === Blog Header === */}
      <div className="flex flex-col items-start md:items-center text-center md:text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl">
          {post.title}
        </h1>
        {post.subTitle && (
          <p className="text-lg text-gray-400 italic mb-3">{post.subTitle}</p>
        )}
        <div className="text-sm text-gray-400">
          {new Date(post.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {post.category || "General"} • by{" "}
          <span className="text-[#08e5c0]">{post.author}</span>
        </div>
      </div>

      {/* === Blog Image === */}
      {post.image && (
        <div className="relative w-full max-w-5xl mx-auto h-72 md:h-[480px] rounded-2xl overflow-hidden mb-12">
          <Image
            src={post.image.url}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/70 to-transparent" />
        </div>
      )}

      {/* === Short Description === */}
      {post.shortDescription && (
        <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-10 text-center leading-relaxed">
          {post.shortDescription}
        </p>
      )}

      {/* === Main Content === */}
      <div
        className="prose prose-invert max-w-4xl mx-auto text-gray-300 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{ __html: post.description }}
      />
    </div>
  );
}
