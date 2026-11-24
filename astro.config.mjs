// @ts-check
import { defineConfig } from 'astro/config';

// The XML sitemap is written after the build by scripts/build-sitemap.mjs (one /sitemap.xml with images and
// real lastmod dates, the enthusiastreview.com pattern).
const SITE = 'https://www.besthometheaterreview.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
});
