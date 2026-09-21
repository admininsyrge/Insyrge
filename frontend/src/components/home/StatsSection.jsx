"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { Database, Cpu, Layers, CheckCircle2, ShieldCheck } from "lucide-react";

const stats = [
  {
    value: 9,
    suffix: "+",
    label: "Published Zoho Marketplace Apps",
    desc: "Live on marketplace.zoho.com",
    isCountable: true,
  },
  {
    value: 45,
    suffix: "+",
    label: "Zoho One Apps Supported",
    desc: "Complete ecosystem coverage",
    isCountable: true,
  },
  {
    value: 100,
    suffix: "%",
    label: "Custom Deluge & Code Ownership",
    desc: "You own 100% of your IP",
    isCountable: true,
  },
  {
    value: 0,
    suffix: " Downtime",
    label: "Migration & Cutover Protocol",
    desc: "Sandbox-gated deployments",
    isCountable: false,
    display: "Zero Downtime",
  },
  {
    value: 100,
    suffix: "%",
    label: "Mutual NDA Compliance",
    desc: "Strict client data confidentiality",
    isCountable: true,
  },
];

const ecosystemBadges = [
  "Zoho CRM",
  "Zoho One",
  "Zoho Creator",
  "Deluge Scripting",
  "Zoho Flow",
  "Zoho Desk",
  "Zoho Books",
  "Zoho Inventory",
  "Zoho Sign",
  "Zoho Analytics",
  "REST APIs & Webhooks",
  "OpenAI & LLMs",
];

function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const step = Math.max(1, Math.ceil(value / (duration * 60)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-[#06162d] text-white py-16 border-y border-[#08e5c0]/15 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[50%] h-[100%] bg-[#08e5c0]/5 blur-[220px] rounded-full absolute -left-[10%] top-0" />
        <div className="w-[40%] h-[100%] bg-[#00e0ff]/5 blur-[220px] rounded-full absolute -right-[10%] top-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* === Proof Metrics Grid === */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center lg:text-left p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#08e5c0]/30 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#08e5c0] to-[#00e0ff] mb-1 font-mono">
                {stat.isCountable ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </div>
              <div className="text-sm font-semibold text-white mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* === Zoho Ecosystem Integration Strip === */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <Layers className="w-4 h-4 text-[#08e5c0]" />
            <span>Supported Enterprise Ecosystem:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            {ecosystemBadges.map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#0b2142] text-gray-300 border border-white/10 hover:border-[#08e5c0]/50 hover:text-[#08e5c0] transition-colors duration-200"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
