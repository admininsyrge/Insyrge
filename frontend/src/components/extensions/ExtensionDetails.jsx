"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ExtensionDetails({ extension }) {
  const pathname = usePathname();

  // All possible resource pages
  const allResources = [
    { key: "overView", label: "Overview", link: `/extensions/${extension.slug}/overview` },
    { key: "userGuide", label: "User Guide", link: `/extensions/${extension.slug}/user-guide` },
    { key: "adminGuide", label: "Admin Guide", link: `/extensions/${extension.slug}/admin-guide` },
    { key: "helpPage", label: "Help", link: `/extensions/${extension.slug}/help` },
    { key: "caseStudy", label: "Case Study", link: `/extensions/${extension.slug}/case-study` },
    { key: "termsAndConditions", label: "Terms & Conditions", link: `/extensions/${extension.slug}/terms` },
    { key: "privacyPolicy", label: "Privacy Policy", link: `/extensions/${extension.slug}/privacy-policy` },
  ];

  const resources = allResources.filter((r) => extension[r.key]);

  return (
    <div className="space-y-10">
      {/* HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full rounded-2xl overflow-hidden border border-[#1A2C55]/40 bg-black/20"
      >
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[420px]">
          <Image
            src={extension.image.url}
            alt={extension.title}
            fill
            sizes="(max-width: 1024px) 100vw, 75vw"
            priority
            className="object-cover object-center"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0E224B]/80 to-transparent" />
        </div>
      </motion.div>

      {/* DESCRIPTION */}
      {extension.longDescription && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div
            className="text-gray-300 text-lg leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: extension.longDescription }}
          />
        </motion.div>
      )}

      {/* RESOURCE TABS (Mobile-friendly inline) */}
      {resources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 6h12M3 12h12M6 3v12M12 3v12" stroke="#08e5c0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Resources &amp; Documentation
          </h3>
          <div className="resource-tabs">
            {resources.map((btn) => {
              const active = pathname.includes(btn.link);
              return (
                <Link
                  key={btn.key}
                  href={btn.link}
                  className={`resource-tab ${active ? "active" : ""}`}
                >
                  {btn.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* FEATURES */}
      {extension.features?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="pt-8 border-t border-white/10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#08e5c0] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#08e5c0]/10 flex items-center justify-center text-sm font-bold text-[#08e5c0]">✦</span>
            Key Features
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {extension.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card glass-card-hover p-6 group"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#08e5c0]/10 flex items-center justify-center text-sm font-bold text-[#08e5c0] border border-[#08e5c0]/20">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-[#08e5c0] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* BENEFITS */}
      {extension.benefits?.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#08e5c0] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#08e5c0]/10 flex items-center justify-center text-sm font-bold text-[#08e5c0]">★</span>
            Benefits at a Glance
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {extension.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card glass-card-hover p-6 group relative overflow-hidden"
              >
                {/* Accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#08e5c0] to-[#08e5c0]/20 rounded-full" />
                <div className="pl-4">
                  <h4 className="text-lg font-semibold text-white mb-1.5 group-hover:text-[#08e5c0] transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* CTA - INSTALL BUTTON */}
      {extension.link && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 mb-5 text-base">
            Ready to supercharge your workflow?
          </p>
          <a
            href={
              extension.link.startsWith("http")
                ? extension.link
                : `https://${extension.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 text-lg font-semibold rounded-full bg-[#08e5c0] text-[#0B1C3D] animate-ctaPulse hover:scale-105 transition-transform duration-300"
          >
            Install Now →
          </a>
        </motion.div>
      )}
    </div>
  );
}
