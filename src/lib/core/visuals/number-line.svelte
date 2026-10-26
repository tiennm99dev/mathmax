<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp, hopPath, linear, snap } from './svg-math.js';

  /**
   * A horizontal number line with major ticks every `step`, optional minor
   * ticks (`subdivisions` per step, e.g. 4 for quarters), fixed marks and hop
   * arcs for adding on. When `value` is a number a marker sits on the line;
   * with `interactive` it can be dragged or moved with the arrow keys and
   * snaps to the finest tick (Shift moves a whole step).
   *
   * - `min`, `max`: ends of the line; `step`: gap between major ticks.
   * - `labelEvery`: number every n-th major tick (1).
   * - `value` (bindable): marker position, or null for no marker.
   * - `marks`: fixed points such as `{ value: 3, label: 'A' }`.
   * - `hops`: arcs such as `{ from: 2, to: 5, label: '+3' }`.
   * - `format`: tick and value text; defaults to Vietnamese decimals.
   * - `valueText`: what screen readers hear for the marker's value. It
   *   defaults to Vietnamese decimals (2/3 is read as '0,6667'), never a raw
   *   float such as 0.6666666865, even when `format` only writes the ticks;
   *   pass it to read the value another way, such as a fraction.
   * - `label`: accessible name of the line; `markerLabel` names the marker.
   *
   * @type {{
   *   min?: number;
   *   max?: number;
   *   step?: number;
   *   subdivisions?: number;
   *   labelEvery?: number;
   *   value?: number | null;
   *   interactive?: boolean;
   *   marks?: Array<{ value: number, label?: string, color?: string }>;
   *   hops?: Array<{ from: number, to: number, label?: string, color?: string }>;
   *   format?: (v: number) => string;
   *   valueText?: (v: number) => string;
   *   label?: string;
   *   markerLabel?: string;
   *   width?: number;
   *   onchange?: (value: number) => void;
   * }}
   */
  let {
    min = 0,
    max = 10,
    step = 1,
    subdivisions = 1,
    labelEvery = 1,
    value = $bindable(null),
    interactive = true,
    marks = [],
    hops = [],
    format = (v) => formatNumber(v, 4),
    valueText = (v) => formatNumber(v, 4),
    label = 'Tia số',
    markerLabel = 'Điểm trên tia số',
    width = 480,
    onchange,
  } = $props();

  const PAD = 28;
  const hopRoom = $derived(hops.length > 0 ? 44 : 0);
  const height = $derived(76 + hopRoom);
  const baseY = $derived(30 + hopRoom);
  const x = $derived(linear(min, max, PAD, width - PAD));
  const fine = $derived(step / Math.max(1, subdivisions));

  /** Values from `min` to `max` every `gap`, without float drift. */
  const seq = (/** @type {number} */ gap) => {
    const out = [];
    const n = Math.round((max - min) / gap);
    for (let i = 0; i <= n; i++) out.push(snap(min + i * gap, gap, min));
    return out;
  };
  const majors = $derived(seq(step));
  /** The value for `aria-valuenow`, rounded so no float noise is exposed. */
  const now = (/** @type {number} */ v) => Math.round(v * 1e6) / 1e6;
  const minors = $derived(subdivisions > 1 ? seq(fine) : []);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  // Scratch point the drag action writes to; the marker is drawn from `value`.
  const scratch = { x: 0, y: 0 };

  /** @param {number} v */
  function setValue(v) {
    const next = clamp(snap(v, fine, min), min, max);
    if (next === value) return;
    value = next;
    onchange?.(next);
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setValue(x.invert(scratch.x)),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => setValue((value ?? min) + (dx - dy) * (big ? step : fine)),
  });
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {width} {height}"
  class="mx-auto block w-full select-none"
  style:aspect-ratio="{width} / {height}"
  style:touch-action={interactive && value !== null ? 'none' : null}
  role="group"
  aria-label={label}
>
  <line
    x1={PAD - 12}
    y1={baseY}
    x2={width - PAD + 14}
    y2={baseY}
    stroke="#334155"
    stroke-width="2"
  />
  <path d="M {width - PAD + 18} {baseY} l -9 -5 v 10 z" fill="#334155" />

  {#each minors as v (v)}
    <line
      x1={x.map(v)}
      y1={baseY - 5}
      x2={x.map(v)}
      y2={baseY + 5}
      stroke="#94a3b8"
      stroke-width="1"
    />
  {/each}
  {#each majors as v, i (v)}
    <line
      x1={x.map(v)}
      y1={baseY - 9}
      x2={x.map(v)}
      y2={baseY + 9}
      stroke="#334155"
      stroke-width="1.5"
    />
    {#if i % labelEvery === 0}
      <text x={x.map(v)} y={baseY + 27} text-anchor="middle" font-size="15" fill="#334155"
        >{format(v)}</text
      >
    {/if}
  {/each}

  {#each hops as hop, i (i)}
    {@const color = hop.color ?? '#F46036'}
    {@const x0 = x.map(hop.from)}
    {@const x1 = x.map(hop.to)}
    <path d={hopPath(x0, x1, baseY - 4, 18)} fill="none" stroke={color} stroke-width="2.5" />
    <path d="M {x1} {baseY - 4} l {x1 > x0 ? -9 : 9} -6 l 0 9 z" fill={color} />
    {#if hop.label}
      <text
        x={(x0 + x1) / 2}
        y={baseY - 30}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill={color}>{hop.label}</text
      >
    {/if}
  {/each}

  {#each marks as m, i (i)}
    <circle cx={x.map(m.value)} cy={baseY} r="6" fill={m.color ?? '#1B998B'} />
    {#if m.label}
      <text
        x={x.map(m.value)}
        y={baseY - 13}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill={m.color ?? '#1B998B'}>{m.label}</text
      >
    {/if}
  {/each}

  {#if value !== null}
    {@const mx = x.map(value)}
    {#if interactive}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label={markerLabel}
        aria-valuemin={now(min)}
        aria-valuemax={now(max)}
        aria-valuenow={now(value)}
        aria-valuetext={valueText(value)}
        aria-orientation="horizontal"
        style="cursor:grab; outline:none"
        use:draggable={drag}
      >
        <!-- A wide invisible hit area keeps the marker easy to grab on touch. -->
        <rect
          class="drag-hit"
          x={mx - 18}
          y={baseY - 26}
          width="36"
          height="40"
          fill="transparent"
        />
        <path
          class="drag-knob"
          d="M {mx} {baseY - 2} l -10 -16 h 20 z"
          fill="#D7263D"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
    {:else}
      <path d="M {mx} {baseY - 2} l -10 -16 h 20 z" fill="#D7263D" />
    {/if}
  {/if}
</svg>
