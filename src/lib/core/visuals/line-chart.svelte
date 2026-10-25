<script>
  import { untrack } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp, colorAt, linear, snap } from './svg-math.js';

  /**
   * A line chart (biểu đồ đoạn thẳng) over category labels such as months or
   * years, with one or more series. With `interactive`, every point is a
   * vertical slider: drag it or use the arrow keys to change its value in
   * steps of `step`. Series after the first are dashed so they differ by more
   * than colour.
   *
   * - `labels`: the x categories, one per value in each series.
   * - `series` (bindable): `{ name, values, color? }`. Bind it to read edits;
   *   the component replaces the array on each change.
   * - `min`, `max`: value axis range. By default 0 (or the lowest value, if
   *   negative) up to a round number above the highest; fixed on first render
   *   for an interactive chart.
   * - `unit`: axis title. `showValues`: print values next to points.
   *
   * @type {{
   *   labels?: string[];
   *   series?: Array<{ name: string, values: number[], color?: string }>;
   *   min?: number;
   *   max?: number;
   *   step?: number;
   *   interactive?: boolean;
   *   unit?: string;
   *   title?: string;
   *   showValues?: boolean;
   *   width?: number;
   *   height?: number;
   *   onchange?: (series: Array<{ name: string, values: number[] }>) => void;
   * }}
   */
  let {
    labels = [],
    series = $bindable([]),
    min,
    max,
    step = 1,
    interactive = false,
    unit = '',
    title = 'Biểu đồ đoạn thẳng',
    showValues = true,
    width = 480,
    height = 300,
    onchange,
  } = $props();

  const LEFT = 48;
  const RIGHT = 18;
  const TOP = 28;
  const BOTTOM = 40;

  const extent = (/** @type {Array<{ values: number[] }>} */ s, /** @type {number} */ grow) => {
    const all = s.flatMap((x) => x.values);
    return {
      lo: Math.min(0, ...all),
      hi: Math.max(step * 5, ...all) * grow,
    };
  };
  const frozen = untrack(() => extent(series, 1.25));
  const axis = $derived.by(() => {
    const e = interactive ? frozen : extent(series, 1);
    return niceAxis(min ?? e.lo, max ?? e.hi, 5);
  });
  const y = $derived(linear(axis.min, axis.max, height - BOTTOM, TOP));
  const slot = $derived((width - LEFT - RIGHT) / Math.max(1, labels.length));
  const px = (/** @type {number} */ i) => LEFT + slot * (i + 0.5);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} si @param {number} i @param {number} v */
  function setValue(si, i, v) {
    const next = clamp(snap(v, step), axis.min, axis.max);
    if (next === series[si].values[i]) return;
    series = series.map((s, j) =>
      j === si ? { ...s, values: s.values.map((old, k) => (k === i ? next : old)) } : s,
    );
    onchange?.(series);
  }

  /** @param {number} si @param {number} i */
  const dragFor = (si, i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setValue(si, i, y.invert(scratch.y)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) =>
      setValue(si, i, series[si].values[i] + (dx - dy) * step * (big ? 5 : 1)),
  });

  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);
  const describe = $derived(
    series
      .map((s) => `${s.name}: ${s.values.map((v, i) => `${labels[i]} ${fmt(v)}`).join(', ')}`)
      .join('; '),
  );
</script>

<figure class="space-y-2">
  <svg
    bind:this={svgEl}
    viewBox="0 0 {width} {height}"
    class="mx-auto block w-full max-w-xl select-none"
    style:aspect-ratio="{width} / {height}"
    style:touch-action={interactive ? 'none' : null}
    role={interactive ? 'group' : 'img'}
    aria-label="{title}. {describe}"
  >
    {#each axis.ticks as t (t)}
      <line
        x1={LEFT}
        y1={y.map(t)}
        x2={width - RIGHT}
        y2={y.map(t)}
        stroke="#e2e8f0"
        stroke-width="1"
      />
      <text x={LEFT - 6} y={y.map(t) + 4} text-anchor="end" font-size="12" fill="#64748b"
        >{fmt(t)}</text
      >
    {/each}
    {#if unit}
      <text x={LEFT - 6} y={TOP - 12} font-size="12" font-weight="600" fill="#334155">{unit}</text>
    {/if}
    <line
      x1={LEFT}
      y1={TOP - 4}
      x2={LEFT}
      y2={height - BOTTOM}
      stroke="#334155"
      stroke-width="1.5"
    />
    <line
      x1={LEFT}
      y1={y.map(Math.max(axis.min, Math.min(axis.max, 0)))}
      x2={width - RIGHT}
      y2={y.map(Math.max(axis.min, Math.min(axis.max, 0)))}
      stroke="#334155"
      stroke-width="1.5"
    />
    {#each labels as l, i (i)}
      <text x={px(i)} y={height - BOTTOM + 20} text-anchor="middle" font-size="13" fill="#334155"
        >{l}</text
      >
    {/each}

    {#each series as s, si (si)}
      {@const color = s.color ?? colorAt(si)}
      <polyline
        points={s.values.map((v, i) => `${px(i)},${y.map(v)}`).join(' ')}
        fill="none"
        stroke={color}
        stroke-width="2.5"
        stroke-linejoin="round"
        stroke-dasharray={si > 0 ? '7 4' : null}
      />
      {#each s.values as v, i (i)}
        {#if showValues}
          <text
            x={px(i)}
            y={y.map(v) - 12}
            text-anchor="middle"
            font-size="12"
            font-weight="700"
            fill={color}>{fmt(v)}</text
          >
        {/if}
        {#if interactive}
          <g
            class="drag-handle"
            role="slider"
            tabindex="0"
            aria-label="{s.name}, {labels[i]}"
            aria-valuemin={axis.min}
            aria-valuemax={axis.max}
            aria-valuenow={v}
            aria-valuetext="{labels[i]}: {fmt(v)}"
            aria-orientation="vertical"
            style="cursor:ns-resize; outline:none"
            use:draggable={dragFor(si, i)}
          >
            <circle cx={px(i)} cy={y.map(v)} r="16" fill="transparent" />
            <circle cx={px(i)} cy={y.map(v)} r="7" fill={color} stroke="#fff" stroke-width="2" />
          </g>
        {:else}
          <circle cx={px(i)} cy={y.map(v)} r="4.5" fill={color} />
        {/if}
      {/each}
    {/each}
  </svg>
  {#if series.length > 1}
    <figcaption class="flex flex-wrap justify-center gap-4 text-sm text-slate-700">
      {#each series as s, si (si)}
        <span class="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true">
            <line
              x1="0"
              y1="5"
              x2="28"
              y2="5"
              stroke={s.color ?? colorAt(si)}
              stroke-width="3"
              stroke-dasharray={si > 0 ? '7 4' : null}
            />
          </svg>
          {s.name}
        </span>
      {/each}
    </figcaption>
  {/if}
</figure>
