import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

/**
 * Robots.txt generation via Next.js App Router.
 * Produces /robots.txt automatically.
 *
 * - Allow indexing of all SEO-relevant pages
 * - Disallow result pages (query-dependent, personalised)
 * - Disallow the internal API proxy
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/states/", "/about", "/contact", "/privacy", "/terms", "/removal"],
        disallow: ["/search", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
