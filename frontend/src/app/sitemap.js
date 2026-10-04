import { BASE_URL_USER, GET_EXTENSION } from "@/API";
import { unstable_cache } from "next/cache";
import { coreServices as fallbackServices } from "@/data/servicesData";
import { fallbackBlogs } from "@/data/blogsFallback";
import { fallbackExtensions } from "@/data/extensionsFallback";
import { portfolioFallback } from "@/data/portfolioFallback";

const getSitemapBlogs = unstable_cache(
  async () => {
    try {
      const res = await fetch(`${BASE_URL_USER}/blogs-all`, { cache: "no-store" });
      const result = await res.json();
      const blogs = result?.data || [];
      const list = blogs.length > 0 ? blogs : fallbackBlogs;
      return list
        .filter((b) => b?.slug)
        .map((b) => ({
          slug: b.slug,
          lastModified: b.updatedAt || b.createdAt || null,
        }));
    } catch {
      return fallbackBlogs.map((b) => ({
        slug: b.slug,
        lastModified: b.updatedAt || b.createdAt || null,
      }));
    }
  },
  ["sitemap-blogs"],
  { revalidate: 3600 }
);

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
    const services = result?.data?.length > 0 ? result.data : fallbackServices;

    dynamicServices = services
      .filter((s) => s?.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || service.createdAt || now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));
  } catch (error) {
    console.error("📌 Services Sitemap Error, using fallback:", error);
    dynamicServices = fallbackServices
      .filter((s) => s?.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      }));
  }

  // ---------------------------------------------
  // 3. DYNAMIC BLOGS
  // ---------------------------------------------
  let dynamicBlogs = [];
  try {
    const blogs = await getSitemapBlogs();
    dynamicBlogs = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.lastModified || now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("📌 Blogs Sitemap Error:", error);
  }

  // ---------------------------------------------
  // 4. DYNAMIC EXTENSIONS & VALID SUB-PAGES
  // ---------------------------------------------
  let dynamicExtensions = [];
  try {
    const res = await fetch(`${BASE_URL_USER}${GET_EXTENSION}`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    const extensions = result?.data?.length > 0 ? result.data : fallbackExtensions;

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

        // Only include subpages that actually exist on this extension record
        const resourceMap = [
          { key: "overView", path: "overview" },
          { key: "userGuide", path: "user-guide" },
          { key: "adminGuide", path: "admin-guide" },
          { key: "helpPage", path: "help" },
          { key: "caseStudy", path: "case-study" },
          { key: "termsAndConditions", path: "terms" },
          { key: "privacyPolicy", path: "privacy-policy" },
        ];

        const validSubpages = resourceMap
          .filter((resItem) => Boolean(ext[resItem.key]))
          .map((resItem) => ({
            url: `${baseUrl}/extensions/${slug}/${resItem.path}`,
            lastModified: extModified,
            changeFrequency: "monthly",
            priority: 0.6,
          }));

        return [baseEntry, ...validSubpages];
      });
  } catch (error) {
    console.error("📌 Extension Sitemap Error, using fallback:", error);
    dynamicExtensions = fallbackExtensions
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
        const resourceMap = [
          { key: "overView", path: "overview" },
          { key: "userGuide", path: "user-guide" },
          { key: "adminGuide", path: "admin-guide" },
          { key: "helpPage", path: "help" },
          { key: "caseStudy", path: "case-study" },
          { key: "termsAndConditions", path: "terms" },
          { key: "privacyPolicy", path: "privacy-policy" },
        ];
        const validSubpages = resourceMap
          .filter((resItem) => Boolean(ext[resItem.key]))
          .map((resItem) => ({
            url: `${baseUrl}/extensions/${slug}/${resItem.path}`,
            lastModified: extModified,
            changeFrequency: "monthly",
            priority: 0.6,
          }));
        return [baseEntry, ...validSubpages];
      });
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
    const projects = result?.data?.length > 0 ? result.data : portfolioFallback;

    dynamicProjects = projects
      .filter((p) => p?.slug)
      .map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: project.updatedAt || project.createdAt || now,
        changeFrequency: "monthly",
        priority: 0.7,
      }));
  } catch (error) {
    console.error("📌 Portfolio Sitemap Error, using fallback:", error);
    dynamicProjects = portfolioFallback
      .filter((p) => p?.slug)
      .map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: project.updatedAt || project.createdAt || now,
        changeFrequency: "monthly",
        priority: 0.7,
      }));
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

