import React from "react";
import { BASE_URL_USER } from "@/API";
import StructuredData from "@/components/seo/StructuredData";
import HeroHome from "@/components/home/HeroHome";
import StatsSection from "@/components/home/StatsSection";
import PainPointsSection from "@/components/home/PainPointsSection";
import HomeServices from "@/components/home/HomeServices";
import IntegrationsShowcase from "@/components/home/IntegrationsShowcase";
import IndustrySolutionsSection from "@/components/home/IndustrySolutionsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import AITransformationSection from "@/components/home/AITransformationSection";
import ProcessTimelineSection from "@/components/home/ProcessTimelineSection";
import CaseStudies from "@/components/home/CaseStudies";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FounderTrustSection from "@/components/home/FounderTrustSection";
import FeaturedExtensions from "@/components/home/FeaturedExtensions";
import HomeFAQSection from "@/components/home/HomeFAQSection";
import ContactSection from "@/components/home/ContactSection";
import PartnerSection from "@/components/home/PartnerSection";
import BlogHighlights from "@/components/home/BlogHighlights";
import { homeFaqs } from "@/data/homeFaqs";

export const metadata = {
  title: "Zoho CRM & Business Automation for Construction and Home Services",
  description:
    "Insyrge helps construction, roofing and home service businesses implement, customize and automate Zoho — connecting CRM, operations, estimating, documents and customer workflows into one scalable system.",
  alternates: {
    canonical: "https://insyrge.com",
  },
  openGraph: {
    title: "Zoho CRM & Business Automation for Construction and Home Service Companies | Insyrge",
    description:
      "Insyrge helps construction, roofing and home service businesses implement, customize and automate Zoho — connecting CRM, operations, estimating, documents and customer workflows into one scalable system.",
    url: "https://insyrge.com",
    siteName: "Insyrge",
    images: [
      {
        url: "/images/hero-automation-dashboard.jpg",
        width: 1200,
        height: 675,
        alt: "Insyrge - Zoho CRM & Business Automation for Construction & Home Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoho CRM & Business Automation for Construction and Home Service Companies | Insyrge",
    description:
      "Insyrge helps construction, roofing and home service businesses implement, customize and automate Zoho CRM, Zoho One, and contractor integrations.",
    images: ["/images/hero-automation-dashboard.jpg"],
  },
};


const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://insyrge.com/#organization",
  name: "Insyrge",
  legalName: "Insyrge Pty Ltd",
  alternateName: [
    "Insyrge Zoho Consulting",
    "Insyrge Business Automation",
    "Insyrge IT Solutions",
  ],
  url: "https://insyrge.com",
  logo: "https://insyrge.com/logo.png",
  image: "https://insyrge.com/images/hero-automation-dashboard.jpg",
  description:
    "Certified Zoho Consulting Partner delivering enterprise Zoho CRM and Zoho One implementations, Deluge scripting, third-party API integrations, and AI workflow automation.",
  telephone: "+91-7973837217",
  email: "contact@insyrge.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 40, 8–10 Fourth Avenue",
    addressLocality: "Blacktown",
    addressRegion: "NSW",
    postalCode: "2148",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.7712,
    longitude: 150.9063,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  knowsAbout: [
    "Zoho CRM Implementation",
    "Zoho One Architecture",
    "Custom Deluge Development",
    "REST API Integrations",
    "Zoho Creator Applications",
    "AI Workflow Automation",
    "Zoho Books & Finance Sync",
    "Zoho Marketplace Extensions",
    "Intelligent Document Processing OCR",
  ],
  sameAs: [
    "https://www.linkedin.com/company/insyrge",
  ],
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Zoho CRM Implementation & Optimization",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Certified Zoho CRM consulting, pipeline customization, lead scoring, automated quoting, and executive dashboards.",
      serviceType: "CRM Consulting",
    },
    {
      "@type": "Service",
      position: 2,
      name: "Zoho One Enterprise Setup & Architecture",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Full-scale Zoho One deployment unifying 45+ enterprise applications without operational data silos.",
      serviceType: "Enterprise Software Implementation",
    },
    {
      "@type": "Service",
      position: 3,
      name: "Custom Zoho Development & Deluge Scripting",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Advanced Deluge algorithms, custom CRM widgets, Client Scripts, and serverless workflow triggers.",
      serviceType: "Software Engineering",
    },
    {
      "@type": "Service",
      position: 4,
      name: "Zoho API & Third-Party Integrations",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Bi-directional REST API and webhook integrations connecting Zoho with Stripe, QuickBooks, Shopify, and legacy ERPs.",
      serviceType: "API Integration",
    },
    {
      "@type": "Service",
      position: 5,
      name: "AI Business Automation & Intelligent Agents",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Autonomous AI lead qualification agents, Zia OCR document processing, and predictive CRM analytics.",
      serviceType: "AI Automation",
    },
  ],
};

import { fallbackExtensions } from "@/data/extensionsFallback";
import { fallbackBlogs } from "@/data/blogsFallback";

const fallbackPartners = [
  { image: { url: "https://res.cloudinary.com/dwkoijsad/image/upload/v1776269745/home/partners/dy19qbc6iourgdtwwvmm.png" } },
  { image: { url: "https://res.cloudinary.com/dwkoijsad/image/upload/v1776269747/home/partners/bjypmglz8tclwlrxwweh.png" } },
  { image: { url: "https://res.cloudinary.com/dwkoijsad/image/upload/v1776269749/home/partners/tcptqh47nkiz3jobo9fj.png" } },
  { image: { url: "https://res.cloudinary.com/dwkoijsad/image/upload/v1776269751/home/partners/ex18vadh1hlib6uar74j.png" } },
  { image: { url: "https://res.cloudinary.com/dwkoijsad/image/upload/v1776365280/home/partners/iye6gwyumo1ojwmlrrsf.png" } },
];

