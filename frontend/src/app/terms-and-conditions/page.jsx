import Link from "next/link";
import { BASE_URL_USER } from "@/API";

const fallbackTerms = {
  title: "Terms & Conditions",
  content: `
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing the website at <a href="https://insyrge.com">https://insyrge.com</a>, engaging Insyrge ("we", "us", "our") for Zoho consulting, custom software development, API integration services, or installing our published Zoho Marketplace extensions, you agree to be bound by these Terms and Conditions.</p>

    <h2>2. Services & Engagements</h2>
    <p>Insyrge provides enterprise technology advisory, Zoho CRM and Zoho One implementation, Deluge custom functions, workflow automation, third-party API integration, and marketplace software solutions. Specific consulting deliverables, sprint timelines, and commercial terms are governed by written milestone agreements or statement of work (SOW) documents.</p>

    <h2>3. Client Intellectual Property Ownership</h2>
    <p>Clients retain 100% full intellectual property ownership of all custom Deluge code, bespoke workflows, database configurations, and proprietary software architectures developed specifically for their organization upon final payment. Insyrge does not lock clients into proprietary agency retainers or withhold system access.</p>

    <h2>4. Confidentiality & Non-Disclosure</h2>
    <p>Both parties agree to protect the confidentiality of all proprietary business, customer, and technical information shared during discovery and implementation. We routinely execute bilateral Non-Disclosure Agreements (NDAs) prior to accessing client CRM databases or source code.</p>

    <h2>5. Published Zoho Marketplace Extensions</h2>
    <p>Extensions published by Insyrge on the official Zoho Marketplace (such as <em>Hover Integration for Zoho CRM</em>, <em>Timeline Pro</em>, <em>One-Click PDF Export</em>, <em>Contact Roles Management</em>, and <em>Google Address Auto Complete</em>) are subject to their respective marketplace licensing terms and Zoho Corporation's developer standards.</p>

    <h2>6. Limitation of Liability</h2>
    <p>To the maximum extent permitted by applicable law, Insyrge shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of the use or inability to use our services or extensions. We conduct comprehensive sandbox testing and validation to minimize operational disruption prior to any production cutover.</p>

    <h2>7. Governing Law</h2>
    <p>These terms shall be governed by and construed in accordance with the laws of New South Wales, Australia, without regard to its conflict of law provisions.</p>

    <h2>8. Contact Us</h2>
    <p>If you have any questions regarding these Terms and Conditions, please contact us at:</p>
    <p><strong>Insyrge</strong><br />
    Email: <a href="mailto:contact@insyrge.com">contact@insyrge.com</a><br />
    Phone: +91-7973837217<br />
    Address: Unit 40, 8–10 Fourth Avenue, Blacktown, NSW 2148, Australia</p>
  `,
};

async function fetchTerms() {
  try {
    const res = await fetch(`${BASE_URL_USER}/terms-and-conditions`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackTerms;
    const json = await res.json();
    return json.data || fallbackTerms;
  } catch (error) {
    console.error("Terms Fetch Error, using fallback:", error);
    return fallbackTerms;
  }
}

import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Understand your rights, intellectual property ownership, and service agreements when working with Insyrge.",
  alternates: {
    canonical: "https://insyrge.com/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Insyrge",
    description:
      "Understand your rights, intellectual property ownership, and service agreements when working with Insyrge.",
    url: "https://insyrge.com/terms-and-conditions",
    siteName: "Insyrge",
    type: "website",
  },
};

const termsBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://insyrge.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Terms & Conditions",
      item: "https://insyrge.com/terms-and-conditions",
    },
  ],
};

export default async function TermsPage() {
  const data = await fetchTerms();

  return (
    <>
      <StructuredData data={termsBreadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0B1C3D] to-[#071831] text-white py-24 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#08e5c0]/10 blur-[180px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
              Service Governance
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {data.title || "Terms & Conditions"}
            </h1>
            <p className="text-gray-400 text-sm">
              Last Updated: September 2026 • Insyrge Consulting &amp; Software
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl bg-[#091e3b]/90 backdrop-blur-md">
            <div
              className="prose prose-invert max-w-none prose-headings:text-[#08e5c0] prose-a:text-[#08e5c0] leading-relaxed text-gray-300"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
