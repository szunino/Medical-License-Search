/**
 * /states/[state] — Programmatic SEO landing page per US state.
 *
 * Generates a unique page for each state with:
 *  - State-specific headline and copy
 *  - Direct link to the state medical board
 *  - State FAQs with FAQPage JSON-LD
 *  - Internal links to other popular states
 *  - Search form pre-filtered to the state
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import {
  getStateBySlug,
  getAllStateSlugs,
  US_STATES,
  FEATURED_STATES,
  type StateInfo,
} from "@/lib/states";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ state: slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const stateInfo = getStateBySlug(slug);
  if (!stateInfo) return { title: "State Not Found" };

  const title = `${stateInfo.name} Medical License Lookup – Verify Doctor License`;
  const description = `Look up the medical license status of any physician licensed in ${stateInfo.name}. Enter their license number to check status via the ${stateInfo.boardName}. Free, public data.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/states/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/states/${slug}`,
    },
  };
}

// ─── State FAQ data ───────────────────────────────────────────────────────────

function buildStateFaqs(state: StateInfo) {
  return [
    {
      q: `How do I verify a doctor's license in ${state.name}?`,
      a: `To verify a physician's license in ${state.name}, you can use Medical License Search by entering their state-issued license number. For official verification, visit the ${state.boardName} directly at ${state.boardUrl}.`,
    },
    {
      q: `What is the ${state.boardName}?`,
      a: state.boardDescription,
    },
    {
      q: `What information does a ${state.name} medical license record show?`,
      a: `A ${state.name} license record typically shows the current license status (Active, Inactive, Expired, Probation, Suspended, or Revoked), the license expiration date, and the issuing board. For the most complete picture, consult the ${state.boardName} directly.`,
    },
    {
      q: `How often are ${state.name} medical license records updated?`,
      a: `The ${state.boardName} updates its records as board actions occur. Our aggregated data is refreshed periodically, but may lag behind official records. Always confirm the current status directly with the board.`,
    },
    {
      q: `What should I do if a ${state.name} physician's license shows as Suspended or Revoked?`,
      a: `If a physician's license shows as Suspended or Revoked, they are not legally permitted to practice medicine in ${state.name}. You should contact the ${state.boardName} to confirm, and consult with legal counsel if appropriate for your situation.`,
    },
    {
      q: `Can I search by name instead of license number for ${state.name} doctors?`,
      a: `Our tool requires a state-issued license number. If you only have the provider's name, visit the ${state.boardName} website directly — most state boards offer a free name-based search at their official site.`,
    },
  ];
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const stateInfo = getStateBySlug(slug);

  if (!stateInfo) notFound();

  const faqs = buildStateFaqs(stateInfo);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  // Other popular states for internal linking (exclude current)
  const relatedStates = FEATURED_STATES.filter((s) => s !== slug)
    .slice(0, 8)
    .map((s) => US_STATES.find((st) => st.slug === s)!)
    .filter(Boolean);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "States", href: "/states" },
    { label: stateInfo.name, href: `/states/${slug}` },
  ];

  return (
    <>
      <Script
        id={`faq-jsonld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section
        className="bg-white border-b hero-section-gap"
        style={{ borderColor: "var(--strock-color)" }}
      >
        <div className="container-default text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="subtitle-dot" />
            <span className="subtitle-text">{stateInfo.name} Medical License Lookup</span>
          </div>
          <h1 className="mb-6">
            Verify a Doctor&apos;s License<br /> in {stateInfo.name}
          </h1>
          <p className="max-w-xl mx-auto mb-10" style={{ color: "var(--gray-color)", fontSize: "18px" }}>
            Enter a physician&apos;s state-issued license number to instantly
            check their current license status via the {stateInfo.boardName}.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchForm defaultValues={{ state: stateInfo.name }} />
          </div>
        </div>
      </section>

      <div className="container-default py-10">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs crumbs={breadcrumbs} />
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          {/* Main content */}
          <div>
            {/* About the board */}
            <section aria-labelledby="board-info-heading" className="mb-10">
              <h2 id="board-info-heading" className="mb-4" style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
                About the {stateInfo.boardName}
              </h2>
              <div className="prose-content bg-white border p-6" style={{ borderColor: "var(--strock-color)", borderRadius: "var(--radius)" }}>
                <p>{stateInfo.boardDescription}</p>
                <p>
                  For authoritative, real-time license verification, always
                  check directly with the{" "}
                  <a
                    href={stateInfo.boardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {stateInfo.boardName}
                  </a>
                  .
                </p>
                <p>
                  Medical licenses in {stateInfo.name} are issued to physicians
                  (MD) and may also cover osteopathic physicians (DO) depending
                  on board structure. The license number and status are public
                  records and can be verified by anyone.
                </p>
              </div>

              {/* Board CTA */}
              <div className="mt-4">
                <a
                  href={stateInfo.boardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                  style={{ fontSize: "14px", padding: "10px 20px" }}
                >
                  Visit {stateInfo.boardName} Official Site
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="mb-8 border p-4" style={{ backgroundColor: "#fffbeb", borderColor: "#fcd34d", borderRadius: "var(--radius)", fontSize: "14px", color: "#78350f" }}>
              <strong>Disclaimer:</strong> The data displayed on this page is
              aggregated from publicly available records and may not reflect the
              most current license status. Medical License Search is not
              affiliated with the {stateInfo.boardName} or any government
              agency. <strong>Do not use this tool as the sole source</strong>{" "}
              for credentialing or hiring decisions.
            </div>

            {/* Ad between sections */}
            <div className="flex justify-center mb-8">
              <AdSlot position="between-faqs" />
            </div>

            {/* State FAQs */}
            <section aria-labelledby="state-faqs-heading" className="mb-10">
              <h2 id="state-faqs-heading" className="mb-4" style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
                {stateInfo.name} Medical License FAQs
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="faq-single-item group"
                  >
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium hover:bg-[whitesmoke] transition-colors list-none" style={{ color: "var(--dark-color)" }}>
                      {faq.q}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <p className="px-5 pb-4 pt-1 text-sm" style={{ color: "var(--gray-color)" }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related states */}
            <section aria-labelledby="related-states-heading">
              <h2 id="related-states-heading" className="mb-3" style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.3px", color: "var(--dark-color)" }}>
                Search Other States
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {relatedStates.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/states/${s.slug}`}
                    className="px-3 py-2 bg-white border text-sm font-medium text-center transition-colors hover:border-[#ff5700] hover:text-[#ff5700]"
                    style={{ borderColor: "var(--strock-color)", color: "var(--dark-color)", borderRadius: "var(--radius)" }}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <div className="mt-3">
                <Link
                  href="/states"
                  className="text-sm underline hover:no-underline"
                  style={{ color: "var(--primary-color)" }}
                >
                  View all states →
                </Link>
              </div>
            </section>
          </div>

          {/* Right rail */}
          <aside aria-label="Advertisements" className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <AdSlot position="right-rail" />

              {/* Quick board link card */}
              <div className="border p-5" style={{ backgroundColor: "#fff4ee", borderColor: "#ffd0b0", borderRadius: "var(--radius)" }}>
                <h3 className="font-semibold mb-2" style={{ fontSize: "14px", color: "var(--dark-color)" }}>
                  Official Board Website
                </h3>
                <p className="mb-3" style={{ fontSize: "12px", color: "#b83f00" }}>
                  {stateInfo.boardName}
                </p>
                <a
                  href={stateInfo.boardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button"
                  style={{ fontSize: "12px", padding: "8px 16px", display: "flex", justifyContent: "center" }}
                >
                  Verify at Official Source
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
