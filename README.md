# Medical License Search

A production-ready Next.js website for searching and verifying US medical provider license status. Covers all 50 states and Washington D.C.

**Domain:** www.medicallicensesearch.com

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Local Development Setup](#local-development-setup)
6. [Running Tests](#running-tests)
7. [Deployment (Vercel)](#deployment-vercel)
8. [API Integration Notes](#api-integration-notes)
9. [SEO Strategy](#seo-strategy)
10. [Ad Integration](#ad-integration)
11. [Legal & Compliance](#legal--compliance)

---

## Overview

Medical License Search lets anyone look up the license status of a US physician or healthcare provider by their **NPI (National Provider Identifier)** number. Results include license status, expiration date, and a direct link to the relevant state medical board for authoritative verification.

Key features:
- Nationwide coverage (50 states + D.C.)
- Server-side API proxy (API key never exposed to browsers)
- IP-based rate limiting
- First-visit Terms & Conditions modal with versioned localStorage consent
- Programmatic SEO pages for each state (51 pages)
- Full JSON-LD structured data (WebSite + SearchAction + FAQPage)
- Sitemap.xml and robots.txt auto-generated
- Ad slot placeholders (ready for Google AdSense or Mediavine)
- Accessibility-first (ARIA labels, skip-link, semantic HTML, keyboard nav)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Hosting | Vercel (zero-config) |
| Testing | Jest + Testing Library |
| Font | Inter (Google Fonts, preconnect) |

---

## Project Structure

```
medical-license-search/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: Header, Footer, TermsModal
│   │   ├── page.tsx                # Homepage with search, how-it-works, FAQs
│   │   ├── globals.css             # Tailwind base + custom utilities
│   │   ├── sitemap.ts              # Auto-generated /sitemap.xml
│   │   ├── robots.ts               # Auto-generated /robots.txt
│   │   ├── search/
│   │   │   └── page.tsx            # Search results page (SSR, shareable URL)
│   │   ├── states/
│   │   │   ├── page.tsx            # States index (/states)
│   │   │   └── [state]/
│   │   │       └── page.tsx        # Programmatic state pages (51 total)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── removal/page.tsx
│   │   └── api/
│   │       └── search/
│   │           └── route.ts        # Server-side API proxy
│   ├── components/
│   │   ├── AdSlot.tsx              # Ad placeholder component
│   │   ├── Breadcrumbs.tsx         # Breadcrumb nav + JSON-LD
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── SearchForm.tsx          # Main search form (client component)
│   │   ├── SearchResults.tsx       # Result card + FAQs
│   │   └── TermsModal.tsx          # First-visit consent modal
│   └── lib/
│       ├── apiClient.ts            # Typed API client
│       ├── rateLimit.ts            # In-memory IP rate limiter
│       ├── states.ts               # All 51 state data objects
│       └── validation.ts           # Input validation utilities
├── __tests__/
│   ├── apiProxy.test.ts            # API route handler tests
│   └── validation.test.ts          # Validation utility tests
├── .env.example                    # Environment variable template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `LICENSE_API_KEY` | **Yes** | — | Bearer token for the license data API |
| `LICENSE_API_BASE_URL` | No | `https://api.licensy.ai/v2` | Override the API base URL |
| `NEXT_PUBLIC_SITE_URL` | No | `https://www.medicallicensesearch.com` | Canonical site URL (used in sitemap, OG tags) |
| `RATE_LIMIT_MAX` | No | `20` | Max requests per IP per window |
| `RATE_LIMIT_WINDOW_SECONDS` | No | `60` | Rate limit window in seconds |

> **Security:** Never commit `.env.local`. The API key is only used server-side inside Next.js route handlers.

---

## Local Development Setup

### Prerequisites

- Node.js 20+ (recommend 22 LTS)
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd medical-license-search

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your LICENSE_API_KEY

# 4. Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Available Scripts

```bash
npm run dev      # Development server (hot reload)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npm run test     # Jest unit tests
```

---

## Running Tests

```bash
npm run test

# Or with coverage
npm run test -- --coverage

# Or in watch mode
npm run test -- --watch
```

Tests cover:
- Input validation (NPI format, state abbreviation, form validation)
- API proxy route handler (rate limiting, validation, error handling, success paths)

---

## Deployment (Vercel)

This project is configured for zero-config Vercel deployment.

### Steps

1. Push the repository to GitHub / GitLab / Bitbucket.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Add environment variables in **Project Settings → Environment Variables**:
   - `LICENSE_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.medicallicensesearch.com`)
4. Deploy. Vercel will auto-detect Next.js and configure the build.

### Custom Domain

Set `www.medicallicensesearch.com` as the production domain in **Project Settings → Domains** and add the CNAME records Vercel provides to your DNS provider.

### Edge / Serverless Functions

The `/api/search` route handler runs as a serverless function. The in-memory rate limiter works per function instance. For multi-region rate limiting at scale, replace `src/lib/rateLimit.ts` with an [Upstash Redis](https://upstash.com/) backed solution.

---

## API Integration Notes

### Endpoint Used

```
GET https://api.licensy.ai/v2/verify?npi={npi}&state={state}
Authorization: Bearer {LICENSE_API_KEY}
```

**Why this endpoint?**

The `/verify` endpoint accepts the **NPI (National Provider Identifier)** — a 10-digit universal identifier assigned by CMS to every US licensed healthcare provider. NPI was chosen over state-issued license numbers because:

1. **Universal:** A single NPI works across all 50 states and disciplines.
2. **Unambiguous:** State license numbers vary in format and are not unique across states.
3. **Publicly available:** NPIs are in the public CMS registry, making the search verifiable.
4. **API requirement:** The data provider's documented interface requires NPI as the primary key.

### Response Shape

```json
{
  "status": "active",
  "expires": "2026-12-31",
  "state": "CA"
}
```

The `apiClient.ts` normalizes this into a richer `LicenseRecord` shape, including the NPI from the query (not returned by the API), a normalized status string, and a `verifiedAt` timestamp.

### Caching

API responses are cached for 1 hour at the Next.js fetch layer (`next: { revalidate: 3600 }`), keeping UI "last verified" timestamps accurate while reducing upstream API calls.

---

## SEO Strategy

### Programmatic Pages

- **51 state landing pages** (`/states/[state]`) with unique copy, state board information, state-specific FAQs, and internal links.
- Each state page includes a `FAQPage` JSON-LD schema.

### Homepage Structured Data

- `WebSite` schema with `SearchAction` pointing to `/search?npi={npi}&state={state}`.
- `FAQPage` schema for general FAQs.

### Technical SEO

- Canonical URLs on all pages.
- Auto-generated `/sitemap.xml` (58 URLs: 7 static + 51 state pages).
- `/robots.txt` disallows `/search` (result pages) and `/api/`.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.).
- No unnecessary JavaScript on state/static pages (server components).

---

## Ad Integration

Ad slots are implemented as `<AdSlot position="..." />` placeholder components in `src/components/AdSlot.tsx`.

**Slot positions:**

| Position | Size | Location |
|---|---|---|
| `results-top` | 728×90 (leaderboard) | Above the results table |
| `right-rail` | 300×250 (medium rectangle) | Desktop sidebar on search page |
| `between-faqs` | 336×280 (large rectangle) | Between FAQ sections |
| `footer` | 728×90 | Above the footer (not yet placed) |

**To activate ads (e.g., Google AdSense):**

1. Replace the placeholder `<div>` inside each slot in `AdSlot.tsx` with your ad provider's `<ins>` or `<script>` tag.
2. Add the AdSense `<script>` tag to `src/app/layout.tsx`.
3. Ensure `ads.txt` is placed in `/public/ads.txt`.

---

## Legal & Compliance

This site implements the following legal/compliance features:

- **Terms & Conditions modal** — shown on first visit; consent stored in localStorage with version number (`mls_terms_consent`). Bump `TERMS_VERSION` in `TermsModal.tsx` to re-prompt after material changes.
- **Privacy Policy** (`/privacy`) — covers data collection, advertising, user rights, CCPA.
- **Terms of Use** (`/terms`) — full disclaimer, no-warranty clause, acceptable use.
- **DMCA / Removal Request** (`/removal`) — form for data correction/removal requests.
- **Footer disclaimer** — persistent reminder on every page.
- **Result card disclaimer** — per-result reminder to verify with state board.

The site does **not** use this data for credentialing decisions, does **not** store personal health information, and does **not** claim affiliation with any government or medical board.
