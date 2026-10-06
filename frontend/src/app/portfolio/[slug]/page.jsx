import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";
import PortfolioDetails from "@/components/portfolio/PortfolioDetails";
import StructuredData from "@/components/seo/StructuredData";
import { portfolioFallback } from "@/data/portfolioFallback";

async function getProject(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/project/slug/${slug}`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return portfolioFallback.find((p) => p.slug === slug) || null;
    const result = await res.json();
    if ((result.status || result.success) && result.data) return result.data;
    return portfolioFallback.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error("Error fetching project, using fallback:", err);
    return portfolioFallback.find((p) => p.slug === slug) || null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested portfolio case study could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription =
    project.shortDescription ||
    (project.description
      ? project.description.replace(/<[^>]*>/g, "").slice(0, 160)
      : `Explore how Insyrge delivered successful enterprise transformation for ${project.title}.`);

  return {
    title: `${project.title} — Case Study`,
    description: cleanDescription,
    alternates: {
      canonical: `https://insyrge.com/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Insyrge Portfolio`,
      description: cleanDescription,
      url: `https://insyrge.com/portfolio/${slug}`,
      siteName: "Insyrge",
      type: "article",
      images: project.image?.url
        ? [
            {
              url: project.image.url,
              alt: project.title,
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
      title: `${project.title} | Insyrge`,
      description: cleanDescription,
      images: project.image?.url ? [project.image.url] : ["/logo.png"],
    },
  };
}

export default async function PortfolioSlugPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }


  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.shortDescription || project.description,
    image: project.image?.url,
    creator: {
      "@type": "Organization",
      name: "Insyrge",
      url: "https://insyrge.com",
    },
    url: `https://insyrge.com/portfolio/${slug}`,
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
        name: "Portfolio",
        item: "https://insyrge.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://insyrge.com/portfolio/${slug}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={[projectSchema, breadcrumbSchema]} />
      <PortfolioDetails project={project} />
    </>
  );
}
