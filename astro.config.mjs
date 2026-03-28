import { defineConfig } from 'astro/config';
import asciidoc from 'astro-asciidoc';
import { typst } from 'astro-typst';
// import logseq from 'astroplugin-logseq';
import tailwind from '@astrojs/tailwind';

const site = process.env.PUBLIC_SITE_URL ?? 'https://your-domain.com';

export default defineConfig({
  site,
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
  vite: {
    server: {
      allowedHosts: ['468a99ea-ad64-4b0b-b46d-5e5a0fdbed71-00-vq9h3nv2q3w4.kirk.replit.dev'],
    },
  },
  integrations: [
    asciidoc({
      options: {
        safe: 'server',
      },
    }),
    typst(),
    // logseq(),
    tailwind(),
  ],
});