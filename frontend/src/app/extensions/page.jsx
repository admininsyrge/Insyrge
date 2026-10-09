import React from "react";
import ExtensionsClient from "./ExtensionsClient";
import StructuredData from "@/components/seo/StructuredData";
import { BASE_URL_USER, GET_EXTENSION } from "@/API";
import { fallbackExtensions } from "@/data/extensionsFallback";

export const metadata = {
  title: "Zoho CRM Extensions & Marketplace Addons",
  description:
    "Supercharge your CRM workflows with official Zoho Marketplace Extensions by Insyrge. Explore Hover integration, Google Address Autocomplete, Timeline Pro, Contact Roles, and PDF export tools.",
  alternates: {
    canonical: "https://insyrge.com/extensions",
  },
  openGraph: {
    title: "Zoho CRM Extensions & Marketplace Addons | Insyrge",
    description:
      "Supercharge your CRM workflows with official Zoho Marketplace Extensions by Insyrge. Explore Hover integration, Google Address Autocomplete, Timeline Pro, Contact Roles, and PDF export tools.",
    url: "https://insyrge.com/extensions",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Insyrge Zoho Extensions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoho CRM Extensions & Marketplace Addons | Insyrge",
    description:
      "Explore our range of powerful Zoho Extensions — custom-built solutions to enhance business workflows.",
    images: ["/logo.png"],
  },
};

const extensionsCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Zoho CRM Extensions by Insyrge",
  url: "https://insyrge.com/extensions",
  description:
    "Catalog of high-impact Zoho Marketplace extensions and private workflow plugins built by Insyrge.",
  publisher: {
    "@type": "Organization",
    name: "Insyrge",
    url: "https://insyrge.com",
  },
};

const extensionsBreadcrumbSchema = {
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
  ],
};

async function getExtensions() {
  try {
    const res = await fetch(`${BASE_URL_USER}${GET_EXTENSION}`, {
      signal: AbortSignal.timeout(1800),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackExtensions;
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : fallbackExtensions;
  } catch (err) {
    console.error("Error fetching extensions, using fallback:", err);
    return fallbackExtensions;
  }
}

export default async function ExtensionsPage() {
  const extensions = await getExtensions();

  return (
    <>
      <StructuredData data={[extensionsCollectionSchema, extensionsBreadcrumbSchema]} />
      <ExtensionsClient initialExtensions={extensions} />
    </>
  );
}

