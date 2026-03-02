# CLAUDE.md — Medical License Search Project Rules

## Project Stack
- **Framework:** Next.js 15 App Router (TypeScript)
- **Styling:** Tailwind CSS + CSS custom properties (globals.css)
- **Fonts:** Instrument Sans (heading), Inter (body), Inter Tight (secondary) — loaded via Google Fonts in layout.tsx
- **Package manager:** npm
- **Dev server:** `npm run dev` (runs on http://localhost:3000)

## Design System — Always Follow

### CSS Variables (defined in globals.css)
```css
--primary-color:  #ff5700   /* orange — brand accent */
--dark-color:     #1a1a1a   /* near-black — headings, dark surfaces */
--gray-color:     grey      /* body text */
--bg-color:       whitesmoke /* page background */
--strock-color:   #e4e4e4   /* borders */
--white-color:    white
--heading-font:   "Instrument Sans", sans-serif
--body-font-one:  Inter, sans-serif
--body-font-two:  "Inter Tight", sans-serif
--radius:         1px        /* very sharp corners on inputs/cards */
```

### Typography Rules
- `h1`, `h2` (display): `font-weight: 400`, `letter-spacing: -4px`, `font-size: 60px`, `line-height: 0.95`
  - **Override required** for any h2 used as a UI/card heading (not a full-bleed section title): add explicit `letterSpacing` inline style (e.g. `-0.5px`)
  - Long phrases (e.g. "Frequently Asked Questions") at display size: use `letterSpacing: "-2px"` instead of `-4px`
- `h3`: `font-size: 24px`, `font-weight: 700`, `line-height: 30px`
- Body: `font-size: 20px`, `letter-spacing: -0.4px`, `line-height: 1.24`, `color: grey`

### Layout Classes (defined in globals.css — use these, not Tailwind equivalents)
- `.container-default` — max-width 940px, centered, responsive
- `.section-gap` — padding-top/bottom 120px (80px tablet, 60px mobile)
- `.hero-section-gap` — padding-top 120px, padding-bottom 80px
- `.subtitle-dot` + `.subtitle-text` — orange dot + label above hero headings
- `.primary-button` — pill shape (border-radius: 100px), `#343434` bg, orange hover
- `.hero-button` — pill shape (border-radius: 150px), scale(0.95) on hover
- `.nav-link` — grey text, orange hover
- `.faq-single-item` — white card with border, border-radius 16px
- `.prose-content` — styled prose for long-form content

### Brand Colors
- Primary: `#ff5700` (orange)
- Dark: `#343434` (buttons) / `#1a1a1a` (text/headings)
- Never use default Tailwind blue/indigo as primary

### Brand Assets
- Logo: `public/logo.png` (300×164px, orange caduceus on white)
- Favicon: `src/app/icon.png` (32×32px square)
- Use `next/image` (`<Image>`) for all images

## API
- **Endpoint:** `POST https://api.medicalsearch.licensy.ai/api/v1/medical/search-license-by-number/`
- **Auth:** `credential_key` in form body (from `LICENSE_API_KEY` env var)
- **Request body:** `License_Number`, `State`, `credential_key` (form-encoded)
- **Response:** `{ Full_Name, License_Type, License_Number, Status, Issued, Expired, State }`
- **Client:** `src/lib/apiClient.ts`

## Key Files
| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, Google Fonts, metadata, TermsModal |
| `src/app/globals.css` | All CSS variables, base styles, utility classes |
| `tailwind.config.ts` | Brand colors (orange scale), fonts, border-radius |
| `src/components/Header.tsx` | Sticky nav with logo + pill CTA |
| `src/components/Footer.tsx` | Dark footer with disclaimer banner |
| `src/components/SearchForm.tsx` | License number + state search form |
| `src/components/SearchResults.tsx` | Result card, no-results, error states |
| `src/lib/states.ts` | All 50 states + D.C. with board info |
| `src/lib/validation.ts` | License number validation, state name resolution |

## Coding Rules

### Do
- Use `.container-default` instead of `max-w-*xl mx-auto px-4`
- Use `.section-gap` / `.hero-section-gap` instead of `py-16`
- Use CSS variable inline styles: `style={{ color: "var(--primary-color)" }}`
- Use `borderRadius: "var(--radius)"` on inputs and generic cards
- Override `letterSpacing` on any h2/h3 used at small sizes inside components
- Add `timeZone: "UTC"` to all `toLocaleString` / `toLocaleDateString` calls (prevents hydration errors)
- Keep `suppressHydrationWarning` on `<body>` in layout.tsx

### Don't
- Don't use Tailwind `brand-*` classes (use inline CSS vars instead)
- Don't use `rounded-2xl`, `rounded-xl`, `rounded-lg` (use CSS var radius or explicit inline style)
- Don't use `max-w-3xl/4xl/5xl/7xl mx-auto` (use `.container-default`)
- Don't use `py-16`, `py-24` for sections (use `.section-gap`)
- Don't use `font-extrabold`, `font-bold`, `text-3xl` on h1/h2 (global CSS handles these)
- Don't use `transition-all`
- Don't override h1/h2 font-size or font-weight at display scale (global CSS is correct)

## Hydration
- Always add `timeZone: "UTC"` to date formatting in server components
- Keep `suppressHydrationWarning` on `<body>` — browser extensions inject attributes

## Deployment
- Host on **Vercel** (DreamHost shared hosting is incompatible with Next.js SSR)
- Domain DNS: point DreamHost → Vercel (CNAME `cname.vercel-dns.com`, A record for apex)
- Env vars needed on Vercel: `LICENSE_API_KEY`, `NEXT_PUBLIC_SITE_URL`
