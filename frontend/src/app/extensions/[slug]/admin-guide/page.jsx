import { notFound } from "next/navigation";
import { BASE_URL_USER } from "@/API";

async function getAdminGuide(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/${slug}/admin-guide`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Admin Guide Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: "Admin Guide",
    description: `Admin guide for ${slug.replace(/-/g, " ")} extension by Insyrge.`,
    alternates: {
      canonical: `https://insyrge.com/extensions/${slug}/admin-guide`,
    },
  };
}

export default async function AdminGuidePage({ params }) {
  const { slug } = await params;
  const data = await getAdminGuide(slug);

  if (!data) {
    notFound();
  }


  return (
    <article>
      <h2 className="text-2xl md:text-3xl font-bold text-[#08e5c0] mb-6">
        Admin Guide
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
