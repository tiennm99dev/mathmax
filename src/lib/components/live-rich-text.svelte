<script>
  import Tex from './tex.svelte';
  import { richParts } from '#lib/core/rich-parts.js';

  /**
   * Rich text built at run time (a generated drill question, a live feedback
   * line): plain text with inline `$...$` TeX, so `$S_{xq}$` shows as math.
   * Content known at prerender time uses `#lib/core/rich-text.svelte` instead.
   * @type {{ text: string }}
   */
  let { text } = $props();

  const parts = $derived(richParts(text));
</script>

{#each parts as part, i (i)}{#if part.kind === 'tex'}<Tex
      math={part.tex}
      display={part.display}
    />{:else}{part.text}{/if}{/each}
