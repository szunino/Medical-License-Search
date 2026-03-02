import Link from "next/link";
import { US_STATES, FEATURED_STATES } from "@/lib/states";

/** Site-wide footer with navigation, state links, and legal links. */
export function Footer() {
  const year = new Date().getFullYear();
  const featuredStateObjects = FEATURED_STATES.map(
    (slug) => US_STATES.find((s) => s.slug === slug)!
  ).filter(Boolean);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Disclaimer banner */}
      <div className="bg-yellow-900/40 border-b border-yellow-700/30">
        <div className="container-default py-3">
          <p className="text-xs text-yellow-200 text-center">
            <strong>Disclaimer:</strong> Medical License Search aggregates
            publicly available data and makes no guarantee of accuracy,
            completeness, or currency. Information may be outdated. Always
            verify credentials directly with the relevant state medical board
            before making credentialing decisions.
          </p>
        </div>
      </div>

      <div className="container-default py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h2 className="text-white font-bold text-lg mb-3" style={{ letterSpacing: "-0.3px" }}>
              Medical License Search
            </h2>
            <p className="text-sm leading-relaxed">
              Free, public-facing tool for looking up US medical provider
              license status. We are not affiliated with any state medical
              board or government agency.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  License Search
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About This Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/removal"
                  className="hover:text-white transition-colors"
                >
                  Removal / DMCA Request
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/removal"
                  className="hover:text-white transition-colors"
                >
                  DMCA / Data Removal
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular state lookups */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Popular State Lookups
            </h3>
            <ul className="space-y-2 text-sm columns-2">
              {featuredStateObjects.map((state) => (
                <li key={state.slug}>
                  <Link
                    href={`/states/${state.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {year} Medical License Search. All rights reserved. This
            site is not affiliated with any government agency or state medical
            board.
          </p>
          <p>
            Data sourced from publicly available medical board records.
          </p>
        </div>
      </div>
    </footer>
  );
}
