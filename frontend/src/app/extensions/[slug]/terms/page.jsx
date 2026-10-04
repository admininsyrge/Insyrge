import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";

async function getTerms(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/${slug}/terms`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Terms Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: "Terms & Conditions",
    description: `Terms and conditions for ${slug.replace(/-/g, " ")} extension by Insyrge.`,
    alternates: {
      canonical: `https://insyrge.com/extensions/${slug}/terms`,
    },
  };
}

export default async function TermsPage({ params }) {
  const { slug } = await params;
  const data = await getTerms(slug);

  if (!data) {
    notFound();
  }


  return (
    <article>
      <h2 className="text-2xl md:text-3xl font-bold text-[#08e5c0] mb-6">
        Terms &amp; Conditions
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
