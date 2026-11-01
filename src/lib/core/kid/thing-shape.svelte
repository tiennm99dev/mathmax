<svelte:options namespace="svg" />

<script>
  /**
   * A thing lying flat, drawn inside a parent SVG from its left end `x` to
   * `x + length`, centred on the line `y`: a pencil, a crayon, a ribbon or
   * a straw. The drawing fills its length exactly, tip included, so its ends
   * are where a ruler reads them.
   * @type {{
   *   shape: import('./length.js').Shape;
   *   x: number;
   *   y: number;
   *   length: number;
   *   color: string;
   * }}
   */
  let { shape, x, y, length, color } = $props();

  const tip = $derived(Math.min(18, length / 3));
</script>

{#if shape === 'pencil'}
  <rect {x} y={y - 7} width="8" height="14" rx="2" fill="#f9a8d4" />
  <rect x={x + 7} y={y - 7} width="3" height="14" fill="#94a3b8" />
  <rect x={x + 10} y={y - 7} width={length - 10 - tip} height="14" fill={color} />
  <path
    d="M{x + length - tip} {y - 7} L{x + length} {y} L{x + length - tip} {y + 7} Z"
    fill="#fde68a"
  />
  <path
    d="M{x + length - tip / 3} {y - 7 / 3} L{x + length} {y} L{x + length - tip / 3} {y + 7 / 3} Z"
    fill="#334155"
  />
{:else if shape === 'crayon'}
  <rect {x} y={y - 9} width={length - tip} height="18" rx="3" fill={color} />
  <rect
    x={x + 6}
    y={y - 9}
    width={Math.max(0, length - tip - 12)}
    height="18"
    fill="#ffffff"
    opacity="0.35"
  />
  <path
    d="M{x + length - tip} {y - 7} L{x + length} {y - 2} L{x + length} {y + 2} L{x +
      length -
      tip} {y + 7} Z"
    fill={color}
  />
{:else if shape === 'ribbon'}
  <rect {x} y={y - 6} width={length} height="12" rx="2" fill={color} />
  <line
    x1={x}
    y1={y}
    x2={x + length}
    y2={y}
    stroke="#ffffff"
    stroke-width="2"
    stroke-dasharray="6 6"
    opacity="0.7"
  />
{:else}
  <rect {x} y={y - 5} width={length} height="10" rx="5" fill={color} />
  <line
    x1={x + 4}
    y1={y - 2}
    x2={x + length - 4}
    y2={y - 2}
    stroke="#ffffff"
    stroke-width="2"
    opacity="0.6"
  />
{/if}
