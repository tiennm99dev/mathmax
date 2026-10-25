<script>
  /**
   * Shows rich text that `render-content.server.js` already turned into HTML
   * at prerender time, so the client never loads KaTeX for content.
   * @type {{
   *   html: string;
   *   as?: string;
   *   class?: string;
   *   id?: string;
   * }}
   */
  let { html, as = 'span', class: className = '', id } = $props();
</script>

<!-- The HTML is escaped text plus KaTeX output (trust off), so it is safe to inject. -->
<svelte:element this={as} class={className} {id}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</svelte:element>
