import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const base = process.env.SITE_BASE ?? '/mathmax';

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter(),
      paths: { base },
      // Hash mode puts a CSP meta tag with script hashes on every prerendered page.
      // Inline styles stay allowed because Svelte writes style attributes at runtime
      // and KaTeX markup carries inline styles.
      csp: {
        mode: 'hash',
        directives: {
          'default-src': ['self'],
          'script-src': ['self'],
          'style-src': ['self', 'unsafe-inline'],
          'img-src': ['self', 'data:'],
          'font-src': ['self'],
          'object-src': ['none'],
          'base-uri': ['self'],
          'form-action': ['self'],
        },
      },
    }),
  ],
  build: {
    // Keep fonts as files so `font-src 'self'` holds; Vite would otherwise inline
    // the smallest KaTeX font as a data: URL that the CSP blocks.
    assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
  },
});
