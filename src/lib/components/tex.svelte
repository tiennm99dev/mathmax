<script>
  import katex from 'katex';
  import { texOptions } from '#lib/core/katex-options.js';
  import { texHtml } from '#lib/core/tex-text.js';

  /**
   * Live KaTeX for TeX that changes with interaction. Screen readers hear the
   * formula as linear text (`√144`, `3/4`) derived from its source, or
   * `ariaLabel` when it is given.
   * @type {{
   *   math: string;
   *   display?: boolean;
   *   ariaLabel?: string;
   * }}
   */
  let { math, display = false, ariaLabel } = $props();

  const html = $derived(texHtml(katex.renderToString(math, texOptions(display)), math, ariaLabel));
</script>

<!-- KaTeX escapes its input and runs with `trust: false`, and the accessible text is escaped, so the markup is safe to inject. -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html html}
