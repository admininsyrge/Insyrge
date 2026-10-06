import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";
import StructuredData from "@/components/seo/StructuredData";
import { fallbackBlogs } from "@/data/blogsFallback";

async function getBlogPost(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/blog/slug/${slug}`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackBlogs.find((b) => b.slug === slug) || null;
    const result = await res.json();
    if (result.status && result.data) return result.data;
    return fallbackBlogs.find((b) => b.slug === slug) || null;
  } catch (err) {
    console.error("Error fetching blog, using fallback:", err);
    return fallbackBlogs.find((b) => b.slug === slug) || null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription =
    post.shortDescription ||
    post.subTitle ||
    (post.description
      ? post.description.replace(/<[^>]*>/g, "").slice(0, 160)
      : "Read insightful guides on Zoho CRM, business automation, and enterprise technology by Insyrge.");

  return {
    title: post.title,
    description: cleanDescription,
    alternates: {
      canonical: `https://insyrge.com/blogs/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Insyrge Blog`,
      description: cleanDescription,
      url: `https://insyrge.com/blogs/${slug}`,
      siteName: "Insyrge",
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author || "Insyrge Team"],
      images: post.image?.url
        ? [
            {
              url: post.image.url,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/logo.png",
              alt: "Insyrge",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Insyrge Blog`,
      description: cleanDescription,
      images: post.image?.url ? [post.image.url] : ["/logo.png"],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }


  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.shortDescription || post.subTitle,
    image: post.image?.url || "https://insyrge.com/logo.png",
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      "@type": "Person",
      name: post.author || "Insyrge Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Insyrge",
      logo: {
        "@type": "ImageObject",
        url: "https://insyrge.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://insyrge.com/blogs/${slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://insyrge.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://insyrge.com/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://insyrge.com/blogs/${slug}`,
      },
    ],
  };

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <StructuredData data={[blogSchema, breadcrumbSchema]} />

      <div className="min-h-screen bg-[#0B1C3D] text-white px-5 md:px-20 py-16 md:py-24">
        {/* === Breadcrumbs / Back Navigation === */}
        <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#08e5c0] hover:underline text-sm font-medium"
          >
            ← Back to All Articles
          </Link>
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {post.category || "Technology"}
          </span>
        </div>

        {/* === Article Header === */}
        <article className="max-w-4xl mx-auto">
          <header className="flex flex-col items-start md:items-center text-left md:text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            {post.subTitle && (
              <p className="text-lg text-gray-400 italic mb-3">
                {post.subTitle}
              </p>
            )}
            <div className="text-sm text-gray-400 flex flex-wrap items-center gap-2 mt-2">
              {formattedDate && <time dateTime={post.createdAt}>{formattedDate}</time>}
              <span>•</span>
              <span className="text-[#08e5c0] font-medium">{post.author || "Insyrge Team"}</span>
            </div>
          </header>

          {/* === Blog Image === */}
          {post.image?.url && (
            <div className="relative w-full max-w-5xl mx-auto h-72 md:h-[480px] rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/10">
              <Image
                src={post.image.url}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C3D]/70 to-transparent" />
            </div>
          )}

          {/* === Short Description / Lead Paragraph === */}
          {post.shortDescription && (
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed font-light border-l-4 border-[#08e5c0] pl-4 italic">
              {post.shortDescription}
            </p>
          )}

          {/* === Main Content === */}
          {post.description && (
            <div
              className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
          )}

          {/* === Bottom CTA === */}
          <section className="mt-16 pt-10 border-t border-white/10 text-center">
            <h2 className="text-2xl font-bold mb-3">Need Help Implementing This in Your Business?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-6">
              Our certified Zoho consultants and automation experts can help you design and deploy custom workflows tailored to your operations.
            </p>
            <a
              href="https://insyrge.zohobookings.com/#/4623360000000149002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-full bg-[#08e5c0] text-[#0B1C3D] font-semibold hover:shadow-[0_0_30px_#08e5c060] transition-all"
            >
              Book Free Consultation
            </a>
          </section>
        </article>
      </div>
    </>
  );
}

