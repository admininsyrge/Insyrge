"use client";
import { motion } from "framer-motion";

const content = [
  {
    icon: "/icons/youtube.svg",
    title: "YouTube Tutorials",
    desc: "Weekly Zoho videos and insights to help you grow smarter.",
  },
  {
    icon: "/icons/library.svg",
    title: "Knowledge Hub",
    desc: "Explore in-depth resources, case studies, and whitepapers.",
  },
  {
    icon: "/icons/newsletter.svg",
    title: "Zoho Newsletter",
    desc: "Stay updated with our latest innovations and tech stories.",
  },
];

export default function ContentHighlights() {
  return (
    <section className="bg-[#081A39] text-white py-20 text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        Did We Mention <span className="text-[#08e5c0]">Our Content?</span>
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {content.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-[#0E2555]/80 border border-[#08e5c0]/20 rounded-xl p-8 shadow-md hover:shadow-[0_0_25px_#08e5c040] transition-all"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-14 h-14 mx-auto mb-4"
            />
            <h3 className="text-[#08e5c0] font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
