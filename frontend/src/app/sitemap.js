import { BASE_URL_USER, GET_EXTENSION } from "@/API";

export default async function sitemap() {
  const baseUrl = "https://insyrge.com";
  const now = new Date().toISOString();

  // ---------------------------------------------
  // 1. STATIC ROUTES
  // ---------------------------------------------
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/extensions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ---------------------------------------------
  // 2. DYNAMIC SERVICES
  // ---------------------------------------------
  let dynamicServices = [];
  try {
    const res = await fetch(`${BASE_URL_USER}/services-all`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    const services = result?.data || [];

    dynamicServices = services
      .filter((s) => s?.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || service.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));
  } catch (error) {
    console.error("📌 Services Sitemap Error:", error);
  }

  // ---------------------------------------------
  // 3. DYNAMIC BLOGS
  // ---------------------------------------------
  let dynamicBlogs = [];
  try {
    const res = await fetch(`${BASE_URL_USER}/blogs-all`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    const blogs = result?.data || [];

    dynamicBlogs = blogs
      .filter((b) => b?.slug)
      .map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt || blog.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("📌 Blogs Sitemap Error:", error);
  }

  // ---------------------------------------------
  // 4. DYNAMIC EXTENSIONS & SUB-PAGES
  // ---------------------------------------------
  let dynamicExtensions = [];
  try {
    const res = await fetch(`${BASE_URL_USER}${GET_EXTENSION}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    const extensions = result?.data || [];

    dynamicExtensions = extensions
      .filter((ext) => ext?.slug)
      .flatMap((ext) => {
        const slug = ext.slug;
        const extModified = ext.updatedAt || ext.createdAt || now;

        const baseEntry = {
          url: `${baseUrl}/extensions/${slug}`,
          lastModified: extModified,
          changeFrequency: "weekly",
          priority: 0.9,
        };

        const subpageKeys = [
          "overview",
          "user-guide",
          "admin-guide",
          "help",
          "case-study",
          "terms",
          "privacy-policy",
        ];

        const subpageEntries = subpageKeys.map((sub) => ({
          url: `${baseUrl}/extensions/${slug}/${sub}`,
          lastModified: extModified,
          changeFrequency: "monthly",
          priority: 0.6,
        }));

        return [baseEntry, ...subpageEntries];
      });
  } catch (error) {
    console.error("📌 Extension Sitemap Error:", error);
  }

  // ---------------------------------------------
  // 5. DYNAMIC PORTFOLIO / CASE STUDIES
  // ---------------------------------------------
  let dynamicProjects = [];
  try {
    const res = await fetch(`${BASE_URL_USER}/project-all`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    const projects = result?.data || [];

    dynamicProjects = projects
      .filter((p) => p?.slug)
      .map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: project.updatedAt || project.createdAt || now,
        changeFrequency: "monthly",
        priority: 0.7,
      }));
  } catch (error) {
    console.error("📌 Portfolio Sitemap Error:", error);
  }

  // ---------------------------------------------
  // 6. FINAL MERGE
  // ---------------------------------------------
  return [
    ...staticRoutes,
    ...dynamicServices,
    ...dynamicBlogs,
    ...dynamicExtensions,
    ...dynamicProjects,
  ];
}
