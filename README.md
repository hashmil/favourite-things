# Favourite Things

Minimal, premium website to showcase favourite products + wishlist. Built with Next.js (App Router + TypeScript), Tailwind CSS, shadcn-style UI primitives, next-themes, and file-backed content. Local, Git-based CMS is powered by Keystatic.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- shadcn-like UI primitives (local components)
- next-themes (light/dark, persisted)
- next/image (unoptimized for static export)
- Keystatic (local Git-based CMS)

## Project Structure

- `app/` – routes and layout
- `components/` – UI & feature components
- `lib/` – utilities and content accessors
- `content/items/` – item entries as JSON
- `public/images/` – example images (SVG placeholders)

## Development

1. Install deps
   - `pnpm install` (or `npm install` / `yarn`)
2. Run the app
   - `pnpm dev`
3. Visit
   - App: http://localhost:3000

### Local CMS (Keystatic)

Use Keystatic’s local UI embedded in the app to add/edit/delete items. Content is saved to `content/items/*.json`.

- Start CMS UI: `pnpm keystatic` (dev server on port 7777)
- Open http://localhost:7777/keystatic
- Create/update entries, then commit changes.

Fields per item:

- id, slug, name, brand, image (path under `/public`, e.g. `/images/item-1.svg`)
- list (`favourites` | `wishlist`), category, tags[]
- description, buyUrl, addedAt (ISO date)

Commit and push changes; the static site is rebuilt from files in `content/`.

## Build & Export

- Dev: `pnpm dev`
- Static build/export: `pnpm build` (outputs static site to `out/`)

The site is fully static and safe to host on static providers.

## Cloudflare Pages

Create a new project, connect the repo, and use:

- Build command: `next build`
- Output directory: `out`
- Node version: 18+ (default is fine)

No environment variables are required.

Notes:

- Static export is enabled via `output: 'export'` in `next.config.mjs`.
- `next/image` is set to `unoptimized: true` in `next.config.mjs` for export.
- Dynamic item pages are statically generated via `generateStaticParams`.

## Testing

Minimal tests for Grid and ItemCard are included (Jest + Testing Library).

- Run: `pnpm test`

## Accessibility & Performance

- Keyboard focus states and accessible color contrast
- Images include alt text and are lazy by default
- Responsive grids: 2 / 3 / 4 / 6 columns (`360 / 768 / 1024 / 1440+`)
- Client-side search, category + tag filters, sorting (Newest | A–Z | Brand)

## Content Model

`lib/types.ts` defines the `Item` shape consumed by the app. `lib/content.ts` reads JSON files from `content/items/` at build time to statically render pages.

## Non-goals

- No server-side CMS or auth on Cloudflare Pages
- No cart/payment features

## License

Personal project template. No license specified.
