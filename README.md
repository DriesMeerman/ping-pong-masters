This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


---
# AI Context
## Summary
We’re building **Ping Pong Master**, a playful, grain‑textured Next.js + TypeScript + Tailwind v4 site that showcases our office ping‑pong league’s mascot and dev‑themed images, with seasonal rankings managed via static JSON. The character is energetic, mythic‑heroic, and bathed in warm oranges and creams, with subtle motion lines and 3D‑style accents. Technically, we emphasize file‑based routing, static generation, CSS‑first theming, and small, reusable components, following Next.js and Tailwind best practices.

---

## Project Overview
- **Goal**: Present our mascot‑driven artwork, gallery, and season-by-season rankings without any server or DB—just static assets and JSON files.
- **Pages**:
  1. **Home**: Hero intro, “Meme of the Week” carousel, CTAs to gallery and rankings.
  2. **Gallery**: Hard‑coded image grid with lightbox preview.
  3. **Rankings**: One page per season, generated at build time via `getStaticPaths`/`getStaticProps`.
  4. **About/League**: Markdown‑powered content on rules and mascot lore.

---

## Character Vibe & Visual Style
- **Color Palette**:
  - Orange skin `#DD6B2A`, deep amber `#C75A1A`, dark olive `#5A4B2E`, cream `#F5E4B9`.
- **Texture**: Grain overlay PNG at ~10 % opacity behind all backgrounds (`bg-grain`).
- **Linework**: Slightly imperfect “gold lines” around cards/buttons to mimic sticker cutouts.
- **Motion & Energy**:
  - Hover scale with `transition-transform` for motion lines.
  - Container queries for responsive layout tweaks (`@container` variants).
- **Typography**: Chunky headline font (e.g. Montserrat Black) + rounded body (e.g. Quicksand).

---

## Technical Stack & Architecture
- **Framework**: Next.js (App Router) with file‑based routing for zero‑config pages.
- **Styling**: Tailwind v4 via CSS‑first `@import "tailwindcss"` and `@theme` tokens.
- **Data**: Static JSON in `data/seasons/`; no runtime DB.
- **Images**: `/public/images/` & `/public/mascotte/` asset folders.
- **Build**: All pages statically generated (SSG) via `getStaticProps`, `getStaticPaths` for rankings.
- **Performance**:
  - Code splitting with dynamic imports for heavy components.
  - Memoize pure components with `React.memo` and `useMemo`.

---

## Best Practices
1. **Modular Structure**: Co‑locate UI and data logic in the `app/` directory; group by feature (Hero, Gallery, Rankings).
2. **TypeScript Everywhere**: Enforce types for props, JSON shapes, and API routes to catch errors at compile time.
3. **CSS‑First Theming**: Define all design tokens in an `@theme` block to expose them as CSS variables—no extra JS build step.
4. **Automatic Content Detection**: Let Tailwind v4 scan your `app/`, `components/`, and `pages/` folders without manual `content` in config.
5. **Accessibility**: Ensure alt text on images, semantic HTML, and visible focus states (use `ring` utilities).
6. **Lightweight Animations**: Use `transition`, `scale`, and 3D transforms (`rotate-x`, `translate-z`) for subtle effects.
7. **Version Control**: Commit `public/` assets, `data/` JSON, and lock major package versions for reproducible builds.

---

> _Use this as a system prompt to remind any LLM:_
> “We’re building Ping Pong Master, a statically‑generated Next.js + Tailwind v4 site with a grainy, mythic‑heroic mascot in warm oranges. We prioritize file‑based routing, CSS‑first theming, static JSON for rankings, and small reusable React components, following Next.js and Tailwind best practices.”