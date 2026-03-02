import { MetadataRoute } from "next";
import { getAllStateSlugs } from "@/lib/states";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

/**
 * Next.js App Router sitemap generation.
 * Produces /sitemap.xml automatically.
 *
 * Includes:
 *  - Static routes (home, about, contact, privacy, terms, removal, states index)
 *  - All 51 state landing pages
 *
 * /search result pages are excluded (noindex — dynamic, personalised content).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/removal`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/states`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const stateRoutes: MetadataRoute.Sitemap = getAllStateSlugs().map((slug) => ({
    url: `${SITE_URL}/states/${slug}`,
    lastModified: today,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...stateRoutes];
}
