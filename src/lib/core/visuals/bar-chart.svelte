<script>
  import { untrack } from 'svelte';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { axisFrom, niceAxis } from '#lib/stats-engine/ticks.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp, colorAt, linear, snap } from './svg-math.js';

  /**
   * A vertical bar chart (biểu đồ cột) with a value axis and gridlines. With
   * `interactive`, each bar top is a slider: drag it or use the arrow keys to
   * change the value in steps of `step`, e.g. to build a chart from a table.
   *
   * - `data` (bindable): `{ label, value, color? }` per bar. Bind it to read
   *   edits; the component replaces the array on each change.
   * - `max`: top of the value axis. By default it is a round number above the
   *   largest value; for an interactive chart it is fixed when it first renders,
   *   so the axis does not move while dragging.
   * - `step`: snap for edits (1). `unit`: axis title such as 'Số học sinh'.
   * - `axisStart`: where the value axis starts (0). Above 0 it is a cut axis,
   *   marked with a zigzag at the foot of the axis and named in the chart's
   *   accessible name: bars then rise from `axisStart`, which exaggerates
   *   the differences between them, as in "spot the misleading chart" tasks.
   * - `showValues`: print each value above its bar. Turn it off for "read
   *   the chart" or "draw from the table" tasks: the values then leave the
   *   picture and the chart's accessible name too (an editable bar still
   *   tells screen readers its own value).
   *
   * Text never renders below `MIN_TEXT_PX` CSS pixels: at 390 px the chart is
   * drawn smaller than its viewBox, so its font sizes grow to compensate.
   *
   * @type {{
   *   data?: Array<{ label: string, value: number, color?: string }>;
   *   max?: number;
   *   step?: number;
   *   interactive?: boolean;
   *   unit?: string;
   *   title?: string;
   *   showValues?: boolean;
   *   axisStart?: number;
   *   width?: number;
   *   height?: number;
   *   onchange?: (data: Array<{ label: string, value: number }>) => void;
   * }}
   */
  let {
    data = $bindable([]),
    max,
    step = 1,
    interactive = false,
    unit = '',
    title = 'Biểu đồ cột',
    showValues = true,
    axisStart = 0,
    width = 480,
    height = 300,
    onchange,
  } = $props();

  /** Smallest on-screen size, in CSS pixels, of any text in the chart. */
  const MIN_TEXT_PX = 12;

  // Rendered width of the chart; 0 until measured (and during prerender).
  let shownWidth = $state(0);
  // ViewBox units per CSS pixel, at least 1 so a wide screen keeps the sizes.
  const zoom = $derived(shownWidth > 0 ? Math.max(1, width / shownWidth) : 1);
  /** A font size in viewBox units that renders at least `MIN_TEXT_PX`. */
  const font = (/** @type {number} */ base) => Math.max(base, MIN_TEXT_PX * zoom);

  const LEFT = $derived(Math.max(48, font(12) * 3.4));
  const RIGHT = 14;
  const TOP = $derived(Math.max(28, font(12) + 16));
  const BOTTOM = $derived(Math.max(40, font(13) + 26));

  const peak = (/** @type {Array<{ value: number }>} */ d) =>
    Math.max(step * 5, ...d.map((b) => b.value));
  // Captured once for an interactive chart, so dragging a bar does not rescale.
  const frozenPeak = untrack(() => peak(data) * 1.25);
  const axis = $derived.by(() => {
    const top = max ?? (interactive ? frozenPeak : peak(data));
    if (!(axisStart > 0)) return niceAxis(0, top, 5);
    const cut = axisFrom(axisStart, Math.max(top, axisStart + step));
    return { min: axisStart, max: max ?? cut.top, ticks: cut.ticks };
  });
  const cutAxis = $derived(axis.min > 0);
  const y = $derived(linear(axis.min, axis.max, height - BOTTOM, TOP));
  const slot = $derived((width - LEFT - RIGHT) / Math.max(1, data.length));
  const barW = $derived(Math.min(64, slot * 0.6));
  const cx = (/** @type {number} */ i) => LEFT + slot * (i + 0.5);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} i @param {number} v */
  function setValue(i, v) {
    const next = clamp(snap(v, step), axis.min, axis.max);
    if (next === data[i].value) return;
    data = data.map((b, j) => (j === i ? { ...b, value: next } : b));
    onchange?.(data);
  }

  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setValue(i, y.invert(scratch.y)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setValue(i, data[i].value + (dx - dy) * step * (big ? 5 : 1)),
  });

  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {width} {height}"
  class="mx-auto block w-full max-w-xl select-none"
  style:aspect-ratio="{width} / {height}"
  style:touch-action={interactive ? 'none' : null}
  role={interactive ? 'group' : 'img'}
  aria-label="{title}{cutAxis ? ` (trục đứng bắt đầu từ ${fmt(axis.min)})` : ''}: {data
    .map((b) => (showValues ? `${b.label} ${fmt(b.value)}` : b.label))
    .join(', ')}"
  bind:clientWidth={shownWidth}
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
    <text
      x={LEFT - 6}
      y={y.map(t) + font(12) / 3}
      text-anchor="end"
      font-size={font(12)}
      fill="#64748b">{fmt(t)}</text
    >
  {/each}
  {#if unit}
    <text
      x={LEFT - 6}
      y={TOP - 12}
      text-anchor="start"
      font-size={font(12)}
      font-weight="600"
      fill="#334155">{unit}</text
    >
  {/if}
  <line x1={LEFT} y1={TOP - 4} x2={LEFT} y2={height - BOTTOM} stroke="#334155" stroke-width="1.5" />
  {#if cutAxis}
    <!-- The zigzag says the axis does not start at 0. -->
    <polyline
      points="{LEFT - 6},{height - BOTTOM - 6} {LEFT + 6},{height - BOTTOM - 10} {LEFT -
        6},{height - BOTTOM - 14} {LEFT + 6},{height - BOTTOM - 18}"
      fill="none"
      stroke="#be123c"
      stroke-width="2"
    />
  {/if}
  <line
    x1={LEFT}
    y1={height - BOTTOM}
    x2={width - RIGHT}
    y2={height - BOTTOM}
    stroke="#334155"
    stroke-width="1.5"
  />

  {#each data as bar, i (i)}
    {@const top = y.map(Math.max(bar.value, axis.min))}
    {@const color = bar.color ?? colorAt(i)}
    <rect
      x={cx(i) - barW / 2}
      y={top}
      width={barW}
      height={height - BOTTOM - top}
      fill={color}
      rx="2"
    />
    <text
      x={cx(i)}
      y={height - BOTTOM + font(13) + 7}
      text-anchor="middle"
      font-size={font(13)}
      fill="#334155">{bar.label}</text
    >
    {#if showValues}
      <text
        x={cx(i)}
        y={top - (interactive ? 14 : 6)}
        text-anchor="middle"
        font-size={font(13)}
        font-weight="700"
        fill="#1e293b">{fmt(bar.value)}</text
      >
    {/if}
    {#if interactive}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Cột {bar.label}"
        aria-valuemin={axis.min}
        aria-valuemax={axis.max}
        aria-valuenow={bar.value}
        aria-valuetext="{bar.label}: {fmt(bar.value)}"
        aria-orientation="vertical"
        style="cursor:ns-resize; outline:none"
        use:draggable={dragFor(i)}
      >
        <rect
          class="drag-hit"
          x={cx(i) - barW / 2}
          y={top - 12}
          width={barW}
          height="24"
          fill="transparent"
        />
        <rect
          class="drag-knob"
          x={cx(i) - barW / 2}
          y={top - 4}
          width={barW}
          height="8"
          rx="4"
          fill="#0f172a"
        />
      </g>
    {/if}
  {/each}
</svg>
