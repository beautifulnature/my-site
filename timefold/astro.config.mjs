import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

const site =
  process.env.PUBLIC_TIMEFOLD_SITE_URL ??
  process.env.PUBLIC_SITE_URL ??
  'https://your-site.com';

export default defineConfig({
  site,
  output: 'static',
  integrations: [tailwind()]
});