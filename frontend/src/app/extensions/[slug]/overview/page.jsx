import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";

async function getOverview(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/${slug}/overview`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Overview Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: "Overview",
    description: `Read the overview for ${slug.replace(/-/g, " ")} extension by Insyrge.`,
    alternates: {
      canonical: `https://insyrge.com/extensions/${slug}/overview`,
    },
  };
}

export default async function OverviewPage({ params }) {
  const { slug } = await params;
  const data = await getOverview(slug);

  if (!data) {
    notFound();
  }


  return (
    <article>
      <h2 className="text-2xl md:text-3xl font-bold text-[#08e5c0] mb-6">
        Overview
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
