"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BASE_URL } from "@/API";
import { usePathname } from "next/navigation";

export default function ExtensionDetails({ extension }) {
  const pathname = usePathname();

  // All possible resource pages (match ObjectId keys)
  const allResources = [
    {
      key: "overView",
      label: "Overview",
      link: `/extensions/${extension.slug}/overview`,
    },
    {
      key: "userGuide",
      label: "User Guide",
      link: `/extensions/${extension.slug}/user-guide`,
    },
    {
      key: "adminGuide",
      label: "Admin Guide",
      link: `/extensions/${extension.slug}/admin-guide`,
    },
    {
      key: "helpPage",
      label: "Help Page",
      link: `/extensions/${extension.slug}/help`,
    },
    {
      key: "caseStudy",
      label: "Case Study",
      link: `/extensions/${extension.slug}/case-study`,
    },
    {
      key: "termsAndConditions",
      label: "Terms & Conditions",
      link: `/extensions/${extension.slug}/terms`,
    },
    {
      key: "privacyPolicy",
      label: "Privacy Policy",
      link: `/extensions/${extension.slug}/privacy-policy`,
    },
  ];

  // Only pages that exist in DB
  const resources = allResources.filter((r) => extension[r.key]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0A1F45] to-[#071831] text-white py-16 px-4 md:px-20 relative overflow-hidden">
      {/* BG Glow Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[50%] h-[50%] bg-[#08e5c025] blur-[180px] rounded-full absolute top-0 left-5" />
        <div className="w-[40%] h-[40%] bg-[#07d6b025] blur-[160px] rounded-full absolute bottom-10 right-10" />
      </div>

      {/* HERO IMAGE (FULLY RESPONSIVE) */}
      <div className="flex justify-center my-6 md:my-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:w-10/12 rounded-3xl overflow-hidden shadow-2xl border border-[#1A2C55]/40 bg-black/20"
        >
          <div className="relative w-full h-[230px] sm:h-[320px] md:h-[530px]">
            <Image
              src={`${BASE_URL}/uploads/${extension.image}`}
              alt={extension.title}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
        {/* LEFT CONTENT */}
        <div className="space-y-12">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#08e5c0] drop-shadow-[0_0_16px_#08e5c055]"
          >
            {extension.title}
          </motion.h1>

          {/* DESCRIPTION */}
          <div
            className="text-gray-300 text-lg leading-relaxed max-w-3xl prose prose-invert"
            dangerouslySetInnerHTML={{ __html: extension.longDescription }}
          />

          {/* ================= MOBILE RESOURCES (now right after description) ================= */}
          {resources.length > 0 && (
            <div className="lg:hidden mt-8">
              <details className="bg-[#0E224B]/70 border border-[#1D315F]/60 rounded-xl p-4 shadow-lg">
                <summary className="text-[#08e5c0] text-lg font-semibold cursor-pointer flex justify-between">
                  Resources <span className="text-gray-300">▼</span>
                </summary>

                <div className="flex flex-col gap-3 mt-5">
                  {resources.map((btn, index) => {
                    const active = pathname.includes(btn.link);

                    return (
                      <a
                        key={index}
                        href={btn.link}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium text-center transition-all
                          ${
                            active
                              ? "bg-[#08e5c0] text-[#0B1C3D] border-[#08e5c0]"
                              : "bg-[#0B1C3D] border-[#1A2C55] text-gray-300 hover:bg-[#112555]"
                          }`}
                      >
                        {btn.label}
                      </a>
                    );
                  })}
                </div>
              </details>
            </div>
          )}

          {/* FEATURES */}
          {extension.features?.length > 0 && (
            <section className="pt-10 border-t border-white/10">
              <h2 className="text-3xl font-semibold text-[#08e5c0] mb-6">
                Key Features
              </h2>

              <ul className="space-y-6">
                {extension.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="p-6 rounded-xl bg-[#0E224B]/70 border border-[#1D315F]/60 hover:border-[#08e5c0]/50"
                  >
                    <h3 className="text-xl font-semibold text-[#08e5c0] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.li>
                ))}
              </ul>
            </section>
          )}

          {/* BENEFITS */}
          {extension.benefits?.length > 0 && (
            <section className="pt-12 border-t border-white/10">
              <h2 className="text-3xl font-semibold text-[#08e5c0] mb-6">
                Benefits at a Glance
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                {extension.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="p-6 rounded-xl bg-[#0E224B]/70 border border-[#1D315F]/60 hover:border-[#08e5c0]/50"
                  >
                    <h4 className="text-lg font-semibold text-[#08e5c0] mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-300">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* CTA - INSTALL BUTTON */}
          {extension.link && (
            <div className="text-center mt-12">
              <motion.a
                href={
                  extension.link.startsWith("http")
                    ? extension.link
                    : `https://${extension.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="px-12 py-4 text-lg font-semibold rounded-full bg-[#08e5c0] text-[#0B1C3D] shadow-[0_0_40px_#08e5c040]"
              >
                Install Now
              </motion.a>
            </div>
          )}
        </div>

        {/* ================= DESKTOP SIDEBAR ================= */}
        {resources.length > 0 && (
          <aside className="hidden lg:block sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-[#0E224B]/70 border border-[#1D315F]/60 shadow-xl backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-[#08e5c0] text-center mb-4">
                Resources
              </h3>

              <div className="flex flex-col gap-4">
                {resources.map((btn, index) => {
                  const active = pathname.includes(btn.link);

                  return (
                    <motion.a
                      key={index}
                      href={btn.link}
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-3 rounded-xl border text-sm text-center transition-all
                        ${
                          active
                            ? "bg-[#08e5c0] text-[#0B1C3D] border-[#08e5c0] shadow-[0_0_20px_#08e5c060]"
                            : "bg-[#0B1C3D] border-[#1A2C55] text-gray-200 hover:bg-[#112555]"
                        }`}
                    >
                      {btn.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </aside>
        )}
      </div>
    </main>
  );
}
