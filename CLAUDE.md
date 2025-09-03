# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Favourite Things" - a minimal, premium website to showcase favourite products and wishlist items. Built with Next.js 14 (App Router + TypeScript), Tailwind CSS, and Keystatic as a local Git-based CMS.

The project is configured for static export to deploy on Cloudflare Pages or similar static hosting providers.

## Commands

### Development
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm keystatic` - Start Keystatic CMS UI on http://localhost:7777 (dev only)

### Build & Export
- `pnpm build` - Build and export static site to `out/` directory
- `pnpm start` - Start production server (after build)

### Testing & Quality
- `pnpm test` - Run Jest tests with Testing Library
- `pnpm lint` - Run Next.js ESLint

## Architecture Overview

### Core Stack
- **Next.js 14** with App Router, TypeScript, static export (`output: 'export'`)
- **Tailwind CSS** with shadcn-style design system using CSS variables
- **next-themes** for light/dark mode with class-based switching
- **Keystatic** for local, Git-based content management

### Content Model
Content is stored as JSON files in `content/items/` directory. Each item has:
- Basic info: id, slug, name, brand, image path
- Classification: list (favourites/wishlist), category, tags[]
- Details: description, buyUrl, addedAt (ISO date)

### Key Files & Directories
- `lib/types.ts` - Core Item interface and ItemList type
- `lib/content.ts` - Content access functions (getAllItems, getItemBySlug, etc.)
- `lib/utils.ts` - Tailwind class merging utility (cn function)
- `keystatic.config.ts` - CMS schema configuration
- `components/ui/` - Reusable UI primitives (Button, Card, Input, etc.)
- `app/keystatic/[[...params]]/page.tsx` - CMS UI route (development only)

### Static Generation
- All pages are statically generated at build time
- Dynamic item pages use `generateStaticParams()` to create routes for all item slugs
- Images are unoptimized (`unoptimized: true`) for static hosting compatibility

### Styling System
Uses CSS custom properties for theming with Tailwind classes:
- Color tokens: `--background`, `--foreground`, `--primary`, etc.
- Border radius: `--radius` variable
- Dark mode: class-based switching via `next-themes`

### Testing Setup
- Jest with jsdom environment
- Testing Library for React components
- Path mapping configured (`@/*` -> `<rootDir>/*`)
- Setup file: `jest.setup.ts`

## Content Management

### Adding/Editing Content
1. Run `pnpm keystatic` to start CMS on port 7777
2. Visit http://localhost:7777/keystatic
3. Create/edit items through the UI
4. Content is saved to `content/items/*.json`
5. Commit changes to trigger static rebuild

### Manual Content Editing
Items can also be edited directly as JSON files in `content/items/`. Follow the schema defined in `keystatic.config.ts`.

## Deployment Notes

Configured for static hosting (Cloudflare Pages):
- Build command: `next build`
- Output directory: `out`
- No environment variables required
- Images should be placed in `public/images/` and referenced with absolute paths