import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";

const HOVER_CASE_STUDY_FALLBACK = {
  title: "Case Study - Hover Integration for Zoho CRM",
  content: `
    <h3>Client Background</h3>
    <p>A mid-sized roofing and exterior contracting company in Canada was using Zoho CRM to manage sales deals and customer relationships. The company also relied on Hover to capture property measurements, photos, and design data for accurate estimates.</p>
    <h3>Challenge: Disconnected Field & Office Workflows</h3>
    <p>The client struggled with disconnected workflows. Hover jobs and photos had to be managed separately from CRM deals, leading to:</p>
    <ul>
      <li>Manual duplicate data entry into both Zoho CRM and HOVER.</li>
      <li>Missed updates when job measurements or specifications changed.</li>
      <li>Difficulties linking Hover photos and measurement PDFs with specific CRM deals.</li>
      <li>Delays in communicating with field inspection crews.</li>
    </ul>
    <h3>Solution: Insyrge HOVER Integration for Zoho CRM</h3>
    <p>To eliminate inefficiencies, the contractor deployed the Hover Integration for Zoho CRM built by Insyrge.</p>
    <ul>
      <li><strong>Automatic Module Creation:</strong> Hover Users and Hover Jobs modules synced directly into Zoho CRM.</li>
      <li><strong>Deal-Level Hover Portal:</strong> Enabled sales reps to trigger and manage Hover Jobs directly from the Deal record.</li>
      <li><strong>Automated Notifications:</strong> Job assignees automatically received email instructions and links to upload measurements and photos.</li>
      <li><strong>Document Sync:</strong> Photos, 3D measurements, and PDFs captured in Hover were automatically pulled into Zoho CRM under the associated Deal.</li>
    </ul>
    <h3>Verified Results & Operational Impact</h3>
    <ul>
      <li><strong>100% Elimination of Double Data Entry:</strong> Seamless two-way synchronization between HOVER and Zoho CRM.</li>
      <li><strong>3-4 Hours Saved Per Project Manager Weekly:</strong> Zero manual cross-referencing between separate platforms.</li>
      <li><strong>Rapid Field Handoff:</strong> Inspection jobs generated immediately upon Deal qualification.</li>
      <li><strong>Single Source of Truth:</strong> Every inspection report, photo, and measurement accessible right inside Zoho CRM.</li>
    </ul>
  `,
};

async function getCaseStudy(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/${slug}/case-study`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed fetch");
    const result = await res.json();
    if (result?.data?.content) return result.data;
    if (slug === "hover-integration-for-zoho-crm") return HOVER_CASE_STUDY_FALLBACK;
    return null;
  } catch (error) {
    console.error("Case Study Fetch Error:", error);
    if (slug === "hover-integration-for-zoho-crm") return HOVER_CASE_STUDY_FALLBACK;
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: "Case Study",
    description: `Case study for ${slug.replace(/-/g, " ")} extension by Insyrge.`,
    alternates: {
      canonical: `https://insyrge.com/extensions/${slug}/case-study`,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const data = await getCaseStudy(slug);

  if (!data) {
    notFound();
  }


  return (
    <article>
      <h2 className="text-2xl md:text-3xl font-bold text-[#08e5c0] mb-6">
        Case Study
      </h2>

      {data.content && (
        <div
          className="prose prose-invert max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </article>
  );
}
