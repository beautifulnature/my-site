import { defineConfig } from 'astro/config';
import asciidoc from 'astro-asciidoc';
import { typst } from 'astro-typst';
// import logseq from 'astroplugin-logseq';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://your-domain.com', // must be absolute
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