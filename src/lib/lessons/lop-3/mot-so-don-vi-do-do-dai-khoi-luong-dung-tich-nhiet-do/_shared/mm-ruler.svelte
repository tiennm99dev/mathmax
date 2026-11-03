<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import Ruler from '#lib/core/kid/ruler.svelte';
  import { RULER_CM, mmText } from './measure.js';

  /**
   * A ruler zoomed in on its first centimetres, with a mark at every
   * millimetre and a coloured strip from the 0 mark. With `onchange` the end
   * of the strip drags and answers to the arrow keys, one millimetre a step.
   * With `overview` the real ruler sits above, its zoomed part highlighted.
   *
   * - `mm`: the strip's length in millimetres.
   * - `label`: what a screen reader hears.
   * - `onchange`: receives the new length.
   * @type {{
   *   mm: number;
   *   label: string;
   *   overview?: boolean;
   *   onchange?: (mm: number) => void;
   * }}
   */
  let { mm, label, overview = false, onchange } = $props();

  const LEFT = 30;
  /** SVG units per millimetre: at 390 px the marks stay about 9 px apart. */
  const UNIT = 10;
  const W = 360;
  const MAX = RULER_CM * 10;
  const TOP = $derived(overview ? 92 : 44);
  const H = $derived(TOP + 76);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const point = { x: 0, y: 0 };

  /** @param {number} next */
  function set(next) {
    onchange?.(clamp(Math.round(next), 0, MAX));
  }

  const drag = $derived({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    onChange: () => set((point.x - LEFT) / UNIT),
    onKeyMove: (/** @type {number} */ dx, /** @type {number} */ dy) => set(mm + (dx || -dy)),
  });
  const endX = $derived(LEFT + mm * UNIT);
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {W} {H}"
  class="w-full max-w-xl touch-none rounded-2xl border border-slate-200 bg-sky-50 select-none"
  role={onchange ? 'group' : 'img'}
  aria-label={label}
>
  {#if overview}
    <g aria-hidden="true">
      <Ruler x={20} y={4} cm={12} unit={24} fontSize={14} />
      <rect
        x={20}
        y={4}
        width={RULER_CM * 24}
        height={38}
        fill="#6366f1"
        fill-opacity="0.2"
        stroke="#4338ca"
        stroke-width="2"
      />
      <line x1={20} y1={42} x2={LEFT} y2={TOP} stroke="#4338ca" stroke-dasharray="4 3" />
      <line
        x1={20 + RULER_CM * 24}
        y1={42}
        x2={LEFT + MAX * UNIT}
        y2={TOP}
        stroke="#4338ca"
        stroke-dasharray="4 3"
      />
    </g>
  {/if}
  <rect
    x={LEFT - 14}
    y={TOP}
    width={MAX * UNIT + 28}
    height={62}
    rx="4"
    fill="#fde68a"
    stroke="#b45309"
    stroke-width="1.5"
  />
  {#each { length: MAX + 1 } as _, k (k)}
    <line
      x1={LEFT + k * UNIT}
      y1={TOP}
      x2={LEFT + k * UNIT}
      y2={TOP + (k % 10 === 0 ? 26 : k % 5 === 0 ? 19 : 12)}
      stroke="#451a03"
      stroke-width={k % 10 === 0 ? 2.5 : 1.2}
    />
  {/each}
  {#each { length: RULER_CM + 1 } as _, n (n)}
    <text
      x={LEFT + n * 10 * UNIT}
      y={TOP + 45}
      text-anchor="middle"
      font-size="20"
      font-weight="700"
      fill="#451a03">{n}</text
    >
  {/each}
  <text x={LEFT + 27 * UNIT} y={TOP + 45} text-anchor="middle" font-size="16" fill="#451a03"
    >cm</text
  >
  <rect
    x={LEFT}
    y={TOP - 18}
    width={mm * UNIT}
    height="14"
    rx="3"
    fill="#f43f5e"
    class="motion-safe:transition-[width] motion-safe:duration-100"
  />
  <line x1={endX} y1={TOP - 18} x2={endX} y2={TOP + 28} stroke="#be123c" stroke-width="2" />
  {#if onchange}
    <g
      class="drag-handle cursor-grab"
      role="slider"
      tabindex="0"
      aria-label="Đầu băng màu. Kéo, hoặc dùng phím mũi tên để đổi độ dài."
      aria-valuemin={0}
      aria-valuemax={MAX}
      aria-valuenow={mm}
      aria-valuetext={mmText(mm)}
      use:draggable={drag}
    >
      <circle class="drag-knob" cx={endX} cy={TOP - 24} r="12" fill="#be123c" />
      <path
        d="M{endX - 5} {TOP - 24} H{endX + 5} M{endX - 3} {TOP - 27} L{endX - 6} {TOP - 24} L{endX -
          3} {TOP - 21} M{endX + 3} {TOP - 27} L{endX + 6} {TOP - 24} L{endX + 3} {TOP - 21}"
        fill="none"
        stroke="#fff"
        stroke-width="1.5"
      />
    </g>
  {/if}
</svg>
