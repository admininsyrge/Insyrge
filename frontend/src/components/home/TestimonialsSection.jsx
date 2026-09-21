"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, ExternalLink, Award, CheckCircle2 } from "lucide-react";

// Real, published extensions verifiable directly on Zoho Marketplace
const verifiedExtensions = [
  {
    title: "Timeline Pro for Zoho CRM Records",
    category: "Record Management & Auditing",
    description:
      "A specialized productivity extension enabling visual chronological tracking and advanced timeline management for all Zoho CRM record interactions.",
    marketplaceUrl:
      "https://marketplace.zoho.com/app/crm/timeline-pro-record-management-for-zoho-crm",
    rating: "Official Marketplace App",
  },
  {
    title: "Google Address Auto Complete for Zoho CRM",
    category: "Data Hygiene & Speed",
    description:
      "Eliminates manual typing and address errors by integrating Google Places API directly into Zoho CRM lead, account, and contact address fields.",
    marketplaceUrl:
      "https://marketplace.zoho.com/app/preview/crm/googleaddressautocompleteforzohocrm1",
    rating: "Official Marketplace App",
  },
  {
    title: "Restore Lead from Deal/Account/Contact",
    category: "Sales Pipeline Flexibility",
    description:
      "Seamlessly recreates and restores converted leads directly from Deals or Contacts with one click without manually re-keying data.",
    marketplaceUrl:
      "https://marketplace.zoho.com/app/crm/convert-lead-from-deal-for-zoho-crm",
    rating: "Official Marketplace App",
  },
  {
    title: "Hover Integration for Zoho CRM",
    category: "Contracting & Measurements",
    description:
      "Connects Hover 3D property measurements and exterior data directly into Zoho CRM records for rapid estimating and automated proposal drafting.",
    marketplaceUrl:
      "https://marketplace.zoho.com/app/crm/hover-integration-for-zoho-crm",
    rating: "Official Marketplace App",
  },
  {
    title: "Contact Roles Management for Zoho CRM",
    category: "Multi-Stakeholder Deals",
    description:
      "Enables multi-contact relationship mapping and role classification across complex B2B enterprise deals and account hierarchies.",
    marketplaceUrl:
      "https://marketplace.zoho.com/app/crm/contact-roles-management-for-zoho-crm",
    rating: "Official Marketplace App",
  },
  {
    title: "One-Click PDF Export for Zoho CRM",
    category: "Document Automation",
    description:
      "Instantly compiles, formats, and exports Zoho CRM record data, notes, and activity histories into standardized professional PDF documents.",
    marketplaceUrl:
      "https://marketplace.zoho.com/app/crm/one-click-pdf-export-for-zoho-crm",
    rating: "Official Marketplace App",
  },
];

// Authentic client engagements under Mutual Non-Disclosure Agreements (NDAs)
const authenticClientEngagements = [
  {
    engagement: "Field Operations & Lead Dispatch Automation",
    clientType: "Mid-Market Contracting & Field Services Provider",
    role: "VP of Operations",
    ndaTag: "Protected under Mutual NDA",
    summary:
      "Consolidated multi-city lead intake, automated technician scheduling, and built instant quote generation in Zoho CRM, eliminating over 15 hours of manual dispatch coordination weekly.",
    keyOutcome: "Immediate automated lead routing & field dispatching",
  },
  {
    engagement: "Custom Lending Portal & Document Verification",
    clientType: "Commercial Capital & Financial Services Practice",
    role: "Chief Technology Officer",
    ndaTag: "Protected under Mutual NDA",
    summary:
      "Architected a custom Zoho Creator client portal connected to external KYC webhooks, enabling borrowers to upload documents and track application stages in real time.",
    keyOutcome: "Zero-error automated document verification pipeline",
  },
  {
    engagement: "Multi-Warehouse Inventory & Accounting Sync",
    clientType: "Specialized Equipment & B2B Distribution Enterprise",
    role: "Director of Systems & Supply Chain",
    ndaTag: "Protected under Mutual NDA",
    summary:
      "Engineered real-time bi-directional sync across Zoho Inventory, Zoho Books, and third-party logistics APIs, providing leadership with unified multi-warehouse stock accuracy.",
    keyOutcome: "Eliminated multi-warehouse inventory sync errors",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState("extensions");

  return (
    <section className="relative bg-[#06172e] py-24 text-white overflow-hidden border-t border-b border-[#08e5c0]/15">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#08e5c0]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4dffe4]/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Verified Proof &amp; Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Authentic Solutions,{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Publicly Verifiable Software
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            We build proprietary software and enterprise automations. Verify our public extensions directly on the official Zoho Marketplace, or review our enterprise consulting track record protected under mutual NDAs.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("extensions")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "extensions"
                ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_20px_rgba(8,229,192,0.4)]"
                : "bg-[#0c2242] text-gray-300 hover:text-white border border-white/10"
            }`}
          >
            <Award className="w-4 h-4" />
            Verified Zoho Marketplace Apps ({verifiedExtensions.length})
          </button>
          <button
            onClick={() => setActiveTab("engagements")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "engagements"
                ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_20px_rgba(8,229,192,0.4)]"
                : "bg-[#0c2242] text-gray-300 hover:text-white border border-white/10"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Enterprise Client Engagements (NDA)
          </button>
        </div>

        {/* Tab Content: Official Zoho Marketplace Extensions */}
        {activeTab === "extensions" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {verifiedExtensions.map((ext, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[#0b2142] border border-[#08e5c0]/25 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-[#08e5c0]/60 hover:shadow-[0_0_25px_rgba(8,229,192,0.2)] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-[#08e5c0] bg-[#08e5c0]/10 px-2.5 py-1 rounded border border-[#08e5c0]/20">
                      {ext.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Live on Zoho
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#08e5c0] transition-colors">
                    {ext.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {ext.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    Publisher: <strong className="text-gray-200">Insyrge</strong>
                  </span>
                  <a
                    href={ext.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#08e5c0] hover:underline"
                  >
                    Verify on Zoho
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab Content: Authentic Client Engagements Under NDA */}
        {activeTab === "engagements" && (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {authenticClientEngagements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#0b2142] border border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold text-[#08e5c0]">
                      {item.ndaTag}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-gray-400" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {item.engagement}
                  </h3>

                  <div className="text-xs text-gray-400 mb-4">
                    Client: <span className="text-gray-200">{item.clientType}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono text-gray-400 uppercase">
                    Key Deliverable
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                    {item.keyOutcome}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* NDA and Verifiable Authenticity Banner */}
        <div className="bg-[#081a36] border border-[#08e5c0]/25 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#08e5c0]/15 text-[#08e5c0] flex items-center justify-center flex-shrink-0 border border-[#08e5c0]/30 mt-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                Our Policy on Client Confidentiality &amp; Authentic Data
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                We believe in 100% transparency. Our enterprise clients entrust us with mission-critical systems and proprietary sales logic. We strictly enforce bilateral Non-Disclosure Agreements (NDAs). When you partner with Insyrge, your company data, customer records, and workflows are completely confidential and protected.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="https://insyrge.zohobookings.com/#/4623360000000149002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-xs shadow-[0_0_20px_rgba(8,229,192,0.35)] hover:scale-105 transition-all whitespace-nowrap"
            >
              Request Mutual NDA &amp; Discovery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
