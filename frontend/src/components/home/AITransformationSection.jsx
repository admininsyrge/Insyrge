"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  BrainCircuit,
  FileSearch,
  LineChart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const aiCapabilities = [
  {
    icon: <Bot className="w-5 h-5 text-[#08e5c0]" />,
    title: "Autonomous AI Customer & Sales Agents",
    desc: "AI agents trained on your proprietary product and service catalogs that automatically triage inbound tickets, qualify prospects, and schedule discovery meetings 24/7.",
  },
  {
    icon: <BrainCircuit className="w-5 h-5 text-[#00e0ff]" />,
    title: "Intelligent Lead Scoring & Intent Analysis",
    desc: "Machine learning algorithms that analyze email sentiments, website touchpoints, and CRM activity history to score leads and prompt sales reps when buyers are hottest.",
  },
  {
    icon: <FileSearch className="w-5 h-5 text-[#33ffd0]" />,
    title: "Automated Document OCR & Data Extraction",
    desc: "Extract structured line items directly from customer invoices, bills of lading, contracts, and medical forms straight into Zoho CRM fields with automated validation.",
  },
  {
    icon: <LineChart className="w-5 h-5 text-[#08e5c0]" />,
    title: "Predictive Cash Flow & Revenue Analytics",
    desc: "AI-driven forecasting models that predict quarterly close rates, pipeline slippage, customer churn probability, and inventory replenishment requirements.",
  },
];

export default function AITransformationSection() {
  return (
    <section className="relative bg-[#06162d] text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-[#08e5c0]/10 blur-[260px] rounded-full absolute -top-40 -right-40" />
        <div className="w-[500px] h-[500px] bg-[#00e0ff]/5 blur-[220px] rounded-full absolute -bottom-40 -left-40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Generation Enterprise AI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5">
            Supercharge Your CRM with{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] via-[#33ffd0] to-[#00e0ff] bg-clip-text text-transparent">
              Intelligent AI Workflows
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Move beyond static forms and rigid automation. We embed generative AI
            agents and cognitive data pipelines directly into your Zoho
            ecosystem to automate complex, decision-heavy business processes.
          </p>
        </div>

        {/* Visual + Capabilities Split Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Custom Generated AI Workflows Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#08e5c0] via-[#00e0ff] to-[#08e5c0] rounded-3xl blur-2xl opacity-25 animate-pulseGlow" />

              <div className="relative rounded-2xl overflow-hidden border border-[#08e5c0]/30 bg-[#0B1C3D] shadow-2xl">
                <Image
                  src="/images/ai-agent-workflows.jpg"
                  alt="AI Agents and Enterprise Intelligent Workflow Automation Architecture"
                  width={1200}
                  height={675}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* Status pill under image */}
              <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#08e5c0] animate-ping" />
                  Autonomous Agent Engine Running
                </span>
                <span className="text-[#08e5c0] font-bold">
                  OpenAI &amp; Claude 3.5 Sonnet Ready
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: AI Capabilities Cards */}
          <div className="lg:col-span-6 space-y-6">
            {aiCapabilities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0B1C3D]/80 border border-white/10 hover:border-[#08e5c0]/40 transition-all duration-300 backdrop-blur-md group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#08e5c0]/15 group-hover:border-[#08e5c0]/30 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#08e5c0] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="pt-4">
              <a
                href="https://insyrge.zohobookings.com/#/4623360000000149002"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm bg-[#08e5c0] text-[#071831] hover:shadow-[0_0_25px_#08e5c060] hover:scale-105 transition-all"
              >
                Explore AI Automation for Your Business
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
