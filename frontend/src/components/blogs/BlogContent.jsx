"use client";
import { motion } from "framer-motion";

const BlogContent = ({ blog }) => (
  <div className="space-y-12 leading-relaxed text-gray-300">
    {blog.content.map((section, i) => (
      <motion.section
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
      >
        <h2 className="text-2xl font-semibold text-[#08e5c0] mb-4">
          {section.heading}
        </h2>
        <p className="mb-4">{section.text}</p>

        {section.points && (
          <ul className="list-disc list-inside text-[#08e5c0] space-y-2">
            {section.points.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        )}
      </motion.section>
    ))}
  </div>
);

export default BlogContent;
