import React from "react";
import Link from "next/link";
import { BASE_URL_USER } from "@/API";
import PortfolioDetails from "@/components/portfolio/PortfolioDetails";
import StructuredData from "@/components/seo/StructuredData";

async function getProject(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/project/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.status || result.success ? result.data : null;
  } catch (err) {
    console.error("Error fetching project for SEO:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Insyrge",
      description: "The requested portfolio case study could not be found.",
    };
  }

  const cleanDescription =
    project.shortDescription ||
    (project.description
      ? project.description.replace(/<[^>]*>/g, "").slice(0, 160)
      : `Explore how Insyrge delivered successful enterprise transformation for ${project.title}.`);

  return {
    title: `${project.title} - Case Study`,
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
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0B1C3D] text-white px-6">
        <h1 className="text-3xl font-bold text-[#08e5c0] mb-4">
          Project Not Found ⚡
        </h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">
          The case study you are looking for is unavailable or has been archived.
        </p>
        <Link
          href="/portfolio"
          className="inline-block px-8 py-3 rounded-full bg-[#08e5c0] text-[#0B1C3D] font-semibold hover:shadow-[0_0_30px_#08e5c060] transition-all"
        >
          ← Explore All Projects
        </Link>
      </main>
    );
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
