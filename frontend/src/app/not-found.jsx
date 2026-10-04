import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Wrench, Package, BookOpen, Briefcase, Mail } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      name: "Services & IT Solutions",
      href: "/services",
      icon: <Wrench className="w-5 h-5 text-[#08e5c0]" />,
      desc: "Enterprise Zoho CRM, Deluge development & cloud architecture",
    },
    {
      name: "Zoho Extensions",
      href: "/extensions",
      icon: <Package className="w-5 h-5 text-[#08e5c0]" />,
      desc: "Published Zoho Marketplace integrations & workflow plugins",
    },
    {
      name: "Case Studies & Portfolio",
      href: "/portfolio",
      icon: <Briefcase className="w-5 h-5 text-[#08e5c0]" />,
      desc: "Real-world contractor automation & operational results",
    },
    {
      name: "Articles & Knowledge Hub",
      href: "/blogs",
      icon: <BookOpen className="w-5 h-5 text-[#08e5c0]" />,
      desc: "Step-by-step CRM optimization & engineering guides",
    },
    {
      name: "Contact Our Team",
      href: "/contact",
      icon: <Mail className="w-5 h-5 text-[#08e5c0]" />,
      desc: "Book a free 45-minute discovery consultation",
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-[#071831] via-[#0B1C3D] to-[#071831] text-white px-6 py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#08e5c0]/15 blur-[220px] rounded-full absolute -top-40 -left-20" />
        <div className="w-[450px] h-[450px] bg-[#00e0ff]/10 blur-[200px] rounded-full absolute bottom-10 right-10" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/25 mb-6">
          Error 404 • Resource Not Found
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Explore our core sections below to find what you need.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#08e5c0] text-[#081b33] font-bold text-sm shadow-[0_0_25px_#08e5c050] hover:shadow-[0_0_35px_#08e5c080] hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
          >
            <Mail className="w-4 h-4 text-[#08e5c0]" />
            Get in Touch
          </Link>
        </div>

        {/* Quick Recovery Navigation Links */}
        <div className="text-left">
          <h2 className="text-xs uppercase tracking-wider font-mono text-[#08e5c0] mb-4 text-center">
            Popular Destinations
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-4 rounded-xl bg-[#0b2142]/80 border border-white/10 hover:border-[#08e5c0]/40 transition-all duration-300 flex items-start gap-3.5 hover:shadow-[0_0_20px_rgba(8,229,192,0.15)]"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0 group-hover:bg-[#08e5c0]/10 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#08e5c0] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
