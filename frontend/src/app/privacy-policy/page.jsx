import axios from "axios";
import Link from "next/link";
import { BASE_URL_USER } from "@/API";

async function fetchPrivacy() {
  try {
    const res = await axios.get(`${BASE_URL_USER}/privacy`, {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data.data;
  } catch (error) {
    console.error("Privacy Policy Fetch Error:", error);
    return null;
  }
}

export const metadata = {
  title: "Privacy Policy | Insyrge Consultancy",
  description:
    "Read the Insyrge privacy policy to understand how your data is collected, used, and protected.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function PrivacyPolicyPage() {
  const data = await fetchPrivacy();

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white">
        <div className="text-center animate-fadeInUp">
          <h1 className="text-3xl font-bold text-[#08e5c0] mb-4">
            Privacy Policy Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            We couldn&apos;t load the privacy policy at this time.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-[#08e5c0] text-[#0B1C3D] font-semibold hover:shadow-[0_0_30px_#08e5c060] transition-all"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0B1C3D] to-[#071831] text-white py-24 px-6 md:px-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[40%] h-[40%] bg-[#08e5c015] blur-[200px] rounded-full absolute -top-20 left-[20%]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-8 animate-fadeIn">
          <Link href="/">Home</Link>
          <span className="separator">›</span>
          <span className="current">Privacy Policy</span>
        </nav>

        {/* Page Heading */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#08e5c0] to-[#4dffe4] bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your privacy matters. Learn how your data is collected, used and
            protected.
          </p>
        </div>

        {/* Content Container */}
        <div className="glass-card p-8 md:p-10 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
          {/* Accent line */}
          <div className="h-[2px] bg-gradient-to-r from-[#08e5c0]/40 via-[#08e5c0] to-[#08e5c0]/40 mb-8 rounded-full" />

          {/* Render Content */}
          {data.content && (
            <div
              className="prose prose-invert max-w-none leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
