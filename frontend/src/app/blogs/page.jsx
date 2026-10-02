import React from "react";
import BlogPageClient from "./BlogClient";
import StructuredData from "@/components/seo/StructuredData";
import { BASE_URL_USER } from "@/API";
import { fallbackBlogs } from "@/data/blogsFallback";

export const metadata = {
  title: "Zoho CRM & Automation Guides for Contractors | Insyrge",
  description:
    "Actionable guides on Zoho CRM setup, HOVER integrations, field workflow automation, and CRM best practices for construction and home service companies.",
  alternates: {
    canonical: "https://insyrge.com/blogs",
  },
  openGraph: {
    title: "Zoho CRM & Automation Guides for Contractors | Insyrge",
    description:
      "Actionable guides on Zoho CRM setup, HOVER integrations, field workflow automation, and CRM best practices for construction and home service companies.",
    url: "https://insyrge.com/blogs",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Insyrge Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoho CRM & Automation Guides for Contractors | Insyrge",
    description:
      "Explore actionable guides on Zoho CRM setup, HOVER integrations, and field workflow automation.",
    images: ["/logo.png"],
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Insyrge Business Automation & Zoho Blog",
  url: "https://insyrge.com/blogs",
  description:
    "Technical guides, automation tutorials, and architecture case studies on Zoho CRM for construction, roofing, and home services.",
  publisher: {
    "@type": "Organization",
    name: "Insyrge",
    url: "https://insyrge.com",
  },
};

import { unstable_cache } from "next/cache";

const getBlogs = unstable_cache(
  async () => {
    try {
      const res = await fetch(`${BASE_URL_USER}/blogs-all`, {
        cache: "no-store",
      });
      if (!res.ok) return fallbackBlogs;
      const json = await res.json();
      const list = json.data && json.data.length > 0 ? json.data : fallbackBlogs;
      // Strip large full-article description for the listing view so it caches cleanly and doesn't bloat HTML
      return list.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
        subTitle: blog.subTitle || "",
        shortDescription: blog.shortDescription || "",
        author: blog.author || "",
        category: blog.category || "",
        image: blog.image || null,
        createdAt: blog.createdAt,
      }));
    } catch (err) {
      console.error("Error fetching blogs, using fallback:", err);
      return fallbackBlogs;
    }
  },
  ["blogs-listing-clean"],
  { revalidate: 3600 }
);

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <StructuredData data={blogListSchema} />
      <BlogPageClient initialBlogs={blogs} />
    </>
  );
}
