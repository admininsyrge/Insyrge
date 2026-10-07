"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ExternalLink,
  CheckCircle2,
  Layers,
  Camera,
  FileSignature,
  FileSpreadsheet,
  Receipt,
  Cpu,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const integrations = [
  {
    id: "hover",
    name: "HOVER + Zoho CRM",
    badge: "Official HOVER Partner Integration",
    badgeColor: "bg-cyan-500/10 text-[#08e5c0] border-cyan-500/30",
    icon: <Layers className="w-6 h-6 text-[#08e5c0]" />,
    headline: "Automate Property Measurements & 3D Models in Deals",
    description:
      "Featured in HOVER's official Help Center, this integration enables roofing and exterior contractors to create HOVER jobs, dispatch measurement requests, and sync complete 3D measurement PDFs and photos directly into Zoho CRM Deal attachments.",
    proofUrl: "https://help.hover.to/en/articles/12651040-zoho-crm-integration",
    proofLabel: "View on HOVER Help Center",
    internalLink: "/extensions/hover-integration-for-zoho-crm",
    internalLabel: "Explore Extension & Case Study",
    features: [
      "Create & dispatch HOVER inspection jobs from Deal records",
      "Automatic 2-way sync of measurements, photos & PDFs",
      "Multiple HOVER projects supported per Deal record",
      "Field assignee notification emails with direct upload links",
    ],
  },
  {
    id: "companycam",
    name: "CompanyCam + Zoho CRM",
    badge: "Job-Site Photo Sync",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: <Camera className="w-6 h-6 text-blue-400" />,
    headline: "Live Field Documentation Linked to Deals & Accounts",
    description:
      "Automatically create CompanyCam projects when a CRM deal reaches inspection or won stages. Keep all job photos, crew annotations, and before/after galleries synchronized inside Zoho WorkDrive and CRM records.",
    features: [
      "Auto-generate project folders from CRM stage triggers",
      "Embed live photo stream inside Zoho CRM record widgets",
      "Two-way sync of job notes and progress timestamps",
      "Eliminate manual photo downloads and emailing",
    ],
  },
  {
    id: "docusign",
    name: "DocuSign & Zoho Sign",
    badge: "Contract Automation",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: <FileSignature className="w-6 h-6 text-emerald-400" />,
    headline: "One-Click E-Signatures & Deposit Workflows",
    description:
      "Generate legally binding contractor agreements, change orders, and subcontracts directly from Zoho CRM deal data. Progress deal stages and trigger dispatch notifications the instant the client signs.",
    features: [
      "Pre-filled templates populated with CRM deal & quote fields",
      "Real-time signature status tracking on CRM timeline",
      "Automated counter-signature routing and signed PDF archiving",
      "Triggers down-payment invoicing upon document execution",
    ],
  },
  {
    id: "summaquote",
    name: "SummaQuote + Zoho CRM",
    badge: "Estimating & Quoting",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: <FileSpreadsheet className="w-6 h-6 text-purple-400" />,
    headline: "Multi-Option Proposal Presentation & Pipeline Sync",
    description:
      "Bridge modern roofing and contractor estimating proposals with your sales pipeline. When a homeowner selects Good/Better/Best options, the approved total and scopes sync directly into Zoho CRM Deals.",
    features: [
      "Sync customer quote selections back to CRM Deal values",
      "Automate follow-up sequences when proposals are viewed",
      "Track proposal open times and customer engagement",
      "Handoff approved line items straight to operations",
    ],
  },
  {
    id: "accounting",
    name: "QuickBooks & Xero Sync",
    badge: "Financial Reconciliation",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: <Receipt className="w-6 h-6 text-amber-400" />,
    headline: "Bi-Directional Invoicing, Deposits & Job Costing",
    description:
      "Connect Zoho CRM with QuickBooks Online or Xero. Push customer records, create progressive invoices from Deal milestones, and record customer payments automatically without duplicate data entry.",
    features: [
      "Auto-create customers and jobs in accounting on deal won",
      "Generate deposit and final invoices with 1 click in CRM",
      "Sync invoice payment statuses back to CRM records",
      "Real-time gross margin and job costing visibility",
    ],
  },
  {
    id: "custom-api",
    name: "Custom REST APIs & Webhooks",
    badge: "Any Proprietary System",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    icon: <Cpu className="w-6 h-6 text-rose-400" />,
    headline: "Connect Legacy Portals, Supplier Feeds & Lead Sources",
    description:
      "Have a custom portal, Angi/Thumbtack lead webhook, or supplier pricing catalog? We build secure, rate-limit compliant Deluge scripts, serverless functions, and REST middleware to connect any system.",
    features: [
      "Bi-directional REST API endpoints and Deluge webhooks",
      "Instant lead ingestion from custom web forms and marketing ads",
      "Supplier material catalog & live price sheet integrations",
      "Full API key security, OAuth 2.0, and error fallback logging",
    ],
  },
];

