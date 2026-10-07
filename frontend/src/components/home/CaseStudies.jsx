"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const authenticCaseStudies = [
  {
    id: "field-service-crm",
    category: "CRM & Field Operations",
    badge: "Field Services & Dispatch",
    title: "Automated CRM & Workflow System for Field Service Operations",
    clientLabel: "Commercial Field Services Provider",
    ndaNotice: "Client Identity Confidential under Mutual NDA",
    portfolioSlug: "/portfolio/automated-crm-workflow-system-for-field-service-business",
    image: "https://res.cloudinary.com/dwkoijsad/image/upload/v1778107331/projects/vzprt7kwr4xpczuhkw84.png",
    keyDeliverables: [
      { label: "Dispatch Architecture", value: "Real-Time" },
      { label: "Lead-to-Schedule Flow", value: "Automated" },
      { label: "Centralized Platform", value: "Single System" },
    ],
    challenge:
      "The client relied on disjointed spreadsheets, paper job records, and separate communication tools for dispatching field technicians. Lead follow-ups were delayed, customer records were scattered, and billing handoffs created recurring invoicing friction.",
    solution:
      "Insyrge engineered a fully automated CRM workflow solution centralizing lead capture, technician dispatch, customer notification journeys, and job tracking into a unified operational platform.",
    implementation:
      "Configured automated lead assignment algorithms, integrated external technician calendar scheduling, deployed mobile-ready field views, and constructed bi-directional sync into backend accounting.",
    impactSummary:
      "Eliminated manual data handoffs between dispatchers and field crews, dramatically accelerated speed-to-lead response times, and delivered a scalable operational system without increasing administrative headcount.",
    quote:
      "Insyrge consolidated our scattered field operations into one structured system. Lead handoffs and job dispatching now run automatically with zero paperwork drag.",
    authorRole: "Director of Operations",
    companyType: "Commercial Field Services Firm",
  },
  {
    id: "bi-analytics-dashboard",
    category: "Data Analytics & BI",
    badge: "Business Intelligence",
    title: "Custom Data Analytics & Business Intelligence Dashboard",
    clientLabel: "Multi-Department Commercial Enterprise",
    ndaNotice: "Client Identity Confidential under Mutual NDA",
    portfolioSlug: "/portfolio/custom-data-analytics-business-intelligence-dashboard",
    image: "https://res.cloudinary.com/dwkoijsad/image/upload/v1778108041/projects/fjoraln61lvaowusfxf2.png",
    keyDeliverables: [
      { label: "Reporting Source", value: "Unified" },
      { label: "Data Refresh Frequency", value: "Real-Time" },
      { label: "Manual Spreadsheet Work", value: "Eliminated" },
    ],
    challenge:
      "Executive decision-makers lacked visibility into consolidated sales velocity, team performance, and multi-channel revenue. Stakeholders spent days compiling manual monthly reports from divergent software exports.",
    solution:
      "Architected an automated business intelligence and data visualization dashboard integrating sales, operational metrics, and financial records into a centralized reporting command center.",
    implementation:
      "Constructed automated ETL data pipelines syncing disparate data sources, built interactive KPI drill-downs, and configured role-based executive dashboards accessible on mobile and desktop.",
    impactSummary:
      "Eliminated recurring manual data compilation hours, provided executive stakeholders with real-time operational clarity, and enabled data-driven forecasting with accurate pipeline transparency.",
    quote:
      "We no longer wait until month-end to know where our numbers stand. The analytics dashboards built by Insyrge give our leadership team real-time clarity every single day.",
    authorRole: "Chief Financial Officer",
    companyType: "Commercial Growth Enterprise",
  },
  {
    id: "saas-operations-platform",
    category: "Custom Software Engineering",
    badge: "SaaS & Web Applications",
    title: "SaaS-Based Operations Management Platform",
    clientLabel: "B2B Technology & Services Provider",
    ndaNotice: "Client Identity Confidential under Mutual NDA",
    portfolioSlug: "/portfolio/saas-based-operations-management-platform",
    image: "https://res.cloudinary.com/dwkoijsad/image/upload/v1778108386/projects/cndvjprblpv3bf8vrfwo.png",
    keyDeliverables: [
      { label: "Architecture", value: "Multi-Tenant" },
      { label: "Tool Consolidation", value: "All-in-One" },
      { label: "Operational Bottlenecks", value: "Resolved" },
    ],
    challenge:
      "The client's internal operations were fragmented across multiple off-the-shelf subscriptions that failed to communicate, leading to data inconsistencies, expensive license overhead, and rigid workflow limitations.",
    solution:
      "Designed and developed a custom SaaS operations platform engineered specifically to streamline client intake, workflow execution, user permissions, and centralized activity logging.",
    implementation:
      "Engineered secure multi-user role management, automated status progression logic, bespoke administrative consoles, and robust API endpoints for third-party service interoperability.",
    impactSummary:
      "Replaced several disjointed third-party software licenses with a unified, scalable asset owned 100% by the business, reducing operational overhead and accelerating internal team turnaround.",
    quote:
      "Building our dedicated operations platform with Insyrge allowed us to replace four rigid subscriptions with one purpose-built system that fits our exact business workflow.",
    authorRole: "Head of Product & Operations",
    companyType: "B2B Technology Firm",
  },
  {
    id: "zoho-creator-automation",
    category: "Zoho Low-Code & Deluge",
    badge: "Zoho Creator Systems",
    title: "Zoho Creator Custom Application & Booking System",
    clientLabel: "Specialized Service Enterprise",
    ndaNotice: "Client Identity Confidential under Mutual NDA",
    portfolioSlug: "/portfolio/zoho-creator-automation",
    image: "/images/portfolio/zoho-creator.jpg",
    keyDeliverables: [
      { label: "Platform", value: "Zoho Creator" },
      { label: "Payment Gateway Sync", value: "Bi-Directional" },
      { label: "Custom Deluge Logic", value: "Tailored" },
    ],
    challenge:
      "Off-the-shelf booking tools lacked the required flexibility for complex appointment variables, conditional technician matching, and customized client checkout journeys.",
    solution:
      "Engineered a dedicated Zoho Creator low-code application featuring appointment scheduling, automated payment processing integration, and real-time synchronization with Zoho CRM and Analytics.",
    implementation:
      "Authored custom Deluge scripts for schedule verification, integrated payment webhooks via REST APIs, and created responsive user-facing interface modules with secure data validation.",
    impactSummary:
      "Delivered a tailored appointment booking experience directly synced to the core CRM database, eliminating booking clashes and streamlining upfront billing confirmation.",
    quote:
      "The Zoho Creator application built by Insyrge gave us the exact custom functionality our business needed without forcing us into rigid out-of-the-box software constraints.",
    authorRole: "Managing Director",
    companyType: "Professional Services Practice",
  },
];

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);
  const current = authenticCaseStudies[activeCase];

  return (
    <section className="relative bg-[#071831] py-24 text-white overflow-hidden border-t border-b border-[#08e5c0]/15">
      {/* Background ambient lighting - mobile GPU-friendly */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#08e5c0]/20 rounded-full blur-[50px] sm:blur-[140px] transform-gpu" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4dffe4]/15 rounded-full blur-[50px] sm:blur-[140px] transform-gpu" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Proven Client Implementations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Real Systems,{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Measurable Business Architecture
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Explore authentic portfolio projects engineered by Insyrge. In compliance with client Non-Disclosure Agreements (NDAs), project architectures and outcomes are documented to demonstrate verifiable technical capability.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {authenticCaseStudies.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveCase(idx)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCase === idx
                  ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_20px_rgba(8,229,192,0.4)]"
                  : "bg-[#0c2242] text-gray-300 hover:text-white hover:bg-[#0f2b54] border border-white/10"
              }`}
            >
              {item.badge}
            </button>
          ))}
        </div>

        {/* Active Case Study Detail Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-[#0b2142] border border-[#08e5c0]/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative"
          >
            {/* Top row: Project Scope & Deliverables */}
            <div className="grid lg:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-white/10">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#08e5c0]/15 text-[#08e5c0] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <span>{current.category}</span>
                  <span>•</span>
                  <span className="text-gray-300 font-normal">{current.ndaNotice}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                  {current.title}
                </h3>
                <div className="text-sm text-gray-400">
                  Engagement: <span className="text-gray-200 font-semibold">{current.clientLabel}</span>
                </div>
              </div>

              {/* Highlight Deliverables */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                {current.keyDeliverables.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-[#071831] p-3.5 rounded-xl border border-[#08e5c0]/25 text-center flex flex-col justify-center"
                  >
                    <div className="text-base sm:text-lg font-extrabold text-[#08e5c0] font-mono mb-1">
                      {d.value}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium leading-tight">
                      {d.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle row: 3-column breakdown */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#081a36] p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Operational Friction
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {current.challenge}
                </p>
              </div>

              <div className="bg-[#081a36] p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-[#08e5c0] text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#08e5c0]" />
                  Insyrge Engineered Solution
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {current.solution}
                </p>
              </div>

              <div className="bg-[#081a36] p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase font-bold tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Architecture &amp; Stack
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {current.implementation}
                </p>
              </div>
            </div>

            {/* Bottom row: Authentic Feedback & Portfolio Direct Link */}
            <div className="bg-[#08172e] p-6 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="text-xs text-[#08e5c0] font-mono uppercase font-semibold mb-1">
                  Client Operational Feedback
                </div>
                <blockquote className="text-gray-300 text-sm sm:text-base italic mb-2">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-gray-400">
                  <span className="text-white font-semibold">{current.authorRole}</span> —{" "}
                  <span>{current.companyType}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
                <Link
                  href={current.portfolioSlug}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all whitespace-nowrap"
                >
                  View Portfolio Specs
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="https://insyrge.zohobookings.com/#/4623360000000149002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-xs shadow-[0_0_15px_rgba(8,229,192,0.35)] hover:scale-105 transition-all whitespace-nowrap"
                >
                  Discuss Similar Workflow
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
