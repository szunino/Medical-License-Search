import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TermsModal } from "@/components/TermsModal";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.medicallicensesearch.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Medical License Search – Look Up US Doctor License Status",
    template: "%s | Medical License Search",
  },
  description:
    "Search and verify US medical doctor license status by license number across all 50 states and D.C. Free, public data aggregator. Always verify with state boards.",
  keywords: [
    "medical license search",
    "doctor license lookup",
    "physician license verification",
    "medical license number",
    "medical license status",
    "state medical board",
  ],
  authors: [{ name: "Medical License Search" }],
  creator: "Medical License Search",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Medical License Search",
    title: "Medical License Search – Look Up US Doctor License Status",
    description:
      "Free tool to verify US medical provider license status by license number. Covers all 50 states and D.C. Always verify with the official state board.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Medical License Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical License Search – Look Up US Doctor License Status",
    description:
      "Free tool to verify US medical provider license status across all 50 states.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "health",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff5700",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Skip-to-content for keyboard/screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* First-visit terms consent modal */}
        <TermsModal />

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
