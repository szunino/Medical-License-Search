import Link from "next/link";
import Script from "next/script";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

/**
 * Accessible breadcrumb trail with JSON-LD BreadcrumbList structured data.
 * Renders a visually clean trail and injects schema.org markup for Google.
 */
export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${baseUrl}${crumb.href}`,
    })),
  };

  return (
    <>
      <Script
        id={`breadcrumb-jsonld-${crumbs.map((c) => c.label).join("-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-gray-700 font-medium truncate max-w-xs"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-[#ff5700]"
                    >
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true" className="select-none">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
