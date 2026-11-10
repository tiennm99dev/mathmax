<script>
  import Picture from '#lib/core/kid/picture.svelte';

  /**
   * The small picture beside a category name: a kid picture, a colour swatch
   * or an emoji. Decorative, because the cell or button around it carries
   * the name.
   * @type {{ symbol: import('./data.js').DataSymbol, size?: number }}
   */
  let { symbol, size = 28 } = $props();
</script>

{#if 'picture' in symbol}
  <Picture name={symbol.picture} {size} decorative />
{:else if 'color' in symbol}
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" class="shrink-0">
    <rect
      x="4"
      y="4"
      width="32"
      height="32"
      rx="8"
      fill={symbol.color}
      stroke="#334155"
      stroke-width="2"
    />
  </svg>
{:else}
  <span aria-hidden="true" class="leading-none" style:font-size="{Math.round(size * 0.85)}px"
    >{symbol.emoji}</span
  >
{/if}
