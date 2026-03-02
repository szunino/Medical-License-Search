import type { Metadata } from "next";
import Link from "next/link";
import { US_STATES } from "@/lib/states";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

export const metadata: Metadata = {
  title: "Medical License Lookup by State – All 50 States + D.C.",
  description:
    "Browse medical license lookup guides for all 50 US states and Washington D.C. Find your state's medical board, verify physician licenses, and learn about local licensing requirements.",
  alternates: {
    canonical: `${SITE_URL}/states`,
  },
};

export default function StatesIndexPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "All States", href: "/states" },
  ];

  return (
    <div className="container-default py-10">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-3">Medical License Lookup – All States</h1>
      <p className="mb-8 max-w-2xl" style={{ color: "var(--gray-color)", fontSize: "16px" }}>
        Select a state to access the medical license lookup tool pre-filtered
        for that state, along with board information and FAQs specific to that
        jurisdiction.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {US_STATES.map((state) => (
          <Link
            key={state.slug}
            href={`/states/${state.slug}`}
            className="group flex flex-col p-4 bg-white border transition-colors hover:border-[#ff5700]"
            style={{ borderColor: "var(--strock-color)", borderRadius: "var(--radius)" }}
          >
            <span className="text-xl font-bold group-hover:text-[#ff5700]" style={{ color: "var(--primary-color)" }}>
              {state.abbr}
            </span>
            <span className="text-sm mt-1" style={{ color: "var(--dark-color)" }}>
              {state.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
