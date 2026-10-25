<script>
  import { resolve } from '$app/paths';
  import { nav } from './copy.vi.js';
  import { focusRing } from './ui.js';

  /**
   * Trail from the home page; the last item is the current page and has no link.
   * @type {{ items: Array<{ label: string, href?: string }> }}
   */
  let { items } = $props();
</script>

<nav aria-label={nav.breadcrumbs} class="mb-4 text-sm">
  <ol class="flex flex-wrap items-center gap-x-1 gap-y-1 text-slate-500">
    {#each items as item, i (i)}
      <li class="flex items-center gap-1">
        {#if i > 0}<span aria-hidden="true">›</span>{/if}
        {#if item.href && i < items.length - 1}
          <a
            href={resolve(/** @type {import('$app/types').Path} */ (item.href))}
            class="rounded py-1 text-indigo-600 hover:underline {focusRing}">{item.label}</a
          >
        {:else}
          <span aria-current="page" class="py-1 text-slate-700">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
