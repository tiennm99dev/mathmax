<script>
  import { resolve } from '$app/paths';
  import { t } from '#lib/i18n/index.js';
  import SiteShell from '#lib/core/site-shell.svelte';
  import { moved } from '#lib/core/copy.vi.js';
  import { button } from '#lib/core/ui.js';

  let { data } = $props();

  const site = t().site;
  const to = $derived(/** @type {import('$app/types').Path} */ (data.to));
  const href = $derived(resolve(to));
</script>

<svelte:head>
  <title>{moved.title} — {site.title}</title>
  <meta http-equiv="refresh" content="0; url={href}" />
  <link rel="canonical" {href} />
  <meta name="robots" content="noindex" />
</svelte:head>

<SiteShell>
  <section class="py-10 text-center">
    <h1 class="mb-4 text-3xl font-bold text-slate-900">{moved.title}</h1>
    <p class="mb-8 leading-relaxed text-slate-600">{moved.body}</p>
    <a href={resolve(to)} class={button.primary}>{moved.link} <span aria-hidden="true">→</span></a>
  </section>
</SiteShell>
