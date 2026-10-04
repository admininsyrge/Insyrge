import React from "react";
import ContactClient from "./ContactClient";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "Contact Us & Book Consultation",
  description:
    "Get in touch with Insyrge's certified Zoho specialists and automation consultants. Book a free consultation or inquire about custom development services.",
  alternates: {
    canonical: "https://insyrge.com/contact",
  },
  openGraph: {
    title: "Contact Us & Book Consultation | Insyrge",
    description:
      "Get in touch with Insyrge's certified Zoho specialists and automation consultants. Book a free consultation or inquire about custom development services.",
    url: "https://insyrge.com/contact",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Insyrge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Insyrge",
    description:
      "Get in touch with Insyrge for expert guidance in business automation and Zoho integration.",
    images: ["/logo.png"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Insyrge",
  url: "https://insyrge.com/contact",
  description:
    "Get in touch with Insyrge's certified Zoho specialists and automation consultants. Book a free consultation or inquire about custom development services.",
  mainEntity: {
    "@type": "Organization",
    name: "Insyrge",
    telephone: "+91-7973837217",
    email: "info@insyrge.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 40, 8–10 Fourth Avenue",
      addressLocality: "Blacktown",
      addressRegion: "NSW",
      postalCode: "2148",
      addressCountry: "AU",
    },
  },
};

const contactBreadcrumbSchema = {
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
      name: "Contact Us",
      item: "https://insyrge.com/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <StructuredData data={[contactSchema, contactBreadcrumbSchema]} />
      <ContactClient />
    </>
  );
}

