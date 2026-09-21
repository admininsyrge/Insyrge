"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const processSteps = [
  {
    step: "01",
    phase: "Phase 1: Strategy",
    title: "Discovery Call",
    duration: "Day 1 (45 Min)",
    summary:
      "Deep-dive consultation to evaluate your existing operational stack, software friction, and growth bottlenecks.",
    deliverables: [
      "Process friction audit",
      "Software redundancy review",
      "Immediate ROI roadmap",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    step: "02",
    phase: "Phase 1: Strategy",
    title: "Requirement Analysis",
    duration: "Days 2 - 4",
    summary:
      "Granular documentation of sales workflows, field operations, API schemas, user roles, and data migration matrices.",
    deliverables: [
      "Functional specification document",
      "Data model mapping",
      "Compliance & security protocols",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    step: "03",
    phase: "Phase 1: Strategy",
    title: "Solution Design",
    duration: "Days 5 - 7",
    summary:
      "Architecting the complete Zoho ecosystem blueprint, Deluge function logic, custom widget UI/UX, and cloud sync paths.",
    deliverables: [
      "Interactive Zoho system blueprint",
      "API webhook sequence diagrams",
      "Sprint delivery timeline",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    step: "04",
    phase: "Phase 2: Execution",
    title: "Implementation",
    duration: "Weeks 2 - 4",
    summary:
      "Agile development of Zoho modules, custom Deluge scripts, automated blueprints, AI agents, and bi-directional API pipelines.",
    deliverables: [
      "Custom module deployment",
      "Deluge & webhook scripting",
      "Clean legacy data migration",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    step: "05",
    phase: "Phase 2: Execution",
    title: "Testing & Validation",
    duration: "Week 4",
    summary:
      "Rigorous end-to-end sandbox testing, data integrity stress tests, API failover simulations, and user acceptance testing (UAT).",
    deliverables: [
      "UAT scenario sign-off",
      "API latency & payload validation",
      "Security access testing",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "06",
    phase: "Phase 2: Execution",
    title: "Training & SOPs",
    duration: "Week 5",
    summary:
      "Role-based live training sessions, tailored video recordings, and comprehensive Standard Operating Procedure documentation.",
    deliverables: [
      "Recorded role-based workshops",
      "Interactive onboarding cheat-sheets",
      "Managerial reporting guides",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    step: "07",
    phase: "Phase 3: Launch",
    title: "Go Live",
    duration: "Scheduled Weekend",
    summary:
      "Zero-downtime production cutover, real-time sync activation, and active white-glove monitoring during launch day.",
    deliverables: [
      "Zero-downtime cutover plan",
      "Live data reconciliation check",
      "Launch day triage support",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    ),
  },
  {
    step: "08",
    phase: "Phase 3: Launch",
    title: "Continuous Support",
    duration: "Ongoing",
    summary:
      "Dedicated SLA support, quarterly system audits, continuous Deluge optimizations, and proactive scaling as your team expands.",
    deliverables: [
      "Guaranteed response time SLAs",
      "Quarterly performance reviews",
      "Ongoing AI & feature updates",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

export default function ProcessTimelineSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative bg-[#06172e] py-24 text-white overflow-hidden border-t border-b border-[#08e5c0]/15">
      {/* Background glow & subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-[#08e5c0]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-[#4dffe4]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            Proven Delivery Framework
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            The 8-Step Insyrge{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Implementation Engine
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            From initial operational discovery to enterprise-scale deployment and continuous SLA governance, our structured methodology eliminates friction, budget surprises, and project delays.
          </p>
        </div>

        {/* Desktop / Tablet Timeline Step Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {processSteps.map((item, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`relative p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-[#0d2a52] border-[#08e5c0] shadow-[0_0_20px_rgba(8,229,192,0.3)] ring-1 ring-[#08e5c0]"
                    : "bg-[#0a1f3d]/60 border-white/10 hover:border-[#08e5c0]/40 hover:bg-[#0a1f3d]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? "bg-[#08e5c0] text-[#071831]"
                        : "bg-white/10 text-gray-300"
                    }`}
                  >
                    {item.step}
                  </span>
                  <span
                    className={`text-xs ${
                      isActive ? "text-[#08e5c0]" : "text-gray-400"
                    }`}
                  >
                    {item.duration.includes("Min") ? "45m" : item.duration.split(" ")[0]}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-[#0b2142] border border-[#08e5c0]/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#08e5c0]/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#08e5c0]/15 text-[#08e5c0] flex items-center justify-center border border-[#08e5c0]/30">
                    {processSteps[activeStep].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#08e5c0] font-semibold">
                      Step {processSteps[activeStep].step} • {processSteps[activeStep].phase}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {processSteps[activeStep].title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  {processSteps[activeStep].summary}
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">
                    Guaranteed Deliverables for this Step:
                  </div>
                  {processSteps[activeStep].deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-[#08e5c0]/20 flex items-center justify-center flex-shrink-0 text-[#08e5c0]">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="https://insyrge.zohobookings.com/#/4623360000000149002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#08e5c0] text-[#071831] font-bold text-sm shadow-[0_0_20px_rgba(8,229,192,0.35)] hover:shadow-[0_0_30px_rgba(8,229,192,0.5)] transition-all hover:scale-105"
                  >
                    Start Step 1: Book Discovery Call
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActiveStep((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1))
                      }
                      className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() =>
                        setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))
                      }
                      className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-gray-300"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline Visual Progress Bar & Metrics */}
              <div className="lg:col-span-5 bg-[#081b35] p-6 rounded-xl border border-white/10">
                <div className="text-xs uppercase tracking-wider text-[#08e5c0] font-mono font-bold mb-4">
                  Project Timeline Roadmap
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Overall Project Progress</span>
                    <span className="text-[#08e5c0] font-bold">
                      {Math.round(((activeStep + 1) / processSteps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Expected Stage Duration:</span>
                      <span className="text-white font-mono font-semibold bg-white/10 px-2 py-0.5 rounded">
                        {processSteps[activeStep].duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Governance & Assurance:</span>
                      <span className="text-[#08e5c0] font-semibold">Senior Solution Architect Led</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Client Weekly Syncs:</span>
                      <span className="text-white font-semibold">Bi-Weekly 30m Demos</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Risk Assessment:</span>
                      <span className="text-emerald-400 font-semibold">Zero-Downtime Sandbox Gated</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 8-Step Grid Overview for Quick Scanning & SEO Crawlers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border transition-all duration-300 ${
                activeStep === idx
                  ? "bg-[#0b2142] border-[#08e5c0]/50"
                  : "bg-[#091d38] border-white/10 hover:border-[#08e5c0]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-mono font-extrabold text-[#08e5c0]">
                  {item.step}
                </span>
                <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                  {item.duration}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                {item.summary}
              </p>
              <div className="text-[11px] text-[#08e5c0] font-medium flex items-center gap-1">
                <span>Key output:</span>
                <span className="text-gray-300 truncate">{item.deliverables[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
