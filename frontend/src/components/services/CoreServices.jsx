"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CoreServices = ({ data, loading, error }) => {

  // // ✅ Loading State
  // if (loading) {
  //   return (

  //   );
  // }

  // ✅ Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F2555] text-red-400 text-lg text-center px-4">
        <div className="bars"></div>
        {error}
      </div>
    );
  }
  return (
    <section className="relative bg-[#061a33] py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[40%] h-[40%] bg-[#08e5c015] blur-[200px] rounded-full absolute top-0 left-[10%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
            What We Do
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Core{" "}
            <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
              Services
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            We help businesses streamline operations and maximize efficiency with
            expert Zoho implementations and custom technology solutions.
          </p>
        </div>

        {/* Cards */}
        {loading ? <div className="min-h-screen flex items-center justify-center text-lg animate-pulse">
          <div className="bars"></div>
        </div> :
          <div className="grid md:grid-cols-3 gap-8">
            {data.map((service) => (
              <Link key={service._id} href={`/services/${service.slug || ""}`}>
                <div
                  className="
                  group relative bg-[#0E1A35]/80 border border-[#1F2D4A]
                  rounded-2xl overflow-hidden transition-all duration-300
                  hover:border-[#08e5c0]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(8,229,192,0.12)]
                  cursor-pointer flex flex-col backdrop-blur-sm
                  min-h-[460px] md:min-h-[500px]
                "
                >
                  {/* Image */}
                  <div className="relative w-full flex-shrink-0 h-[180px] sm:h-[200px] md:h-[230px]">
                    <Image
                      src={service.image.url}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1A35] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 text-center relative flex flex-col flex-grow">

                    {/* Glow */}
                    <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#08e5c018] blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-2.5 tracking-wide group-hover:text-[#08e5c0] transition-colors duration-200">
                      {service.title}
                    </h3>

                    <div
                      className="text-sm text-gray-400 mb-5 line-clamp-3 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />

                    {service.button && (
                      <span
                        className="mt-auto inline-block px-6 py-2.5 rounded-full
                      bg-[#08e5c0] text-[#0B1C3D] font-semibold text-sm shadow-md
                      transition-all duration-200 hover:px-7"
                      >
                        Explore →
                      </span>
                    )}
                  </div>

                  {/* Top line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0] to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
              </Link>
            ))}
          </div>
        }

        {/* CTA */}
        {/* <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#08e5c0] font-medium hover:gap-3 transition-all duration-300 group"
          >
            View All Services
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CoreServices;