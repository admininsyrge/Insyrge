import Link from "next/link";
import { BASE_URL_USER } from "@/API";

const fallbackPrivacyPolicy = {
  title: "Privacy Policy",
  content: `
    <h2>1. Introduction & Overview</h2>
    <p>Insyrge ("Insyrge", "we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website at <a href="https://insyrge.com">https://insyrge.com</a>, engage our Zoho consulting and software engineering services, use our Zoho Marketplace extensions, or communicate with us.</p>

    <h2>2. Information We Collect</h2>
    <p>We may collect information that identifies, relates to, describes, or is capable of being associated with you:</p>
    <ul>
      <li><strong>Contact Information:</strong> Name, business email address, phone number, company name, job title, and physical address when you request a consultation, submit our contact form, or schedule a discovery meeting.</li>
      <li><strong>Project & Technical Data:</strong> Operational workflows, CRM module specifications, software requirements, and API integration targets provided during technical consultations.</li>
      <li><strong>Usage & Device Information:</strong> IP address, browser type, operating system, referring URLs, and page visit interactions via cookies and server logs.</li>
    </ul>

    <h2>3. How We Use Your Information</h2>
    <p>We use collected information to:</p>
    <ul>
      <li>Deliver professional Zoho consulting, custom software development, Deluge scripting, and integration services;</li>
      <li>Schedule and conduct discovery calls, system audits, and technical workshops;</li>
      <li>Respond directly to inquiries and support requests;</li>
      <li>Provide technical documentation and administrative guides for our published Zoho Marketplace extensions;</li>
      <li>Comply with legal obligations and enforce bilateral Non-Disclosure Agreements (NDAs).</li>
    </ul>

    <h2>4. Client Confidentiality & Mutual NDAs</h2>
    <p>We understand that our clients entrust us with mission-critical operational processes, customer data, and proprietary sales workflows. We routinely execute bilateral Non-Disclosure Agreements (NDAs) prior to accessing client CRM environments. All client data accessed during implementation is treated with strict confidentiality and stored in compliance with enterprise security standards.</p>

    <h2>5. Third-Party Subprocessors & Service Providers</h2>
    <p>We work with trusted enterprise cloud infrastructure and business tools to deliver our services, including:</p>
    <ul>
      <li><strong>Zoho Corporation:</strong> CRM, Bookings, Forms, Creator, and Analytics infrastructure;</li>
      <li><strong>Cloudflare & Vercel:</strong> Web hosting, content delivery, and DDoS mitigation;</li>
      <li><strong>HOVER Inc.:</strong> For clients deploying our authorized HOVER for Zoho CRM integration.</li>
    </ul>

    <h2>6. Data Security & Retention</h2>
    <p>We maintain appropriate physical, technical, and administrative safeguards designed to protect personal and business data against unauthorized access, destruction, loss, or alteration. We retain information only for as long as necessary to fulfill the purposes outlined in this policy or required by contractual agreement.</p>

    <h2>7. Your Privacy Rights</h2>
    <p>Depending on your jurisdiction (including Australia, the European Union, the United Kingdom, and various US states), you may have rights to access, correct, delete, or restrict the processing of your personal information. To exercise these rights, please contact us at <a href="mailto:contact@insyrge.com">contact@insyrge.com</a>.</p>

    <h2>8. Contact Information</h2>
    <p>For inquiries, privacy questions, or data protection matters, please contact:</p>
    <p><strong>Insyrge</strong><br />
    Email: <a href="mailto:contact@insyrge.com">contact@insyrge.com</a><br />
    Phone: +91-7973837217<br />
    Address: Unit 40, 8–10 Fourth Avenue, Blacktown, NSW 2148, Australia<br />
    Website: <a href="https://insyrge.com">https://insyrge.com</a></p>
  `,
};

async function fetchPrivacy() {
  try {
    const res = await fetch(`${BASE_URL_USER}/privacy`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallbackPrivacyPolicy;
    const json = await res.json();
    return json.data || fallbackPrivacyPolicy;
  } catch (error) {
    console.error("Privacy Policy Fetch Error, using fallback:", error);
    return fallbackPrivacyPolicy;
  }
}

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the Insyrge privacy policy to understand how your data is collected, used, and protected under strict enterprise standards.",
  alternates: {
    canonical: "https://insyrge.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Insyrge",
    description:
      "Read the Insyrge privacy policy to understand how your data is collected, used, and protected.",
    url: "https://insyrge.com/privacy-policy",
    siteName: "Insyrge",
    type: "website",
  },
};

const privacyBreadcrumbSchema = {
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
      name: "Privacy Policy",
      item: "https://insyrge.com/privacy-policy",
    },
  ],
};

import StructuredData from "@/components/seo/StructuredData";

export default async function PrivacyPolicyPage() {
  const data = await fetchPrivacy();

  return (
    <>
      <StructuredData data={privacyBreadcrumbSchema} />
      <div className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0B1C3D] to-[#071831] text-white py-24 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#08e5c0]/10 blur-[180px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#08e5c0] bg-[#08e5c0]/10 border border-[#08e5c0]/20 mb-4">
              Legal &amp; Compliance
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {data.title || "Privacy Policy"}
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

