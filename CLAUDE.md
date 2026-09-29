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
├── components/
│   ├── Header.astro    # Line-map signage header, nav, day/night toggle
│   ├── Footer.astro
│   └── Stop.astro      # One essay as a stop on the line map (index)
├── layouts/
│   └── BaseLayout.astro
├── lib/lines.ts        # Categories as subway lines (J engineering, P career, M life), reading time
├── pages/
│   ├── index.astro     # Line-map index of all writing
│   ├── about.astro
│   ├── blog/[...slug].astro  # Essay: left "you are here" rail, margin notes
│   └── fonts.astro     # Font-specific page
├── scripts/
│   ├── toc.ts          # Builds the rail from post headings
│   └── subway.ts       # Interactive 2/3 subway embed, mounted on [data-subway]
├── content/blog/       # Markdown blog posts
└── styles/global.css   # Tokens and .prose styles
```

### Routing

- Pages in `src/pages/` become routes automatically
- Dynamic routes use bracket syntax: `[...slug].astro`
- Blog posts use content collection routing via the `getCollection()` API

### Design System

Broadsheet look on a line-map layout. See PRODUCT.md for principles.
- Newsprint-tinted paper, iris ink, rose flag (`--flag`); Rose Pine Moon-style dark mode via `data-theme`
- Fonts: Old Standard TT (headlines), Source Serif 4 (body), Archivo Narrow (labels), JetBrains Mono (code only)
- Each category is a line with its own color (`--eng`, `--career`, `--life`); `-t` variants are for text
- Embed interactive pieces in a post with raw HTML in the markdown: `<figure class="embed">` and `<div data-subway>`
- Margin notes: `<aside class="margin">` in a post (right margin on wide screens)

### Type Safety

- TypeScript strict mode enabled
- Content collections use Zod schema validation
- All frontmatter is type-safe through Astro's content API

### Copy rules

- Never add explanatory or instructional sentences around visualizations, embeds, or navigation (captions like "Schematic, not to scale", hints like "Each essay is a stop", labels like "You are here"). Readers explore on their own. The design carries the meaning.
