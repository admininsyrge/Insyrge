"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  Shield,
  BadgeDollarSign,
  HeartPulse,
  Building2,
  Factory,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const industries = [
  {
    id: "construction",
    name: "Construction & Trades",
    icon: <HardHat className="w-5 h-5" />,
    headline: "Automate Job Estimating, Subcontractor Dispatch & Field Billing",
    desc: "Eliminate lost field notes and delayed invoices. We connect your on-site teams with back-office estimating, live job tracking, and automated client status updates.",
    features: [
      "Instant on-site job estimates & digital customer signature capture",
      "Automated subcontractor scheduling and task assignment",
      "Two-way synchronization between Zoho CRM and QuickBooks/Xero",
      "Automated progress billing, material tracking, and lien waiver workflows",
    ],
    metric: "Core Objective: Rapid invoice dispatch & centralized subcontractor tracking",
  },
  {
    id: "insurance",
    name: "Insurance & Brokerages",
    icon: <Shield className="w-5 h-5" />,
    headline: "Streamline Policy Renewals, Commissions & Carrier Documents",
    desc: "Never miss an annual renewal. We automate the entire policy lifecycle from inbound quote intake and risk assessment to carrier document storage and commission reconciliation.",
    features: [
      "Automated 90, 60, and 30-day policy renewal alerts and email journeys",
      "Cross-sell and upsell automation based on policy coverage gaps",
      "Secure client portal for ID cards, certificates, and claim filings",
      "Commission split calculations and automated producer payout reports",
    ],
    metric: "Core Objective: Proactive renewal reminders & automated document compliance",
  },
  {
    id: "finance",
    name: "Financial Services",
    icon: <BadgeDollarSign className="w-5 h-5" />,
    headline: "Accelerate Loan Origination, KYC Compliance & Investor Portals",
    desc: "Transform manual loan underwriting and wealth advisory workflows into lightning-fast digital onboarding with encrypted document collection and automated compliance tracking.",
    features: [
      "Digital KYC, identity verification, and automated background checks",
      "Automated loan pipeline stages with condition-based approval routing",
      "Secure client vault for tax returns, bank statements, and portfolios",
      "Comprehensive audit logging complying with FINRA and SEC standards",
    ],
    metric: "Core Objective: Streamlined loan pipeline progression & digital KYC verification",
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    icon: <HeartPulse className="w-5 h-5" />,
    headline: "HIPAA-Compliant Patient Intake, Appointment Sync & Follow-Ups",
    desc: "Reduce patient no-shows and administrative receptionist burden with intelligent appointment reminders, digital intake forms, and automated post-visit wellness check-ins.",
    features: [
      "Digital patient intake forms syncing directly into patient CRM profiles",
      "Automated SMS/Email appointment confirmations and 2-way rescheduling",
      "HIPAA-compliant encrypted data storage and role-based staff access",
      "Automated referral partner tracking and physician follow-up loops",
    ],
    metric: "Core Objective: Minimized appointment no-shows & zero paper intake backlogs",
  },
  {
    id: "realestate",
    name: "Real Estate & Property",
    icon: <Building2 className="w-5 h-5" />,
    headline: "Automate Buyer Lead Routing, MLS Sync & Contract Deadlines",
    desc: "Convert inbound portal inquiries before competitors can dial. We automate instant lead distribution, property matching, inspection reminders, and closing milestone updates.",
    features: [
      "Instant lead capture from Zillow, Realtor.com, and website portals",
      "Automated property recommendation matching based on buyer criteria",
      "Transaction milestone trackers for earnest money, inspections, and escrow",
      "Automated contract generation and e-signature dispatch with Zoho Sign",
    ],
    metric: "Core Objective: Instant lead engagement & automated transaction milestone tracking",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Supply",
    icon: <Factory className="w-5 h-5" />,
    headline: "Connect Sales Orders, Multi-Warehouse Inventory & Supplier POs",
    desc: "End stockouts and order confusion. We integrate your sales pipeline directly with warehouse inventory, bill of materials (BOM), shipping logistics, and supplier reordering.",
    features: [
      "Automatic sales-order-to-production-work-order generation",
      "Multi-location inventory tracking with automatic low-stock purchase orders",
      "Customer shipping notifications with live carrier tracking links",
      "Dealer and B2B wholesale pricing portal with custom tier approvals",
    ],
    metric: "Core Objective: Multi-warehouse stock transparency & automated purchase orders",
  },
  {
    id: "legal",
    name: "Legal & Professional",
    icon: <Briefcase className="w-5 h-5" />,
    headline: "Client Intake Automation, Retainer Tracking & Billable Audits",
    desc: "Free attorneys and senior consultants to do high-value advisory work by automating conflict checks, retainer agreements, time tracking, and automated invoice collections.",
    features: [
      "Self-service digital intake questionnaires with automatic matter creation",
      "Automated conflict-of-interest checks across historical client databases",
      "Retainer balance monitoring with automated replenishment notifications",
      "Integrated calendar scheduling for paid consultations and court deadlines",
    ],
    metric: "Core Objective: Automated intake questionnaires & streamlined retainer replenishment",
  },
];

export default function IndustrySolutionsSection() {
  const [activeTab, setActiveTab] = useState(industries[0].id);
  const activeIndustry =
    industries.find((ind) => ind.id === activeTab) || industries[0];

  return (
    <section className="relative bg-[#06162d] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[450px] h-[450px] bg-[#08e5c0]/5 blur-[200px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Tailored Industry Workflows
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
            Engineered for the Unique Challenges of{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Your Industry
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Generic software setups fail because every industry operates
            differently. We design custom Zoho architectures and automations
            built around your exact operational realities.
          </p>
        </div>

        {/* Industry Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Industry solutions">
          {industries.map((ind) => {
            const isActive = ind.id === activeTab;
            return (
              <button
                key={ind.id}
                id={`industry-tab-${ind.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`industry-panel-${ind.id}`}
                onClick={() => setActiveTab(ind.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#08e5c0] text-[#071831] shadow-[0_0_20px_#08e5c060] scale-105"
                    : "bg-white/[0.04] text-gray-300 border border-white/10 hover:border-[#08e5c0]/40 hover:text-white"
                }`}
              >
                {ind.icon}
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            id={`industry-panel-${activeIndustry.id}`}
            role="tabpanel"
            aria-labelledby={`industry-tab-${activeIndustry.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl p-8 sm:p-10 lg:p-12 bg-[#0B1C3D]/90 border border-[#08e5c0]/25 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#08e5c0]/10 text-[#08e5c0] border border-[#08e5c0]/20">
                  {activeIndustry.icon}
                  {activeIndustry.name} Solution
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activeIndustry.headline}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed">
                  {activeIndustry.desc}
                </p>

                {/* Features checklist */}
                <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                  {activeIndustry.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-[#08e5c0] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-200 leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Callout Box */}
              <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0e244d] to-[#071831] border border-[#08e5c0]/30 text-center flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-400 block mb-2">
                    Proven Impact
                  </span>
                  <div className="p-4 rounded-xl bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
                    <p className="text-sm sm:text-base font-bold text-[#08e5c0]">
                      {activeIndustry.metric}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Custom-built architecture delivered in weeks with complete
                    source code and zero monthly consulting retainers required.
                  </p>
                </div>

                <a
                  href="https://insyrge.zohobookings.com/#/4623360000000149002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm bg-[#08e5c0] text-[#071831] hover:shadow-[0_0_20px_#08e5c060] transition-all"
                >
                  Book Industry Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
