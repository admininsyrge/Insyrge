import React from "react";
import ServicesClient from "./ServicesClient";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "Zoho CRM Consulting, Implementation & Business Automation Services",
  description:
    "Explore Insyrge's enterprise Zoho services: Zoho CRM implementation, Zoho One architecture, custom Deluge scripting, third-party API integrations, and AI workflow automation.",
  alternates: {
    canonical: "https://insyrge.com/services",
  },
  openGraph: {
    title: "Zoho CRM Consulting, Implementation & Business Automation Services | Insyrge",
    description:
      "Explore Insyrge's enterprise Zoho services: Zoho CRM implementation, Zoho One architecture, custom Deluge scripting, third-party API integrations, and AI workflow automation.",
    url: "https://insyrge.com/services",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Insyrge Zoho Services & Business Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoho CRM Consulting, Implementation & Business Automation | Insyrge",
    description:
      "Explore Insyrge's enterprise Zoho services: Zoho CRM implementation, Zoho One architecture, custom Deluge scripting, and AI workflow automation.",
    images: ["/logo.png"],
  },
};

const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Insyrge Zoho Consulting & Automation Services",
  url: "https://insyrge.com/services",
  description:
    "Enterprise Zoho CRM consulting, Zoho One architecture, Deluge scripting, REST API integrations, and AI business automation.",
  publisher: {
    "@type": "Organization",
    name: "Insyrge",
    url: "https://insyrge.com",
  },
};

const servicesBreadcrumbSchema = {
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
  ],
};

import { BASE_URL_USER } from "@/API";
import { coreServices as fallbackServices } from "@/data/servicesData";

async function getServices() {
  try {
    const res = await fetch(`${BASE_URL_USER}/services-all`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackServices;
    const json = await res.json();
    return json.data && json.data.length > 0 ? json.data : fallbackServices;
  } catch (err) {
    console.error("Error fetching services, using fallback:", err);
    return fallbackServices;
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <StructuredData data={[servicesListSchema, servicesBreadcrumbSchema]} />
      <ServicesClient initialServices={services} />
    </>
  );
}
