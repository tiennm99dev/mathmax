<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import { nav } from './copy.vi.js';
  import { focusRing } from './ui.js';

  /**
   * Header, main area and footer shared by hubs and lesson pages.
   * @type {{ children: import('svelte').Snippet, width?: 'narrow' | 'wide' }}
   */
  let { children, width = 'narrow' } = $props();

  const site = t().site;
  const inner = $derived(width === 'wide' ? 'max-w-5xl' : 'max-w-3xl');
</script>

<a
  href="#main"
  class="sr-only rounded bg-white px-3 py-2 text-indigo-700 focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-10 {focusRing}"
  >{nav.skip}</a
>

<header class="border-b border-slate-200 bg-white">
  <div class="mx-auto flex {inner} items-center justify-between px-4 py-3">
    <a
      href={resolve('/')}
      class="rounded text-xl font-bold tracking-tight text-indigo-600 {focusRing}">{site.title}</a
    >
    <nav aria-label={nav.main}>
      <a
        href={resolve('/')}
        class="rounded px-2 py-2 text-sm text-slate-600 hover:underline {focusRing}">{nav.home}</a
      >
    </nav>
  </div>
</header>

<main id="main" class="min-h-screen bg-slate-50">
  <div class="mx-auto {inner} px-4 py-6 sm:py-8">
    {@render children()}
  </div>
</main>

<footer class="border-t border-slate-200 bg-white">
  <div class="mx-auto {inner} px-4 py-6 text-center text-sm text-slate-500">
    © {new Date().getFullYear()} ·
    <!-- eslint-disable svelte/no-navigation-without-resolve -- external repository URL -->
    <a
      href={site.repo}
      class="rounded text-indigo-600 hover:underline {focusRing}"
      target="_blank"
      rel="noopener noreferrer">{nav.source}</a
    >
    <!-- eslint-enable svelte/no-navigation-without-resolve -->
  </div>
</footer>
