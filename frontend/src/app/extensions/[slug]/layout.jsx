import Link from "next/link";
import { BASE_URL_USER, GET_EXTENSION } from "@/API";
import ResourceTabs from "@/components/extensions/ResourceTabs";

async function getExtension(slug) {
  try {
    const res = await fetch(`${BASE_URL_USER}/extension/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.status ? result.data : null;
  } catch (error) {
    console.error("Extension Fetch Error:", error);
    return null;
  }
}

async function getExtensionsList() {
  try {
    const res = await fetch(`${BASE_URL_USER}${GET_EXTENSION}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Extensions List Fetch Error:", error);
    return [];
  }
}

export default async function ExtensionSubPageLayout({ children, params }) {
  const { slug } = await params;

  const [extension, allExtensions] = await Promise.all([
    getExtension(slug),
    getExtensionsList(),
  ]);

  if (!extension) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0B1C3D] text-white">
        <div className="text-center animate-fadeInUp">
          <h1 className="text-4xl font-bold text-[#08e5c0] mb-4">
            Extension Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The extension you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/extensions"
            className="inline-block px-6 py-3 rounded-full bg-[#08e5c0] text-[#0B1C3D] font-semibold hover:shadow-[0_0_30px_#08e5c060] transition-all"
          >
            ← Back to Extensions
          </Link>
        </div>
      </main>
    );
  }

  // Build resource navigation from available pages
  const allResources = [
    { key: "overView", label: "Overview", path: "overview" },
    { key: "userGuide", label: "User Guide", path: "user-guide" },
    { key: "adminGuide", label: "Admin Guide", path: "admin-guide" },
    { key: "helpPage", label: "Help", path: "help" },
    { key: "caseStudy", label: "Case Study", path: "case-study" },
    {
      key: "termsAndConditions",
      label: "Terms & Conditions",
      path: "terms",
    },
    { key: "privacyPolicy", label: "Privacy Policy", path: "privacy-policy" },
  ];

  const availableResources = allResources.filter((r) => extension[r.key]);

  // Build sidebar list for the current resource type
  const sidebarExtensions = allExtensions.filter((ext) => {
    // Show extensions that have at least one resource page
    return allResources.some((r) => ext[r.key]);
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#071831] via-[#0B1C3D] to-[#071831] text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[50%] h-[40%] bg-[#08e5c020] blur-[200px] rounded-full absolute -top-20 -left-20" />
        <div className="w-[40%] h-[30%] bg-[#07d6b015] blur-[180px] rounded-full absolute bottom-20 right-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">
        {/* Breadcrumbs */}
        <nav className="breadcrumb mb-6 animate-fadeIn">
          <Link href="/">Home</Link>
          <span className="separator">›</span>
          <Link href="/extensions">Extensions</Link>
          <span className="separator">›</span>
          <Link href={`/extensions/${slug}`}>{extension.title}</Link>
        </nav>

        {/* Extension Title */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {extension.title}
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            {extension.description}
          </p>
        </div>

        {/* Resource Tabs */}
        {availableResources.length > 0 && (
          <div className="mb-10 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <ResourceTabs slug={slug} resources={availableResources} />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Content Area */}
          <div className="min-w-0 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
            <div className="glass-card p-6 sm:p-8 lg:p-10">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          {sidebarExtensions.length > 0 && (
            <aside
              className="hidden lg:block animate-slideInRight"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="glass-card p-5 sticky top-24">
                <h3 className="text-base font-semibold text-[#08e5c0] mb-4 flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="opacity-70"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="#08e5c0"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="1"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="#08e5c0"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="1"
                      y="9"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="#08e5c0"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="9"
                      y="9"
                      width="6"
                      height="6"
                      rx="1"
                      stroke="#08e5c0"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Other Extensions
                </h3>

                <ul className="space-y-2">
                  {sidebarExtensions.map((ext) => (
                    <li key={ext.slug}>
                      <Link
                        href={`/extensions/${ext.slug}`}
                        className={`block py-2.5 px-3 rounded-lg text-sm transition-all duration-300 ${
                          ext.slug === slug
                            ? "bg-[#08e5c0] text-[#0B1C3D] font-semibold shadow-[0_0_15px_#08e5c030]"
                            : "text-gray-300 hover:bg-[#101F44] hover:text-white"
                        }`}
                      >
                        {ext.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        {/* Mobile Sidebar (Collapsible) */}
        {sidebarExtensions.length > 0 && (
          <div className="lg:hidden mt-8">
            <details className="glass-card p-4">
              <summary className="text-[#08e5c0] font-semibold cursor-pointer flex items-center justify-between">
                <span>Other Extensions</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#08e5c0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <ul className="space-y-2 mt-4">
                {sidebarExtensions.map((ext) => (
                  <li key={ext.slug}>
                    <Link
                      href={`/extensions/${ext.slug}`}
                      className={`block py-2.5 px-3 rounded-lg text-sm transition-all duration-300 ${
                        ext.slug === slug
                          ? "bg-[#08e5c0] text-[#0B1C3D] font-semibold"
                          : "text-gray-300 hover:bg-[#101F44]"
                      }`}
                    >
                      {ext.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}
      </div>
    </main>
  );
}
