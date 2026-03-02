import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Medical License Search — how we handle data, cookies, analytics, and your rights.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

const LAST_UPDATED = "January 2025";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function PrivacyPage() {
  return (
    <div className="container-default py-10">
      <div className="mb-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>

      <h1 className="mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

      <div className="prose-content space-y-6">
        <section>
          <h2>1. Overview</h2>
          <p>
            Medical License Search (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) operates the website at www.medicallicensesearch.com
            (the &ldquo;Site&rdquo;). We are committed to protecting the privacy
            of our users. This Privacy Policy explains what information we
            collect, how we use it, and your rights with respect to that
            information.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <h3>2.1 Information You Provide</h3>
          <p>
            When you use our search tool, you submit a medical license number
            and a state. We do not require you to create an account, log in,
            or provide any personally identifying information to perform a
            search.
          </p>
          <p>
            When you submit a contact form or removal request, we collect your
            name, email address, and the contents of your message.
          </p>
          <h3>2.2 Information Collected Automatically</h3>
          <ul>
            <li>
              <strong>Log data:</strong> Our servers automatically collect
              standard web server logs including IP address, browser type,
              referring URL, and pages visited. IP addresses are partially masked
              and used only for abuse prevention (rate limiting) and aggregate
              analytics.
            </li>
            <li>
              <strong>Cookies and localStorage:</strong> We store a small
              consent record in your browser&apos;s localStorage (not a cookie)
              to remember that you have agreed to our Terms of Use. We do not
              use tracking cookies for advertising profiling without your consent.
            </li>
            <li>
              <strong>Analytics:</strong> We may use privacy-respecting analytics
              (such as anonymized Google Analytics or Plausible Analytics) to
              understand aggregate usage patterns. No personal data is sold to
              analytics providers.
            </li>
          </ul>
          <h3>2.3 Information We Do NOT Collect</h3>
          <ul>
            <li>We do not collect medical records or health information about users.</li>
            <li>We do not sell personal data to third parties.</li>
            <li>We do not build profiles on individual users.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Information</h2>
          <ul>
            <li>To fulfill search requests and return license status data</li>
            <li>To detect and prevent abuse, fraud, or excessive automated queries</li>
            <li>To respond to contact and removal requests</li>
            <li>To improve the Site through aggregate analytics</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Advertising</h2>
          <p>
            This Site displays advertising to support its free operation. Ad
            providers (such as Google AdSense) may use cookies to serve
            interest-based advertisements. You can opt out of interest-based
            advertising via your browser settings or at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>
            . We do not sell your personal data to advertisers.
          </p>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>
            Search query logs are retained for up to 30 days for abuse
            prevention, then deleted. Contact form submissions are retained until
            the matter is resolved, then purged. LocalStorage consent records
            are stored in your own browser and can be cleared at any time.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct,
            or request deletion of any personal data we hold about you. To
            exercise these rights, contact us via the{" "}
            <a href="/contact">Contact</a> page. We will respond within 30 days.
          </p>
          <p>
            California residents may have additional rights under the CCPA. We
            do not sell personal information.
          </p>
        </section>

        <section>
          <h2>7. Third-Party Links</h2>
          <p>
            This Site links to state medical board websites and other external
            sources. We are not responsible for the privacy practices of those
            sites. Review each site&apos;s own privacy policy.
          </p>
        </section>

        <section>
          <h2>8. Security</h2>
          <p>
            We use HTTPS encryption, appropriate server-side security measures,
            and keep API credentials server-side only. No sensitive personal
            health information is collected or stored.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material
            changes will be reflected in the &ldquo;Last updated&rdquo; date at
            the top of this page.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Questions about this Privacy Policy? Contact us at the address on
            our <a href="/contact">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
