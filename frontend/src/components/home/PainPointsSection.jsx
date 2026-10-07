"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Database,
  Unlink,
  Clock,
  PieChart,
  TrendingDown,
  Layers,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import CrmAssessmentModal from "@/components/common/CrmAssessmentModal";

const painPoints = [
  {
    icon: <Database className="w-5 h-5 text-rose-400" />,
    problem: "CRM Is Not Configured Correctly & Adoption Is Low",
    problemDesc:
      "Reps struggle with clunky default fields, irrelevant screens, and confusing layouts. Because the system creates friction, staff bypass the CRM and enter data inconsistently.",
    solution: "Tailored Architecture & Role-Based Blueprints",
    solutionDesc:
      "We design custom Zoho layouts, clean stage validations, and guided Blueprints that mirror your actual sales steps—making CRM adoption frictionless for your team.",
  },
  {
    icon: <Clock className="w-5 h-5 text-amber-400" />,
    problem: "Sales Teams Manually Following Up With Leads",
    problemDesc:
      "High-value inquiries arrive across website forms, ads, and referrals, but response times lag. Reps spend hours manually typing check-in emails, letting warm leads slip away.",
    solution: "Instant Speed-to-Lead Cadences & Automated Follow-Up",
    solutionDesc:
      "Automated lead intake flows directly into Zoho CRM with instant SMS/email confirmations, round-robin rep assignment, and automated multi-touch follow-up cadences.",
  },
  {
    icon: <Layers className="w-5 h-5 text-orange-400" />,
    problem: "Critical Operations Trapped in Spreadsheets",
    problemDesc:
      "Estimating, job tracking, pricing calculations, and client handoffs depend on fragile Excel and Google Sheets with zero version control or centralized visibility.",
    solution: "Centralized Workflow & Custom Modules",
    solutionDesc:
      "We migrate fragile spreadsheets into structured Zoho CRM modules and Zoho Creator apps, automating calculations, status transitions, and managerial approvals.",
  },
  {
    icon: <Unlink className="w-5 h-5 text-purple-400" />,
    problem: "Disconnected Systems & Duplicate Data Entry",
    problemDesc:
      "Your CRM, accounting software (QuickBooks/Xero), project management, and payment gateways operate in silos, requiring employees to retype the same data across multiple tools.",
    solution: "Bi-Directional API Sync & Ecosystem Integration",
    solutionDesc:
      "We build robust Deluge scripts, webhooks, and REST API connectors that sync client records, invoices, project files, and payments in real time with zero duplicate work.",
  },
  {
    icon: <PieChart className="w-5 h-5 text-red-400" />,
    problem: "Unreliable Reports & Executive Blind Spots",
    problemDesc:
      "Leadership cannot trust pipeline revenue forecasts because data is scattered. Generating monthly board reports requires days of manual data export and cleanup.",
    solution: "Automated Zoho Analytics & Executive Dashboards",
    solutionDesc:
      "Live KPI dashboards, sales velocity metrics, and automated management reports that deliver 100% visibility into pipeline health, rep performance, and revenue trends.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
    problem: "Complex CRM Migration & Unclear AI Opportunities",
    problemDesc:
      "Businesses want to leave expensive Salesforce/HubSpot contracts or leverage AI, but fear data loss, workflow disruption, and unproven AI hype.",
    solution: "Zero-Downtime Migration & Practical AI Workflows",
    solutionDesc:
      "Sandbox-gated data migration with 100% field integrity, paired with practical AI lead qualification agents and Zia OCR document processing that deliver measurable ROI.",
  },
];

export default function PainPointsSection() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <>
      <section className="relative bg-[#071831] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow - mobile GPU-friendly */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[500px] h-[500px] bg-rose-500/5 blur-[60px] sm:blur-[200px] rounded-full absolute top-10 -left-40 transform-gpu" />
          <div className="w-[500px] h-[500px] bg-[#08e5c0]/5 blur-[60px] sm:blur-[200px] rounded-full absolute bottom-10 -right-40 transform-gpu" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
              Operational Bottlenecks We Eliminate
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Your Business Doesn&apos;t Need More Disconnected Software.{" "}
              <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-[#08e5c0] bg-clip-text text-transparent">
                It Needs a Connected Operating System.
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Adding another subscription will not fix operational chaos. We engineer your lead capture, CRM pipeline, business workflows, and reporting into one cohesive, automated Zoho engine.
            </p>
          </div>

          {/* Pain Points vs Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {painPoints.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl p-6 bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/40 shadow-xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                {/* Problem Block */}
                <div className="mb-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      The Bottleneck
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.problem}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>

                {/* Solution Block */}
                <div className="pt-4 border-t border-white/10 mt-auto bg-[#08e5c0]/[0.03] -mx-6 -mb-6 p-6 rounded-b-2xl border-t-white/10 group-hover:bg-[#08e5c0]/[0.06] transition-colors">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#08e5c0] mb-2 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    The Insyrge Architecture Fix
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    {item.solution}
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {item.solutionDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#091e3b] border border-[#08e5c0]/25 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Recognize any of these bottlenecks in your current setup?
              </h4>
              <p className="text-gray-300 text-sm">
                Get an objective review of your CRM architecture, workflows, and integrations with zero obligation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsAssessmentOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <ClipboardCheck className="w-4 h-4 text-[#08e5c0]" />
                Get Free CRM Assessment
              </button>
              <a
                href="https://insyrge.zohobookings.com/#/4623360000000149002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-[#08e5c0] text-[#081b33] shadow-[0_0_20px_#08e5c050] hover:scale-105 transition-all"
              >
                Schedule Bottleneck Audit
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <CrmAssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />
    </>
  );
}
