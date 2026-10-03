import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  // The svelte plugin is what lets `*.svelte.js` rune modules be imported by
  // tests; without it the interaction modules are untestable.
  plugins: [svelte()],
  resolve: {
    // #lib/* resolves through package.json "imports", so no alias is needed.
    conditions: ['browser'],
  },
  test: {
    include: ['src/**/*.test.js'],
    environment: 'node',
  },
});
