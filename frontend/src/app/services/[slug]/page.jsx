import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";
import ServiceDetails from "@/components/services/ServiceDetails";
import StructuredData from "@/components/seo/StructuredData";

async function getService(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/service/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.status ? result.data : null;
  } catch (err) {
    console.error("Error fetching service for SEO:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription = service.description
    ? service.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : `Expert ${service.title} by Insyrge. Streamline operations and enhance CRM productivity.`;

  return {
    title: `${service.title} — Zoho Services`,
    description: cleanDescription,
    alternates: {
      canonical: `https://insyrge.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Insyrge`,
      description: cleanDescription,
      url: `https://insyrge.com/services/${slug}`,
      siteName: "Insyrge",
      images: service.image?.url
        ? [
            {
              url: service.image.url,
              alt: service.title,
            },
          ]
        : [
            {
              url: "/logo.png",
              alt: "Insyrge",
            },
          ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Insyrge`,
      description: cleanDescription,
      images: service.image?.url ? [service.image.url] : ["/logo.png"],
    },
  };
}

export default async function ServicesSlugPage({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }


  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: "Zoho Consulting and Business Automation",
    provider: {
      "@type": "Organization",
      name: "Insyrge",
      url: "https://insyrge.com",
    },
    description: service.description
      ? service.description.replace(/<[^>]*>/g, "").slice(0, 300)
      : undefined,
    image: service.image?.url,
    url: `https://insyrge.com/services/${slug}`,
    hasOfferCatalog: service.points?.length
      ? {
          "@type": "OfferCatalog",
          name: `${service.title} Deliverables`,
          itemListElement: service.points.map((point, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: point,
            },
            position: index + 1,
          })),
        }
      : undefined,
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
        name: "Services",
        item: "https://insyrge.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://insyrge.com/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={[serviceSchema, breadcrumbSchema]} />
      <ServiceDetails service={service} />
    </>
  );
}
