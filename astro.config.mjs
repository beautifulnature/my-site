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
      allowedHosts: ['baee9319-b818-4106-aa86-944113b724df-00-uwwa0ykq3kef.kirk.replit.dev'],
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