import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";

async function getHelpPage(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/${slug}/help`, {
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Help Page Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: "Help & Support",
    description: `Help page for ${slug.replace(/-/g, " ")} extension by Insyrge.`,
    alternates: {
      canonical: `https://insyrge.com/extensions/${slug}/help`,
    },
  };
}

export default async function HelpPage({ params }) {
  const { slug } = await params;
  const data = await getHelpPage(slug);

  if (!data) {
    notFound();
  }


  return (
    <article>
      <h2 className="text-2xl md:text-3xl font-bold text-[#08e5c0] mb-6">
        Help &amp; Support
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
