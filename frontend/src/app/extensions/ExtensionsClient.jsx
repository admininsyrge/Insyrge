"use client";

import ExtensionGrid from "@/components/extensions/ExtensionGrid";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function ExtensionsClient() {
  const { extensions, loading, error } = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0B1C3D] to-[#071831] text-white py-20 px-6 md:px-16 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[50%] h-[50%] bg-[#08e5c020] blur-[200px] rounded-full absolute -top-20 left-[10%]" />
        <div className="w-[35%] h-[35%] bg-[#07d6b015] blur-[180px] rounded-full absolute bottom-20 right-[5%]" />
      </div>

      {/* Heading Section */}
      <section className="relative z-10 text-center mb-16">
        {/* Breadcrumb */}
        <nav className="breadcrumb justify-center mb-8">
          <Link href="/">Home</Link>
          <span className="separator">›</span>
          <span className="current">Extensions</span>
        </nav>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
          Powerful{" "}
          <span className="bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent">
            Zoho Extensions
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Enhance your Zoho experience with our custom-built, efficient, and
          seamless integrations designed to supercharge your business workflows.
        </p>

        {/* Extension count */}
        {!loading && extensions?.length > 0 && (
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[#08e5c0]/10 text-[#08e5c0] border border-[#08e5c0]/20">
              <span className="w-2 h-2 rounded-full bg-[#08e5c0] animate-pulseGlow" />
              {extensions.length} Extensions Available
            </span>
          </div>
        )}
      </section>

      {/* Extensions Grid / Loader / Error */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="bars"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20 glass-card max-w-md mx-auto p-8">
            <p className="text-lg font-medium mb-2">Something went wrong</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        ) : extensions?.length > 0 ? (
          <ExtensionGrid extensions={extensions} />
        ) : (
          <div className="text-center text-gray-400 py-20 glass-card max-w-md mx-auto p-8">
            <p className="text-lg">No extensions found.</p>
          </div>
        )}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#08e5c0]/40 to-transparent" />
    </main>
  );
}
