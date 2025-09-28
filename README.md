# Deyan Artist Website

A mobile-first, content-driven artist hub for **Deyan**, designed to push Spotify plays, YouTube views, and Instagram discovery through integrated UX flows. Built with Next.js 14 App Router, Tailwind CSS (v4), shadcn/ui, and TypeScript.

## ✨ Features
- Hero with parallax motion, actionable CTAs, and latest release/video callouts.
- Modular content sourced from `content/` JSON + MDX for easy future CMS migrations.
- Releases grid with deep-linked Spotify/YouTube/Apple buttons and analytics tracking.
- YouTube modal player using `youtube-nocookie.com`, autoplay, and "next up" suggestions.
- Instagram grid with sticky mobile CTA, photo gallery light cards, and press-ready assets.
- Contact form validated with zod + RHF, toast feedback, and mailto fallback.
- SEO metadata via Next Metadata API, OG/Twitter images, and sitemap generator.
- Analytics hooks wired for Vercel Analytics, GA events, and outbound click tracking.

## 🗂 Project Structure
```
app/
  (site)/
    layout.tsx, page.tsx, music/, videos/, gallery/, about/, contact/
  api/revalidate/route.ts
  sitemap.ts
components/
  Header, Footer, Nav, Hero, PlayCta, SocialRow, ReleaseCard,
  VideoCard, VideoGallery, VideoHighlight, PhotoCard,
  YouTubeModal, SpotifyEmbed, IgGrid, ContactForm, ui/
content/
  releases.json, videos.json, gallery.json, press.json, bio.mdx
lib/
  analytics.ts, content.ts, utils.ts
public/
  images/, og/default.svg, press/deyan-onesheet.pdf
styles/
  globals.css
```

## 🚀 Quick Start
```bash
npm install
npm run dev
```
Open http://localhost:3000 to preview. Use `npm run build` for production output.

## 🔧 Configuration
Copy `.env.local.example` to `.env.local` and fill in platform IDs before deploying:
```
NEXT_PUBLIC_YT_CHANNEL_ID=
NEXT_PUBLIC_SPOTIFY_ARTIST_ID=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_GA_ID=
```

## 📈 Analytics & Tracking
- `lib/analytics.ts` centralizes outbound tracking (`trackOutbound`, `withUtm`).
- Vercel Analytics is enabled in the site layout.
- Hook GA4 or other providers via `window.gtag` in `_app` or a custom script tag.

## 🪜 Roadmap Notes
- Swap static content for Sanity/Supabase when ready.
- Add newsletter, merch, tour filters, and live Spotify/YouTube fetches (see build spec roadmap).

All media assets are placeholders -- replace SVGs and PDF with final brand resources before launch.
# deyan
