# My Sample Site

This repository contains two Astro applications:

- Root app: `my-sample-site`
- Nested app: `timefold/`

## Prerequisites

- Node.js 20+
- npm 10+

## Environment variables

Both Astro configs use environment-based `site` URLs.

- Root app (`astro.config.mjs`):
	- `PUBLIC_SITE_URL` (fallback: `https://your-domain.com`)
- Nested `timefold` app (`timefold/astro.config.mjs`):
	- `PUBLIC_TIMEFOLD_SITE_URL` (fallback to `PUBLIC_SITE_URL`, then `https://your-site.com`)

Example:

```bash
PUBLIC_SITE_URL=https://example.com
PUBLIC_TIMEFOLD_SITE_URL=https://timefold.example.com
```

Template files are included:

- `.env.example` (root app)
- `timefold/.env.example` (nested app)

Copy each template to `.env` before local development.

Quick copy commands:

```powershell
Copy-Item .env.example .env
Copy-Item timefold/.env.example timefold/.env
```

```bash
cp .env.example .env
cp timefold/.env.example timefold/.env
```

## Install

Install dependencies for both apps:

```bash
npm ci
npm --prefix timefold ci
```

## Scripts (root)

- `npm run dev` – run root app dev server
- `npm run check` – run Astro check for root app
- `npm run build` – build root app
- `npm run ci` – check + build root app
- `npm run check:all` – check root + build nested app
- `npm run build:all` – build root + build nested app
- `npm run ci:all` – ci root + build nested app

## Scripts (timefold)

- `npm --prefix timefold run dev`
- `npm --prefix timefold run check`
- `npm --prefix timefold run build`
- `npm --prefix timefold run ci`

## CI

GitHub Actions validates both apps independently using their own lockfiles:

- Root: `npm ci`, `npm run check`, `npm run build`
- Nested `timefold`: `npm ci`, `npm run check`, `npm run build`

Workflow file: `.github/workflows/ci.yml`

## Content collection note

- `src/content/docs/index.md` is an intentional anchor file.
- It keeps the `docs` collection non-empty so `astro check` stays clean while AsciiDoc files (such as `src/content/docs/patterns.adoc`) remain in place.

## Tag taxonomy

Tags are normalized in `src/utils/content.ts` via `normalizeTag()` and `getStringTags()`.

Use canonical tags in frontmatter when possible:

- `docs` (preferred over `documentation`)
- `qa` (preferred over `q-and-a`)
- `customer-story` (preferred over `case-study`)

Alias mapping currently applied automatically at read-time:

- `documentation` -> `docs`
- `q-and-a` -> `qa`
- `case-study` -> `customer-story`

When adding new content, keep tags lowercase and hyphenated (for example, `product-updates`, `getting-started`).

### Contributor checklist (content)

- Add `tags` in frontmatter for every new content entry.
- Prefer canonical tags listed above; avoid introducing near-duplicates.
- Keep tags lowercase and hyphenated.
- Run `npm run check` before opening a PR.
