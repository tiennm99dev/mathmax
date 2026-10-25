import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// Every site serves from /<package name> unless SITE_BASE says otherwise, so this
// config is identical across the sites that share it.
const { name } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const base = process.env.SITE_BASE ?? `/${name}`;

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter(),
      paths: { base },
      prerender: {
        // A site with no old URLs has an empty legacy redirect table, so its
        // redirect route renders nothing. Any other unseen route is a bug.
        handleUnseenRoutes: ({ routes }) => {
          const unexpected = routes.filter((r) => r !== '/[strand=strand]/[slug]');
          if (unexpected.length > 0) {
            throw new Error(`Prerenderable routes never reached: ${unexpected.join(', ')}`);
          }
        },
      },
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
