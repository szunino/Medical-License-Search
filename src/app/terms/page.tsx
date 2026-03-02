import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Medical License Search. Read our full disclaimer, acceptable use policy, and data accuracy disclaimer before using this service.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

const LAST_UPDATED = "January 2025";
const TERMS_VERSION = "1.0";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Terms of Use", href: "/terms" },
];

export default function TermsPage() {
  return (
    <div className="container-default py-10">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-8">
        Last updated: {LAST_UPDATED} &bull; Version {TERMS_VERSION}
      </p>

      <div className="prose-content space-y-6">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Medical License Search (the &ldquo;Site&rdquo;)
            at www.medicallicensesearch.com, you agree to be bound by these Terms
            of Use (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
            please do not use this Site. Your continued use of the Site constitutes
            acceptance of any updates to these Terms.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            Medical License Search provides a free, publicly accessible interface
            for looking up US medical provider license status information
            aggregated from publicly available state medical board records. The
            Site uses the state-issued medical license number as the primary search key.
          </p>
        </section>

        <section>
          <h2>3. No Affiliation with Government Bodies</h2>
          <p>
            This Site is <strong>not affiliated with</strong>, endorsed by, or
            operated by any state medical board, the Federation of State Medical
            Boards, the American Medical Association, the American Board of
            Medical Specialties, the Centers for Medicare &amp; Medicaid Services
            (CMS), or any other government or professional organization.
          </p>
        </section>

        <section>
          <h2>4. Disclaimer of Warranties</h2>
          <p>
            THE SITE AND ALL INFORMATION PROVIDED THROUGH IT ARE OFFERED
            &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY
            OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            ACCURACY, COMPLETENESS, OR NON-INFRINGEMENT.
          </p>
          <p>
            We do not guarantee that:
          </p>
          <ul>
            <li>The information is accurate, complete, or current</li>
            <li>The service will be uninterrupted or error-free</li>
            <li>The results will meet your requirements or expectations</li>
          </ul>
          <p>
            License status data may lag behind official records. Board actions
            including suspensions and revocations may not be immediately reflected.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
            MEDICAL LICENSE SEARCH, ITS OPERATORS, EMPLOYEES, OR AGENTS BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, ARISING OUT OF OR
            RELATED TO YOUR USE OF OR RELIANCE ON THE SITE OR ITS INFORMATION.
          </p>
        </section>

        <section>
          <h2>6. No Professional Advice</h2>
          <p>
            Nothing on this Site constitutes legal, medical, or professional
            advice. Information provided is for general informational purposes only.
          </p>
        </section>

        <section>
          <h2>7. Not for Sole-Source Credentialing</h2>
          <p>
            <strong>
              You must not use this Site as the sole or primary source for any
              credentialing, employment, clinical, or business decision.
            </strong>{" "}
            Primary source verification of medical licenses must be performed
            directly through the relevant state medical board or a recognized
            credentialing verification organization (CVO).
          </p>
        </section>

        <section>
          <h2>8. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>
              Use automated bots, scrapers, or crawlers to bulk-query the Site
              without prior written permission
            </li>
            <li>
              Use the Site to harass, defame, or harm any individual provider
            </li>
            <li>
              Attempt to circumvent rate limiting or other abuse controls
            </li>
            <li>
              Use the data for any illegal purpose, including discrimination
              in violation of applicable law
            </li>
            <li>
              Republish or resell data retrieved from this Site without attribution
              and without complying with all applicable laws
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Intellectual Property</h2>
          <p>
            The Site design, copy, and code are protected by copyright. Underlying
            license data is sourced from public government records and is not
            proprietary to us. You may reference individual lookup results for
            personal or professional use with appropriate credit.
          </p>
        </section>

        <section>
          <h2>10. Data Accuracy and Corrections</h2>
          <p>
            If you believe information displayed about a licensed provider is
            inaccurate, please submit a correction or removal request on our{" "}
            <a href="/removal">DMCA / Removal Request page</a>. We will review
            and address requests in a reasonable timeframe. We cannot correct
            errors in official board records; those must be addressed with the
            relevant board.
          </p>
        </section>

        <section>
          <h2>11. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Material changes will increment
            the version number above and will cause the terms acceptance prompt to
            re-appear for returning visitors.
          </p>
        </section>

        <section>
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the United States and the applicable laws of the state in
            which we operate, without regard to conflict-of-law principles.
          </p>
        </section>

        <section>
          <h2>13. Contact</h2>
          <p>
            Questions about these Terms? Contact us via our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
