"use client";
import { motion } from "framer-motion";
import React from "react";

import Image from "next/image";

const ResourcesSection = ({ data }) => {
  return (
    <section className="relative bg-[#081b33] text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-[#08e5c0]"
        >
          Latest Insights & Resources
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {data.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-[#0c2344] border border-[#08e5c033] rounded-2xl overflow-hidden hover:shadow-[0_0_20px_#08e5c033] transition-all"
            >
              {/* <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={220}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-6 text-left space-y-3">
                <h3 className="text-xl font-semibold text-[#08e5c0]">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="text-[#08e5c0] text-sm font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
