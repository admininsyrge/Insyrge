import axios from "axios";
import { BASE_URL_USER } from "@/API";

async function fetchTerms() {
  try {
    const res = await axios.get(`${BASE_URL_USER}/terms-and-conditions`, {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data.data;
  } catch (error) {
    console.error("Terms Fetch Error:", error);
    return null;
  }
}

export default async function TermsPage() {
  const data = await fetchTerms();

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white">
        <h1 className="text-2xl">Terms & Conditions Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1C3D] text-white py-24 px-6 md:px-20">
      {/* Page Heading */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent drop-shadow-lg">
          Terms & Conditions
        </h1>
        <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto opacity-80">
          Understand your rights, obligations, and the rules of using our
          services.
        </p>
      </div>

      {/* Content Container */}
      <div
        className="
          max-w-4xl mx-auto p-10 
          bg-[#101F44]/40 
          backdrop-blur-xl
          border border-[#1A2C55] 
          rounded-2xl 
          shadow-lg 
          shadow-[#00000040]
          animate-fadeIn
        "
      >
        {/* Divider Line */}
        <div className="border-b border-[#1A2C55] mb-10"></div>

        {/* Render Content */}
        {data.content && (
          <div
            className="prose prose-invert max-w-none leading-relaxed text-gray-300
                       prose-h1:text-[#08e5c0] prose-h2:text-[#08e5c0]
                       prose-h3:text-[#08e5c0] prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}
      </div>

      {/* Bottom spacing */}
      <div className="h-20" />

      {/* Fade In Animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.9s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
