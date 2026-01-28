# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog/portfolio website built with Astro, a modern static site generator. The site uses TypeScript for type safety and follows Astro's content collections architecture for blog management.

## Commands

| Command | Action |
|---------|--------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## Architecture

### Content Management

Blog posts are managed through Astro Content Collections:
- Posts live in `src/content/blog/` as Markdown files
- Content schema is defined in `src/content.config.ts` using Zod validation
- Frontmatter schema:
  - `title` (string, required) - Post title
  - `date` (date, required) - Publication date
  - `category` (enum, required) - One of: `engineering`, `career`, `life`
  - `description` (string, optional) - Post description
  - `draft` (boolean, default: false) - Draft status

### File Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Header.astro    # Site header with navigation
│   ├── Footer.astro    # Site footer
│   └── PostCard.astro  # Blog post preview cards
├── layouts/
│   └── BaseLayout.astro  # Main layout wrapper
├── pages/
│   ├── index.astro     # Home page (blog listing)
│   ├── about.astro     # About page
│   ├── blog/[...slug].astro  # Dynamic blog post routes
│   └── fonts.astro     # Font-specific page
├── content/blog/       # Markdown blog posts
└── styles/
    └── global.css      # Global styles and CSS variables
```

### Routing

- Pages in `src/pages/` become routes automatically
- Dynamic routes use bracket syntax: `[...slug].astro`
- Blog posts use content collection routing via the `getCollection()` API

### Design System

The site uses a dark theme with CSS custom properties:
- Primary accent: Orange (`#ff8c00`)
- Fonts: Nunito Sans (sans-serif), JetBrains Mono (monospace)
- Mobile-first responsive design

### Type Safety

- TypeScript strict mode enabled
- Content collections use Zod schema validation
- All frontmatter is type-safe through Astro's content API
