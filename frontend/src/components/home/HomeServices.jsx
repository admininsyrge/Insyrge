"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Layers,
  Cpu,
  Unlink,
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle,
  FileText,
} from "lucide-react";
import CrmAssessmentModal from "@/components/common/CrmAssessmentModal";

const serviceOfferings = [
  {
    id: "zoho-crm",
    category: "Zoho Core",
    title: "Zoho CRM Consulting, Implementation & Customization",
    badge: "Primary Expertise",
    description:
      "Transform your sales cycle from chaotic spreadsheets into a high-converting revenue machine. As dedicated Zoho CRM consultants, we architect lead intake, deal stage blueprints, automated quoting, and executive forecasting dashboards.",
    keywords: ["Zoho CRM Consultant", "Zoho Implementation", "CRM Pipeline Setup", "Deluge Automation"],
    deliverables: [
      "Custom module architecture & field validation rules",
      "Automated lead scoring & round-robin assignment",
      "Visual sales pipelines & deal stage Blueprints",
      "Automated quote-to-invoice & e-signatures",
      "Executive KPI & conversion velocity dashboards",
    ],
    ctaText: "Get Zoho CRM Assessment",
    defaultGoal: "Zoho CRM Implementation & Customization",
    link: "/services/zoho-crm-implementation",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "zoho-one",
    category: "Zoho Core",
    title: "Zoho One Enterprise Architecture & Setup",
    badge: "All-in-One Suite",
    description:
      "Unify your entire operational ecosystem under a single operating system. We architect seamless multi-app synchronization across Zoho CRM, Books, Inventory, Desk, Sign, and Analytics to eliminate software fragmentation.",
    keywords: ["Zoho One Consultant", "Zoho One Setup", "Multi-App Architecture", "ERP Synchronization"],
    deliverables: [
      "End-to-end 45+ enterprise app unification",
      "Role-based permission architecture & security",
      "Zero-data-silo inventory & accounting pipelines",
      "Integrated customer support & ticketing workflows",
      "Consolidated multi-department BI reporting",
    ],
    ctaText: "Plan Zoho One Architecture",
    defaultGoal: "Zoho One Enterprise Architecture",
    link: "/services/business-process-technology-consulting",
    icon: <Layers className="w-6 h-6" />,
  },
  {
    id: "business-automation",
    category: "Automation & Process",
    title: "Business Process & Workflow Automation",
    badge: "High ROI",
    description:
      "Replace manual administrative bottlenecks and fragile spreadsheets with reliable, hands-off automation. We map your actual business processes and build automated triggers that save hundreds of hours monthly.",
    keywords: ["Process Automation", "Workflow Design", "Spreadsheet Replacement", "Operational Efficiency"],
    deliverables: [
      "End-to-end client onboarding automation",
      "Multi-level approval & escalation rules",
      "Automated document creation & file storage",
      "Cross-department handoffs (Sales → Ops → Finance)",
      "Proactive task reminders & client notifications",
    ],
    ctaText: "Identify Automation Opportunities",
    defaultGoal: "Business Process & Workflow Automation",
    link: "/services/business-process-technology-consulting",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "api-integrations",
    category: "Custom Engineering",
    title: "Zoho API & Third-Party Integrations",
    badge: "Bi-Directional Sync",
    description:
      "Connect Zoho seamlessly to your existing technology stack. We engineer fault-tolerant REST and GraphQL webhook connections with Stripe, QuickBooks, Xero, DocuSign, Shopify, ERPs, and legacy SQL databases.",
    keywords: ["Zoho API Integrations", "Deluge Scripting", "REST Webhooks", "Accounting Sync"],
    deliverables: [
      "Secure OAuth 2.0 authentication architecture",
      "Real-time bi-directional payload sync",
      "Automated payment gateway & ERP pipelines",
      "Webhook failover & error logging monitors",
      "Custom serverless functions & middleware",
    ],
    ctaText: "Discuss Your Integration",
    defaultGoal: "Zoho API & Third-Party Integrations",
    link: "/services/custom-extension-development",
    icon: <Unlink className="w-6 h-6" />,
  },
  {
    id: "ai-automation",
    category: "AI & Innovation",
    title: "AI + CRM Automation & Intelligent Agents",
    badge: "Next-Gen AI",
    description:
      "Supercharge your team's output with generative AI agents, intelligent document extraction (OCR), autonomous lead qualification, and predictive revenue analytics integrated directly into your Zoho CRM workflows.",
    keywords: ["AI CRM Automation", "Autonomous Agents", "Zia OCR Parsing", "Predictive Analytics"],
    deliverables: [
      "Autonomous 24/7 AI lead qualification agents",
      "Intelligent OCR parsing for invoices & contracts",
      "Predictive deal scoring & churn forecasting",
      "Automated CRM response drafting with LLMs",
      "Smart sentiment analysis on client communications",
    ],
    ctaText: "Explore AI Automation",
    defaultGoal: "AI + CRM Automation Solutions",
    link: "/services/ai-automation-solutions",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "solutions-architecture",
    category: "Strategy & Migration",
    title: "Solutions Architecture & CRM Migration",
    badge: "Zero Downtime",
    description:
      "Migrate safely from Salesforce, HubSpot, or legacy databases to Zoho with zero data loss and zero downtime. Our senior Solutions Architects design resilient data models and phased rollout blueprints.",
    keywords: ["CRM Migration", "Solutions Architecture", "Salesforce to Zoho", "HubSpot to Zoho"],
    deliverables: [
      "Complete data mapping & deduplication protocols",
      "Historical data sanitization & schema validation",
      "Sandbox-gated deployments & user acceptance testing",
      "Staff retraining & SOP documentation playbooks",
      "Post-migration governance & SLA support",
    ],
    ctaText: "Book Architecture Consultation",
    defaultGoal: "CRM Migration & Solutions Architecture",
    link: "/services/custom-app-development",
    icon: <Compass className="w-6 h-6" />,
  },
];

