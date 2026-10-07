import React from "react";
import ContactClient from "./ContactClient";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "Book a Zoho CRM & Automation Consultation",
  description:
    "Schedule a free 45-minute architectural consultation with certified Zoho specialists. We review your workflows, CRM bottlenecks, and integration requirements within 2 business hours.",
  alternates: {
    canonical: "https://insyrge.com/contact",
  },
  openGraph: {
    title: "Book a Zoho CRM & Automation Consultation | Insyrge",
    description:
      "Schedule a free 45-minute architectural consultation with certified Zoho specialists. We review your workflows, CRM bottlenecks, and integration requirements within 2 business hours.",
    url: "https://insyrge.com/contact",
    siteName: "Insyrge",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Contact Insyrge Solutions Architects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Zoho CRM & Automation Consultation | Insyrge",
    description:
      "Schedule a free 45-minute architectural consultation with certified Zoho specialists. Fast 2-hour response time.",
    images: ["/logo.png"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Insyrge Solutions Architects",
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
