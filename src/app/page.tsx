import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { AdSlot } from "@/components/AdSlot";
import { US_STATES, FEATURED_STATES } from "@/lib/states";
import { AnimatedStatusWord } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

export const metadata: Metadata = {
  title: "Medical License Search – Free US Doctor License Lookup",
  description:
    "Instantly look up the license status of any US medical doctor or physician by license number and state. Covers all 50 states and Washington D.C. Free, public data. Always verify with state boards.",
  alternates: {
    canonical: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Medical License Search",
  url: SITE_URL,
  description:
    "Free public tool to verify US medical doctor license status by license number across all 50 states and Washington D.C.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?licenseNumber={licenseNumber}&state={state}`,
    },
    "query-input": [
      "required name=licenseNumber",
      "required name=state",
    ],
  },
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enter the License Number",
    description:
      "Enter the state-issued medical license number exactly as it appears on the certificate or board records. This is state-specific and issued by the individual state medical board.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Select Your State",
    description:
      "Choose the US state where the physician holds their license. Both the license number and state are required — medical licenses are state-specific and not transferable between states.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.5-4.667 3.5-8.077 0-5.523-4.477-10-10-10S2 6.727 2 12.25c0 3.41 1.556 6.064 3.5 8.077a19.583 19.583 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 14.25a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "View License Status",
    description:
      "Instantly see the provider's license status — Active, Inactive, Expired, Probation, or other — along with expiration date and a direct link to verify with the official state board.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const GENERAL_FAQS = [
  {
    q: "What is a medical license number?",
    a: "A medical license number is a unique identifier issued by each state medical board to a licensed physician. Unlike a federal NPI number, a license number is state-specific. It can typically be found on the physician's license certificate, displayed in their office, or retrieved from the state board's website.",
  },
  {
    q: "Where can I find a doctor's medical license number?",
    a: "License numbers are often printed on the physician's license certificate displayed in their office, available on the state medical board's public website via a name search, or listed in professional directories. Each state board offers a free name-based search on their official site.",
  },
  {
    q: "What does 'Active' license status mean?",
    a: "An 'Active' status means the provider's medical license is current and in good standing with the state board. It has not expired, been placed on probation, suspended, or revoked.",
  },
  {
    q: "How accurate and current is this data?",
    a: "Data is sourced from publicly available state medical board records and refreshed periodically. There may be a lag between a board action and when it reflects here. Always verify critical information directly with the state medical board.",
  },
  {
    q: "Can I use this for credentialing or hiring decisions?",
    a: "No. This site is intended for general informational purposes only. It must not be used as the sole source for any credentialing, employment, or clinical decision. Always verify credentials directly with the relevant state medical board and other primary source verification services.",
  },
  {
    q: "Is this site affiliated with any government agency or state board?",
    a: "No. Medical License Search is an independent public data aggregator. We are not affiliated with, endorsed by, or operated by any state medical board, government agency, or healthcare regulatory body.",
  },
];

