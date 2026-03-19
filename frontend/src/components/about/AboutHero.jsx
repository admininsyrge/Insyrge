"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const AboutHero = ({ data }) => {
  return (
    <section className="bg-[#0b1d39] text-white py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-gray-300 mb-6">{data.description}</p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary Button */}
            {/* <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              {data.button}
            </button> */}

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/manav-sharma-zoho-consultant/" // 🔗 replace with your LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0077B5] text-white px-5 py-3 rounded-lg font-medium hover:bg-[#0a66c2] transition"
            >
              {/* LinkedIn Icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.32 108 0 83.7 0 54a54 54 0 01108 0c0 29.7-24.3 54-54.16 54zM447.9 448h-92.68V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.8-43.8 31.1-2.3 5.5-2.9 13.1-2.9 20.8V448h-92.7s1.2-236.1 0-260.9h92.7v36.9c-.2.3-.4.6-.6.9h.6v-.9c12.3-18.9 34.2-45.8 83.4-45.8 60.9 0 106.6 39.8 106.6 125.2V448z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 blur-2xl  rounded-full" />
          <Image
            src={data.image}
            alt="About Hero"
            width={500}
            height={500}
            className="relative rounded-2xl "
          />
        </motion.div>
      </div>
    </section>
  );
};
