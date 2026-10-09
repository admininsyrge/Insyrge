import React from "react";
import PortfolioClient from "./PortfolioClient";
import StructuredData from "@/components/seo/StructuredData";
import { BASE_URL_USER } from "@/API";
import { portfolioFallback } from "@/data/portfolioFallback";

export const metadata = {
  title: "Case Studies & Client Success Stories",
  description:
    "Explore Insyrge's verified portfolio of enterprise Zoho implementations, SaaS operations platforms, BI dashboards, and automated CRM workflows.",
  alternates: {
    canonical: "https://insyrge.com/portfolio",
  },
  openGraph: {
    title: "Case Studies & Client Success Stories | Insyrge",
    description:
      "Explore Insyrge's verified portfolio of enterprise Zoho implementations, SaaS operations platforms, BI dashboards, and automated CRM workflows.",
    url: "https://insyrge.com/portfolio",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Insyrge Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Client Success Stories | Insyrge",
    description:
      "Explore Insyrge's verified portfolio of enterprise Zoho implementations and automated CRM workflows.",
    images: ["/logo.png"],
  },
};

async function getProjects() {
  try {
    const res = await fetch(`${BASE_URL_USER}/project-all`, {
      signal: AbortSignal.timeout(1800),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return portfolioFallback;
    const json = await res.json();
    return json?.data?.length > 0 ? json.data : portfolioFallback;
  } catch (err) {
    console.error("Server fetch projects error, using fallback:", err);
    return portfolioFallback;
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  const portfolioCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Insyrge Portfolio & Case Studies",
    url: "https://insyrge.com/portfolio",
    description:
      "Client success stories, business transformation projects, and enterprise software implementations delivered by Insyrge.",
    publisher: {
      "@type": "Organization",
      name: "Insyrge",
      url: "https://insyrge.com",
    },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      headline: p.title,
      url: `https://insyrge.com/portfolio/${p.slug}`,
      description: p.category,
    })),
  };

  const portfolioBreadcrumbSchema = {
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
    ],
  };

  return (
    <>
      <StructuredData data={[portfolioCollectionSchema, portfolioBreadcrumbSchema]} />
      <PortfolioClient initialProjects={projects} />
    </>
  );
}

