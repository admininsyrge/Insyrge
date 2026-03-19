"use client";

import ExtensionGrid from "@/components/extensions/ExtensionGrid";
import { useUser } from "@/context/UserContext";

export default function ExtensionsClient() {
  const { extensions, loading, error } = useUser();

  return (
    <main className="min-h-screen bg-[#0B1C3D] text-white py-20 px-6 md:px-16 relative overflow-hidden">
      {/* === Futuristic background glow === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#08e5c040,transparent_70%), blur-3xl opacity-70" />

      {/* === Heading === */}
      <section className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Powerful <span className="text-[#08e5c0]">Zoho Extensions</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Enhance your Zoho experience with our custom-built, efficient, and
          seamless integrations.
        </p>
      </section>

      {/* === Extensions Grid / Loader / Error === */}
      <div className="relative z-10">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-lg animate-pulse">
            <div className="bars"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20">{error}</div>
        ) : extensions?.length > 0 ? (
          <ExtensionGrid extensions={extensions} />
        ) : (
          <div className="text-center text-gray-400 py-20">
            No extensions found.
          </div>
        )}
      </div>

      {/* === Bottom Glow === */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#08e5c044] to-transparent blur-2xl" />
    </main>
  );
}
