<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp, colorAt, linear } from './svg-math.js';

  /**
   * Fraction strips: each bar is one whole cut into `denominator` equal
   * parts, `numerator` of them shaded. Stacked bars line up, so equal
   * fractions (1/2, 2/4, 4/8) show as equal lengths. When `interactive`, the
   * edge of the shading is a slider: drag it, tap a part, or use the arrow
   * keys to change the numerator.
   *
   * - `bars` (bindable): `{ numerator, denominator, label?, color? }` per row.
   *   Bind it to read changes; the component replaces the array on each edit.
   * - `showLabels`: write 'n/d' (or `label`) to the right of each bar.
   * - `label`: accessible name of the whole figure.
   *
   * @type {{
   *   bars?: Array<{ numerator: number, denominator: number, label?: string, color?: string }>;
   *   interactive?: boolean;
   *   showLabels?: boolean;
   *   label?: string;
   *   width?: number;
   *   onchange?: (bars: Array<{ numerator: number, denominator: number }>) => void;
   * }}
   */
  let {
    bars = $bindable([{ numerator: 1, denominator: 2 }]),
    interactive = true,
    showLabels = true,
    label = 'Băng phân số',
    width = 480,
    onchange,
  } = $props();

  const PAD = 14;
  const ROW = 44;
  const GAP = 16;
  const labelRoom = $derived(showLabels ? 72 : 0);
  const height = $derived(PAD * 2 + bars.length * ROW + (bars.length - 1) * GAP);
  const x = $derived(linear(0, 1, PAD, width - PAD - labelRoom));
  const rowY = (/** @type {number} */ i) => PAD + i * (ROW + GAP);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  /** @param {number} i @param {number} n */
  function setNumerator(i, n) {
    const bar = bars[i];
    const next = clamp(Math.round(n), 0, bar.denominator);
    if (next === bar.numerator) return;
    bars = bars.map((b, j) => (j === i ? { ...b, numerator: next } : b));
    onchange?.(bars);
  }

  /** @param {number} i */
  const dragFor = (i) => ({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: width, h: height },
    pad: 0,
    onChange: () => setNumerator(i, x.invert(scratch.x) * bars[i].denominator),
    /** @param {number} dx @param {number} dy */
    onKeyMove: (dx, dy) => setNumerator(i, bars[i].numerator + dx - dy),
  });

  /** Tapping a part shades up to it, or clears it when it is the last shaded part. */
  function tapPart(/** @type {number} */ i, /** @type {number} */ k) {
    setNumerator(i, bars[i].numerator === k + 1 ? k : k + 1);
  }

  /** @param {{ numerator: number, denominator: number, label?: string }} b */
  const text = (b) => b.label ?? `${b.numerator}/${b.denominator}`;
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {width} {height}"
  class="mx-auto block w-full select-none"
  style:aspect-ratio="{width} / {height}"
  style:touch-action={interactive ? 'none' : null}
  role="group"
  aria-label={label}
>
  {#each bars as bar, i (i)}
    {@const y = rowY(i)}
    {@const color = bar.color ?? colorAt(i)}
    {@const partW = (x.map(1) - x.map(0)) / bar.denominator}
    {#each { length: bar.denominator } as _, k (k)}
      <!-- Tapping a part is a pointer shortcut; the slider below is the keyboard route. -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <rect
        x={x.map(0) + k * partW}
        {y}
        width={partW}
        height={ROW}
        fill={k < bar.numerator ? color : '#fff'}
        fill-opacity={k < bar.numerator ? 0.85 : 1}
        stroke="#334155"
        stroke-width="1.5"
        onpointerdown={interactive ? () => tapPart(i, k) : undefined}
        style:cursor={interactive ? 'pointer' : null}
      />
    {/each}
    {#if showLabels}
      <text
        x={width - PAD - labelRoom + 14}
        y={y + ROW / 2 + 7}
        font-size="20"
        font-weight="700"
        fill="#1e293b">{text(bar)}</text
      >
    {/if}
    {#if interactive}
      {@const hx = x.map(bar.numerator / bar.denominator)}
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Số phần được tô của băng {i + 1}, chia {bar.denominator} phần"
        aria-valuemin={0}
        aria-valuemax={bar.denominator}
        aria-valuenow={bar.numerator}
        aria-valuetext="{bar.numerator}/{bar.denominator}"
        style="cursor:ew-resize; outline:none"
        use:draggable={dragFor(i)}
      >
        <rect
          class="drag-hit"
          x={hx - 12}
          y={y - 6}
          width="24"
          height={ROW + 12}
          fill="transparent"
        />
        <rect
          class="drag-knob"
          x={hx - 3}
          y={y - 6}
          width="6"
          height={ROW + 12}
          rx="3"
          fill="#0f172a"
        />
      </g>
    {/if}
  {/each}
</svg>
