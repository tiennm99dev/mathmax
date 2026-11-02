<script>
  import Picture from '#lib/core/kid/picture.svelte';

  /**
   * One picture of a picture chart: a kid picture, a coloured ball or an emoji.
   * Decorative, because the chart or the button around it carries the name.
   * @type {{ symbol: import('./survey.js').ChartSymbol, size?: number }}
   */
  let { symbol, size = 28 } = $props();
</script>

{#if 'picture' in symbol}
  <Picture name={symbol.picture} {size} decorative />
{:else if 'color' in symbol}
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" class="shrink-0">
    <circle cx="20" cy="20" r="17" fill={symbol.color} stroke="#334155" stroke-width="2" />
    <circle cx="14" cy="14" r="4" fill="#ffffff" opacity="0.7" />
  </svg>
{:else}
  <span aria-hidden="true" class="leading-none" style:font-size="{Math.round(size * 0.85)}px"
    >{symbol.emoji}</span
  >
{/if}
