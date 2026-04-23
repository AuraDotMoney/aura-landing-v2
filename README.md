# Aura landing

Marketing site for [aura.money](https://aura.money) — the fastest, cheapest way to trade Hyperliquid and Polymarket.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · Framer Motion 12 · TypeScript.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

Node 20+ recommended.

## Structure

```
src/
  app/
    page.tsx                     # Landing (Hero + Markets + Features + FooterCTA)
    layout.tsx                   # Root metadata + Instrument Serif font
    globals.css                  # Sky gradient, glass utilities, .legal-prose, focus-visible
    api/markets/
      hl/route.ts                # Proxies Hyperliquid, merges main + HIP-3 xyz dex
      pm/route.ts                # Proxies Polymarket Gamma (CORS-restricted upstream)
    privacy-policy/page.tsx      # Legal — wrapped in LegalLayout
    terms-of-service/page.tsx    # Legal — wrapped in LegalLayout
    support/page.tsx             # Legal — wrapped in LegalLayout
  components/
    GlassNav.tsx                 # Floating pill nav, scroll-aware glass
    LegalLayout.tsx              # Shared chrome for legal pages
    MotionProvider.tsx           # MotionConfig reducedMotion="user"
    sections/
      Hero.tsx                   # Full-viewport hero with sky-photo bg
      Markets.tsx                # HL + PM live diptych, client-polled
      Features.tsx               # Fees comparison tile + 3 supporting tiles
      FooterCTA.tsx              # Closing CTA, socials, legal links
    ui/
      SectionShell.tsx           # Shared vertical rhythm + whileInView stagger
      GlassCard.tsx              # Glass panel (default | highlight tones)
      FeatureTile.tsx            # Icon + title + body, optional stat
      PrimaryCTA.tsx             # White-pill Launch App button
      icons.tsx                  # Inline SVG icon set
  lib/
    markets.ts                   # Client-side fetchers + URL helpers + fmt*
public/
  background.jpg                 # Desktop hero sky photo
  background-mobile.png          # Mobile hero sky photo
  logo.svg, x.svg, telegram.svg
  favicon.png, favicon.ico
```

## Live market data

The Markets section fetches in real time. Two thin Next.js route handlers sit in front of the upstreams:

| Route | Upstream | Revalidate | Purpose |
|---|---|---|---|
| `GET /api/markets/hl` | `POST https://api.hyperliquid.xyz/info` | 5s | Merges the **main dex** and the **HIP-3 `xyz` dex**, sorts by `dayNtlVlm`, returns the top 4 as `{ symbol, label, price, change24h, positive }` |
| `GET /api/markets/pm` | `GET https://gamma-api.polymarket.com/markets?order=volume24hr` | 20s | Proxy for Polymarket's Gamma API (no CORS headers upstream, so direct browser fetch doesn't work) |

The client (`Markets.tsx`) polls each route every 5s (HL) / 20s (PM), flashes green/red on price changes, and flips the live pill to an amber "Stale" state after two consecutive fetch failures.

### Trade links

Every row links to `https://trade.aura.money`. Deep-link support is stubbed pending confirmation of the app's URL scheme (see `hlTradeUrl` / `pmTradeUrl` in `src/lib/markets.ts`). When the scheme is known, it's a two-line change.

## Design language

- **Typography**: Instrument Serif (italic, via `next/font`) for display moments; SF Pro / system stack for body.
- **Palette**: sky gradient `#4BAAE6 → #2E8BC0 → #1E6FA3`, white at various alphas, zero off-palette greys. Red / green live only inside mocked tickers.
- **Glass**: two utility classes in `globals.css` — `.glass-surface` and `.glass-surface-highlight` — drive every panel, with a consistent upper-left light source and long soft shadow.
- **Motion**: one easing (`[0.23, 1, 0.32, 1]`). Reveal = fade + 30px rise via Framer's `whileInView`. Hover = `scale 1.02`, tap = `scale 0.97`. Respects `prefers-reduced-motion`.
- **Layout**: content column max-`1280px`, vertical section padding 80–128px desktop / 56–80px mobile.

## Legal pages

`privacy-policy`, `terms-of-service`, and `support` share `LegalLayout`. The original body HTML from privacy + terms is preserved — `.legal-prose` in `globals.css` forces white text on the glass card and overrides the hardcoded slate colours.

## Accessibility

- Global `:focus-visible` outline (2px white, 3px offset) on every interactive element.
- `prefers-reduced-motion: reduce` neutralises all transitions + the reveal stagger.
- Touch targets ≥ 48px on ticker rows and social icons.
- `title={question}` on Polymarket rows so truncated market text is accessible to screen readers.

## Deployment

The repo is wired to Vercel. Pushing to `main` promotes to production (`aura.money`). Pushing to any other branch gets a Vercel preview URL.

## Known follow-ups

- Deep-link URL scheme for market rows (currently all go to the app's entry point).
- Pre-existing lint errors in the legal pages (`react/no-unescaped-entities`) — content-author-owned, untouched here.
- Copy is still in review with the team.
