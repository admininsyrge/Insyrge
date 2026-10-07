import React from "react";
import dynamic from "next/dynamic";
import { BASE_URL_USER } from "@/API";
import StructuredData from "@/components/seo/StructuredData";
import HeroHome from "@/components/home/HeroHome";
import StatsSection from "@/components/home/StatsSection";

// 🚀 Performance Optimization: Below-the-fold sections are dynamically loaded
// SSR: true ensures 100% SEO, metadata, and crawlability are preserved.
const PainPointsSection = dynamic(() => import("@/components/home/PainPointsSection"), { ssr: true });
const HomeServices = dynamic(() => import("@/components/home/HomeServices"), { ssr: true });
const IntegrationsShowcase = dynamic(() => import("@/components/home/IntegrationsShowcase"), { ssr: true });
const IndustrySolutionsSection = dynamic(() => import("@/components/home/IndustrySolutionsSection"), { ssr: true });
const WhyChooseSection = dynamic(() => import("@/components/home/WhyChooseSection"), { ssr: true });
const AITransformationSection = dynamic(() => import("@/components/home/AITransformationSection"), { ssr: true });
const ProcessTimelineSection = dynamic(() => import("@/components/home/ProcessTimelineSection"), { ssr: true });
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"), { ssr: true });
const FounderTrustSection = dynamic(() => import("@/components/home/FounderTrustSection"), { ssr: true });
const FeaturedExtensions = dynamic(() => import("@/components/home/FeaturedExtensions"), { ssr: true });
const PartnerSection = dynamic(() => import("@/components/home/PartnerSection"), { ssr: true });
const HomeFAQSection = dynamic(() => import("@/components/home/HomeFAQSection"), { ssr: true });
const BlogHighlights = dynamic(() => import("@/components/home/BlogHighlights"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/home/ContactSection"), { ssr: true });

import { homeFaqs } from "@/data/homeFaqs";

export const metadata = {
  title: "Zoho CRM Consultant & Business Automation Services",
  description:
    "Certified Zoho consulting partners and solutions architects. We implement, customize, and automate Zoho CRM, Zoho One, Deluge workflows, and AI systems to eliminate manual work and accelerate business growth.",
  keywords: [
    "Zoho CRM consultant",
    "Zoho CRM implementation",
    "Zoho CRM developer",
    "Zoho CRM customization",
    "Zoho CRM automation",
    "Zoho CRM integration",
    "Zoho CRM migration",
    "Zoho One consultant",
    "Zoho One implementation",
    "CRM automation consultant",
    "CRM solutions architect",
    "CRM integration services",
    "AI CRM automation",
  ],
  alternates: {
    canonical: "https://insyrge.com",
  },
  openGraph: {
    title: "Zoho CRM Consulting, Implementation & Business Automation | Insyrge",
    description:
      "Certified Zoho consulting partners and solutions architects. We implement, customize, and automate Zoho CRM, Zoho One, Deluge workflows, and AI systems to eliminate manual work and scale operations.",
    url: "https://insyrge.com",
    siteName: "Insyrge",
    images: [
      {
        url: "/images/hero-automation-dashboard.jpg",
        width: 1200,
        height: 675,
        alt: "Insyrge - Zoho CRM & Business Automation Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoho CRM Consulting, Implementation & Business Automation | Insyrge",
    description:
      "Certified Zoho consulting partners and solutions architects. We implement, customize, and automate Zoho CRM, Zoho One, Deluge workflows, and AI systems.",
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
    "Insyrge CRM Solutions",
  ],
  url: "https://insyrge.com",
  logo: "https://insyrge.com/logo.png",
  image: "https://insyrge.com/images/hero-automation-dashboard.jpg",
  description:
    "Certified Zoho Consulting Partner delivering enterprise Zoho CRM and Zoho One implementations, custom Deluge scripting, third-party API integrations, and AI workflow automation.",
  telephone: "+91-7973837217",
  email: "info@insyrge.com",
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
    "Zoho CRM Consulting",
    "Zoho CRM Implementation",
    "Zoho CRM Customization",
    "Zoho CRM Automation",
    "Zoho CRM Migration",
    "Zoho One Architecture",
    "Custom Deluge Scripting",
    "REST API & Webhook Integrations",
    "Business Process Automation",
    "AI Workflow Automation & Intelligent Agents",
    "Zoho Books & Accounting Sync",
    "Zoho Creator Applications",
    "Solutions Architecture",
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
      name: "Zoho CRM Consulting & Implementation",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Full-cycle Zoho CRM consulting, pipeline customization, lead scoring, deal stage blueprints, automated quoting, and executive dashboards.",
      serviceType: "CRM Consulting & Implementation",
    },
    {
      "@type": "Service",
      position: 2,
      name: "Zoho One Enterprise Architecture & Setup",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Full-scale Zoho One deployment unifying 45+ enterprise applications without operational data silos.",
      serviceType: "Enterprise Software Implementation",
    },
    {
      "@type": "Service",
      position: 3,
      name: "Business Process & Workflow Automation",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Replacing manual bottlenecks, spreadsheet chaos, and repetitive handoffs with automated Zoho workflows.",
      serviceType: "Business Process Automation",
    },
    {
      "@type": "Service",
      position: 4,
      name: "Custom Deluge Development & API Integrations",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Advanced Deluge algorithms, custom CRM widgets, and bi-directional REST API connections with Stripe, QuickBooks, and ERPs.",
      serviceType: "API & Software Engineering",
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
    {
      "@type": "Service",
      position: 6,
      name: "Solutions Architecture & CRM Migration",
      provider: { "@id": "https://insyrge.com/#organization" },
      description:
        "Zero-downtime data migration from Salesforce, HubSpot, or legacy systems to Zoho with resilient architecture.",
      serviceType: "Solutions Architecture",
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
      {/* ⚡ High-Authority Technical SEO Schemas for Search Crawlers */}
      <StructuredData
        data={[homeFaqSchema, professionalServiceSchema, servicesSchema]}
      />

      {/* 1. 🚀 HERO SECTION: Outcome-focused commercial headline, dual CTAs & assessment modal */}
      <HeroHome data={homeData?.hero} />

      {/* 2. 🏆 TRUSTED BY BUSINESSES & STATS TICKER: Proof metrics & Zoho ecosystem badges */}
      <StatsSection />

      {/* 3. ⚠️ BUSINESS PROBLEMS WE SOLVE: Pain points comparison with Insyrge solutions */}
      <PainPointsSection />

      {/* 4. ⚙️ SERVICES SECTION: Dedicated SEO-rich cards for Zoho CRM, Zoho One, Deluge, APIs, AI */}
      <HomeServices />

      {/* 5. 🔌 INTEGRATIONS SHOWCASE: HOVER, Accounting, Stripe, DocuSign, CompanyCam, Custom APIs */}
      <IntegrationsShowcase />

      {/* 6. 🏢 INDUSTRY SOLUTIONS & USE CASES: Workflow automations across key B2B sectors */}
      <IndustrySolutionsSection />

      {/* 7. 💎 WHY CHOOSE INSYRGE: Evidence-based differentiation, SLAs, code ownership */}
      <WhyChooseSection />

      {/* 8. 🤖 AI-POWERED BUSINESS TRANSFORMATION: AI agents, OCR document intelligence, predictive workflows */}
      <AITransformationSection />

      {/* 9. 🗺️ PROCESS ROADMAP: The proven 8-step delivery engine from discovery to continuous support */}
      <ProcessTimelineSection />

      {/* 10. 📈 CASE STUDIES: Authentic Insyrge portfolio case studies under mutual NDA */}
      <CaseStudies />

      {/* 11. ⭐ VERIFIED PROOF: Live Zoho Marketplace extensions and direct marketplace links */}
      <TestimonialsSection />

      {/* 12. 🛡️ FOUNDER & TRUST PILLAR: Manav Sharma, Bilateral NDA, 100% Client Code & IP Ownership */}
      <FounderTrustSection />

      {/* 13. 🧩 FEATURED EXTENSIONS: Proprietary marketplace extensions & integrations */}
      {extensions?.length > 0 && <FeaturedExtensions extensions={extensions} />}

      {/* 14. 🤝 PARTNER SECTION: Official partner networks & technology alliances */}
      {homeData?.partners && <PartnerSection data={homeData.partners} />}

      {/* 15. ❓ FAQ SECTION: Schema-ready FAQs with instant search & category filtering */}
      <HomeFAQSection />

      {/* 16. ✍️ RECENT INSIGHTS: High-authority technical articles & guides */}
      {blogs?.length > 0 && <BlogHighlights blogs={blogs} />}

      {/* 17. 🎯 FINAL LEAD CAPTURE SECTION: Discovery booking, embedded Zoho form & deliverables */}
      <ContactSection />
    </>
  );
}