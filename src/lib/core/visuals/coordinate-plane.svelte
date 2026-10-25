<script>
  import { planeScale } from './svg-math.js';
  import { formatNumber } from '../number-format.js';

  /**
   * A Cartesian plane with square units: light grid, axes, numbered ticks and
   * axis names. Content goes in the `children` snippet, which receives the
   * plane's scale so it can place things in math coordinates (`mx`, `my`)
   * and read pointer positions back (`toX`, `toY`). Build the scale with
   * `planeScale()` from `./svg-math.js` when the parent needs it too, for
   * example to set up drag handles before the plane renders.
   *
   * - `plane`: the scale; defaults to −10..10 on both axes.
   * - `label`: accessible name of the plot.
   * - `labelEvery`: number every n-th grid line (2).
   * - `axisNames`: draw 'x' and 'y' at the axis ends.
   * - `interactive`: the children hold drag handles (true).
   * - `svgEl` (bindable): the element, for `draggable`.
   *
   * @type {{
   *   plane?: import('./svg-math.js').PlaneScale;
   *   label: string;
   *   labelEvery?: number;
   *   axisNames?: boolean;
   *   interactive?: boolean;
   *   maxWidth?: string;
   *   svgEl?: SVGSVGElement;
   *   children?: import('svelte').Snippet<[import('./svg-math.js').PlaneScale]>;
   * }}
   */
  let {
    plane = planeScale(),
    label,
    labelEvery = 2,
    axisNames = true,
    interactive = true,
    maxWidth = 'max-w-md',
    svgEl = $bindable(),
    children,
  } = $props();

  const p = $derived(plane);
  // Axes sit at 0 when 0 is in range, otherwise along the nearest edge.
  const ax = $derived(p.mx(Math.min(p.xMax, Math.max(p.xMin, 0))));
  const ay = $derived(p.my(Math.min(p.yMax, Math.max(p.yMin, 0))));
  const top = $derived(p.my(p.yMax));
  const bottom = $derived(p.my(p.yMin));
  const left = $derived(p.mx(p.xMin));
  const right = $derived(p.mx(p.xMax));
  /** @param {number} v */
  const fmt = (v) => formatNumber(v);
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {p.width} {p.height}"
  preserveAspectRatio="xMidYMid meet"
  class="mx-auto block w-full select-none rounded-lg border border-slate-200 bg-white {maxWidth}"
  style:aspect-ratio="{p.width} / {p.height}"
  style:touch-action={interactive ? 'none' : null}
  role={interactive ? 'group' : 'img'}
  aria-label={label}
>
  {#each p.gridX as v (v)}
    <line x1={p.mx(v)} y1={top} x2={p.mx(v)} y2={bottom} stroke="#e2e8f0" stroke-width="0.5" />
  {/each}
  {#each p.gridY as v (v)}
    <line x1={left} y1={p.my(v)} x2={right} y2={p.my(v)} stroke="#e2e8f0" stroke-width="0.5" />
  {/each}

  <line x1={ax} y1={top} x2={ax} y2={bottom} stroke="#334155" stroke-width="1.5" />
  <line x1={left} y1={ay} x2={right} y2={ay} stroke="#334155" stroke-width="1.5" />

  {#each p.gridX as v (v)}
    {#if v !== 0 && v % labelEvery === 0}
      <text x={p.mx(v)} y={ay + 14} text-anchor="middle" font-size="9" fill="#64748b">{fmt(v)}</text
      >
    {/if}
  {/each}
  {#each p.gridY as v (v)}
    {#if v !== 0 && v % labelEvery === 0}
      <text x={ax - 5} y={p.my(v) + 3} text-anchor="end" font-size="9" fill="#64748b">{fmt(v)}</text
      >
    {/if}
  {/each}
  <text x={ax - 5} y={ay + 14} text-anchor="end" font-size="9" fill="#64748b">0</text>

  {#if axisNames}
    <text x={right + 4} y={ay - 6} font-size="12" font-style="italic" fill="#334155">x</text>
    <text x={ax + 6} y={top - 6} font-size="12" font-style="italic" fill="#334155">y</text>
  {/if}

  {@render children?.(p)}
</svg>
