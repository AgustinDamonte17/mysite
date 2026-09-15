// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// GitHub Pages project site: https://agustindamonte17.github.io/mysite/
// Do NOT enable Pages in repo Settings until Agustín explicitly oks via Chieff.
export default defineConfig({
  site: 'https://agustindamonte17.github.io',
  base: '/mysite',
  integrations: [mdx()],
});