export default function IntegrationsShowcase() {
  return (
    <section className="relative bg-[#071831] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Background glow - mobile GPU-friendly */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[#08e5c0]/5 blur-[60px] sm:blur-[200px] rounded-full absolute -top-40 right-1/4 transform-gpu" />
        <div className="w-[500px] h-[500px] bg-blue-600/5 blur-[60px] sm:blur-[180px] rounded-full absolute -bottom-20 left-10 transform-gpu" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            Specialist Contractor &amp; Business Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Connect Zoho to the Tools{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] via-[#33ffd0] to-[#00e0ff] bg-clip-text text-transparent">
              Your Team Already Relies On
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Stop forcing your field crews, estimators, and office admins to re-enter
            the same data across 5 different apps. We engineer robust, bi-directional
            Zoho integrations that turn your software stack into one cohesive engine.
          </p>
        </div>

        {/* Featured Showcase: HOVER Integration Flagship Card */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-[#0B1C3D] to-[#08172E] border-2 border-[#08e5c0]/40 shadow-[0_0_50px_rgba(8,229,192,0.15)] relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#08e5c0]/10 rounded-full blur-3xl -z-0 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#08e5c0]/15 text-[#08e5c0] border border-[#08e5c0]/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Verified in HOVER Official Help Center
                  </span>
                  <span className="text-xs text-gray-400">
                    Published Zoho Marketplace Product
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                  HOVER + Zoho CRM Integration by Insyrge
                </h3>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  HOVER&apos;s official documentation specifically identifies Insyrge as
                  the development partner behind its Zoho CRM integration. Roofing and
                  remodeling teams can trigger measurement requests directly from Deal
                  records, automatically receive accurate 3D CAD measurements and
                  photos, and eliminate hours of manual estimating data entry.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {integrations[0].features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#08e5c0] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/extensions/hover-integration-for-zoho-crm"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-[#08e5c0] text-[#081b33] hover:shadow-[0_0_20px_#08e5c060] transition-all"
                  >
                    View Extension &amp; Admin Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://help.hover.to/en/articles/12651040-zoho-crm-integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border border-white/20 text-gray-200 hover:border-[#08e5c0]/50 hover:text-[#08e5c0] transition-all"
                  >
                    Read HOVER Documentation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href="/extensions/hover-integration-for-zoho-crm/case-study"
                    className="text-xs text-gray-400 hover:text-[#08e5c0] underline underline-offset-4"
                  >
                    Read Contractor Case Study →
                  </Link>
                </div>
              </div>

              {/* Visual Preview Box */}
              <div className="lg:col-span-5 bg-[#051124]/90 p-6 rounded-2xl border border-white/10 shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-gray-400">
                  <span className="font-mono text-[#08e5c0]">Zoho CRM ⇄ HOVER API Pipeline</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Active Sync
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Deal Record Created</p>
                      <p className="text-gray-400 text-[11px]">Roofing Lead Qualified ($28,500)</p>
                    </div>
                    <span className="text-[10px] bg-cyan-500/20 text-[#08e5c0] px-2 py-0.5 rounded">Trigger</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">HOVER Job Dispatched</p>
                      <p className="text-gray-400 text-[11px]">Auto-assigned to field inspector</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Auto-API</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Measurements &amp; PDFs Synced</p>
                      <p className="text-gray-400 text-[11px]">3D Model + 24 Inspection Photos attached</p>
                    </div>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Completed</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Double data entry: <strong className="text-rose-400">0 hrs</strong></span>
                  <span>Weekly time saved: <strong className="text-[#08e5c0]">3–4 hrs / PM</strong></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Other 5 Integrations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.slice(1).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl p-6 bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/40 shadow-xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#08e5c0] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-[#08e5c0] mb-3">
                  {item.headline}
                </p>
                <p className="text-gray-300 text-xs leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-2 mb-6">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#08e5c0] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#08e5c0] hover:underline flex items-center gap-1"
                >
                  Consult on this integration
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <span className="text-[11px] text-gray-400">Custom Scoped</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-[#0B1C3D]/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              Need a custom integration with a specialized contractor app or ERP?
            </h4>
            <p className="text-gray-400 text-xs">
              We design secure custom Deluge webhooks, REST APIs, and middle-tier sync engines for unique business requirements.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-full font-bold text-xs bg-[#08e5c0] text-[#081b33] hover:shadow-[0_0_20px_#08e5c050] transition-all"
          >
            Discuss Custom Integration
          </Link>
        </div>
      </div>
    </section>
  );
}
