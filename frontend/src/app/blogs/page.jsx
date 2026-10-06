import React from "react";
import BlogPageClient from "./BlogClient";
import StructuredData from "@/components/seo/StructuredData";
import { BASE_URL_USER } from "@/API";
import { fallbackBlogs } from "@/data/blogsFallback";

export const metadata = {
  title: "Zoho CRM & Automation Guides for Contractors",
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

const blogBreadcrumbSchema = {
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
  ],
};


async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL_USER}/blogs-all`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackBlogs;
    const json = await res.json();
    const list = json.data && json.data.length > 0 ? json.data : fallbackBlogs;
    return list.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      subTitle: blog.subTitle || "",
      shortDescription: blog.shortDescription || "",
      author: blog.author || "",
      category: blog.category || "",
      image: blog.image?.url ? { url: blog.image.url } : { url: "/logo.png" },
      createdAt: blog.createdAt,
    }));
  } catch (err) {
    console.error("Error fetching blogs, using fallback:", err);
    return fallbackBlogs;
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <StructuredData data={[blogListSchema, blogBreadcrumbSchema]} />
      <BlogPageClient initialBlogs={blogs} />
    </>
  );
}

