import axios from "axios";
import Link from "next/link";
import { BASE_URL_USER, GET_EXTENSION } from "@/API";

async function getCaseStudy(slug) {
  try {
    const res = await axios.get(`${BASE_URL_USER}/${slug}/case-study`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data.data;
  } catch (error) {
    console.error("Case Study Fetch Error:", error);
    return null;
  }
}

async function getExtensionsList() {
  try {
    const res = await axios.get(`${BASE_URL_USER}${GET_EXTENSION}`, {
      headers: { "Cache-Control": "no-store" },
    });
      const extensions = res.data.data || [];

    // 🔥 Filter only where caseStudy exists
    return extensions.filter((ext) => ext.caseStudy);
  } catch (error) {
    console.error("Extensions Fetch Error", error);
    return [];
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = params;

  const [data, extensions] = await Promise.all([
    getCaseStudy(slug),
    getExtensionsList(),
  ]);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white">
        <h1 className="text-2xl">Case Study Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1C3D] text-white py-20 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* SIDEBAR */}
        <aside className="md:col-span-1 bg-[#101F44]/60 border border-[#1A2C55] rounded-xl p-6 h-fit sticky top-20">
          <h3 className="text-xl font-semibold text-[#08e5c0] mb-4">
            Extensions
          </h3>

          <ul className="space-y-3">
            {extensions.map((ext) => (
              <li key={ext.slug}>
                <Link
                  href={`/extensions/${ext.slug}/case-study`}
                  className={`block py-2 px-3 rounded-lg transition-all duration-300 ${
                    ext.slug === slug
                      ? "bg-[#08e5c0] text-[#0B1C3D] font-semibold"
                      : "bg-[#101F44] text-gray-300 hover:bg-[#1A2C55]"
                  }`}
                >
                  {ext.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <section className="md:col-span-3">
          <h1 className="text-4xl font-bold text-[#08e5c0] mb-8">
            Case Study: {data.title}
          </h1>

          <div
            className="text-gray-300 mb-10 max-w-3xl leading-relaxed prose prose-invert"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </section>
      </div>
    </main>
  );
}
