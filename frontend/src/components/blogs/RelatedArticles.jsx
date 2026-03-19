"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const RelatedArticles = ({ related }) => (
  <section className="bg-[#0A1735] py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-10">
        Related <span className="text-[#08e5c0]">Articles</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {related.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-[#122852] rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={r.image}
                alt={r.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-gray-400">January 5th, 2024</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default RelatedArticles;