export default function HomePage() {
  const featuredStateObjects = FEATURED_STATES.map(
    (slug) => US_STATES.find((s) => s.slug === slug)!
  ).filter(Boolean);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GENERAL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="border-b overflow-hidden"
        style={{ borderColor: "var(--strock-color)" }}
      >
        <AuroraBackground className="hero-section-gap h-auto w-full bg-white">
        <div className="container-default text-center relative z-10">
          {/* Subtitle with orange dot */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="subtitle-dot" />
            <span className="subtitle-text">Free · Public Data · No Account Required</span>
          </div>
          <h1 id="hero-heading">
            Look Up US Medical<br /> License Status
          </h1>
          <AnimatedStatusWord />
          <p className="max-w-xl mx-auto mb-10" style={{ color: "var(--gray-color)", fontSize: "18px" }}>
            Enter a physician&apos;s license number and state to instantly check
            their current medical license status across all 50 states and
            Washington&nbsp;D.C.
          </p>

          {/* Search form */}
          <div className="max-w-2xl mx-auto">
            <SearchForm />
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#ff5700]" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              All 50 States + D.C.
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#ff5700]" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Free to use
            </span>
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#ff5700]" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Public data only
            </span>
          </div>
        </div>
        </AuroraBackground>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="how-it-works-heading"
        className="section-gap"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <div className="container-default">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading">How It Works</h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--gray-color)", fontSize: "18px" }}>
              Checking a medical license status takes less than 30 seconds.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="flex flex-col p-6 bg-white border border-[#e4e4e4]"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="mb-4 h-12 w-12 flex items-center justify-center bg-[#fff4ee] text-[#ff5700]" style={{ borderRadius: "var(--radius)" }}>
                  {step.icon}
                </div>
                <div className="text-4xl font-bold text-[#e4e4e4] mb-2" style={{ fontFamily: "var(--heading-font)" }}>
                  {step.step}
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: "var(--heading-font)" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer banner ────────────────────────────────────────────── */}
      <section
        aria-label="Disclaimer"
        className="border-y py-5"
        style={{ backgroundColor: "#fffbeb", borderColor: "#fcd34d" }}
      >
        <div className="container-default text-center">
          <p style={{ fontSize: "14px", color: "#78350f" }}>
            <strong>Important Disclaimer:</strong> Medical License Search is an
            independent aggregator of publicly available data. We are not
            affiliated with any state medical board or government agency. Data
            may be outdated. <strong>Do not use this site as the sole source</strong>{" "}
            for credentialing, employment, or clinical decisions. Always verify
            directly with the relevant state medical board.
          </p>
        </div>
      </section>

      {/* ── Popular state lookups ────────────────────────────────────────── */}
      <section
        aria-labelledby="state-lookups-heading"
        className="section-gap bg-white"
      >
        <div className="container-default">
          <div className="text-center mb-10">
            <h2 id="state-lookups-heading">
              Popular State License Lookups
            </h2>
            <p className="mt-4" style={{ color: "var(--gray-color)", fontSize: "18px" }}>
              Find board information and FAQs for each state.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {featuredStateObjects.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="flex items-center justify-center text-center p-3 bg-white border border-[#e4e4e4] text-sm font-medium text-gray-700 hover:border-[#ff5700] hover:text-[#ff5700] transition-colors"
                style={{ borderRadius: "var(--radius)" }}
              >
                {state.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/states"
              className="text-[#ff5700] hover:underline text-sm font-medium"
            >
              View all 51 state &amp; D.C. lookups →
            </Link>
          </div>
        </div>
      </section>

      {/* ── General FAQs ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="faqs-heading"
        className="section-gap"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <div className="container-default">
          <div className="text-center mb-10">
            <h2 id="faqs-heading" style={{ letterSpacing: "-2px" }}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2">
            {GENERAL_FAQS.map((faq, i) => (
              <details
                key={i}
                className="faq-single-item group"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-medium text-[#1a1a1a] hover:bg-[whitesmoke] transition-colors list-none">
                  {faq.q}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 pt-1 text-sm text-gray-500">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <AdSlot position="between-faqs" />
          </div>
        </div>
      </section>

      {/* ── About / what is this tool ─────────────────────────────────────── */}
      <section
        aria-labelledby="about-tool-heading"
        className="section-gap bg-white border-t"
        style={{ borderColor: "var(--strock-color)" }}
      >
        <div className="container-default">
          <h2 id="about-tool-heading" className="mb-6">
            What Is Medical License Search?
          </h2>
          <div className="prose-content space-y-4 text-gray-500">
            <p>
              Medical License Search is a free, publicly accessible tool that
              lets anyone look up the license status of a US physician or
              healthcare provider using their state-issued medical license
              number. Our data is aggregated from publicly available state
              medical board records.
            </p>
            <p>
              Healthcare consumers, employers, insurers, and colleagues rely on
              tools like this for quick initial checks. Because data can lag
              behind official records,{" "}
              <strong>
                we strongly encourage users to confirm all information directly
                with the relevant state medical board
              </strong>{" "}
              before relying on it for any important decision.
            </p>
            <p>
              This site is independent, operates on public data, and is not
              affiliated with any government body, medical association, or
              healthcare board.
            </p>
            <p>
              <Link
                href="/about"
                className="font-medium underline hover:no-underline"
                style={{ color: "var(--primary-color)" }}
              >
                Learn more about this tool →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
