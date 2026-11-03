<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { COLD_END, HOT_END, degText } from './measure.js';

  /**
   * A thermometer from 0 °C to 50 °C: a number at every 10 degrees and a mark
   * at every degree. With `onchange` the top of the red column drags and
   * answers to the arrow keys, one degree a step.
   *
   * - `t`: the reading, in degrees.
   * - `label`: what a screen reader hears.
   * - `onchange`: receives the new reading.
   * @type {{ t: number, label: string, onchange?: (t: number) => void }}
   */
  let { t, label, onchange } = $props();

  const W = 150;
  const H = 406;
  const TUBE = 68;
  const WIDE = 20;
  const BOTTOM = 344;
  /** SVG units per degree. */
  const UNIT = 6;
  const MARKS = Array.from({ length: HOT_END - COLD_END + 1 }, (_, i) => COLD_END + i);

  /** @param {number} v */
  const yOf = (v) => BOTTOM - (v - COLD_END) * UNIT;

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const point = { x: 0, y: 0 };

  /** @param {number} next */
  function set(next) {
    onchange?.(clamp(Math.round(next), COLD_END, HOT_END));
  }

  const drag = $derived({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => set(COLD_END + (BOTTOM - point.y) / UNIT),
    onKeyMove: (/** @type {number} */ dx, /** @type {number} */ dy) => set(t + (dx || -dy)),
  });
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {W} {H}"
  class="mx-auto block h-96 w-auto touch-none select-none"
  role={onchange ? 'group' : 'img'}
  aria-label={label}
>
  <text x="14" y="18" font-size="16" font-weight="700" fill="#334155">°C</text>
  <rect
    x={TUBE}
    y={yOf(HOT_END) - 12}
    width={WIDE}
    height={BOTTOM - yOf(HOT_END) + 24}
    rx="10"
    fill="#f8fafc"
    stroke="#475569"
    stroke-width="2.5"
  />
  <circle
    cx={TUBE + WIDE / 2}
    cy={BOTTOM + 28}
    r="24"
    fill="#ef4444"
    stroke="#475569"
    stroke-width="2.5"
  />
  <rect
    x={TUBE + 4}
    y={yOf(t)}
    width={WIDE - 8}
    height={BOTTOM + 14 - yOf(t)}
    fill="#ef4444"
    class="motion-safe:transition-all motion-safe:duration-150"
  />
  {#each MARKS as mark (mark)}
    {@const long = mark % 10 === 0 ? 20 : mark % 5 === 0 ? 14 : 8}
    <line
      x1={TUBE - long - 2}
      y1={yOf(mark)}
      x2={TUBE - 2}
      y2={yOf(mark)}
      stroke="#1e293b"
      stroke-width={mark % 10 === 0 ? 2 : 1}
    />
    {#if mark % 10 === 0}
      <text
        x={TUBE - 26}
        y={yOf(mark) + 6}
        text-anchor="end"
        font-size="18"
        font-weight="700"
        fill="#1e293b">{mark}</text
      >
    {/if}
  {/each}
  {#if onchange}
    <g
      class="drag-handle cursor-grab"
      role="slider"
      tabindex="0"
      aria-label="Đỉnh cột đỏ. Kéo lên xuống, hoặc dùng phím mũi tên để đổi nhiệt độ."
      aria-orientation="vertical"
      aria-valuemin={COLD_END}
      aria-valuemax={HOT_END}
      aria-valuenow={t}
      aria-valuetext={degText(t)}
      use:draggable={drag}
    >
      <circle class="drag-knob" cx={TUBE + WIDE + 22} cy={yOf(t)} r="15" fill="#be123c" />
      <path
        d="M{TUBE + WIDE + 22} {yOf(t) - 8} L{TUBE + WIDE + 17} {yOf(t) - 2} H{TUBE +
          WIDE +
          27} Z M{TUBE + WIDE + 22} {yOf(t) + 8} L{TUBE + WIDE + 17} {yOf(t) + 2} H{TUBE +
          WIDE +
          27} Z"
        fill="#fff"
      />
    </g>
  {/if}
</svg>
