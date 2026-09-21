import React from "react";
import ServicesClient from "./ServicesClient";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "IT Consulting, Custom Software & Enterprise Services",
  description:
    "Explore Insyrge's suite of enterprise IT services: strategic technology consulting, custom web/mobile app engineering, cloud architecture, AI automation, and CRM integrations.",
  alternates: {
    canonical: "https://insyrge.com/services",
  },
  openGraph: {
    title: "IT Consulting, Custom Software & Enterprise Services | Insyrge",
    description:
      "Explore Insyrge's suite of enterprise IT services: strategic technology consulting, custom web/mobile app engineering, cloud architecture, AI automation, and CRM integrations.",
    url: "https://insyrge.com/services",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Insyrge IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Consulting, Custom Software & Enterprise Services | Insyrge",
    description:
      "Discover Insyrge's comprehensive range of enterprise IT consultancy, custom software development, and cloud solutions.",
    images: ["/logo.png"],
  },
};

const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Insyrge Enterprise IT Services",
  url: "https://insyrge.com/services",
  description:
    "Comprehensive enterprise technology services including strategic IT consulting, custom software development, cloud engineering, and business automation.",
  publisher: {
    "@type": "Organization",
    name: "Insyrge",
    url: "https://insyrge.com",
  },
};

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={servicesListSchema} />
      <ServicesClient />
    </>
  );
}
