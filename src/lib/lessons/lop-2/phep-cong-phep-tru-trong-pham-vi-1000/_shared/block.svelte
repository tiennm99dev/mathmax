<script>
  /**
   * One place-value block drawn to scale: a small cube for 1, a rod of ten
   * cells, a flat of ten by ten. With `gone` it is faded and struck through,
   * for a block taken away. Decorative; the board says the count in words.
   * @type {{
   *   place: import('./column-three.js').Place;
   *   gone?: boolean;
   *   fresh?: boolean;
   * }}
   */
  let { place, gone = false, fresh = false } = $props();

  const LOOK = {
    ones: { fill: '#fbbf24', line: '#b45309', cols: 1, rows: 1, cell: 11 },
    tens: { fill: '#34d399', line: '#047857', cols: 1, rows: 10, cell: 4 },
    hundreds: { fill: '#60a5fa', line: '#1d4ed8', cols: 10, rows: 10, cell: 3 },
  };

  const look = $derived(LOOK[place]);
  const w = $derived(place === 'tens' ? 7 : look.cols * look.cell);
  const h = $derived(look.rows * look.cell);
</script>

<svg
  width={w + 1}
  height={h + 1}
  viewBox="0 0 {w + 1} {h + 1}"
  class="block shrink-0 {gone ? 'opacity-40' : ''}"
  aria-hidden="true"
>
  <rect
    x="0.5"
    y="0.5"
    width={w}
    height={h}
    fill={fresh ? '#f9a8d4' : look.fill}
    stroke={fresh ? '#be185d' : look.line}
  />
  {#each { length: look.cols - 1 } as _, i (i)}
    <line
      x1={0.5 + (i + 1) * look.cell}
      y1="0.5"
      x2={0.5 + (i + 1) * look.cell}
      y2={0.5 + h}
      stroke={look.line}
      stroke-width="0.4"
    />
  {/each}
  {#each { length: look.rows - 1 } as _, i (i)}
    <line
      x1="0.5"
      y1={0.5 + (i + 1) * look.cell}
      x2={0.5 + w}
      y2={0.5 + (i + 1) * look.cell}
      stroke={fresh ? '#be185d' : look.line}
      stroke-width="0.4"
    />
  {/each}
  {#if gone}
    <line x1="0.5" y1={h + 0.5} x2={w + 0.5} y2="0.5" stroke="#e11d48" stroke-width="1.5" />
  {/if}
</svg>
