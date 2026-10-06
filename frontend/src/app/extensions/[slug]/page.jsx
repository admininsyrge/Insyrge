import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";
import ExtensionDetails from "@/components/extensions/ExtensionDetails";
import StructuredData from "@/components/seo/StructuredData";
import { fallbackExtensions } from "@/data/extensionsFallback";

async function getExtension(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/extension/slug/${slug}`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackExtensions.find((e) => e.slug === slug) || null;
    const result = await res.json();
    if (result.status && result.data) return result.data;
    return fallbackExtensions.find((e) => e.slug === slug) || null;
  } catch (err) {
    console.error("Error fetching extension, using fallback:", err);
    return fallbackExtensions.find((e) => e.slug === slug) || null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const extension = await getExtension(slug);

  if (!extension) {
    return {
      title: "Extension Not Found",
      description: "The requested Zoho extension could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription =
    extension.description ||
    extension.longDescription ||
    `Boost your Zoho CRM productivity with ${extension.title} by Insyrge.`;

  return {
    title: `${extension.title} — Zoho Extension`,
    description: cleanDescription.slice(0, 160),
    alternates: {
      canonical: `https://insyrge.com/extensions/${slug}`,
    },
    openGraph: {
      title: `${extension.title} — Zoho CRM Extension | Insyrge`,
      description: cleanDescription.slice(0, 160),
      url: `https://insyrge.com/extensions/${slug}`,
      siteName: "Insyrge",
      type: "website",
      images: extension.image?.url
        ? [
            {
              url: extension.image.url,
              alt: extension.title,
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
      title: `${extension.title} — Zoho Extension | Insyrge`,
      description: cleanDescription.slice(0, 160),
      images: extension.image?.url ? [extension.image.url] : ["/logo.png"],
    },
  };
}

export default async function ExtensionSlugPage({ params }) {
  const { slug } = await params;
  const extension = await getExtension(slug);

  if (!extension) {
    notFound();
  }


  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: extension.title,
    operatingSystem: "Zoho CRM, Zoho One",
    applicationCategory: "BusinessApplication",
    description: extension.description || extension.longDescription,
    image: extension.image?.url || "https://insyrge.com/logo.png",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: "Insyrge",
      url: "https://insyrge.com",
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
        name: "Extensions",
        item: "https://insyrge.com/extensions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: extension.title,
        item: `https://insyrge.com/extensions/${slug}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={[appSchema, breadcrumbSchema]} />
      <ExtensionDetails extension={extension} />
    </>
  );
}
