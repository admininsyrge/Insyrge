"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const serviceOfferings = [
  {
    id: "zoho-crm",
    category: "Zoho Core",
    title: "Zoho CRM Implementation & Optimization",
    badge: "Most Requested",
    description:
      "Transform your sales cycle from chaotic spreadsheets into a high-converting revenue machine. As dedicated Zoho CRM consultants, we engineer lead routing, pipeline stages, automated quotation workflows, and executive forecasting dashboards.",
    keywords: ["Zoho CRM Consultant", "Zoho CRM Implementation", "CRM Setup Services"],
    deliverables: [
      "Custom lead scoring & round-robin assignment",
      "Automated quote-to-invoice & electronic signatures",
      "Visual sales pipelines & deal stage blueprints",
      "Executive KPI & conversion rate dashboards",
    ],
    ctaText: "Get CRM Assessment",
    link: "/services/zoho-crm-implementation",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "zoho-one",
    category: "Zoho Core",
    title: "Zoho One Enterprise Architecture & Setup",
    badge: "All-in-One Suite",
    description:
      "Unify your entire operational ecosystem under a single operating system. We architect seamless multi-app synchronization across Zoho CRM, Books, Inventory, Desk, Sign, and Analytics to eliminate software fragmentation.",
    keywords: ["Zoho One Consultant", "Zoho One Setup", "Zoho One Expert"],
    deliverables: [
      "End-to-end 45+ enterprise app unification",
      "Role-based permission architecture & security",
      "Zero-data-silo inventory & accounting pipelines",
      "Consolidated multi-department reporting",
    ],
    ctaText: "Plan Zoho One Architecture",
    link: "/services/business-process-technology-consulting",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "deluge-dev",
    category: "Custom Engineering",
    title: "Custom Zoho Development & Deluge Scripting",
    badge: "Advanced Code",
    description:
      "Break through default system constraints with custom Deluge code, Client Script widgets, and serverless automation triggers. We develop complex algorithms, multi-variable commission matrices, and interactive UI extensions.",
    keywords: ["Zoho Developer", "Deluge Developer", "Zoho Custom Functions"],
    deliverables: [
      "Complex Deluge scripts & scheduled crons",
      "Custom UI widgets & interactive portals",
      "Automated document generation & validation",
      "Custom database tables & workflow webhooks",
    ],
    ctaText: "Hire Deluge Developers",
    link: "/services/custom-extension-development",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: "api-integrations",
    category: "Custom Engineering",
    title: "Zoho API & Third-Party Integrations",
    badge: "Bi-Directional Sync",
    description:
      "Connect Zoho seamlessly to your existing technology stack. We engineer fault-tolerant REST and GraphQL webhook connections with Stripe, QuickBooks, Shopify, DocuSign, Twilio, ERP systems, and internal legacy databases.",
    keywords: ["Zoho Integrations", "API Development", "Third-Party Integrations"],
    deliverables: [
      "Secure OAuth 2.0 authentication architecture",
      "Real-time bi-directional payload sync",
      "Automated payment gateway & ERP pipelines",
      "Webhook failover & error logging monitors",
    ],
    ctaText: "Explore API Integrations",
    link: "/services/custom-app-development",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "marketplace-extensions",
    category: "Custom Engineering",
    title: "Zoho Marketplace Extensions & Custom Plugins",
    badge: "Proprietary Apps",
    description:
      "Build, deploy, and monetize custom extensions on the official Zoho Marketplace or distribute private enterprise plugins across your company. We handle compliance, multi-tenant security, and cloud backend architecture.",
    keywords: ["Zoho Marketplace Developer", "Custom Extensions", "Zoho Plugins"],
    deliverables: [
      "Turnkey Zoho Marketplace app development",
      "Private enterprise extension distribution",
      "Serverless cloud backend & webhook listeners",
      "Zoho security review and compliance approval",
    ],
    ctaText: "Explore Extensions",
    link: "/extensions",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: "ai-automation",
    category: "AI & Automation",
    title: "AI Business Automation & Intelligent Agents",
    badge: "Next-Gen AI",
    description:
      "Supercharge your team's output with generative AI agents, intelligent document extraction (OCR), automated lead qualification, and predictive revenue analytics integrated directly into your Zoho CRM workflows.",
    keywords: ["AI Business Automation", "AI Workflow Automation", "Business Intelligence"],
    deliverables: [
      "Autonomous 24/7 AI lead qualification agents",
      "Intelligent OCR parsing for invoices & contracts",
      "Predictive deal scoring & churn forecasting",
      "Automated CRM response drafting with LLMs",
    ],
    ctaText: "Deploy AI Automation",
    link: "/services/ai-automation-solutions",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "custom-software",
    category: "Custom Engineering",
    title: "Custom Software, Portals & Web Applications",
    badge: "Bespoke Portals",
    description:
      "When off-the-shelf software isn't enough, we build custom client portals, internal operations dashboards, and low-code Zoho Creator applications engineered for enterprise scale, bank-level security, and high performance.",
    keywords: ["Business Applications", "Internal Tools", "Web Applications"],
    deliverables: [
      "Branded customer & vendor self-service portals",
      "Custom Zoho Creator low-code business apps",
      "Modern Next.js / React enterprise web apps",
      "Mobile-responsive technician & field interfaces",
    ],
    ctaText: "Discuss Custom Application",
    link: "/services/custom-app-development",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function HomeServices() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Zoho Core", "Custom Engineering", "AI & Automation"];

  const filteredServices =
    activeCategory === "All"
      ? serviceOfferings
      : serviceOfferings.filter((s) => s.category === activeCategory);

  return (
    <section className="relative bg-[#06172e] py-24 text-white overflow-hidden border-t border-[#08e5c0]/15">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#08e5c0]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#4dffe4]/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            End-to-End Enterprise Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Zoho Consulting, Deluge Engineering &amp;{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              AI Automation
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            From greenfield Zoho One architecture to advanced custom Deluge scripts and autonomous AI agents, we engineer resilient software systems that accelerate revenue and eliminate operational drag.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_20px_rgba(8,229,192,0.4)]"
                  : "bg-[#0b2142] text-gray-300 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-[#0b2142] border border-[#08e5c0]/25 rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-xl hover:shadow-[0_0_30px_rgba(8,229,192,0.25)] hover:border-[#08e5c0]/50 transition-all duration-300 group"
            >
              <div>
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#08e5c0]/15 text-[#08e5c0] flex items-center justify-center border border-[#08e5c0]/30 group-hover:bg-[#08e5c0] group-hover:text-[#071831] transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/5 text-[#08e5c0] border border-[#08e5c0]/20">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#08e5c0] transition-colors duration-200">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Core Capabilities:
                  </div>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-[#08e5c0] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Semantic Keywords + CTA */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.keywords.map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className="text-[10px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="https://insyrge.zohobookings.com/#/4623360000000149002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#08e5c0] text-[#071831] font-bold text-xs shadow-sm hover:scale-[1.02] transition-all"
                  >
                    {service.ctaText}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link
                    href={service.link}
                    className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-xs border border-white/10 transition-all"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="bg-[#091e3b] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Need a Custom Solution or Specialized Architecture?
            </h4>
            <p className="text-gray-300 text-sm">
              We design custom Deluge algorithms, proprietary extensions, and bi-directional API connections for unique enterprise workflows.
            </p>
          </div>
          <Link
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-sm shadow-[0_0_20px_rgba(8,229,192,0.35)] hover:scale-105 transition-all whitespace-nowrap"
          >
            Talk to a Zoho Architect
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