async function getHomeData() {
  try {
    const res = await fetch(`${BASE_URL_USER}/home`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { hero: null, partners: fallbackPartners };
    const json = await res.json();
    if (!json?.data) return { hero: null, partners: fallbackPartners };
    return {
      hero: json.data.hero || null,
      partners: json.data.partners?.length > 0 ? json.data.partners : fallbackPartners,
    };
  } catch (e) {
    console.error("Failed to fetch home data, using fallback:", e);
    return { hero: null, partners: fallbackPartners };
  }
}

async function getExtensions() {
  try {
    const res = await fetch(`${BASE_URL_USER}/extension-all`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    const list = res.ok ? (await res.json())?.data || [] : [];
    const source = list.length > 0 ? list : fallbackExtensions;
    return source.slice(0, 4).map((ext) => ({
      _id: ext._id,
      title: ext.title,
      slug: ext.slug,
      description: ext.description || "",
      image: { url: ext.image?.url || "/logo.png" },
    }));
  } catch (e) {
    console.error("Failed to fetch extensions, using fallback:", e);
    return fallbackExtensions.slice(0, 4).map((ext) => ({
      _id: ext._id,
      title: ext.title,
      slug: ext.slug,
      description: ext.description || "",
      image: { url: ext.image?.url || "/logo.png" },
    }));
  }
}

async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL_USER}/blogs-all`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    const list = res.ok ? (await res.json())?.data || [] : [];
    const source = list.length > 0 ? list : fallbackBlogs;
    return source.slice(0, 3).map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      shortDescription: blog.shortDescription || "",
      category: blog.category || "",
      image: { url: blog.image?.url || "/logo.png" },
    }));
  } catch (e) {
    console.error("Failed to fetch blogs, using fallback:", e);
    return fallbackBlogs.slice(0, 3).map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      shortDescription: blog.shortDescription || "",
      category: blog.category || "",
      image: { url: blog.image?.url || "/logo.png" },
    }));
  }
}

export default async function Home() {
  const [homeData, extensions, blogs] = await Promise.all([
    getHomeData(),
    getExtensions(),
    getBlogs(),
  ]);

  return (
    <>
      {/* ⚡ High-Authority Technical SEO Schemas for AI & Search Crawlers */}
      <StructuredData
        data={[homeFaqSchema, professionalServiceSchema, servicesSchema]}
      />

      {/* 1. 🚀 HERO SECTION: High-impact 2-column value proposition, dual CTAs & 3D custom dashboard */}
      <HeroHome data={homeData?.hero} />

      {/* 2. 🏆 TRUSTED BY BUSINESSES & STATS TICKER: Proof metrics & Zoho ecosystem integrations */}
      <StatsSection />

      {/* 3. ⚠️ BUSINESS PROBLEMS WE SOLVE: Pain points comparison with Insyrge solutions */}
      <PainPointsSection />

      {/* 4. ⚙️ SERVICES SECTION: Dedicated SEO-rich cards for Zoho CRM, Zoho One, Deluge, APIs, AI */}
      <HomeServices />

      {/* 5. 🔌 CONTRACTOR INTEGRATIONS SHOWCASE: HOVER, CompanyCam, DocuSign, SummaQuote, Accounting */}
      <IntegrationsShowcase />

      {/* 6. 🏢 INDUSTRY SOLUTIONS: Interactive workflows for Roofing, Construction, Home Services, etc. */}
      <IndustrySolutionsSection />

      {/* 7. 💎 WHY CHOOSE INSYRGE: 6 enterprise value pillars, SLAs, and security standards */}
      <WhyChooseSection />

      {/* 8. 🤖 AI-POWERED BUSINESS TRANSFORMATION: AI agents, OCR document intelligence, predictive workflows */}
      <AITransformationSection />

      {/* 9. 🗺️ PROCESS ROADMAP: The proven delivery engine from discovery to continuous support */}
      <ProcessTimelineSection />

      {/* 10. 📈 CASE STUDIES: Authentic Insyrge portfolio case studies & HOVER contractor case study */}
      <CaseStudies />

      {/* 11. ⭐ VERIFIED PROOF: Live Zoho Marketplace extensions and direct marketplace links */}
      <TestimonialsSection />

      {/* 12. 🛡️ FOUNDER & TRUST PILLAR: Manav Sharma, Bilateral NDA, 100% Client Code & IP Ownership */}
      <FounderTrustSection />

      {/* 13. 🧩 FEATURED EXTENSIONS: Proprietary marketplace extensions & integrations */}
      {extensions?.length > 0 && <FeaturedExtensions extensions={extensions} />}

      {/* 14. 🤝 PARTNER SECTION: Official partner networks & technology alliances */}
      {homeData?.partners && <PartnerSection data={homeData.partners} />}

      {/* 15. ❓ FAQ SECTION: 16 Schema-ready FAQs with instant search & category filtering */}
      <HomeFAQSection />

      {/* 16. ✍️ RECENT INSIGHTS: High-authority technical articles & guides */}
      {blogs?.length > 0 && <BlogHighlights blogs={blogs} />}

      {/* 17. 🎯 FINAL LEAD CAPTURE SECTION: Discovery booking, embedded Zoho form & deliverables */}
      <ContactSection />
    </>
  );
}