export default function HomeServices() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedServiceForModal, setSelectedServiceForModal] = useState("");
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const categories = ["All", "Zoho Core", "Automation & Process", "Custom Engineering", "AI & Innovation", "Strategy & Migration"];

  const filteredServices =
    activeCategory === "All"
      ? serviceOfferings
      : serviceOfferings.filter((s) => s.category === activeCategory);

  const handleOpenAssessment = (goal) => {
    setSelectedServiceForModal(goal);
    setIsAssessmentOpen(true);
  };

  return (
    <>
      <section className="relative bg-[#06172e] py-24 text-white overflow-hidden border-t border-[#08e5c0]/15">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#08e5c0]/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#4dffe4]/15 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4 font-mono">
              Core Commercial Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              Zoho CRM, Enterprise Architecture &amp;{" "}
              <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
                Business Automation
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              We focus on business and CRM outcomes first, technology second. From greenfield Zoho One architecture to advanced custom Deluge scripts, API integrations, and autonomous AI agents, we engineer resilient systems that eliminate operational drag.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
                      Key Deliverables:
                    </div>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#08e5c0] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: Semantic Keywords + Contextual CTA */}
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
                    <button
                      type="button"
                      onClick={() => handleOpenAssessment(service.defaultGoal)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#08e5c0] text-[#071831] font-bold text-xs shadow-sm hover:scale-[1.02] transition-all"
                    >
                      {service.ctaText}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
                Need a Custom Solution or Specialized System Architecture?
              </h4>
              <p className="text-gray-300 text-sm">
                We design custom Deluge algorithms, multi-system API pipelines, and private Zoho Marketplace extensions for complex enterprise workflows.
              </p>
            </div>
            <a
              href="https://insyrge.zohobookings.com/#/4623360000000149002"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-sm shadow-[0_0_20px_rgba(8,229,192,0.35)] hover:scale-105 transition-all whitespace-nowrap"
            >
              Talk to a Solutions Architect
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <CrmAssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        defaultService={selectedServiceForModal}
      />
    </>
  );
}
