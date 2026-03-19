import axios from "axios";
import { BASE_URL_USER, GET_EXTENSION } from "@/API";

export default async function sitemap() {
  const baseUrl = "https://insyrge.com";

  // ---------------------------------------------
  // 1. STATIC ROUTES
  // ---------------------------------------------
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/blogs",
    "/portfolio",
    "/extensions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // ---------------------------------------------
  // 2. DYNAMIC ROUTES: EXTENSIONS
  // ---------------------------------------------
  let dynamicExtensions = [];

  try {
    const res = await axios.get(`${BASE_URL_USER}${GET_EXTENSION}`);
    const extensions = res.data?.data || [];

    dynamicExtensions = extensions.flatMap((ext) => {
      const slug = ext?.slug;

      return [
        {
          url: `${baseUrl}/extensions/${slug}`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/overview`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/user-guide`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/admin-guide`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/help`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/case-study`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/terms`,
          lastModified: new Date().toISOString(),
        },
        {
          url: `${baseUrl}/extensions/${slug}/privacy-policy`,
          lastModified: new Date().toISOString(),
        },
      ];
    });
  } catch (error) {
    console.error("📌 Extension Sitemap Error:", error);
  }

  // ---------------------------------------------
  // 3. FINAL MERGE
  // ---------------------------------------------
  return [...staticRoutes, ...dynamicExtensions];
}
