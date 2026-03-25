# My Sample Site (Astro)

## Overview
A static website built with [Astro](https://astro.build/), featuring:
- AsciiDoc content support (`astro-asciidoc`)
- Typst document rendering (`astro-typst`)
- Tailwind CSS styling
- React integration

## Project Structure
```
src/
  assets/        - Static assets
  components/    - Reusable Astro/React components
  content/       - Content collections (AsciiDoc, Typst, etc.)
  layouts/       - Page layout templates
  pages/         - Route pages
  styles/        - Global CSS
  types/         - TypeScript type definitions
  utils/         - Utility functions
public/          - Static files served as-is
shared/          - Shared utilities
```

## Development

**Start dev server:**
```
npm run dev
```
Runs on `http://0.0.0.0:5000`

**Build for production:**
```
npm run build
```
Outputs to `dist/`

## Configuration
- `astro.config.mjs` — Astro config (server host, port, integrations)
- `tailwind.config.cjs` — Tailwind CSS config
- `postcss.config.cjs` — PostCSS config
- `tsconfig.json` — TypeScript config

## Environment Variables
- `PUBLIC_SITE_URL` — Absolute URL of the deployed site (see `.env.example`)

## Deployment
Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `dist`
