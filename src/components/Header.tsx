import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 bg-white border-b"
      style={{ borderColor: "var(--strock-color)" }}
    >
      <div className="container-default">
        <div className="flex items-center justify-between" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {/* Logo / brand */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="Medical License Search – home"
            style={{ textDecoration: "none" }}
          >
            <Image
              src="/logo.png"
              alt=""
              width={60}
              height={33}
              className="shrink-0"
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--heading-font)",
                color: "var(--dark-color)",
                fontWeight: 600,
                fontSize: "20px",
                letterSpacing: "-0.5px",
              }}
            >
              Medical License Search
            </span>
          </Link>

          {/* Navigation */}
          <nav aria-label="Main navigation" className="flex items-center gap-8">
            <ul className="hidden sm:flex items-center gap-6">
              <li>
                <Link href="/about" className="nav-link">About</Link>
              </li>
              <li>
                <Link href="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>

            {/* Primary CTA — pill button, dark #343434 */}
            <Link
              href="/"
              className="primary-button"
              style={{ fontSize: "14px", padding: "10px 20px" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              Search Licenses
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
