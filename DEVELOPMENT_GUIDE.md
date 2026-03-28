# Building a Production Astro Marketing Site — Complete Guide

This guide walks you through recreating this project from a blank directory:
an **Astro v5** marketing/documentation website with **Tailwind CSS v3**, **TypeScript**,
**React**, **MDX**, dark mode, content collections, and an RSS feed.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Bootstrap the Project](#2-bootstrap-the-project)
3. [Install All Dependencies](#3-install-all-dependencies)
4. [Configure Astro](#4-configure-astro)
5. [Configure Tailwind CSS](#5-configure-tailwind-css)
6. [Configure PostCSS](#6-configure-postcss)
7. [Configure TypeScript](#7-configure-typescript)
8. [Design System — CSS Custom Properties](#8-design-system--css-custom-properties)
9. [Global CSS Architecture](#9-global-css-architecture)
10. [Dark Mode](#10-dark-mode)
11. [Project Folder Structure](#11-project-folder-structure)
12. [Layouts](#12-layouts)
13. [Content Collections](#13-content-collections)
14. [Pages](#14-pages)
15. [Components — Naming Conventions](#15-components--naming-conventions)
16. [Navigation — Header & Mobile Menu](#16-navigation--header--mobile-menu)
17. [RSS Feed](#17-rss-feed)
18. [Environment Variables](#18-environment-variables)
19. [Build & Preview](#19-build--preview)
20. [Deployment Checklist](#20-deployment-checklist)

---

## 1. Prerequisites

Make sure these are installed globally before starting.

```bash
# Check Node.js version (need 18+)
node -v

# Check npm version
npm -v

# Install Node.js 20 LTS via nvm if needed
nvm install 20
nvm use 20
```

---

## 2. Bootstrap the Project

```bash
# Create a new Astro project (interactive wizard)
npm create astro@latest my-site

# Wizard answers:
#   - Template:  Empty
#   - TypeScript: Yes (strict)
#   - Install dependencies: Yes
#   - Git repo: Yes

cd my-site
```

After this you have a minimal Astro project. The next steps add every layer on top.

---

## 3. Install All Dependencies

Run all installs in one go. Use `--legacy-peer-deps` because some Astro integrations
have not yet declared peer support for the latest React.

```bash
# Core Astro integrations
npm install @astrojs/tailwind @astrojs/mdx @astrojs/rss --legacy-peer-deps

# Tailwind and PostCSS toolchain
npm install tailwindcss@^3 @tailwindcss/typography autoprefixer postcss postcss-cli --legacy-peer-deps

# React (for interactive islands)
npm install react react-dom --legacy-peer-deps
npm install -D @types/react @types/react-dom --legacy-peer-deps

# Optional: AsciiDoc and Typst document support
npm install astro-asciidoc astro-typst --legacy-peer-deps

# Animation on scroll
npm install aos --legacy-peer-deps

# Tabler icon font (used for UI icons)
npm install @tabler/icons --legacy-peer-deps

# Dev tooling
npm install -D @astrojs/check typescript cssnano --legacy-peer-deps
```

After installing, verify `package.json` lists all packages under `dependencies`
and `devDependencies`.

---

## 4. Configure Astro

Replace `astro.config.mjs` with:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

const site = process.env.PUBLIC_SITE_URL ?? 'https://your-domain.com';

export default defineConfig({
  site,
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
  vite: {
    server: {
      // Add your dev tunnel/proxy host here if using Replit, Codespaces, etc.
      allowedHosts: ['your-tunnel-hostname.example.com'],
    },
  },
  integrations: [
    tailwind(),
    mdx(),
  ],
});
```

Key points:
- `site` is read from the environment variable `PUBLIC_SITE_URL` so the same
  config works locally and in CI/production.
- `host: '0.0.0.0'` lets the dev server accept connections from outside
  localhost (required for cloud IDEs and tunnels).
- `port: 5000` is explicit; change to `4321` (Astro default) if preferred.

---

## 5. Configure Tailwind CSS

Create `tailwind.config.cjs` (note: `.cjs` because the project is ESM-type):

```js
// tailwind.config.cjs
const plugin = require('tailwindcss/plugin');

module.exports = {
  // Dark mode is toggled by adding class="dark" to <html>
  darkMode: 'class',

  // Tell Tailwind where to scan for class names
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],

  theme: {
    extend: {
      // ── Brand colours ───────────────────────────────────────
      colors: {
        timefold: {
          dark:    '#0b0f19',   // page background in dark mode
          card:    'rgba(255, 255, 255, 0.03)',
          border:  'rgba(255, 255, 255, 0.08)',
          primary: '#4f46e5',
          accent:  '#10b981',
          muted:   '#94a3b8',
        },
        'tf-purple': '#5A32FA',
      },

      // ── Typography ──────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      // ── Glows ───────────────────────────────────────────────
      boxShadow: {
        'glow-accent':  '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.3)',
      },

      // ── Custom viewport breakpoints (em-based) ───────────────
      // Using em so breakpoints are not affected by the root font-size.
      screens: {
        vp5:       '35.5em',              // 568 px
        vp7:       '48em',                // 768 px
        vp9:       '60em',                // 960 px
        vp12:      '80em',                // 1280 px
        'max-vp7': { max: '47.9375em' },  // up to 767 px
        'max-vp9': { max: '59.9375em' },  // up to 959 px
      },

      // ── @tailwindcss/typography customisation ───────────────
      typography: {
        DEFAULT: {
          css: {
            'ul > li::marker': { color: 'var(--primary)' },
          },
        },
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),

    // Custom layout utilities that use CSS custom properties
    plugin(({ addUtilities }) => {
      addUtilities({
        '.layout-content-1180': {
          marginInline:   'auto',
          maxWidth:       '1180px',
          paddingInline:  '1rem',
        },
        '.layout-section-y': {
          width:          '100%',
          paddingTop:     '4rem',
          paddingBottom:  '4rem',
        },
      });
    }),
  ],
};
```

Then generate the Tailwind config file if it doesn't exist yet:

```bash
npx tailwindcss init tailwind.config.cjs --full
# Then replace its contents with the config above.
```

---

## 6. Configure PostCSS

Create `postcss.config.cjs` in the project root:

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss:  {},
    autoprefixer: {},
  },
};
```

For production builds you can also add `cssnano` to shrink the output:

```js
// postcss.config.cjs (with minification)
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: {
    tailwindcss:  {},
    autoprefixer: {},
    ...(isProd ? { cssnano: { preset: 'default' } } : {}),
  },
};
```

---

## 7. Configure TypeScript

Replace (or create) `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*":    ["src/layouts/*"],
      "@utils/*":      ["src/utils/*"],
      "@assets/*":     ["src/assets/*"]
    }
  }
}
```

The `astro/tsconfigs/strict` preset enables:
- `strict: true` — catches more bugs at compile time
- `jsx: "react-jsx"` — JSX support for React islands
- Module resolution suitable for Astro's virtual imports

---

## 8. Design System — CSS Custom Properties

The design system lives in `src/styles/global.css` and is imported once in the
root layout. Use CSS custom properties (variables) for every token so dark mode
overrides are a single block of re-declarations.

### 8.1 Spacing Scale

```css
/* src/styles/global.css — spacing */
:root {
  --space-0:  0;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-9:  36px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-15: 60px;
  --space-16: 64px;
  --space-20: 80px;
  --space-25: 100px;
  --space-30: 120px;
  --space-45: 180px;
}
```

### 8.2 Colour Palette (HSL)

Store all colour values as raw HSL components (no `hsl()` wrapper) so you can
compose them with opacity: `hsl(var(--color-purple-50) / 0.5)`.

```css
:root {
  /* Neutrals — 0 = black, 100 = white */
  --color-neutral-0:   0deg 0% 0%;
  --color-neutral-20:  0deg 0% 20%;
  --color-neutral-60:  0deg 0% 60%;
  --color-neutral-80:  0deg 0% 80%;
  --color-neutral-90:  0deg 0% 92%;
  --color-neutral-100: 0deg 0% 100%;

  /* Dark greys (navy tones) */
  --color-darkgrey-10: 227deg 9% 11%;   /* ≈ #0b0f19  – darkest */
  --color-darkgrey-20: 229deg 9% 23%;   /* ≈ #191d2e  – card surfaces */

  /* Medium greys */
  --color-mediumgrey-20: 225deg 3% 28%;

  /* Smoke (light blue-grey) */
  --color-smoke-90: 234deg 21% 95%;     /* near-white light card bg */

  /* Purple brand */
  --color-purple-50: 252deg 95% 59%;    /* #5b21b6 / tf-purple */
  --color-purple-60: 252deg 95% 50%;    /* darker hover */
}
```

### 8.3 Scheme Tokens

"Schemes" are per-section colour themes. Each section gets a class like
`scheme-default` or `scheme-grey`, and child components read from these tokens.

```css
.scheme-default {
  --scheme-base:            hsl(var(--color-neutral-100));
  --scheme-shade:           hsl(var(--color-smoke-90));
  --scheme-accent:          hsl(var(--color-purple-50));
  --scheme-contrast:        hsl(var(--color-darkgrey-10));
  --scheme-text:            hsl(var(--color-mediumgrey-20));
  --scheme-title:           hsl(var(--color-darkgrey-10));
  --scheme-border:          hsl(var(--color-neutral-90));
}

.scheme-grey {
  --scheme-base:    hsl(var(--color-smoke-90));
  --scheme-shade:   hsl(var(--color-neutral-90));
  --scheme-contrast: hsl(var(--color-darkgrey-10));
  --scheme-text:    hsl(var(--color-mediumgrey-20));
  --scheme-title:   hsl(var(--color-darkgrey-10));
}

/* Components read from scheme tokens */
.prop-bg    { background-color: var(--scheme-base); }
.prop-shade { background-color: var(--scheme-shade); }
```

---

## 9. Global CSS Architecture

Keep `src/styles/global.css` organised into labelled sections:

```
/* ── 1. CSS custom properties (tokens) ──────────────── */
/* ── 2. Reset / base styles ─────────────────────────── */
/* ── 3. Typography scale (typo-h1 … typo-body-sm) ───── */
/* ── 4. Layout utilities (.layout, .bound-x, .section-sm) */
/* ── 5. Component library (c-button, c-card, …) ──────── */
/* ── 6. Page-specific overrides ─────────────────────── */
/* ── 7. Dark mode overrides (html.dark …) ────────────── */
/* ── 8. Responsive media queries ─────────────────────── */
```

Import it once in your root layout:

```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
---
```

**Do not** `@import` it inside Tailwind's `@layer` blocks — keep it as a plain
CSS file so specificity is straightforward.

### Typography helpers

```css
.typo-h1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; line-height: 1.1; }
.typo-h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 700; line-height: 1.15; }
.typo-h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 600; }
.typo-h4 { font-size: 1.125rem; font-weight: 600; }
.typo-body { font-size: 1rem; line-height: 1.6; }
.typo-body-sm { font-size: 0.875rem; line-height: 1.5; }
```

---

## 10. Dark Mode

### 10.1 Tailwind side

`darkMode: 'class'` in `tailwind.config.cjs` means you activate dark mode by
adding `class="dark"` to `<html>`.

### 10.2 CSS override block

At the very end of `global.css`, add a single block that re-declares every
hardcoded colour that would look wrong on a dark background:

```css
/* ============================================================
   DARK MODE — activated by html.dark
   ============================================================ */

html.dark {
  color-scheme: dark;
  background-color: hsl(var(--color-darkgrey-10));
}

html.dark body {
  background-color: hsl(var(--color-darkgrey-10));
  color: hsl(var(--color-neutral-80));
}

/* Override scheme tokens */
html.dark .scheme-default {
  --scheme-base:     hsl(var(--color-darkgrey-10));
  --scheme-shade:    hsl(var(--color-darkgrey-20));
  --scheme-contrast: hsl(var(--color-neutral-100));
  --scheme-text:     hsl(var(--color-neutral-80));
  --scheme-title:    hsl(var(--color-neutral-100));
  --scheme-border:   hsl(var(--color-neutral-100) / 0.08);
}

/* Fix any component that hardcodes light colours */
html.dark .c-card-with-smoke-bg {
  background-color: hsl(var(--color-darkgrey-20));
  color: hsl(var(--color-neutral-80));
}
```

### 10.3 Toggle button (Astro component)

```astro
---
// src/components/ThemeToggle.astro
---

<button id="theme-toggle" aria-label="Toggle dark mode" class="theme-toggle">
  <svg class="icon-sun"  ...><!-- sun SVG --></svg>
  <svg class="icon-moon" ...><!-- moon SVG --></svg>
</button>

<script>
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Persist preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  btn?.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

---

## 11. Project Folder Structure

```
my-site/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── rss/
│       └── styles.xsl          ← RSS feed browser stylesheet
│
├── src/
│   ├── assets/                 ← Images imported via Vite
│   ├── components/
│   │   ├── landing/            ← Section-level landing page components
│   │   │   ├── LandingHero.astro
│   │   │   ├── LandingProof.astro
│   │   │   └── LandingShortcut.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   └── GoToTopButton.astro
│   │
│   ├── content/
│   │   ├── config.ts           ← Collection schemas (Zod)
│   │   ├── blog/
│   │   │   └── my-first-post.md
│   │   ├── docs/
│   │   └── use-cases/
│   │
│   ├── layouts/
│   │   ├── Layout.astro        ← Root HTML shell
│   │   ├── BlogPost.astro
│   │   └── UseCaseLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro         ← Home page
│   │   ├── blog/
│   │   │   ├── index.astro     ← Blog listing
│   │   │   └── [slug].astro    ← Dynamic post route
│   │   ├── use-cases/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── pricing.astro
│   │   ├── resources/
│   │   └── rss.xml.ts          ← RSS feed endpoint
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── utils/
│       └── siteContent.ts      ← Centralised copy / metadata
│
├── astro.config.mjs
├── tailwind.config.cjs
├── postcss.config.cjs
├── tsconfig.json
└── package.json
```

Create the folder skeleton:

```bash
mkdir -p src/{assets,components/landing,content/{blog,docs,use-cases},layouts,pages/{blog,use-cases,resources},styles,utils}
mkdir -p public/rss
```

---

## 12. Layouts

### Root layout

```astro
---
// src/layouts/Layout.astro
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const { title = 'Timefold – Intelligent Scheduling' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <link rel="alternate" type="application/rss+xml"
          title="Blog RSS Feed" href="/rss.xml" />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Blog post layout

```astro
---
// src/layouts/BlogPost.astro
import Layout from './Layout.astro';
const { title, description, date, author } = Astro.props;
---

<Layout title={title}>
  <article class="layout bound-x section-sm">
    <header>
      <h1 class="c-title typo-h1">{title}</h1>
      <p class="c-meta">{date?.toLocaleDateString()} · {author}</p>
    </header>
    <div class="c-text s-wysiwyg prose">
      <slot />
    </div>
  </article>
</Layout>
```

---

## 13. Content Collections

### Schema (`src/content/config.ts`)

```ts
import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string().optional(),
    date:        z.coerce.date().optional(),
    tags:        z.array(z.string()).optional(),
    author:      z.string().optional(),
    authorUrl:   z.string().optional(),
  }),
});

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    tags:  z.array(z.string()).optional(),
  }),
});

const useCasesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    eyebrow:     z.string().optional(),
    icon:        z.enum(['route', 'shift', 'task']).optional(),
    tags:        z.array(z.string()).optional(),
    date:        z.coerce.date().optional(),
    order:       z.number().optional(),
  }),
});

export const collections = {
  blog:        blogCollection,
  docs:        docsCollection,
  'use-cases': useCasesCollection,
};
```

### Sample blog post (`src/content/blog/first-post.md`)

```markdown
---
title: My First Post
description: A short intro to intelligent scheduling.
date: 2026-01-15
tags: [scheduling, intro]
author: Jane Dev
---

# My First Post

Content goes here…
```

### Dynamic route (`src/pages/blog/[slug].astro`)

```astro
---
import { getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.data.slug ?? post.id },
    props:  { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogPost
  title={post.data.title}
  description={post.data.description}
  date={post.data.date}
  author={post.data.author}
>
  <Content />
</BlogPost>
```

---

## 14. Pages

### Home page skeleton (`src/pages/index.astro`)

```astro
---
import Layout from '../layouts/Layout.astro';
import LandingHero from '../components/landing/LandingHero.astro';
---

<Layout title="Timefold – Intelligent Scheduling">
  <LandingHero />
  <!-- add more section components below -->
</Layout>
```

### Blog listing (`src/pages/blog/index.astro`)

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

const posts = (await getCollection('blog'))
  .filter(p => p.data.date)
  .sort((a, b) => +new Date(b.data.date!) - +new Date(a.data.date!));
---

<Layout title="Blog">
  <section class="layout bound-x section-sm">
    <h1 class="c-title typo-h1">Blog</h1>
    <ul class="grid vp7:grid-cols-2 vp9:grid-cols-3 gap-6 mt-8">
      {posts.map(post => (
        <li>
          <a href={`/blog/${post.data.slug ?? post.id}/`}>
            <h2>{post.data.title}</h2>
            <p>{post.data.description}</p>
          </a>
        </li>
      ))}
    </ul>
  </section>
</Layout>
```

---

## 15. Components — Naming Conventions

This project uses **BEM** (Block Element Modifier) for CSS class names, combined
with a `c-` prefix to distinguish component classes from utility classes.

```
Block:     .c-button
Element:   .c-button__icon
Modifier:  .c-button--secondary
```

### Example button component

```astro
---
// src/components/Button.astro
interface Props {
  href?:    string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}
const { href, variant = 'primary' } = Astro.props;
const Tag = href ? 'a' : 'button';
---

<Tag
  href={href}
  class:list={['c-button', variant !== 'primary' && `c-button--${variant}`]}
>
  <slot />
</Tag>
```

```css
/* global.css */
.c-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: 9999px;
  font-weight: 600;
  background-color: var(--scheme-accent, hsl(var(--color-purple-50)));
  color: #fff;
  transition: background-color 0.15s ease;
}
.c-button:hover { background-color: hsl(var(--color-purple-60)); }

.c-button--secondary {
  background-color: transparent;
  border: 2px solid var(--scheme-border, hsl(var(--color-neutral-90)));
  color: var(--scheme-contrast, hsl(var(--color-darkgrey-10)));
}
```

---

## 16. Navigation — Header & Mobile Menu

### Header structure

```astro
---
// src/components/Header.astro
import ThemeToggle from './ThemeToggle.astro';
---

<header class="c-header">
  <div class="c-header__inner layout bound-x">
    <a href="/" class="c-header__logo">Timefold</a>

    <nav class="c-header__nav" id="main-nav" aria-label="Main navigation">
      <ul class="c-header__links">
        <li><a href="/use-cases/">Use Cases</a></li>
        <li><a href="/resources/">Resources</a></li>
        <li><a href="/pricing/">Pricing</a></li>
        <li><a href="/docs/">Documentation</a></li>
      </ul>
    </nav>

    <div class="c-header__actions">
      <ThemeToggle />
      <a href="/talk-to-us/" class="c-button">Talk to us</a>
      <button class="c-hamburger" id="hamburger" aria-label="Open menu"
              aria-expanded="false" aria-controls="main-nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<script>
  const ham  = document.getElementById('hamburger');
  const nav  = document.getElementById('main-nav');
  ham?.addEventListener('click', () => {
    const open = nav?.classList.toggle('is-open');
    ham.setAttribute('aria-expanded', String(open));
  });
</script>
```

### Header CSS

```css
.c-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--scheme-base, #fff);
  border-bottom: 1px solid var(--scheme-border);
}
.c-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  height: 64px;
}
.c-header__nav { display: none; }

/* Desktop nav */
@media (min-width: 60em) {
  .c-header__nav { display: flex; }
  .c-hamburger   { display: none; }
}

/* Mobile nav open state */
.c-header__nav.is-open {
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 64px 0 0;
  background: var(--scheme-base);
  padding: var(--space-6);
  overflow-y: auto;
}

/* Dark mode header */
html.dark .c-header {
  background-color: hsl(var(--color-darkgrey-10));
  border-bottom-color: hsl(var(--color-neutral-100) / 0.08);
}
```

---

## 17. RSS Feed

### Endpoint (`src/pages/rss.xml.ts`)

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');

  const sorted = posts
    .filter(p => p.data.date)
    .sort((a, b) => +new Date(b.data.date!) - +new Date(a.data.date!));

  return rss({
    title:       'My Site Blog',
    description: 'Latest posts about intelligent scheduling.',
    site:        context.site ?? 'https://your-domain.com',
    items: sorted.map(post => ({
      title:       post.data.title,
      description: post.data.description ?? '',
      pubDate:     new Date(post.data.date!),
      link:        `/blog/${post.data.slug ?? post.id}/`,
      categories:  post.data.tags ?? [],
      author:      post.data.author,
    })),
    customData:  `<language>en-us</language>`,
    stylesheet:  '/rss/styles.xsl',
  });
}
```

The feed is then available at `http://localhost:5000/rss.xml`.

---

## 18. Environment Variables

Create a `.env` file (never commit this to git):

```bash
# .env
PUBLIC_SITE_URL=https://your-production-domain.com
```

Astro exposes variables prefixed with `PUBLIC_` to the browser. Use plain names
for server-only secrets.

Access in code:

```ts
// server-only
const secret = import.meta.env.MY_SECRET;

// available in both server and client
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

---

## 19. Build & Preview

```bash
# Start the development server (hot-reload)
npm run dev

# Type-check the project (no emit)
npm run check

# Build for production — output goes to dist/
npm run build

# Preview the production build locally
npm run preview
```

### Verify the build passes before deploying

```bash
npm run check && npm run build
# Both must exit with code 0.
```

---

## 20. Deployment Checklist

Before going live, confirm each item:

```
[ ] PUBLIC_SITE_URL is set to the production domain in your host's env settings
[ ] `astro.config.mjs` — remove localhost from `vite.server.allowedHosts`
[ ] favicon.svg and favicon.ico are in /public/
[ ] All images use <Image> or have explicit width/height (Astro warns otherwise)
[ ] `npm run build` exits 0 with no TypeScript errors
[ ] /rss.xml loads correctly in a browser
[ ] Dark mode toggle persists across page navigation
[ ] Mobile navigation opens and closes correctly below 60em
[ ] All internal links use relative paths (/blog/slug/, not absolute URLs)
[ ] OG meta tags (og:title, og:description, og:image) are set per page
[ ] robots.txt and sitemap are generated (add @astrojs/sitemap integration)
```

### Add sitemap (optional but recommended)

```bash
npm install @astrojs/sitemap --legacy-peer-deps
```

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [tailwind(), mdx(), sitemap()],
});
```

This generates `/sitemap-index.xml` automatically during `npm run build`.

---

## Quick-Start Command Sequence (copy-paste)

```bash
# 1 — Create project
npm create astro@latest my-site
cd my-site

# 2 — Install all dependencies
npm install @astrojs/tailwind @astrojs/mdx @astrojs/rss tailwindcss@^3 \
  @tailwindcss/typography autoprefixer postcss postcss-cli \
  react react-dom aos @tabler/icons --legacy-peer-deps

npm install -D @astrojs/check @types/react @types/react-dom \
  typescript cssnano --legacy-peer-deps

# 3 — Create folder structure
mkdir -p src/{assets,components/landing,content/{blog,docs,use-cases},layouts,pages/{blog,use-cases},styles,utils}
mkdir -p public/rss

# 4 — Create config files
touch tailwind.config.cjs postcss.config.cjs

# 5 — Start dev server
npm run dev
# → open http://localhost:5000
```

---

*Happy building!*
