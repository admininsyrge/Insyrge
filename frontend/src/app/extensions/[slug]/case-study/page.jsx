import { BASE_URL_USER } from "@/API";

async function getCaseStudy(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/${slug}/case-study`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Case Study Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Case Study — ${slug.replace(/-/g, " ")} | Insyrge`,
    description: `Case study for ${slug.replace(/-/g, " ")} extension by Insyrge.`,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const data = await getCaseStudy(slug);

  if (!data) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-400 mb-4">
          Case Study Not Available
        </h2>
        <p className="text-gray-500">
          The case study for this extension hasn&apos;t been published yet.
        </p>
      </div>
    );
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
