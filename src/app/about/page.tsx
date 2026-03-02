import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

export const metadata: Metadata = {
  title: "About Medical License Search",
  description:
    "Learn about Medical License Search — a free, independent tool for looking up US physician license status using publicly available state medical board data.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export default function AboutPage() {
  return (
    <div className="container-default py-10">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-6">About Medical License Search</h1>

      <div className="prose-content space-y-6">
        <section>
          <h2>What Is This Tool?</h2>
          <p>
            Medical License Search is a free, publicly accessible tool that
            lets anyone look up the medical license status of a US physician or
            healthcare provider by entering their state-issued{" "}
            <strong>medical license number</strong>. Our service aggregates
            data from publicly available state medical board records to provide
            a convenient starting point for license verification.
          </p>
        </section>

        <section>
          <h2>Who Uses This Tool?</h2>
          <ul>
            <li>
              <strong>Healthcare employers and staffing agencies</strong> — for
              initial screening of candidates (always followed by primary source
              verification)
            </li>
            <li>
              <strong>Credentialing coordinators</strong> — for quick reference
              during the credentialing workflow
            </li>
            <li>
              <strong>Patients and consumers</strong> — to check the general
              licensing status of a provider before a visit
            </li>
            <li>
              <strong>Insurance and compliance teams</strong> — for initial
              investigative checks
            </li>
            <li>
              <strong>Healthcare journalists and researchers</strong> — for
              public records research
            </li>
          </ul>
        </section>

        <section>
          <h2>How Does It Work?</h2>
          <p>
            When you enter a state-issued license number and select a state,
            our system queries a public-data aggregation layer that indexes
            state medical board records across all 50 US states and Washington
            D.C. The result shows the current license status, expiration date,
            and a direct link to the relevant state board for official
            verification.
          </p>
        </section>

        <section>
          <h2>Important Limitations</h2>
          <ul>
            <li>
              Data is aggregated from public sources and may lag behind official
              records by hours, days, or in rare cases longer.
            </li>
            <li>
              Not all board actions are immediately reflected in our database.
            </li>
            <li>
              This tool does not constitute primary source verification (PSV) as
              defined by The Joint Commission or NCQA.
            </li>
            <li>
              Results should never be used as the sole basis for credentialing,
              hiring, or clinical decisions.
            </li>
          </ul>
        </section>

        <section>
          <h2>Data Sources and Updates</h2>
          <p>
            License status information is sourced from official state medical
            board public records. Update frequency varies by state and data
            provider. Each result displays a &ldquo;Verified at&rdquo; timestamp
            indicating when that record was last fetched.
          </p>
        </section>

        <section>
          <h2>Affiliation Disclaimer</h2>
          <p>
            Medical License Search is <strong>not affiliated</strong> with any
            state medical board, the American Medical Association, the American
            Board of Medical Specialties, the Federation of State Medical
            Boards, CMS, or any other government or professional body. We are an
            independent information aggregator.
          </p>
        </section>

        <section>
          <h2>Data Removal or Corrections</h2>
          <p>
            If you believe information about yourself or another individual is
            incorrect, or if you wish to submit a removal request, please visit
            our{" "}
            <Link href="/removal" className="underline hover:no-underline" style={{ color: "var(--primary-color)" }}>
              DMCA / Data Removal Request
            </Link>{" "}
            page.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions, concerns, or feedback? Visit our{" "}
            <Link href="/contact" className="underline hover:no-underline" style={{ color: "var(--primary-color)" }}>
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
