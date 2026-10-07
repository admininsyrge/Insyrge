"use client";
import React from "react";
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
  UserX,
} from "lucide-react";

const painPoints = [
  {
    icon: <Database className="w-5 h-5 text-rose-400" />,
    problem: "Leads Coming From Multiple Sources",
    problemDesc:
      "Inquiries arrive across Google, website forms, Angi, phone calls, and referrals—getting scattered without centralized routing or speed-to-lead tracking.",
    solution: "Centralized Lead Intake & Routing",
    solutionDesc:
      "Every inquiry instantly flows into Zoho CRM, triggering instant SMS/email confirmations, round-robin rep assignments, and immediate alerts.",
  },
  {
    icon: <Clock className="w-5 h-5 text-amber-400" />,
    problem: "Sales Teams Updating CRM Manually",
    problemDesc:
      "Reps waste hours retyping customer details, statuses, and notes into spreadsheets instead of quoting jobs and closing deals.",
    solution: "1-Click Statuses & Automated Pipelines",
    solutionDesc:
      "Guided blueprints, deal stages, and auto-logging reduce rep data entry by 80%, giving management 100% pipeline visibility.",
  },
  {
    icon: <Unlink className="w-5 h-5 text-orange-400" />,
    problem: "Estimators Working in Separate Tools",
    problemDesc:
      "Measurement tools like HOVER, takeoff spreadsheets, and quoting apps operate completely detached from customer records.",
    solution: "Native Estimating & Takeoff Sync",
    solutionDesc:
      "We sync 3D CAD measurements, photo packs, and estimate totals directly into Zoho CRM Deal records with zero double handling.",
  },
  {
    icon: <PieChart className="w-5 h-5 text-purple-400" />,
    problem: "Documents Scattered in Email & Folders",
    problemDesc:
      "Signed contracts, insurance scope sheets, inspection photos, and permits live trapped in individual employee inboxes or shared drives.",
    solution: "Automated Zoho WorkDrive Hierarchy",
    solutionDesc:
      "Automatic customer and project folder creation in WorkDrive, linking contracts, photo galleries, and change orders directly to Deal records.",
  },
  {
    icon: <TrendingDown className="w-5 h-5 text-red-400" />,
    problem: "Field Crews Using Different Systems",
    problemDesc:
      "Office staff and field crews are constantly misaligned on schedule changes, material dropoffs, scope notes, and customer approvals.",
    solution: "Office-to-Field Unified Visibility",
    solutionDesc:
      "Mobile CRM, CompanyCam integrations, and automated job dispatches keep field techs and office project managers on the exact same page.",
  },
  {
    icon: <UserX className="w-5 h-5 text-yellow-400" />,
    problem: "Follow-Ups Falling on Employee Memory",
    problemDesc:
      "High-margin quotes go cold and existing customers are forgotten because follow-ups depend on whether an individual employee remembers.",
    solution: "Never-Miss Automated Follow-Up Sequences",
    solutionDesc:
      "Scheduled nurture workflows, task reminders, and automated check-ins trigger at strategic intervals until the customer responds.",
  },
];

export default function PainPointsSection() {
  return (
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
            The Reality of Contractor Operations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Your Business Doesn&apos;t Need More Software.{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-[#08e5c0] bg-clip-text text-transparent">
              It Needs a Connected System.
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Adding another subscription won&apos;t solve operational chaos. We connect
            your lead capture, estimating, field documentation, and customer communication
            into one cohesive Zoho operational backbone.
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    The Pain Point
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.problem}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.problemDesc}
                </p>
              </div>

              {/* Solution Block (Highlighted with cyan accent) */}
              <div className="pt-4 border-t border-white/10 mt-auto bg-[#08e5c0]/[0.03] -mx-6 -mb-6 p-6 rounded-b-2xl border-t-white/10 group-hover:bg-[#08e5c0]/[0.06] transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#08e5c0] mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  The Insyrge Fix
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

        {/* Bottom CTA Banner inside section */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Recognize any of these challenges in your business?
          </p>
          <a
            href="https://insyrge.zohobookings.com/#/4623360000000149002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#08e5c0] text-[#081b33] hover:shadow-[0_0_25px_#08e5c060] hover:scale-105 transition-all"
          >
            Schedule a Free Bottleneck Audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
