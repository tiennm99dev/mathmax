import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  // The svelte plugin is what lets `*.svelte.js` rune modules be imported by
  // tests; without it the interaction modules are untestable.
  plugins: [svelte()],
  resolve: {
    conditions: ['browser'],
    // SvelteKit normally injects $lib; vitest runs without that layer.
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.test.js'],
    environment: 'node',
  },
});
