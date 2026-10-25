<script>
  import katex from 'katex';

  /**
   * @type {{
   *   math: string;
   *   display?: boolean;
   *   ariaLabel?: string;
   * }}
   */
  let { math, display = false, ariaLabel } = $props();

  const html = $derived(
    katex.renderToString(math, {
      displayMode: display,
      throwOnError: false,
      output: 'htmlAndMathml',
    }),
  );
</script>

<!-- KaTeX escapes its input and runs with `trust: false`, so its markup is safe to inject. -->
{#if ariaLabel}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <span aria-label={ariaLabel}>{@html html}</span>
{:else}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
{/if}
