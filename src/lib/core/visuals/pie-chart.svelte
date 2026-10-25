<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { percentages, pieSlices } from '#lib/stats-engine/frequency.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { angleOf, clamp, colorAt, polar, sectorPath, snap } from './svg-math.js';

  /**
   * A pie chart (biểu đồ hình quạt tròn) with percentage labels and a legend.
   * Slices run clockwise from 12 o'clock. With `interactive`, the boundary
   * between neighbouring slices is a handle: drag it around the circle or
   * use the arrow keys to move `snapPercent` of the total from one slice to
   * the next while the total stays the same.
   *
   * - `data` (bindable): `{ label, value, color? }` per slice. Bind it to read
   *   edits; the component replaces the array on each change.
   * - `decimals`: decimals in the percentages, which always add up to 100.
   * - `snapPercent`: edit step as a percentage of the total (1; Shift: × 5).
   *
   * @type {{
   *   data?: Array<{ label: string, value: number, color?: string }>;
   *   interactive?: boolean;
   *   title?: string;
   *   decimals?: number;
   *   snapPercent?: number;
   *   legend?: boolean;
   *   size?: number;
   *   onchange?: (data: Array<{ label: string, value: number }>) => void;
   * }}
   */
  let {
    data = $bindable([]),
    interactive = false,
    title = 'Biểu đồ hình quạt tròn',
    decimals = 0,
    snapPercent = 1,
    legend = true,
    size = 320,
    onchange,
  } = $props();

  const C = $derived(size / 2);
  const R = $derived(size / 2 - 18);
  const total = $derived(data.reduce((s, d) => s + d.value, 0));
  const slices = $derived(pieSlices(data.map((d) => d.value)));
  const pct = $derived(
    percentages(
      data.map((d) => d.value),
      decimals,
    ),
  );

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /**
   * Move boundary `i` (between slice i and i + 1) to `percent` of the total,
   * measured from 12 o'clock, staying between the neighbouring boundaries.
   * @param {number} i @param {number} percent
   */
  function setBoundary(i, percent) {
    if (total <= 0) return;
    const before = data.slice(0, i).reduce((s, d) => s + d.value, 0);
    const pair = data[i].value + data[i + 1].value;
    const lo = (before / total) * 100;
    const hi = ((before + pair) / total) * 100;
    const at = clamp(snap(percent, snapPercent), lo, hi);
    const left = Number((((at - lo) / 100) * total).toPrecision(12));
    if (left === data[i].value) return;
    const right = Number((pair - left).toPrecision(12));
    data = data.map((d, j) =>
      j === i ? { ...d, value: left } : j === i + 1 ? { ...d, value: right } : d,
    );
    onchange?.(data);
  }

  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: size, h: size },
    pad: 0,
    onChange: () => {
      // Crossing 12 o'clock wraps the angle; read it as running past the end
      // (or the start) of the circle so the clamp pins the handle there.
      const a = angleOf(C, C, scratch);
      const end = slices[i].end;
      const unwrapped = end > 270 && a < 90 ? a + 360 : end < 90 && a > 270 ? a - 360 : a;
      setBoundary(i, unwrapped / 3.6);
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) =>
      setBoundary(i, slices[i].end / 3.6 + (dx + dy) * snapPercent * (big ? 5 : 1)),
  });

  const fmt = (/** @type {number} */ p) => `${formatNumber(p, decimals)}%`;
</script>

<figure class="mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:items-start">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {size} {size}"
    class="block w-full max-w-xs shrink-0 select-none"
    style:aspect-ratio="1 / 1"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{title}: {data.map((d, i) => `${d.label} ${fmt(pct[i])}`).join(', ')}"
  >
    {#if total <= 0}
      <circle cx={C} cy={C} r={R} fill="#f1f5f9" stroke="#cbd5e1" />
    {/if}
    {#each slices as s, i (i)}
      <path
        d={sectorPath(C, C, R, s.start, s.end)}
        fill={data[i].color ?? colorAt(i)}
        stroke="#fff"
        stroke-width="2"
      />
    {/each}
    {#each slices as s, i (i)}
      {#if s.sweep >= 20}
        {@const p = polar(C, C, R * 0.64, s.start + s.sweep / 2)}
        <text
          x={p.x}
          y={p.y + 5}
          text-anchor="middle"
          font-size="15"
          font-weight="700"
          fill="#fff"
          stroke="#0f172a"
          stroke-width="3"
          stroke-opacity="0.35"
          paint-order="stroke">{fmt(pct[i])}</text
        >
      {/if}
    {/each}
    {#if interactive}
      {#each slices.slice(0, -1) as s, i (i)}
        {@const h = polar(C, C, R, s.end)}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Ranh giới giữa {data[i].label} và {data[i + 1].label}"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(s.end / 3.6)}
          aria-valuetext="{data[i].label} {fmt(pct[i])}, {data[i + 1].label} {fmt(pct[i + 1])}"
          style="cursor:grab; outline:none"
          use:draggable={dragFor(i)}
        >
          <circle cx={h.x} cy={h.y} r="18" fill="transparent" />
          <circle cx={h.x} cy={h.y} r="9" fill="#0f172a" stroke="#fff" stroke-width="2" />
        </g>
      {/each}
    {/if}
  </svg>

  {#if legend}
    <figcaption class="w-full sm:w-auto">
      <ul class="space-y-1.5 text-sm text-slate-700">
        {#each data as d, i (i)}
          <li class="flex items-center gap-2">
            <span
              class="inline-block h-4 w-4 shrink-0 rounded"
              style:background-color={d.color ?? colorAt(i)}
              aria-hidden="true"
            ></span>
            <span class="flex-1">{d.label}</span>
            <span class="font-semibold tabular-nums">{fmt(pct[i])}</span>
          </li>
        {/each}
      </ul>
    </figcaption>
  {/if}
</figure>
