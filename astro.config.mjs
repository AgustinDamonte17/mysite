// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// GitHub Pages project site: base `/mysite`.
// On Vercel, serve from domain root (`/`).
const onVercel = Boolean(process.env.VERCEL);
const base = onVercel ? '/' : '/mysite';
const site = onVercel
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'agustindamonte.vercel.app'}`
  : 'https://agustindamonte17.github.io';

export default defineConfig({
  site,
  base,
  integrations: [mdx()],
});
