"use client";
import { motion } from "framer-motion";

const cases = [
  {
    title: "EKLIPSE",
    category: "CRM Setup",
    image: "/images/cases/eklipse.jpg",
  },
  {
    title: "CANOPY",
    category: "Automation",
    image: "/images/cases/canopy.jpg",
  },
  {
    title: "PROMETIS",
    category: "Analytics",
    image: "/images/cases/prometis.jpg",
  },
  {
    title: "MEDIMIZER",
    category: "Workflow Optimization",
    image: "/images/cases/medimizer.jpg",
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-[#0B1C3D] py-20 text-white text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">
        Why Companies Choose <span className="text-[#08e5c0]">INSYRGE</span>
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {cases.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#10224D]/80 border border-[#08e5c0]/20 rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_25px_#08e5c040] transition-all"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-[#08e5c0] font-semibold text-lg">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
