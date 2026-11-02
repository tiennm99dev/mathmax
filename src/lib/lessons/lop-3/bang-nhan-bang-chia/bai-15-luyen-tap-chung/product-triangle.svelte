<script>
  import { sideEnds } from './engine.js';

  /**
   * The book's triangle of products: a number in a circle on each corner, and in
   * a square on each side the product of the two corners it joins. The hidden
   * side shows "?" until the question ends.
   * @type {{ visual: import('./engine.js').TriangleVisual, settled: boolean }}
   */
  let { visual, settled } = $props();

  const CORNERS = /** @type {const} */ ([
    { x: 100, y: 30 },
    { x: 180, y: 160 },
    { x: 20, y: 160 },
  ]);

  const sides = $derived(
    [0, 1, 2].map((i) => {
      const [a, b] = sideEnds(visual.corners, i);
      const from = CORNERS[i];
      const to = CORNERS[(i + 1) % 3];
      return {
        a,
        b,
        x: (from.x + to.x) / 2,
        y: (from.y + to.y) / 2,
        text: i === visual.hidden && !settled ? '?' : String(a * b),
      };
    }),
  );
  const label = $derived(
    `Tam giác. Ba hình tròn ở ba đỉnh có số ${visual.corners.join(', ')}. ${sides
      .map((s) => `Ô vuông giữa ${s.a} và ${s.b} là ${s.text === '?' ? 'dấu hỏi' : s.text}`)
      .join('. ')}.`,
  );
</script>

<svg
  viewBox="0 0 200 190"
  class="mx-auto block w-full max-w-[300px] rounded-2xl bg-sky-50"
  role="img"
  aria-label={label}
>
  <polygon
    points={CORNERS.map((c) => `${c.x},${c.y}`).join(' ')}
    class="fill-none stroke-slate-400"
    stroke-width="2"
  />
  {#each sides as side, i (i)}
    <rect
      x={side.x - 18}
      y={side.y - 15}
      width="36"
      height="30"
      rx="4"
      class={i === visual.hidden
        ? 'fill-amber-200 stroke-amber-600'
        : 'fill-rose-100 stroke-rose-500'}
      stroke-width="2"
    />
    <text
      x={side.x}
      y={side.y + 6}
      text-anchor="middle"
      class="fill-slate-900 text-[17px] font-bold">{side.text}</text
    >
  {/each}
  {#each CORNERS as corner, i (i)}
    <circle
      cx={corner.x}
      cy={corner.y}
      r="18"
      class="fill-sky-200 stroke-sky-600"
      stroke-width="2"
    />
    <text
      x={corner.x}
      y={corner.y + 6}
      text-anchor="middle"
      class="fill-slate-900 text-[17px] font-bold">{visual.corners[i]}</text
    >
  {/each}
</svg>
