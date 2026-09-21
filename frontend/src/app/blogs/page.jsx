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

async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL_USER}/blogs-all`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackBlogs;
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : fallbackBlogs;
  } catch (err) {
    console.error("Error fetching blogs, using fallback:", err);
    return fallbackBlogs;
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <StructuredData data={blogListSchema} />
      <BlogPageClient initialBlogs={blogs} />
    </>
  );
}
