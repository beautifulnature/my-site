import { defineConfig } from 'astro/config';
import asciidoc from 'astro-asciidoc';
import { typst } from 'astro-typst';
// import logseq from 'astroplugin-logseq';
import tailwind from '@astrojs/tailwind';

const site = process.env.PUBLIC_SITE_URL ?? 'https://your-domain.com';

export default defineConfig({
  site,
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